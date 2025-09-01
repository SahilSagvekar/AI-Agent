"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneAssignment } from "@/components/PhoneAssignment";

export default function PhoneNumberAssignmentPage() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("Your Business"); // Replace with real data

  const handleComplete = () => {
    // For example, navigate to dashboard after completing phone assignment
    router.push("/dashboard");
  };

  return (
    <PhoneAssignment 
      businessName={businessName} 
      onComplete={handleComplete} 
    />
  );
}
