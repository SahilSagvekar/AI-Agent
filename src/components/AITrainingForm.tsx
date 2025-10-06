"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { X } from "lucide-react";

import {
  Clock,
  MapPin,
  Phone,
  DollarSign,
  Wrench,
  MessageCircle,
  Save,
  Settings,
  Languages,
  FileText,
} from "lucide-react";

interface PaymentSystem {
  system: string;
  notes: string;
}

interface Washer {
  size: string;
  price: string; // keep as string for form input
  quantity: number;
  system: string;
  payments: PaymentSystem[]; // ✅ changed from string[] to object[]
}

interface Dryers {
  size: string;
  price: string; // if you're using input fields, keep this string until submission
  quantity: number;
  system: string;
  payments: PaymentSystem[];
}

interface FormData {
  // Business Information
  businessName: string;
  locationName: string;
  address: string;
  phone: string;
  zipCode: string;
  email: string;
  website: string;
  googleMapsUrl: string;
  notableLandmarks: string;
  attendingHours: string;
  nonAttendingHours: string;
  timeZone: string;
  washers: Washer[];
  dryers: Dryers[];
  attendantType: string;
  attendingOpen: string;
  is24Hours: boolean;
  attendingClose: string;

  // Operating Hours
  // weekdayHours: string;
  // weekendHours: string;
  openOnHolidays: boolean;
  holidayHours: Array<{
    name: string;
    open: string;
    close: string;
    is247?: boolean;
  }>;
  holidayNote: string;
  lastWashTime: string;
  hours?: {
    [day: string]: { open: string; close: string; is247?: boolean };
  };

  // Services Offered
  services: string[];

  // Pricing Info
  washerPrices: string;
  selectedWasherSize?: string;
  dryerPrices: string;
  washFoldRate: string;
  dryCleaningPrices: string;
  pickupDeliveryPricing: string;
  minimumCharges: string;
  paymentMethods: string[];

  // Machine Info
  totalWashers: string;
  totalDryers: string;
  machineOperationType: string;
  machinesModern: boolean;
  largeMachines: boolean;

  // Amenities
  amenities: string[];

  // Common Questions
  commonQuestions: string[];
  customQuestions: Array<{ question: string; answer: string }>;

  // Call Handling Preferences
  callHandlingStyle: string;
  forwardingEnabled: boolean;
  forwardingNumber: string;
  forwardingHours: string;

  // Language Support
  languages: string[];
  autoDetectLanguage: boolean;

  // Business Tone & Branding
  businessTone: string;
  customPhrases: string;
  businessIntro: string;

  // Special Policies
  lostFoundPolicy: string;
  refundPolicy: string;
  petPolicies: string;
  timeLimits: string;
  unattendedPolicy: string;
  additionalPolicies: string;

  // settings
  escalateForwardCall: boolean;
  escalationNumber: string;
  escalateSendMessage: boolean;
  escalateSendEmail: boolean;
  escalationEmail: string;
  hiringResponse: string;
}

const TAB_ORDER = [
  "business",
  "hours",
  "services",
  "equipment",
  "questions",
  "settings",
  "policies",
];

export function AITrainingForm({
  initialData,
  onComplete,
}: {
  initialData?: Partial<FormData>;
  onComplete: (data: FormData) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("business");
  const [isSubmitting, setIsSubmitting] = useState(false);

    const DEFAULT_HOURS = {
    Monday: { open: "08:00", close: "20:00", is247: false },
    Tuesday: { open: "08:00", close: "20:00", is247: false },
    Wednesday: { open: "08:00", close: "20:00", is247: false },
    Thursday: { open: "08:00", close: "20:00", is247: false },
    Friday: { open: "08:00", close: "20:00", is247: false },
    Saturday: { open: "08:00", close: "20:00", is247: false },
    Sunday: { open: "08:00", close: "20:00", is247: false },
  };

  const DEFAULT_HOLIDAYS = [
  { name: "Christmas", open: "Closed", close: "Closed" },
  { name: "Good Friday", open: "8:00 AM", close: "5:00 PM" },
  { name: "Easter Sunday", open: "Closed", close: "Closed" },
];


  const [formData, setFormData] = useState<FormData>({
    businessName: initialData?.businessName ?? "",
    address: initialData?.address ?? "",
    phone: initialData?.phone ?? "",
    zipCode: initialData?.zipCode ?? "",
    email: initialData?.email ?? "",
    website: initialData?.website ?? "",
    googleMapsUrl: initialData?.googleMapsUrl ?? "",
    notableLandmarks: initialData?.notableLandmarks ?? "",
    attendingHours: initialData?.attendingHours ?? "",
    nonAttendingHours: initialData?.nonAttendingHours ?? "",
    locationName: initialData?.locationName ?? "",
    timeZone: initialData?.timeZone ?? "",
    attendantType: initialData?.attendantType ?? "",
     attendingOpen: initialData?.attendingOpen ?? "",
  attendingClose: initialData?.attendingClose ?? "",
  is24Hours: initialData?.is24Hours ?? false,
  // attendantType: initialData?.attendantType ?? "attendant",
    washers: initialData?.washers ?? [],
    // washers: [
    //   {
    //     size: "",
    //     price: "",
    //     quantity: 0,
    //     system: "",
    //     payments: [{ system: "", notes: "" }], // <-- array of objects
    //   },
    // ],
    // dryers: initialData?.dryers ?? [],
    dryers: [
      {
        size: "",
        price: "",
        quantity: 0,
        system: "",
        payments: [{ system: "", notes: "" }], // <-- array of objects
      },
    ],
    // holidayHours: initialData?.holidayHours ?? [],
    holidayHours: DEFAULT_HOLIDAYS,
    
    // weekdayHours: initialData?.weekdayHours ?? "6:00 AM - 10:00 PM",
    // weekendHours: initialData?.weekendHours ?? "7:00 AM - 9:00 PM",
    openOnHolidays: initialData?.openOnHolidays ?? false,
    holidayNote: initialData?.holidayNote ?? "",
    lastWashTime: initialData?.lastWashTime ?? "1 hour before closing",

    // hours: {
    //   Monday: { open: "08:00", close: "20:00" },
    //   Tuesday: { open: "08:00", close: "20:00" },
    //   Wednesday: { open: "08:00", close: "20:00" },
    //   Thursday: { open: "08:00", close: "20:00" },
    //   Friday: { open: "08:00", close: "20:00" },
    //   Saturday: { open: "09:00", close: "20:00" },
    //   Sunday: { open: "09:00", close: "20:00" },
    // },

    hours: DEFAULT_HOURS,
    services: Array.isArray(initialData?.services) ? initialData.services : [],

    washerPrices: initialData?.washerPrices ?? "",
    selectedWasherSize: initialData?.selectedWasherSize ?? "",
    dryerPrices: initialData?.dryerPrices ?? "",
    washFoldRate: initialData?.washFoldRate ?? "",
    dryCleaningPrices: initialData?.dryCleaningPrices ?? "",
    pickupDeliveryPricing: initialData?.pickupDeliveryPricing ?? "",
    minimumCharges: initialData?.minimumCharges ?? "",
    paymentMethods: Array.isArray(initialData?.paymentMethods)
      ? initialData.paymentMethods
      : [],

    totalWashers: initialData?.totalWashers ?? "",
    totalDryers: initialData?.totalDryers ?? "",
    machineOperationType: initialData?.machineOperationType ?? "",
    machinesModern: initialData?.machinesModern ?? false,
    largeMachines: initialData?.largeMachines ?? false,

    amenities: Array.isArray(initialData?.amenities)
      ? initialData.amenities
      : [],

    commonQuestions: Array.isArray(initialData?.commonQuestions)
      ? initialData.commonQuestions
      : [],
    customQuestions: Array.isArray(initialData?.customQuestions)
      ? initialData.customQuestions
      : [{ question: "", answer: "" }],

    callHandlingStyle: initialData?.callHandlingStyle ?? "",
    forwardingEnabled: initialData?.forwardingEnabled ?? false,
    forwardingNumber: initialData?.forwardingNumber ?? "",
    forwardingHours: initialData?.forwardingHours ?? "",

    languages: Array.isArray(initialData?.languages)
      ? initialData.languages
      : ["English"],
    autoDetectLanguage: initialData?.autoDetectLanguage ?? false,

    businessTone: initialData?.businessTone ?? "",
    customPhrases: initialData?.customPhrases ?? "",
    businessIntro: initialData?.businessIntro ?? "",

    lostFoundPolicy: initialData?.lostFoundPolicy ?? "",
    refundPolicy: initialData?.refundPolicy ?? "",
    petPolicies: initialData?.petPolicies ?? "",
    timeLimits: initialData?.timeLimits ?? "",
    unattendedPolicy: initialData?.unattendedPolicy ?? "",
    additionalPolicies: initialData?.additionalPolicies ?? "",

    hiringResponse: initialData?.hiringResponse ?? "",
    escalationEmail: initialData?.escalationEmail ?? "",
    escalateSendEmail: initialData?.escalateSendEmail ?? false,
    escalateSendMessage: initialData?.escalateSendMessage ?? false,
    escalateForwardCall: initialData?.escalateForwardCall ?? false,
    escalationNumber: initialData?.escalationNumber ?? "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        attendantType: initialData.attendantType || "",
        attendingOpen: initialData.attendingOpen || "",
      attendingClose: initialData.attendingClose || "",
      is24Hours: initialData.is24Hours || false,
        holidayHours: initialData.holidayHours || [],
      }));
    }
  }, [initialData]);

