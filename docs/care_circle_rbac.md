# Care Circle & Role-Based Access Control (RBAC) Documentation

This document describes the design, implementation, and endpoints of the **Care Circle & Role-Based Access (6.1)** feature in the SilverCare application.

---

## 1. Architectural & Database Schema Overview

The Care Circle system is structured around the following Prisma database entities:

- **`User`**: Represents any actor in the system (e.g., patient, family member, caregiver, physician).
- **`CareCircle`**: The primary entity connecting a single **patient** (`patientId`) and a primary **owner** (`ownerId`) with a set of circle members.
- **`CareCircleMember`**: A join table mapping a `User` to a `CareCircle` with a specific `Role`. It supports statuses like `ACTIVE`, `INVITED`, `SUSPENDED`, or `REVOKED`.
- **`Role`**: Predefined roles mapping directly to the Care Circle's membership levels:
  - `OWNER`: Full administrative access (create invites, revoke members, configure details).
  - `CAREGIVER_FULL`: Manage and view patient daily activities, vitals, medications, and tasks.
  - `CAREGIVER_VIEW`: Read-only access to care logs, tasks, and vitals (no write operations).
  - `PROFESSIONAL`: Professional caregiver access (record vitals, view/complete tasks, but cannot see financial/insurance information).
  - `PHYSICIAN`: Physician level access (record vitals, manage/update medications, view care activities).
- **`Permission`**: A catalog of fine-grained access actions (e.g., `circle:view`, `vitals:create`, `medication:update`).
- **`RolePermission`**: Maps permissions directly to roles.
- **`Invitation`**: Represents pending circle invites with a `tokenHash` and `expiresAt` date limit.
- **`AuditLog`**: Captures a tamper-proof trail of security events, listing the action, circle context, and actor.

---

## 2. Dignity & Consent-First Access Design

Many elderly care applications operate on surveillance-only models where the patient is a passive subject. SilverCare adopts a **consent-first architecture**:
1. **Co-Ownership**: Upon circle creation, if `patientCoOwn` is set to `true`, the patient is automatically added as a member with the `OWNER` role.
2. **Universal Patient Overrides**: Even if the patient does not hold the `OWNER` role in their membership relation, our authorization checks bypass normal role boundaries for the patient:
   - The patient can always list and view who has access to their circle.
   - The patient has universal authority to revoke any member's access at any time.

---

## 3. Core Implementation Details

### A. Automatic Patient Access & RBAC Middleware

