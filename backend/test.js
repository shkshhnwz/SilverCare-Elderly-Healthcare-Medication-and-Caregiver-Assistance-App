const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const patientId = '2d716a72-f9c0-4cb4-997d-5497c381fe17';
  const userId = 'ee93b175-8a7d-4a0b-ae15-e9d7a84fe643'; 
  
  const c = await prisma.careCircle.findMany({ 
    where: { patientId }, 
    include: { memberships: { include: { role: true } } } 
  });
  console.log("ALL Care Circles for patient:");
  console.log(JSON.stringify(c, null, 2));

  const first = await prisma.careCircle.findFirst({
    where: { patientId },
    include: {
      memberships: {
        where: { userId: userId, status: "ACTIVE" },
        include: { role: true },
      },
    },
  });
  console.log("\nfindFirst Result for the user:");
  console.log(JSON.stringify(first, null, 2));
}
main().finally(() => prisma.$disconnect());
