"use client";

import { useRouter } from "next/navigation";

export function useRedirect() {
  const router = useRouter();

  function redirectDemo() {
    router.push("/demo");
  }

  function redirectContact() {
    router.push("/contact");
  }

  function redirectPrivacy() {
    router.push("/privacy");
  }

  function redirectTerms() {
    router.push("/terms");
  }

  // Add more redirect functions here as needed
  return { redirectDemo, redirectContact, redirectPrivacy, redirectTerms };
}
