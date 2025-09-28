import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();

  const callSid = formData.get("CallSid");
  const transcriptionText = formData.get("TranscriptionText");

  if (callSid && transcriptionText) {
    await prisma.callLog.update({
      where: { callSid: String(callSid) },
      data: { transcriptionText: String(transcriptionText) },
    });
  }

  return NextResponse.json({ success: true });
}
