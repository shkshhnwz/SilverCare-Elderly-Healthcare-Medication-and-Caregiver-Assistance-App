const crypto = require("crypto");

const medications = new Map(); // key: medicationId
const patientMedicationIndex = new Map(); // key: patientId -> Set(medicationId)
const medicationDoses = new Map(); // key: medicationId -> Array<dose>

const DOSE_STATES = {
    SCHEDULED: "scheduled",
    NOTIFIED: "notified",
    CONFIRMED_TAKEN: "confirmed_taken",
    CONFIRMED_SKIPPED: "confirmed_skipped",
    MISSED: "missed",
    ESCALATED: "escalated",
};

const ALLOWED_TRANSITIONS = {
    [DOSE_STATES.SCHEDULED]: [DOSE_STATES.NOTIFIED, DOSE_STATES.CONFIRMED_TAKEN, DOSE_STATES.CONFIRMED_SKIPPED],
    [DOSE_STATES.NOTIFIED]: [DOSE_STATES.CONFIRMED_TAKEN, DOSE_STATES.CONFIRMED_SKIPPED, DOSE_STATES.MISSED],
    [DOSE_STATES.MISSED]: [DOSE_STATES.ESCALATED],
    [DOSE_STATES.CONFIRMED_TAKEN]: [],
    [DOSE_STATES.CONFIRMED_SKIPPED]: [],
    [DOSE_STATES.ESCALATED]: [],
};

const INTERACTION_RULES = [
    ["warfarin", "aspirin", "Higher bleeding risk"],
    ["lisinopril", "spironolactone", "Potential high potassium risk"],
    ["ibuprofen", "naproxen", "Duplicate NSAID therapy risk"],
];

const indexMedicationForPatient = (patientId, medicationId) => {
    if (!patientMedicationIndex.has(patientId)) {
        patientMedicationIndex.set(patientId, new Set());
    }

    patientMedicationIndex.get(patientId).add(medicationId);
};

const getPatientMedicationIds = (patientId) => {
    return Array.from(patientMedicationIndex.get(patientId) || []);
};

const isTransitionValid = (fromState, toState) => {
    return (ALLOWED_TRANSITIONS[fromState] || []).includes(toState);
};

const parseRRuleFrequency = (rrule) => {
    if (!rrule || typeof rrule !== "string") {
        throw new Error("frequencyRRule is required");
    }

    const normalized = rrule.toUpperCase();
    if (!normalized.includes("FREQ=")) {
        throw new Error("frequencyRRule must include FREQ (for example: FREQ=DAILY;INTERVAL=1)");
    }

    return normalized;
};

const computeNextDoseAt = (rrule, fromDate = new Date()) => {
    const normalized = parseRRuleFrequency(rrule);
    const intervalMatch = normalized.match(/INTERVAL=(\d+)/);
    const interval = intervalMatch ? Number(intervalMatch[1]) : 1;
    const next = new Date(fromDate);

    if (normalized.includes("FREQ=HOURLY")) {
        next.setHours(next.getHours() + interval);
        return next;
    }

    if (normalized.includes("FREQ=WEEKLY")) {
        next.setDate(next.getDate() + interval * 7);
        return next;
    }

    if (normalized.includes("FREQ=MONTHLY")) {
        next.setMonth(next.getMonth() + interval);
        return next;
    }

    next.setDate(next.getDate() + interval);
    return next;
};

const runInteractionAndDuplicateCheck = (patientId, medicationName) => {
    const name = (medicationName || "").toLowerCase().trim();
    const warnings = [];

    const existingMedicationNames = getPatientMedicationIds(patientId)
        .map((medicationId) => medications.get(medicationId))
        .filter(Boolean)
        .map((medication) => (medication.medicationName || "").toLowerCase().trim());

    if (existingMedicationNames.includes(name)) {
        warnings.push({
            type: "duplicate_therapy",
            message: `Possible duplicate therapy: ${medicationName} is already active for this patient`,
        });
    }

    for (const existing of existingMedicationNames) {
        for (const [a, b, reason] of INTERACTION_RULES) {
            const pairMatches = (name === a && existing === b) || (name === b && existing === a);
            if (pairMatches) {
                warnings.push({
                    type: "drug_interaction",
                    message: `${medicationName} with ${existing} warning: ${reason}`,
                });
            }
        }
    }

    return warnings;
};

