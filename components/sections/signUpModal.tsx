"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  SignUpData, 
  FormErrors, 
  exportAuthData, 
  downloadJSON, 
  validateEmail, 
  validatePassword, 
  validateFullName, 
  validateConfirmPassword 
} from "@/lib/auth-types";
import { useGoogleSignIn } from "@/lib/useGoogleSignIn";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const { initializeGoogleSignIn, signInWithGoogle } = useGoogleSignIn();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const fullNameError = validateFullName(formData.fullName);
    if (fullNameError) newErrors.fullName = fullNameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      // Send data to your API endpoint
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          action: 'signup'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(`Welcome, ${result.user.full_name}! Your account has been created successfully.`);
        
        // Also export as JSON for backup
        const signUpData: SignUpData = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          timestamp: new Date().toISOString(),
          action: 'signup'
        };
        const jsonData = exportAuthData(signUpData);
        const filename = `signup_${formData.email.replace('@', '_at_')}_${Date.now()}.json`;
        downloadJSON(jsonData, filename);
        
        // Reset form after successful sign up
        setTimeout(() => {
          setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrors({ general: result.error || "Sign up failed. Please try again." });
      }

    } catch (error) {
      console.error('Error processing sign up:', error);
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = (userData: {
    name: string;
    email: string;
    picture: string;
    sub: string;
    given_name: string;
    family_name: string;
  }) => {
    setIsLoading(true);
    setSuccessMessage("");
    
    try {
      // Send Google user data to your API
      fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleUser: userData,
          action: 'signup'
        }),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setSuccessMessage(`Welcome, ${result.user.full_name}! Your account has been created successfully.`);
          
          // Also export as JSON for backup
          const googleSignUpData = {
            fullName: userData.name,
            email: userData.email,
            password: "google_oauth",
            confirmPassword: "google_oauth",
            timestamp: new Date().toISOString(),
            action: 'signup',
            googleUser: {
              name: userData.name,
              given_name: userData.given_name,
              family_name: userData.family_name,
              picture: userData.picture,
              sub: userData.sub
            }
          };
          
          const jsonData = JSON.stringify(googleSignUpData, null, 2);
          const filename = `google_signup_${userData.email.replace('@', '_at_')}_${Date.now()}.json`;
          downloadJSON(jsonData, filename);
          
          // Reset form after successful sign up
          setTimeout(() => {
            setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
            setSuccessMessage("");
          }, 3000);
        } else {
          setErrors({ general: result.error || "Google sign up failed. Please try again." });
        }
      })
      .catch(error => {
        console.error('Error processing Google sign up:', error);
        setErrors({ general: "An error occurred with Google sign up. Please try again." });
      })
      .finally(() => {
        setIsLoading(false);
      });
      
    } catch (error) {
      console.error('Error processing Google sign up:', error);
      setErrors({ general: "An error occurred with Google sign up. Please try again." });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeGoogleSignIn(handleGoogleSignUp);
  }, [initializeGoogleSignIn]);

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="text-gray-400 text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullName" className="text-white">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-lg"
            required
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-lg"
            required
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-white">Password</Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-lg"
            required
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-lg"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Error Message */}
        {errors.general && (
          <p className="text-red-400 text-sm text-center">{errors.general}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-400 text-sm text-center">{successMessage}</p>
        )}

        <Button type="submit" className="w-full rounded-lg" disabled={isLoading}>
          {isLoading ? "Processing..." : "Sign Up"}
        </Button>
        <div className="after:border-gray-600 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-black text-gray-400 relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button 
          type="button"
          variant="outline" 
          className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-500 rounded-lg cursor-pointer"
          onClick={() => {
            console.log('Google sign-up button clicked!');
            signInWithGoogle();
          }}
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          className="underline underline-offset-4 hover:text-blue-400 text-blue-400"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('openSignInModal'));
          }}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default function SignUpModal() {
  return null; // Rendered by AuthModals
}
