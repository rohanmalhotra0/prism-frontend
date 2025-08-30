"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SignUpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sky-500 hover:text-sky-400 underline">
          Sign up
        </button>
      </DialogTrigger>

      <DialogContent className="backdrop-blur-md bg-black/90 border border-sky-700 shadow-2xl shadow-sky-800/50">
        <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">
          Create a Prism Account
        </h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400" />
          <input type="email" placeholder="Email" className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400" />
          <input type="password" placeholder="Password" className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400" />
          <input type="password" placeholder="Confirm Password" className="rounded-md border border-sky-700 bg-black/70 p-3 text-white placeholder-gray-400" />
          <Button className="bg-sky-700 text-black font-semibold hover:bg-sky-800">
            Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
