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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              The Modeling Sandbox
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
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                Math Visualizer
              </button>
              <button
                onClick={() => setActiveMode("datasets")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMode === "datasets"
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                Dataset Lab
              </button>
              <button
                onClick={() => setActiveMode("ml")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeMode === "ml"
                    ? "bg-gradient-to-r from-green-600 to-purple-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                Machine Learning
              </button>
            </div>
          </div>
        </div>

        {/* Main Sandbox Interface */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
              
              <div className="p-8">
                {activeMode === "equations" && <MathVisualizer sharedData={sharedData} setSharedData={setSharedData} />}
                {activeMode === "datasets" && <DatasetLab sharedData={sharedData} setSharedData={setSharedData} />}
                {activeMode === "ml" && <MLToolkit sharedData={sharedData} setSharedData={setSharedData} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
