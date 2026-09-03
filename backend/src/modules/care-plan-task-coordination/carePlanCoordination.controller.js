const {
  upsertCarePlanService,
  getCarePlanWithHistoryService,
  createCareTaskService,
  completeCareTaskService,
  listCareTasksService,
  clockInShiftService,
  clockOutShiftService,
  listPatientShiftsService,
} = require("./carePlanCoordination.services");

const upsertCarePlan = async (req, res, next) => {
  try {
    const result = await upsertCarePlanService(req.params.patientId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getCarePlan = async (req, res, next) => {
  try {
    const result = await getCarePlanWithHistoryService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createCareTask = async (req, res, next) => {
  try {
    const result = await createCareTaskService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const completeCareTask = async (req, res, next) => {
  try {
    const result = await completeCareTaskService(req.params.taskId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listCareTasks = async (req, res, next) => {
  try {
    const result = await listCareTasksService(req.params.patientId, req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const clockInShift = async (req, res, next) => {
  try {
    const result = await clockInShiftService(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const clockOutShift = async (req, res, next) => {
  try {
    const result = await clockOutShiftService(req.params.shiftId, req.body, req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const listPatientShifts = async (req, res, next) => {
  try {
    const result = await listPatientShiftsService(req.params.patientId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertCarePlan,
  getCarePlan,
  createCareTask,
  completeCareTask,
  listCareTasks,
  clockInShift,
  clockOutShift,
  listPatientShifts,
};
