"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import ChartSettingsPanel from "./components/ChartSettingsPanel";
import ThreeDChartSettingsPanel from "./components/ThreeDChartSettingsPanel";
import FinancePlot from "./components/plot";
import InfoChart from "./components/infoChart";
import ThreeStockChart  from "./components/threeD";
import { API_ENDPOINTS } from "@/lib/api-config";

export default function FinanceModelsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [is3DView, setIs3DView] = useState(false);

  // Fetch OHLCV data from backend
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
      console.log("Backend returned:", data);

      setSettings({
        ...chartSettings,
        symbol: data.symbol,
        data: data.data, // OHLCV data
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
          <div className="lg:col-span-2 flex flex-col rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-4">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                {settings?.symbol ? `${settings.symbol} Chart` : "Stock Chart"}
              </h2>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${!is3DView ? "text-white" : "text-gray-400"}`}>
                  2D
                </span>
                <button
                  onClick={() => setIs3DView(!is3DView)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    is3DView ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      is3DView ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`text-sm ${is3DView ? "text-white" : "text-gray-400"}`}>
                  3D
                </span>
              </div>
            </div>

            {/* Chart Content */}
            <div className="flex-1 flex items-center justify-center">
              {settings ? (
                is3DView ? (
                  <ThreeStockChart
                  data={settings.data}
                  symbol={settings.symbol}
                  chartType={settings.chartType}
                  height={20}
                  gap={0.15}
                  baseThickness={0.08}
                  threeDSettings={{
                    x: settings.x,
                    y: settings.y,
                    z: settings.z,
                  }}
                />
                
                ) : (
                  <FinancePlot
                    data={settings.data}
                    symbol={settings.symbol}
                    overlays={settings.overlays}
                    indicators={settings.indicators}
                  />
                )
              ) : (
                <p className="text-gray-500">Select a stock to load chart data.</p>
              )}
            </div>
          </div>

          {/* Fundamentals Panel */}
          <div className="rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-white/10 p-6">
            {settings?.symbol ? (
              <InfoChart symbol={settings.symbol} />
            ) : (
              <p className="text-gray-500">Fundamentals will appear here.</p>
            )}
            
            {/* Navigation Controls - Only show in 3D view */}
            {is3DView && (
              <div className="mt-6 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-md text-white text-sm p-4 rounded-xl shadow-2xl border border-white/10">
                <div className="font-bold mb-3 text-blue-400">🎮 Navigation Controls</div>
                <div className="space-y-2 text-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🖱️</span>
                    <span><strong>Left drag:</strong> Rotate view</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🖱️</span>
                    <span><strong>Right drag:</strong> Pan view</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🖱️</span>
                    <span><strong>Scroll:</strong> Zoom in/out</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">👆</span>
                    <span><strong>Hover:</strong> Show data</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Settings Panel */}
        <section className="space-y-8">
          {is3DView ? (
            <ThreeDChartSettingsPanel 
              onUpdate={setSettings} 
              currentSettings={settings}
            />
          ) : (
            <ChartSettingsPanel onUpdate={fetchFinanceData} />
          )}
        </section>
      </div>
    </main>
  );
}
