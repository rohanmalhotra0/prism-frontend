"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import MathVisualizer from "./components/MathVisualizer";
import DatasetLab from "./components/DatasetLab";
import MLToolkit from "./components/MLToolkit";

export default function ModelingSandbox() {
  const [activeMode, setActiveMode] = useState<"equations" | "datasets" | "ml">("equations");
  const [sharedData, setSharedData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* NAVBAR */}
      <Navbar />

      {/* Hero section */}
      <div className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 text-white leading-tight">
            Math Tools
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
            Visualize equations, explore datasets, and apply ML models in one unified environment
          </p>
          
          {/* Mode Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveMode("equations")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "equations"
                  ? "bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              Math Visualizer
            </button>
            <button
              onClick={() => setActiveMode("datasets")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "datasets"
                  ? "bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              Dataset Lab
            </button>
            <button
              onClick={() => setActiveMode("ml")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "ml"
                  ? "bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/25"
                  : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              Machine Learning Lab
            </button>
          </div>
        </div>
      </div>

      {/* Main Sandbox Interface */}
      <div className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1877F2]"></div>
            
            <div className="p-8">
              {activeMode === "equations" && <MathVisualizer sharedData={sharedData} setSharedData={setSharedData} />}
              {activeMode === "datasets" && <DatasetLab sharedData={sharedData} setSharedData={setSharedData} />}
              {activeMode === "ml" && <MLToolkit sharedData={sharedData} setSharedData={setSharedData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}