import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    // New signIn callback to control user creation and access
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!user.email) return false; // Google email missing, deny sign in

        // Check if email already exists in DB
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });


        if (existingUser) {
          // For your requirement: disallow sign in if email already exists
          return "/auth/error?error=EmailAlreadyExists"; // Return false to deny sign-in
        }

        // Create new user in DB if not found
        await prisma.user.create({
          data: {
            name: user.name || profile?.name || "",
            email: user.email,
            // No password needed for OAuth users (handle accordingly in your security model)
          },
        });
        

        return true; // Allow sign in
      }

      // For other providers or custom sign-in, default allow
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
        // token.picture = profile?.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user ) {
        session.user.name = token?.name as string;
        session.user.email = token?.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
