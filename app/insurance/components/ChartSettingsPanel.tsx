"use client";

import { useState } from "react";

interface InsuranceSettings {
  modelType: string;
  riskFactors: string[];
  timeHorizon: string;
  portfolio: string[];
  stressTests: string[];
  metrics: string[];
}

interface Props {
  onUpdate: (settings: InsuranceSettings) => void;
}

export default function InsuranceSettingsPanel({ onUpdate }: Props) {
  const [modelType, setModelType] = useState("stochastic");
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [timeHorizon, setTimeHorizon] = useState("1y");
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [stressTests, setStressTests] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      modelType,
      riskFactors,
      timeHorizon,
      portfolio,
      stressTests,
      metrics,
    });
  };

  const toggleValue = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-10 shadow-2xl text-white"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
        Insurance Settings
      </h2>

      {/* Model Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Model Type</label>
        <select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-black/50 p-3"
        >
          <option value="stochastic">Stochastic</option>
          <option value="deterministic">Deterministic</option>
          <option value="monteCarlo">Monte Carlo</option>
        </select>
      </div>

      {/* Time Horizon */}
      <div>
        <label className="block text-sm font-medium mb-2">Time Horizon</label>
        <select
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-black/50 p-3"
        >
          <option value="6m">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="5y">5 Years</option>
          <option value="10y">10 Years</option>
        </select>
      </div>

      {/* Risk Factors */}
      <div>
        <label className="block text-sm font-medium mb-2">Risk Factors</label>
        <div className="flex flex-wrap gap-3">
          {["Mortality", "Morbidity", "Lapse", "Expense"].map(factor => (
            <button
              type="button"
              key={factor}
              onClick={() => toggleValue(riskFactors, setRiskFactors, factor)}
              className={`px-3 py-1 rounded-full border ${
                riskFactors.includes(factor)
                  ? "bg-purple-600 border-purple-400"
                  : "bg-black/50 border-white/20"
              }`}
            >
              {factor}
            </button>
          ))}
        </div>
      </div>

      {/* Stress Tests */}
      <div>
        <label className="block text-sm font-medium mb-2">Stress Tests</label>
        <div className="flex flex-wrap gap-3">
          {["Interest Shock", "Equity Crash", "Pandemic"].map(test => (
            <button
              type="button"
              key={test}
              onClick={() => toggleValue(stressTests, setStressTests, test)}
              className={`px-3 py-1 rounded-full border ${
                stressTests.includes(test)
                  ? "bg-blue-600 border-blue-400"
                  : "bg-black/50 border-white/20"
              }`}
            >
              {test}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div>
        <label className="block text-sm font-medium mb-2">Metrics</label>
        <div className="flex flex-wrap gap-3">
          {["VaR", "CTE", "Solvency Ratio"].map(metric => (
            <button
              type="button"
              key={metric}
              onClick={() => toggleValue(metrics, setMetrics, metric)}
              className={`px-3 py-1 rounded-full border ${
                metrics.includes(metric)
                  ? "bg-green-600 border-green-400"
                  : "bg-black/50 border-white/20"
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio (free text for now) */}
      <div>
        <label className="block text-sm font-medium mb-2">Portfolio</label>
        <textarea
          value={portfolio.join("\n")}
          onChange={(e) => setPortfolio(e.target.value.split("\n"))}
          placeholder="Enter portfolio items, one per line"
          className="w-full rounded-lg border border-white/20 bg-black/50 p-3"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-bold text-white hover:from-purple-500 hover:to-blue-500 transition"
        >
          Update Insurance Settings
        </button>
      </div>
    </form>
  );
}
