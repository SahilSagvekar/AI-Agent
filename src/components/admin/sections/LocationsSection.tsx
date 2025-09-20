import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  DollarSign,
  Settings,
  Languages,
  MessageSquare,
  Wrench
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DetailRow } from "../shared/DetailRow";
import { DataPanel } from "../shared/DataPanel";

interface LocationsSectionProps {
  locations: any[];
}

export function LocationsSection({ locations }: LocationsSectionProps) {
  if (locations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Store className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No locations registered</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {locations.map((location: any) => (
        <Card key={location.id} className="border border-border/50 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg text-foreground">
                    {location.locationName ?? "Unnamed Location"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {location.businessName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {location.PhoneNumber?.length > 0 && (
                  <Badge variant="outline">
                    {location.PhoneNumber.length} Phone{location.PhoneNumber.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DetailRow icon={MapPin} label="Address" value={location.address} />
              <DetailRow icon={Phone} label="Phone" value={location.phone} />
              <DetailRow icon={Mail} label="Email" value={location.email} />
              <DetailRow icon={Globe} label="Website" value={location.website} />
            </div>

            {/* Phone Numbers */}
            {location.PhoneNumber?.length > 0 && (
              <div>
                <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Assigned Phone Numbers
                </h5>
                <div className="flex flex-wrap gap-2">
                  {location.PhoneNumber.map((number: any) => (
                    <Badge key={number.id} variant="secondary" className="font-mono">
                      {number.number}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Collapsible Sections */}
            <div className="space-y-2 border-t pt-4">
              {/* Operating Hours */}
              {location.operatingHours && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">Operating Hours</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-2">
                      <DetailRow label="Weekdays" value={location.operatingHours.weekdayHours} />
                      <DetailRow label="Weekends" value={location.operatingHours.weekendHours} />
                      <DetailRow label="Last Wash" value={location.operatingHours.lastWashTime} />
                      <DetailRow label="Open Holidays" value={location.operatingHours.openOnHolidays ? "Yes" : "No"} />
                      {location.operatingHours.holidayNote && (
                        <DetailRow label="Holiday Note" value={location.operatingHours.holidayNote} />
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Pricing */}
              {location.pricing && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="font-medium">Pricing & Payment</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-3">
                      <DetailRow label="Washer Prices" value={location.pricing.washerPrices} />
                      <DetailRow label="Dryer Prices" value={location.pricing.dryerPrices} />
                      <DetailRow label="Wash & Fold Rate" value={location.pricing.washFoldRate} />
                      <DetailRow label="Dry Cleaning" value={location.pricing.dryCleaningPrices} />
                      <DetailRow label="Pickup/Delivery" value={location.pricing.pickupDeliveryPricing} />
                      <DetailRow label="Minimum Charges" value={location.pricing.minimumCharges} />
                      {location.pricing.paymentMethods && (
                        <DataPanel title="Payment Methods" data={location.pricing.paymentMethods} />
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Machine Info */}
              {location.machineInfo && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-info" />
                      <span className="font-medium">Machine Information</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-2">
                      <DetailRow label="Total Washers" value={location.machineInfo.totalWashers} />
                      <DetailRow label="Total Dryers" value={location.machineInfo.totalDryers} />
                      <DetailRow label="Operation Type" value={location.machineInfo.machineOperationType} />
                      <DetailRow label="Modern Machines" value={location.machineInfo.machinesModern ? "Yes" : "No"} />
                      <DetailRow label="Large Machines" value={location.machineInfo.largeMachines ? "Yes" : "No"} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Call Handling */}
              {location.callHandling && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-warning" />
                      <span className="font-medium">Call Handling</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-2">
                      <DetailRow label="Handling Style" value={location.callHandling.callHandlingStyle} />
                      <DetailRow label="Forwarding Enabled" value={location.callHandling.forwardingEnabled ? "Yes" : "No"} />
                      <DetailRow label="Forwarding Number" value={location.callHandling.forwardingNumber} />
                      <DetailRow label="Forwarding Hours" value={location.callHandling.forwardingHours} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Language Settings */}
              {location.languageSettings && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-info" />
                      <span className="font-medium">Language Settings</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-2">
                      <DetailRow label="Auto Detect" value={location.languageSettings.autoDetectLanguage ? "Yes" : "No"} />
                      {location.languageSettings.languages && (
                        <DataPanel title="Supported Languages" data={location.languageSettings.languages} />
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Additional Data Sections */}
              {location.amenities?.amenities && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Amenities & Services</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-3">
                      {location.amenities?.amenities && (
                        <DataPanel title="Amenities" data={location.amenities.amenities} />
                      )}
                      {location.services?.services && (
                        <DataPanel title="Services" data={location.services.services} />
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Questions & Policies */}
              {(location.questions || location.policies) && (
                <Collapsible>
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Questions & Policies</span>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-3">
                    <div className="space-y-3">
                      {location.questions?.commonQuestions && (
                        <DataPanel title="Common Questions" data={location.questions.commonQuestions} />
                      )}
                      {location.questions?.customQuestions && (
                        <DataPanel title="Custom Questions" data={location.questions.customQuestions} />
                      )}
                      {location.policies && (
                        <div className="space-y-2">
                          <h6 className="font-medium text-sm text-foreground">Policies</h6>
                          <div className="space-y-1">
                            <DetailRow label="Lost & Found" value={location.policies.lostFoundPolicy} />
                            <DetailRow label="Refund Policy" value={location.policies.refundPolicy} />
                            <DetailRow label="COVID Policies" value={location.policies.petPolicies} />
                            <DetailRow label="Time Limits" value={location.policies.timeLimits} />
                            <DetailRow label="Unattended Policy" value={location.policies.unattendedPolicy} />
                            <DetailRow label="Additional" value={location.policies.additionalPolicies} />
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}