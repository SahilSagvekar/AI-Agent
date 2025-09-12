import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";
import Stripe from "stripe";
import { getUser } from "@/lib/auth"; // your function 
import * as zipcodes from "zipcodes";
// const zipcodes = zipcodesCJS.default || zipcodesCJS;

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// async function getAreaCodeForZip(zip: string): Promise<string[]> {
//   const res = await fetch(`https://api.api-ninjas.com/v1/zipcode?zip=${zip}`, {
//     headers: { "X-Api-Key": process.env.NINJAS_API_KEY! }
//   });
//   const data = await res.json();

//   return data[0].area_codes[0]; 
// }
async function getAreaCodeForZip(zip: string): Promise<string> {
  const res = await fetch(`https://api.api-ninjas.com/v1/zipcode?zip=${zip}`, {
    headers: { "X-Api-Key": process.env.NINJAS_API_KEY! }
  });

  const data = await res.json();

  // Check if we got valid data and area_codes
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].area_codes) && data[0].area_codes.length > 0) {
    return data[0].area_codes[0];
  }

  // Fallback area code if no data or empty result
  const backupAreaCode = "212"; // <-- change this to a meaningful default
  return backupAreaCode;
}




async function provisionTwilioNumber(userId: any) {
  const location = await prisma.laundromatLocation.findFirst({
    where: { userId: userId },
    select: {
      zipCode: true,
    },
  });

  if (!location?.zipCode) {
    throw new Error("No zip code found for user");
  }

  const areaCodes = await getAreaCodeForZip(location.zipCode);

// TEMPORARILY DISABLED COZ REQUIRES MONEY ✅
// --------------------------------------------------------------------
  // const availableNumbers = await twilioClient
  //   .availablePhoneNumbers("US")
  //   .local.list({
  //     areaCode: Number(areaCodes),
  //     smsEnabled: true,
  //     voiceEnabled: true,
  //     limit: 1,
  //   });

  // if (availableNumbers.length === 0) {
  //   throw new Error(
  //     `No available Twilio numbers found for area code ${areaCodes}`
  //   );
  // }

  // const phoneNumberToPurchase = availableNumbers[0].phoneNumber;

  // const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
  //   phoneNumber: phoneNumberToPurchase,
  // });

  // return purchasedNumber.phoneNumber;
  // --------------------------------------------------------------------
  
  return '8282696969';
}

export async function POST(req: NextRequest, res: NextResponse) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const signature = req.headers.get("stripe-signature")!;
  

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    console.log('payment-successfull')
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const userId = paymentIntent.metadata.userId;

    if (userId) {
      try {
        let userIdInt = parseInt(userId, 10);
        // Provision Twilio number
        const twilioNumber = await provisionTwilioNumber(userIdInt);

        const laundromat = await prisma.laundromatLocation.findFirst({
          where: { userId: Number(userId) },
          select: { id: true },
        });

        if (!laundromat) {
          throw new Error("Laundromat location not found for user");
        }

        // Update database with Twilio phone number
        const updateNumber = await prisma.laundromatLocation.update({
          where: { id: laundromat.id },
          data: { twilioPhone: twilioNumber },
        });

        console.log(
          `Twilio number ${twilioNumber} provisioned after successful payment for user ${userId}`
        );

  //       if (updateNumber) {
  //   return NextResponse.redirect(new URL("/phonenumberassignment", req.url));
  // }
      } catch (error) {
        console.error("Failed to provision Twilio number:", error);
        return NextResponse.json(
          { error: "Failed twilio provisioning" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
