"use client";

import { useState, useEffect, Suspense } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { CreditCard, Lock, ArrowLeft, Shield, Loader2 } from "lucide-react";

interface PaymentScreenProps {
  businessName: string;
  onComplete?: () => void;
  onBack: () => void;
}

export const dynamic = "force-dynamic";

// 🔄 Component that uses useSearchParams (wrapped in Suspense)
function PaymentContent({ businessName, onComplete, onBack }: PaymentScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [locations, setLocations] = useState("1");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingIntent, setIsLoadingIntent] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  const basePrice = 175;
  const additionalLocationPrice = 45;
  const locationCount = parseInt(locations) || 1;
  const totalPrice = basePrice + (locationCount - 1) * additionalLocationPrice;
  const amountInCents = Math.round(totalPrice * 100);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/");
    }
  };

  // ✅ Fetch PaymentIntent clientSecret with debounce
  useEffect(() => {
    setClientSecret(null);
    setErrorMessage(null);
    setIsLoadingIntent(true);

    const debounceTimeout = setTimeout(() => {
      async function createPaymentIntent() {
        try {
          const flowType = searchParams.get("flowType");
          const response = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amountt: amountInCents, flowType, locationCount }),
          });

          const data = await response.json();
          if (!data.clientSecret) throw new Error("Failed to get client secret");
          setClientSecret(data.clientSecret);
        } catch (err: any) {
          setErrorMessage(err.message || "Failed to initiate payment");
        } finally {
          setIsLoadingIntent(false);
        }
      }

      createPaymentIntent();
    }, 500); // ⏱ 500ms debounce

    return () => clearTimeout(debounceTimeout);
  }, [locationCount, amountInCents, searchParams]);

  async function handlePay() {
    setErrorMessage(null);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage("Card information not found.");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardholderName },
          },
        }
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed. Try again.");
      } else if (paymentIntent?.status === "succeeded") {
        onComplete?.();
        router.push("/phonenumberassignment");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      setErrorMessage("Unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  const isFormValid = cardholderName.length > 2;

  return (
    <div className="min-h-screen bg-accent/30 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="absolute left-6 top-6"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="space-y-2">
            <h1 className="text-2xl text-foreground font-medium">
              Complete Setup
            </h1>
            <p className="text-muted-foreground">Welcome back, {businessName}</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            {/* Pricing Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="locations" className="text-base">
                  Locations
                </Label>
                <Select value={locations} onValueChange={setLocations}>
                  <SelectTrigger className="w-24 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Base plan</span>
                  <span>${basePrice}/mo</span>
                </div>
                {locationCount > 1 && (
                  <div className="flex justify-between text-sm">
                    <span>
                      +{locationCount - 1} location
                      {locationCount > 2 ? "s" : ""}
                    </span>
                    <span>
                      +${(locationCount - 1) * additionalLocationPrice}/mo
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Monthly total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>14-day free trial • Cancel anytime</span>
              </div>
            </div>

            {/* Payment Form */}
            {isLoadingIntent ? (
              <div className="flex justify-center items-center h-24">
                <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Payment Information</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardholder" className="text-sm font-medium">
                      Cardholder Name
                    </Label>
                    <input
                      id="cardholder"
                      placeholder="Enter full name"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      className="mt-1.5 w-full border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Card Details</Label>
                    <div className="border rounded-md p-3 bg-white">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#1f2937",
                              "::placeholder": { color: "#9ca3af" },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-red-500 text-center">{errorMessage}</p>
                )}

                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground mt-6">
                  <Lock className="h-4 w-4 flex-shrink-0" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>

                <Button
                  onClick={handlePay}
                  className="w-full h-12 mt-6"
                  disabled={isProcessing || !isFormValid || !stripe}
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Start Free Trial"}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
                  Your trial starts immediately. You won't be charged until day 15.
                  <br />
                  Cancel anytime with one click.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ✅ Wrap PaymentContent in Suspense to fix useSearchParams error
export default function PaymentScreenWrapper(props: PaymentScreenProps) {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading payment screen...</div>}>
      <PaymentContent {...props} />
    </Suspense>
  );
}
