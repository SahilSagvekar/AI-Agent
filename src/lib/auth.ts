import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { ADMIN_EMAILS } from "./admin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyToken = (token: string) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secret");
    // console.log("Verified Token:", verified);
    return verified as { userId: number; email: string; iat: number; exp: number };
  } catch { 
    return null;
  }
};

// Async version if cookies() returns a Promise
export async function getUser() {
  const cookieStore = await cookies(); // Add await
  const authCookie = cookieStore.get("authToken");
  // console.log("Auth Cookie:", authCookie);
  const token = authCookie?.value;
  // console.log("token:", token);

  if (!token) return null;

  return verifyToken(token);
}

// export async function getUser2() {
//   const cookieStore =  cookies(); // Add await
//   const authCookie = cookieStore.get("authToken");
//   console.log("Auth Cookie:", authCookie);
//   const token = authCookie?.value;
//   console.log("token:", token);

//   if (!token) return null;

//   return verifyToken(token);
// }


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = ADMIN_EMAILS.includes(user.email);
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin", // normal sign-in page
  },
};