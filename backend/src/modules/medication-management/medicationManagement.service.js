const crypto = require("crypto");
const prisma = require("../../config/prisma");

const DOSE_STATES = {
    SCHEDULED: "SCHEDULED",
    NOTIFIED: "NOTIFIED",
    CONFIRMED_TAKEN: "CONFIRMED_TAKEN",
    CONFIRMED_SKIPPED: "CONFIRMED_SKIPPED",
    MISSED: "MISSED",
    ESCALATED: "ESCALATED",
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

const runInteractionAndDuplicateCheck = async (patientId, medicationName) => {
    const name = (medicationName || "").toLowerCase().trim();
    const warnings = [];

    const existingMedications = await prisma.medication.findMany({
        where: { patientId, active: true },
    });

    const existingMedicationNames = existingMedications
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
    const warnings = await runInteractionAndDuplicateCheck(patientId, medicationName);
    const initialScheduledAt = startAt ? new Date(startAt) : new Date();

    const medication = await prisma.medication.create({
        data: {
            patientId,
            medicationName,
            dosage,
            route,
            frequencyRRule: normalizedRRule,
            prescribingDoctor,
            refillQuantity: Number(refillQuantity),
            createdById: currentUser.id,
            doses: {
                create: {
                    scheduledAt: initialScheduledAt,
                    state: DOSE_STATES.SCHEDULED,
                }
            }
        },
        include: {
            doses: true
        }
    });

    return {
        medication,
        warnings,
        initialDose: medication.doses[0],
        notes: [
            "Interaction/duplicate checks are local rules now; replace with RxNorm/OpenFDA API integration.",
        ],
    };
};

const listMedicationService = async (patientId) => {
    if (!patientId) {
        throw new Error("patientId is required");
    }

    const result = await prisma.medication.findMany({
        where: { patientId, active: true },
        include: {
            doses: {
                orderBy: { scheduledAt: 'asc' }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // Frontend expects dose.state to be lowercase for matching Badge Variants
    return result.map(m => ({
        ...m,
        doses: m.doses.map(d => ({ ...d, state: d.state.toLowerCase() }))
    }));
};

const scheduleNextDoseService = async (medicationId) => {
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
        include: { doses: { orderBy: { scheduledAt: 'desc' }, take: 1 } }
    });

    if (!medication) {
        throw new Error("Medication not found");
    }

    const latestDose = medication.doses[0];
    const nextScheduledAt = computeNextDoseAt(
        medication.frequencyRRule, 
        latestDose ? new Date(latestDose.scheduledAt) : new Date()
    );

    const newDose = await prisma.medicationDose.create({
        data: {
            medicationId,
            scheduledAt: nextScheduledAt,
            state: DOSE_STATES.SCHEDULED,
        }
    });

    return { ...newDose, state: newDose.state.toLowerCase() };
};

const acknowledgeDoseService = async (medicationId, doseId, payload) => {
    const { action, confirmationType, evidenceUrl, note } = payload;
    
    const dose = await prisma.medicationDose.findUnique({
        where: { id: doseId }
    });

    if (!dose || dose.medicationId !== medicationId) {
        throw new Error("Dose not found for this medication");
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

    const updateData = {
        state: nextState,
    };

    if (nextState === DOSE_STATES.CONFIRMED_TAKEN || nextState === DOSE_STATES.CONFIRMED_SKIPPED) {
        updateData.acknowledgedAt = new Date();
        updateData.confirmationType = confirmationType ? confirmationType.toUpperCase() : "TAP";
        updateData.evidenceUrl = evidenceUrl || null;
        updateData.note = note || null;
    }

    const updatedDose = await prisma.medicationDose.update({
        where: { id: doseId },
        data: updateData
    });

    return { ...updatedDose, state: updatedDose.state.toLowerCase() };
};

const escalateDoseService = async (medicationId, doseId) => {
    const dose = await prisma.medicationDose.findUnique({
        where: { id: doseId }
    });

    if (!dose || dose.medicationId !== medicationId) {
        throw new Error("Dose not found for this medication");
    }

    let nextState = null;
    let escalationStep = dose.escalationStep;
    let channel = "push";

    if (dose.state === DOSE_STATES.SCHEDULED) {
        nextState = DOSE_STATES.NOTIFIED;
        escalationStep = 1;
        channel = "push";
    } else if (dose.state === DOSE_STATES.NOTIFIED) {
        nextState = DOSE_STATES.MISSED;
        escalationStep = 2;
        channel = "sms";
    } else if (dose.state === DOSE_STATES.MISSED) {
        nextState = DOSE_STATES.ESCALATED;
        escalationStep = 3;
        channel = "caregiver_call";
    } else {
        throw new Error(`Dose in state ${dose.state} cannot be escalated`);
    }

    const updatedDose = await prisma.medicationDose.update({
        where: { id: doseId },
        data: { state: nextState, escalationStep }
    });

    return { dose: { ...updatedDose, state: updatedDose.state.toLowerCase() }, channel };
};

const getRefillPredictionService = async (medicationId) => {
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
        include: { doses: true }
    });

    if (!medication) {
        throw new Error("Medication not found");
    }

    const doses = medication.doses;
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
    const medications = await prisma.medication.findMany({
        where: { patientId, active: true },
        include: { doses: true }
    });

    const allDoses = medications.flatMap((medication) => medication.doses || []);

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