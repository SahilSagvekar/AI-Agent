import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ADMIN_EMAILS } from "@/lib/admin";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // const session = await getServerSession(authOptions);
  // console.log("AdminPage session:", session);

//   if (!session || !session.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
//     redirect("/signin"); // redirect to normal sign-in page
//   }

  return <AdminClient />;
}
