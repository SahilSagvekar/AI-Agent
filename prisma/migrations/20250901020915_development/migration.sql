/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FormData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."FormData" DROP CONSTRAINT "FormData_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "googleMapsUrl" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "public"."FormData";

-- CreateTable
CREATE TABLE "public"."LaundromatLocation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationName" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,

    CONSTRAINT "LaundromatLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OperatingHours" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "weekdayHours" TEXT NOT NULL,
    "weekendHours" TEXT,
    "openOnHolidays" BOOLEAN NOT NULL,
    "holidayNote" TEXT,
    "lastWashTime" TEXT,

    CONSTRAINT "OperatingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Services" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "services" JSONB NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pricing" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "washerPrices" TEXT NOT NULL,
    "dryerPrices" TEXT NOT NULL,
    "washFoldRate" TEXT,
    "dryCleaningPrices" TEXT,
    "pickupDeliveryPricing" TEXT,
    "minimumCharges" TEXT,
    "paymentMethods" JSONB NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MachineInfo" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "totalWashers" TEXT NOT NULL,
    "totalDryers" TEXT,
    "machineOperationType" TEXT,
    "machinesModern" BOOLEAN NOT NULL,
    "largeMachines" BOOLEAN NOT NULL,

    CONSTRAINT "MachineInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Amenities" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questions" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "commonQuestions" JSONB NOT NULL,
    "customQuestions" JSONB NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CallHandling" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "callHandlingStyle" TEXT NOT NULL,
    "forwardingEnabled" BOOLEAN NOT NULL,
    "forwardingNumber" TEXT,
    "forwardingHours" TEXT,

    CONSTRAINT "CallHandling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LanguageSettings" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "languages" JSONB NOT NULL,
    "autoDetectLanguage" BOOLEAN NOT NULL,

    CONSTRAINT "LanguageSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BusinessTone" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "businessTone" TEXT NOT NULL,
    "customPhrases" TEXT,
    "businessIntro" TEXT,

    CONSTRAINT "BusinessTone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Policies" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "lostFoundPolicy" TEXT,
    "refundPolicy" TEXT,
    "covidPolicies" TEXT,
    "timeLimits" TEXT,
    "unattendedPolicy" TEXT,
    "additionalPolicies" TEXT,

    CONSTRAINT "Policies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OperatingHours_locationId_key" ON "public"."OperatingHours"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Services_locationId_key" ON "public"."Services"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_locationId_key" ON "public"."Pricing"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "MachineInfo_locationId_key" ON "public"."MachineInfo"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_locationId_key" ON "public"."Amenities"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_locationId_key" ON "public"."Questions"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "CallHandling_locationId_key" ON "public"."CallHandling"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageSettings_locationId_key" ON "public"."LanguageSettings"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessTone_locationId_key" ON "public"."BusinessTone"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Policies_locationId_key" ON "public"."Policies"("locationId");

-- AddForeignKey
ALTER TABLE "public"."LaundromatLocation" ADD CONSTRAINT "LaundromatLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OperatingHours" ADD CONSTRAINT "OperatingHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pricing" ADD CONSTRAINT "Pricing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MachineInfo" ADD CONSTRAINT "MachineInfo_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Amenities" ADD CONSTRAINT "Amenities_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Questions" ADD CONSTRAINT "Questions_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CallHandling" ADD CONSTRAINT "CallHandling_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LanguageSettings" ADD CONSTRAINT "LanguageSettings_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BusinessTone" ADD CONSTRAINT "BusinessTone_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Policies" ADD CONSTRAINT "Policies_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
