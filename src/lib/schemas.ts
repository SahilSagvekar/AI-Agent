import { z } from "zod";

/* 🏢 Business Tab */
export const businessSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  locationName: z.string().min(1, "Location name is required"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().min(1, "Business name is required"),
  website: z.string().min(1, "Invalid URL"),
  googleMapsUrl: z.string().min(1,"Invalid Google Maps URL"),
  notableLandmarks: z.string().min(1,"Notable Landmarks is required"),
  attendantType: z.string().min(1, "Invalid attendant type"),
  attendingOpen: z.string(), 
  attendingClose: z.string(),
  is24Hours: z.boolean(),
});

/* 🕒 Hours Tab */
export const hoursSchema = z.object({
//   hours: z.record(
//     z.object({
//       open: z.string().min(1, "Open time is required"),
//       close: z.string().min(1, "Close time is required"),
//       is247: z.boolean().optional(),
//     })
//   ),
  timeZone: z.string().min(1, "Time zone is required"),
  lastWashTime: z.string().min(1, "Last Wash Time is required"),
  holidayHours: z
    .array(
      z.object({
        name: z.string().min(1, "Holiday name required"),
        open: z.string().min(1, "Open time required"),
        close: z.string().min(1, "Close time required"),
      })
    )
    // .optional(),
});

/* 💳 Services Tab */
export const servicesSchema = z.object({
  paymentMethods: z.array(z.string()).min(1, "Select at least one payment method"),

  
  services: z.array(z.string()).min(1, "Select at least one service"),  //services not working
});

/* 🛠️ Equipment Tab */
export const equipmentSchema = z.object({
  totalWashers: z.string().min(1, "Total washers required"),
  totalDryers: z.string().min(1, "Total dryers required"),
  washers: z
    .array(
      z.object({
        size: z.string().min(1, "Washer size required"),
        price: z.string().min(1, "Price required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one washer required"),
  dryers: z
    .array(
      z.object({
        size: z.string().min(1, "Dryer size required"),
        price: z.string().min(1, "Price required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one dryer required"),
  amenities: z.array(z.string()).min(1, "Select atleast 1 amenity"),
});

/* ⚙️ Settings Tab */
export const settingsSchema = z.object({
  businessTone: z.union([z.string(), z.array(z.string())]).refine(
    (val) => (Array.isArray(val) ? val.length > 0 : !!val),
    "Select at least one tone"
  ),
  languages: z.array(z.string()).optional(),
  escalateForwardCall: z.boolean().optional(),
  escalationNumber: z.string().optional(),
  escalateSendMessage: z.boolean().optional(),
  escalateSendEmail: z.boolean().optional(),
  escalationEmail: z.string().optional(),
  hiringResponse: z.string().optional(),
  businessIntro: z.string().min(1, "Select atleast 1 amenity"),
  customPhrases: z.string().optional(),
});

/* 📜 Policies Tab */
export const policiesSchema = z.object({
  lostFoundPolicy: z.string().optional(),
  refundPolicy: z.string().optional(),
  petPolicies: z.string().optional(),
  timeLimits: z.string().optional(),
  unattendedPolicy: z.string().optional(),
  additionalPolicies: z.string().optional(),
});

/* ✅ Full Schema (optional for submit) */
export const fullSchema = z.object({
  ...businessSchema.shape,
  ...hoursSchema.shape,
  ...servicesSchema.shape,
  ...equipmentSchema.shape,
  ...settingsSchema.shape,
  ...policiesSchema.shape,
});
