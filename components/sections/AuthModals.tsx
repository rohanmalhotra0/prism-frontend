"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthModal } from "./signInModal";
import { SignUpForm } from "./signUpModal";

export default function AuthModals() {
  const [activeModal, setActiveModal] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    const handleOpenSignIn = () => {
      setActiveModal('signin');
    };

    const handleOpenSignUp = () => {
      setActiveModal('signup');
    };

    window.addEventListener('openSignInModal', handleOpenSignIn);
    window.addEventListener('openSignUpModal', handleOpenSignUp);

    return () => {
      window.removeEventListener('openSignInModal', handleOpenSignIn);
      window.removeEventListener('openSignUpModal', handleOpenSignUp);
    };
  }, []);

  return (
    <>
      {/* Sign In Modal */}
      <Dialog open={activeModal === 'signin'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="backdrop-blur-md bg-black/95 border border-gray-700 shadow-2xl max-w-md mx-auto my-8">
          <AuthModal />
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={activeModal === 'signup'} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="backdrop-blur-md bg-black/95 border border-gray-700 shadow-2xl max-w-md mx-auto my-8">
          <SignUpForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
