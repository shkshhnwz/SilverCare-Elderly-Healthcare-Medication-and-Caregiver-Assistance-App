const express = require('express');
const {
  createCareCircle,
  getCareCircle,
  listMembers,
  inviteMember,
  acceptInvitation,
  revokeMember,
} = require('./careCircle.controller');

const CareCircleRouter = express.Router();

CareCircleRouter.post('/', createCareCircle);
CareCircleRouter.get('/:id', getCareCircle);
CareCircleRouter.get('/:id/members', listMembers);
CareCircleRouter.post('/:id/invitations', inviteMember);
CareCircleRouter.post('/invitations/accept', acceptInvitation);
CareCircleRouter.patch('/:id/members/:memberId/revoke', revokeMember);

module.exports = CareCircleRouter;