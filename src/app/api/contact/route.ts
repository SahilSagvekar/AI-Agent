import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // --- ✅ 1. Configure SMTP for Mail-in-a-Box ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.tryconnect.ai", // your MIAB host
      port: 587, // STARTTLS
      secure: false, // must be false for port 587
      auth: {
        user: process.env.EMAIL_USER || "support@tryconnect.ai", // full email address
        pass: process.env.EMAIL_PASS, // password or app password you set in MIAB
      },
      tls: {
        rejectUnauthorized: false, // sometimes needed if using self-signed certs
      },
    });

    // --- ✅ 2. Send email ---
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER || "support@tryconnect.ai"}>`,
      to: process.env.EMAIL_TO || "support@tryconnect.ai",
      replyTo: email, // so you can reply directly from your inbox
      subject: subject || "New Contact Form Message",
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, email, subject, message } = await req.json();

//     // configure SMTP (use your own credentials or Gmail/SendGrid)
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or use host, port, secure
//       auth: {
//         user: process.env.EMAIL_USER, // your email
//         pass: process.env.EMAIL_PASS, // app password
//       },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: process.env.EMAIL_TO || "support@tryconnect.ai",
//       subject: subject,
//       text: message,
//       html: `
//         <h3>New Contact Form Submission</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong><br/>${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
//   }
// }
