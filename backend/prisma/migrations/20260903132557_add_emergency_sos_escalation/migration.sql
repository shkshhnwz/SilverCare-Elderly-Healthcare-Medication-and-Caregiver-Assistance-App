-- CreateEnum
CREATE TYPE "EmergencyEventType" AS ENUM ('ONE_TAP_SOS', 'FALL_DETECTED', 'MANUAL_PANIC');

-- CreateEnum
CREATE TYPE "EmergencyStatus" AS ENUM ('COUNTDOWN_ACTIVE', 'CANCELLED_FALSE_ALARM', 'ACTIVE_EMERGENCY', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "EscalationChannel" AS ENUM ('PUSH_NOTIFICATION', 'SMS', 'VOICE_CALL');

-- CreateEnum
CREATE TYPE "NotificationDeliveryStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'ACKNOWLEDGED', 'FAILED');

-- CreateTable
CREATE TABLE "EmergencyEscalationPolicy" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default Family Escalation Policy',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyEscalationPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalationTier" (
    "id" UUID NOT NULL,
    "policyId" UUID NOT NULL,
    "tierOrder" INTEGER NOT NULL,
    "contactUserId" UUID,
    "customName" TEXT,
    "customPhone" TEXT,
    "channel" "EscalationChannel" NOT NULL DEFAULT 'PUSH_NOTIFICATION',
    "timeoutMinutes" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "EscalationTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyEvent" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "eventType" "EmergencyEventType" NOT NULL,
    "status" "EmergencyStatus" NOT NULL DEFAULT 'ACTIVE_EMERGENCY',
    "currentTierIndex" INTEGER NOT NULL DEFAULT 1,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "accuracyMeters" DOUBLE PRECISION,
    "mapUrl" TEXT,
    "countdownSeconds" INTEGER NOT NULL DEFAULT 0,
    "countdownExpiresAt" TIMESTAMP(3),
    "accelerometerVector" JSONB,
    "acknowledgedById" UUID,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedById" UUID,
    "resolvedAt" TIMESTAMP(3),
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyNotificationLog" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "tierOrder" INTEGER NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientTarget" TEXT NOT NULL,
    "channel" "EscalationChannel" NOT NULL,
    "deliveryStatus" "NotificationDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "responsePayload" JSONB,
    "dispatchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmergencyNotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmergencyEscalationPolicy_patientId_isActive_idx" ON "EmergencyEscalationPolicy"("patientId", "isActive");

-- CreateIndex
CREATE INDEX "EscalationTier_policyId_idx" ON "EscalationTier"("policyId");

-- CreateIndex
CREATE UNIQUE INDEX "EscalationTier_policyId_tierOrder_key" ON "EscalationTier"("policyId", "tierOrder");

-- CreateIndex
CREATE INDEX "EmergencyEvent_patientId_status_idx" ON "EmergencyEvent"("patientId", "status");

-- CreateIndex
CREATE INDEX "EmergencyEvent_status_currentTierIndex_idx" ON "EmergencyEvent"("status", "currentTierIndex");

-- CreateIndex
CREATE INDEX "EmergencyNotificationLog_eventId_idx" ON "EmergencyNotificationLog"("eventId");

-- AddForeignKey
ALTER TABLE "EmergencyEscalationPolicy" ADD CONSTRAINT "EmergencyEscalationPolicy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalationTier" ADD CONSTRAINT "EscalationTier_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "EmergencyEscalationPolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalationTier" ADD CONSTRAINT "EscalationTier_contactUserId_fkey" FOREIGN KEY ("contactUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyEvent" ADD CONSTRAINT "EmergencyEvent_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyEvent" ADD CONSTRAINT "EmergencyEvent_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyEvent" ADD CONSTRAINT "EmergencyEvent_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyNotificationLog" ADD CONSTRAINT "EmergencyNotificationLog_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EmergencyEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
