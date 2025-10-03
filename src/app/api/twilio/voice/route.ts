import { NextResponse } from "next/server";
import twilio from "twilio";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const from = formData.get("From");
  const to = formData.get("To");
  const callSid = formData.get("CallSid");

  // Store basic call data right away
  await prisma.callLog.upsert({
    where: { callSid: String(callSid) },
    update: { fromNumber: String(from), toNumber: String(to) },
    create: { callSid: String(callSid), fromNumber: String(from), toNumber: String(to) },
  });

  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say("This call is being recorded.");

  twiml.record({
    transcribe: true,
    transcribeCallback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio/transcription`,
    recordingStatusCallback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio/recording`,
    maxLength: 3600,
    playBeep: true,
  });

  return new NextResponse(twiml.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}
