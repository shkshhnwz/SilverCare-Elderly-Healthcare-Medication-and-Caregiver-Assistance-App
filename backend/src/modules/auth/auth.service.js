const jwt = require("jsonwebtoken");
const prisma = require("../../config/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "silvercare-dev-secret";

const signupService = async (payload) => {
  const { firstName, lastName, email, phone } = payload;

  if (!firstName || !lastName) {
    throw new Error("firstName and lastName are required");
  }

  if (!email && !phone) {
    throw new Error("Either email or phone is required");
  }

  // Check if user already exists
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("User with this email already exists");
    }
  }

  if (phone) {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new Error("User with this phone number already exists");
    }
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      isActive: true,
    },
  });

  const token = jwt.sign({ id: user.id, email: user.email, phone: user.phone }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

const loginService = async (payload) => {
  const { email, phone } = payload;

  if (!email && !phone) {
    throw new Error("Email or phone is required to login");
  }

  let user = null;
  if (email) {
    user = await prisma.user.findUnique({ where: { email } });
  } else if (phone) {
    user = await prisma.user.findUnique({ where: { phone } });
  }

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActive) {
    throw new Error("User account is inactive");
  }

  const token = jwt.sign({ id: user.id, email: user.email, phone: user.phone }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

module.exports = {
  signupService,
  loginService,
};
