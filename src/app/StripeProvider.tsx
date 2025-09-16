"use client";

import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51S2wJ5LftZnSCITqn0pN2AZpIuDosea70tdWyyYuIlQHuMWxzEYOFkPtb4y2PWwkYquTQcbkR1gfwsq8pwc2CBQ000ibxy88Df");

export default function StripeProvider({ children }: { children: ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
