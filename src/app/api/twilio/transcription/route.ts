import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const transcriptionText = formData.get("TranscriptionText") as string;
    const toNumber = formData.get("To") as string; // Twilio number called

    if (!transcriptionText || !toNumber) {
      return NextResponse.json({ error: "Missing transcription or number" }, { status: 400 });
    }

    // Find the user owning this number
    const user = await prisma.laundromatLocation.findFirst({
      where: { twilioPhone: toNumber },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found for this number" }, { status: 404 });
    }

    // Forward transcription to your AI
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/process-call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.userId,
        transcription: transcriptionText,
        twilioNumber: toNumber,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Transcription webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   const formData = await req.formData();

//   const callSid = formData.get("CallSid");
//   const transcriptionText = formData.get("TranscriptionText");

//   if (callSid && transcriptionText) {
//     await prisma.callLog.update({
//       where: { callSid: String(callSid) },
//       data: { transcriptionText: String(transcriptionText) },
//     });
//   }

//   return NextResponse.json({ success: true });
// }
