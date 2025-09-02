import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    // You can use userId to link session metadata or later fulfillment

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   mode: 'payment',
    //   line_items: [
    //     {
    //       price: 'price_12345abcde', // Your fixed $175 priceId here
    //       quantity: 1,
    //     },
    //   ],
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    //   metadata: {
    //     userId: userId || 'unknown',
    //   },
    // });
    const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  line_items: [ { price: 'price_12345abcde', quantity: 1 } ],
  success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/training?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
  metadata: { userId: userId || 'unknown' }
});

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
