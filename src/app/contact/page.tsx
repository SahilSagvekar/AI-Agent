"use client"

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, Mail, MessageCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ContactUsProps {
  onBack: () => void;
}

export default function ContactUs({ onBack }: ContactUsProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/"); // redirect to landing page
    }
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   toast.success("Message sent successfully! We'll get back to you soon.");
  //   setFormData({ name: '', email: '', subject: '', message: '' });
  //   setIsSubmitting(false);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending message. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#7851A9]/8 rounded-full blur-2xl" />
      
      {/* Header */}
      <header className="border-b border-purple-200/50 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBack} className="p-2 text-gray-700 hover:bg-purple-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-[#7851A9] rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">AI</span>
                </div> */}
                <span className="font-semibold text-lg text-gray-900">ConnectAI</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-[#7851A9] bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            {/* Email Contact */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/50 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-[#7851A9] flex items-center justify-center shadow-lg">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Reach out to us via email and we'll be happy to help.
              </p>
              <div className="group flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-transparent hover:from-purple-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-200">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email us at</p>
                  <p className="text-gray-900 font-medium text-lg">support@connectai.com</p>
                  <p className="text-sm text-gray-500 mt-1">We'd love to hear from you</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/50 shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7851A9] to-violet-600 flex items-center justify-center shadow-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                Response Time
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We typically respond to all inquiries within <span className="text-purple-600 font-semibold">24 hours</span> during business hours. For urgent technical issues, our support team is available to help you get back up and running quickly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Glow effect behind the card */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-violet-100/50 to-[#7851A9]/10 rounded-3xl blur-xl" />
            
            <Card className="relative bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm border border-purple-200/50 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-[#7851A9] flex items-center justify-center shadow-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-gray-900 font-medium">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-gray-900 font-medium">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-gray-900 font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us more about your question or inquiry..."
                      rows={6}
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-[#7851A9] hover:from-purple-600 hover:to-[#6a4490] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}