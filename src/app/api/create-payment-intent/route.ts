import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const userId = user?.userId;
    if (!userId) throw new Error("User not authenticated");

    const data = await req.json();

    console.log("Payment Intent Request Data:", data);

     let Secret = null
     let  subscriptionId = null
     let  paymentId = null

    // 1️⃣ Ensure we have or create a Stripe Customer for this user
    const existingCustomer = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { email: true },
    });

    const customer = await stripe.customers.create({
      email: existingCustomer?.email ?? undefined,
       metadata: {
          userId: userId.toString(),
          flowType: data.flowType,
        },
    });
    const stripeCustomerId = customer.id;

    // 2️⃣ Create Subscription for NEW_ACCOUNT flow
    // if (data.flowType === "NEW_ACCOUNT_SUBSCRIPTION") {
    //   const subscription = await stripe.subscriptions.create({
    //     customer: stripeCustomerId,
    //     items: [
    //       { price: process.env.STRIPE_INTRO_PRICE_ID!, quantity: 1 },
    //       { price: process.env.STRIPE_ADD_LOCATION_PRICE_ID!, quantity: data.locationCount },
    //     ],
    //     payment_behavior: "default_incomplete",
    //     expand: [
    //       "latest_invoice.payment_intent",
    //       "latest_invoice.confirmation_secret",
    //     ],
    //      metadata: {
    //       userId: userId.toString(),
    //       flowType: data.flowType,
    //     },
    //   });

    //   // Access PaymentIntent client secret
    //   const invoice = subscription.latest_invoice as Stripe.Invoice;
    //   let clientSecret = null;
    //   // if (
    //   //   invoice.payment_intent &&
    //   //   typeof invoice.payment_intent !== "string"
    //   // ) {
    //   //   clientSecret = invoice.payment_intent.client_secret ?? null;
    //   // } else if ("confirmation_secret" in invoice) {
    //   //   clientSecret = (invoice as any).confirmation_secret ?? null;
    //   // }

    //   if ("confirmation_secret" in invoice) {
    //     clientSecret = (invoice as any).confirmation_secret ?? null;
    //   }

    //   // Save subscription info to DB
    //   const payment = await prisma.payment.create({
    //     data: {
    //       userId: Number(userId),
    //       amount: invoice.total,
    //       paymentType: data.flowType,
    //       formData: data.formData ?? {},
    //       paymentStatus: "pending",
    //       stripeSubscriptionId: subscription.id,
    //     },
    //   });

    //   Secret = clientSecret.client_secret;
    //   subscriptionId = subscription.id;
    //   paymentId = payment.id;

    //   // return NextResponse.json({
    //   //   clientSecret: clientSecret.client_secret,
    //   //   subscriptionId: subscription.id,
    //   //   paymentId: payment.id,
    //   // });
    // }

    // 2️⃣ Handle Subscription Flow
if (data.flowType === "NEW_ACCOUNT_SUBSCRIPTION") {
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [
      { price: process.env.STRIPE_INTRO_PRICE_ID!, quantity: 1 },
      { price: process.env.STRIPE_ADD_LOCATION_PRICE_ID!, quantity: data.locationCount },
    ],
    payment_behavior: "default_incomplete",
    expand: [
          "latest_invoice.payment_intent",
          "latest_invoice.confirmation_secret",
        ],
    metadata: {
      userId: userId.toString(),
      flowType: data.flowType,
    },
  });

  // ✅ Use type assertion to tell TS that payment_intent is expanded
  type ExpandedInvoice = Stripe.Invoice & {
    payment_intent: Stripe.PaymentIntent | string | null;
  };

  const invoice = subscription.latest_invoice as ExpandedInvoice;

  // let clientSecret = "fuck";
  let clientSecret: any | null = null;
  // if (invoice.payment_intent && typeof invoice.payment_intent !== "string") {
  //   clientSecret = invoice.payment_intent.client_secret ?? null;
  // }

  if (
        invoice.payment_intent &&
        typeof invoice.payment_intent !== "string"
      ) {
        clientSecret = invoice.payment_intent.client_secret ?? null;
      } else if ("confirmation_secret" in invoice) {
        clientSecret = (invoice as any).confirmation_secret ?? null;
      }


  

  const payment = await prisma.payment.create({
    data: {
      userId: Number(userId),
      amount: invoice.total,
      paymentType: data.flowType,
      formData: data.formData ?? {},
      paymentStatus: "pending",
      stripeSubscriptionId: subscription.id,
    },
  });

  Secret = clientSecret.client_secret;
  subscriptionId = subscription.id;
  paymentId = payment.id;
}


    // 3️⃣ Handle other flows (one-time payments)


    // Example: ADD_LOCATION or NEW_NUMBER → normal PaymentIntent flow

    if (data.flowType === "ADD_LOCATION") {
      console.log("ADD_LOCATION");
      const calculatedAmount = 4500; // dynamic calculation from client
      const paymentIntent = await stripe.paymentIntents.create({
        amount:  calculatedAmount,
        currency: "usd",
        metadata: { userId, flowType: data.flowType },
        payment_method_types: ["card"],
      });

      const payment = await prisma.payment.create({
        data: {
          userId: Number(userId),
          amount: calculatedAmount,
          paymentType: data.flowType,
          formData: data.formData ?? {},
          paymentStatus: "pending",
          stripePaymentId: paymentIntent.id,
        },
      });

      Secret = paymentIntent.client_secret;
      paymentId = payment.id;
    }

     if (data.flowType === "NEW_NUMBER") {
      console.log("ADD_LOCATION");
      const calculatedAmount = 4500; // dynamic calculation from client
      const paymentIntent = await stripe.paymentIntents.create({
        amount:  calculatedAmount,
        currency: "usd",
        metadata: { userId, flowType: data.flowType },
        payment_method_types: ["card"],
      });

      const payment = await prisma.payment.create({
        data: {
          userId: Number(userId),
          amount: calculatedAmount,
          paymentType: data.flowType,
          formData: data.formData ?? {},
          paymentStatus: "pending",
          stripePaymentId: paymentIntent.id,
        },
      });

      Secret = paymentIntent.client_secret;
      paymentId = payment.id;
    }

    return NextResponse.json({
      clientSecret: Secret,
      subscriptionId: subscriptionId,
      paymentId: paymentId,
    });
  } catch (e: any) {
    console.error("Error in payment API:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
