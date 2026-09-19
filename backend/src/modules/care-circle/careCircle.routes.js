const express = require('express');
const { requireAuth } = require('../../middleware/auth');
const { requireCircleAccess } = require('../../middleware/authorize');
const {
  createCareCircle,
  getCareCircle,
  listMembers,
  inviteMember,
  acceptInvitation,
  revokeMember,
  getUserCareCircles,
  getUserInvitations,
  deleteCareCircle,
} = require('./careCircle.controller');

const CareCircleRouter = express.Router();

CareCircleRouter.post('/', requireAuth, createCareCircle);
CareCircleRouter.get('/users/:userId', requireAuth, getUserCareCircles);
CareCircleRouter.get('/invitations/users/:userId', requireAuth, getUserInvitations);
CareCircleRouter.get('/:id', requireAuth, requireCircleAccess('circle:view'), getCareCircle);
CareCircleRouter.get('/:id/members', requireAuth, requireCircleAccess('circle:view'), listMembers);
CareCircleRouter.post('/:id/invitations', requireAuth, requireCircleAccess('circle:manage_members'), inviteMember);
CareCircleRouter.post('/invitations/accept', requireAuth, acceptInvitation);
CareCircleRouter.patch('/:id/members/:memberId/revoke', requireAuth, requireCircleAccess('circle:revoke_member'), revokeMember);
CareCircleRouter.delete('/:id', requireAuth, deleteCareCircle);

module.exports = CareCircleRouter;