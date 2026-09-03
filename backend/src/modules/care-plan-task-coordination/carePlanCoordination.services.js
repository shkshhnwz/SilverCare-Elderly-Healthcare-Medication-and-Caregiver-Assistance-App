const prisma = require("../../config/prisma");

/**
 * 1. Upsert Care Plan with automatic versioning & audit trail
 */
const upsertCarePlanService = async (patientId, payload, authorId) => {
  const {
    dietaryNotes,
    mobilityInstructions,
    resuscitationStatus,
    emergencySummary,
    changeReason = "Regular clinical review and care plan update",
  } = payload;

  if (!patientId) throw new Error("patientId is required");

  // Check if active care plan already exists
  const existingPlan = await prisma.carePlan.findUnique({
    where: { patientId },
  });

  let carePlan;
  if (!existingPlan) {
    // Initial v1 Care Plan
    carePlan = await prisma.carePlan.create({
      data: {
        patientId,
        version: 1,
        dietaryNotes,
        mobilityInstructions,
        resuscitationStatus,
        emergencySummary,
        createdById: authorId,
      },
    });

    // Record v1 initial audit snapshot
    await prisma.carePlanAudit.create({
      data: {
        carePlanId: carePlan.id,
        versionNumber: 1,
        changedById: authorId,
        changeSummary: "Initial care plan creation",
        snapshotJson: carePlan,
      },
    });
  } else {
    // Increment version for liability and trust audit
    const nextVersion = existingPlan.version + 1;

    carePlan = await prisma.carePlan.update({
      where: { patientId },
      data: {
        version: nextVersion,
        dietaryNotes: dietaryNotes !== undefined ? dietaryNotes : existingPlan.dietaryNotes,
        mobilityInstructions: mobilityInstructions !== undefined ? mobilityInstructions : existingPlan.mobilityInstructions,
        resuscitationStatus: resuscitationStatus !== undefined ? resuscitationStatus : existingPlan.resuscitationStatus,
        emergencySummary: emergencySummary !== undefined ? emergencySummary : existingPlan.emergencySummary,
      },
    });

    // Save immutable audit snapshot
    await prisma.carePlanAudit.create({
      data: {
        carePlanId: carePlan.id,
        versionNumber: nextVersion,
        changedById: authorId,
        changeSummary: changeReason,
        snapshotJson: carePlan,
      },
    });
  }

  return carePlan;
};

/**
 * 2. Get Care Plan and its full revision history
 */
const getCarePlanWithHistoryService = async (patientId) => {
  const carePlan = await prisma.carePlan.findUnique({
    where: { patientId },
    include: {
      auditHistory: {
        include: { changedBy: { select: { id: true, firstName: true, lastName: true } } },
        orderBy: { versionNumber: "desc" },
      },
      tasks: {
        where: { status: { in: ["PENDING", "IN_PROGRESS"] } },
        orderBy: { dueWindowStart: "asc" },
      },
    },
  });

  if (!carePlan) throw new Error("Care plan not found for this patient");
  return carePlan;
};

/**
 * 3. Create a Care Task with due window
 */
const createCareTaskService = async (payload) => {
  const {
    carePlanId,
    patientId,
    title,
    description,
    category = "GENERAL",
    assignedToId,
    dueWindowStart,
    dueWindowEnd,
    recurringRRule,
  } = payload;

  if (!carePlanId || !patientId || !title || !dueWindowStart || !dueWindowEnd) {
    throw new Error("carePlanId, patientId, title, dueWindowStart, and dueWindowEnd are required");
  }

  return await prisma.careTask.create({
    data: {
      carePlanId,
      patientId,
      title,
      description,
      category,
      assignedToId: assignedToId || null,
      dueWindowStart: new Date(dueWindowStart),
      dueWindowEnd: new Date(dueWindowEnd),
      recurringRRule,
      status: "PENDING",
    },
    include: {
      assignedTo: { select: { id: true, firstName: true, lastName: true } },
    },
  });
};

/**
 * 4. Complete a Care Task with notes
 */
const completeCareTaskService = async (taskId, payload, completedById) => {
  const { completionNotes } = payload;

  return await prisma.careTask.update({
    where: { id: taskId },
    data: {
      status: "COMPLETED",
      completedById,
      completedAt: new Date(),
      completionNotes: completionNotes || "Task completed as scheduled.",
    },
  });
};

/**
 * 5. List tasks for a patient
 */
const listCareTasksService = async (patientId, query = {}) => {
  const { status, assignedToId } = query;
  const where = { patientId };

  if (status) where.status = status;
  if (assignedToId) where.assignedToId = assignedToId;

  return await prisma.careTask.findMany({
    where,
    include: {
      assignedTo: { select: { id: true, firstName: true, lastName: true } },
      completedBy: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { dueWindowStart: "asc" },
  });
};

/**
 * 6. Professional Caregiver Shift: Clock In
 */
const clockInShiftService = async (payload, caregiverId) => {
  const { patientId, clockInLocation } = payload;
  if (!patientId) throw new Error("patientId is required");

  // Check if already clocked into an active shift
  const activeShift = await prisma.careShift.findFirst({
    where: { caregiverId, status: "ACTIVE" },
  });
  if (activeShift) {
    throw new Error("You already have an active shift. Please clock out first.");
  }

  return await prisma.careShift.create({
    data: {
      caregiverId,
      patientId,
      clockInLocation,
      status: "ACTIVE",
    },
    include: {
      patient: { select: { id: true, firstName: true, lastName: true } },
    },
  });
};

/**
 * 7. Professional Caregiver Shift: Clock Out with Structured Notes
 */
const clockOutShiftService = async (shiftId, payload, caregiverId) => {
  const {
    clockOutLocation,
    moodAndMentalState,
    mealsAndHydration,
    incidentsOrConcerns,
    handoffNotesNextShift,
  } = payload;

  const shift = await prisma.careShift.findUnique({ where: { id: shiftId } });
  if (!shift || shift.caregiverId !== caregiverId) {
    throw new Error("Shift not found or unauthorized");
  }

  return await prisma.careShift.update({
    where: { id: shiftId },
    data: {
      clockOutAt: new Date(),
      clockOutLocation,
      status: "COMPLETED",
      moodAndMentalState,
      mealsAndHydration,
      incidentsOrConcerns,
      handoffNotesNextShift,
    },
  });
};

/**
 * 8. List shift logs for a patient
 */
const listPatientShiftsService = async (patientId) => {
  return await prisma.careShift.findMany({
    where: { patientId },
    include: {
      caregiver: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { clockInAt: "desc" },
  });
};

module.exports = {
  upsertCarePlanService,
  getCarePlanWithHistoryService,
  createCareTaskService,
  completeCareTaskService,
  listCareTasksService,
  clockInShiftService,
  clockOutShiftService,
  listPatientShiftsService,
};
