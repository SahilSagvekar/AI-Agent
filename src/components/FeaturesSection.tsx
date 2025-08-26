import { Phone, Clock, BarChart3, MessageSquare, Settings, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Twilio Integration",
      description: "Seamlessly integrates with Twilio to handle calls and SMS messages automatically."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Your AI assistant never sleeps, handling customer inquiries any time of day or night."
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Smart Responses",
      description: "Trained on laundromat-specific knowledge to provide accurate, helpful responses."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Track call volume, response times, and customer satisfaction in real-time."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Custom Training",
      description: "Easily train the AI with your location-specific information and policies."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliable & Secure",
      description: "Enterprise-grade security with 99.9% uptime guarantee for your peace of mind."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl">Why Choose Our AI Assistant?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built specifically for laundromats, our AI assistant understands your business and your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="text-primary mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}