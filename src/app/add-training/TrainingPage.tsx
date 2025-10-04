"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AudioLoader } from "@/components/OrbitingLoader";
import { AITrainingForm } from "@/components/AITrainingForm";

type OperatingHoursObj = {
  mondayOpen?: string,
  mondayClose?: string,
  tuesdayOpen?: string,
  tuesdayClose?: string,
  wednesdayOpen?: string,
  wednesdayClose?: string,
  thursdayOpen?: string,
  thursdayClose?: string,
  fridayOpen?: string,
  fridayClose?: string,
  saturdayOpen?: string,
  saturdayClose?: string,
  sundayOpen?: string,
  sundayClose?: string,
};

function flattenTrainingData(apiData: any, locationId: string | null) {
  if (!apiData) return null;

  // Map operating hours from flat API fields to FormData.hours
  function getHours(op: OperatingHoursObj) {
  return {
    Monday: {
      open: op.mondayOpen ?? "",
      close: op.mondayClose ?? "",
    },
    Tuesday: {
      open: op.tuesdayOpen ?? "",
      close: op.tuesdayClose ?? "",
    },
    Wednesday: {
      open: op.wednesdayOpen ?? "",
      close: op.wednesdayClose ?? "",
    },
    Thursday: {
      open: op.thursdayOpen ?? "",
      close: op.thursdayClose ?? "",
    },
    Friday: {
      open: op.fridayOpen ?? "",
      close: op.fridayClose ?? "",
    },
    Saturday: {
      open: op.saturdayOpen ?? "",
      close: op.saturdayClose ?? "",
    },
    Sunday: {
      open: op.sundayOpen ?? "",
      close: op.sundayClose ?? "",
    },
  };
}

  // Flatten washers/dryers and their payment arrays
  interface Machine {
  size?: string;
  price?: string;
  quantity?: number;
  system?: string;
  payments?: { set?: { system?: string; notes?: string }[] } | null;
}

interface HolidayHour {
  name?: string;
  open?: string;
  close?: string;
}

const holidayHours = Array.isArray(apiData.holidayHours)
  ? apiData.holidayHours.map((hh: HolidayHour) => ({
      name: hh.name ?? "",
      open: hh.open ?? "",
      close: hh.close ?? "",
    }))
  : [];

function mapMachines(arr: Machine[] | undefined | null) {
  return Array.isArray(arr)
    ? arr.map(w => ({
        size: w.size ?? "",
        price: w.price ?? "",
        quantity: w.quantity ?? 0,
        system: w.system ?? "",
        payments: Array.isArray(w.payments?.set)
          ? w.payments.set.map(p => ({
              system: p.system ?? "",
              notes: p.notes ?? ""
            }))
          : []
      }))
    : [];
}


  return {
    id: locationId ?? "",
    businessName: apiData.businessName ?? "",
    locationName: apiData.locationName ?? "",
    address: apiData.address ?? "",
    phone: apiData.phone ?? "",
    zipCode: apiData.zipCode ?? "",
    email: apiData.email ?? "",
    website: apiData.website ?? "",
    googleMapsUrl: apiData.googleMapsUrl ?? "",
    notableLandmarks: apiData.notableLandmarks ?? "",
    attendingHours: apiData.attendingHours ?? "",
    nonAttendingHours: apiData.nonAttendingHours ?? "",
    timeZone: apiData.timeZone ?? apiData.operatingHours?.timeZone ?? "",
    attendantType: apiData.attendantType ?? "",
    attendingOpen: apiData.attendingOpen ?? "",
    is24Hours: !!apiData.is24Hours,
    attendingClose: apiData.attendingClose ?? "",
    washers: mapMachines(apiData.washers),
    dryers: mapMachines(apiData.dryers),
    hours: apiData.operatingHours ? getHours(apiData.operatingHours) : undefined,
    openOnHolidays: apiData.operatingHours?.openOnHolidays ?? false,
    holidayNote: apiData.operatingHours?.holidayNote ?? "",
    lastWashTime: apiData.operatingHours?.lastWashTime ?? "",
    holidayHours: holidayHours,
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
    petPolicies: apiData.policies?.petPolicies ?? "",
    timeLimits: apiData.policies?.timeLimits ?? "",
    unattendedPolicy: apiData.policies?.unattendedPolicy ?? "",
    additionalPolicies: apiData.policies?.additionalPolicies ?? "",
    escalateForwardCall: !!apiData.escalateForwardCall,
    escalationNumber: apiData.escalationNumber ?? "",
    escalateSendMessage: !!apiData.escalateSendMessage,
    escalateSendEmail: !!apiData.escalateSendEmail,
    escalationEmail: apiData.escalationEmail ?? "",
    hiringResponse: apiData.hiringResponse ?? "",
  };
}

export default function TrainingPageClient() {
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const locationId = searchParams.get("locationId");
  const [trainingData, setTrainingData] = useState(null);

  const router = useRouter();

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
      <AITrainingForm initialData={initialData} onComplete={handleTrainingComplete} />
    </div>
  );
}
