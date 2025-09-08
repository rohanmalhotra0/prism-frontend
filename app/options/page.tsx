"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
// FIX: adjust the path depending on where ChartSettingsPanel lives
import ChartSettingsPanel from "../options/components/ChartSettingsPanel";

export default function OptionsPage() {
  const [settings, setSettings] = useState<any>(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />

        {/* Hero */}
        <div className="pt-32 pb-16 px-6 lg:px-8 text-center">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Options Trading
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Advanced options analysis with Greeks, volatility metrics, and options flow data.
          </p>
        </div>

        {/* Chart */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <section className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 
              backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-10">
              <h2 className="text-2xl font-bold text-white mb-8">Options Chart</h2>
              <div className="w-full max-w-5xl mx-auto aspect-[4/3] flex items-center justify-center 
                bg-gradient-to-br from-gray-800/40 to-gray-700/20 rounded-2xl border border-white/10 p-8">
                {settings ? (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl mb-2 font-semibold">
                      {settings.underlying} Options Chart
                    </p>
                    <p className="text-gray-400 text-base">
                      Chart will render here with {settings.chartType} view
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl mb-2 font-semibold">No Chart Selected</p>
                    <p className="text-gray-400 text-base">Configure your options model below</p>
                  </div>
                )}
              </div>
            </section>

            {/* Settings */}
            <ChartSettingsPanel onUpdate={setSettings} />

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