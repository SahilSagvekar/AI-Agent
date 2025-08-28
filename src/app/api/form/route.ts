import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "secret";

// function verifyToken(token: string) {
//   try {
//     return jwt.verify(token, secret);
//   } catch {
//     return null;
//   }
// }

// async function getUser() {
//   const cookieStore = cookies();
//   const authToken = cookieStore.get("authToken")?.value;
//   if (!authToken) return null;
//   return verifyToken(authToken);
// }

export async function POST(request: Request) {
  // Get logged-in user info
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.json();

    // Attach user ID to form data assuming user object has id field
    const connectUser = { id: user.userId };

    const dataWithUser = {
      ...formData,
      user: { connect: connectUser }, // adjust `id` key to your JWT payload
    };

    const saved = await prisma.formData.create({
      data: dataWithUser,
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
