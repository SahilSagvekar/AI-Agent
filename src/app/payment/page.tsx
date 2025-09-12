"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { CreditCard, Lock, ArrowLeft, Shield } from "lucide-react";

interface PaymentScreenProps {
  businessName: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentScreen({
  businessName,
  onComplete,
  onBack,
}: PaymentScreenProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/"); // redirect to landing page
    }
  };
  
  const [locations, setLocations] = useState("1");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const basePrice = 175;
  const additionalLocationPrice = 45;
  const locationCount = parseInt(locations) || 1;
  const totalPrice = basePrice + (locationCount - 1) * additionalLocationPrice;

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onComplete();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setExpiryDate(value);
  };

  const isFormValid = cardNumber && expiryDate && cvv && cardholderName;

  // const handlePay = async () => {
  //   setIsProcessing(true);
  //   try {
  //     const response = await fetch("/api/create-checkout-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // Pass actual needed data, for instance:
  //       body: JSON.stringify({
  //         userId: "user-id-if-available",
  //         businessName,
  //         locationCount,
  //       }),
  //     });
  //     const data = await response.json();
  //     if (data.url) {
  //       window.location.href = data.url; // Redirect user to Stripe hosted checkout page
  //     } else if (data.error) {
  //       alert("Payment error: " + data.error);
  //       setIsProcessing(false);
  //     }
  //   } catch (error: any) {
  //     alert("Failed to start payment: " + error.message);
  //     setIsProcessing(false);
  //   }
  // };

  //testing handlePay
  const handlePay = async () => {
  setIsProcessing(true);
  try {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: basePrice, // amount in paise/cents
        currency: "usd", // or "inr" if your test account supports
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
      }),
    });

    const data = await response.json();
    console.log('payment data' + JSON.stringify(data)
    );


    if (data.success) {
      // alert("Payment successful!"); phonenumberassignment
      router.push("/phonenumberassignment");
      // router.push("/dashboard");
      // onComplete();
    } else {
      alert("Payment failed: " + data.message);
    }
  } catch (error: any) {
    alert("Payment error: " + error.message);
  } finally {
    setIsProcessing(false);
  }
};

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
            <p className="text-muted-foreground">
              Welcome back, {businessName}
            </p>
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
                  <Input
                    id="cardholder"
                    placeholder="Enter full name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="mt-1.5 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm font-medium">
                      Expiry
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      className="mt-1.5 font-mono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value.replace(/\D/g, "").substring(0, 4)
                        )
                      }
                      maxLength={4}
                      className="mt-1.5 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground mt-6">
                <Lock className="h-4 w-4 flex-shrink-0" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>

              <Button
                onClick={handlePay}
                className="w-full h-12 mt-6"
                disabled={isProcessing || !isFormValid}
                size="lg"
              >
                {isProcessing ? "Processing..." : "Start Free Trial"}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
                Your trial starts immediately. You won't be charged until day
                15.
                <br />
                Cancel anytime with one click.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
