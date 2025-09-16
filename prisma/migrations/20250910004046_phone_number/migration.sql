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
CREATE TABLE "public"."_PhoneNumberToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PhoneNumberToLocation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_number_key" ON "public"."PhoneNumber"("number");

-- CreateIndex
CREATE INDEX "_PhoneNumberToLocation_B_index" ON "public"."_PhoneNumberToLocation"("B");

-- AddForeignKey
ALTER TABLE "public"."PhoneNumber" ADD CONSTRAINT "PhoneNumber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PhoneNumberToLocation" ADD CONSTRAINT "_PhoneNumberToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."LaundromatLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PhoneNumberToLocation" ADD CONSTRAINT "_PhoneNumberToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."PhoneNumber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
