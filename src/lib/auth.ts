import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  } catch {
    return null;
  }
};

// Async version if cookies() returns a Promise
export async function getUser() {
  const cookieStore = await cookies(); // Add await
  const authCookie = cookieStore.get("authToken");
  const token = authCookie?.value;

  if (!token) return null;

  return verifyToken(token);
}
