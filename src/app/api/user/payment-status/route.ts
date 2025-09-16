import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Adjust import based on your project structure
import { stat } from "fs";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Missing email parameter" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const CheckStatus = await prisma.payment.findFirst({
      where: { userId: user.id, paymentType: "NEW_ACCOUNT_SUBSCRIPTION" },
      select: { paymentStatus: true },
      orderBy: {
        id: "desc",
    },
    });

    let status = false;

    if(CheckStatus?.paymentStatus === "succeeded"){
      status = true;
    } else {
      status = false;
    }
    
    

    return NextResponse.json({ firstPayment: status });
  } catch (error) {
    console.error("Error fetching user payment status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
