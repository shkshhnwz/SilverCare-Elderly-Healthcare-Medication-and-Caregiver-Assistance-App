const prisma = require("../../config/prisma");

/**
 * Default fallback thresholds if physician hasn't configured custom thresholds yet
 */
const DEFAULT_THRESHOLDS = {
  BLOOD_PRESSURE: { systolicMin: 90, systolicMax: 130, diastolicMin: 60, diastolicMax: 85, criticalMax: 180, criticalMin: 80, consecutiveBreachLimit: 3, baselineDeviationPercent: 20 },
  GLUCOSE: { minNormal: 70, maxNormal: 140, criticalMin: 54, criticalMax: 250, consecutiveBreachLimit: 3, baselineDeviationPercent: 25 },
  WEIGHT: { minNormal: 40, maxNormal: 150, consecutiveBreachLimit: 3, baselineDeviationPercent: 5 }, // 5% sudden weight change is clinically critical (fluid retention)
  OXYGEN_SATURATION: { minNormal: 95, maxNormal: 100, criticalMin: 90, consecutiveBreachLimit: 2, baselineDeviationPercent: 5 },
  TEMPERATURE: { minNormal: 36.1, maxNormal: 37.5, criticalMin: 35.0, criticalMax: 39.0, consecutiveBreachLimit: 3, baselineDeviationPercent: 5 },
  HEART_RATE: { minNormal: 60, maxNormal: 100, criticalMin: 45, criticalMax: 130, consecutiveBreachLimit: 3, baselineDeviationPercent: 20 },
};

/**
 * Upsert dynamic threshold for a patient
 */
const setPatientThresholdService = async (patientId, payload, currentUserId) => {
  const {
    vitalType,
    minNormal,
    maxNormal,
    systolicMin,
    systolicMax,
    diastolicMin,
    diastolicMax,
    criticalMin,
    criticalMax,
    consecutiveBreachLimit = 3,
    rollingBaselineDays = 7,
    baselineDeviationPercent = 20.0,
  } = payload;

  if (!vitalType) throw new Error("vitalType is required");

  return await prisma.vitalThreshold.upsert({
    where: {
      patientId_vitalType: { patientId, vitalType },
    },
    update: {
      minNormal,
      maxNormal,
      systolicMin,
      systolicMax,
      diastolicMin,
      diastolicMax,
      criticalMin,
      criticalMax,
      consecutiveBreachLimit,
      rollingBaselineDays,
      baselineDeviationPercent,
      updatedById: currentUserId,
      isActive: true,
    },
    create: {
      patientId,
      vitalType,
      minNormal,
      maxNormal,
      systolicMin,
      systolicMax,
      diastolicMin,
      diastolicMax,
      criticalMin,
      criticalMax,
      consecutiveBreachLimit,
      rollingBaselineDays,
      baselineDeviationPercent,
      updatedById: currentUserId,
    },
  });
};

/**
 * Get active thresholds for a patient
 */
const getPatientThresholdsService = async (patientId) => {
  return await prisma.vitalThreshold.findMany({
    where: { patientId, isActive: true },
  });
};

/**
 * Core Anomaly Detection Algorithm
 */
