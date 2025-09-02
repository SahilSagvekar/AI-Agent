import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import twilio from "twilio";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

     if (!user) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

   const paymentSuccess = await prisma.user.update({
     where: { id: user.userId },
     data: { firstPayment: true },
   });
   console.log(paymentSuccess);

    // In test mode, you can immediately confirm using a test card number on the frontend
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// ##################################################################################################################################################################################################################################################

// twilio buy number code

// import twilio from "twilio";
// import Stripe from "stripe";
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { getUser } from "@/lib/auth";

// const prisma = new PrismaClient();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID!,
//   process.env.TWILIO_AUTH_TOKEN!
// );




// async function provisionTwilioNumber(userId: string) {

//   const user = await getUser();
//   const preferredAreaCode  = await prisma.laundromatLocation.findFirst({
//   where: { userId: user.userId },
//   select: {
//     areaCode: true,
//   },
//  });

//   console.log('preferredAreaCode?.areaCode' + preferredAreaCode?.areaCode);

//   const availableNumbers = await twilioClient.availablePhoneNumbers("US").local.list({
//     areaCode: Number(preferredAreaCode?.areaCode),
//     smsEnabled: true,
//     voiceEnabled: true,
//     limit: 1,
//   });
//   if (availableNumbers.length === 0) {
//     throw new Error(`No available Twilio numbers found for area code ${preferredAreaCode}`);
//   }
//   const phoneNumberToPurchase = availableNumbers[0].phoneNumber;

//   const purchasedNumber = await twilioClient.incomingPhoneNumbers.create({
//     phoneNumber: phoneNumberToPurchase,
//   });

//   console.log(`Twilio phone number ${purchasedNumber.phoneNumber} provisioned for user ${userId}`);
//   return purchasedNumber.phoneNumber;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { amount, userId, businessName, locationCount } = await req.json();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//       metadata: { userId, businessName, locationCount },
//     });

//     // Provision Twilio number immediately (for testing only)
//     const twilioNumber = await provisionTwilioNumber(userId || "unknown");

//     // TODO: Save paymentIntent.id and twilioNumber to your DB here for user reference

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//       twilioNumber,
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
