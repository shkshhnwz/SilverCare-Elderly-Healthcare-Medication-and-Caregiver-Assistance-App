-- CreateEnum
CREATE TYPE "MedicationDoseState" AS ENUM ('SCHEDULED', 'NOTIFIED', 'CONFIRMED_TAKEN', 'CONFIRMED_SKIPPED', 'MISSED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "MedicationConfirmationType" AS ENUM ('TAP', 'PHOTO', 'VOICE');

-- CreateTable
CREATE TABLE "Medication" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "careCircleId" UUID,
    "medicationName" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "frequencyRRule" TEXT NOT NULL,
    "prescribingDoctor" TEXT NOT NULL,
    "refillQuantity" INTEGER NOT NULL,
    "refillThresholdDays" INTEGER NOT NULL DEFAULT 5,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicationDose" (
    "id" UUID NOT NULL,
    "medicationId" UUID NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "state" "MedicationDoseState" NOT NULL DEFAULT 'SCHEDULED',
    "escalationStep" INTEGER NOT NULL DEFAULT 0,
    "acknowledgedById" UUID,
    "acknowledgedAt" TIMESTAMP(3),
    "confirmationType" "MedicationConfirmationType",
    "evidenceUrl" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicationDose_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Medication_patientId_idx" ON "Medication"("patientId");

-- CreateIndex
CREATE INDEX "Medication_createdById_idx" ON "Medication"("createdById");

-- CreateIndex
CREATE INDEX "Medication_careCircleId_idx" ON "Medication"("careCircleId");

-- CreateIndex
CREATE INDEX "Medication_active_idx" ON "Medication"("active");

-- CreateIndex
CREATE INDEX "MedicationDose_medicationId_idx" ON "MedicationDose"("medicationId");

-- CreateIndex
CREATE INDEX "MedicationDose_scheduledAt_idx" ON "MedicationDose"("scheduledAt");

-- CreateIndex
CREATE INDEX "MedicationDose_state_idx" ON "MedicationDose"("state");

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_careCircleId_fkey" FOREIGN KEY ("careCircleId") REFERENCES "CareCircle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationDose" ADD CONSTRAINT "MedicationDose_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicationDose" ADD CONSTRAINT "MedicationDose_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
