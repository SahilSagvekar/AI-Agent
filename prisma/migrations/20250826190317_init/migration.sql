/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "public"."FormData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,
    "weekdayHours" TEXT NOT NULL,
    "weekendHours" TEXT,
    "openOnHolidays" BOOLEAN NOT NULL,
    "holidayNote" TEXT,
    "lastWashTime" TEXT,
    "services" JSONB NOT NULL,
    "washerPrices" TEXT NOT NULL,
    "dryerPrices" TEXT NOT NULL,
    "washFoldRate" TEXT,
    "dryCleaningPrices" TEXT,
    "pickupDeliveryPricing" TEXT,
    "minimumCharges" TEXT,
    "paymentMethods" JSONB NOT NULL,
    "totalWashers" TEXT NOT NULL,
    "totalDryers" TEXT,
    "machineOperationType" TEXT,
    "machinesModern" BOOLEAN NOT NULL,
    "largeMachines" BOOLEAN NOT NULL,
    "amenities" JSONB NOT NULL,
    "commonQuestions" JSONB NOT NULL,
    "customQuestions" JSONB NOT NULL,
    "callHandlingStyle" TEXT NOT NULL,
    "forwardingEnabled" BOOLEAN NOT NULL,
    "forwardingNumber" TEXT,
    "forwardingHours" TEXT,
    "languages" JSONB NOT NULL,
    "autoDetectLanguage" BOOLEAN NOT NULL,
    "businessTone" TEXT NOT NULL,
    "customPhrases" TEXT,
    "businessIntro" TEXT,
    "lostFoundPolicy" TEXT,
    "refundPolicy" TEXT,
    "covidPolicies" TEXT,
    "timeLimits" TEXT,
    "unattendedPolicy" TEXT,
    "additionalPolicies" TEXT,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FormData" ADD CONSTRAINT "FormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
