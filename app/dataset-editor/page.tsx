"use client";

import Navbar from "@/components/sections/navbar/default";
import HeroBackground from "@/components/ui/HeroBackground";
import DatasetEditor from "../general/components/DatasetEditor";

export default function DatasetEditorPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black/20 to-slate-900/30"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 text-white">
              Dataset Editor
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Upload, edit, filter, and export your datasets with powerful data manipulation tools
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
              
              <div className="p-8">
                <DatasetEditor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
