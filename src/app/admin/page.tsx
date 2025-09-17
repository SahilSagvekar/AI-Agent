// import AdminDashboard from "@/components/admin/AdminDashboard";

// const Index = () => {
//   return <AdminDashboard />;
// };

// export default Index;


// app/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ADMIN_EMAILS } from "@/lib/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession();

  if (session) {
    if (!session.user?.email || !ADMIN_EMAILS.includes(session.user?.email)) {
      redirect("/");
    }
  }

  return <AdminDashboard />;
}
