"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import { API_ENDPOINTS } from "@/lib/api-config";
// Make sure the path is correct; for example, if the file is at app/currency/components/ChartSettingsPanel.tsx:
//import ChartSettingsPanel from "./components/ChartSettingsPanel";

export default function CurrencyPage() {
  const [settings, setSettings] = useState<any>(null);

  // Function to fetch backend data
  const fetchFinanceData = async (chartSettings: any) => {
    try {
      
      const response = await fetch(API_ENDPOINTS.FINANCE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chartSettings),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chart data. Is the backend running?");
      }

      const data = await response.json();
      console.log("Backend returned:", data);  // 👈 add this

      // Backend returns { symbol, data } → merge with settings
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
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto py-12 space-y-12">
        <h1 className="text-4xl font-bold">Stock Modeling</h1>

        {/* Chart Section */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow min-h-[500px] flex items-center justify-center w-full">
            {settings ? (
                <p className="text-gray-400">Chart would be displayed here.</p>
            ) : (
                <p className="text-gray-400">No chart to display yet.</p>
            )}
            </section>

        {/* Settings + JSON Output */}
        <section className="space-y-8">
        {/* Settings + JSON Output  <ChartSettingsPanel onUpdate={fetchFinanceData} /> */}
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
