import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function PricingSection({ onGetStarted }: { onGetStarted: () => void }) {
  const features = [
    "24/7 AI-powered customer support",
    "Twilio integration for calls & SMS", 
    "Custom knowledge base training",
    "Real-time analytics dashboard",
    "Call logs and conversation history",
    "Multi-language support",
    "API access for integrations",
    "Priority customer support"
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay per location with no hidden fees. Scale your AI assistant as your business grows.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle>Single Location</CardTitle>
              <CardDescription>Perfect for individual laundromats</CardDescription>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">$250</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">Base price includes first location</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={onGetStarted} className="w-full">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Multi-Location Plan */}
          <Card className="relative border-primary shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle>Multi-Location</CardTitle>
              <CardDescription>Ideal for laundromat chains</CardDescription>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">$250</span>
                  <span className="text-muted-foreground">+ $50 per location</span>
                </div>
                <p className="text-sm text-muted-foreground">Scale pricing for additional locations</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={onGetStarted} className="w-full">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>Custom solutions for large chains</CardDescription>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">Custom</span>
                  <span className="text-muted-foreground">pricing</span>
                </div>
                <p className="text-sm text-muted-foreground">Volume discounts available</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[...features, "Dedicated account manager", "Custom integrations", "SLA guarantees"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No setup fees. Cancel anytime.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <span>✓ No contracts</span>
            <span>✓ 24/7 support</span>
            <span>✓ 99.9% uptime SLA</span>
          </div>
        </div>
      </div>
    </section>
  );
}