import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Clock, MapPin, Phone, DollarSign, Wrench, FileText, MessageCircle, Save, Settings, Languages, Users } from "lucide-react";
import { useRouter } from "next/navigation";



interface FormData {
  // Business Information
  businessName: string;
  address: string;
  phone: string;
  zipCode: string;
  email: string;
  website: string;
  googleMapsUrl: string;
  
  // Operating Hours
  weekdayHours: string;
  weekendHours: string;
  openOnHolidays: boolean;
  holidayNote: string;
  lastWashTime: string;
  
  // Services Offered
  services: string[];
  
  // Pricing Info
  washerPrices: string;
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
  covidPolicies: string;
  timeLimits: string;
  unattendedPolicy: string;
  additionalPolicies: string;
}


export function AITrainingForm({
  initialData,
  onComplete,
}: {
  initialData?: Partial<FormData>;
  onComplete: (data: FormData) => void;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("business");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: initialData?.businessName ?? "",
    address: initialData?.address ?? "",
    phone: initialData?.phone ?? "",
    zipCode: initialData?.zipCode ?? "",
    email: initialData?.email ?? "",
    website: initialData?.website ?? "",
    googleMapsUrl: initialData?.googleMapsUrl ?? "",
    weekdayHours: initialData?.weekdayHours ?? "6:00 AM - 10:00 PM",
    weekendHours: initialData?.weekendHours ?? "7:00 AM - 9:00 PM",
    openOnHolidays: initialData?.openOnHolidays ?? false,
    holidayNote: initialData?.holidayNote ?? "",
    lastWashTime: initialData?.lastWashTime ?? "1 hour before closing",

    services: Array.isArray(initialData?.services) ? initialData.services : [],
    washerPrices: initialData?.washerPrices ?? "",
    dryerPrices: initialData?.dryerPrices ?? "",
    washFoldRate: initialData?.washFoldRate ?? "",
    dryCleaningPrices: initialData?.dryCleaningPrices ?? "",
    pickupDeliveryPricing: initialData?.pickupDeliveryPricing ?? "",
    minimumCharges: initialData?.minimumCharges ?? "",
    paymentMethods: Array.isArray(initialData?.paymentMethods) ? initialData.paymentMethods : [],

    totalWashers: initialData?.totalWashers ?? "",
    totalDryers: initialData?.totalDryers ?? "",
    machineOperationType: initialData?.machineOperationType ?? "",
    machinesModern: initialData?.machinesModern ?? false,
    largeMachines: initialData?.largeMachines ?? false,

    amenities: Array.isArray(initialData?.amenities) ? initialData.amenities : [],

    commonQuestions: Array.isArray(initialData?.commonQuestions) ? initialData.commonQuestions : [],
    customQuestions: Array.isArray(initialData?.customQuestions) ? initialData.customQuestions : [{ question: "", answer: "" }],

    callHandlingStyle: initialData?.callHandlingStyle ?? "",
    forwardingEnabled: initialData?.forwardingEnabled ?? false,
    forwardingNumber: initialData?.forwardingNumber ?? "",
    forwardingHours: initialData?.forwardingHours ?? "",

    languages: Array.isArray(initialData?.languages) ? initialData.languages : ["English"],
    autoDetectLanguage: initialData?.autoDetectLanguage ?? false,

    businessTone: initialData?.businessTone ?? "",
    customPhrases: initialData?.customPhrases ?? "",
    businessIntro: initialData?.businessIntro ?? "",

    lostFoundPolicy: initialData?.lostFoundPolicy ?? "",
    refundPolicy: initialData?.refundPolicy ?? "",
    covidPolicies: initialData?.covidPolicies ?? "",
    timeLimits: initialData?.timeLimits ?? "",
    unattendedPolicy: initialData?.unattendedPolicy ?? "",
    additionalPolicies: initialData?.additionalPolicies ?? "",
  });
  console.log('initialData' + initialData);
  useEffect(() => {
     console.log('initialData changed:', initialData?.zipCode);
    if (initialData) {
      setFormData({
        businessName: initialData.businessName ?? "",
        address: initialData.address ?? "",
        phone: initialData.phone ?? "",
        zipCode: initialData?.zipCode ?? "",
        email: initialData.email ?? "",
        website: initialData.website ?? "",
        googleMapsUrl: initialData.googleMapsUrl ?? "",
        weekdayHours: initialData.weekdayHours ?? "6:00 AM - 10:00 PM",
        weekendHours: initialData.weekendHours ?? "7:00 AM - 9:00 PM",
        openOnHolidays: initialData.openOnHolidays ?? false,
        holidayNote: initialData.holidayNote ?? "",
        lastWashTime: initialData.lastWashTime ?? "1 hour before closing",

        services: Array.isArray(initialData.services) ? initialData.services : [],
        washerPrices: initialData.washerPrices ?? "",
        dryerPrices: initialData.dryerPrices ?? "",
        washFoldRate: initialData.washFoldRate ?? "",
        dryCleaningPrices: initialData.dryCleaningPrices ?? "",
        pickupDeliveryPricing: initialData.pickupDeliveryPricing ?? "",
        minimumCharges: initialData.minimumCharges ?? "",
        paymentMethods: Array.isArray(initialData.paymentMethods) ? initialData.paymentMethods : [],

        totalWashers: initialData.totalWashers ?? "",
        totalDryers: initialData.totalDryers ?? "",
        machineOperationType: initialData.machineOperationType ?? "",
        machinesModern: initialData.machinesModern ?? false,
        largeMachines: initialData.largeMachines ?? false,

        amenities: Array.isArray(initialData.amenities) ? initialData.amenities : [],

        commonQuestions: Array.isArray(initialData.commonQuestions) ? initialData.commonQuestions : [],
        customQuestions: Array.isArray(initialData.customQuestions) ? initialData.customQuestions : [{ question: "", answer: "" }],

        callHandlingStyle: initialData.callHandlingStyle ?? "",
        forwardingEnabled: initialData.forwardingEnabled ?? false,
        forwardingNumber: initialData.forwardingNumber ?? "",
        forwardingHours: initialData.forwardingHours ?? "",

        languages: Array.isArray(initialData.languages) ? initialData.languages : ["English"],
        autoDetectLanguage: initialData.autoDetectLanguage ?? false,

        businessTone: initialData.businessTone ?? "",
        customPhrases: initialData.customPhrases ?? "",
        businessIntro: initialData.businessIntro ?? "",

        lostFoundPolicy: initialData.lostFoundPolicy ?? "",
        refundPolicy: initialData.refundPolicy ?? "",
        covidPolicies: initialData.covidPolicies ?? "",
        timeLimits: initialData.timeLimits ?? "",
        unattendedPolicy: initialData.unattendedPolicy ?? "",
        additionalPolicies: initialData.additionalPolicies ?? "",
      });
    }
  }, [initialData]);

  // Calculate form completion percentage
  // const calculateProgress = () => {
  //   const requiredFields = [
  //     formData.businessName,
  //     formData.address,
  //     formData.phone,
  //     formData.weekdayHours,
  //     formData.washerPrices,
  //     formData.dryerPrices,
  //     formData.totalWashers,
  //     formData.callHandlingStyle,
  //     formData.businessTone
  //   ];
  //   const completed = requiredFields.filter(field => field.trim() !== "").length;
  //   const serviceCheck = formData.services.length > 0 ? 1 : 0;
  //   const paymentCheck = formData.paymentMethods.length > 0 ? 1 : 0;
  //   return Math.round(((completed + serviceCheck + paymentCheck) / (requiredFields.length + 2)) * 100);
  // };

   const calculateProgress = () => {
    const requiredFields = [
      formData.businessName,
      formData.address,
      formData.phone,
      formData.weekdayHours,
      formData.washerPrices,
      formData.dryerPrices,
      formData.totalWashers,
      formData.callHandlingStyle,
      formData.businessTone
    ];

    const completed = requiredFields.filter(field =>
      typeof field === "string" && field.trim() !== ""
    ).length;

    const serviceCheck = Array.isArray(formData.services) && formData.services.length > 0 ? 1 : 0;
    const paymentCheck = Array.isArray(formData.paymentMethods) && formData.paymentMethods.length > 0 ? 1 : 0;

    return Math.round(((completed + serviceCheck + paymentCheck) / (requiredFields.length + 2)) * 100);
  };


  // Replace your handleSubmit definition with this:

