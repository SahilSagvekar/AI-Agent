"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  const router = useRouter();

  // Optionally, fetch or get user data from context/auth store/etc.
  const [userData, setUserData] = useState({
    businessName: "Your Business", // Replace with real user data
    email: "user@example.com",
  });

  // Handler for editing profile or training
  const handleEditTraining = () => {
    router.push("/training");
  };

  const handleEditLocation = async(locationId: any) => {
    const res = await fetch(`/api/form?id=${locationId}`);
      if (!res.ok) throw new Error("Failed to fetch location data");
      const data = await res.json();

      if (res.ok) {
        router.push('/edit-training')
      }

    // router.push("/edit-training");
  };

  // Handler for logout
  const handleLogout = () => {
    // Clear auth here (cookies/localStorage) if needed
    router.push("/");
  };

  return (
    <Dashboard
      businessName={userData.businessName}
      // email={userData.email}
      onLogout={handleLogout}
      onEditTraining={handleEditTraining}
      // onEditLocation={handleEditLocation}
    />
  );
}
