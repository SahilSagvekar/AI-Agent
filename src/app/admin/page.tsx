import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth"; // ✅ use your function here
import { ADMIN_EMAILS } from "@/lib/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  // 1. Get the user from the JWT cookie
  const user = await getUser();

  // 2. If no user → not logged in → redirect
  if (!user) {
    redirect("/login"); // change to your actual login route
  }

  // 3. If user exists but email not in admin list → redirect
  const userEmail = user.email?.toLowerCase();
  if (!userEmail || !ADMIN_EMAILS.map(e => e.toLowerCase()).includes(userEmail)) {
    redirect("/403"); // or "/" if you prefer
  }

  // 4. ✅ Authorized → show admin dashboard
  return <AdminDashboard />;
}





// // import AdminDashboard from "@/components/admin/AdminDashboard";

// // const Index = () => {
// //   return <AdminDashboard />;
// // };

// // export default Index;


// // app/admin/page.tsx
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { ADMIN_EMAILS } from "@/lib/admin";
// import AdminDashboard from "@/components/admin/AdminDashboard";

// export default async function AdminPage() {
//   const session = await getServerSession();

//   if (session) {
//     if (!session.user?.email || !ADMIN_EMAILS.includes(session.user?.email)) {
//       redirect("/");
//     }
//   }

//   return <AdminDashboard />;
// }
