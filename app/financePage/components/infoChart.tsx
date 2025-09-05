"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";

interface Fundamentals {
  market_cap?: number | null;
  pe_ratio?: number | null;
  dividend_yield?: number | null;
  average_volume?: number | null;

  high_today?: number | null;
  low_today?: number | null;
  open_price?: number | null;
  last_close?: number | null;
  volume?: number | null;

  fifty_two_week_high?: number | null;
  fifty_two_week_low?: number | null;
}

interface Props {
  symbol: string;
  live?: boolean; // auto-refresh every 30s if true
}

export default function InfoChart({ symbol, live = false }: Props) {
  const [fundamentals, setFundamentals] = useState<Fundamentals | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFundamentals = async () => {
    if (!symbol) return;
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.FUNDAMENTALS(symbol));
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);

      const data = await res.json();
      console.log("📊 Fundamentals API returned:", data);

      // ✅ Using flat object (no .metrics anymore)
      setFundamentals(data);
    } catch (err) {
      console.error("❌ Error fetching fundamentals:", err);
      setFundamentals(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when component mounts or symbol changes
  useEffect(() => {
    fetchFundamentals();
  }, [symbol]);

  // Poll every 30s if live mode is enabled
  useEffect(() => {
    if (!live) return;
    const interval = setInterval(fetchFundamentals, 30_000);
    return () => clearInterval(interval);
  }, [live, symbol]);

  if (!symbol) return null;

  return (
    <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8 shadow-lg text-white min-h-[400px]">
      <h3 className="text-2xl font-bold mb-6">Key Statistics — {symbol}</h3>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : fundamentals ? (
        <ul className="space-y-3 text-base">
          <li>
            <span className="font-semibold text-purple-300">Market cap:</span>{" "}
            {fundamentals.market_cap
              ? `$${(fundamentals.market_cap / 1e9).toFixed(2)}B`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">P/E ratio:</span>{" "}
            {fundamentals.pe_ratio !== null && fundamentals.pe_ratio !== undefined
              ? fundamentals.pe_ratio.toFixed(2)
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">Dividend yield:</span>{" "}
            {fundamentals.dividend_yield
              ? `${(fundamentals.dividend_yield * 100).toFixed(2)}%`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">Avg volume:</span>{" "}
            {fundamentals.average_volume
              ? `${(fundamentals.average_volume / 1e6).toFixed(2)}M`
              : "N/A"}
          </li>

          <li>
            <span className="font-semibold text-purple-300">Last close:</span>{" "}
            {fundamentals.last_close
              ? `$${fundamentals.last_close.toFixed(2)}`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">Open price:</span>{" "}
            {fundamentals.open_price
              ? `$${fundamentals.open_price.toFixed(2)}`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">High today:</span>{" "}
            {fundamentals.high_today
              ? `$${fundamentals.high_today.toFixed(2)}`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">Low today:</span>{" "}
            {fundamentals.low_today
              ? `$${fundamentals.low_today.toFixed(2)}`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">Volume:</span>{" "}
            {fundamentals.volume
              ? `${(fundamentals.volume / 1e6).toFixed(2)}M`
              : "N/A"}
          </li>

          <li>
            <span className="font-semibold text-purple-300">52 Week high:</span>{" "}
            {fundamentals.fifty_two_week_high
              ? `$${fundamentals.fifty_two_week_high.toFixed(2)}`
              : "N/A"}
          </li>
          <li>
            <span className="font-semibold text-purple-300">52 Week low:</span>{" "}
            {fundamentals.fifty_two_week_low
              ? `$${fundamentals.fifty_two_week_low.toFixed(2)}`
              : "N/A"}
          </li>
        </ul>
      ) : (
        <p className="text-gray-400">No fundamentals available.</p>
      )}
    </div>
  );
}
