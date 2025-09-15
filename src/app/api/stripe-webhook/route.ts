import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";
import Stripe from "stripe";
import * as zipcodes from "zipcodes";
import { use } from "react";

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

  return "8282696969";
}

export async function POST(req: NextRequest, res: NextResponse) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  console.log("Received Stripe event:", event.type);

  // ✅ Handle Subscription Payments (first 3 months intro pricing)
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    // console.log("invoice.payment_succeeded", invoice.parent?.subscription_details.metadata);
    // console.log("invoice.payment_succeeded-2", invoice.parent?.subscription_details.metadata.flowType);

    if (invoice) {
      const subscriptionId = invoice.parent?.subscription_details
        .subscription as string;

      const payment = await prisma.payment.findFirst({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { paymentStatus: "succeeded" },
        });

        console.log(
          `Subscription payment succeeded for user ${payment.userId}`
        );

        // Check if user has paid 3 invoices already → switch to normal plan
        const invoices = await stripe.invoices.list({
          subscription: subscriptionId,
          limit: 10,
        });

        const paidInvoices = invoices.data.filter(
          (inv) => inv.status === "paid"
        );

        console.log("Total paid invoices for this subscription:", paidInvoices.length);

        if (paidInvoices.length >= 3) {
          console.log(
            "3 payments done, switching to normal pricing plan automatically"
          );
          await stripe.subscriptions.update(subscriptionId, {
            items: [
              {
                id: (
                  await stripe.subscriptions.retrieve(subscriptionId)
                ).items.data[0].id,
                price: process.env.STRIPE_NORMAL_PRICE_ID!, // $175 + $45/location
              },
            ],
            proration_behavior: "create_prorations",
          });
        }


        const userId = payment.userId;
        const flowType = payment.paymentType;

        if (userId) {
          try {
            // let userIdInt = parseInt(userId, 10);
            let userIdInt = userId;

            if (flowType === "NEW_ACCOUNT_SUBSCRIPTION") {
              const twilioNumber = await provisionTwilioNumber(userIdInt);

              const laundromat = await prisma.laundromatLocation.findFirst({
                where: { userId: Number(userId) },
                select: { id: true },
              });

              if (!laundromat) {
                throw new Error("Laundromat location not found for user");
              }

              await prisma.laundromatLocation.update({
                where: { id: laundromat.id },
                data: { twilioPhone: twilioNumber },
              });
            }
          } catch (error) {
            console.error(
              "Failed to provision Twilio number or handle flow:",
              error
            );
            return NextResponse.json(
              { error: "Failed post-payment processing" },
              { status: 500 }
            );
          }
        }
      }
    }
  }

  //   // ✅ Handle One-Time Payment (Add location / Buy number)
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const userId =  paymentIntent.metadata.userId;
    const flowType = paymentIntent.metadata.flowType;
  

    if (userId) {
      try {
        let userIdInt = parseInt(userId, 10);

        if (flowType === "NEW_NUMBER" || flowType === "NEW_ACCOUNT" ) {
          const twilioNumber = await provisionTwilioNumber(userIdInt);

          const laundromat = await prisma.laundromatLocation.findFirst({
            where: { userId: Number(userId) },
            select: { id: true },
          });

          if (!laundromat) {
            throw new Error("Laundromat location not found for user");
          }

          await prisma.laundromatLocation.update({
            where: { id: laundromat.id },
            data: { twilioPhone: twilioNumber },
          });

        }

        if (flowType === "ADD_LOCATION") {
          // console.log("User paid for additional locations — add them to DB here.");
          // Retrieve formData from Payment table if needed and insert new LaundromatLocation
        }
      } catch (error) {
        console.error("Failed to provision Twilio number or handle flow:", error);
        return NextResponse.json(
          { error: "Failed post-payment processing" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