const evaluateAnomaly = async (reading, thresholdConfig) => {
  const anomalies = [];
  const { vitalType, systolic, diastolic, value, patientId, recordedAt } = reading;
  const config = thresholdConfig || DEFAULT_THRESHOLDS[vitalType] || {};

  const isBP = vitalType === "BLOOD_PRESSURE";
  const primaryVal = isBP ? systolic : value;

  if (primaryVal === undefined || primaryVal === null) return anomalies;

  // 1. RULE: Immediate Critical Spike
  if (config.criticalMax && (primaryVal >= config.criticalMax || (isBP && diastolic >= (config.criticalDiastolicMax || 110)))) {
    anomalies.push({
      severity: "CRITICAL",
      anomalyType: "CRITICAL_SPIKE",
      message: `Critical high threshold breach: ${primaryVal} exceeds critical limit of ${config.criticalMax}`,
    });
  } else if (config.criticalMin && primaryVal <= config.criticalMin) {
    anomalies.push({
      severity: "CRITICAL",
      anomalyType: "CRITICAL_SPIKE",
      message: `Critical low threshold breach: ${primaryVal} is below critical limit of ${config.criticalMin}`,
    });
  }

  // 2. RULE: Consecutive Out-of-Range Readings
  const consecutiveLimit = config.consecutiveBreachLimit || 3;
  const recentReadings = await prisma.vitalReading.findMany({
    where: {
      patientId,
      vitalType,
      recordedAt: { lt: recordedAt },
    },
    orderBy: { recordedAt: "desc" },
    take: consecutiveLimit - 1,
  });

  const checkSingleOutOfRange = (r) => {
    if (isBP) {
      return (
        (config.systolicMax && r.systolic > config.systolicMax) ||
        (config.systolicMin && r.systolic < config.systolicMin) ||
        (config.diastolicMax && r.diastolic > config.diastolicMax) ||
        (config.diastolicMin && r.diastolic < config.diastolicMin)
      );
    }
    return (
      (config.maxNormal && r.value > config.maxNormal) ||
      (config.minNormal && r.value < config.minNormal)
    );
  };

  const isCurrentOutOfRange = checkSingleOutOfRange(reading);
  if (isCurrentOutOfRange && recentReadings.length === consecutiveLimit - 1) {
    const allPreviousBreached = recentReadings.every(checkSingleOutOfRange);
    if (allPreviousBreached) {
      anomalies.push({
        severity: "HIGH",
        anomalyType: "CONSECUTIVE_BREACH",
        message: `${consecutiveLimit} consecutive readings exceeded target thresholds (Current: ${primaryVal})`,
      });
    }
  }

  // 3. RULE: Sudden Deviation from Rolling Baseline
  const baselineDays = config.rollingBaselineDays || 7;
  const baselineStartDate = new Date(new Date(recordedAt).getTime() - baselineDays * 24 * 60 * 60 * 1000);

  const baselineReadings = await prisma.vitalReading.findMany({
    where: {
      patientId,
      vitalType,
      recordedAt: { gte: baselineStartDate, lt: recordedAt },
    },
    select: { value: true, systolic: true },
  });

  if (baselineReadings.length >= 3) {
    const values = baselineReadings.map((r) => (isBP ? r.systolic : r.value)).filter((v) => v !== null);
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const diffPercent = Math.abs((primaryVal - mean) / mean) * 100;
    const allowedDeviation = config.baselineDeviationPercent || 20.0;

    if (diffPercent > allowedDeviation) {
      anomalies.push({
        severity: diffPercent > allowedDeviation * 1.5 ? "HIGH" : "MEDIUM",
        anomalyType: "BASELINE_DEVIATION",
        message: `Sudden ${diffPercent.toFixed(1)}% deviation from ${baselineDays}-day baseline average (${mean.toFixed(1)} -> ${primaryVal})`,
        baselineSnapshot: {
          rollingMean: Number(mean.toFixed(2)),
          windowDays: baselineDays,
          readingsCount: values.length,
          deviationPercent: Number(diffPercent.toFixed(1)),
        },
      });
    }
  }

  return anomalies;
};

/**
 * Record a vital reading (Manual entry or BLE sync)
 */
