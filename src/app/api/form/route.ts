import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "secret";

export async function POST(request: Request) {
  // Get logged-in user info
  const user = await getUser();
  console.log('Authenticated user:', user);

  if (!user) {
    return NextResponse.json({ error: 'uggo Unauthorized' }, { status: 401 });
  }

  try {
    // Flat formData from UI
    const flatData = await request.json();

    // Reshape into nested structure expected by Prisma
    const nestedData = {
      // userId: user.id,
      user: {
    connect: { id: user.userId }, // connect to existing user by ID
    },
      locationName: flatData.locationName,
      address: flatData.address,
      phone: flatData.phone,
      email: flatData.email,
      website: flatData.website,
      googleMapsUrl: flatData.googleMapsUrl,

      operatingHours: {
        create: {
          weekdayHours: flatData.weekdayHours,
          weekendHours: flatData.weekendHours,
          openOnHolidays: flatData.openOnHoliday ?? flatData.openOnHolidays,
          holidayNote: flatData.holidayNote,
          lastWashTime: flatData.lastWashTime,
        },
      },

      services: {
        create: {
          services: flatData.services ?? [],
        },
      },

      pricing: {
        create: {
          washerPrices: flatData.washerPrices,
          dryerPrices: flatData.dryerPrices,
          washFoldRate: flatData.washFoldRate,
          dryCleaningPrices: flatData.dryCleaningPrices,
          pickupDeliveryPricing: flatData.pickupDeliveryPricing,
          minimumCharges: flatData.minimumCharges,
          paymentMethods: flatData.paymentMethods ?? [],
        },
      },

      machineInfo: {
        create: {
          totalWashers: flatData.totalWashers,
          totalDryers: flatData.totalDryers,
          machineOperationType: flatData.machineOperationType,
          machinesModern: flatData.machinesModern,
          largeMachines: flatData.largeMachines,
        },
      },

      amenities: {
        create: {
          amenities: flatData.amenities ?? [],
        },
      },

      questions: {
        create: {
          commonQuestions: flatData.commonQuestions ?? [],
          customQuestions: flatData.customQuestions ?? [],
        },
      },

      callHandling: {
        create: {
          callHandlingStyle: flatData.callHandlingStyle,
          forwardingEnabled: flatData.forwardingEnabled,
          forwardingNumber: flatData.forwardingNumber,
          forwardingHours: flatData.forwardingHours,
        },
      },

      languageSettings: {
        create: {
          languages: flatData.languages ?? [],
          autoDetectLanguage: flatData.autoDetectLanguage,
        },
      },

      businessTone: {
        create: {
          businessTone: flatData.businessTone,
          customPhrases: flatData.customPhrases,
          businessIntro: flatData.businessIntro,
        },
      },

      policies: {
        create: {
          lostFoundPolicy: flatData.lostFoundPolicy,
          refundPolicy: flatData.refundPolicy,
          covidPolicies: flatData.covidPolicies,
          timeLimits: flatData.timeLimits,
          unattendedPolicy: flatData.unattendedPolicy,
          additionalPolicies: flatData.additionalPolicies,
        },
      },
    };

    // Create nested data with Prisma
    const saved = await prisma.laundromatLocation.create({
      data: nestedData,
      include: {
        operatingHours: true,
        services: true,
        pricing: true,
        machineInfo: true,
        amenities: true,
        questions: true,
        callHandling: true,
        languageSettings: true,
        businessTone: true,
        policies: true,
      },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

