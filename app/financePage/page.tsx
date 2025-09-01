"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import ChartSettingsPanel from "./components/ChartSettingsPanel";
import FinancePlot from "./components/plot"; 

export default function FinanceModelsPage() {
  const [settings, setSettings] = useState<any>(null);

  const fetchFinanceData = async (chartSettings: any) => {
  try {
    const body = {
      symbol: chartSettings.stock,  // ✅ rename stock → symbol
      overlays: chartSettings.overlays,
      indicators: chartSettings.indicators,
      // optionally map timePeriod to actual dates
      start: "2023-01-01",
      end: "2023-12-31",
    };

    const response = await fetch("http://127.0.0.1:8000/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chart data. Is the backend running?");
    }

    const data = await response.json();
    setSettings({ ...chartSettings, symbol: data.symbol, data: data.data });
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="container mx-auto py-12 space-y-12">
        <h1 className="text-4xl font-bold">Stock Modeling</h1>

        {/* Chart Section */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow min-h-[500px] flex items-center justify-center w-full">
          {settings ? (
            <FinancePlot
              data={settings.data}        // 👈 OHLC + indicators from backend
              symbol={settings.symbol}
              overlays={settings.overlays}
              indicators={settings.indicators}
            />
          ) : (
            <p className="text-gray-400">No chart to display yet.</p>
          )}
        </section>

        {/* Settings + JSON Output */}
        <section className="space-y-8">
          <ChartSettingsPanel onUpdate={fetchFinanceData} />

          <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900 p-6">
            {settings ? (
              <>
                <h2 className="mb-4 text-2xl font-semibold">JSON Output</h2>
                <pre className="rounded bg-black p-4 text-green-400 text-sm overflow-x-auto">
                  {JSON.stringify(settings, null, 2)}
                </pre>
              </>
            ) : (
              <p className="text-gray-400">No chart settings selected yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