const handleSubmit = async (e: React.FormEvent) => {

  
  e.preventDefault();
  setIsSubmitting(true);

  // const method = initialData && initialData ? "PUT" : "POST";
  const method = "POST";
  const url = "/api/form"; // Or separate endpoints if you want


  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Send entire form data!
    });

    if (response.ok) {
      const result = await response.json();
      onComplete(formData); // Existing callback, no UI changes
      // router.push("/dashboard");
      router.push("/payment");
    } else {
      alert("Failed to save form data!");
    }
  } catch (err) {
    alert("Network or server error!");
  }
  setIsSubmitting(false);
};



  const addCustomQuestion = () => {
    setFormData(prev => ({
      ...prev,
      customQuestions: [...prev.customQuestions, { question: "", answer: "" }]
    }));
  };

  const removeCustomQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.filter((_, i) => i !== index)
    }));
  };

  const updateCustomQuestion = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      customQuestions: prev.customQuestions.map((qa, i) => 
        i === index ? { ...qa, [field]: value } : qa
      )
    }));
  };

  const toggleArrayItem = (array: string[], item: string, setArray: (items: string[]) => void) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const progress = calculateProgress();

  const serviceOptions = [
    "Self-Service Washers & Dryers",
    "Wash & Fold",
    "Dry Cleaning",
    "Pickup & Delivery",
    "Commercial Laundry",
    "Detergent/Vending Machines",
    "Loyalty Program / Membership"
  ];

  const paymentOptions = [
    "Cash",
    "Credit/Debit",
    "App-based (Apple Pay, Google Pay, etc.)",
    "Loyalty card/token system"
  ];

  const amenityOptions = [
    "Free Wi-Fi",
    "Seating",
    "Folding tables",
    "Restroom",
    "Vending machines (snacks/drinks)",
    "Detergent vending",
    "TV/Music",
    "Kids' play area",
    "ATM"
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
    "Is it busy right now?"
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
    "Korean"
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">AI Laundromat Assistant — Client Intake Form</h1>
          <p className="text-muted-foreground">
            Fill out this comprehensive form to train your voice-based AI assistant with location-specific information
          </p>
        </div>
        
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

          {/* Business Information Tab */}
          <TabsContent value="business" className="space-y-6 mt-6">
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
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Clean & Fresh Laundromat"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Main St, City, State 12345"
                    required
                  />
                </div>

                <div className="w-24 space-y-2">
                  <Label htmlFor="address">Area Code *</Label>
                  <Input
                    id="address"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="415"
                    required
                  />
                </div>
                </div>

                
  {/* <div className="flex-1 space-y-2">
    <Label htmlFor="address">Full Address *</Label>
    <Input
      id="address"
      value={formData.address}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, address: e.target.value }))
      }
      placeholder="123 Main St, City, State 12345"
      required
    />
  </div>

  <div className="w-24 space-y-1">  {/* Fixed smaller width */}
    {/* <Label htmlFor="zipCode">Area Code *</Label>
    <Input
      id="zipCode"
      value={formData.zipCode}       // Use separate state field, not address
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
      }
      placeholder="415"
      required
    />
  </div>  */}



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@yourlaundromat.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (if any)</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourlaundromat.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
                  <Input
                    id="googleMapsUrl"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operating Hours Tab */}
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weekdayHours">Weekday Hours (Mon–Fri) *</Label>
                    <Input
                      id="weekdayHours"
                      value={formData.weekdayHours}
                      onChange={(e) => setFormData(prev => ({ ...prev, weekdayHours: e.target.value }))}
                      placeholder="6:00 AM - 10:00 PM"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekendHours">Weekend Hours (Sat–Sun)</Label>
                    <Input
                      id="weekendHours"
                      value={formData.weekendHours}
                      onChange={(e) => setFormData(prev => ({ ...prev, weekendHours: e.target.value }))}
                      placeholder="7:00 AM - 9:00 PM"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="openOnHolidays"
                      checked={formData.openOnHolidays}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, openOnHolidays: !!checked }))}
                    />
                    <Label htmlFor="openOnHolidays">Open on holidays</Label>
                  </div>

                  {formData.openOnHolidays && (
                    <div className="space-y-2">
                      <Label htmlFor="holidayNote">Holiday hours note</Label>
                      <Input
                        id="holidayNote"
                        value={formData.holidayNote}
                        onChange={(e) => setFormData(prev => ({ ...prev, holidayNote: e.target.value }))}
                        placeholder="Limited hours on holidays - call ahead"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="lastWashTime">Last wash time / final entry time</Label>
                    <Input
                      id="lastWashTime"
                      value={formData.lastWashTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastWashTime: e.target.value }))}
                      placeholder="1 hour before closing"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services & Pricing Tab */}
          <TabsContent value="services" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Services & Pricing
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
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => 
                            toggleArrayItem(formData.services, service, (items) => 
                              setFormData(prev => ({ ...prev, services: items }))
                            )
                          }
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherServices">Other services</Label>
                    <Input
                      id="otherServices"
                      placeholder="Describe any additional services"
                      onBlur={(e) => {
                        if (e.target.value && !formData.services.includes(e.target.value)) {
                          setFormData(prev => ({ ...prev, services: [...prev.services, e.target.value] }));
                        }
                      }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="washerPrices">Washer sizes & prices *</Label>
                    <Textarea
                      id="washerPrices"
                      value={formData.washerPrices}
                      onChange={(e) => setFormData(prev => ({ ...prev, washerPrices: e.target.value }))}
                      placeholder="Small Load: $2.75&#10;Medium Load: $3.25&#10;Large Load: $4.00&#10;Extra Large: $5.50"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dryerPrices">Dryer prices (per cycle or time) *</Label>
                    <Textarea
                      id="dryerPrices"
                      value={formData.dryerPrices}
                      onChange={(e) => setFormData(prev => ({ ...prev, dryerPrices: e.target.value }))}
                      placeholder="Regular Dry: $0.25 per 6 minutes&#10;High Heat: $0.25 per 6 minutes&#10;Air Dry: $0.25 per 8 minutes"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="washFoldRate">Wash & Fold rate (per lb or flat rate)</Label>
                    <Input
                      id="washFoldRate"
                      value={formData.washFoldRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, washFoldRate: e.target.value }))}
                      placeholder="$1.50/lb (10 lb minimum)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dryCleaningPrices">Dry cleaning prices</Label>
                    <Input
                      id="dryCleaningPrices"
                      value={formData.dryCleaningPrices}
                      onChange={(e) => setFormData(prev => ({ ...prev, dryCleaningPrices: e.target.value }))}
                      placeholder="Varies by item - shirts $3, pants $5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDeliveryPricing">Pickup & Delivery pricing</Label>
                    <Input
                      id="pickupDeliveryPricing"
                      value={formData.pickupDeliveryPricing}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupDeliveryPricing: e.target.value }))}
                      placeholder="$5 pickup fee + wash prices"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumCharges">Minimum charges (if any)</Label>
                    <Input
                      id="minimumCharges"
                      value={formData.minimumCharges}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimumCharges: e.target.value }))}
                      placeholder="$10 minimum for pickup service"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Accepted payment methods *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {paymentOptions.map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={formData.paymentMethods.includes(method)}
                          onCheckedChange={() => 
                            toggleArrayItem(formData.paymentMethods, method, (items) => 
                              setFormData(prev => ({ ...prev, paymentMethods: items }))
                            )
                          }
                        />
                        <Label htmlFor={method} className="text-sm">{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      onChange={(e) => setFormData(prev => ({ ...prev, totalWashers: e.target.value }))}
                      placeholder="24"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalDryers">Total # of dryers</Label>
                    <Input
                      id="totalDryers"
                      value={formData.totalDryers}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalDryers: e.target.value }))}
                      placeholder="32"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Machine operation type</Label>
                  <RadioGroup
                    value={formData.machineOperationType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, machineOperationType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="coin" id="coin" />
                      <Label htmlFor="coin">Coin-operated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Card-operated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="app" id="app" />
                      <Label htmlFor="app">App-based</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mixed" id="mixed" />
                      <Label htmlFor="mixed">Mixed (multiple payment types)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="machinesModern"
                      checked={formData.machinesModern}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, machinesModern: !!checked }))}
                    />
                    <Label htmlFor="machinesModern">Machines are new/modern/high-efficiency</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="largeMachines"
                      checked={formData.largeMachines}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, largeMachines: !!checked }))}
                    />
                    <Label htmlFor="largeMachines">Have large machines for comforters/blankets</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => 
                            toggleArrayItem(formData.amenities, amenity, (items) => 
                              setFormData(prev => ({ ...prev, amenities: items }))
                            )
                          }
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Questions Tab */}
          <TabsContent value="questions" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Common Questions Customers Ask
                </CardTitle>
                <CardDescription>
                  Select which questions customers frequently ask, plus add your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Common questions (check all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {commonQuestionOptions.map((question) => (
                      <div key={question} className="flex items-center space-x-2">
                        <Checkbox
                          id={question}
                          checked={formData.commonQuestions.includes(question)}
                          onCheckedChange={() => 
                            toggleArrayItem(formData.commonQuestions, question, (items) => 
                              setFormData(prev => ({ ...prev, commonQuestions: items }))
                            )
                          }
                        />
                        <Label htmlFor={question} className="text-sm">{question}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3>Custom Questions & Answers</h3>
                  <ScrollArea className="h-80">
                    {formData.customQuestions.map((qa, index) => (
                      <div key={index} className="space-y-4 p-4 border rounded-lg mb-4">
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
                            onChange={(e) => updateCustomQuestion(index, 'question', e.target.value)}
                            placeholder="What detergent brands do you carry?"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Answer</Label>
                          <Textarea
                            value={qa.answer}
                            onChange={(e) => updateCustomQuestion(index, 'answer', e.target.value)}
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
          </TabsContent>

          {/* Call Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Call Handling Preferences
                  </CardTitle>
                  <CardDescription>
                    How should the AI handle customer calls?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Label>AI should *</Label>
                    <RadioGroup
                      value={formData.callHandlingStyle}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, callHandlingStyle: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="answer-everything" id="answer-everything" />
                        <Label htmlFor="answer-everything">Try to answer everything itself</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="forward-when-confused" id="forward-when-confused" />
                        <Label htmlFor="forward-when-confused">Forward to staff member if confused</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="take-message" id="take-message" />
                        <Label htmlFor="take-message">Take a message</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="forwardingEnabled"
                        checked={formData.forwardingEnabled}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, forwardingEnabled: !!checked }))}
                      />
                      <Label htmlFor="forwardingEnabled">Enable call forwarding</Label>
                    </div>

                    {formData.forwardingEnabled && (
                      <div className="space-y-4 pl-6">
                        <div className="space-y-2">
                          <Label htmlFor="forwardingNumber">Phone number to forward to</Label>
                          <Input
                            id="forwardingNumber"
                            value={formData.forwardingNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, forwardingNumber: e.target.value }))}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="forwardingHours">Time ranges to allow forwarding</Label>
                          <Input
                            id="forwardingHours"
                            value={formData.forwardingHours}
                            onChange={(e) => setFormData(prev => ({ ...prev, forwardingHours: e.target.value }))}
                            placeholder="9:00 AM - 5:00 PM, Mon-Fri"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

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
                  <div className="space-y-4">
                    <Label>Language support</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={() => 
                              toggleArrayItem(formData.languages, language, (items) => 
                                setFormData(prev => ({ ...prev, languages: items }))
                              )
                            }
                          />
                          <Label htmlFor={language} className="text-sm">{language}</Label>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoDetectLanguage"
                        checked={formData.autoDetectLanguage}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoDetectLanguage: !!checked }))}
                      />
                      <Label htmlFor="autoDetectLanguage">Auto-detect customer language</Label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Business tone *</Label>
                    <RadioGroup
                      value={formData.businessTone}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, businessTone: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friendly-casual" id="friendly-casual" />
                        <Label htmlFor="friendly-casual">Friendly & casual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="professional-formal" id="professional-formal" />
                        <Label htmlFor="professional-formal">Professional & formal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bilingual-informal" id="bilingual-informal" />
                        <Label htmlFor="bilingual-informal">Bilingual/informal</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessIntro">Business introduction</Label>
                    <Input
                      id="businessIntro"
                      value={formData.businessIntro}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessIntro: e.target.value }))}
                      placeholder="Hi, thanks for calling Fresh Laundry!"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customPhrases">Custom phrases or taglines</Label>
                    <Textarea
                      id="customPhrases"
                      value={formData.customPhrases}
                      onChange={(e) => setFormData(prev => ({ ...prev, customPhrases: e.target.value }))}
                      placeholder="We're always here to help with your laundry needs!"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Policies Tab */}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, lostFoundPolicy: e.target.value }))}
                      placeholder="Items held for 30 days, check with attendant during business hours"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refundPolicy">Refund policy</Label>
                    <Textarea
                      id="refundPolicy"
                      value={formData.refundPolicy}
                      onChange={(e) => setFormData(prev => ({ ...prev, refundPolicy: e.target.value }))}
                      placeholder="Refunds available for machine malfunctions, contact attendant immediately"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="covidPolicies">COVID or hygiene policies</Label>
                    <Textarea
                      id="covidPolicies"
                      value={formData.covidPolicies}
                      onChange={(e) => setFormData(prev => ({ ...prev, covidPolicies: e.target.value }))}
                      placeholder="Masks optional, sanitizer stations available"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeLimits">Time limits for staying on-site</Label>
                    <Textarea
                      id="timeLimits"
                      value={formData.timeLimits}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeLimits: e.target.value }))}
                      placeholder="Please remove items promptly after cycle completion"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unattendedPolicy">No unattended laundry rules</Label>
                  <Textarea
                    id="unattendedPolicy"
                    value={formData.unattendedPolicy}
                    onChange={(e) => setFormData(prev => ({ ...prev, unattendedPolicy: e.target.value }))}
                    placeholder="Laundry left overnight may be removed and stored in lost & found"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalPolicies">Any other important information</Label>
                  <Textarea
                    id="additionalPolicies"
                    value={formData.additionalPolicies}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalPolicies: e.target.value }))}
                    placeholder="Additional policies, special hours, or important notes"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            * Required fields - {progress}% complete
          </div>
          <Button type="submit" disabled={isSubmitting || progress < 70} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isSubmitting ? "Training AI Assistant..." : "Complete Training Setup"}
          </Button>
        </div>
      </form>
    </div>
  );
}