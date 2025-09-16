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

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  const signature = req.headers.get("stripe-signature")!;

  let paymentId = null;

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
      // const subscriptionId = invoice.parent?.subscription_details.subscription as string;
      const subscriptionId = invoice.parent!.subscription_details!.subscription as string;


      const payment = await prisma.payment.findFirst({
        where: { stripeSubscriptionId: subscriptionId },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id, stripeSubscriptionId: subscriptionId },
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

        console.log(
          "Total paid invoices for this subscription:",
          paidInvoices.length
        );

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

        // if (paidInvoices.length >= 3) {
        //   console.log(
        //     "3 payments done, switching to normal pricing plan automatically"
        //   );

        //   // Retrieve subscription and find items
        //   const subscription = await stripe.subscriptions.retrieve(
        //     subscriptionId
        //   );

        //   // Find base plan item and addon locations item if already exists
        //   const basePlanItem = subscription.items.data.find(
        //     (item) =>
        //       item.price.id === process.env.STRIPE_INTRO_PRICE_ID ||
        //       item.price.id === process.env.STRIPE_NORMAL_PRICE_ID
        //   );

        //   const addonItem = subscription.items.data.find(
        //     (item) => item.price.id === process.env.STRIPE_ADD_LOCATION_PRICE_ID
        //   );

        //   const subscriptionItems = [];

        //   // Update or add base plan item with normal price
        //   if (basePlanItem) {
        //     subscriptionItems.push({
        //       id: basePlanItem.id,
        //       price: process.env.STRIPE_NORMAL_PRICE_ID!,
        //     });
        //   } else {
        //     // base plan item missing? Add it freshly
        //     subscriptionItems.push({
        //       price: process.env.STRIPE_NORMAL_PRICE_ID!,
        //       quantity: 1,
        //     });
        //   }

        //   // Update or add addon location item with correct quantity
        //   if (locationsCount > 1) {
        //     if (addonItem) {
        //       subscriptionItems.push({
        //         id: addonItem.id,
        //         price: process.env.STRIPE_ADD_LOCATION_PRICE_ID!,
        //         quantity: locationsCount - 1,
        //       });
        //     } else {
        //       subscriptionItems.push({
        //         price: process.env.STRIPE_ADD_LOCATION_PRICE_ID!,
        //         quantity: locationsCount - 1,
        //       });
        //     }
        //   }

        //   await stripe.subscriptions.update(subscriptionId, {
        //     items: subscriptionItems,
        //     proration_behavior: "create_prorations",
        //   });
        // } else {
        //   // initial subscription create flow with intro price + addon locations
        //   const subscription = await stripe.subscriptions.create({
        //     customer: stripeCustomerId,
        //     items: [
        //       {
        //         price: process.env.STRIPE_INTRO_PRICE_ID!,
        //         quantity: 1,
        //       },
        //       ...(locationsCount > 1
        //         ? [
        //             {
        //               price: process.env.STRIPE_ADD_LOCATION_PRICE_ID!,
        //               quantity: locationsCount - 1,
        //             },
        //           ]
        //         : []),
        //     ],
        //     payment_behavior: "default_incomplete",
        //     proration_behavior: "create_prorations",
        //     metadata: {
        //       userId: userId.toString(),
        //       flowType: data.flowType,
        //     },
        //     expand: ["latest_invoice.payment_intent"],
        //   });

        //   // Save payment info etc
        // }

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
    const userId = paymentIntent.metadata.userId;
    const flowType = paymentIntent.metadata.flowType;

    if (userId) {
      try {
        // let userIdInt = parseInt(userId, 10);
          let userIdInt = userId;

        if (flowType === "NEW_NUMBER" || flowType === "NEW_ACCOUNT") {
          console.log("NEW_NUMBER");
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

          const payment = await prisma.payment.findFirst({
            where: { stripeSubscriptionId: paymentIntent.id },
          });

          if (payment) {
            await prisma.payment.update({
              where: { id: payment.id, stripeSubscriptionId: paymentIntent.id },
              data: { paymentStatus: "succeeded" },
            });
          }
        }

        if (flowType === "ADD_LOCATION") {
          console.log(
            "User paid for additional locations — add them to DB here."
          );

          const payment = await prisma.payment.findFirst({
            where: { stripeSubscriptionId: paymentIntent.id },
          });
          paymentId = payment?.id || null;

          if (payment) {
            await prisma.payment.update({
              where: { id: payment.id, stripeSubscriptionId: paymentIntent.id },
              data: { paymentStatus: "succeeded" },
            });
          }
          // Retrieve formData from Payment table if needed and insert new LaundromatLocation
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

  return NextResponse.json({ paymentId: paymentId });
}
