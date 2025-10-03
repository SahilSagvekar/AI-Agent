import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();

  const callSid = formData.get("CallSid");
  const recordingUrl = formData.get("RecordingUrl");

  if (callSid && recordingUrl) {
    await prisma.callLog.update({
      where: { callSid: String(callSid) },
      data: { recordingUrl: `${recordingUrl}.mp3` }, // append .mp3 to play in browser
    });
  }

  return NextResponse.json({ success: true });
}
