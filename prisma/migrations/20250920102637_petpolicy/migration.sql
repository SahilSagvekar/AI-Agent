/*
  Warnings:

  - You are about to drop the column `covidPolicies` on the `Policies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Policies" DROP COLUMN "covidPolicies",
ADD COLUMN     "petPolicies" TEXT;
