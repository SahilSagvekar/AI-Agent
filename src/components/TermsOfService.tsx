import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-gray-800 hover:text-white p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}{/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-white">Terms Of Service</h1>
          <p className="text-gray-300">Last updated: 11/04/2025</p>

          <div className="space-y-6 text-white">
            <p>
              Welcome to E8 Productions, LLC ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of our AI Laundromat Assistant, website, and related services (collectively, the "Service"). By accessing or using the Service, you agree to these Terms. If you do not agree, please discontinue use of the Service.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Use of the Service</h2>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• You must be at least 18 years old to use the Service.</li>
                  <li>• You agree to use the Service only for lawful purposes and in accordance with these Terms.</li>
                  <li>• You are responsible for ensuring that the information you provide is accurate and up to date.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Accounts</h2>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• To access certain features, you may need to create an account.</li>
                  <li>• You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>• You agree to notify us immediately of any unauthorized access or use of your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Orders and Payments</h2>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• By placing an order, you agree to provide complete and accurate payment and order details.</li>
                  <li>• Payments are processed securely through third-party providers.</li>
                  <li>• All sales are subject to our cancellation and refund policies, if applicable.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">AI Voice Assistant & Communications</h2>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• By using our AI Laundromat Assistant, you consent to communications via phone, SMS, or email related to your order or service.</li>
                  <li>• Calls or interactions may be recorded or transcribed for quality assurance, training, and service improvement.</li>
                  <li>• The Service may provide automated responses; while we strive for accuracy, we do not guarantee error-free interactions.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Acceptable Use</h2>
                <p className="mb-4">You agree not to:</p>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• Use the Service in a way that violates any law or regulation.</li>
                  <li>• Interfere with the security or functionality of the Service.</li>
                  <li>• Attempt to reverse engineer, decompile, or copy the Service's software or AI systems.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-300">
                  All content, software, and materials related to the Service are owned by or licensed to E8 Productions, LLC and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Limitation of Liability</h2>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• The Service is provided "as is" and "as available."</li>
                  <li>• We make no warranties, express or implied, regarding the Service's reliability, availability, or accuracy.</li>
                  <li>• To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages resulting from your use of the Service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Indemnification</h2>
                <p className="text-gray-300">
                  You agree to indemnify and hold harmless E8 Productions, LLC, its affiliates, employees, and partners from any claims, damages, or expenses arising out of your use of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Termination</h2>
                <p className="text-gray-300">
                  We may suspend or terminate your access to the Service at any time, without prior notice, if you violate these Terms or engage in misuse of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Governing Law</h2>
                <p className="text-gray-300">
                  These Terms are governed by and construed in accordance with the laws of [Insert State/Country]. Any disputes shall be resolved in the courts of [Insert Jurisdiction].
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Changes to These Terms</h2>
                <p className="text-gray-300">
                  We may update these Terms from time to time. Updated versions will be posted on this page with the "Last updated" date revised. Your continued use of the Service means you accept the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
                <p className="mb-4">For questions about these Terms, please contact us:</p>
                
                <div className="text-gray-300 space-y-1">
                  <p>E8 Productions, LLC</p>
                  <p>Email: <span className="text-blue-400">support@tryconnect.ai</span></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}