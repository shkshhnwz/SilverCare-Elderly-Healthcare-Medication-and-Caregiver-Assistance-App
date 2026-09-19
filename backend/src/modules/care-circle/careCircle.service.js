const crypto = require("crypto");
const prisma = require("../../config/prisma");
const { sendSMS, sendEmail } = require("../../utils/notifications");

const createCareCircleService = async (payload, user) => {
  const { name, patientId, patientCoOwn } = payload;

  if (!name || !patientId) {
    throw new Error("Name and patientId are required");
  }

  // Prepare memberships list
  const membershipsToCreate = [
    {
      user: {
        connect: { id: user.id },
      },
      role: {
        connect: { name: "OWNER" },
      },
      status: "ACTIVE",
    },
  ];

  // If patientCoOwn is true and patient is not the creator, auto-add patient as OWNER
  if (patientCoOwn && patientId !== user.id) {
    membershipsToCreate.push({
      user: {
        connect: { id: patientId },
      },
      role: {
        connect: { name: "OWNER" },
      },
      status: "ACTIVE",
    });
  }

  const circle = await prisma.careCircle.create({
    data: {
      name,
      patientId,
      ownerId: user.id,
      memberships: {
        create: membershipsToCreate,
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
    where: { circleId, status: "ACTIVE" },
    include: {
      role: true,
      user: true,
    },
  });
};

const inviteMemberService = async (circleId, payload, currentUser) => {
  const { roleName, email, phone } = payload;

  if (!roleName) {
    throw new Error("roleName is required");
  }

  if (!email && !phone) {
    throw new Error("Email or phone is required to invite a member");
  }

  // 1. Verify Care Circle exists
  const circle = await prisma.careCircle.findUnique({
    where: { id: circleId },
  });
  if (!circle) {
    throw new Error("Care circle not found");
  }

  // 2. Verify role exists
  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });
  if (!role) {
    throw new Error(`Role ${roleName} does not exist`);
  }

  // 3. Generate token
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  // Set expiration: 24 hours from now
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // 4. Create Invitation
  const invitation = await prisma.invitation.create({
    data: {
      circleId,
      invitedById: currentUser.id,
      roleId: role.id,
      email: email || null,
      phone: phone || null,
      tokenHash,
      expiresAt,
      status: "PENDING",
    },
    include: {
      role: true,
      circle: true,
    },
  });

  // 5. Send notification (SMS or Email)
  const inviteLink = `http://localhost:5000/api/care-circles/invitations/accept?token=${token}`;
  const inviteMessage = `You have been invited by ${currentUser.firstName} to join the Care Circle "${circle.name}" as a ${roleName}. Use this token to accept: ${token}`;

  if (email) {
    await sendEmail(email, `Invitation to join Care Circle ${circle.name}`, inviteMessage);
  } else if (phone) {
    await sendSMS(phone, inviteMessage);
  }

  // Log audit log
  await prisma.auditLog.create({
    data: {
      actorId: currentUser.id,
      circleId,
      action: "INVITE_MEMBER",
      resourceType: "INVITATION",
      resourceId: invitation.id,
      metadata: { roleName, email, phone },
    },
  });

  // Return the token in response so the testing harness can use it easily
  return { invitation, token };
};

const acceptInvitationService = async (payload, currentUser) => {
  const { token, invitationId } = payload;

  if (!token && !invitationId) {
    throw new Error("Token or invitationId is required");
  }

  let invitation;

  if (token) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    invitation = await prisma.invitation.findUnique({
      where: { tokenHash },
      include: { circle: true, role: true },
    });
  } else if (invitationId) {
    invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      include: { circle: true, role: true },
    });
    // Verify it belongs to the current user
    if (invitation && invitation.email !== currentUser.email && invitation.phone !== currentUser.phone) {
      throw new Error("Access denied to this invitation");
    }
  }

  if (!invitation) {
    throw new Error("Invalid or expired invitation");
  }

  if (invitation.status !== "PENDING") {
    throw new Error(`Invitation is already ${invitation.status.toLowerCase()}`);
  }

  // Check expiration
  if (invitation.expiresAt < new Date()) {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: "EXPIRED" },
    });
    throw new Error("Invitation has expired");
  }

  // Create or update membership in Care Circle
  const membership = await prisma.careCircleMember.upsert({
    where: {
      circleId_userId: {
        circleId: invitation.circleId,
        userId: currentUser.id,
      },
    },
    update: {
      roleId: invitation.roleId,
      status: "ACTIVE",
      joinedAt: new Date(),
      revokedAt: null,
    },
    create: {
      circleId: invitation.circleId,
      userId: currentUser.id,
      roleId: invitation.roleId,
      status: "ACTIVE",
    },
  });

  // Update invitation status
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: "ACCEPTED",
      acceptedAt: new Date(),
    },
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      actorId: currentUser.id,
      circleId: invitation.circleId,
      action: "ACCEPT_INVITATION",
      resourceType: "MEMBER",
      resourceId: membership.id,
      metadata: { invitationId: invitation.id },
    },
  });

  return { membership, circle: invitation.circle };
};

