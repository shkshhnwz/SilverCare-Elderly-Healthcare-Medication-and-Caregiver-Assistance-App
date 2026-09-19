const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const secret = process.env.JWT_SECRET || "silvercare-dev-secret";
    const decoded = jwt.verify(token, secret);

    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User is inactive or not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    if (!token) {
      req.user = null;
      return next();
    }

    const secret = process.env.JWT_SECRET || "silvercare-dev-secret";
    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId || decoded.id },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        isActive: true,
      },
    });

    req.user = user && user.isActive ? user : null;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

const requireCircleRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const patientId = req.params.patientId || req.body.patientId;
      if (!patientId) {
        return res.status(400).json({ message: "patientId is required for role verification" });
      }

      if (req.user.id === patientId) {
        return next();
      }

      const memberships = await prisma.careCircleMember.findMany({
        where: {
          userId: req.user.id,
          status: "ACTIVE",
          circle: { patientId }
        },
        include: { role: true },
      });

      if (memberships.length === 0) {
        console.log(`[requireCircleRole] 403: No active memberships found for patientId=${patientId}, req.user.id=${req.user.id}`);
        return res.status(403).json({ message: "Access denied. Not a member of this patient's Care Circle." });
      }

      const hasAllowedRole = memberships.some(m => allowedRoles.includes(m.role.name));
      if (!hasAllowedRole) {
        const rolesFound = memberships.map(m => m.role.name).join(", ");
        console.log(`[requireCircleRole] 403: Roles [${rolesFound}] not in [${allowedRoles}]`);
        return res.status(403).json({ message: `Access denied. Role ${rolesFound} is not permitted to perform this action.` });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Role verification failed", error: error.message });
    }
  };
};

module.exports = {
  requireAuth,
  optionalAuth,
  requireCircleRole,
};
