import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import twilio from 'twilio';

// Initialize Stripe
const stripe = new Stripe('sk_test_51O04VbSBxyiRrqCcHMrS6cvrD6kw0muCMDMBVhmtCZNhi13t5JDPIZoqHylAn1subzYuK5vDsCnCqiGBCcy1TwFJ00HAVkwdzT');


// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Stripe webhook secret from your environment
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid') {
      const userId = session.metadata?.userId || 'unknown';

      try {
        // === Save payment info to your DB ===
        // Replace this with your DB update logic
        // Example: await db.user.update({ where: { id: userId }, data: { paymentStatus: 'paid', stripeSessionId: session.id }});

        console.log(`Payment successful for user ${userId}. Saving to DB...`);

        // === Retrieve user data from your DB to get preferred area code ===
        // Example: const user = await db.user.findUnique({ where: { id: userId }});
        // const areaCode = user?.preferredAreaCode || '415';

        const areaCode = 415; // fallback area code if you don't fetch from DB

        // === Search available Twilio numbers ===
        const availableNumbers = await twilioClient.availablePhoneNumbers('US').local.list({
          areaCode,
          smsEnabled: true,
          voiceEnabled: true,
          limit: 1,
        });

        if (availableNumbers.length === 0) {
          console.error(`No Twilio numbers available for area code ${areaCode}`);
          return NextResponse.json(
            { error: `No available phone numbers for area code ${areaCode}` },
            { status: 500 }
          );
        }

        const numberToPurchase = availableNumbers[0].phoneNumber;

        // === Purchase the phone number ===
        const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
          phoneNumber: numberToPurchase,
        });

        // === Save purchased phone number to DB linked to user/business ===
        // Replace with your DB logic
        // Example: await db.userPhoneNumbers.create({ data: { userId, phoneNumber: purchasedNumber.phoneNumber }});

        console.log(
          `Purchased Twilio number ${purchasedNumber.phoneNumber} for user ${userId}`
        );

      } catch (error) {
        console.error('Error during payment processing and Twilio provisioning:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}



// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

// // IMPORTANT: Set your Stripe webhook secret (from dashboard) as an env var
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(request: NextRequest) {
//   const body = await request.text(); // raw body needed for signature verification
//   const signature = request.headers.get('stripe-signature') || '';

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object as Stripe.Checkout.Session;

//     // Verify payment status
//     if (session.payment_status === 'paid') {
//       const userId = session.metadata?.userId || 'unknown';

//       // TODO: Save payment success & session info to your DB

//       // TODO: Call Twilio API to buy phone number & save to DB for this user/business

//       console.log(`Payment successful for user ${userId}. Proceed with provisioning.`);
//     }
//   }

//   return NextResponse.json({ received: true });
// }
