import { Check, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useRedirect } from "@/utils/redirect";
import Link from "next/link";

export function PricingSection({ onGetStarted, onContact }: { onGetStarted: () => void; onContact: () => void }) {
  const { redirectDemo, redirectContact } = useRedirect();

  const features = [
    "24/7 AI-powered customer support",
    "Phone & SMS support for customers", 
    "Custom knowledge base training",
    "Real-time analytics dashboard",
    "Call logs and conversation history",
    "Multi-language support",
    "API access for integrations",
    "Priority customer support"
  ];

  return (
    <section id="pricing" className="py-12 px-4 bg-gradient-to-b from-white via-purple-50/30 to-purple-100/50">      
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <h2 className="tracking-tight font-bold text-foreground" style={{ fontSize: '42px' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Pay per location with no hidden fees. Scale your AI assistant as your business grows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-foreground">Standard</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl tracking-tight text-[#7851A9] font-bold">
                    $175
                  </span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-foreground font-medium">Includes your first location</p>
                <p className="text-sm text-muted-foreground bg-muted rounded-full px-4 py-2 inline-block">
                  $45 for each additional location
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7851A9] flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={onGetStarted} 
                  style={{ backgroundColor: '#7851A9' }}
                  className="w-full hover:opacity-90 text-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl" 
                  size="lg"
                >
                  Start Free Trial
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  14-day free trial • No setup fees • Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center space-y-4 mb-8">
                <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl tracking-tight text-[#7851A9] font-bold">
                    10+
                  </span>
                  <span className="text-lg text-muted-foreground">locations</span>
                </div>
                <p className="text-foreground font-medium">Enterprise pricing available</p>
                <p className="text-sm text-muted-foreground bg-muted rounded-full px-4 py-2 inline-block">
                  Volume discounts & custom features
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Everything in Standard",
                  "Dedicated account manager",
                  "Custom integrations",
                  "Advanced analytics & reporting",
                  "White-label options",
                  "SLA guarantees",
                  "Priority feature requests",
                  "Custom training & onboarding"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#7851A9] flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button 
                  // onClick={onContact} 
                  onClick={redirectContact}
                  variant="outline"
                  className="w-full border-[#7851A9] text-[#7851A9] hover:bg-[#7851A9] hover:text-white shadow-lg transition-all duration-300 hover:shadow-xl" 
                  size="lg"
                >
                  {/* <Link href="/contact"> */}
                   <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                  {/* </Link> */}
                 
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Custom quote • Flexible terms • Volume discounts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 space-y-4">
          <div className="flex justify-center gap-8 text-sm">
            <span className="flex items-center gap-2 text-foreground bg-muted rounded-full px-4 py-2">
              <div className="w-4 h-4 rounded-full bg-[#7851A9] flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
              No contracts
            </span>
            <span className="flex items-center gap-2 text-foreground bg-muted rounded-full px-4 py-2">
              <div className="w-4 h-4 rounded-full bg-[#7851A9] flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
              24/7 support
            </span>
            <span className="flex items-center gap-2 text-foreground bg-muted rounded-full px-4 py-2">
              <div className="w-4 h-4 rounded-full bg-[#7851A9] flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
              99.9% uptime SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { Check } from "lucide-react";
// import { Button } from "./ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { Badge } from "./ui/badge";

// export function PricingSection({ onGetStarted }: { onGetStarted: () => void }) {
//   const features = [
//     "24/7 AI-powered customer support",
//     "Twilio integration for calls & SMS", 
//     "Custom knowledge base training",
//     "Real-time analytics dashboard",
//     "Call logs and conversation history",
//     "Multi-language support",
//     "API access for integrations",
//     "Priority customer support"
//   ];

//   return (
//     <section id="pricing" className="py-20 px-4 bg-accent/20">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center space-y-4 mb-16">
//           <h2 className="text-3xl lg:text-4xl">Simple, Transparent Pricing</h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Pay per location with no hidden fees. Scale your AI assistant as your business grows.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
//           {/* Starter Plan */}
//           <Card className="relative">
//             <CardHeader>
//               <CardTitle>Single Location</CardTitle>
//               <CardDescription>Perfect for individual laundromats</CardDescription>
//               <div className="space-y-2">
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-3xl">$250</span>
//                   <span className="text-muted-foreground">/month</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">Base price includes first location</p>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <ul className="space-y-3">
//                 {features.slice(0, 4).map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Button onClick={onGetStarted} className="w-full">
//                 Start Free Trial
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Multi-Location Plan */}
//           <Card className="relative border-primary shadow-lg">
//             <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//               <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
//             </div>
//             <CardHeader>
//               <CardTitle>Multi-Location</CardTitle>
//               <CardDescription>Ideal for laundromat chains</CardDescription>
//               <div className="space-y-2">
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-3xl">$250</span>
//                   <span className="text-muted-foreground">+ $50 per location</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">Scale pricing for additional locations</p>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <ul className="space-y-3">
//                 {features.map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Button onClick={onGetStarted} className="w-full">
//                 Start Free Trial
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Enterprise Plan */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Enterprise</CardTitle>
//               <CardDescription>Custom solutions for large chains</CardDescription>
//               <div className="space-y-2">
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-3xl">Custom</span>
//                   <span className="text-muted-foreground">pricing</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">Volume discounts available</p>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <ul className="space-y-3">
//                 {[...features, "Dedicated account manager", "Custom integrations", "SLA guarantees"].map((feature, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     <span className="text-sm">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Button variant="outline" className="w-full">
//                 Contact Sales
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="text-center mt-12 space-y-4">
//           <p className="text-muted-foreground">
//             All plans include a 14-day free trial. No setup fees. Cancel anytime.
//           </p>
//           <div className="flex justify-center gap-8 text-sm text-muted-foreground">
//             <span>✓ No contracts</span>
//             <span>✓ 24/7 support</span>
//             <span>✓ 99.9% uptime SLA</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }