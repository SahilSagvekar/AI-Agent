import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailRow } from "../shared/DetailRow";

interface PaymentsSectionProps {
  payments: any[];
}

export function PaymentsSection({ payments }: PaymentsSectionProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No payment history</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'paid':
      case 'succeeded':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-3 w-3 mr-1" />;
      default:
        return <XCircle className="h-3 w-3 mr-1" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'paid':
      case 'succeeded':
        return 'default';
      case 'pending':
      case 'processing':
        return 'secondary';
      default:
        return 'destructive';
    }
  };

  return (
    <div className="space-y-3">
      {payments.map((payment: any) => (
        <Card key={payment.id} className="border border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-light rounded-lg">
                  <DollarSign className="h-4 w-4 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-lg text-foreground">
                    ${payment.amount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {payment.paymentType}
                  </div>
                </div>
              </div>
              <Badge variant={getStatusVariant(payment.paymentStatus)}>
                {getStatusIcon(payment.paymentStatus)}
                {payment.paymentStatus}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <DetailRow 
                icon={Calendar} 
                label="Payment Date" 
                value={new Date(payment.paymentDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} 
              />
              {payment.stripePaymentId && (
                <DetailRow 
                  label="Stripe Payment ID" 
                  value={
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded">
                      {payment.stripePaymentId}
                    </code>
                  } 
                />
              )}
              {payment.stripeSubscriptionId && (
                <DetailRow 
                  label="Stripe Subscription" 
                  value={
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded">
                      {payment.stripeSubscriptionId}
                    </code>
                  } 
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}