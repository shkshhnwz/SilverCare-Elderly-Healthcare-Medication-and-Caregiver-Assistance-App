-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('VITALS_CHECK', 'MEDICATION', 'MEAL_PREP', 'MOBILITY_EXERCISE', 'HYGIENE', 'GENERAL');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'MISSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "CarePlan" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "dietaryNotes" TEXT,
    "mobilityInstructions" TEXT,
    "resuscitationStatus" TEXT,
    "emergencySummary" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarePlanAudit" (
    "id" UUID NOT NULL,
    "carePlanId" UUID NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "changedById" UUID NOT NULL,
    "changeSummary" TEXT NOT NULL,
    "snapshotJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarePlanAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareTask" (
    "id" UUID NOT NULL,
    "carePlanId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "TaskCategory" NOT NULL DEFAULT 'GENERAL',
    "assignedToId" UUID,
    "dueWindowStart" TIMESTAMP(3) NOT NULL,
    "dueWindowEnd" TIMESTAMP(3) NOT NULL,
    "recurringRRule" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "completedById" UUID,
    "completedAt" TIMESTAMP(3),
    "completionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareShift" (
    "id" UUID NOT NULL,
    "caregiverId" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "status" "ShiftStatus" NOT NULL DEFAULT 'ACTIVE',
    "clockInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clockOutAt" TIMESTAMP(3),
    "clockInLocation" TEXT,
    "clockOutLocation" TEXT,
    "moodAndMentalState" TEXT,
    "mealsAndHydration" TEXT,
    "incidentsOrConcerns" TEXT,
    "handoffNotesNextShift" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareShift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarePlan_patientId_key" ON "CarePlan"("patientId");

-- CreateIndex
CREATE INDEX "CarePlan_patientId_idx" ON "CarePlan"("patientId");

-- CreateIndex
CREATE INDEX "CarePlanAudit_carePlanId_versionNumber_idx" ON "CarePlanAudit"("carePlanId", "versionNumber");

-- CreateIndex
CREATE INDEX "CareTask_patientId_status_idx" ON "CareTask"("patientId", "status");

-- CreateIndex
CREATE INDEX "CareTask_assignedToId_dueWindowStart_idx" ON "CareTask"("assignedToId", "dueWindowStart");

-- CreateIndex
CREATE INDEX "CareShift_caregiverId_status_idx" ON "CareShift"("caregiverId", "status");

-- CreateIndex
CREATE INDEX "CareShift_patientId_clockInAt_idx" ON "CareShift"("patientId", "clockInAt");

-- AddForeignKey
ALTER TABLE "CarePlan" ADD CONSTRAINT "CarePlan_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlan" ADD CONSTRAINT "CarePlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlanAudit" ADD CONSTRAINT "CarePlanAudit_carePlanId_fkey" FOREIGN KEY ("carePlanId") REFERENCES "CarePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlanAudit" ADD CONSTRAINT "CarePlanAudit_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareTask" ADD CONSTRAINT "CareTask_carePlanId_fkey" FOREIGN KEY ("carePlanId") REFERENCES "CarePlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareTask" ADD CONSTRAINT "CareTask_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareTask" ADD CONSTRAINT "CareTask_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareShift" ADD CONSTRAINT "CareShift_caregiverId_fkey" FOREIGN KEY ("caregiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareShift" ADD CONSTRAINT "CareShift_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
