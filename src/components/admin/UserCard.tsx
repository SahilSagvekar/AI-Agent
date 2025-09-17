import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building, 
  CreditCard,
  PhoneCall,
  Store
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PhoneNumbersSection } from "./sections/PhoneNumbersSection";
import { PaymentsSection } from "./sections/PaymentsSection";
import { LocationsSection } from "./sections/LocationsSection";
import { DetailRow } from "./shared/DetailRow";

interface UserCardProps {
  user: any;
}

export function UserCard({ user }: UserCardProps) {
  const totalLocations = user.laundromatLocations?.length ?? 0;
  const totalPayments = user.payments?.length ?? 0;
  const totalPhoneNumbers = user.phoneNumbers?.length ?? 0;

  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-card hover:shadow-elevated transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* User Info */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  {user.name ?? "Unnamed User"}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {user.role ?? "USER"}
                </Badge>
                {user.firstPayment && (
                  <Badge variant="outline" className="text-xs border-success text-success">
                    ✓ Paid
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                <DetailRow icon={Mail} label="Email" value={user.email} />
                <DetailRow icon={Phone} label="Phone" value={user.phone} />
                <DetailRow icon={Building} label="Business" value={user.businessName} />
                <DetailRow icon={Globe} label="Website" value={user.website} />
              </div>
              {user.address && (
                <DetailRow icon={MapPin} label="Address" value={user.address} />
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalLocations}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{totalPayments}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{totalPhoneNumbers}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Numbers</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {/* Phone Numbers Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info-light rounded-lg">
                  <PhoneCall className="h-4 w-4 text-info" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Phone Numbers</h4>
                  <p className="text-sm text-muted-foreground">{totalPhoneNumbers} numbers assigned</p>
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">
                {totalPhoneNumbers}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                <PhoneNumbersSection phoneNumbers={user.phoneNumbers ?? []} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Payments Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-light rounded-lg">
                  <CreditCard className="h-4 w-4 text-success" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Payment History</h4>
                  <p className="text-sm text-muted-foreground">{totalPayments} transactions</p>
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">
                {totalPayments}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                <PaymentsSection payments={user.payments ?? []} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Locations Section */}
          <Collapsible>
            <CollapsibleTrigger className="w-full p-6 hover:bg-muted/30 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-light rounded-lg">
                  <Store className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">Laundromat Locations</h4>
                  <p className="text-sm text-muted-foreground">{totalLocations} locations managed</p>
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">
                {totalLocations}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                <LocationsSection locations={user.laundromatLocations ?? []} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
}