//   useEffect(() => {
//   if (!formData.hours) {
//     setFormData((prev) => ({ ...prev, hours: DEFAULT_HOURS }));
//   } else {
//     // Fill in missing days if any
//     const updatedHours = { ...DEFAULT_HOURS, ...formData.hours };
//     setFormData((prev) => ({ ...prev, hours: updatedHours }));
//   }
// }, [formData.hours]);


  const calculateProgress = () => {
    const requiredFields = [
      formData.businessName,
      formData.address,
      formData.phone,
      // formData.weekdayHours,
      formData.washerPrices,
      formData.dryerPrices,
      formData.totalWashers,
      formData.callHandlingStyle,
      formData.businessTone,
    ];

    const completed = requiredFields.filter(
      (field) => typeof field === "string" && field.trim() !== ""
    ).length;

    const serviceCheck =
      Array.isArray(formData.services) && formData.services.length > 0 ? 1 : 0;
    const paymentCheck =
      Array.isArray(formData.paymentMethods) &&
      formData.paymentMethods.length > 0
        ? 1
        : 0;

    return Math.round(
      ((completed + serviceCheck + paymentCheck) /
        (requiredFields.length + 2)) *
        100
    );
  };

  const toggleArrayItem = (
    array: string[],
    item: string,
    setArray: (items: string[]) => void
  ) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const addCustomQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      customQuestions: [...prev.customQuestions, { question: "", answer: "" }],
    }));
  };

  const removeCustomQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((_, i) => i !== index),
    }));
  };

  const updateCustomQuestion = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      customQuestions: prev.customQuestions.map((qa, i) =>
        i === index ? { ...qa, [field]: value } : qa
      ),
    }));
  };

  const progress = calculateProgress();

  const serviceOptions = [
    "Self-Service Washers & Dryers",
    "Wash & Fold",
    "Dry Cleaning",
    "Pickup & Delivery",
    "Commercial Laundry",
    "Detergent/Vending Machines",
    "Soap/Detergent Vending Machines",
    "Utility Sink",
    "UHaul / Penske Rentals",
    "Dog Washing Station",
    "Shoe Cleaners",
    "Soda Vending Machine",
    "Snack Vending Machine",
    "Coffee Shops",
    "Alcohol Sales",
    "Slot Machines",
    "Skill Games",
    "Arcade Machines",
    "Massage Chairs",
    "ATM",
    "Electric Charging Station",
    "Loyalty Program / Membership",
  ];

  const paymentOptions = [
    "Cash",
    "Credit/Debit",
    "App-based (Apple Pay, Google Pay, etc.)",
    "Loyalty card/token system",
  ];

  const amenityOptions = [
    "Free Wi-Fi",
    "Seating",
    "Folding Tables",
    "Restroom",
    "Vending Machines (Snacks)",
    "Vending Machines (Drinks)",
    "Detergent Vending",
    "TV",
    "Music",
    "Kids' Play Area",
    "ATM",
    "Reading Area",
  ];

  const commonQuestionOptions = [
    "Are you open right now?",
    "How much is a wash?",
    "Do you do wash & fold?",
    "Do you take cards?",
    "How long does a wash take?",
    "Is anyone there I can talk to?",
    "Do you do pickup & delivery?",
    "Do you clean comforters?",
    "What time is last wash?",
    "Can I leave my clothes unattended?",
    "Do you have change machines?",
    "Is it busy right now?",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
  ];

  const TIME_OPTIONS = [
    { value: "00:00", label: "12:00 AM" },
    { value: "01:00", label: "1:00 AM" },
    { value: "02:00", label: "2:00 AM" },
    { value: "03:00", label: "3:00 AM" },
    { value: "04:00", label: "4:00 AM" },
    { value: "05:00", label: "5:00 AM" },
    { value: "06:00", label: "6:00 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "23:00", label: "11:00 PM" },
  ];

 const washerOptions = [
    { manufacturer: "Speed Queen", capacity: 20, loads: "2 loads" },
    { manufacturer: "Speed Queen", capacity: 30, loads: "3 loads" },
    { manufacturer: "Speed Queen", capacity: 40, loads: "4 loads" },
    { manufacturer: "Speed Queen", capacity: 60, loads: "6 loads" },
    { manufacturer: "Speed Queen", capacity: 80, loads: "8 loads" },
    { manufacturer: "Speed Queen", capacity: 100, loads: "10 loads" },

    { manufacturer: "Huebsch", capacity: 20, loads: "2 loads" },
    { manufacturer: "Huebsch", capacity: 30, loads: "3 loads" },
    { manufacturer: "Huebsch", capacity: 40, loads: "4 loads" },
    { manufacturer: "Huebsch", capacity: 60, loads: "6 loads" },
    { manufacturer: "Huebsch", capacity: 80, loads: "8 loads" },
    { manufacturer: "Huebsch", capacity: 100, loads: "10 loads" },

    { manufacturer: "Dexter Laundry", capacity: 20, loads: "2 loads" },
    { manufacturer: "Dexter Laundry", capacity: 30, loads: "3 loads" },
    { manufacturer: "Dexter Laundry", capacity: 40, loads: "4 loads" },
    { manufacturer: "Dexter Laundry", capacity: 60, loads: "6 loads" },
    { manufacturer: "Dexter Laundry", capacity: 80, loads: "8 loads" },
    { manufacturer: "Dexter Laundry", capacity: 90, loads: "9 loads" },
    { manufacturer: "Dexter Laundry", capacity: 100, loads: "10 loads" },
    { manufacturer: "Dexter Laundry", capacity: 120, loads: "12 loads" },

    { manufacturer: "Maytag", capacity: 15, loads: "2 loads" },
    { manufacturer: "Maytag", capacity: 20, loads: "2 loads" },
    { manufacturer: "Maytag", capacity: 30, loads: "3 loads" },
    { manufacturer: "Maytag", capacity: 40, loads: "4 loads" },
    { manufacturer: "Maytag", capacity: 55, loads: "6 loads" },
    { manufacturer: "Maytag", capacity: 65, loads: "6 loads" },

    { manufacturer: "Whirlpool", capacity: 15, loads: "2 loads" },
    { manufacturer: "Whirlpool", capacity: 20, loads: "2 loads" },
    { manufacturer: "Whirlpool", capacity: 30, loads: "3 loads" },
    { manufacturer: "Whirlpool", capacity: 40, loads: "4 loads" },
    { manufacturer: "Whirlpool", capacity: 55, loads: "6 loads" },
    { manufacturer: "Whirlpool", capacity: 65, loads: "6 loads" },

    { manufacturer: "Electrolux", capacity: 18, loads: "2 loads" },
    { manufacturer: "Electrolux", capacity: 20, loads: "2 loads" },
    { manufacturer: "Electrolux", capacity: 30, loads: "3 loads" },
    { manufacturer: "Electrolux", capacity: 45, loads: "4 loads" },
    { manufacturer: "Electrolux", capacity: 60, loads: "6 loads" },
    { manufacturer: "Electrolux", capacity: 80, loads: "8 loads" },
    { manufacturer: "Electrolux", capacity: 135, loads: "14 loads" },

    { manufacturer: "Wascomat", capacity: 18, loads: "2 loads" },
    { manufacturer: "Wascomat", capacity: 20, loads: "2 loads" },
    { manufacturer: "Wascomat", capacity: 30, loads: "3 loads" },
    { manufacturer: "Wascomat", capacity: 45, loads: "4 loads" },
    { manufacturer: "Wascomat", capacity: 60, loads: "6 loads" },
    { manufacturer: "Wascomat", capacity: 80, loads: "8 loads" },
    { manufacturer: "Wascomat", capacity: 135, loads: "14 loads" },

    { manufacturer: "Continental Girbau", capacity: 20, loads: "2 loads" },
    { manufacturer: "Continental Girbau", capacity: 30, loads: "3 loads" },
    { manufacturer: "Continental Girbau", capacity: 40, loads: "4 loads" },
    { manufacturer: "Continental Girbau", capacity: 55, loads: "6 loads" },
    { manufacturer: "Continental Girbau", capacity: 70, loads: "7 loads" },
    { manufacturer: "Continental Girbau", capacity: 90, loads: "9 loads" },
    { manufacturer: "Continental Girbau", capacity: 130, loads: "13 loads" },
    { manufacturer: "Continental Girbau", capacity: 255, loads: "26 loads" },
    { manufacturer: "Unimac", capacity: 20, loads: "2 loads" },
    { manufacturer: "Unimac", capacity: 30, loads: "3 loads" },
    { manufacturer: "Unimac", capacity: 40, loads: "4 loads" },
    { manufacturer: "Unimac", capacity: 60, loads: "6 loads" },
    { manufacturer: "Unimac", capacity: 80, loads: "8 loads" },
    { manufacturer: "Unimac", capacity: 100, loads: "10 loads" },
    { manufacturer: "Unimac", capacity: 200, loads: "20 loads" },
    { manufacturer: "Unimac", capacity: 400, loads: "40 loads" },
    { manufacturer: "Milnor", capacity: 25, loads: "2 loads" },
    { manufacturer: "Milnor", capacity: 50, loads: "5 loads" },
    { manufacturer: "Milnor", capacity: 100, loads: "10 loads" },
    { manufacturer: "Milnor", capacity: 200, loads: "20 loads" },
    { manufacturer: "Milnor", capacity: 400, loads: "40 loads" },
    { manufacturer: "Milnor", capacity: 700, loads: "70 loads" },
    { manufacturer: "B&C Technologies", capacity: 25, loads: "2 loads" },
    { manufacturer: "B&C Technologies", capacity: 40, loads: "4 loads" },
    { manufacturer: "B&C Technologies", capacity: 60, loads: "6 loads" },
    { manufacturer: "B&C Technologies", capacity: 80, loads: "8 loads" },
    { manufacturer: "B&C Technologies", capacity: 100, loads: "10 loads" },
    { manufacturer: "B&C Technologies", capacity: 125, loads: "12 loads" },
    { manufacturer: "B&C Technologies", capacity: 200, loads: "20 loads" },
    { manufacturer: "B&C Technologies", capacity: 475, loads: "48 loads" },

    { manufacturer: "IPSO", capacity: 20, loads: "2 loads" },
    { manufacturer: "IPSO", capacity: 30, loads: "3 loads" },
    { manufacturer: "IPSO", capacity: 40, loads: "4 loads" },
    { manufacturer: "IPSO", capacity: 55, loads: "6 loads" },
    { manufacturer: "IPSO", capacity: 80, loads: "8 loads" },
    { manufacturer: "IPSO", capacity: 100, loads: "10 loads" },
    { manufacturer: "IPSO", capacity: 135, loads: "14 loads" },

    { manufacturer: "Primus", capacity: 20, loads: "2 loads" },
    { manufacturer: "Primus", capacity: 30, loads: "3 loads" },
    { manufacturer: "Primus", capacity: 40, loads: "4 loads" },
    { manufacturer: "Primus", capacity: 55, loads: "6 loads" },
    { manufacturer: "Primus", capacity: 80, loads: "8 loads" },
    { manufacturer: "Primus", capacity: 100, loads: "10 loads" },
    { manufacturer: "Primus", capacity: 135, loads: "14 loads" },

    { manufacturer: "Fagor Industrial", capacity: 25, loads: "2 loads" },
    { manufacturer: "Fagor Industrial", capacity: 40, loads: "4 loads" },
    { manufacturer: "Fagor Industrial", capacity: 60, loads: "6 loads" },
    { manufacturer: "Fagor Industrial", capacity: 80, loads: "8 loads" },
    { manufacturer: "Fagor Industrial", capacity: 135, loads: "14 loads" },
    { manufacturer: "Fagor Industrial", capacity: 200, loads: "20 loads" },
    { manufacturer: "Domus", capacity: 22, loads: "2 loads" },
    { manufacturer: "Domus", capacity: 30, loads: "3 loads" },
    { manufacturer: "Domus", capacity: 40, loads: "4 loads" },
    { manufacturer: "Domus", capacity: 60, loads: "6 loads" },
    { manufacturer: "Domus", capacity: 80, loads: "8 loads" },
    { manufacturer: "Domus", capacity: 135, loads: "14 loads" },
    { manufacturer: "Stahl", capacity: 20, loads: "2 loads" },
    { manufacturer: "Stahl", capacity: 40, loads: "4 loads" },
    { manufacturer: "Stahl", capacity: 60, loads: "6 loads" },
    { manufacturer: "Stahl", capacity: 100, loads: "10 loads" },
    { manufacturer: "Stahl", capacity: 200, loads: "20 loads" },
    { manufacturer: "Lavatec", capacity: 30, loads: "3 loads" },
    { manufacturer: "Lavatec", capacity: 60, loads: "6 loads" },
    { manufacturer: "Lavatec", capacity: 110, loads: "11 loads" },
    { manufacturer: "Lavatec", capacity: 200, loads: "20 loads" },
    { manufacturer: "Lavatec", capacity: 400, loads: "40 loads" },
    { manufacturer: "Tolkar", capacity: 20, loads: "2 loads" },
    { manufacturer: "Tolkar", capacity: 40, loads: "4 loads" },
    { manufacturer: "Tolkar", capacity: 60, loads: "6 loads" },
    { manufacturer: "Tolkar", capacity: 110, loads: "11 loads" },
    { manufacturer: "Tolkar", capacity: 200, loads: "20 loads" },
  ];

  const dryerOptions = [
    { manufacturer: "Speed Queen", capacity: 20, loads: "2 loads" },
    { manufacturer: "Speed Queen", capacity: 30, loads: "3 loads" },
    { manufacturer: "Speed Queen", capacity: 40, loads: "4 loads" },
    { manufacturer: "Speed Queen", capacity: 60, loads: "6 loads" },
    { manufacturer: "Speed Queen", capacity: 80, loads: "8 loads" },
    { manufacturer: "Speed Queen", capacity: 100, loads: "10 loads" },

    { manufacturer: "Huebsch", capacity: 20, loads: "2 loads" },
    { manufacturer: "Huebsch", capacity: 30, loads: "3 loads" },
    { manufacturer: "Huebsch", capacity: 40, loads: "4 loads" },
    { manufacturer: "Huebsch", capacity: 60, loads: "6 loads" },
    { manufacturer: "Huebsch", capacity: 80, loads: "8 loads" },
    { manufacturer: "Huebsch", capacity: 100, loads: "10 loads" },

    { manufacturer: "Dexter Laundry", capacity: 20, loads: "2 loads" },
    { manufacturer: "Dexter Laundry", capacity: 30, loads: "3 loads" },
    { manufacturer: "Dexter Laundry", capacity: 40, loads: "4 loads" },
    { manufacturer: "Dexter Laundry", capacity: 60, loads: "6 loads" },
    { manufacturer: "Dexter Laundry", capacity: 80, loads: "8 loads" },
    { manufacturer: "Dexter Laundry", capacity: 90, loads: "9 loads" },
    { manufacturer: "Dexter Laundry", capacity: 100, loads: "10 loads" },
    { manufacturer: "Dexter Laundry", capacity: 120, loads: "12 loads" },

    { manufacturer: "Maytag", capacity: 15, loads: "2 loads" },
    { manufacturer: "Maytag", capacity: 20, loads: "2 loads" },
    { manufacturer: "Maytag", capacity: 30, loads: "3 loads" },
    { manufacturer: "Maytag", capacity: 40, loads: "4 loads" },
    { manufacturer: "Maytag", capacity: 55, loads: "6 loads" },
    { manufacturer: "Maytag", capacity: 65, loads: "6 loads" },

    { manufacturer: "Whirlpool", capacity: 15, loads: "2 loads" },
    { manufacturer: "Whirlpool", capacity: 20, loads: "2 loads" },
    { manufacturer: "Whirlpool", capacity: 30, loads: "3 loads" },
    { manufacturer: "Whirlpool", capacity: 40, loads: "4 loads" },
    { manufacturer: "Whirlpool", capacity: 55, loads: "6 loads" },
    { manufacturer: "Whirlpool", capacity: 65, loads: "6 loads" },

    { manufacturer: "Electrolux", capacity: 18, loads: "2 loads" },
    { manufacturer: "Electrolux", capacity: 20, loads: "2 loads" },
    { manufacturer: "Electrolux", capacity: 30, loads: "3 loads" },
    { manufacturer: "Electrolux", capacity: 45, loads: "4 loads" },
    { manufacturer: "Electrolux", capacity: 60, loads: "6 loads" },
    { manufacturer: "Electrolux", capacity: 80, loads: "8 loads" },
    { manufacturer: "Electrolux", capacity: 135, loads: "14 loads" },

    { manufacturer: "Wascomat", capacity: 18, loads: "2 loads" },
    { manufacturer: "Wascomat", capacity: 20, loads: "2 loads" },
    { manufacturer: "Wascomat", capacity: 30, loads: "3 loads" },
    { manufacturer: "Wascomat", capacity: 45, loads: "4 loads" },
    { manufacturer: "Wascomat", capacity: 60, loads: "6 loads" },
    { manufacturer: "Wascomat", capacity: 80, loads: "8 loads" },
    { manufacturer: "Wascomat", capacity: 135, loads: "14 loads" },

    { manufacturer: "Continental Girbau", capacity: 20, loads: "2 loads" },
    { manufacturer: "Continental Girbau", capacity: 30, loads: "3 loads" },
    { manufacturer: "Continental Girbau", capacity: 40, loads: "4 loads" },
    { manufacturer: "Continental Girbau", capacity: 55, loads: "6 loads" },
    { manufacturer: "Continental Girbau", capacity: 70, loads: "7 loads" },
    { manufacturer: "Continental Girbau", capacity: 90, loads: "9 loads" },
    { manufacturer: "Continental Girbau", capacity: 130, loads: "13 loads" },
    { manufacturer: "Continental Girbau", capacity: 255, loads: "26 loads" },
    { manufacturer: "Unimac", capacity: 20, loads: "2 loads" },
    { manufacturer: "Unimac", capacity: 30, loads: "3 loads" },
    { manufacturer: "Unimac", capacity: 40, loads: "4 loads" },
    { manufacturer: "Unimac", capacity: 60, loads: "6 loads" },
    { manufacturer: "Unimac", capacity: 80, loads: "8 loads" },
    { manufacturer: "Unimac", capacity: 100, loads: "10 loads" },
    { manufacturer: "Unimac", capacity: 200, loads: "20 loads" },
    { manufacturer: "Unimac", capacity: 400, loads: "40 loads" },
    { manufacturer: "Milnor", capacity: 25, loads: "2 loads" },
    { manufacturer: "Milnor", capacity: 50, loads: "5 loads" },
    { manufacturer: "Milnor", capacity: 100, loads: "10 loads" },
    { manufacturer: "Milnor", capacity: 200, loads: "20 loads" },
    { manufacturer: "Milnor", capacity: 400, loads: "40 loads" },
    { manufacturer: "Milnor", capacity: 700, loads: "70 loads" },
    { manufacturer: "B&C Technologies", capacity: 25, loads: "2 loads" },
    { manufacturer: "B&C Technologies", capacity: 40, loads: "4 loads" },
    { manufacturer: "B&C Technologies", capacity: 60, loads: "6 loads" },
    { manufacturer: "B&C Technologies", capacity: 80, loads: "8 loads" },
    { manufacturer: "B&C Technologies", capacity: 100, loads: "10 loads" },
    { manufacturer: "B&C Technologies", capacity: 125, loads: "12 loads" },
    { manufacturer: "B&C Technologies", capacity: 200, loads: "20 loads" },
    { manufacturer: "B&C Technologies", capacity: 475, loads: "48 loads" },

    { manufacturer: "IPSO", capacity: 20, loads: "2 loads" },
    { manufacturer: "IPSO", capacity: 30, loads: "3 loads" },
    { manufacturer: "IPSO", capacity: 40, loads: "4 loads" },
    { manufacturer: "IPSO", capacity: 55, loads: "6 loads" },
    { manufacturer: "IPSO", capacity: 80, loads: "8 loads" },
    { manufacturer: "IPSO", capacity: 100, loads: "10 loads" },
    { manufacturer: "IPSO", capacity: 135, loads: "14 loads" },

    { manufacturer: "Primus", capacity: 20, loads: "2 loads" },
    { manufacturer: "Primus", capacity: 30, loads: "3 loads" },
    { manufacturer: "Primus", capacity: 40, loads: "4 loads" },
    { manufacturer: "Primus", capacity: 55, loads: "6 loads" },
    { manufacturer: "Primus", capacity: 80, loads: "8 loads" },
    { manufacturer: "Primus", capacity: 100, loads: "10 loads" },
    { manufacturer: "Primus", capacity: 135, loads: "14 loads" },

    { manufacturer: "Fagor Industrial", capacity: 25, loads: "2 loads" },
    { manufacturer: "Fagor Industrial", capacity: 40, loads: "4 loads" },
    { manufacturer: "Fagor Industrial", capacity: 60, loads: "6 loads" },
    { manufacturer: "Fagor Industrial", capacity: 80, loads: "8 loads" },
    { manufacturer: "Fagor Industrial", capacity: 135, loads: "14 loads" },
    { manufacturer: "Fagor Industrial", capacity: 200, loads: "20 loads" },
    { manufacturer: "Domus", capacity: 22, loads: "2 loads" },
    { manufacturer: "Domus", capacity: 30, loads: "3 loads" },
    { manufacturer: "Domus", capacity: 40, loads: "4 loads" },
    { manufacturer: "Domus", capacity: 60, loads: "6 loads" },
    { manufacturer: "Domus", capacity: 80, loads: "8 loads" },
    { manufacturer: "Domus", capacity: 135, loads: "14 loads" },
    { manufacturer: "Stahl", capacity: 20, loads: "2 loads" },
    { manufacturer: "Stahl", capacity: 40, loads: "4 loads" },
    { manufacturer: "Stahl", capacity: 60, loads: "6 loads" },
    { manufacturer: "Stahl", capacity: 100, loads: "10 loads" },
    { manufacturer: "Stahl", capacity: 200, loads: "20 loads" },
    { manufacturer: "Lavatec", capacity: 30, loads: "3 loads" },
    { manufacturer: "Lavatec", capacity: 60, loads: "6 loads" },
    { manufacturer: "Lavatec", capacity: 110, loads: "11 loads" },
    { manufacturer: "Lavatec", capacity: 200, loads: "20 loads" },
    { manufacturer: "Lavatec", capacity: 400, loads: "40 loads" },
    { manufacturer: "Tolkar", capacity: 20, loads: "2 loads" },
    { manufacturer: "Tolkar", capacity: 40, loads: "4 loads" },
    { manufacturer: "Tolkar", capacity: 60, loads: "6 loads" },
    { manufacturer: "Tolkar", capacity: 110, loads: "11 loads" },
    { manufacturer: "Tolkar", capacity: 200, loads: "20 loads" },
  ];

  const paymentSystems = [
    {
      paymentSystem: "Coin Operated (Quarters)",
      description:
        "Standard US $0.25 coins accepted. Machines priced in increments (e.g., $2.50 = 10 quarters).",
    },
    {
      paymentSystem: "Coin Operated (Dollar Coins)",
      description:
        "Some machines are configured for US $1 coins (Sacagawea or Presidential).",
    },
    {
      paymentSystem: "Token Operated",
      description:
        "Custom $1 or $2 token value. Tokens purchased at store changer machine.",
    },
    {
      paymentSystem: "Laundry Card (Proprietary)",
      description:
        "Reloadable store card with stored dollar value. Examples: CCI LaundryCard, ESD SmartCard.",
    },
    {
      paymentSystem: "Credit/Debit Card Reader",
      description:
        "Swipe/insert/tap Visa, MasterCard, AmEx directly at machine. Prices in USD.",
    },
    {
      paymentSystem: "Prepaid Stored-Value Card",
      description:
        "Customer buys $10, $20, etc. prepaid cards usable in washers.",
    },
    {
      paymentSystem: "Mobile App (QR/NFC)",
      description:
        "Customers scan machine QR code and pay via app (PayRange, ShinePay, KioSoft). Funds in USD.",
    },
    {
      paymentSystem: "Digital Wallets",
      description:
        "Apple Pay, Google Pay, Samsung Pay linked to debit/credit accounts in USD.",
    },
    {
      paymentSystem: "Subscription/Membership Apps",
      description: "Flat monthly fee, e.g., $49.99/month for unlimited washes.",
    },
    {
      paymentSystem: "Hybrid Coin + Card",
      description:
        "Machines accept both quarters/dollar coins and cards. Useful for transitions.",
    },
    {
      paymentSystem: "Networked IoT System",
      description:
        "Cloud-connected washers accept app/card payments, track usage in USD.",
    },
    {
      paymentSystem: "Loyalty/Rewards Programs",
      description:
        "Customers earn points (e.g., $1 spent = 1 point). Redeemable as dollar credits.",
    },
    {
      paymentSystem: "Hotel/Apartment Charge-to-Room",
      description:
        "Washer cost (e.g., $3.00) billed directly to resident/hotel folio.",
    },
    {
      paymentSystem: "Biometric Access",
      description:
        "Rare: fingerprint/face linked to stored payment account in USD.",
    },
  ];




  const currentTabIndex = TAB_ORDER.indexOf(activeTab);
  const isLastStep = currentTabIndex === TAB_ORDER.length - 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = "POST";
      const url = "/api/form";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let amount = 0;

      if (response.ok) {
        const flowType =
          searchParams.get("flowType") || "NEW_ACCOUNT_SUBSCRIPTION";
        const result = await response.json();
        onComplete(formData);

        if(flowType === "NEW_ACCOUNT_SUBSCRIPTION") {
          amount = 30;
        }

        if (flowType) {
          router.push(`/payment?flowType=${encodeURIComponent(flowType)}`);
        } else {
          router.push(`/payment`);
        }
      } else {
        alert("Failed to save form data!");
      }
    } catch {
      alert("Network or server error!");
    }

    setIsSubmitting(false);
  };

  // const [attendantType, setAttendantType] = useState<
  //   "attendant" | "nonAttendant" | "partial" | ""
  // >(formData.attendantType || "");

  type AttendantType = "attendant" | "nonAttendant" | "partial" | "";

