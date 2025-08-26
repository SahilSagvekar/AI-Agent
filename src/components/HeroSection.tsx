import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl tracking-tight">
                Replace Attendant Calls with
                <span className="text-primary block">AI-Powered Assistance</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Your 24/7 AI laundromat assistant handles customer inquiries instantly, 
                reduces operational costs, and improves customer satisfaction.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onGetStarted} size="lg" className="text-lg px-8">
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">90%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 lg:p-12">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Modern laundromat interior"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">AI Assistant Active</span>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border">
              <div className="text-sm">
                <div className="font-medium">Customer Calls</div>
                <div className="text-primary">↓ 95% Reduced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}