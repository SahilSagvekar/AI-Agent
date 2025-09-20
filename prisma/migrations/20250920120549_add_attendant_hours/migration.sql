/*
  Warnings:

  - You are about to drop the column `attendingHours` on the `LaundromatLocation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."LaundromatLocation" DROP COLUMN "attendingHours",
ADD COLUMN     "attendingClose" TEXT,
ADD COLUMN     "attendingOpen" TEXT,
ADD COLUMN     "is24Hours" BOOLEAN NOT NULL DEFAULT false;
