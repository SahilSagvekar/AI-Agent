import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, otp, firstName, lastName, password } = await req.json();

  console.log("Received data:", { email, otp, firstName, lastName, password });

  // const existingUser = await prisma.user.findUnique({ where: { email } });
  // if (existingUser) {
  //   return NextResponse.json(
  //     { message: "Email already registered" },
  //     { status: 400 }
  //   );
  // }

  if (!email || !otp)
    return NextResponse.json(
      { message: "Email and OTP required" },
      { status: 400 }
    );

  try {
    const record = await prisma.emailOtp.findUnique({ where: { email } });

    let name = `${firstName} ${lastName}`;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    //generate token and set cookie
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      message: "User registered successfully",
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    console.log(response);

    if (!record)
      return NextResponse.json(
        { message: "OTP not found, request again" },
        { status: 400 }
      );
    if (new Date() > record.expiresAt) {
      await prisma.emailOtp.delete({ where: { email } });
      return NextResponse.json(
        { message: "OTP expired, request again" },
        { status: 400 }
      );
    }
    if (record.otp !== otp)
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });

    // OTP valid: create user record (use your existing user creation logic here)
    // Example:
    // const user = await prisma.user.create({
    //   data: { email, name: `${firstName} ${lastName}`, passwordHash: await hashPassword(password) }
    // });

    // Delete OTP after success
    await prisma.emailOtp.delete({ where: { email } });

    // Return success with user info as needed
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
