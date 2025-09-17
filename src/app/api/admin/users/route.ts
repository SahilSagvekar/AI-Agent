// /app/api/admin/users/route.ts (or pages/api/admin/users.ts for Pages Router)
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      laundromatLocations: {
        include: {
          amenities: true,
          businessTone: true,
          callHandling: true,
          languageSettings: true,
          machineInfo: true,
          operatingHours: true,
          payments: true,
          policies: true,
          pricing: true,
          questions: true,
          services: true,
          PhoneNumber: true,
        },
      },
      payments: true,
      phoneNumbers: true,
    },
  });
  return NextResponse.json(users);
}
