import { NextResponse } from "next/server";
import twilio from "twilio";
import { getUser } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // ✅ Get twilioPhone numbers from DB
    const dbNumbers = await prisma.laundromatLocation.findMany({
      where: { userId: user.userId },
      select: { twilioPhone: true },
    });

    if (!dbNumbers || dbNumbers.length === 0) {
      return NextResponse.json({ success: false, error: "No Twilio numbers found in DB" }, { status: 404 });
    }

    // Extract just the numbers as plain array
    const dbNumberList = dbNumbers.map((item) => item.twilioPhone);

    // ✅ Fetch all numbers from Twilio
    const twilioNumbers = await twilioClient.incomingPhoneNumbers.list({ limit: 50 });

    // ✅ Filter only the ones present in our DB
    const filteredNumbers = twilioNumbers.filter((num) =>
      dbNumberList.includes(num.phoneNumber)
    );

    // ✅ Fetch and filter calls
    const calls = await twilioClient.calls.list({ limit: 100 }); // Increase limit if you need more
    const filteredCalls = calls.filter(
      (call) =>
        dbNumberList.includes(call.to) || dbNumberList.includes(call.from)
    );

    // ✅ Count total calls
    const totalCalls = filteredCalls.length;

    // ✅ Count today's calls
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const todaysCalls = filteredCalls.filter((call) => {
      const callDate = new Date(call.startTime);
      return callDate >= today;
    });

    const callsToday = todaysCalls.length;

    return NextResponse.json({
      success: true,
      numbers: filteredNumbers,
      calls: filteredCalls,
      stats: {
        totalCalls,
        callsToday,
      },
    });
  } catch (error) {
    console.error("Error fetching Twilio data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Twilio data" },
      { status: 500 }
    );
  }
}
