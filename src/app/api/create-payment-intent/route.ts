import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    const userId = user?.userId;
    if (!userId) throw new Error("User not authenticated");

     const data = await req.json();
    // console.log('data' + JSON.stringify(data));

    // Calculate amount dynamically here
    const amount = 22001; // example: $220.00 in cents
    console.log('amount' + amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { userId },
      payment_method_types: ["card"],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}