"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";

interface ThreeDSettings {
  symbol: string;
  chartType: "candlestick" | "area"; // match backend/frontend
  overlays: string[];
  indicators: string[];
  timePeriod: string;
  data?: any[];
  x: number;
  y: number;
  z: number;
}

interface Props {
  onUpdate: (settings: ThreeDSettings) => void;
  currentSettings?: any;
}

const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase" },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "NFLX", name: "Netflix Inc." },
];

export default function ThreeDChartSettingsPanel({ onUpdate, currentSettings }: Props) {
  const [symbol, setSymbol] = useState(currentSettings?.symbol || "");
  const [search, setSearch] = useState(currentSettings?.symbol || "");
  const [chartType, setChartType] = useState<"candlestick" | "area">(
    currentSettings?.chartType || "candlestick"
  );
  const [overlays, setOverlays] = useState(currentSettings?.overlays || ["", "", ""]);
  const [indicators, setIndicators] = useState(currentSettings?.indicators || ["", "", ""]);
  const [timePeriod, setTimePeriod] = useState(currentSettings?.timePeriod || "1y");
  const [showDropdown, setShowDropdown] = useState(false);

  // 3D scaling
  const [xScale, setXScale] = useState(currentSettings?.x || 1.0);
  const [yScale, setYScale] = useState(currentSettings?.y || 1.0);
  const [zScale, setZScale] = useState(currentSettings?.z || 1.0);

  useEffect(() => {
    if (currentSettings) {
      setSymbol(currentSettings.symbol || "");
      setSearch(currentSettings.symbol || "");
      setChartType(currentSettings.chartType || "candlestick");
      setOverlays(currentSettings.overlays || ["", "", ""]);
      setIndicators(currentSettings.indicators || ["", "", ""]);
      setTimePeriod(currentSettings.timePeriod || "1y");
      setXScale(currentSettings.x || 1.0);
      setYScale(currentSettings.y || 1.0);
      setZScale(currentSettings.z || 1.0);
    }
  }, [currentSettings]);

  const handleOverlayChange = (i: number, value: string) => {
    const updated = [...overlays];
    updated[i] = value;
    setOverlays(updated);
  };

  const handleIndicatorChange = (i: number, value: string) => {
    const updated = [...indicators];
    updated[i] = value;
    setIndicators(updated);
  };

  const handleSubmit = async () => {
    if (!symbol.trim()) {
      alert("Please enter a stock symbol");
      return;
    }

    const endDate = new Date();
    let startDate = new Date(endDate);

    switch (timePeriod) {
      case "1d":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "5d":
        startDate.setDate(endDate.getDate() - 5);
        break;
      case "1mo":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case "3mo":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "6mo":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "2y":
        startDate.setFullYear(endDate.getFullYear() - 2);
        break;
      case "5y":
        startDate.setFullYear(endDate.getFullYear() - 5);
        break;
      case "ytd":
        startDate = new Date(endDate.getFullYear(), 0, 1);
        break;
      default:
        startDate.setFullYear(endDate.getFullYear() - 1);
    }

    const settings: ThreeDSettings & { start: string; end: string } = {
      symbol: symbol.trim().toUpperCase(),
      chartType,
      overlays: overlays.filter((o: string) => o),
      indicators: indicators.filter((i: string) => i),
      timePeriod,
      x: xScale,
      y: yScale,
      z: zScale,
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };

    try {
      const response = await fetch(API_ENDPOINTS.FINANCE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error(`Failed: ${response.status} ${response.statusText}`);

      const data = await response.json();
      if (!data.data?.length) throw new Error("No data returned");

      onUpdate({ ...settings, data: data.data });
    } catch (error: any) {
      console.error("Data fetch error:", error);
      alert(`Error fetching data: ${error.message}`);
    }
  };

  const filteredStocks = popularStocks.filter((s) =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">3D Chart Settings</h2>

      {/* Stock Symbol */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Stock Symbol</label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSymbol(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search stocks (e.g., AAPL, GOOGL)"
            className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-white/20 rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => {
                    setSymbol(stock.symbol);
                    setSearch(stock.symbol);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors"
                >
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm text-gray-400">{stock.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart Type */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Chart Type</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "candlestick" | "area")}
          className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="candlestick">Candlestick</option>
          <option value="area">Area</option>
        </select>
      </div>

      {/* Time Period */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Time Period</label>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="1d">1 Day</option>
          <option value="5d">5 Days</option>
          <option value="1mo">1 Month</option>
          <option value="3mo">3 Months</option>
          <option value="6mo">6 Months</option>
          <option value="1y">1 Year</option>
          <option value="2y">2 Years</option>
          <option value="5y">5 Years</option>
          <option value="ytd">Year to Date</option>
        </select>
      </div>

      {/* Overlays */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Overlays</label>
        {overlays.map((overlay: string, i: number) => (
          <select
            key={i}
            value={overlay}
            onChange={(e) => handleOverlayChange(i, e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-black/40 p-3 text-white mb-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">None</option>
            <option value="sma20">SMA 20</option>
            <option value="sma50">SMA 50</option>
            <option value="ema20">EMA 20</option>
            <option value="ema50">EMA 50</option>
            <option value="bollinger">Bollinger Bands</option>
            <option value="keltner">Keltner Channels</option>
          </select>
        ))}
      </div>

      {/* Indicators */}
      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Indicators</label>
        {indicators.map((indicator: string, i: number) => (
          <select
            key={i}
            value={indicator}
            onChange={(e) => handleIndicatorChange(i, e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-black/40 p-3 text-white mb-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">None</option>
            <option value="rsi">RSI</option>
            <option value="macd">MACD</option>
            <option value="atr">ATR</option>
            <option value="roc">ROC</option>
            <option value="stochastic">Stochastic</option>
            <option value="cci">CCI</option>
            <option value="adx">ADX</option>
            <option value="obv">OBV</option>
          </select>
        ))}
      </div>

      {/* 3D Scaling */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">3D Scaling</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">X Scale</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={xScale}
              onChange={(e) => setXScale(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-400 text-center mt-1">{xScale.toFixed(1)}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Y Scale</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={yScale}
              onChange={(e) => setYScale(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-400 text-center mt-1">{yScale.toFixed(1)}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Z Scale</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zScale}
              onChange={(e) => setZScale(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-400 text-center mt-1">{zScale.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Generate Chart Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Generate 3D Chart
      </button>
    </div>
  );
}
