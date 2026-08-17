const prisma = require('../../config/prisma');

const createCareCircleService = async (payload, user) => {
  const { name, patientId } = payload;

  if (!name || !patientId) {
    throw new Error('Name and patientId are required');
  }

  const circle = await prisma.careCircle.create({
    data: {
      name,
      patientId,
      ownerId: user.id,
      memberships: {
        create: {
          userId: user.id,
          role: {
            connect: { name: 'OWNER' },
          },
          status: 'ACTIVE',
        },
      },
    },
    include: {
      memberships: {
        include: {
          role: true,
          user: true,
        },
      },
    },
  });

  return circle;
};

const getCareCircleService = async (id) => {
  return prisma.careCircle.findUnique({
    where: { id },
    include: {
      memberships: {
        include: {
          role: true,
          user: true,
        },
      },
    },
  });
};

const listMemberService = async (circleId) => {
  return prisma.careCircleMember.findMany({
    where: { circleId, status: 'ACTIVE' },
    include: {
      role: true,
      user: true,
    },
  });
};

const inviteMemberService = async () => {
  throw new Error('Invite member service not implemented yet');
};

const acceptInvitationService = async () => {
  throw new Error('Accept invitation service not implemented yet');
};

const revokeMemberService = async () => {
  throw new Error('Revoke member service not implemented yet');
};

module.exports = {
  createCareCircleService,
  getCareCircleService,
  listMemberService,
  inviteMemberService,
  acceptInvitationService,
  revokeMemberService,
};