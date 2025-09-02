"use client";

import { useState, useEffect, useRef } from "react";

interface ThreeDSettings {
  // 2D Chart Settings
  symbol: string;
  chartType: string;
  overlays: string[];
  indicators: string[];
  timePeriod: string;
  data?: any[];  // backend OHLC + indicators
  
  // 3D Specific Settings
  x: number;  // X-axis scaling (time/position)
  y: number;  // Y-axis scaling (price/height)
  z: number;  // Z-axis scaling (indicators/depth)
}

interface Props {
  onUpdate: (settings: ThreeDSettings) => void;
  currentSettings?: any;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
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
  const [chartType, setChartType] = useState(currentSettings?.chartType || "candlestick");
  const [overlays, setOverlays] = useState(currentSettings?.overlays || ["", "", ""]);
  const [indicators, setIndicators] = useState(currentSettings?.indicators || ["", "", ""]);
  const [timePeriod, setTimePeriod] = useState(currentSettings?.timePeriod || "1y");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 3D specific settings - use current settings or defaults
  const [xScale, setXScale] = useState(currentSettings?.x || 1.0);
  const [yScale, setYScale] = useState(currentSettings?.y || 1.0);
  const [zScale, setZScale] = useState(currentSettings?.z || 1.0);

  // Update state when currentSettings change (when switching from 2D to 3D)
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

    const settings: ThreeDSettings = {
      symbol: symbol.trim().toUpperCase(),
      chartType,
      overlays: overlays.filter((o: string) => o),
      indicators: indicators.filter((i: string) => i),
      timePeriod,
      x: xScale,
      y: yScale,
      z: zScale,
    };

    try {
      const response = await fetch(`${API_BASE}/finance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chart data. Is the backend running?");
      }

      const data = await response.json();
      console.log("Backend returned:", data);

      onUpdate({
        ...settings,
        symbol: data.symbol,
        data: data.data,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Handle 3D settings update without fetching new data
  const handle3DUpdate = () => {
    if (currentSettings && currentSettings.data) {
      // If we have existing data, just update the 3D settings
      onUpdate({
        ...currentSettings,
        x: xScale,
        y: yScale,
        z: zScale,
        chartType,
      });
    } else {
      // If no existing data, fetch new data
      handleSubmit();
    }
  };

  const filteredStocks = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
    stock.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">🎯 3D Chart Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - 2D Settings */}
        <div className="space-y-6">
          {/* Stock Selection */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Choose Stock
            </label>
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="e.g. AAPL, Tesla"
                className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
              />
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-white/20 rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        setSymbol(stock.symbol);
                        setSearch(stock.symbol);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700 text-white border-b border-white/10 last:border-b-0"
                    >
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-sm text-gray-400">{stock.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Time Period */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Time Period
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
            >
              <option value="Live">1 Day</option>
              <option value="1d">1 Day</option>
              <option value="5d">1 Week</option>
              <option value="1mo">1 Month</option>
              <option value="3mo">3 Months</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
              <option value="ytd">Year-to-Date</option>
            </select>
          </div>

          {/* Chart Type */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Chart Type
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
            >
              <option value="candlestick">Candlestick</option>
              <option value="ohlc">OHLC</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
              <option value="scatter">Scatter</option>
            </select>
          </div>
        </div>

        {/* Right Column - Overlays & Indicators */}
        <div className="space-y-6">
          {/* Overlays */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Overlays (up to 3)
            </label>
            {overlays.map((overlay: string, i: number) => (
              <select
                key={i}
                value={overlay}
                onChange={(e) => handleOverlayChange(i, e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white mb-2"
              >
                <option value="">-- Select Overlay --</option>
                <option value="SMA_20">SMA 20</option>
                <option value="SMA_50">SMA 50</option>
                <option value="SMA_200">SMA 200</option>
                <option value="EMA_12">EMA 12</option>
                <option value="EMA_26">EMA 26</option>
                <option value="BB_upper">Bollinger Upper</option>
                <option value="BB_lower">Bollinger Lower</option>
              </select>
            ))}
          </div>

          {/* Indicators */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Indicators (up to 3)
            </label>
            {indicators.map((indicator: string, i: number) => (
              <select
                key={i}
                value={indicator}
                onChange={(e) => handleIndicatorChange(i, e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white mb-2"
              >
                <option value="">-- Select Indicator --</option>
                <option value="RSI">RSI</option>
                <option value="MACD">MACD</option>
                <option value="MACD_signal">MACD Signal</option>
                <option value="MACD_histogram">MACD Histogram</option>
                <option value="Stoch_K">Stochastic %K</option>
                <option value="Stoch_D">Stochastic %D</option>
                <option value="Williams_R">Williams %R</option>
                <option value="CCI">CCI</option>
                <option value="ATR">ATR</option>
                <option value="ADX">ADX</option>
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Controls */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">3D Axis Controls</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* X-Axis (Time) */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              X-Axis (Time Period)
            </label>
            <input
              type="number"
              min="0.1"
              max="3.0"
              step="0.1"
              value={xScale}
              onChange={(e) => setXScale(parseFloat(e.target.value) || 1.0)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
              placeholder="1.0"
            />
          </div>

          {/* Y-Axis (Price) */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Y-Axis (Price/Height)
            </label>
            <input
              type="number"
              min="0.1"
              max="3.0"
              step="0.1"
              value={yScale}
              onChange={(e) => setYScale(parseFloat(e.target.value) || 1.0)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
              placeholder="1.0"
            />
          </div>

          {/* Z-Axis (Indicators) */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Z-Axis (Indicators/Depth)
            </label>
            <input
              type="number"
              min="0.1"
              max="3.0"
              step="0.1"
              value={zScale}
              onChange={(e) => setZScale(parseFloat(e.target.value) || 1.0)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
              placeholder="1.0"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
        >
          {currentSettings?.data ? "Fetch New Data" : "Generate 3D Chart"}
        </button>
        
        {currentSettings?.data && (
          <button
            onClick={handle3DUpdate}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            Update 3D View
          </button>
        )}
        
        <button
          onClick={() => {
            setXScale(1.0);
            setYScale(1.0);
            setZScale(1.0);
          }}
          className="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
        >
          Reset 3D
        </button>
      </div>
    </div>
  );
}
