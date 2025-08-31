"use client";

import { useState } from "react";

interface ChartSettings {
  stock: string;
  chartType: string;
  overlays: string[];
  indicators: string[];
  timePeriod: string;
}

interface Props {
  onUpdate: (settings: ChartSettings) => void;
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

export default function ChartSettingsPanel({ onUpdate }: Props) {
  const [stock, setStock] = useState("");
  const [search, setSearch] = useState("");
  const [chartType, setChartType] = useState("candlestick");
  const [overlays, setOverlays] = useState(["", "", ""]);
  const [indicators, setIndicators] = useState(["", "", ""]);
  const [timePeriod, setTimePeriod] = useState("1y");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      stock: stock || search.toUpperCase(),
      chartType,
      overlays: overlays.filter((o) => o !== ""),
      indicators: indicators.filter((i) => i !== ""),
      timePeriod,
    });
  };

  const filteredStocks = popularStocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-8 shadow-xl text-white"
    >
      <h2 className="text-2xl font-bold tracking-tight text-left mb-4">
        Chart Settings
      </h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Stock Picker */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-medium text-gray-300">Choose Stock</label>
            <input
              type="text"
              placeholder="Type symbol or company (e.g. AAPL, Tesla)"
              value={search || stock}
              onChange={(e) => {
                setSearch(e.target.value);
                setStock("");
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
              className="rounded-md border border-gray-700 bg-gray-800 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
            />

            {showDropdown && search && (
              <div className="absolute top-full mt-1 z-10 w-full max-h-52 overflow-y-auto rounded-md border border-gray-700 bg-gray-900 shadow-lg">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((s) => (
                    <div
                      key={s.symbol}
                      onClick={() => {
                        setStock(s.symbol);
                        setSearch(s.symbol);
                        setShowDropdown(false);
                      }}
                      className="cursor-pointer px-4 py-2 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                      <span className="font-medium">{s.symbol}</span>{" "}
                      <span className="text-sm text-gray-400">— {s.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Hit Enter to Find Stock
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Time Period */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-300">Time Period</label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
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
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-300">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
            >
              <option value="candlestick">Candlestick</option>
              <option value="ohlc">OHLC</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="bar">Bar</option>
              <option value="histogram">Histogram</option>
              <option value="scatter">Scatter</option>
              <option value="scatter3d">3D Scatter</option>
              <option value="heatmap">Heatmap</option>
              <option value="bubble">Bubble Chart</option>
              <option value="waterfall">Waterfall</option>
              <option value="funnel">Funnel</option>
              <option value="pie">Pie</option>
              <option value="treemap">Treemap</option>
              <option value="sunburst">Sunburst</option>
              <option value="box">Box Plot</option>
              <option value="violin">Violin Plot</option>
            </select>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Overlays (3) */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-gray-300">Overlays (up to 3)</label>
            {overlays.map((ov, i) => (
              <select
                key={i}
                value={ov}
                onChange={(e) => handleOverlayChange(i, e.target.value)}
                className="rounded-md border border-gray-700 bg-gray-800 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">-- Select Overlay --</option>
                <option value="ema20">EMA (20)</option>
                <option value="sma50">SMA (50)</option>
                <option value="sma200">SMA (200)</option>
                <option value="bollinger">Bollinger Bands</option>
                <option value="keltner">Keltner Channels</option>
                <option value="donchian">Donchian Channels</option>
                <option value="ichimoku">Ichimoku Cloud</option>
                <option value="parabolicSAR">Parabolic SAR</option>
                <option value="vwap">VWAP</option>
                <option value="pivotPoints">Pivot Points</option>
                <option value="supertrend">Supertrend</option>
                <option value="envelopes">Envelopes</option>
                <option value="fibonacci">Fibonacci Retracement</option>
                <option value="hma">Hull Moving Average</option>
                <option value="wma">Weighted Moving Average</option>
              </select>
            ))}
          </div>

          {/* Indicators (3) */}
          <div className="flex flex-col gap-3">
            <label className="font-medium text-gray-300">Indicators (up to 3)</label>
            {indicators.map((ind, i) => (
              <select
                key={i}
                value={ind}
                onChange={(e) => handleIndicatorChange(i, e.target.value)}
                className="rounded-md border border-gray-700 bg-gray-800 p-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
              >
                <option value="">-- Select Indicator --</option>
                <option value="macd">MACD</option>
                <option value="rsi">RSI</option>
                <option value="volume">Volume</option>
                <option value="sma">SMA</option>
                <option value="ema">EMA</option>
                <option value="wma">WMA</option>
                <option value="bollinger">Bollinger Bands</option>
                <option value="stochastic">Stochastic</option>
                <option value="adx">ADX</option>
                <option value="atr">ATR</option>
                <option value="cci">CCI</option>
                <option value="obv">OBV</option>
                <option value="mfi">MFI</option>
                <option value="roc">ROC</option>
                <option value="vwma">VWMA</option>
                <option value="ichimoku">Ichimoku Cloud</option>
                <option value="parabolicSAR">Parabolic SAR</option>
                <option value="pivot">Pivot Points</option>
                <option value="fibRetracement">Fibonacci Retracement</option>
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full mt-6 rounded-lg bg-purple-600 px-4 py-3 font-semibold shadow-md transition hover:bg-purple-500 hover:shadow-lg focus:ring-2 focus:ring-purple-400"
      >
        Update Chart
      </button>
    </form>
  );
}
