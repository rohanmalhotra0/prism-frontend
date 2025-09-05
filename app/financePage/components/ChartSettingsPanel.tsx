"use client";

import { useState, useRef, useEffect } from "react";

interface ChartSettings {
  symbol: string;
  chartType: string;
  overlays: string[];
  indicators: string[];
  timePeriod: string;
  data?: any[];
}

interface Props {
  onUpdate: (settings: ChartSettings) => void;
}

import { API_ENDPOINTS } from "@/lib/api-config";

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
  const [symbol, setSymbol] = useState("");
  const [search, setSearch] = useState("");
  const [chartType, setChartType] = useState("candlestick");
  const [overlays, setOverlays] = useState(["", "", ""]);
  const [indicators, setIndicators] = useState(["", "", ""]);
  const [timePeriod, setTimePeriod] = useState("Live"); // 🔹 default to Live
  const [showDropdown, setShowDropdown] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  // 🔹 Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, "Component unmounted");
        wsRef.current = null;
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔌 Close old WebSocket if switching
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const endDate = new Date();
    let startDate = new Date(endDate);

    switch (timePeriod) {
      case "1d": startDate.setDate(endDate.getDate() - 1); break;
      case "5d": startDate.setDate(endDate.getDate() - 5); break;
      case "1mo": startDate.setMonth(endDate.getMonth() - 1); break;
      case "3mo": startDate.setMonth(endDate.getMonth() - 3); break;
      case "6mo": startDate.setMonth(endDate.getMonth() - 6); break;
      case "1y": startDate.setFullYear(endDate.getFullYear() - 1); break;
      case "2y": startDate.setFullYear(endDate.getFullYear() - 2); break;
      case "5y": startDate.setFullYear(endDate.getFullYear() - 5); break;
      case "ytd": startDate = new Date(endDate.getFullYear(), 0, 1); break;
      default: startDate.setFullYear(endDate.getFullYear() - 1);
    }

    const payload: ChartSettings & { start: string; end: string } = {
      symbol: (symbol || search).toUpperCase(),
      chartType,
      overlays: overlays.filter((o) => o),
      indicators: indicators.filter((i) => i),
      timePeriod,
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };

    // 🔹 Live Mode
    if (timePeriod === "Live") {
      try {
        const wsUrl = API_ENDPOINTS.WEBSOCKET(payload.symbol);
        console.log("🔌 Opening WS:", wsUrl);

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => console.log(`✅ Live stream opened for ${payload.symbol}`);

        ws.onmessage = (event) => {
          const candles = JSON.parse(event.data);
          if (Array.isArray(candles)) {
            console.log(`📊 Received ${candles.length} candles`);
            onUpdate({ ...payload, data: candles });
          } else {
            console.warn("Unexpected WS payload:", candles);
          }
        };

        ws.onerror = (err) => console.error("❌ WebSocket error:", err);
        ws.onclose = () => console.log(`🔌 WebSocket closed for ${payload.symbol}`);
      } catch (err) {
        console.error("❌ Error connecting WebSocket:", err);
        alert("Failed to connect to live feed.");
      }
      return;
    }

    // 🔹 Historical Mode
    try {
      const res = await fetch(API_ENDPOINTS.FINANCE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const result = await res.json();

      onUpdate({ ...payload, data: result.data });
    } catch (err) {
      console.error("❌ Error fetching chart data:", err);
      alert("Failed to fetch chart data.");
    }
  };

  const filteredStocks = popularStocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-10 shadow-2xl text-white"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Chart Settings
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Stock Picker */}
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-2">Choose Stock</label>
            <input
              type="text"
              placeholder="e.g. AAPL, Tesla"
              value={search || symbol}
              onChange={(e) => {
                setSearch(e.target.value);
                setSymbol("");
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30"
            />
            {showDropdown && search && (
              <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-white/20 bg-black/90 backdrop-blur-xl shadow-xl z-20">
                {filteredStocks.map((s) => (
                  <div
                    key={s.symbol}
                    onClick={() => {
                      setSymbol(s.symbol);
                      setSearch(s.symbol);
                      setShowDropdown(false);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-purple-500/20"
                  >
                    <span className="font-semibold text-purple-300">{s.symbol}</span>{" "}
                    <span className="text-sm text-gray-400">— {s.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time Period */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Time Period</label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-black/40 p-4 text-white"
            >
              <option value="Live">Live (Streaming)</option>
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
            <label className="block text-sm text-gray-300 mb-2">Chart Type</label>
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

        {/* Right Column */}
        <div className="space-y-6">
          {/* Overlays */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Overlays (up to 3)</label>
            {overlays.map((ov, i) => (
              <select
                key={i}
                value={ov}
                onChange={(e) => handleOverlayChange(i, e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/40 p-3 text-white mb-2"
              >
                <option value="">-- Select Overlay --</option>
                <option value="ema20">EMA (20)</option>
                <option value="sma50">SMA (50)</option>
                <option value="sma200">SMA (200)</option>
                <option value="bollinger">Bollinger Bands</option>
              </select>
            ))}
          </div>

          {/* Indicators */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Indicators (up to 3)</label>
            {indicators.map((ind, i) => (
              <select
                key={i}
                value={ind}
                onChange={(e) => handleIndicatorChange(i, e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/40 p-3 text-white mb-2"
              >
                <option value="">-- Select Indicator --</option>
                <option value="rsi">RSI</option>
                <option value="macd">MACD</option>
                <option value="volume">Volume</option>
                <option value="atr">ATR</option>
                <option value="roc">ROC</option>
                <option value="stochastic">Stochastic</option>
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 px-6 py-4 font-bold text-white shadow-xl hover:scale-[1.02] transition"
      >
        Update Chart
      </button>
    </form>
  );
}
