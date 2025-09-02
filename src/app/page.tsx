"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AuthTabs } from "@/components/AuthTabs";

export default function HomePage() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  // const handleAuthSuccess = (userData: { email: string; name?: string }) => {
  //   closeLogin();
  //   // redirect to dashboard or appropriate page
  //   router.push("/dashboard");
  // };

  
  function handleLoginSuccess(user: { email: string; name?: string }) {
    closeLogin();
    // router.push("/dashboard");
    router.push("/payment");
  }

  function handleRegisterSuccess(user: { email: string; name?: string }) {
    closeLogin();
    // router.push("/training");
    router.push("/payment");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={openLogin} />
      <main>
        <HeroSection onGetStarted={openLogin} />
        <FeaturesSection />
        <PricingSection onGetStarted={openLogin} />
      </main>
      <Footer />

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Sign in or sign up to start using the AI laundromat assistant.
            </DialogDescription>
          </DialogHeader>
           <AuthTabs 
        onAuthSuccess={handleLoginSuccess} 
        onRegisterSuccess={handleRegisterSuccess} 
      />
        </DialogContent>
      </Dialog>
    </div>
  );
}
