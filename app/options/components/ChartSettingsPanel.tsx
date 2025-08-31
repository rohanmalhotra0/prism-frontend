"use client";

import { useState } from "react";

interface ChartSettings {
  underlying: string;
  chartType: string;
  overlays: string[];
  indicators: string[];
  timePeriod: string;
  optionsData: string[];
  volatilityMetrics: string[];
}

interface Props {
  onUpdate: (settings: ChartSettings) => void;
}

const popularUnderlyings = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "IWM", name: "iShares Russell 2000 ETF" },
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "AMD", name: "Advanced Micro Devices" },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
];

export default function ChartSettingsPanel({ onUpdate }: Props) {
  const [underlying, setUnderlying] = useState("");
  const [search, setSearch] = useState("");
  const [chartType, setChartType] = useState("candlestick");
  const [overlays, setOverlays] = useState(["", "", ""]);
  const [indicators, setIndicators] = useState(["", "", ""]);
  const [timePeriod, setTimePeriod] = useState("1mo");
  const [optionsData, setOptionsData] = useState(["", "", ""]);
  const [volatilityMetrics, setVolatilityMetrics] = useState(["", "", ""]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOverlayChange = (index: number, value: string) => {
    const updated = [...overlays];
    updated[index] = value;
    setOverlays(updated);
  };

  const handleIndicatorChange = (index: number, value: string) => {
    const updated = [...indicators];
    updated[index] = value;
    setIndicators(updated);
  };

  const handleOptionsDataChange = (index: number, value: string) => {
    const updated = [...optionsData];
    updated[index] = value;
    setOptionsData(updated);
  };

  const handleVolatilityMetricsChange = (index: number, value: string) => {
    const updated = [...volatilityMetrics];
    updated[index] = value;
    setVolatilityMetrics(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      underlying: underlying || search.toUpperCase(),
      chartType,
      overlays: overlays.filter((o) => o !== ""),
      indicators: indicators.filter((i) => i !== ""),
      timePeriod,
      optionsData: optionsData.filter((o) => o !== ""),
      volatilityMetrics: volatilityMetrics.filter((v) => v !== ""),
    });
  };

  const filteredUnderlyings = popularUnderlyings.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl blur-xl opacity-60"></div>
      
      {/* Main container with glassmorphism */}
      <form
        onSubmit={handleSubmit}
        className="relative space-y-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-10 shadow-2xl text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.6) 50%, rgba(0,0,0,0.8) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
        
        {/* Header with enhanced styling */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-left mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Options Chart Settings
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Two-column layout with enhanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* LEFT SIDE */}
          <div className="space-y-7">
            {/* Underlying Picker */}
            <div className="flex flex-col gap-3 relative group">
              <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Choose Underlying
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type symbol or company (e.g. SPY, AAPL)"
                  value={search || underlying}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setUnderlying("");
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                  className="w-full rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 hover:border-white/30"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {showDropdown && search && (
                <div className="absolute top-full mt-2 z-20 w-full max-h-60 overflow-y-auto rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl">
                  {filteredUnderlyings.length > 0 ? (
                    filteredUnderlyings.map((s) => (
                      <div
                        key={s.symbol}
                        onClick={() => {
                          setUnderlying(s.symbol);
                          setSearch(s.symbol);
                          setShowDropdown(false);
                        }}
                        className="cursor-pointer px-4 py-3 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:text-white transition-all duration-200 border-b border-white/5 last:border-b-0"
                      >
                        <span className="font-semibold text-purple-300">{s.symbol}</span>{" "}
                        <span className="text-sm text-gray-400">— {s.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 italic">
                      Hit Enter to Find Underlying
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Time Period */}
            <div className="flex flex-col gap-3 group">
              <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Time Period
              </label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 hover:border-white/30 cursor-pointer"
              >
                <option value="1d">1 Day</option>
                <option value="5d">5 Days</option>
                <option value="1mo">1 Month</option>
                <option value="3mo">3 Months</option>
                <option value="6mo">6 Months</option>
                <option value="1y">1 Year</option>
                <option value="2y">2 Years</option>
                <option value="5y">5 Years</option>
                <option value="10y">10 Years</option>
                <option value="ytd">Year-to-Date</option>
                <option value="max">Max</option>
              </select>
            </div>

            {/* Chart Type */}
            <div className="flex flex-col gap-3 group">
              <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 hover:border-white/30 cursor-pointer"
              >
                <option value="candlestick">Candlestick</option>
                <option value="ohlc">OHLC</option>
                <option value="line">Line</option>
                <option value="area">Area</option>
                <option value="bar">Bar</option>
                <option value="volume">Volume</option>
                <option value="optionsChain">Options Chain</option>
                <option value="greeks">Greeks Chart</option>
                <option value="ivSurface">IV Surface</option>
                <option value="pcr">Put-Call Ratio</option>
              </select>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-7">
            {/* Options Data (3) */}
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Options Data (up to 3)
              </label>
              {optionsData.map((opt, i) => (
                <select
                  key={i}
                  value={opt}
                  onChange={(e) => handleOptionsDataChange(i, e.target.value)}
                  className="rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 hover:border-white/30 cursor-pointer"
                >
                  <option value="">-- Select Options Data --</option>
                  <option value="openInterest">Open Interest</option>
                  <option value="volume">Volume</option>
                  <option value="putCallRatio">Put-Call Ratio</option>
                  <option value="ivPercentile">IV Percentile</option>
                  <option value="ivRank">IV Rank</option>
                  <option value="delta">Delta</option>
                  <option value="gamma">Gamma</option>
                  <option value="theta">Theta</option>
                  <option value="vega">Vega</option>
                  <option value="rho">Rho</option>
                  <option value="maxPain">Max Pain</option>
                  <option value="gammaExposure">Gamma Exposure</option>
                  <option value="vanna">Vanna</option>
                  <option value="charm">Charm</option>
                </select>
              ))}
            </div>

            {/* Volatility Metrics (3) */}
            <div className="flex flex-col gap-3">
              <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Volatility Metrics (up to 3)
              </label>
              {volatilityMetrics.map((vol, i) => (
                <select
                  key={i}
                  value={vol}
                  onChange={(e) => handleVolatilityMetricsChange(i, e.target.value)}
                  className="rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm p-4 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none transition-all duration-300 hover:border-white/30 cursor-pointer"
                >
                  <option value="">-- Select Volatility Metric --</option>
                  <option value="iv30">30-Day IV</option>
                  <option value="iv60">60-Day IV</option>
                  <option value="iv90">90-Day IV</option>
                  <option value="ivSkew">IV Skew</option>
                  <option value="ivTerm">IV Term Structure</option>
                  <option value="realizedVol">Realized Volatility</option>
                  <option value="volOfVol">Volatility of Volatility</option>
                  <option value="vix">VIX Correlation</option>
                  <option value="volRegime">Volatility Regime</option>
                  <option value="volSurface">Volatility Surface</option>
                </select>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Options Settings */}
        <div className="relative z-10 space-y-6">
          <h3 className="text-xl font-semibold text-gray-200 border-b border-white/20 pb-2">
            Advanced Options Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strike Range */}
            <div className="flex flex-col gap-3">
              <label className="font-medium text-gray-300">Strike Range</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min Strike"
                  className="flex-1 rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm p-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Strike"
                  className="flex-1 rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm p-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none"
                />
              </div>
            </div>

            {/* Expiration Filter */}
            <div className="flex flex-col gap-3">
              <label className="font-medium text-gray-300">Expiration Filter</label>
              <select className="rounded-lg border border-white/20 bg-black/40 backdrop-blur-sm p-3 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-none">
                <option value="all">All Expirations</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="leaps">LEAPS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced submit button */}
        <div className="relative z-10 pt-4">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:from-purple-500 hover:via-purple-400 hover:to-blue-500 hover:shadow-purple-500/25 hover:scale-[1.02] focus:ring-4 focus:ring-purple-400/30 focus:outline-none active:scale-[0.98]"
            style={{
              boxShadow: '0 10px 40px -10px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            Update Options Chart
          </button>
        </div>
      </form>
    </div>
  );
}
