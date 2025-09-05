"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supaBaseClient";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Listen for global open/close events
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    window.addEventListener("openAuthModal", handleOpen);
    window.addEventListener("closeAuthModal", handleClose);

    return () => {
      window.removeEventListener("openAuthModal", handleOpen);
      window.removeEventListener("closeAuthModal", handleClose);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);
    setSuccessMessage("");

    if (mode === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors(error.message);
      } else {
        setSuccessMessage(`Welcome back, ${data.user?.email}`);
        setFormData({ email: "", password: "", fullName: "" });
        setTimeout(() => {
          setOpen(false);
          router.push("/");
        }, 1000);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName },
        },
      });

      if (error) {
        setErrors(error.message);
      } else {
        setSuccessMessage("Check your email to confirm your account!");
        setFormData({ email: "", password: "", fullName: "" });
      }
    }

    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrors(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        },
      });
      
      if (error) {
        console.error('Google OAuth error:', error);
        setErrors(`Google sign-in failed: ${error.message}`);
        setIsLoading(false);
      } else {
        // OAuth initiated successfully, redirect to Google
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Unexpected error during Google sign-in:', err);
      setErrors('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-black/95 border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <form
          className={cn("space-y-6 text-white", open && "animate-in")}
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {mode === "signin" ? "Login to Refrax" : "Create your Refrax account"}
            </h1>
            <p className="text-gray-400 text-sm">
              {mode === "signin"
                ? "Enter your details to continue"
                : "Fill in your details to sign up"}
            </p>
          </div>

          <div className="grid gap-5">
            {/* Full Name (Signup Only) */}
            {mode === "signup" && (
              <div className="grid gap-1.5">
                <Label htmlFor="fullName" className="text-sm text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg"
                />
                <p className="text-xs text-gray-500">Enter your full name</p>
              </div>
            )}

            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="m@example.com"
                required
                className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg"
              />
              <p className="text-xs text-gray-500">Enter your email address</p>
            </div>

            {/* Password */}
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="bg-black/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 rounded-lg pr-10"
                />
                {/* Toggle show password */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-xs text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500">Enter your password</p>
            </div>
          </div>

          {/* Errors / Success */}
          {errors && <p className="text-red-400 text-sm text-center">{errors}</p>}
          {successMessage && <p className="text-green-400 text-sm text-center">{successMessage}</p>}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 transition"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : mode === "signin" ? "Login" : "Sign Up"}
          </Button>

          {/* Divider */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:border-gray-700">
            <span className="bg-black px-2 text-gray-400 relative z-10">Or continue with</span>
          </div>

          {/* Google */}
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 py-2 transition text-white"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
          </Button>

          {/* Toggle */}
          <div className="text-center text-sm text-gray-400">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-400 hover:text-blue-500"
                  onClick={() => setMode("signup")}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-400 hover:text-blue-500"
                  onClick={() => setMode("signin")}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
