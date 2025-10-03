-- CreateTable
CREATE TABLE "public"."Transcription" (
    "id" SERIAL NOT NULL,
    "callSid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transcription_callSid_key" ON "public"."Transcription"("callSid");
