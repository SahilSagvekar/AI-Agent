// app/api/cancel-subscription/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscriptionId } = body;

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId is required" }, { status: 400 });
    }

    // Cancel subscription at period end (set to true) or immediately
    const canceledSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true, // change to false if you want immediate cancellation
    });

    const payment = await prisma.payment.findFirst({ where: { stripeSubscriptionId: subscriptionId } });
      if (payment) {
        // Idempotent cancellation: only update if not already cancelled
        if (payment.paymentStatus !== "cancelled") {
          await prisma.payment.update({ where: { id: payment.id }, data: { paymentStatus: "cancelled" } });
        }

        // Optional: release Twilio numbers
        const laundromat = await prisma.laundromatLocation.findFirst({ where: { userId: payment.userId } });
        if (laundromat?.twilioPhone) {
          console.log(`Twilio number ${laundromat.twilioPhone} can be released here`);
          // await twilioClient.incomingPhoneNumbers(laundromat.twilioPhone).remove();
        }
      }

    // TODO: Update your database if needed to mark subscription as canceled

    return NextResponse.json({
      message: "Subscription canceled",
      subscription: canceledSubscription,
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
  }
}
