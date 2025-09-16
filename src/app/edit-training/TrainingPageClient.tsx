"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AudioLoader } from "@/components/OrbitingLoader";
import { EditAITrainingForm } from "@/components/EditAITrainingForm";

function flattenTrainingData(apiData: any, locationId: string | null) {
  if (!apiData) return null;

//   const id = locationId;

  return {
    id: locationId ?? "", // 👈 attach the ID here
    businessName: apiData.locationName ?? "",
    address: apiData.address ?? "",
    phone: apiData.phone ?? "",
    zipCode: apiData.zipCode ?? "",
    email: apiData.email ?? "",
    website: apiData.website ?? "",
    googleMapsUrl: apiData.googleMapsUrl ?? "",

    weekdayHours: apiData.operatingHours?.weekdayHours ?? "",
    weekendHours: apiData.operatingHours?.weekendHours ?? "",
    openOnHolidays: apiData.operatingHours?.openOnHolidays ?? false,
    holidayNote: apiData.operatingHours?.holidayNote ?? "",
    lastWashTime: apiData.operatingHours?.lastWashTime ?? "",

    services: Array.isArray(apiData.services?.services) ? apiData.services.services : [],

    washerPrices: apiData.pricing?.washerPrices ?? "",
    dryerPrices: apiData.pricing?.dryerPrices ?? "",
    washFoldRate: apiData.pricing?.washFoldRate ?? "",
    dryCleaningPrices: apiData.pricing?.dryCleaningPrices ?? "",
    pickupDeliveryPricing: apiData.pricing?.pickupDeliveryPricing ?? "",
    minimumCharges: apiData.pricing?.minimumCharges ?? "",
    paymentMethods: Array.isArray(apiData.pricing?.paymentMethods) ? apiData.pricing.paymentMethods : [],

    totalWashers: apiData.machineInfo?.totalWashers ?? "",
    totalDryers: apiData.machineInfo?.totalDryers ?? "",
    machineOperationType: apiData.machineInfo?.machineOperationType ?? "",
    machinesModern: !!apiData.machineInfo?.machinesModern,
    largeMachines: !!apiData.machineInfo?.largeMachines,

    amenities: Array.isArray(apiData.amenities?.amenities) ? apiData.amenities.amenities : [],

    commonQuestions: Array.isArray(apiData.questions?.commonQuestions) ? apiData.questions.commonQuestions : [],
    customQuestions: Array.isArray(apiData.questions?.customQuestions) ? apiData.questions.customQuestions : [{ question: "", answer: "" }],

    callHandlingStyle: apiData.callHandling?.callHandlingStyle ?? "",
    forwardingEnabled: !!apiData.callHandling?.forwardingEnabled,
    forwardingNumber: apiData.callHandling?.forwardingNumber ?? "",
    forwardingHours: apiData.callHandling?.forwardingHours ?? "",

    languages: Array.isArray(apiData.languageSettings?.languages) ? apiData.languageSettings.languages : ["English"],
    autoDetectLanguage: !!apiData.languageSettings?.autoDetectLanguage,

    businessTone: apiData.businessTone?.businessTone ?? "",
    customPhrases: apiData.businessTone?.customPhrases ?? "",
    businessIntro: apiData.businessTone?.businessIntro ?? "",

    lostFoundPolicy: apiData.policies?.lostFoundPolicy ?? "",
    refundPolicy: apiData.policies?.refundPolicy ?? "",
    covidPolicies: apiData.policies?.covidPolicies ?? "",
    timeLimits: apiData.policies?.timeLimits ?? "",
    unattendedPolicy: apiData.policies?.unattendedPolicy ?? "",
    additionalPolicies: apiData.policies?.additionalPolicies ?? "",
  };
}

export default function TrainingPageClient() {
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const locationId = searchParams.get("locationId");

  const router = useRouter();
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    async function fetchTrainingData() {
      if (!locationId) {
        router.push("/dashboard");
        return;
      }
      const res = await fetch(`/api/form?id=${locationId}`);
      if (res.ok) {
        const apiData = await res.json();
        const flatData = flattenTrainingData(apiData, locationId);
        setInitialData(flatData);
      }
      setLoading(false);
    }
    fetchTrainingData();
  }, [locationId, router]);

  function handleTrainingComplete(data: any) {
    setTrainingData(data);
    // router.push("/phone-assignment");
  }

  if (loading) return <AudioLoader text="Loading training data..." />;

  return (
    <div className="min-h-screen bg-background p-6">
      <EditAITrainingForm initialData={initialData} onComplete={handleTrainingComplete} />
    </div>
  );
}
