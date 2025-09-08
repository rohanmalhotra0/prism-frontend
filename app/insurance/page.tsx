"use client";
import Navbar from "@/components/sections/navbar/default";
import InsuranceSettingsPanel from "./components/ChartSettingsPanel";
import { useState } from "react";



interface InsuranceSettings {
  modelType: string;
  riskFactors: string[];
  timeHorizon: string;
  portfolio: string[];
  stressTests: string[];
  metrics: string[];
}

export default function InsurancePage() {
  const [settings, setSettings] = useState<InsuranceSettings | null>(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
        
    
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-32 pb-16 px-6 lg:px-8 text-center">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Insurance Risk Platform
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Run stochastic models, evaluate risk metrics, and stress test your insurance portfolio.
          </p>
        </div>

        {/* Chart Section */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <section className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 
              backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Insurance Risk Chart</h2>
                {settings && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                    Configured
                  </span>
                )}
              </div>

              <div className="w-full max-w-5xl mx-auto aspect-[4/3] flex items-center justify-center 
                bg-gradient-to-br from-gray-800/40 to-gray-700/20 rounded-2xl border border-white/10 p-8">
                {settings ? (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl font-semibold">Risk Analysis Rendered</p>
                    <p className="text-gray-400">Chart will render here with your selected model & stress tests</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl font-semibold">No Model Selected</p>
                    <p className="text-gray-400">Configure your insurance risk settings below</p>
                  </div>
                )}
              </div>
            </section>

            {/* Settings Panel */}
            <InsuranceSettingsPanel onUpdate={setSettings} />

            {/* JSON Output */}
            {settings && (
              <section className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 
                backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">Configuration Details</h3>
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    {JSON.stringify(settings, null, 2)}
                  </pre>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
