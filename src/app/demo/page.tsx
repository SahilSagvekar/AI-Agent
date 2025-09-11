"use client"

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { ArrowLeft, Phone, MessageSquare, Play, Pause, Volume2, Clock, User, Bot, Zap, Target, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface DemoProps {
  onBack: () => void;
}

export default function Demo({ onBack }: DemoProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/"); // redirect to landing page
    }
  };
  
  const [activeDemo, setActiveDemo] = useState<'call' | 'sms' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const callDemo = [
    {
      speaker: "customer",
      message: "Hi, are you open right now?",
      timestamp: "0:02"
    },
    {
      speaker: "ai",
      message: "Hello! Yes, we're open today from 6 AM to 10 PM. How can I help you with your laundry needs?",
      timestamp: "0:05"
    },
    {
      speaker: "customer", 
      message: "Great! How much does it cost to wash a large load?",
      timestamp: "0:12"
    },
    {
      speaker: "ai",
      message: "A large load in our washers costs $4.00. We also have extra large machines for comforters and blankets at $5.50. Would you like to know about our dryer prices as well?",
      timestamp: "0:16"
    },
    {
      speaker: "customer",
      message: "Yes, please. And do you have wash and fold service?",
      timestamp: "0:25"
    },
    {
      speaker: "ai",
      message: "Our dryers are $0.25 per 6 minutes. For wash and fold, we charge $1.50 per pound with a 10 pound minimum. We can have it ready the same day if dropped off before 2 PM!",
      timestamp: "0:28"
    }
  ];

  const smsDemo = [
    {
      speaker: "customer",
      message: "What time do you close?",
      timestamp: "2:34 PM"
    },
    {
      speaker: "ai", 
      message: "We close at 10:00 PM tonight. Last wash starts at 9:00 PM. Anything else I can help with?",
      timestamp: "2:34 PM"
    },
    {
      speaker: "customer",
      message: "Do you take credit cards?",
      timestamp: "2:45 PM"
    },
    {
      speaker: "ai",
      message: "Yes! We accept credit/debit cards, Apple Pay, Google Pay, and cash. All our machines are card-enabled for your convenience.",
      timestamp: "2:45 PM"
    }
  ];

  const playDemo = (type: 'call' | 'sms') => {
    setActiveDemo(type);
    setCurrentStep(0);
    setIsPlaying(true);
    
    const demo = type === 'call' ? callDemo : smsDemo;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= demo.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetDemo = () => {
    setActiveDemo(null);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto pl-2 pr-6 py-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="flex items-center gap-2 mr-12">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-semibold">ConnectAI Laundromat Assistant Demo</h1>
              <p className="text-muted-foreground">
                See how our AI handles real customer inquiries
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* AI Features Highlight - Floating Bubbles */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-3">AI Assistant Features Demonstrated</h2>
            <p className="text-muted-foreground">Experience the power of our intelligent laundromat assistant</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200/50 dark:border-blue-700/50">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-center mb-3 text-lg">Instant Responses</h4>
                <p className="text-sm text-muted-foreground text-center">
                  No waiting on hold. Customers get immediate answers to common questions.
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200/50 dark:border-green-700/50">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-center mb-3 text-lg">Accurate Information</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Trained on your specific pricing, hours, and services for consistent answers.
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200/50 dark:border-purple-700/50">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-center mb-3 text-lg">Natural Conversation</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Understands context and provides helpful, human-like responses.
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Options */}
        {!activeDemo && (
          <div className="space-y-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => playDemo('call')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  Phone Call Demo
                </CardTitle>
                <CardDescription>
                  Experience how our AI assistant handles a typical customer phone call about pricing and services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>~35 seconds</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Scenario:</span>
                    <span>Pricing inquiry</span>
                  </div>
                  <Button className="w-full flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Call Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => playDemo('sms')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  SMS Demo
                </CardTitle>
                <CardDescription>
                  See how our AI responds to text messages about hours and payment methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Messages:</span>
                    <span>4 messages</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Scenario:</span>
                    <span>Hours & payments</span>
                  </div>
                  <Button className="w-full flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start SMS Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Demo */}
        {activeDemo && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  {activeDemo === 'call' ? <Phone className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                  {activeDemo === 'call' ? 'Phone Call' : 'SMS Conversation'}
                </Badge>
                {isPlaying && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Demo
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={resetDemo}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={onBack}>
                  Back to Options
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {activeDemo === 'call' ? <Volume2 className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                  {activeDemo === 'call' ? 'Call Transcript' : 'Message Thread'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(activeDemo === 'call' ? callDemo : smsDemo).slice(0, currentStep + 1).map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.speaker === 'ai' ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.speaker === 'ai' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {message.speaker === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div className={`flex-1 ${message.speaker === 'customer' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-xs ${
                          message.speaker === 'ai'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}



        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
              <p className="text-primary-foreground/80">
                Set up your own AI assistant in just 5 minutes and start handling customer calls automatically.
              </p>
              <Button variant="secondary" size="lg" onClick={onBack}>
                Start Your Free Trial
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}