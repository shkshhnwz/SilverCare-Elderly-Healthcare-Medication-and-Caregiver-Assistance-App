const { PrismaClient } = require("../../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

// 1. Create a connection pool using node-postgres
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Create the Prisma adapter wrapper
const adapter = new PrismaPg(pool);

// 3. Instantiate the PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