The access check middleware (`requireCircleAccess`) is located in [`authorize.js`](file:///c:/silverCare/SilverCare-Elderly-Healthcare-Medication-and-Caregiver-Assistance-App/backend/src/middleware/authorize.js). It handles both standard RBAC and the dignity-first patient bypass.

```javascript
const requireCircleAccess = (permissionKey) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const circleId = req.params.id || req.body.circleId || req.query.circleId;
      if (!circleId) {
        return res.status(400).json({ message: "Circle id is required" });
      }

      const circle = await prisma.careCircle.findUnique({
        where: { id: circleId },
      });

      if (!circle) {
        return res.status(404).json({ message: "Care circle not found" });
      }

      // Dignity-first/Consent-first check: The patient always has access to see/revoke members
      if (circle.patientId === req.user.id) {
        return next();
      }

      // Check membership and permissions
      const membership = await prisma.careCircleMember.findFirst({
        where: {
          circleId,
          userId: req.user.id,
          status: "ACTIVE",
        },
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      });

      if (!membership) {
        return res.status(403).json({ message: "You are not a member of this care circle" });
      }

      if (permissionKey) {
        const permissions = membership.role.rolePermissions.map(
          (rp) => rp.permission.key
        );

        if (!permissions.includes(permissionKey)) {
          return res.status(403).json({
            message: `Access denied. Missing permission: ${permissionKey}`,
          });
        }
      }

      req.member = membership;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Authorization check failed",
        error: error.message,
      });
    }
  };
};
```

---

### B. Time-Limited Signed Invitation Flow

Invitations are handled through cryptographically secure tokens. The flow works as follows:

1. **Generation** (`inviteMemberService`):
   - A 32-byte clear random token is generated.
   - The token is hashed with SHA-256 and stored as `tokenHash` in the database to prevent token leakage from database reads.
   - An expiration timestamp is set (24 hours).
   - A mock SMS/Email notification is dispatched.

```javascript
// Token generation & Hashing in CareCircle.service.js
const token = crypto.randomBytes(32).toString("hex");
const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Hours

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
});
```

2. **Acceptance** (`acceptInvitationService`):
   - The user passes the raw token via `POST /api/care-circles/invitations/accept`.
   - The token is hashed and matched against the database.
   - The invitation expiration is checked. If invalid or expired, it throws an error.
   - The user's membership is created or updated as `ACTIVE` with the invited role, and the invitation status updates to `ACCEPTED`.

```javascript
const acceptInvitationService = async (payload, currentUser) => {
  const { token } = payload;
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const invitation = await prisma.invitation.findUnique({
    where: { tokenHash },
    include: { circle: true, role: true },
  });

  if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
    throw new Error("Invalid or expired invitation token");
  }

  // Create membership in Care Circle
  const membership = await prisma.careCircleMember.upsert({
    where: {
      circleId_userId: { circleId: invitation.circleId, userId: currentUser.id }
    },
    update: { roleId: invitation.roleId, status: "ACTIVE", joinedAt: new Date(), revokedAt: null },
    create: { circleId: invitation.circleId, userId: currentUser.id, roleId: invitation.roleId, status: "ACTIVE" }
  });

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: { status: "ACCEPTED", acceptedAt: new Date() }
  });

  return { membership, circle: invitation.circle };
};
```

---

### C. Dignity-First Revocation Flow

The patient or circle owner can revoke access instantly. The service handles this via `revokeMemberService`:

```javascript
const revokeMemberService = async (circleId, memberId, currentUser) => {
  // Find the CareCircleMember mapping
  let membership = await prisma.careCircleMember.findFirst({
    where: {
      circleId,
      OR: [{ id: memberId }, { userId: memberId }]
    }
  });

  if (!membership) throw new Error("Care circle member not found");

  const circle = await prisma.careCircle.findUnique({ where: { id: circleId } });

  // Verify authorization: Requester must be OWNER or the Patient
  const currentMember = await prisma.careCircleMember.findFirst({
    where: { circleId, userId: currentUser.id, status: "ACTIVE" },
    include: { role: true }
  });

  const isOwner = currentMember && currentMember.role.name === "OWNER";
  const isPatient = circle.patientId === currentUser.id;

  if (!isOwner && !isPatient) {
    throw new Error("Access denied. Only the owner or the patient can revoke memberships.");
  }

  // Set status to REVOKED
  return prisma.careCircleMember.update({
    where: { id: membership.id },
    data: { status: "REVOKED", revokedAt: new Date() }
  });
};
```

---

## 4. REST Endpoints Summary

### Authentication Helpers (Testing)
- **`POST /api/auth/signup`**: Registers a user. Returns a signed JWT.
- **`POST /api/auth/login`**: Authenticates email/phone. Returns a signed JWT.

### Care Circles
- **`POST /api/care-circles/`**: Creates a Care Circle.
  - Body: `{ name: string, patientId: string, patientCoOwn?: boolean }`
- **`GET /api/care-circles/:id`**: Gets care circle details.
- **`GET /api/care-circles/:id/members`**: Retrieves active circle members.
- **`POST /api/care-circles/:id/invitations`**: Invites a member to the care circle.
  - Body: `{ roleName: "OWNER" | "CAREGIVER_FULL" | "CAREGIVER_VIEW" | "PROFESSIONAL" | "PHYSICIAN", email?: string, phone?: string }`
- **`POST /api/care-circles/invitations/accept`**: Accepts a pending invitation.
  - Body: `{ token: string }`
- **`PATCH /api/care-circles/:id/members/:memberId/revoke`**: Revokes a member's access.
