import { Phone, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailRow } from "../shared/DetailRow";

interface PhoneNumbersSectionProps {
  phoneNumbers: any[];
}

export function PhoneNumbersSection({ phoneNumbers }: PhoneNumbersSectionProps) {
  if (phoneNumbers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Phone className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No phone numbers assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {phoneNumbers.map((phoneNumber: any) => (
        <Card key={phoneNumber.id} className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-mono font-semibold text-foreground">
                  {phoneNumber.number}
                </span>
              </div>
              <Badge 
                variant={phoneNumber.status === 'ACTIVE' ? 'default' : 'secondary'}
                className={phoneNumber.status === 'ACTIVE' ? 'bg-success text-success-foreground' : ''}
              >
                {phoneNumber.status === 'ACTIVE' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {phoneNumber.status}
              </Badge>
            </div>
            <DetailRow 
              icon={Calendar} 
              label="Assigned Date" 
              value={new Date(phoneNumber.assignedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} 
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}