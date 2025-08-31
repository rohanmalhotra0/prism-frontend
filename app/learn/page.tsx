"use client";

import Navbar from "@/components/sections/navbar/default";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-12">
        <h1 className="text-4xl font-bold">Learn Page</h1>
        <p className="mt-4 text-gray-400">
          This is just a test page to confirm the route works.
        </p>
      </main>
    </div>
  );
}