const [attendantType, setAttendantType] = useState<AttendantType>(
  (["attendant", "nonAttendant", "partial"].includes(formData.attendantType)
    ? formData.attendantType
    : "") as AttendantType
);


  const handleTypeChange = (type: "attendant" | "nonAttendant" | "partial") => {
    // console.log('type' + type)
    setAttendantType(type);
    // console.log('type' + type)
    setFormData((prev) => ({
      ...prev,
      attendantType: type,
      attendingHours: "",
      nonAttendingHours: "",
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold">
          AI Laundromat Assistant — Client Intake Form
        </h1>
        <p className="text-muted-foreground">
          Fill out this comprehensive form to train your voice-based AI
          assistant with location-specific information
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Form Progress</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="business" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="hours" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Hours</span>
            </TabsTrigger>

            <TabsTrigger value="services" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-1">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Equipment</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Questions</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Policies</span>
            </TabsTrigger>
          </TabsList>

          {/* Business tab content */}
          <TabsContent value="business" className="space-y-6 mt-6">
            {/* Your Business info form fields here */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Basic information about your laundromat location
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      placeholder="Clean & Fresh Laundromat"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationName">Location Name *</Label>
                    <Input
                      id="locationName"
                      value={formData.locationName || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          locationName: e.target.value,
                        }))
                      }
                      placeholder="Location"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="123 Main St, City, State 12345"
                      required
                    />
                  </div>

                  <div className="w-24 space-y-2">
                    <Label htmlFor="zipCode">Zip Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                      placeholder="415"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="contact@yourlaundromat.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (if any)</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      placeholder="https://yourlaundromat.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
                  <Input
                    id="googleMapsUrl"
                    value={formData.googleMapsUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        googleMapsUrl: e.target.value,
                      }))
                    }
                    placeholder="https://maps.google.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notableLandmarks">Notable Landmarks</Label>
                  <Input
                    id="notableLandmarks"
                    value={formData.notableLandmarks || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notableLandmarks: e.target.value,
                      }))
                    }
                    placeholder="Landmarks"
                  />
                </div>

                <div className="space-y-4">
                  {/* Tickboxes */}
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={attendantType === "attendant"}
                        value={formData.attendantType || ""}
                        onChange={() => handleTypeChange("attendant")}
                      />
                      Attendant
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={attendantType === "nonAttendant"}
                        onChange={() => handleTypeChange("nonAttendant")}
                      />
                      Non-Attendant
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={attendantType === "partial"}
                        onChange={() => handleTypeChange("partial")}
                      />
                      Partially Attendant
                    </label>
                  </div>

                  {/* Attendant / Partially Attendant UI */}
                  {(attendantType === "attendant" ||
                    attendantType === "partial") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label>Open Time</label>
                        <select
                          value={formData.attendingOpen || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              attendingOpen: e.target.value,
                            }))
                          }
                          className="border rounded px-3 py-2 w-full"
                          disabled={formData.is24Hours} // ✅ disables dropdown when 24/7 is ticked
                        >
                          <option value="">Select open time</option>
                          {TIME_OPTIONS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label>Close Time</label>
                        <select
                          value={formData.attendingClose || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              attendingClose: e.target.value,
                            }))
                          }
                          className="border rounded px-3 py-2 w-full"
                          disabled={formData.is24Hours} // ✅ disables dropdown when 24/7 is ticked
                        >
                          <option value="">Select close time</option>
                          {TIME_OPTIONS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <input
                          type="checkbox"
                          checked={formData.is24Hours || false}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              is24Hours: e.target.checked,
                              attendingOpen: e.target.checked
                                ? ""
                                : prev.attendingOpen,
                              attendingClose: e.target.checked
                                ? ""
                                : prev.attendingClose,
                            }))
                          }
                        />
                        <span>Open 24/7</span>
                      </div>
                    </div>
                  )}

                  {/* Non-Attendant only shows checkbox (no times) */}
                  {attendantType === "nonAttendant" && (
                    <div className="text-sm text-gray-600">
                      ✅ This location will be marked as non-attended.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Operating Hours
                </CardTitle>
                <CardDescription>
                  When your laundromat is open and operational
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-medium p-1">Day</th>
                        <th className="text-left font-medium p-1">Open Time</th>
                        <th className="text-left font-medium p-1">
                          Close Time
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day, i, arr) => {
                        const is247 = formData.hours?.[day]?.is247 || false;

                        return (
                          <tr key={day}>
                            {/* <td className="p-1">{day}</td> */}
                            <td className="p-1">
                              <div className="border border-gray-300 rounded px-2 py-1 text-center">
                                {day}
                              </div>
                            </td>

                            {/* Open Time */}
                            <td className="p-1">
                              <select
                                className={`border rounded px-2 py-1 w-full ${
                                  is247
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-black"
                                }`}
                                value={formData.hours?.[day]?.open || "08:00"}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    hours: {
                                      ...prev.hours,
                                      [day]: {
                                        open: e.target.value,
                                        close: prev.hours?.[day]?.close ?? "", // ✅ always a string
                                      },
                                    },
                                  }))
                                }
                                disabled={is247}
                              >
                                {TIME_OPTIONS.map((time) => (
                                  <option value={time.value} key={time.value}>
                                    {time.label}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Close Time */}
                            {/* Close Time + 24/7 Checkbox */}
                            <td className="p-1 flex items-center gap-2">
                              <select
                                className={`border rounded px-2 py-1 w-full ${
                                  is247
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-black"
                                }`}
                                value={formData.hours?.[day]?.close || "20:00"}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    hours: {
                                      ...prev.hours,
                                      [day]: {
                                        open: prev.hours?.[day]?.open ?? "", // ✅ always a string
                                        close: e.target.value,
                                      },
                                    },
                                  }))
                                }
                                disabled={is247}
                              >
                                {TIME_OPTIONS.map((time) => (
                                  <option value={time.value} key={time.value}>
                                    {time.label}
                                  </option>
                                ))}
                              </select>

                              {/* 24/7 Checkbox */}
                              <label className="flex items-center gap-3 text-sm">
                                <input
                                  type="checkbox"
                                  // checked={is247}
                                  checked={
                                    formData.hours?.[day]?.is247 || false
                                  }
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      hours: {
                                        ...prev.hours,
                                        [day]: {
                                          ...prev.hours?.[day],
                                          is247: e.target.checked,
                                          open: e.target.checked
                                            ? "00:00"
                                            : prev.hours?.[day]?.open ||
                                              "08:00",
                                          close: e.target.checked
                                            ? "23:59"
                                            : prev.hours?.[day]?.close ||
                                              "20:00",
                                        },
                                      },
                                    }))
                                  }
                                />
                                24/7
                              </label>
                            </td>

                            {/* Copy Previous Day */}
                            {/* <td className="p-1">
                              {i > 0 && (
                                <button
                                  className="text-xs text-blue-600 underline"
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      hours: {
                                        ...(prev.hours ?? {}),
                                        [day]: {
                                          open: prev.hours?.[day]?.open ?? "",
                                          close: prev.hours?.[day]?.close ?? "",
                                        },
                                      },
                                    }))
                                  }
                                >
                                  Copy Previous Day
                                </button>
                              )}
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* //Open on Holidays */}
                <div className="space-y-4">
                  {/* ✅ Removed checkbox functionality */}
                  {/* <div className="flex items-center space-x-2">
                          <Checkbox
                            id="openOnHolidays"
                            onCheckedChange={(checked) =>
                              setFormData((prev) => ({
                                ...prev,
                                openOnHolidays: !!checked,
                              }))
                            }
                          />
                          <Label htmlFor="openOnHolidays">Open on holidays</Label>
                        </div> */}

                  {/* ✅ Holiday Hours always visible */}
                  <div className="space-y-4">
                    <Label>Holiday Hours</Label>

                    {formData.holidayHours.map((holiday, index) => (
                      <div
                        key={index}
                        className="flex flex-col lg:flex-row gap-4 items-center border p-3 rounded-xl"
                      >
                        {/* Holiday Dropdown */}
                        <select
                          value={holiday.name}
                          onChange={(e) => {
                            const updated = [...formData.holidayHours];
                            updated[index].name = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              holidayHours: updated,
                            }));
                          }}
                          className="border rounded-lg p-2 w-full lg:w-1/3"
                        >
                          <option value="">Select Holiday</option>
                          <option value="Christmas">🎄 Christmas</option>
                          <option value="Good Friday">✝️ Good Friday</option>
                          <option value="Easter Sunday">
                            🐣 Easter Sunday
                          </option>
                          <option value="Palm Sunday">🌿 Palm Sunday</option>
                          <option value="Ascension Day">
                            ⛪ Ascension Day
                          </option>
                          <option value="Pentecost">🔥 Pentecost</option>
                        </select>

                        {/* Open Time Dropdown */}
                        <select
                          value={holiday.open}
                          onChange={(e) => {
                            const updated = [...formData.holidayHours];
                            updated[index].open = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              holidayHours: updated,
                            }));
                          }}
                          className="border rounded-lg p-2 w-full lg:w-1/4"
                        >
                          <option value="">Open Time</option>
                          {[
                            "Closed",
                            "6:00 AM",
                            "6:30 AM",
                            "7:00 AM",
                            "7:30 AM",
                            "8:00 AM",
                            "8:30 AM",
                            "9:00 AM",
                            "9:30 AM",
                            "10:00 AM",
                            "10:30 AM",
                            "11:00 AM",
                            "11:30 AM",
                            "12:00 PM",
                          ].map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>

                        {/* Close Time Dropdown */}
                        <select
                          value={holiday.close}
                          onChange={(e) => {
                            const updated = [...formData.holidayHours];
                            updated[index].close = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              holidayHours: updated,
                            }));
                          }}
                          className="border rounded-lg p-2 w-full lg:w-1/4"
                        >
                          <option value="">Close Time</option>
                          {[
                            "Closed",
                            "12:00 PM",
                            "12:30 PM",
                            "1:00 PM",
                            "1:30 PM",
                            "2:00 PM",
                            "2:30 PM",
                            "3:00 PM",
                            "3:30 PM",
                            "4:00 PM",
                            "4:30 PM",
                            "5:00 PM",
                            "5:30 PM",
                            "6:00 PM",
                            "6:30 PM",
                            "7:00 PM",
                            "7:30 PM",
                            "8:00 PM",
                          ].map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>

                        {/* Remove Holiday */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.holidayHours.filter(
                              (_, i) => i !== index
                            );
                            setFormData((prev) => ({
                              ...prev,
                              holidayHours: updated,
                            }));
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    {/* Add New Holiday Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          holidayHours: [
                            ...prev.holidayHours,
                            { name: "", open: "", close: "" },
                          ],
                        }))
                      }
                      className="text-blue-600 hover:underline"
                    >
                      + Add Holiday
                    </button>
                  </div>

                  {/* Last Wash Time */}
                  <div className="space-y-2">
                    <Label htmlFor="lastWashTime">
                      Last wash time / final entry time
                    </Label>
                    <Input
                      id="lastWashTime"
                      value={formData.lastWashTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastWashTime: e.target.value,
                        }))
                      }
                      placeholder="1 hour before closing"
                    />
                  </div>

                  {/* Time Zone */}
                  <div className="space-y-2">
                    <Label htmlFor="timeZone">Time Zone</Label>
                    <Input
                      id="timeZone"
                      value={formData.timeZone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          timeZone: e.target.value,
                        }))
                      }
                      placeholder="UTC -8:00 / -7:00 (PST/PDT)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Services & Pricing Tab */}
          <TabsContent value="services" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Services
                </CardTitle>
                <CardDescription>
                  What services you offer and how much they cost
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Services Offered *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {serviceOptions.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() =>
                            toggleArrayItem(
                              formData.services,
                              service,
                              (items) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  services: items,
                                }))
                            )
                          }
                        />
                        <Label htmlFor={service} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherServices">Other services</Label>
                    <Input
                      id="otherServices"
                      placeholder="Describe any additional services"
                      onBlur={(e) => {
                        if (
                          e.target.value &&
                          !formData.services.includes(e.target.value)
                        ) {
                          setFormData((prev) => ({
                            ...prev,
                            services: [...prev.services, e.target.value],
                          }));
                        }
                      }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Accepted payment methods *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {paymentOptions.map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={formData.paymentMethods.includes(method)}
                          onCheckedChange={() =>
                            toggleArrayItem(
                              formData.paymentMethods,
                              method,
                              (items) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  paymentMethods: items,
                                }))
                            )
                          }
                        />
                        <Label htmlFor={method} className="text-sm">
                          {method}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Equipment & Amenities Tab */}
          <TabsContent value="equipment" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Machine Info & Amenities
                </CardTitle>
                <CardDescription>
                  Details about your equipment and facilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalWashers">Total # of washers *</Label>
                    <Input
                      id="totalWashers"
                      value={formData.totalWashers}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          totalWashers: e.target.value,
                        }))
                      }
                      placeholder="24"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalDryers">Total # of dryers</Label>
                    <Input
                      id="totalDryers"
                      value={formData.totalDryers}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          totalDryers: e.target.value,
                        }))
                      }
                      placeholder="32"
                    />
                  </div>
                </div>

                {/* ############################################################################################################################ */}
                <Separator />

                {/* Main Section */}
                <div className="space-y-8">
                  {/* Washers Section */}
                  <div className="space-y-4">
                    <Label>Washers & Prices *</Label>

                    {formData.washers?.map((washer, index) => (
                      <div
                        key={index}
                        className="space-y-3 border p-4 rounded-lg shadow-sm"
                      >
                        {/* Washer Size */}
                        <select
                          value={washer.size}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              washers: prev.washers.map((w, i) =>
                                i === index ? { ...w, size: e.target.value } : w
                              ),
                            }))
                          }
                          className="border rounded px-3 py-2 w-full"
                          required
                        >
                          <option value="" disabled>
                            Select washer size
                          </option>
                          {washerOptions.map((w, i) => (
                            <option
                              key={i}
                              value={`${w.manufacturer}|${w.capacity}|${w.loads}`}
                            >
                              {w.manufacturer} - {w.capacity} lbs - {w.loads}
                            </option>
                          ))}
                        </select>

                        {/* Price */}
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter Price (e.g. $1.25)"
                          value={washer.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              washers: prev.washers.map(
                                (w, i) =>
                                  i === index
                                    ? { ...w, price: e.target.value }
                                    : w // ✅ Keep as string
                              ),
                            }))
                          }
                          required
                        />

                        {/* Payment Systems for this washer */}
                        <div className="space-y-2">
                          <Label>Payment Systems</Label>
                          {washer.payments?.map((payment, pIndex) => (
                            <div
                              key={pIndex}
                              className="flex gap-3 items-center"
                            >
                              <select
                                value={payment.system}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    washers: prev.washers.map((w, i) =>
                                      i === index
                                        ? {
                                            ...w,
                                            payments: w.payments.map((p, pi) =>
                                              pi === pIndex
                                                ? {
                                                    ...p,
                                                    system: e.target.value,
                                                  }
                                                : p
                                            ),
                                          }
                                        : w
                                    ),
                                  }))
                                }
                                className="border rounded px-3 py-2 w-full"
                              >
                                <option value="" disabled>
                                  Select payment system
                                </option>
                                {paymentSystems.map((p, i) => (
                                  <option key={i} value={p.paymentSystem}>
                                    {p.paymentSystem}
                                  </option>
                                ))}
                              </select>

                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    washers: prev.washers.map((w, i) =>
                                      i === index
                                        ? {
                                            ...w,
                                            payments: w.payments.filter(
                                              (_, pi) => pi !== pIndex
                                            ),
                                          }
                                        : w
                                    ),
                                  }))
                                }
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                washers: prev.washers.map((w, i) =>
                                  i === index
                                    ? {
                                        ...w,
                                        payments: [
                                          ...(w.payments || []),
                                          { system: "", notes: "" },
                                        ],
                                      }
                                    : w
                                ),
                              }))
                            }
                          >
                            + Add Payment System
                          </Button>
                        </div>

                        {/* Remove Washer */}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              washers: prev.washers.filter(
                                (_, i) => i !== index
                              ),
                            }))
                          }
                        >
                          Remove Washer
                        </Button>
                      </div>
                    ))}

                    {/* Add Washer */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          washers: [
                            ...(prev.washers || []),
                            {
                              size: "",
                              price: "",
                              quantity: 0,
                              system: "",
                              payments: [],
                            }, // ✅ now a full Washer object
                          ],
                        }))
                      }
                    >
                      + Add Washer
                    </Button>
                  </div>

                  {/* Dryers Section */}
                  <div className="space-y-4">
                    <Label>Dryers & Prices *</Label>

                    {formData.dryers?.map((dryer, index) => (
                      <div
                        key={index}
                        className="space-y-3 border p-4 rounded-lg shadow-sm"
                      >
                        {/* Washer Size */}
                        <select
                          value={dryer.size}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              dryers: prev.dryers.map((w, i) =>
                                i === index ? { ...w, size: e.target.value } : w
                              ),
                            }))
                          }
                          className="border rounded px-3 py-2 w-full"
                          required
                        >
                          <option value="" disabled>
                            Select Dryer size
                          </option>
                          {dryerOptions.map((w, i) => (
                            <option
                              key={i}
                              value={`${w.manufacturer}|${w.capacity}|${w.loads}`}
                            >
                              {w.manufacturer} - {w.capacity} lbs - {w.loads}
                            </option>
                          ))}
                        </select>

                        {/* Price */}
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter Price (e.g. $1.25)"
                          value={dryer.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              dryers: prev.dryers.map(
                                (w, i) =>
                                  i === index
                                    ? { ...w, price: e.target.value }
                                    : w // ✅ Keep as string
                              ),
                            }))
                          }
                          required
                        />

                        {/* Payment Systems for this washer */}
                        <div className="space-y-2">
                          <Label>Payment Systems</Label>
                          {dryer.payments?.map((payment, pIndex) => (
                            <div
                              key={pIndex}
                              className="flex gap-3 items-center"
                            >
                              <select
                                value={payment.system}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    dryers: prev.dryers.map((w, i) =>
                                      i === index
                                        ? {
                                            ...w,
                                            payments: w.payments.map((p, pi) =>
                                              pi === pIndex
                                                ? {
                                                    ...p,
                                                    system: e.target.value,
                                                  }
                                                : p
                                            ),
                                          }
                                        : w
                                    ),
                                  }))
                                }
                                className="border rounded px-3 py-2 w-full"
                              >
                                <option value="" disabled>
                                  Select payment system
                                </option>
                                {paymentSystems.map((p, i) => (
                                  <option key={i} value={p.paymentSystem}>
                                    {p.paymentSystem}
                                  </option>
                                ))}
                              </select>

                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    dryers: prev.dryers.map((w, i) =>
                                      i === index
                                        ? {
                                            ...w,
                                            payments: w.payments.filter(
                                              (_, pi) => pi !== pIndex
                                            ),
                                          }
                                        : w
                                    ),
                                  }))
                                }
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                dryers: prev.dryers.map((w, i) =>
                                  i === index
                                    ? {
                                        ...w,
                                        payments: [
                                          ...(w.payments || []),
                                          { system: "", notes: "" },
                                        ],
                                      }
                                    : w
                                ),
                              }))
                            }
                          >
                            + Add Payment System
                          </Button>
                        </div>

                        {/* Remove Washer */}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              dryers: prev.dryers.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          Remove Washer
                        </Button>
                      </div>
                    ))}

                    {/* Add Washer */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          dryers: [
                            ...(prev.dryers || []),
                            {
                              size: "",
                              price: "",
                              quantity: 0,
                              system: "",
                              payments: [],
                            }, // ✅ now a full Washer object
                          ],
                        }))
                      }
                    >
                      + Add Dryer
                    </Button>
                  </div>
                </div>

                {/* ############################################################################################################################ */}

                <Separator />

                <div className="space-y-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {amenityOptions.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() =>
                            toggleArrayItem(
                              formData.amenities,
                              amenity,
                              (items) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  amenities: items,
                                }))
                            )
                          }
                        />
                        <Label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Common Questions Tab */}
          <TabsContent value="questions" className="space-y-6 mt-6">
            <Card>
              <CardContent className="space-y-6">
                <Separator />

                <div className="space-y-4">
                  <h3>Custom Questions & Answers</h3>
                  <ScrollArea className="h-80">
                    {formData.customQuestions.map((qa, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-4 border rounded-lg mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4>Custom Q&A #{index + 1}</h4>
                          {formData.customQuestions.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeCustomQuestion(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Question</Label>
                          <Input
                            value={qa.question}
                            onChange={(e) =>
                              updateCustomQuestion(
                                index,
                                "question",
                                e.target.value
                              )
                            }
                            placeholder="What detergent brands do you carry?"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea
                            value={qa.answer}
                            onChange={(e) =>
                              updateCustomQuestion(
                                index,
                                "answer",
                                e.target.value
                              )
                            }
                            placeholder="We carry Tide, Gain, and All detergent pods in our vending machines."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </ScrollArea>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomQuestion}
                    className="w-full"
                  >
                    Add Another Custom Q&A
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Call Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Handling Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Handling Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure how the AI handles customer calls and escalations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Handling Style */}

                  {/* Escalation Options (When AI can't answer) */}
                  <div className="space-y-4 border-t pt-4">
                    <Label>
                      If AI can't answer or customer wants a human *
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="escalateForwardCall"
                          checked={formData.escalateForwardCall}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              escalateForwardCall: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="escalateForwardCall">
                          Forward the call to a staff member
                        </Label>
                      </div>

                      {formData.escalateForwardCall && (
                        <div className="space-y-2 pl-6">
                          <Label htmlFor="escalationNumber">
                            Forwarding number
                          </Label>
                          <Input
                            id="escalationNumber"
                            value={formData.escalationNumber}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                escalationNumber: e.target.value,
                              }))
                            }
                            placeholder="(555) 987-6543"
                          />
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="escalateSendMessage"
                          checked={formData.escalateSendMessage}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              escalateSendMessage: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="escalateSendMessage">
                          Send a text message to staff
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="escalateSendEmail"
                          checked={formData.escalateSendEmail}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              escalateSendEmail: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="escalateSendEmail">
                          Send an email notification
                        </Label>
                      </div>

                      {formData.escalateSendEmail && (
                        <div className="space-y-2 pl-6">
                          <Label htmlFor="escalationEmail">
                            Notification email
                          </Label>
                          <Input
                            id="escalationEmail"
                            type="email"
                            value={formData.escalationEmail}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                escalationEmail: e.target.value,
                              }))
                            }
                            placeholder="support@yourbusiness.com"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hiring Call Response */}
                  <div className="space-y-4 border-t pt-4">
                    <Label htmlFor="hiringResponse">
                      What should AI say if someone calls about hiring?
                    </Label>
                    <Textarea
                      id="hiringResponse"
                      value={formData.hiringResponse}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hiringResponse: e.target.value,
                        }))
                      }
                      placeholder="Thanks for your interest! Please visit our careers page at example.com/careers."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Language & Tone */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Language & Tone
                  </CardTitle>
                  <CardDescription>
                    Configure language support and business personality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Language Support */}
                  <div className="space-y-4">
                    <Label>Language support</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((language) => (
                        <div
                          key={language}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() =>
                              toggleArrayItem(
                                formData.languages,
                                language,
                                (items) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    languages: items,
                                  }))
                              )
                            }
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Tone */}
                  <div className="space-y-4">
                    <Label>Business tone *</Label>
                    <RadioGroup
                      value={formData.businessTone}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessTone: value,
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="friendly-casual"
                          id="friendly-casual"
                        />
                        <Label htmlFor="friendly-casual">
                          Friendly & casual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="professional-formal"
                          id="professional-formal"
                        />
                        <Label htmlFor="professional-formal">
                          Professional & formal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bilingual-informal"
                          id="bilingual-informal"
                        />
                        <Label htmlFor="bilingual-informal">
                          Bilingual/informal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Intro & Custom Phrases */}
                  <div className="space-y-2">
                    <Label htmlFor="businessIntro">Business introduction</Label>
                    <Input
                      id="businessIntro"
                      value={formData.businessIntro}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessIntro: e.target.value,
                        }))
                      }
                      placeholder="Hi, thanks for calling Fresh Laundry!"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customPhrases">
                      Custom phrases or taglines
                    </Label>
                    <Textarea
                      id="customPhrases"
                      value={formData.customPhrases}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customPhrases: e.target.value,
                        }))
                      }
                      placeholder="We're always here to help with your laundry needs!"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex + 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Policies tab (last tab) */}
          <TabsContent value="policies" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Special Policies & Notes
                </CardTitle>
                <CardDescription>
                  Important policies and information the AI should know
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lostFoundPolicy">Lost & found policy</Label>
                    <Textarea
                      id="lostFoundPolicy"
                      value={formData.lostFoundPolicy}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lostFoundPolicy: e.target.value,
                        }))
                      }
                      placeholder="Items held for 30 days, check with attendant during business hours"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refundPolicy">Refund policy</Label>
                    <Textarea
                      id="refundPolicy"
                      value={formData.refundPolicy}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          refundPolicy: e.target.value,
                        }))
                      }
                      placeholder="Refunds available for machine malfunctions, contact attendant immediately"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petPolicies">Pet policies</Label>
                    <Textarea
                      id="petPolicies"
                      value={formData.petPolicies}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          petPolicies: e.target.value,
                        }))
                      }
                      placeholder="Masks optional, sanitizer stations available"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeLimits">
                      Time limits for staying on-site
                    </Label>
                    <Textarea
                      id="timeLimits"
                      value={formData.timeLimits}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          timeLimits: e.target.value,
                        }))
                      }
                      placeholder="Please remove items promptly after cycle completion"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unattendedPolicy">
                    No unattended laundry rules
                  </Label>
                  <Textarea
                    id="unattendedPolicy"
                    value={formData.unattendedPolicy}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        unattendedPolicy: e.target.value,
                      }))
                    }
                    placeholder="Laundry left overnight may be removed and stored in lost & found"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalPolicies">
                    Any other important information
                  </Label>
                  <Textarea
                    id="additionalPolicies"
                    value={formData.additionalPolicies}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        additionalPolicies: e.target.value,
                      }))
                    }
                    placeholder="Additional policies, special hours, or important notes"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                onClick={() => setActiveTab(TAB_ORDER[currentTabIndex - 1])}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  "Training AI Assistant..."
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Complete Training Setup
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
