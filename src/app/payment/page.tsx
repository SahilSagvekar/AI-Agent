"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [locations, setLocations] = useState(1);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const basePlan = 175;

  // Validation for demonstration
  const isFormComplete =
    cardName && cardNumber && cardExp && cardCVV && locations;

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center pt-24">
      <h1 className="text-2xl font-semibold mb-1">Complete Setup</h1>
      <p className="text-gray-500 mb-8">Welcome back, Your Laundromat</p>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mx-auto p-8 flex flex-col gap-6">
        {/* Header/Locations */}
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Locations</label>
          <select
            className="border rounded-lg px-2 py-1 bg-gray-50"
            value={locations}
            onChange={e => setLocations(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            {/* Add more if needed */}
          </select>
        </div>
        {/* Price Breakdown */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Base plan</span>
            <span className="font-medium text-base">${basePlan}/mo</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 font-medium">
            <span>Monthly total</span>
            <span>${basePlan}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
          <span>🔒</span>
          <span>14-day free trial · Cancel anytime</span>
        </div>

        {/* Payment Info */}
        <h2 className="font-medium text-gray-900 text-sm mt-2 mb-2">
          Payment Information
        </h2>
        <div className="flex flex-col gap-4">
          <input
            className="border rounded-lg px-3 py-2"
            type="text"
            placeholder="Enter full name"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
          <input
            className="border rounded-lg px-3 py-2"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            maxLength={19}
          />
          <div className="flex gap-4">
            <input
              className="border rounded-lg px-3 py-2 w-1/2"
              type="text"
              placeholder="MM/YY"
              value={cardExp}
              onChange={e => setCardExp(e.target.value)}
              maxLength={5}
            />
            <input
              className="border rounded-lg px-3 py-2 w-1/2"
              type="text"
              placeholder="123"
              value={cardCVV}
              onChange={e => setCardCVV(e.target.value)}
              maxLength={4}
            />
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>🔒</span>
          <span className="ml-1">Secured by 256-bit SSL encryption</span>
        </div>

        {/* CTA Button */}
        <button
          className="w-full mt-4 py-3 rounded-xl bg-gray-300 text-gray-600 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isFormComplete}
        >
          Start Free Trial
        </button>
      </div>
    </main>
  );
}
