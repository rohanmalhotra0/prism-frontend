"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import ChartSettingsPanel from "./components/ChartSettingsPanel";
import ThreeDChartSettingsPanel from "./components/ThreeDChartSettingsPanel";
import FinancePlot from "./components/plot";
import InfoChart from "./components/infoChart";
import ThreeStockChart from "./components/threeD";
import HeroBackground from "@/components/ui/HeroBackground";

export default function FinanceModelsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [is3DView, setIs3DView] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" />
      
      <Navbar />

      <div className="container mx-auto py-12 space-y-12 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">
          Stock Modeling Dashboard
        </h1>

        {/* Chart + Fundamentals */}
        <section className="rounded-3xl border border-border bg-card p-8 shadow-2xl min-h-[500px] w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart takes 2/3 width */}
          <div className="lg:col-span-2 flex flex-col rounded-2xl bg-card border border-border p-4">
            {/* View Toggle */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {settings?.symbol ? `${settings.symbol} Chart` : "Stock Chart"}
              </h2>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${!is3DView ? "text-foreground" : "text-muted-foreground"}`}>
                  2D
                </span>
                <button
                  onClick={() => setIs3DView(!is3DView)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    is3DView ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      is3DView ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`text-sm ${is3DView ? "text-foreground" : "text-muted-foreground"}`}>
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
                <p className="text-muted-foreground">Select a stock to load chart data.</p>
              )}
            </div>
          </div>

          {/* Fundamentals Panel */}
          <div className="rounded-2xl bg-card border border-border p-6">
            {settings?.symbol ? (
              <InfoChart symbol={settings.symbol} />
            ) : (
              <p className="text-muted-foreground">Fundamentals will appear here.</p>
            )}

            {/* Navigation Controls - Only show in 3D view */}
            {is3DView && (
              <div className="mt-6 bg-card text-foreground text-sm p-4 rounded-xl shadow border border-border">
                <div className="font-bold mb-3 text-primary">Navigation Controls</div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">•</span>
                    <span><strong>Left drag:</strong> Rotate view</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">•</span>
                    <span><strong>Right drag:</strong> Pan view</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">•</span>
                    <span><strong>Scroll:</strong> Zoom in/out</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg"></span>
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
            <ChartSettingsPanel onUpdate={setSettings} />
          )}
        </section>
      </div>
    </main>
  );
}
