import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, MapPin, Phone, Clock, DollarSign, Wrench, Wifi, MessageSquare } from "lucide-react";

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: {
    selfService: boolean;
    dropOff: boolean;
    dryClean: boolean;
    alterations: boolean;
  };
  pricing: {
    washSmall: string;
    washLarge: string;
    drySmall: string;
    dryLarge: string;
  };
  amenities: {
    wifi: boolean;
    parking: boolean;
    changeService: boolean;
    vendingMachines: boolean;
    seating: boolean;
    tvs: boolean;
  };
  equipment: {
    washers: number;
    dryers: number;
    changeKiosk: boolean;
    paymentMethods: string[];
  };
  policies: string;
  specialInstructions: string;
}

interface LocationEditorProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  onSave: (data: LocationData) => void;
}

export function LocationEditor({ isOpen, onClose, locationName, onSave }: LocationEditorProps) {
  const [formData, setFormData] = useState<LocationData>({
    id: locationName.toLowerCase().replace(/\s+/g, '-'),
    name: locationName,
    address: "123 Main St, City, State",
    phone: "+1 (555) 247-8901",
    hours: {
      monday: "6:00 AM - 11:00 PM",
      tuesday: "6:00 AM - 11:00 PM", 
      wednesday: "6:00 AM - 11:00 PM",
      thursday: "6:00 AM - 11:00 PM",
      friday: "6:00 AM - 11:00 PM",
      saturday: "6:00 AM - 11:00 PM",
      sunday: "6:00 AM - 11:00 PM"
    },
    services: {
      selfService: true,
      dropOff: true,
      dryClean: false,
      alterations: false
    },
    pricing: {
      washSmall: "3.50",
      washLarge: "5.00",
      drySmall: "3.00",
      dryLarge: "4.50"
    },
    amenities: {
      wifi: true,
      parking: true,
      changeService: true,
      vendingMachines: true,
      seating: true,
      tvs: false
    },
    equipment: {
      washers: 12,
      dryers: 14,
      changeKiosk: true,
      paymentMethods: ["Cash", "Credit Card", "Mobile Pay"]
    },
    policies: "No clothes left overnight. Machine cycles are 35 minutes for wash, 40 minutes for dry.",
    specialInstructions: "Machine #3 is temporarily out of order. Change machine gives quarters only."
  });

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const updateHours = (day: keyof typeof formData.hours, value: string) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: value
      }
    }));
  };

  const updateServices = (service: keyof typeof formData.services, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: value
      }
    }));
  };

  const updatePricing = (item: keyof typeof formData.pricing, value: string) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [item]: value
      }
    }));
  };

  const updateAmenities = (amenity: keyof typeof formData.amenities, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: value
      }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Edit {locationName} Information
          </DialogTitle>
          <DialogDescription>
            Update the AI assistant's knowledge about this specific location
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Location Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="washers">Number of Washers</Label>
                    <Input
                      id="washers"
                      type="number"
                      value={formData.equipment.washers}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        equipment: { ...prev.equipment, washers: parseInt(e.target.value) || 0 }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dryers">Number of Dryers</Label>
                    <Input
                      id="dryers"
                      type="number"
                      value={formData.equipment.dryers}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        equipment: { ...prev.equipment, dryers: parseInt(e.target.value) || 0 }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formData.hours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <Label className="w-20 capitalize">{day}</Label>
                    <Input
                      value={hours}
                      onChange={(e) => updateHours(day as keyof typeof formData.hours, e.target.value)}
                      placeholder="e.g., 6:00 AM - 11:00 PM"
                      className="flex-1"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.services).map(([service, enabled]) => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={service}
                        checked={enabled}
                        onChange={(e) => updateServices(service as keyof typeof formData.services, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={service} className="capitalize">
                        {service.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wash-small">Small Load Wash</Label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        id="wash-small"
                        value={formData.pricing.washSmall}
                        onChange={(e) => updatePricing('washSmall', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wash-large">Large Load Wash</Label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        id="wash-large"
                        value={formData.pricing.washLarge}
                        onChange={(e) => updatePricing('washLarge', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dry-small">Small Load Dry</Label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        id="dry-small"
                        value={formData.pricing.drySmall}
                        onChange={(e) => updatePricing('drySmall', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dry-large">Large Load Dry</Label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        id="dry-large"
                        value={formData.pricing.dryLarge}
                        onChange={(e) => updatePricing('dryLarge', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Amenities & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.amenities).map(([amenity, available]) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={amenity}
                        checked={available}
                        onChange={(e) => updateAmenities(amenity as keyof typeof formData.amenities, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={amenity} className="capitalize">
                        {amenity.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Policies & Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="policies">Store Policies</Label>
                  <Textarea
                    id="policies"
                    value={formData.policies}
                    onChange={(e) => setFormData(prev => ({ ...prev, policies: e.target.value }))}
                    placeholder="Enter store policies that customers should know about..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special">Special Instructions</Label>
                  <Textarea
                    id="special"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    placeholder="Any special instructions or temporary notices..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Location Info
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}