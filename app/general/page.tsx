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
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <Navbar />

      {/* Hero section */}
      <div className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 text-foreground leading-tight">
            Math Tools
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Visualize equations, explore datasets, and apply ML models in one unified environment
          </p>
          
          {/* Mode Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveMode("equations")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "equations"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-[#1877F2]/25"
                  : "bg-muted text-foreground hover:bg-muted border border-border"
              }`}
            >
              Math Visualizer
            </button>
            <button
              onClick={() => setActiveMode("datasets")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "datasets"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-[#1877F2]/25"
                  : "bg-muted text-foreground hover:bg-muted border border-border"
              }`}
            >
              Dataset Lab
            </button>
            <button
              onClick={() => setActiveMode("ml")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeMode === "ml"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-[#1877F2]/25"
                  : "bg-muted text-foreground hover:bg-muted border border-border"
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
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
            
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