import { Button } from "./ui/button";
import { useRedirect } from "@/utils/redirect";

export function Header({ onLogin }: { onLogin: () => void }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const { redirectDemo, redirectContact } = useRedirect();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg">ConnectAI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={redirectDemo} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={redirectContact} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onLogin}>
              Sign In
            </Button>
            <Button onClick={onLogin}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}