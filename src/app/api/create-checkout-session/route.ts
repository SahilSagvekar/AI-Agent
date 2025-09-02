import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51O04VbSBxyiRrqCcHMrS6cvrD6kw0muCMDMBVhmtCZNhi13t5JDPIZoqHylAn1subzYuK5vDsCnCqiGBCcy1TwFJ00HAVkwdzT');

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: "price_1S2tCcSBxyiRrqCcllngR4BU", quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/training?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
      metadata: { userId: userId || "unknown" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
