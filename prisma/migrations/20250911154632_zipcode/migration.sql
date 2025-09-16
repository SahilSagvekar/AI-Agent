/*
  Warnings:

  - You are about to drop the column `areaCode` on the `LaundromatLocation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."LaundromatLocation" DROP COLUMN "areaCode",
ADD COLUMN     "zipCode" TEXT;

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
