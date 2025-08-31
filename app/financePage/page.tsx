"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default"; // ✅ adjust path if needed
import ChartSettingsPanel from "./components/ChartSettingsPanel";

export default function FinanceModelsPage() {
  const [settings, setSettings] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Navbar at the top */}
      <Navbar />

      <div className="container mx-auto py-12 space-y-12">
        {/* Chart Display */}
        <h1 className="text-4xl font-bold">Stock Modeling</h1>
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow min-h-[500px] flex items-center justify-center">
          {settings ? (
            <p className="text-gray-400">
              {/* Later you’ll replace this with your Plotly chart */}
              Chart will render here for the given stock settings.
            </p>
          ) : (
            <p className="text-gray-400">No chart to display yet.</p>
          )}
        </section>

        {/* Settings + JSON Output */}
        <section className="space-y-8">
          <ChartSettingsPanel onUpdate={setSettings} />

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
