"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import ChartSettingsPanel from "./components/ChartSettingsPanel";
import FinancePlot from "./components/plot";
import InfoChart from "./components/infoChart";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function FinanceModelsPage() {
  const [settings, setSettings] = useState<any>(null);

  // Fetch OHLCV data from backend
  const fetchFinanceData = async (chartSettings: any) => {
    try {
      const response = await fetch(`${API_BASE}/finance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chartSettings),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chart data. Is the backend running?");
      }

      const data = await response.json();
      console.log("Backend returned:", data);

      setSettings({
        ...chartSettings,
        symbol: data.symbol,
        data: data.data,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      <div className="container mx-auto py-12 space-y-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">
          📈 Stock Modeling Dashboard
        </h1>

        {/* Chart + Fundamentals */}
        <section className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl min-h-[500px] w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart takes 2/3 width */}
          <div className="lg:col-span-2 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-4">
            {settings ? (
              <FinancePlot
                data={settings.data}
                symbol={settings.symbol}
                overlays={settings.overlays}
                indicators={settings.indicators}
              />
            ) : (
              <p className="text-gray-500">Select a stock to load chart data.</p>
            )}
          </div>

          {/* Fundamentals Panel */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-6">
            {settings?.symbol ? (
              <InfoChart symbol={settings.symbol} />
            ) : (
              <p className="text-gray-500">Fundamentals will appear here.</p>
            )}
          </div>
        </section>

        {/* Settings Panel */}
        <section className="space-y-8">
          <ChartSettingsPanel onUpdate={fetchFinanceData} />
        </section>
      </div>
    </main>
  );
}
