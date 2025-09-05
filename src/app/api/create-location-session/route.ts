import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/dist/server/api-utils';

const prisma = new PrismaClient();
const stripe = new Stripe('sk_test_51O04VbSBxyiRrqCcHMrS6cvrD6kw0muCMDMBVhmtCZNhi13t5JDPIZoqHylAn1subzYuK5vDsCnCqiGBCcy1TwFJ00HAVkwdzT');

export async function POST(request: Request) {
  try {
    // const body = await request.json();
    // const userId = body.userId;

  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

//   console.log("uzer" + user);
   const userId = user.userId

    // Create pending location
    // const pendingLocation = await prisma.laundromatLocation.create({
    //   data: {
    //     userId,
    //     locationName: 'Pending...',
    //     address: 'Pending...',
    //     phone: '',
    //   },
    // });

    // Create Stripe session for ₹45 location fee
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   mode: 'payment',
    //   line_items: [{
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: 'Additional Laundromat Location',
    //       },
    //       unit_amount: 4500, // ₹45 in paise
    //     },
    //     quantity: 1,
    //   }],
    //   metadata: {
    //     userId: String(userId),
    //     locationId: String(pendingLocation.id),
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tarining?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/locations`,
    // });

    return NextResponse.json({ 
        // url: session.url 

        user       //temporary]
     });

  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
