"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AuthModal({
  triggerText = "Sign In", // default text (can override)
  defaultView = "signin",  // "signin" | "signup"
}: {
  triggerText?: string;
  defaultView?: "signin" | "signup";
}) {
  const [view, setView] = useState<"signin" | "signup">(defaultView);

  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <button className="relative group px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-lg"></div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Border glow */}
          <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
          
          {/* Text */}
          <span className="relative z-10">
            {triggerText}
          </span>
          
          {/* Shadow */}
          <div className="absolute inset-0 rounded-lg shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300"></div>
        </button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-md bg-black/90 border border-sky-700 shadow-xl">
        {view === "signin" ? (
          <div>
            <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">
              Sign in to Prism
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400 focus:ring-sky-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400 focus:ring-sky-600"
              />
              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md"
              >
                Sign In
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signup")}
                className="text-sky-400 hover:text-sky-300"
              >
                Sign up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">
              Create your Prism Account
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400 focus:ring-sky-600"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400 focus:ring-sky-600"
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400 focus:ring-sky-600"
              />
              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md"
              >
                Sign Up
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setView("signin")}
                className="text-sky-400 hover:text-sky-300"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
