import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyToken = (token: string) => {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log("Verified Token:", verified);
    return verified as { userId: number; email: string; iat: number; exp: number };
  } catch { 
    return null;
  }
};

// Async version if cookies() returns a Promise
export async function getUser() {
  const cookieStore = await cookies(); // Add await
  const authCookie = cookieStore.get("authToken");
  console.log("Auth Cookie:", authCookie);
  const token = authCookie?.value;
  console.log("token:", token);

  if (!token) return null;

  return verifyToken(token);
}
