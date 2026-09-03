const express = require("express");
const { requireAuth } = require("../../middleware/auth");
const {
  upsertCarePlan,
  getCarePlan,
  createCareTask,
  completeCareTask,
  listCareTasks,
  clockInShift,
  clockOutShift,
  listPatientShifts,
} = require("./carePlanCoordination.controller");

const CarePlanRouter = express.Router();

// 1. Care Plan & Version Audit
CarePlanRouter.post("/patients/:patientId", requireAuth, upsertCarePlan);
CarePlanRouter.get("/patients/:patientId", requireAuth, getCarePlan);

// 2. Task Coordination
CarePlanRouter.post("/tasks", requireAuth, createCareTask);
CarePlanRouter.patch("/tasks/:taskId/complete", requireAuth, completeCareTask);
CarePlanRouter.get("/patients/:patientId/tasks", requireAuth, listCareTasks);

// 3. Shift-Based Logging for Professional Caregivers
CarePlanRouter.post("/shifts/clock-in", requireAuth, clockInShift);
CarePlanRouter.patch("/shifts/:shiftId/clock-out", requireAuth, clockOutShift);
CarePlanRouter.get("/patients/:patientId/shifts", requireAuth, listPatientShifts);

module.exports = CarePlanRouter;
