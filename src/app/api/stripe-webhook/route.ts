// // at the very top of the file where you import twilio
// // @ts-ignore
// import twilio from "twilio";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";
import Stripe from "stripe";
// import * as zipcodes from "zipcodes";
// import { use } from "react";

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
    headers: { "X-Api-Key": process.env.NINJAS_API_KEY! },
  });

  const data = await res.json();

  // Check if we got valid data and area_codes
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(data[0].area_codes) &&
    data[0].area_codes.length > 0
  ) {
    return data[0].area_codes[0];
  }

  // Fallback area code if no data or empty result
  const backupAreaCode = "212"; // <-- change this to a meaningful default
  return backupAreaCode;
}

// async function provisionTwilioNumber(userId: any) {
//   const location = await prisma.laundromatLocation.findFirst({
//     where: { userId: userId },
//     select: {
//       zipCode: true,
//     },
//   });

//   if (!location?.zipCode) {
//     throw new Error("No zip code found for user");
//   }

//   const areaCodes = await getAreaCodeForZip(location.zipCode);

//   // TEMPORARILY DISABLED COZ REQUIRES MONEY ✅
//   // --------------------------------------------------------------------
//   const availableNumbers = await twilioClient
//     .availablePhoneNumbers("US")
//     .local.list({
//       areaCode: Number(areaCodes),
//       smsEnabled: true,
//       voiceEnabled: true,
//       limit: 1,
//     });

//   if (availableNumbers.length === 0) {
//     throw new Error(
//       `No available Twilio numbers found for area code ${areaCodes}`
//     );
//   }

//   const phoneNumberToPurchase = availableNumbers[0].phoneNumber;

//   const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
//     phoneNumber: phoneNumberToPurchase,
//   });

//   return purchasedNumber.phoneNumber;
//   // --------------------------------------------------------------------

//   return "8282696969";
// }

export async function provisionTwilioNumber(userId: number) {
  // 1. Get user's location/zip code
  const location = await prisma.laundromatLocation.findFirst({
    where: { userId },
    select: { zipCode: true },
  });

  if (!location?.zipCode) throw new Error("No zip code found for user");

  const areaCodes = await getAreaCodeForZip(location.zipCode);

  // 2. Search available numbers
  const availableNumbers = await twilioClient
    .availablePhoneNumbers("US")
    .local.list({
      areaCode: Number(areaCodes),
      smsEnabled: true,
      voiceEnabled: true,
      limit: 1,
    });

  if (availableNumbers.length === 0) {
    throw new Error(`No available Twilio numbers for area code ${areaCodes}`);
  }

  const phoneNumberToPurchase = availableNumbers[0].phoneNumber;

  // 3. Create Voice TwiML Bin
  const voiceTwimlBin = await twilioClient.twimlBins.create({
    friendlyName: `User-${userId}-VoiceBin`,
    twiml: `
      <Response>
        <Say>Thanks for calling. This call is being recorded.</Say>
        <Record transcribe="true"
                transcribeCallback="${process.env.NEXT_PUBLIC_BASE_URL}/api/twilio/transcription"
                maxLength="3600"
                playBeep="true"/>
      </Response>
    `,
  });

  // 4. Create Messaging TwiML Bin
  const messageTwimlBin = await twilioClient.twimlBins.create({
    friendlyName: `User-${userId}-MessageBin`,
    twiml: `
      <Response>
        <Message>Thanks for texting us! We will get back to you shortly.</Message>
      </Response>
    `,
  });

  // 5. Purchase the number and link to both bins
  const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
    phoneNumber: phoneNumberToPurchase,

    // ✅ Link Voice to TwiML Bin
    voiceApplicationSid: voiceTwimlBin.sid,
    voiceMethod: "POST",

    // ✅ Link Messaging to TwiML Bin
    smsApplicationSid: messageTwimlBin.sid,
    smsMethod: "POST",
  });

  // 6. Save purchased number to DB
  await prisma.laundromatLocation.updateMany({
    where: { userId },
    data: { twilioPhone: purchasedNumber.phoneNumber },
  });

  return {
    phoneNumber: purchasedNumber.phoneNumber,
    voiceBin: voiceTwimlBin.sid,
    messageBin: messageTwimlBin.sid,
  };
}


