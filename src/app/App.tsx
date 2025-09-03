"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { AuthTabs } from "@/components/AuthTabs";
import { AITrainingForm } from "@/components/AITrainingForm";
import { PhoneAssignment } from "@/components/PhoneAssignment";
import { Dashboard } from "@/components/Dashboard";
import { ContactUs } from "@/components/ContactUs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type AppState = 'landing' | 'payment' | 'training' | 'phone-assignment' | 'dashboard' | 'location-editor' | 'demo' | 'contact';

interface UserData {
  businessName: string;
  email: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({ businessName: '', email: '' });
  const [trainingData, setTrainingData] = useState(null);

  const handleGetStarted = () => {
    setIsLoginOpen(true);
  };

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  const handleAuthSuccess = (data: { businessName: string; email: string }) => {
    setUserData(data);
    setIsLoginOpen(false);
    setAppState('training');
  };

  const handleTrainingComplete = (data: any) => {
    setTrainingData(data);
    setAppState('phone-assignment');
  };

  const handlePhoneAssignmentComplete = () => {
    setAppState('dashboard');
  };

  const handleEditTraining = () => {
    setAppState('training');
  };

  const handleContact = () => {
    setAppState('contact');
  };
  const handleBackToLanding = () => {
    setAppState('landing');
  };

  const handleLogout = () => {
    setUserData({ businessName: '', email: '' });
    setTrainingData(null);
    setAppState('landing');
  };

  // Render based on app state
  if (appState === 'training') {
    return (
      <div className="min-h-screen bg-background">
        <AITrainingForm onComplete={handleTrainingComplete} />
      </div>
    );
  }

  if (appState === 'contact') {
    return (
      <ContactUs onBack={handleBackToLanding} />
    );
  }

  if (appState === 'phone-assignment') {
    return (
      <PhoneAssignment
        businessName={userData.businessName}
        onComplete={handlePhoneAssignmentComplete}
      />
    );
  }

  if (appState === 'dashboard') {
    return (
      <Dashboard
        businessName={userData.businessName}
        onEditTraining={handleEditTraining}
        onLogout={handleLogout}
      />
    );
  }

  // Default landing page
  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={handleLogin} />
      
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <PricingSection onContact={handleContact} onGetStarted={handleGetStarted} />
      </main>

      <Footer />

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Sign in to your existing account or create a new account to get started with the AI laundromat assistant.
            </DialogDescription>
          </DialogHeader>
          {/* <AuthTabs onAuthSuccess={handleAuthSuccess} /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}