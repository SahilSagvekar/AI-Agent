import { useRedirect } from "@/utils/redirect";

export function Footer({ onContact, onPrivacyPolicy, onTermsOfService }: { onContact?: () => void; onPrivacyPolicy?: () => void; onTermsOfService?: () => void }) {
  const { redirectContact, redirectDemo, redirectPrivacy, redirectTerms } = useRedirect();
  
  return (
    <footer id="contact" className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-[#7851A9] rounded flex items-center justify-center">
                <span className="text-primary-foreground text-xs">AI</span>
              </div>
              <span className="font-semibold">ConnectAI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Revolutionizing laundromat customer service with AI-powered assistance.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={redirectContact}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li>
                <button 
                  onClick={redirectPrivacy}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button 
                  onClick={redirectTerms}
                  className="hover:text-foreground transition-colors text-left"
                >
                  Terms Of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 ConnectAI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <button 
              onClick={redirectPrivacy}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={redirectTerms}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}