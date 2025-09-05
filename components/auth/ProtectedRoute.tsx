"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsChecking(false);
    }
  }, [loading]);

  // Show loading spinner while checking authentication
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If no user, show sign-in prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,rgba(0,0,0,1)_85%)]" />
        
        <div className="relative z-10 text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Authentication Required
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            You need to sign in to access the dashboard. Please sign up or log in to continue.
          </p>
          <Button
            onClick={() => window.dispatchEvent(new CustomEvent("openAuthModal"))}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium transition mb-4"
          >
            Sign In / Sign Up
          </Button>
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="text-muted-foreground border-border hover:bg-accent"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If custom fallback provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
