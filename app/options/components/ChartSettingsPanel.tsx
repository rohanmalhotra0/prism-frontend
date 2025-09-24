"use client";

import { useState } from "react";

interface ChartSettings {
  underlying: string;
  chartType: string;
  optionType: string;
  strikePrice: string;
  expiration: string;
  data?: any[];
}

interface Props {
  onUpdate: (settings: ChartSettings) => void;
}

const popularOptions = [
  { symbol: "SPY", name: "SPDR S&P 500 ETF" },
  { symbol: "QQQ", name: "Invesco QQQ Trust" },
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NFLX", name: "Netflix Inc." },
];

export default function ChartSettingsPanel({ onUpdate }: Props) {
  const [underlying, setUnderlying] = useState("");
  const [search, setSearch] = useState("");
  const [chartType, setChartType] = useState("options_chain");
  const [optionType, setOptionType] = useState("call");
  const [strikePrice, setStrikePrice] = useState("");
  const [expiration, setExpiration] = useState("30");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUpdate = () => {
    const settings: ChartSettings = {
      underlying: underlying || "SPY",
      chartType,
      optionType,
      strikePrice: strikePrice || "ATM",
      expiration: `${expiration}d`,
    };
    onUpdate(settings);
  };

  const filteredOptions = popularOptions.filter(option =>
    option.symbol.toLowerCase().includes(search.toLowerCase()) ||
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 
      backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Options Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Underlying Asset */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Underlying Asset</label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Search assets..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredOptions.map((option) => (
                  <button
                    key={option.symbol}
                    onClick={() => {
                      setUnderlying(option.symbol);
                      setSearch(option.symbol);
                      setShowDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex justify-between"
                  >
                    <span className="font-medium">{option.symbol}</span>
                    <span className="text-gray-400 text-sm">{option.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="options_chain">Options Chain</option>
            <option value="greeks">Greeks Analysis</option>
            <option value="volatility">Volatility Surface</option>
            <option value="p&l">P&L Diagram</option>
          </select>
        </div>

        {/* Option Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Option Type</label>
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="call">Call Options</option>
            <option value="put">Put Options</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Strike Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Strike Price</label>
          <input
            type="text"
            value={strikePrice}
            onChange={(e) => setStrikePrice(e.target.value)}
            placeholder="e.g., 400 or ATM"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Expiration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Days to Expiration</label>
          <select
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
          </select>
        </div>

        {/* Update Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 opacity-0">Update</label>
          <button
            onClick={handleUpdate}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Update Chart
          </button>
        </div>
      </div>
    </section>
  );
}
