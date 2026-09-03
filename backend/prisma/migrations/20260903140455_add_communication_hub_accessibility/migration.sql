-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('MEDICATION_DOSE_TAKEN', 'MEDICATION_DOSE_MISSED', 'VITAL_RECORDED', 'VITAL_ANOMALY_ALERT', 'GEOFENCE_BREACH', 'EMERGENCY_SOS', 'APPOINTMENT_SCHEDULED', 'APPOINTMENT_COMPLETED', 'CARE_TASK_COMPLETED', 'SHIFT_CLOCK_IN', 'SHIFT_CLOCK_OUT', 'CARE_PLAN_UPDATED', 'GENERAL_NOTE');

-- CreateEnum
CREATE TYPE "NotificationSeverityLevel" AS ENUM ('INFO', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "ActivityFeedItem" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "authorId" UUID,
    "activityType" "ActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityFeedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareCircleMessage" (
    "id" UUID NOT NULL,
    "patientId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "attachmentUrl" TEXT,
    "isSystemEvent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CareCircleMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotificationPref" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "pushEnabled" BOOLEAN NOT NULL DEFAULT true,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "voiceCallEnabled" BOOLEAN NOT NULL DEFAULT false,
    "quietHoursStart" TEXT,
    "quietHoursEnd" TEXT,
    "minSeverityForSms" "NotificationSeverityLevel" NOT NULL DEFAULT 'HIGH',
    "minSeverityForVoice" "NotificationSeverityLevel" NOT NULL DEFAULT 'CRITICAL',
    "devicePushToken" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotificationPref_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessibilitySetting" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "fontScale" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "highContrastMode" BOOLEAN NOT NULL DEFAULT false,
    "voiceGuidanceTTS" BOOLEAN NOT NULL DEFAULT false,
    "simplifiedNavigation" BOOLEAN NOT NULL DEFAULT true,
    "screenReaderOptimized" BOOLEAN NOT NULL DEFAULT false,
    "configuredByCaregiverId" UUID,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessibilitySetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityFeedItem_patientId_createdAt_idx" ON "ActivityFeedItem"("patientId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityFeedItem_activityType_idx" ON "ActivityFeedItem"("activityType");

-- CreateIndex
CREATE INDEX "CareCircleMessage_patientId_createdAt_idx" ON "CareCircleMessage"("patientId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserNotificationPref_userId_key" ON "UserNotificationPref"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessibilitySetting_userId_key" ON "AccessibilitySetting"("userId");

-- AddForeignKey
ALTER TABLE "ActivityFeedItem" ADD CONSTRAINT "ActivityFeedItem_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityFeedItem" ADD CONSTRAINT "ActivityFeedItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareCircleMessage" ADD CONSTRAINT "CareCircleMessage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareCircleMessage" ADD CONSTRAINT "CareCircleMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationPref" ADD CONSTRAINT "UserNotificationPref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessibilitySetting" ADD CONSTRAINT "AccessibilitySetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
