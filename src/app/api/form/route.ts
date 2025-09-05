import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "secret";

// POST handler: Create laundromat location if none exists
export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 401 });
  }

  try {
    const flatData = await request.json();

    // Check if laundromat location exists for user
    // const existing = await prisma.laundromatLocation.findFirst({
    //   where: { userId: user.userId },
    // });

    // if (existing) {
    //   // If already exists, respond with conflict or appropriate status
    //   return NextResponse.json(
    //     { error: "Laundromat location already exists, use PUT to update" },
    //     { status: 409 }
    //   );
    // }

    // Create new laundromat location and nested relations
    const nestedData = {
      user: {
        connect: { id: user.userId },
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
        create: { services: flatData.services ?? [] },
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
        create: { amenities: flatData.amenities ?? [] },
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

    const created = await prisma.laundromatLocation.create({
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

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT handler: Update existing laundromat location and nested relations
export async function PUT(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 401 });
  }

  try {
    const flatData = await request.json();
    

    const id = parseInt(flatData.id, 10);

    // Find existing laundromat location for this user
    const existing = await prisma.laundromatLocation.findFirst({
      where: { userId: user.userId, id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Laundromat location not found" },
        { status: 404 }
      );
    }

    // Update laundromat location and nested relations
    const updated = await prisma.laundromatLocation.update({
      where: { id: existing.id },
      data: {
        locationName: flatData.locationName,
        address: flatData.address,
        phone: flatData.phone,
        email: flatData.email,
        areaCode: flatData.areaCode,
        website: flatData.website,
        googleMapsUrl: flatData.googleMapsUrl,

        operatingHours: {
          update: {
            weekdayHours: flatData.weekdayHours,
            weekendHours: flatData.weekendHours,
            openOnHolidays: flatData.openOnHoliday ?? flatData.openOnHolidays,
            holidayNote: flatData.holidayNote,
            lastWashTime: flatData.lastWashTime,
          },
        },

        services: {
          update: {
            services: flatData.services ?? [],
          },
        },

        pricing: {
          update: {
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
          update: {
            totalWashers: flatData.totalWashers,
            totalDryers: flatData.totalDryers,
            machineOperationType: flatData.machineOperationType,
            machinesModern: flatData.machinesModern,
            largeMachines: flatData.largeMachines,
          },
        },

        amenities: {
          update: {
            amenities: flatData.amenities ?? [],
          },
        },

        questions: {
          update: {
            commonQuestions: flatData.commonQuestions ?? [],
            customQuestions: flatData.customQuestions ?? [],
          },
        },

        callHandling: {
          update: {
            callHandlingStyle: flatData.callHandlingStyle,
            forwardingEnabled: flatData.forwardingEnabled,
            forwardingNumber: flatData.forwardingNumber,
            forwardingHours: flatData.forwardingHours,
          },
        },

        languageSettings: {
          update: {
            languages: flatData.languages ?? [],
            autoDetectLanguage: flatData.autoDetectLanguage,
          },
        },

        businessTone: {
          update: {
            businessTone: flatData.businessTone,
            customPhrases: flatData.customPhrases,
            businessIntro: flatData.businessIntro,
          },
        },

        policies: {
          update: {
            lostFoundPolicy: flatData.lostFoundPolicy,
            refundPolicy: flatData.refundPolicy,
            covidPolicies: flatData.covidPolicies,
            timeLimits: flatData.timeLimits,
            unattendedPolicy: flatData.unattendedPolicy,
            additionalPolicies: flatData.additionalPolicies,
          },
        },
      },
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

    // Optionally also update user's businessName in User table
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        businessName: flatData.businessName,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET handler: Fetch laundromat location and nested data for logged-in user
// export async function GET(request: Request) {
//   const user = await getUser();
//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const data = await prisma.laundromatLocation.findMany({
//       where: { userId: user.userId },
//       include: {
//         operatingHours: true,
//         services: true,
//         pricing: true,
//         machineInfo: true,
//         amenities: true,
//         questions: true,
//         callHandling: true,
//         languageSettings: true,
//         businessTone: true,
//         policies: true,
//       },
//     });

//     if (!data) {
//       return NextResponse.json(null, { status: 404 });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");

    let data;
    if (idParam) {
      const id = parseInt(idParam, 10); // ✅ convert string -> number

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      data = await prisma.laundromatLocation.findFirst({
        where: { userId: user.userId, id },
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

      if (!data) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    } else {
      data = await prisma.laundromatLocation.findMany({
        where: { userId: user.userId },
        orderBy: { id: "asc" },
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
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}