const recordVitalReadingService = async (payload, currentUserId) => {
  const {
    patientId,
    vitalType,
    source = "MANUAL",
    systolic,
    diastolic,
    value,
    unit,
    context,
    notes,
    deviceModel,
    deviceMacAddress,
    rawBlePayload,
    recordedAt = new Date(),
  } = payload;

  if (!patientId || !vitalType || !unit) {
    throw new Error("patientId, vitalType, and unit are required");
  }

  // Fetch patient threshold configuration
  const threshold = await prisma.vitalThreshold.findUnique({
    where: { patientId_vitalType: { patientId, vitalType } },
  });

  // Save the vital reading
  const reading = await prisma.vitalReading.create({
    data: {
      patientId,
      vitalType,
      source,
      systolic: systolic ? Number(systolic) : null,
      diastolic: diastolic ? Number(diastolic) : null,
      value: value ? Number(value) : null,
      unit,
      context,
      notes,
      deviceModel,
      deviceMacAddress,
      rawBlePayload,
      recordedAt: new Date(recordedAt),
      createdById: currentUserId,
    },
  });

  // Run anomaly detection
  const detectedAnomalies = await evaluateAnomaly(reading, threshold);

  // Generate alerts if anomalies were flagged
  const createdAlerts = [];
  for (const anomaly of detectedAnomalies) {
    const alert = await prisma.vitalAlert.create({
      data: {
        patientId,
        readingId: reading.id,
        vitalType,
        severity: anomaly.severity,
        anomalyType: anomaly.anomalyType,
        message: anomaly.message,
        baselineSnapshot: anomaly.baselineSnapshot || null,
      },
    });
    createdAlerts.push(alert);
  }

  return {
    reading,
    alertsTriggered: createdAlerts,
  };
};

/**
 * Trend Visualization & Clinical Review for Physicians
 */
const getVitalTrendsService = async (patientId, query) => {
  const { vitalType, days = 30 } = query;
  if (!patientId || !vitalType) {
    throw new Error("patientId and vitalType are required");
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Number(days));

  const [readings, threshold, alerts] = await Promise.all([
    prisma.vitalReading.findMany({
      where: {
        patientId,
        vitalType,
        recordedAt: { gte: startDate },
      },
      orderBy: { recordedAt: "asc" },
    }),
    prisma.vitalThreshold.findUnique({
      where: { patientId_vitalType: { patientId, vitalType } },
    }),
    prisma.vitalAlert.findMany({
      where: {
        patientId,
        vitalType,
        createdAt: { gte: startDate },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const isBP = vitalType === "BLOOD_PRESSURE";
  const primaryValues = readings.map((r) => (isBP ? r.systolic : r.value)).filter((v) => v !== null);

  // Calculate Clinical Summary Metrics (Time-In-Range, Rolling Average)
  let timeInRangePercent = 0;
  let average = 0;
  let min = 0;
  let max = 0;

  if (primaryValues.length > 0) {
    average = Number((primaryValues.reduce((a, b) => a + b, 0) / primaryValues.length).toFixed(1));
    min = Math.min(...primaryValues);
    max = Math.max(...primaryValues);

    const targetMin = isBP ? (threshold?.systolicMin || 90) : (threshold?.minNormal || 70);
    const targetMax = isBP ? (threshold?.systolicMax || 130) : (threshold?.maxNormal || 140);

    const inRangeCount = readings.filter((r) => {
      const val = isBP ? r.systolic : r.value;
      return val >= targetMin && val <= targetMax;
    }).length;

    timeInRangePercent = Number(((inRangeCount / readings.length) * 100).toFixed(1));
  }

  return {
    patientId,
    vitalType,
    timeframeDays: Number(days),
    threshold: threshold || DEFAULT_THRESHOLDS[vitalType],
    clinicalSummary: {
      totalReadings: readings.length,
      average,
      min,
      max,
      timeInRangePercent,
      activeAlertsCount: alerts.filter((a) => a.status === "ACTIVE").length,
    },
    dataPoints: readings.map((r) => ({
      id: r.id,
      recordedAt: r.recordedAt,
      source: r.source,
      value: r.value,
      systolic: r.systolic,
      diastolic: r.diastolic,
      unit: r.unit,
      context: r.context,
    })),
    recentAlerts: alerts,
  };
};

/**
 * Acknowledge or Resolve an Alert
 */
const resolveAlertService = async (alertId, payload, currentUserId) => {
  const { status = "RESOLVED", resolutionNote } = payload;
  return await prisma.vitalAlert.update({
    where: { id: alertId },
    data: {
      status,
      resolutionNote,
      acknowledgedById: currentUserId,
      acknowledgedAt: new Date(),
    },
  });
};

module.exports = {
  recordVitalReadingService,
  setPatientThresholdService,
  getPatientThresholdsService,
  getVitalTrendsService,
  resolveAlertService,
};
