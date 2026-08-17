const prisma = require("../config/prisma");

const requireRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const circleId = req.params.id || req.body.circleId || req.query.circleId;
      if (!circleId) {
        return res.status(400).json({ message: "Circle id is required for role validation" });
      }

      const membership = await prisma.careCircleMember.findFirst({
        where: {
          circleId,
          userId: req.user.id,
          status: "ACTIVE",
        },
        include: {
          role: true,
        },
      });

      if (!membership) {
        return res.status(403).json({ message: "You are not a member of this care circle" });
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(membership.role.name)) {
        return res.status(403).json({
          message: `Access denied. Required role: ${allowedRoles.join(", ")}`,
        });
      }

      req.member = membership;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Authorization failed",
        error: error.message,
      });
    }
  };
};

const requirePermission = (permissionKey) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const circleId = req.params.id || req.body.circleId || req.query.circleId;
      if (!circleId) {
        return res.status(400).json({ message: "Circle id is required for permission validation" });
      }

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

      const permissions = membership.role.rolePermissions.map(
        (rolePermission) => rolePermission.permission.key
      );

      if (!permissions.includes(permissionKey)) {
        return res.status(403).json({
          message: `Access denied. Missing permission: ${permissionKey}`,
        });
      }

      req.member = membership;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Permission check failed",
        error: error.message,
      });
    }
  };
};

const requireOwnerOrPermission = (permissionKey) => {
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
        select: { ownerId: true },
      });

      if (!circle) {
        return res.status(404).json({ message: "Care circle not found" });
      }

      if (circle.ownerId === req.user.id) {
        req.member = { role: { name: "OWNER" } };
        return next();
      }

      return requirePermission(permissionKey)(req, res, next);
    } catch (error) {
      return res.status(500).json({
        message: "Ownership/permission validation failed",
        error: error.message,
      });
    }
  };
};

module.exports = {
  requireRole,
  requirePermission,
  requireOwnerOrPermission,
};
