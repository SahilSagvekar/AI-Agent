import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: 11/04/2025</p>

          <div className="space-y-6 text-white">
            <p>
              E8 Productions, LLC ("Company," "we," "our," or "us") respects your privacy and is committed to protecting it. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI Laundromat Assistant and related services (the "Service").
            </p>

            <p>
              By using our website or the Service, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the Service.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect the following types of information:</p>
                
                <div className="space-y-4 ml-4">
                  <div>
                    <h3 className="font-medium text-white mb-2">Personal Information</h3>
                    <p className="text-gray-300">Such as your name, phone number, email address, and payment details.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">Service Information</h3>
                    <p className="text-gray-300">Details about your laundry orders, delivery/pickup addresses, and preferences.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">Communications</h3>
                    <p className="text-gray-300">Voice recordings, call transcripts, or chat logs when you interact with the assistant.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">Technical Data</h3>
                    <p className="text-gray-300">Device information, IP address, browser type, cookies, and usage statistics.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use collected information to:</p>
                
                <ul className="space-y-2 ml-4 text-gray-300">
                  <li>• Provide, operate, and improve the Service.</li>
                  <li>• Process payments and manage your orders.</li>
                  <li>• Communicate with you about your account, orders, and updates.</li>
                  <li>• Send promotional messages (you may opt out at any time).</li>
                  <li>• Train and improve our AI systems.</li>
                  <li>• Protect against fraud, abuse, and unauthorized access.</li>
                  <li>• Comply with legal obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Sharing of Information</h2>
                <p className="mb-4">We do not sell your personal information. We may share data in the following limited situations:</p>
                
                <div className="space-y-4 ml-4">
                  <div>
                    <h3 className="font-medium text-white mb-2">Service Providers</h3>
                    <p className="text-gray-300">With trusted partners who process payments, host data, or help deliver services.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">Business Transfers</h3>
                    <p className="text-gray-300">As part of a merger, acquisition, or sale of assets.</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">Legal Obligations</h3>
                    <p className="text-gray-300">When required to comply with laws, regulations, or legal requests.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Cookies and Tracking</h2>
                <p className="mb-4">We use cookies and similar technologies to:</p>
                
                <ul className="space-y-2 ml-4 text-gray-300 mb-4">
                  <li>• Improve website functionality and user experience.</li>
                  <li>• Analyze site traffic and usage patterns.</li>
                  <li>• Deliver relevant content and promotions.</li>
                </ul>

                <p className="text-gray-300">
                  You may disable cookies in your browser settings, though this may affect site functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
                <p className="text-gray-300">
                  We implement industry-standard measures to protect your personal information, including encryption and restricted access. However, no system is completely secure, and we cannot guarantee absolute protection.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Your Privacy Rights</h2>
                <p className="mb-4">Depending on your location (including California and the European Union), you may have the right to:</p>
                
                <ul className="space-y-2 ml-4 text-gray-300 mb-4">
                  <li>• Access, update, or delete your personal information.</li>
                  <li>• Request a copy of the data we hold about you.</li>
                  <li>• Opt out of marketing communications.</li>
                  <li>• Restrict or object to certain processing of your data.</li>
                </ul>

                <p className="text-gray-300">
                  To exercise your rights, contact us at <span className="text-blue-400">support@tryconnect.ai</span>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-300">
                  Our Service is not intended for children under 13. We do not knowingly collect personal information from children. If we become aware that we have collected such information, we will delete it immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Consent to Recording</h2>
                <p className="text-gray-300">
                  By using our Service, you acknowledge that interactions with our AI assistant (including phone calls or voice messages) may be recorded or transcribed for quality assurance, training, and service improvements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy periodically. Any changes will be posted on this page with the "Last updated" date revised. We encourage you to review it regularly.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
                <p className="mb-4">If you have questions about this Privacy Policy or how we handle your data, please contact us:</p>
                
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