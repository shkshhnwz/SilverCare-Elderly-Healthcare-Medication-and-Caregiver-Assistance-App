const {
  createCareCircleService,
  getCareCircleService,
  listMemberService,
  inviteMemberService,
  acceptInvitationService,
  revokeMemberService,
} = require('./careCircle.service');

const createCareCircle = async (req, res, next) => {
  try {
    const result = await createCareCircleService(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getCareCircle = async (req, res, next) => {
  try {
    const result = await getCareCircleService(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const listMembers = async (req, res, next) => {
  try {
    const result = await listMemberService(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const inviteMember = async (req, res, next) => {
  try {
    const result = await inviteMemberService(req.params.id, req.body, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const acceptInvitation = async (req, res, next) => {
  try {
    const result = await acceptInvitationService(req.body, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const revokeMember = async (req, res, next) => {
  try {
    const result = await revokeMemberService(req.params.id, req.params.memberId, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCareCircle,
  getCareCircle,
  listMembers,
  inviteMember,
  acceptInvitation,
  revokeMember,
};