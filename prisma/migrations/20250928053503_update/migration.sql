-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "planType" TEXT;
