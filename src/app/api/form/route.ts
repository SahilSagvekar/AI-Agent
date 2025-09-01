import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "secret";

// export async function POST(request: Request) {
//   // Get logged-in user info
//   const user = await getUser();
//   console.log("Authenticated user:", user);

//   if (!user) {
//     return NextResponse.json({ error: "uggo Unauthorized" }, { status: 401 });
//   }

//   try {
//     // Flat formData from UI
//     const flatData = await request.json();

//     // Reshape into nested structure expected by Prisma
//     const nestedData = {
//       // userId: user.id,
//       user: {
//         connect: { id: user.userId }, // connect to existing user by ID
//       },
//       locationName: flatData.locationName,
//       address: flatData.address,
//       phone: flatData.phone,
//       email: flatData.email,
//       website: flatData.website,
//       googleMapsUrl: flatData.googleMapsUrl,

//       operatingHours: {
//         create: {
//           weekdayHours: flatData.weekdayHours,
//           weekendHours: flatData.weekendHours,
//           openOnHolidays: flatData.openOnHoliday ?? flatData.openOnHolidays,
//           holidayNote: flatData.holidayNote,
//           lastWashTime: flatData.lastWashTime,
//         },
//       },

//       services: {
//         create: {
//           services: flatData.services ?? [],
//         },
//       },

//       pricing: {
//         create: {
//           washerPrices: flatData.washerPrices,
//           dryerPrices: flatData.dryerPrices,
//           washFoldRate: flatData.washFoldRate,
//           dryCleaningPrices: flatData.dryCleaningPrices,
//           pickupDeliveryPricing: flatData.pickupDeliveryPricing,
//           minimumCharges: flatData.minimumCharges,
//           paymentMethods: flatData.paymentMethods ?? [],
//         },
//       },

//       machineInfo: {
//         create: {
//           totalWashers: flatData.totalWashers,
//           totalDryers: flatData.totalDryers,
//           machineOperationType: flatData.machineOperationType,
//           machinesModern: flatData.machinesModern,
//           largeMachines: flatData.largeMachines,
//         },
//       },

//       amenities: {
//         create: {
//           amenities: flatData.amenities ?? [],
//         },
//       },

//       questions: {
//         create: {
//           commonQuestions: flatData.commonQuestions ?? [],
//           customQuestions: flatData.customQuestions ?? [],
//         },
//       },

//       callHandling: {
//         create: {
//           callHandlingStyle: flatData.callHandlingStyle,
//           forwardingEnabled: flatData.forwardingEnabled,
//           forwardingNumber: flatData.forwardingNumber,
//           forwardingHours: flatData.forwardingHours,
//         },
//       },

//       languageSettings: {
//         create: {
//           languages: flatData.languages ?? [],
//           autoDetectLanguage: flatData.autoDetectLanguage,
//         },
//       },

//       businessTone: {
//         create: {
//           businessTone: flatData.businessTone,
//           customPhrases: flatData.customPhrases,
//           businessIntro: flatData.businessIntro,
//         },
//       },

//       policies: {
//         create: {
//           lostFoundPolicy: flatData.lostFoundPolicy,
//           refundPolicy: flatData.refundPolicy,
//           covidPolicies: flatData.covidPolicies,
//           timeLimits: flatData.timeLimits,
//           unattendedPolicy: flatData.unattendedPolicy,
//           additionalPolicies: flatData.additionalPolicies,
//         },
//       },
//     };

//     // Create nested data with Prisma
//     const saved = await prisma.laundromatLocation.create({
//       data: nestedData,
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

//     return NextResponse.json(saved, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "User Not Found" }, { status: 401 });
  }

  try {
    const flatData = await request.json();

    // Check if a laundromat location exists for the user
    const existing = await prisma.laundromatLocation.findFirst({
      where: { userId: user.userId },
    });

    if (existing) {
      // Update existing laundromat location and nested relations
      const updated = await prisma.laundromatLocation.update({
        where: { id: existing.id },
        data: {
          locationName: flatData.locationName,
          address: flatData.address,
          phone: flatData.phone,
          email: flatData.email,
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

      const userData = prisma.user.update({
         where: { id: existing.id },
         data: {
          businessName: flatData.businessName 
         }
      })


      return NextResponse.json(updated, { status: 200 });
    } else {
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
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Get the logged-in user info
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch existing laundromat location and nested data for this user
    const data = await prisma.laundromatLocation.findFirst({
      where: { userId: user.userId },
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
      // No existing training found for this user
      return NextResponse.json(null, { status: 404 });
    }

    // Respond with the existing training data
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching training data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