const createInitialDose = (medicationId, scheduledAt) => {
    return {
        id: crypto.randomUUID(),
        medicationId,
        scheduledAt,
        state: DOSE_STATES.SCHEDULED,
        acknowledgement: null,
        escalationStep: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

const createMedicationService = async (payload, currentUser) => {
    const {
        patientId,
        medicationName,
        dosage,
        route,
        frequencyRRule,
        prescribingDoctor,
        refillQuantity,
        startAt,
    } = payload;

    if (!patientId || !medicationName || !dosage || !route || !frequencyRRule || !prescribingDoctor) {
        throw new Error("patientId, medicationName, dosage, route, frequencyRRule and prescribingDoctor are required");
    }

    if (!Number.isFinite(Number(refillQuantity)) || Number(refillQuantity) <= 0) {
        throw new Error("refillQuantity must be a positive number");
    }

    const normalizedRRule = parseRRuleFrequency(frequencyRRule);
    const warnings = runInteractionAndDuplicateCheck(patientId, medicationName);
    const medicationId = crypto.randomUUID();
    const initialScheduledAt = startAt ? new Date(startAt) : new Date();
    const initialDose = createInitialDose(medicationId, initialScheduledAt);

    const medication = {
        id: medicationId,
        patientId,
        medicationName,
        dosage,
        route,
        frequencyRRule: normalizedRRule,
        prescribingDoctor,
        refillQuantity: Number(refillQuantity),
        createdBy: currentUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    medications.set(medicationId, medication);
    indexMedicationForPatient(patientId, medicationId);
    medicationDoses.set(medicationId, [initialDose]);

    return {
        medication,
        warnings,
        initialDose,
        notes: [
            "Interaction/duplicate checks are local rules now; replace with RxNorm/OpenFDA API integration.",
        ],
    };
};

const listMedicationService = async (patientId) => {
    if (!patientId) {
        throw new Error("patientId is required");
    }

    const result = getPatientMedicationIds(patientId)
        .map((medicationId) => medications.get(medicationId))
        .filter(Boolean)
        .map((medication) => ({
            ...medication,
            doses: medicationDoses.get(medication.id) || [],
        }));

    return result;
};

const scheduleNextDoseService = async (medicationId) => {
    const medication = medications.get(medicationId);
    if (!medication) {
        throw new Error("Medication not found");
    }

    const doses = medicationDoses.get(medicationId) || [];
    const latestDose = doses[doses.length - 1];
    const nextScheduledAt = computeNextDoseAt(medication.frequencyRRule, latestDose ? new Date(latestDose.scheduledAt) : new Date());
    const newDose = createInitialDose(medicationId, nextScheduledAt);

    doses.push(newDose);
    medicationDoses.set(medicationId, doses);

    return newDose;
};

const acknowledgeDoseService = async (medicationId, doseId, payload) => {
    const { action, confirmationType, evidenceUrl, note } = payload;
    const medication = medications.get(medicationId);

    if (!medication) {
        throw new Error("Medication not found");
    }

    const doses = medicationDoses.get(medicationId) || [];
    const dose = doses.find((item) => item.id === doseId);
    if (!dose) {
        throw new Error("Dose not found");
    }

    let nextState = null;
    if (action === "taken") {
        nextState = DOSE_STATES.CONFIRMED_TAKEN;
    } else if (action === "skipped") {
        nextState = DOSE_STATES.CONFIRMED_SKIPPED;
    } else if (action === "notified") {
        nextState = DOSE_STATES.NOTIFIED;
    } else {
        throw new Error("action must be one of: notified, taken, skipped");
    }

    if (!isTransitionValid(dose.state, nextState)) {
        throw new Error(`Invalid dose state transition: ${dose.state} -> ${nextState}`);
    }

    dose.state = nextState;
    dose.updatedAt = new Date();

    if (nextState === DOSE_STATES.CONFIRMED_TAKEN || nextState === DOSE_STATES.CONFIRMED_SKIPPED) {
        dose.acknowledgement = {
            confirmedAt: new Date(),
            confirmationType: confirmationType || "tap",
            evidenceUrl: evidenceUrl || null,
            note: note || null,
        };
    }

    return dose;
};

const escalateDoseService = async (medicationId, doseId) => {
    const medication = medications.get(medicationId);
    if (!medication) {
        throw new Error("Medication not found");
    }

    const doses = medicationDoses.get(medicationId) || [];
    const dose = doses.find((item) => item.id === doseId);
    if (!dose) {
        throw new Error("Dose not found");
    }

    if (dose.state === DOSE_STATES.SCHEDULED) {
        dose.state = DOSE_STATES.NOTIFIED;
        dose.escalationStep = 1;
        dose.updatedAt = new Date();
        return { dose, channel: "push" };
    }

    if (dose.state === DOSE_STATES.NOTIFIED) {
        dose.state = DOSE_STATES.MISSED;
        dose.escalationStep = 2;
        dose.updatedAt = new Date();
        return { dose, channel: "sms" };
    }

    if (dose.state === DOSE_STATES.MISSED) {
        dose.state = DOSE_STATES.ESCALATED;
        dose.escalationStep = 3;
        dose.updatedAt = new Date();
        return { dose, channel: "caregiver_call" };
    }

    throw new Error(`Dose in state ${dose.state} cannot be escalated`);
};

const getRefillPredictionService = async (medicationId) => {
    const medication = medications.get(medicationId);
    if (!medication) {
        throw new Error("Medication not found");
    }

    const doses = medicationDoses.get(medicationId) || [];
    const takenCount = doses.filter((dose) => dose.state === DOSE_STATES.CONFIRMED_TAKEN).length;

    const daysCovered = Math.max(1, Math.ceil(doses.length / 3));
    const averageTakenPerDay = takenCount / daysCovered;
    const safeDailyConsumption = averageTakenPerDay > 0 ? averageTakenPerDay : 1;
    const daysRemaining = medication.refillQuantity / safeDailyConsumption;
    const runOutAt = new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000);
    const alertAt = new Date(runOutAt.getTime() - 5 * 24 * 60 * 60 * 1000);

    return {
        medicationId,
        refillQuantity: medication.refillQuantity,
        takenCount,
        averageTakenPerDay,
        daysRemaining,
        predictedRunOutDate: runOutAt,
        proactiveAlertDate: alertAt,
    };
};

const getAdherenceAnalyticsService = async (patientId) => {
    const patientMedicationIds = getPatientMedicationIds(patientId);
    const allDoses = patientMedicationIds.flatMap((medicationId) => medicationDoses.get(medicationId) || []);

    const scheduled = allDoses.length;
    const taken = allDoses.filter((dose) => dose.state === DOSE_STATES.CONFIRMED_TAKEN).length;
    const skipped = allDoses.filter((dose) => dose.state === DOSE_STATES.CONFIRMED_SKIPPED).length;
    const missed = allDoses.filter((dose) => dose.state === DOSE_STATES.MISSED || dose.state === DOSE_STATES.ESCALATED).length;

    const adherencePercent = scheduled ? Number(((taken / scheduled) * 100).toFixed(2)) : 0;
    const skippedPercent = scheduled ? Number(((skipped / scheduled) * 100).toFixed(2)) : 0;
    const missedPercent = scheduled ? Number(((missed / scheduled) * 100).toFixed(2)) : 0;

    const byHour = {};
    for (const dose of allDoses) {
        const hour = new Date(dose.scheduledAt).getHours();
        if (!byHour[hour]) {
            byHour[hour] = { total: 0, missed: 0 };
        }
        byHour[hour].total += 1;
        if (dose.state === DOSE_STATES.MISSED || dose.state === DOSE_STATES.ESCALATED) {
            byHour[hour].missed += 1;
        }
    }

    return {
        patientId,
        summary: {
            scheduled,
            taken,
            skipped,
            missed,
            adherencePercent,
            skippedPercent,
            missedPercent,
        },
        missedDosePatternsByHour: byHour,
        export: {
            pdfReady: false,
            note: "Add a PDF generator service (for example, Puppeteer) for physician-visit exports.",
        },
    };
};

module.exports = {
    createMedicationService,
    listMedicationService,
    scheduleNextDoseService,
    acknowledgeDoseService,
    escalateDoseService,
    getRefillPredictionService,
    getAdherenceAnalyticsService,
};