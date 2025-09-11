"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type AppState = 'landing' | 'payment' | 'training' | 'phone-assignment' | 'dashboard' | 'location-editor' | 'demo' | 'contact' | 'privacy-policy' | 'terms-of-service';

interface UserData {
  businessName: string;
  email: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({ businessName: '', email: '' });
  const [trainingData, setTrainingData] = useState(null);
   const router = useRouter();
    // const [appState, setAppState] = useState<AppState>('landing');
    // const [isLoginOpen, setIsLoginOpen] = useState(false);
  

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

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

  async function getUserFirstPayment(email: string): Promise<boolean> {
  const res = await fetch(`/api/user/payment-status?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Failed to fetch payment status");
  const data = await res.json();
  return data.firstPayment === true;
}

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

   const handlePrivacyPolicy = () => {
    setAppState('privacy-policy');
  };

  const handleTermsOfService = () => {
    setAppState('terms-of-service');
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

    async function handleLoginSuccess(user: { email: string; name?: string }) {
      closeLogin();
      try {
        const hasPaid = await getUserFirstPayment(user.email);

        if (hasPaid) {
          router.push("/dashboard");
        } else {
          router.push("/payment");
        }
      } catch (err) {
        console.error("Error fetching payment status:", err);
        // Default to payment page or show error
        router.push("/payment");
      }
    }

async function handleRegisterSuccess(user: { email: string; name?: string }) {
  closeLogin();

  router.push('/training');

  // try {
  //   const hasPaid = await getUserFirstPayment(user.email);

  //   if (hasPaid) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/payment");
  //   }
  // } catch (err) {
  //   console.error("Error fetching payment status:", err);
  //   router.push("/payment");
  // }
}


  // Default landing page
  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={handleLogin} />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <div id="features"><FeaturesSection /></div>
        <PricingSection onContact={handleContact} onGetStarted={handleGetStarted} />
      </main>
      <Footer onContact={handleContact} onPrivacyPolicy={handlePrivacyPolicy} onTermsOfService={handleTermsOfService} />

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Authentication</DialogTitle>
            <DialogDescription className="sr-only">
              Sign in to your existing account or create a new account to get started with the AI laundromat assistant.
            </DialogDescription>
          </DialogHeader>
          <AuthTabs onAuthSuccess={handleLoginSuccess} onRegisterSuccess={handleRegisterSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import { Header } from "@/components/Header";
// import { HeroSection } from "@/components/HeroSection";
// import { FeaturesSection } from "@/components/FeaturesSection";
// import { PricingSection } from "@/components/PricingSection";
// import { Footer } from "@/components/Footer";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { AuthTabs } from "@/components/AuthTabs";


// type AppState = 'landing' | 'payment' | 'training' | 'phone-assignment' | 'dashboard' | 'location-editor' | 'demo' | 'contact';

// interface UserData {
//   businessName: string;
//   email: string;
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [appState, setAppState] = useState<AppState>('landing');
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
  
//   const handleContact = () => {
//     setAppState('contact');
//   };
  

//   const openLogin = () => setIsLoginOpen(true);
//   const closeLogin = () => setIsLoginOpen(false);


//   // const handleAuthSuccess = (userData: { email: string; name?: string }) => {
//   //   closeLogin();
//   //   // redirect to dashboard or appropriate page
//   //   router.push("/dashboard");
//   // };

//   async function getUserFirstPayment(email: string): Promise<boolean> {
//   const res = await fetch(`/api/user/payment-status?email=${encodeURIComponent(email)}`);
//   if (!res.ok) throw new Error("Failed to fetch payment status");
//   const data = await res.json();
//   return data.firstPayment === true;
// }


  
//   async function handleLoginSuccess(user: { email: string; name?: string }) {
//   closeLogin();

//   try {
//     const hasPaid = await getUserFirstPayment(user.email);

//     if (hasPaid) {
//       router.push("/dashboard");
//     } else {
//       router.push("/payment");
//     }
//   } catch (err) {
//     console.error("Error fetching payment status:", err);
//     // Default to payment page or show error
//     router.push("/payment");
//   }
// }

// async function handleRegisterSuccess(user: { email: string; name?: string }) {
//   closeLogin();

//   try {
//     const hasPaid = await getUserFirstPayment(user.email);

//     if (hasPaid) {
//       router.push("/dashboard");
//     } else {
//       router.push("/payment");
//     }
//   } catch (err) {
//     console.error("Error fetching payment status:", err);
//     router.push("/payment");
//   }
// }


//   return (
//     <div className="min-h-screen bg-background">
//       <Header onLogin={openLogin} />
//       <main>
//         <HeroSection onGetStarted={openLogin} />
//         <FeaturesSection />
//         <PricingSection onContact={handleContact} onGetStarted={openLogin} />
//       </main>
//       <Footer />

//       <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="sr-only">Authentication</DialogTitle>
//             <DialogDescription className="sr-only">
//               Sign in or sign up to start using the AI laundromat assistant.
//             </DialogDescription>
//           </DialogHeader>
//            <AuthTabs onAuthSuccess={handleLoginSuccess} onRegisterSuccess={handleRegisterSuccess} />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
