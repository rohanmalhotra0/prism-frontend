"use client";

import { useState } from "react";

export default function AnalyticsComponent() {
  const [selectedMetric, setSelectedMetric] = useState("performance");
  const [timeRange, setTimeRange] = useState("1y");

  const metrics = [
    { id: "performance", name: "Performance", icon: "•", color: "from-green-500 to-emerald-500" },
    { id: "risk", name: "Risk Metrics", icon: "•", color: "from-red-500 to-pink-500" },
    { id: "correlation", name: "Correlation", icon: "🔗", color: "from-blue-500 to-cyan-500" },
    { id: "volatility", name: "Volatility", icon: "•", color: "from-purple-500 to-indigo-500" },
  ];

  const timeRanges = [
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
    { value: "3y", label: "3 Years" },
    { value: "5y", label: "5 Years" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h2>
        <p className="text-gray-400 text-lg">
          Comprehensive financial analytics and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metrics Overview */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Return</span>
                  <span className="text-green-400 font-bold">+24.5%</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sharpe Ratio</span>
                  <span className="text-blue-400 font-bold">1.85</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Max Drawdown</span>
                  <span className="text-red-400 font-bold">-8.2%</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Volatility</span>
                  <span className="text-purple-400 font-bold">12.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time Range</h3>
            <div className="grid grid-cols-2 gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    timeRange === range.value
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Performance Chart</h3>
              <div className="flex gap-2">
                {metrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedMetric === metric.id
                        ? `bg-gradient-to-r ${metric.color} text-white`
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20"
                    }`}
                  >
                    {metric.icon}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl border border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">•</div>
                <p className="text-gray-300 text-lg mb-2">{selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Analysis</p>
                <p className="text-gray-400 text-sm">Interactive chart will render here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Risk Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">VaR (95%)</span>
              <span className="text-white">-2.1%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expected Shortfall</span>
              <span className="text-white">-3.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Beta</span>
              <span className="text-white">0.87</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Allocation</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Equities</span>
              <span className="text-white">65%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bonds</span>
              <span className="text-white">25%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Alternatives</span>
              <span className="text-white">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
