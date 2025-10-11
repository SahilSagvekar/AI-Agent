import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}

async function sendEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({

    // service: "gmail",
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
    host: process.env.SMTP_HOST, // your MIAB host
      port: 587, // STARTTLS
      secure: false, // must be false for port 587
      auth: {
        user: process.env.OTP_MAIL, // full email address
        pass: process.env.OTP_MAIL, // password or app password you set in MIAB
      },
      tls: {
        rejectUnauthorized: false, // sometimes needed if using self-signed certs
      },
  });

  await transporter.sendMail({
    from: process.env.OTP_MAIL,
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  });
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email)
    return NextResponse.json({ message: "Email is required" }, { status: 400 });

  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 400 }
    );
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  try {
    // Save or update OTP in DB
    await prisma.emailOtp.upsert({
      where: { email },
      update: { otp, expiresAt },
      create: { email, otp, expiresAt },
    });

    await sendEmail(email, otp);

    return NextResponse.json({ message: "OTP sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending OTP" }, { status: 500 });
  }
}
