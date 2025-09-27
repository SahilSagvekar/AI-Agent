import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const user = await getUser();

    const payments = await prisma.payment.findMany({
      where: {
        userId: user?.userId, 
      },
    });

    return NextResponse.json({ success: true, payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
