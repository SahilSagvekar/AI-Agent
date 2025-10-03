-- CreateTable
CREATE TABLE "public"."CallLog" (
    "id" SERIAL NOT NULL,
    "callSid" TEXT NOT NULL,
    "fromNumber" TEXT,
    "toNumber" TEXT,
    "recordingUrl" TEXT,
    "transcriptionText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CallLog_callSid_key" ON "public"."CallLog"("callSid");
