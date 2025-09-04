"use client";

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: GoogleConfig) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleConfig {
  client_id: string;
  callback: (response: GoogleResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleResponse {
  credential: string;
}

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
  given_name: string;
  family_name: string;
}

interface GoogleSignInHook {
  initializeGoogleSignIn: (callback: (user: GoogleUser) => void) => void;
  signInWithGoogle: () => void;
}

export const useGoogleSignIn = (): GoogleSignInHook => {
  const initializeGoogleSignIn = useCallback((callback: (user: GoogleUser) => void) => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "271188314022-ot8co4urb7lmv7g7m63fht1gdfl54fmn.apps.googleusercontent.com",
        callback: (response: GoogleResponse) => {
          try {
            // Decode JWT token
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            
            const userData: GoogleUser = JSON.parse(jsonPayload);
            callback(userData);
          } catch (error) {
            console.error('Error decoding Google JWT:', error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: false, // Disable FedCM to avoid the error
      });
    }
  }, []);

  const signInWithGoogle = useCallback(() => {
    console.log('signInWithGoogle called');
    if (typeof window !== 'undefined' && window.google) {
      console.log('Google object found, attempting sign-in');
      try {
        // Try the prompt method first
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error('Google Sign-In prompt failed:', error);
        // Fallback: redirect to Google OAuth
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "271188314022-ot8co4urb7lmv7g7m63fht1gdfl54fmn.apps.googleusercontent.com";
        const redirectUri = encodeURIComponent(window.location.origin);
        const scope = encodeURIComponent('openid email profile');
        const responseType = 'code';
        const url = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
        console.log('Redirecting to Google OAuth:', url);
        window.location.href = url;
      }
    } else {
      console.error('Google object not found or window not available');
    }
  }, []);

  useEffect(() => {
    // Wait for Google script to load
    const checkGoogleLoaded = () => {
      if (typeof window !== 'undefined' && window.google) {
        console.log('Google script loaded successfully');
        return;
      }
      setTimeout(checkGoogleLoaded, 100);
    };
    checkGoogleLoaded();
  }, []);

  return {
    initializeGoogleSignIn,
    signInWithGoogle,
  };
};
