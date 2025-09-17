import { getServerSession } from "next-auth";
import { authOptions, getUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ADMIN_EMAILS } from "@/lib/admin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  // const session = await getServerSession(authOptions);
  const user = getUser();
  

  // if (user?.email || !ADMIN_EMAILS.includes(user?.email)) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const users = await prisma.user.findMany({
    include: { laundromatLocations: true, payments: true, phoneNumbers: true },
    orderBy: { id: "desc" },
  });

  return NextResponse.json(users);
}
