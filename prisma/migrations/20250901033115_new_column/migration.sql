-- AlterTable
ALTER TABLE "public"."LaundromatLocation" ADD COLUMN     "businessName" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "businessName" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
