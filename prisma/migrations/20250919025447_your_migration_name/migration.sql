-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "public"."Role" DEFAULT 'USER',
    "address" TEXT,
    "businessName" TEXT,
    "googleMapsUrl" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "firstPayment" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LaundromatLocation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationName" TEXT,
    "businessName" TEXT,
    "address" TEXT NOT NULL,
    "zipCode" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,
    "twilioPhone" TEXT,
    "notableLandmarks" TEXT,
    "attendingHours" TEXT,
    "nonAttendingHours" TEXT,
    "timeZone" TEXT DEFAULT 'UTC',
    "escalateForwardCall" BOOLEAN NOT NULL DEFAULT false,
    "escalationNumber" TEXT,
    "escalateSendMessage" BOOLEAN NOT NULL DEFAULT false,
    "escalateSendEmail" BOOLEAN NOT NULL DEFAULT false,
    "escalationEmail" TEXT,
    "hiringResponse" TEXT,

    CONSTRAINT "LaundromatLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhoneNumber" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "PhoneNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OperatingHours" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "mondayOpen" TEXT NOT NULL,
    "mondayClose" TEXT NOT NULL,
    "tuesdayOpen" TEXT NOT NULL,
    "tuesdayClose" TEXT NOT NULL,
    "wednesdayOpen" TEXT NOT NULL,
    "wednesdayClose" TEXT NOT NULL,
    "thursdayOpen" TEXT NOT NULL,
    "thursdayClose" TEXT NOT NULL,
    "fridayOpen" TEXT NOT NULL,
    "fridayClose" TEXT NOT NULL,
    "saturdayOpen" TEXT NOT NULL,
    "saturdayClose" TEXT NOT NULL,
    "sundayOpen" TEXT NOT NULL,
    "sundayClose" TEXT NOT NULL,
    "openOnHolidays" BOOLEAN NOT NULL,
    "holidayNote" TEXT,
    "lastWashTime" TEXT,
    "timeZone" TEXT NOT NULL DEFAULT 'UTC',

    CONSTRAINT "OperatingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HolidayHours" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,

    CONSTRAINT "HolidayHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Washer" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "system" TEXT NOT NULL,
    "payments" JSONB NOT NULL,

    CONSTRAINT "Washer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dryer" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "system" TEXT NOT NULL,
    "payments" JSONB NOT NULL,

    CONSTRAINT "Dryer_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT NOT NULL,
    "formData" JSONB,
    "stripePaymentId" TEXT,
    "stripeSubscriptionId" TEXT,
    "paymentStatus" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."appointments" (
    "id" SERIAL NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "service_date" DATE NOT NULL,
    "service_type" VARCHAR(100) DEFAULT 'wash_and_fold',
    "location_id" INTEGER DEFAULT 1,
    "status" VARCHAR(50) DEFAULT 'scheduled',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailOtp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PhoneNumberToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PhoneNumberToLocation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_number_key" ON "public"."PhoneNumber"("number");

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

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentId_key" ON "public"."Payment"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeSubscriptionId_key" ON "public"."Payment"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailOtp_email_key" ON "public"."EmailOtp"("email");

-- CreateIndex
CREATE INDEX "_PhoneNumberToLocation_B_index" ON "public"."_PhoneNumberToLocation"("B");

-- AddForeignKey
ALTER TABLE "public"."LaundromatLocation" ADD CONSTRAINT "LaundromatLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PhoneNumber" ADD CONSTRAINT "PhoneNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OperatingHours" ADD CONSTRAINT "OperatingHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HolidayHours" ADD CONSTRAINT "HolidayHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Washer" ADD CONSTRAINT "Washer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dryer" ADD CONSTRAINT "Dryer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."LaundromatLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PhoneNumberToLocation" ADD CONSTRAINT "_PhoneNumberToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."LaundromatLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PhoneNumberToLocation" ADD CONSTRAINT "_PhoneNumberToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."PhoneNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
