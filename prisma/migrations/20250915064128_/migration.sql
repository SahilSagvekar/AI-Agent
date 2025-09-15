/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Payment" ADD COLUMN     "formData" JSONB,
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentId_key" ON "public"."Payment"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeSubscriptionId_key" ON "public"."Payment"("stripeSubscriptionId");
