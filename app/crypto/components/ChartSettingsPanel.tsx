"use client";

import { useState } from "react";

interface CryptoSettings {
  exchange: string;
  tradingPair: string;
  chartType: string;
  indicators: string[];
  timePeriod: string;
  onChainMetrics: string[];
  sentimentSources: string[];
}

interface Props {
  onUpdate: (settings: CryptoSettings) => void;
}

const exchanges = ["Binance", "Coinbase", "Kraken", "Bybit", "Bitfinex"];
const popularPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "ADA/USDT", "XRP/USDT"];

export default function CryptoSettingsPanel({ onUpdate }: Props) {
  const [exchange, setExchange] = useState("Binance");
  const [tradingPair, setTradingPair] = useState("BTC/USDT");
  const [chartType, setChartType] = useState("candlestick");
  const [indicators, setIndicators] = useState(["", "", ""]);
  const [timePeriod, setTimePeriod] = useState("1d");
  const [onChainMetrics, setOnChainMetrics] = useState(["", ""]);
  const [sentimentSources, setSentimentSources] = useState([""]);

  const handleIndicatorChange = (index: number, value: string) => {
    const updated = [...indicators];
    updated[index] = value;
    setIndicators(updated);
  };

  const handleOnChainChange = (index: number, value: string) => {
    const updated = [...onChainMetrics];
    updated[index] = value;
    setOnChainMetrics(updated);
  };

  const handleSentimentChange = (index: number, value: string) => {
    const updated = [...sentimentSources];
    updated[index] = value;
    setSentimentSources(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      exchange,
      tradingPair,
      chartType,
      indicators: indicators.filter((i) => i !== ""),
      timePeriod,
      onChainMetrics: onChainMetrics.filter((m) => m !== ""),
      sentimentSources: sentimentSources.filter((s) => s !== ""),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative space-y-8 rounded-3xl border border-white/10 
                 bg-black/40 backdrop-blur-2xl p-10 shadow-2xl text-white"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Crypto Chart Settings
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* Exchange */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              Exchange
            </label>
            <select
              value={exchange}
              onChange={(e) => setExchange(e.target.value)}
              className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
            >
              {exchanges.map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          {/* Trading Pair */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              Trading Pair
            </label>
            <select
              value={tradingPair}
              onChange={(e) => setTradingPair(e.target.value)}
              className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
            >
              {popularPairs.map((pair) => (
                <option key={pair} value={pair}>{pair}</option>
              ))}
            </select>
          </div>

          {/* Time Period */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              Time Period
            </label>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
            >
              <option value="1h">1 Hour</option>
              <option value="4h">4 Hours</option>
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
            </select>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Indicators */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              Indicators (up to 3)
            </label>
            {indicators.map((ind, i) => (
              <select
                key={i}
                value={ind}
                onChange={(e) => handleIndicatorChange(i, e.target.value)}
                className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
              >
                <option value="">-- Select Indicator --</option>
                <option value="rsi">RSI</option>
                <option value="macd">MACD</option>
                <option value="bollinger">Bollinger Bands</option>
                <option value="movingAverage">Moving Average</option>
                <option value="stochastic">Stochastic Oscillator</option>
              </select>
            ))}
          </div>

          {/* On-chain Metrics */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              On-chain Metrics (up to 2)
            </label>
            {onChainMetrics.map((metric, i) => (
              <select
                key={i}
                value={metric}
                onChange={(e) => handleOnChainChange(i, e.target.value)}
                className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
              >
                <option value="">-- Select Metric --</option>
                <option value="activeAddresses">Active Addresses</option>
                <option value="txVolume">Transaction Volume</option>
                <option value="hashRate">Hash Rate</option>
                <option value="supplyOnExchanges">Supply on Exchanges</option>
                <option value="mvrv">MVRV Ratio</option>
              </select>
            ))}
          </div>

          {/* Sentiment Sources */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-200 text-sm uppercase tracking-wider">
              Sentiment Sources
            </label>
            {sentimentSources.map((src, i) => (
              <select
                key={i}
                value={src}
                onChange={(e) => handleSentimentChange(i, e.target.value)}
                className="rounded-xl border border-white/20 bg-black/40 p-3 text-white"
              >
                <option value="">-- Select Sentiment Source --</option>
                <option value="twitter">Twitter</option>
                <option value="reddit">Reddit</option>
                <option value="news">News Articles</option>
                <option value="fundingRates">Funding Rates</option>
              </select>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg hover:scale-[1.02] transition-transform"
        >
          Update Crypto Chart
        </button>
      </div>
    </form>
  );
}
