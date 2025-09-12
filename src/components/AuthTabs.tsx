"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Import for Google sign-in
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AuthTabsProps {
  onAuthSuccess: (data: { email: string; name?: string }) => void;
  onRegisterSuccess: (user: { email: string; name?: string }) => void;
}

export function AuthTabs({ onAuthSuccess, onRegisterSuccess }: AuthTabsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
    firstName: "",
    lastName: "",
    signupEmail: "",
    signupPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent, isSignup = false) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isSignup ? "/api/register" : "/api/login";
      const body = isSignup
        ? {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.signupEmail,
            password: formData.signupPassword,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (isSignup) {
        onRegisterSuccess({ email: data.user.email, name: data.user.name });
      } else {
        onAuthSuccess({ email: data.user.email, name: data.user.name });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle Google Sign-In via NextAuth
  const handleGoogleSignIn = () => {
    setError(null);
    setIsLoading(true);
    signIn("google", { callbackUrl: "/dashboard" }) // Redirect after sign-in
      .catch(() => {
        setError("Failed to sign in with Google.");
        setIsLoading(false);
      });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Sign in to your account or create a new one to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login" className="space-y-4 mt-6">
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Redirecting..." : "Sign in with Google"}
              </Button>
            </div>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup" className="space-y-4 mt-6">
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                    }
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  value={formData.signupEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, signupEmail: e.target.value }))
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  value={formData.signupPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, signupPassword: e.target.value }))
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
