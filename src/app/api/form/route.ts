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

    // ✅ Extract UI fields for attendant hours
    const attendingOpen = flatData.attendingOpen || "";
    const attendingClose = flatData.attendingClose || "";
    const is24Hours = !!flatData.is24Hours;

    // Operating hours
    const hours = flatData.hours || {};
    // Holiday hours (array of { name, open, close })
    const holidayHours = flatData.holidayHours || [];

    const nestedData = {
      user: {
        connect: { id: user.userId },
      },
      locationName: flatData.locationName || flatData.businessName || "",
      businessName: flatData.businessName || "",
      zipCode: flatData.zipCode || "",
      address: flatData.address || "",
      phone: flatData.phone || "",
      email: flatData.email || "",
      website: flatData.website || "",
      googleMapsUrl: flatData.googleMapsUrl || "",
      notableLandmarks: flatData.notableLandmarks || "",

      // ✅ Save attendant hours in structured fields
      attendingOpen,
      attendingClose,
      is24Hours,

      nonAttendingHours: flatData.nonAttendingHours || "",
      timeZone: flatData.timeZone || "",

      operatingHours: {
        create: {
          mondayOpen: hours.Monday?.open || "",
          mondayClose: hours.Monday?.close || "",
          tuesdayOpen: hours.Tuesday?.open || "",
          tuesdayClose: hours.Tuesday?.close || "",
          wednesdayOpen: hours.Wednesday?.open || "",
          wednesdayClose: hours.Wednesday?.close || "",
          thursdayOpen: hours.Thursday?.open || "",
          thursdayClose: hours.Thursday?.close || "",
          fridayOpen: hours.Friday?.open || "",
          fridayClose: hours.Friday?.close || "",
          saturdayOpen: hours.Saturday?.open || "",
          saturdayClose: hours.Saturday?.close || "",
          sundayOpen: hours.Sunday?.open || "",
          sundayClose: hours.Sunday?.close || "",
          openOnHolidays: !!flatData.openOnHolidays,
          holidayNote: flatData.holidayNote || "",
          lastWashTime: flatData.lastWashTime || "",
          timeZone: flatData.timeZone || "",
        },
      },

      holidayHours: {
        create: holidayHours.map(
          (hh: { name: string; open: string; close: string }) => ({
            name: hh.name,
            open: hh.open,
            close: hh.close,
          })
        ),
      },

      washers: {
        create: (Array.isArray(flatData.washers) ? flatData.washers : []).map(
          (w: {
            size: string;
            price: number;
            quantity: number;
            system: string;
            payments?: string[];
          }) => ({
            size: w.size,
            price: w.price,
            quantity: w.quantity,
            system: w.system,
            payments: { set: w.payments || [] },
          })
        ),
      },

      dryers: {
        create: (Array.isArray(flatData.dryers) ? flatData.dryers : []).map(
          (d: {
            size: string;
            price: number;
            quantity: number;
            system: string;
            payments?: string[];
          }) => ({
            size: d.size,
            price: d.price,
            quantity: d.quantity,
            system: d.system,
            payments: { set: d.payments || [] },
          })
        ),
      },

      services: {
        create: { services: flatData.services ?? [] },
      },

      pricing: {
        create: {
          washerPrices: flatData.washerPrices || "",
          dryerPrices: flatData.dryerPrices || "",
          washFoldRate: flatData.washFoldRate || "",
          dryCleaningPrices: flatData.dryCleaningPrices || "",
          pickupDeliveryPricing: flatData.pickupDeliveryPricing || "",
          minimumCharges: flatData.minimumCharges || "",
          paymentMethods: flatData.paymentMethods ?? [],
        },
      },

      machineInfo: {
        create: {
          totalWashers: flatData.totalWashers || "",
          totalDryers: flatData.totalDryers || "",
          machineOperationType: flatData.machineOperationType || "",
          machinesModern: !!flatData.machinesModern,
          largeMachines: !!flatData.largeMachines,
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
          callHandlingStyle: flatData.callHandlingStyle || "",
          forwardingEnabled: !!flatData.forwardingEnabled,
          forwardingNumber: flatData.forwardingNumber || "",
          forwardingHours: flatData.forwardingHours || "",
        },
      },

      languageSettings: {
        create: {
          languages: flatData.languages ?? [],
          autoDetectLanguage: !!flatData.autoDetectLanguage,
        },
      },

      businessTone: {
        create: {
          businessTone: flatData.businessTone || "",
          customPhrases: flatData.customPhrases || "",
          businessIntro: flatData.businessIntro || "",
        },
      },

      policies: {
        create: {
          lostFoundPolicy: flatData.lostFoundPolicy || "",
          refundPolicy: flatData.refundPolicy || "",
          petPolicies: flatData.petPolicies || "",
          timeLimits: flatData.timeLimits || "",
          unattendedPolicy: flatData.unattendedPolicy || "",
          additionalPolicies: flatData.additionalPolicies || "",
        },
      },

      escalateForwardCall: !!flatData.escalateForwardCall,
      escalationNumber: flatData.escalationNumber || "",
      escalateSendMessage: !!flatData.escalateSendMessage,
      escalateSendEmail: !!flatData.escalateSendEmail,
      escalationEmail: flatData.escalationEmail || "",
      hiringResponse: flatData.hiringResponse || "",
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

    // Extract UI fields for attendant hours
    const attendingOpen = flatData.attendingOpen || "";
    const attendingClose = flatData.attendingClose || "";
    const is24Hours = !!flatData.is24Hours;

    // Prepare all fields, defaulting where needed
    const hours = flatData.hours || {};
    const holidayHours = flatData.holidayHours || [];

    const updated = await prisma.laundromatLocation.update({
      where: { id: existing.id },
      data: {
        locationName: flatData.locationName || flatData.businessName || "",
        businessName: flatData.businessName || "",
        address: flatData.address || "",
        phone: flatData.phone || "",
        zipCode: flatData.zipCode || "",
        website: flatData.website || "",
        googleMapsUrl: flatData.googleMapsUrl || "",
        notableLandmarks: flatData.notableLandmarks || "",

        // ✅ store attendant hours properly
        attendingOpen,
        attendingClose,
        is24Hours,

        nonAttendingHours: flatData.nonAttendingHours || "",
        timeZone: flatData.timeZone || "",

        operatingHours: {
          update: {
            mondayOpen: hours.Monday?.open || "",
            mondayClose: hours.Monday?.close || "",
            tuesdayOpen: hours.Tuesday?.open || "",
            tuesdayClose: hours.Tuesday?.close || "",
            wednesdayOpen: hours.Wednesday?.open || "",
            wednesdayClose: hours.Wednesday?.close || "",
            thursdayOpen: hours.Thursday?.open || "",
            thursdayClose: hours.Thursday?.close || "",
            fridayOpen: hours.Friday?.open || "",
            fridayClose: hours.Friday?.close || "",
            saturdayOpen: hours.Saturday?.open || "",
            saturdayClose: hours.Saturday?.close || "",
            sundayOpen: hours.Sunday?.open || "",
            sundayClose: hours.Sunday?.close || "",
            openOnHolidays: !!flatData.openOnHolidays,
            holidayNote: flatData.holidayNote || "",
            lastWashTime: flatData.lastWashTime || "",
            timeZone: flatData.timeZone || "",
          },
        },

        // If you want to replace holiday hours, you might want to delete + recreate them:
        // holidayHours: {
        //   deleteMany: {}, // clear existing
        //   create: holidayHours.map(hh => ({ name: hh.name, open: hh.open, close: hh.close }))
        // },

        washers: {
          deleteMany: {}, // clear old washers first (avoids duplicates)
          create: (Array.isArray(flatData.washers) ? flatData.washers : []).map(
            (w: {
              size: string;
              price: number;
              quantity: number;
              system: string;
              payments?: string[];
            }) => ({
              size: w.size,
              price: w.price,
              quantity: w.quantity,
              system: w.system,
              payments: { set: w.payments || [] },
            })
          ),
        },

        dryers: {
          deleteMany: {}, // clear old dryers first
          create: (Array.isArray(flatData.dryers) ? flatData.dryers : []).map(
            (d: {
              size: string;
              price: number;
              quantity: number;
              system: string;
              payments?: string[];
            }) => ({
              size: d.size,
              price: d.price,
              quantity: d.quantity,
              system: d.system,
              payments: { set: d.payments || [] },
            })
          ),
        },

        services: {
          update: { services: flatData.services ?? [] },
        },

        pricing: {
          update: {
            washerPrices: flatData.washerPrices || "",
            dryerPrices: flatData.dryerPrices || "",
            washFoldRate: flatData.washFoldRate || "",
            dryCleaningPrices: flatData.dryCleaningPrices || "",
            pickupDeliveryPricing: flatData.pickupDeliveryPricing || "",
            minimumCharges: flatData.minimumCharges || "",
            paymentMethods: flatData.paymentMethods ?? [],
          },
        },

        machineInfo: {
          update: {
            totalWashers: flatData.totalWashers || "",
            totalDryers: flatData.totalDryers || "",
            machineOperationType: flatData.machineOperationType || "",
            machinesModern: !!flatData.machinesModern,
            largeMachines: !!flatData.largeMachines,
          },
        },

        amenities: {
          update: { amenities: flatData.amenities ?? [] },
        },

        questions: {
          update: {
            commonQuestions: flatData.commonQuestions ?? [],
            customQuestions: flatData.customQuestions ?? [],
          },
        },

        callHandling: {
          update: {
            callHandlingStyle: flatData.callHandlingStyle || "",
            forwardingEnabled: !!flatData.forwardingEnabled,
            forwardingNumber: flatData.forwardingNumber || "",
            forwardingHours: flatData.forwardingHours || "",
          },
        },

        languageSettings: {
          update: {
            languages: flatData.languages ?? [],
            autoDetectLanguage: !!flatData.autoDetectLanguage,
          },
        },

        businessTone: {
          update: {
            businessTone: flatData.businessTone || "",
            customPhrases: flatData.customPhrases || "",
            businessIntro: flatData.businessIntro || "",
          },
        },

        policies: {
          update: {
            lostFoundPolicy: flatData.lostFoundPolicy || "",
            refundPolicy: flatData.refundPolicy || "",
            petPolicies: flatData.petPolicies || "",
            timeLimits: flatData.timeLimits || "",
            unattendedPolicy: flatData.unattendedPolicy || "",
            additionalPolicies: flatData.additionalPolicies || "",
          },
        },

        escalateForwardCall: !!flatData.escalateForwardCall,
        escalationNumber: flatData.escalationNumber || "",
        escalateSendMessage: !!flatData.escalateSendMessage,
        escalateSendEmail: !!flatData.escalateSendEmail,
        escalationEmail: flatData.escalationEmail || "",
        hiringResponse: flatData.hiringResponse || "",
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
      data: { businessName: flatData.businessName },
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

    // Centralized include object for relations
    const includeObj = {
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
      washers: true,
      dryers: true,
      holidayHours: true, // ✅ Make sure this exists in schema
    };

    let data;

    if (idParam) {
      const id = parseInt(idParam, 10);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      data = await prisma.laundromatLocation.findFirst({
        where: { userId: user.userId, id },
        include: includeObj,
      });

      if (!data) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    } else {
      data = await prisma.laundromatLocation.findMany({
        where: { userId: user.userId },
        orderBy: { id: "asc" },
        include: includeObj,
      });
    }

    // ✅ No extra transformation needed — attendingOpen, attendingClose, is24Hours
    // are automatically included if you updated the schema

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}