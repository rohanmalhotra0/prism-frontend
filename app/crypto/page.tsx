"use client";

import Navbar from "@/components/sections/navbar/default";
import CryptoSettingsPanel from "./components/ChartSettingsPanel"; // ✅ correct component
import { useState } from "react";

// Define Crypto settings interface
interface CryptoSettings {
  exchange: string;
  tradingPair: string;
  chartType: string;
  indicators: string[];
  timePeriod: string;
  onChainMetrics: string[];
  sentimentSources: string[];
}

export default function CryptoPage() {
  const [settings, setSettings] = useState<CryptoSettings | null>(null);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Hero */}
        <div className="pt-32 pb-16 px-6 lg:px-8 text-center">
          <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Crypto Analytics Platform In Development
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Analyze crypto pairs, on-chain metrics, and sentiment with powerful visualization tools.
          </p>
        </div>

        {/* Chart Section */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <section className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 
              backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-10">

              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Crypto Chart</h2>
                {settings && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                    Configured
                  </span>
                )}
              </div>

              <div className="w-full max-w-5xl mx-auto aspect-[4/3] flex items-center justify-center 
                bg-gradient-to-br from-gray-800/40 to-gray-700/20 rounded-2xl border border-white/10 p-8">
                {settings ? (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl font-semibold">
                      {settings.tradingPair} ({settings.exchange})
                    </p>
                    <p className="text-gray-400 text-base">
                      Chart will render here with {settings.chartType} view
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-7xl mb-6">•</div>
                    <p className="text-gray-200 text-xl font-semibold">No Chart Selected</p>
                    <p className="text-gray-400">Configure your crypto analysis settings below</p>
                  </div>
                )}
              </div>
            </section>

            {/* Settings Panel */}
            <CryptoSettingsPanel onUpdate={setSettings} />

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
