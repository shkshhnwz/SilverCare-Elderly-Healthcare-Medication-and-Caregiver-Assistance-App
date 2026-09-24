const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../../config/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "silvercare-dev-secret";

const signupService = async (payload) => {
  const { firstName, lastName, email, phone, password } = payload;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  // Contact number is required for user registration
  if (!phone && !email) {
    throw new Error("Contact number (phone) is required");
  }

  // Check if user with email already exists
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("User with this email already exists");
    }
  }

  // Check if user with phone already exists
  if (phone) {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new Error("User with this phone number already exists");
    }
  }

  // Hash password if provided
  let hashedPassword = null;
  if (password && password.trim().length > 0) {
    hashedPassword = await bcrypt.hash(password.trim(), 10);
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email ? email.trim().toLowerCase() : null,
      phone: phone ? phone.trim() : null,
      password: hashedPassword,
      isActive: true,
    },
  });

  const token = jwt.sign({ id: user.id, email: user.email, phone: user.phone }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Exclude password hash from response
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

const loginService = async (payload) => {
  const { email, phone, password } = payload;

  if (!email && !phone) {
    throw new Error("Email or phone is required to login");
  }

  if (!password || !password.trim()) {
    throw new Error("Password is required to login");
  }

  let user = null;
  if (email) {
    user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  } else if (phone) {
    user = await prisma.user.findUnique({ where: { phone: phone.trim() } });
  }

  if (!user) {
    throw new Error("User not found with provided credentials");
  }

  if (!user.isActive) {
    throw new Error("User account is inactive");
  }

  if (user.password) {
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      throw new Error("Incorrect password. Please try again.");
    }
  } else {
    // If account was created before password was added, set and hash it now
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email, phone: user.phone }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

module.exports = {
  signupService,
  loginService,
};
