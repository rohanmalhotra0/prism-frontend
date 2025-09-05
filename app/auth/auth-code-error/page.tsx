"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthCodeError() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-gray-400 mb-6">
            There was an error during the Google sign-in process. This could be due to:
          </p>
          <ul className="text-left text-gray-300 text-sm space-y-2 mb-8">
            <li>• Invalid or expired authorization code</li>
            <li>• Network connectivity issues</li>
            <li>• Google OAuth configuration problems</li>
            <li>• Browser blocking popups or redirects</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Return to Home
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Try Again
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          You will be automatically redirected in a few seconds...
        </p>
      </div>
    </div>
  );
}