export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const signature = req.headers.get("stripe-signature")!;

  let paymentId = null;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  console.log("Received Stripe event:", event.type);

  try {
    // -------------------------------
    // Handle Invoice Payments
    // -------------------------------
    if (event.type === "invoice.paid") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.parent!.subscription_details!.subscription as string;

      const payment = await prisma.payment.findFirst({ where: { stripeSubscriptionId: subscriptionId } });
      if (payment) {
        // Idempotent update: only mark succeeded if not already
        if (payment.paymentStatus !== "succeeded") {
          await prisma.payment.update({ where: { id: payment.id }, data: { paymentStatus: "succeeded" } });
        }

        // Check if 3 paid invoices → upgrade plan
        const invoices = await stripe.invoices.list({ subscription: subscriptionId, limit: 10 });
        const paidInvoices = invoices.data.filter(inv => inv.status === "paid");
        if (paidInvoices.length >= 3) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await stripe.subscriptions.update(subscriptionId, {
            items: [{ id: subscription.items.data[0].id, price: process.env.STRIPE_NORMAL_PRICE_ID! }],
            proration_behavior: "create_prorations",
          });
        }

        // Provision Twilio if new account subscription
        if (payment.paymentType === "NEW_ACCOUNT_SUBSCRIPTION") {
          const twilioNumber = await provisionTwilioNumber(payment.userId);
          const laundromat = await prisma.laundromatLocation.findFirst({ where: { userId: payment.userId }, select: { id: true } });
          if (laundromat) {
            await prisma.laundromatLocation.update({ where: { id: laundromat.id }, data: { twilioPhone: twilioNumber.phoneNumber  } });
          }
        }
      }
    }

    // -------------------------------
    // Handle One-Time Payments
    // -------------------------------
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const userId = parseInt(paymentIntent.metadata.userId!, 10);
      const flowType = paymentIntent.metadata.flowType;

      const payment = await prisma.payment.findFirst({ where: { stripeSubscriptionId: paymentIntent.id } });
      if (payment && payment.paymentStatus !== "succeeded") {
        await prisma.payment.update({ where: { id: payment.id }, data: { paymentStatus: "succeeded" } });
      }

      if (flowType === "NEW_NUMBER" || flowType === "NEW_ACCOUNT") {
        const twilioNumber = await provisionTwilioNumber(userId);
        const laundromat = await prisma.laundromatLocation.findFirst({ where: { userId }, select: { id: true } });
        if (laundromat) {
          await prisma.laundromatLocation.update({ where: { id: laundromat.id }, data: { twilioPhone: twilioNumber.phoneNumber } });
        }
      }

      if (flowType === "ADD_LOCATION") {
        console.log("User paid for additional locations — handle DB update here");
      }
    }

    // -------------------------------
    // Handle Subscription Deletion
    // -------------------------------
    // if (event.type === "customer.subscription.deleted") {
    //   const subscription = event.data.object as Stripe.Subscription;
    //   const subscriptionId = subscription.id;

    //   const payment = await prisma.payment.findFirst({ where: { stripeSubscriptionId: subscriptionId } });
    //   if (payment) {
    //     // Idempotent cancellation: only update if not already cancelled
    //     if (payment.paymentStatus !== "cancelled") {
    //       await prisma.payment.update({ where: { id: payment.id }, data: { paymentStatus: "cancelled" } });
    //     }

    //     // Optional: release Twilio numbers
    //     const laundromat = await prisma.laundromatLocation.findFirst({ where: { userId: payment.userId } });
    //     if (laundromat?.twilioPhone) {
    //       console.log(`Twilio number ${laundromat.twilioPhone} can be released here`);
    //       // await twilioClient.incomingPhoneNumbers(laundromat.twilioPhone).remove();
    //     }
    //   }
    // }

  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ paymentId });
}
