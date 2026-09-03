-- CreateEnum
CREATE TYPE "GeofenceAlertSeverity" AS ENUM ('MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "GeofenceAlertStatus" AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "TrackingSessionTrigger" AS ENUM ('EMERGENCY_BREACH', 'MANUAL_CAREGIVER_REQUEST', 'PATIENT_SOS');

-- CreateEnum
CREATE TYPE "TrackingSessionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "SafeZone" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radiusMeters" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafeZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingSession" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "initiatedById" UUID,
    "triggerReason" "TrackingSessionTrigger" NOT NULL,
    "status" "TrackingSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "disclosureSent" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "TrackingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationPing" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "trackingSessionId" UUID,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracyMeters" DOUBLE PRECISION,
    "batteryLevel" INTEGER,
    "isInsideSafeZone" BOOLEAN NOT NULL DEFAULT true,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LocationPing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationAlert" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "trackingSessionId" UUID,
    "severity" "GeofenceAlertSeverity" NOT NULL DEFAULT 'CRITICAL',
    "status" "GeofenceAlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastKnownLat" DOUBLE PRECISION NOT NULL,
    "lastKnownLng" DOUBLE PRECISION NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "driftDistanceM" DOUBLE PRECISION NOT NULL,
    "message" TEXT NOT NULL,
    "resolvedById" UUID,
    "resolvedAt" TIMESTAMP(3),
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SafeZone_patientId_isActive_idx" ON "SafeZone"("patientId", "isActive");

-- CreateIndex
CREATE INDEX "TrackingSession_patientId_status_idx" ON "TrackingSession"("patientId", "status");

-- CreateIndex
CREATE INDEX "LocationPing_patientId_recordedAt_idx" ON "LocationPing"("patientId", "recordedAt");

-- CreateIndex
CREATE INDEX "LocationPing_trackingSessionId_idx" ON "LocationPing"("trackingSessionId");

-- CreateIndex
CREATE INDEX "LocationAlert_patientId_status_idx" ON "LocationAlert"("patientId", "status");

-- AddForeignKey
ALTER TABLE "SafeZone" ADD CONSTRAINT "SafeZone_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafeZone" ADD CONSTRAINT "SafeZone_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingSession" ADD CONSTRAINT "TrackingSession_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingSession" ADD CONSTRAINT "TrackingSession_initiatedById_fkey" FOREIGN KEY ("initiatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationPing" ADD CONSTRAINT "LocationPing_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationPing" ADD CONSTRAINT "LocationPing_trackingSessionId_fkey" FOREIGN KEY ("trackingSessionId") REFERENCES "TrackingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAlert" ADD CONSTRAINT "LocationAlert_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAlert" ADD CONSTRAINT "LocationAlert_trackingSessionId_fkey" FOREIGN KEY ("trackingSessionId") REFERENCES "TrackingSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationAlert" ADD CONSTRAINT "LocationAlert_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
