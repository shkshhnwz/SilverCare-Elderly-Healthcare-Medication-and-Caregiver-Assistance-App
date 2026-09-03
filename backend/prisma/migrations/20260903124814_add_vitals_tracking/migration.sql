-- CreateEnum
CREATE TYPE "VitalType" AS ENUM ('BLOOD_PRESSURE', 'GLUCOSE', 'WEIGHT', 'OXYGEN_SATURATION', 'TEMPERATURE', 'HEART_RATE');

-- CreateEnum
CREATE TYPE "VitalSource" AS ENUM ('MANUAL', 'BLE_DEVICE', 'WEARABLE');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AnomalyType" AS ENUM ('CRITICAL_SPIKE', 'CONSECUTIVE_BREACH', 'BASELINE_DEVIATION');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateTable
CREATE TABLE "VitalReading" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "vitalType" "VitalType" NOT NULL,
    "source" "VitalSource" NOT NULL DEFAULT 'MANUAL',
    "systolic" DOUBLE PRECISION,
    "diastolic" DOUBLE PRECISION,
    "value" DOUBLE PRECISION,
    "unit" TEXT NOT NULL,
    "context" TEXT,
    "notes" TEXT,
    "deviceModel" TEXT,
    "deviceMacAddress" TEXT,
    "rawBlePayload" JSONB,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VitalReading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VitalThreshold" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "vitalType" "VitalType" NOT NULL,
    "minNormal" DOUBLE PRECISION,
    "maxNormal" DOUBLE PRECISION,
    "systolicMin" DOUBLE PRECISION,
    "systolicMax" DOUBLE PRECISION,
    "diastolicMin" DOUBLE PRECISION,
    "diastolicMax" DOUBLE PRECISION,
    "criticalMin" DOUBLE PRECISION,
    "criticalMax" DOUBLE PRECISION,
    "consecutiveBreachLimit" INTEGER NOT NULL DEFAULT 3,
    "rollingBaselineDays" INTEGER NOT NULL DEFAULT 7,
    "baselineDeviationPercent" DOUBLE PRECISION NOT NULL DEFAULT 20.0,
    "updatedById" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VitalThreshold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VitalAlert" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "readingId" UUID NOT NULL,
    "vitalType" "VitalType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "anomalyType" "AnomalyType" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "baselineSnapshot" JSONB,
    "acknowledgedById" UUID,
    "acknowledgedAt" TIMESTAMP(3),
    "resolutionNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VitalAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VitalReading_patientId_vitalType_recordedAt_idx" ON "VitalReading"("patientId", "vitalType", "recordedAt");

-- CreateIndex
CREATE INDEX "VitalReading_patientId_recordedAt_idx" ON "VitalReading"("patientId", "recordedAt");

-- CreateIndex
CREATE INDEX "VitalThreshold_patientId_idx" ON "VitalThreshold"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "VitalThreshold_patientId_vitalType_key" ON "VitalThreshold"("patientId", "vitalType");

-- CreateIndex
CREATE INDEX "VitalAlert_patientId_status_idx" ON "VitalAlert"("patientId", "status");

-- CreateIndex
CREATE INDEX "VitalAlert_readingId_idx" ON "VitalAlert"("readingId");

-- AddForeignKey
ALTER TABLE "VitalReading" ADD CONSTRAINT "VitalReading_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalReading" ADD CONSTRAINT "VitalReading_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalThreshold" ADD CONSTRAINT "VitalThreshold_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalThreshold" ADD CONSTRAINT "VitalThreshold_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalAlert" ADD CONSTRAINT "VitalAlert_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalAlert" ADD CONSTRAINT "VitalAlert_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "VitalReading"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VitalAlert" ADD CONSTRAINT "VitalAlert_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
