import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    // Check if user already filled the form
    const existingForm = await prisma.formData.findFirst({
      where: { userId: user.id }
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      hasFilledForm: !!existingForm
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const cookieStore = cookies(); // get cookies
    const token = cookieStore.get("authToken")?.value;

    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: string;
      email: string;
      role: string;
    };

    return NextResponse.json({
      user: { id: payload.userId, email: payload.email, role: payload.role }
    });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