const revokeMemberService = async (circleId, memberId, currentUser) => {
  // Find the CareCircleMember
  let membership = await prisma.careCircleMember.findFirst({
    where: {
      circleId,
      OR: [
        { id: memberId },
        { userId: memberId },
      ],
    },
    include: {
      role: true,
      user: true,
    },
  });

  if (!membership) {
    throw new Error("Care circle member not found");
  }

  // Find the Care Circle
  const circle = await prisma.careCircle.findUnique({
    where: { id: circleId },
  });

  if (!circle) {
    throw new Error("Care circle not found");
  }

  // Access check: requester must be OWNER of circle, or the patient themselves
  const currentMember = await prisma.careCircleMember.findFirst({
    where: {
      circleId,
      userId: currentUser.id,
      status: "ACTIVE",
    },
    include: { role: true },
  });

  const isOwner = currentMember && currentMember.role.name === "OWNER";
  const isPatient = circle.patientId === currentUser.id;

  if (!isOwner && !isPatient) {
    throw new Error("Access denied. Only the owner or the patient can revoke memberships.");
  }

  // Ensure primary owner cannot revoke their own access
  if (membership.userId === currentUser.id && isOwner && circle.ownerId === currentUser.id) {
    throw new Error("Primary owner cannot revoke their own access.");
  }

  // Update membership status to REVOKED
  const updatedMembership = await prisma.careCircleMember.update({
    where: { id: membership.id },
    data: {
      status: "REVOKED",
      revokedAt: new Date(),
    },
  });

  // Create audit log
  await prisma.auditLog.create({
    data: {
      actorId: currentUser.id,
      circleId,
      action: "REVOKE_MEMBER",
      resourceType: "MEMBER",
      resourceId: membership.id,
      metadata: { revokedUserId: membership.userId },
    },
  });

  return updatedMembership;
};

const getUserCareCirclesService = async (userId) => {
  const memberships = await prisma.careCircleMember.findMany({
    where: { userId, status: "ACTIVE" },
    include: {
      circle: {
        include: {
          memberships: {
            include: {
              role: true,
              user: {
                select: { id: true, firstName: true, lastName: true }
              }
            }
          }
        }
      }
    }
  });
  return memberships.map(m => {
    // Add members array to circle to match frontend expectation
    const circle = m.circle;
    circle.members = circle.memberships;
    return circle;
  });
};

const getUserInvitationsService = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  
  const invitations = await prisma.invitation.findMany({
    where: {
      status: "PENDING",
      OR: [
        user.email ? { email: user.email } : undefined,
        user.phone ? { phone: user.phone } : undefined
      ].filter(Boolean)
    },
    include: {
      circle: true,
      role: true,
    }
  });

  return invitations.map(inv => ({
    id: inv.id,
    circleName: inv.circle.name,
    role: inv.role.name,
    status: inv.status
  }));
};

const deleteCareCircleService = async (circleId, currentUser) => {
  const circle = await prisma.careCircle.findUnique({
    where: { id: circleId }
  });

  if (!circle) {
    throw new Error("Care circle not found");
  }

  if (circle.ownerId !== currentUser.id) {
    throw new Error("Access denied. Only the owner can delete the care circle.");
  }

  await prisma.careCircle.delete({
    where: { id: circleId }
  });

  await prisma.auditLog.create({
    data: {
      actorId: currentUser.id,
      action: "DELETE_CARE_CIRCLE",
      resourceType: "CARE_CIRCLE",
      resourceId: circleId,
    },
  });

  return { success: true };
};

module.exports = {
  createCareCircleService,
  getCareCircleService,
  listMemberService,
  inviteMemberService,
  acceptInvitationService,
  revokeMemberService,
  getUserCareCirclesService,
  getUserInvitationsService,
  deleteCareCircleService,
};