"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import ChartSettingsPanel from "./components/ChartSettingsPanel";
import FinancePlot from "./components/plot";
import InfoChart from "./components/infoChart";   // ✅ new fundamentals panel

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
        data: data.data,   // 👈 chart OHLCV
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="container mx-auto py-12 space-y-12">
        <h1 className="text-4xl font-bold">📈 Stock Modeling</h1>

        {/* Chart Section */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow min-h-[500px] w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart takes 2/3 width */}
          <div className="lg:col-span-2 flex items-center justify-center">
            {settings ? (
              <FinancePlot
                data={settings.data}
                symbol={settings.symbol}
                overlays={settings.overlays}
                indicators={settings.indicators}
              />
            ) : (
              <p className="text-gray-400">No chart to display yet.</p>
            )}
          </div>

          {/* Fundamentals Panel takes 1/3 */}
          <div>
            {settings?.symbol ? (
              <InfoChart symbol={settings.symbol} />
            ) : (
              <p className="text-gray-400">No fundamentals to show yet.</p>
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
