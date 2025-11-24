"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotProps {
  data: any[];
  symbol: string;
  overlays?: string[];
  indicators?: string[];
  live?: boolean;
}

export default function FinancePlot({
  data,
  symbol,
  overlays = [],
  indicators = [],
  live = false,
}: PlotProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const intervalRef = useRef<number>(5 * 60 * 1000); // 🔹 5-minute buckets (match backend)

  // ✅ Historical load
  useEffect(() => {
    if (!live && Array.isArray(data) && data.length > 0) {
      setChartData(data);
    }
  }, [data, live]);

  // ✅ Live merge handler
  useEffect(() => {
    if (!live || !Array.isArray(data) || data.length === 0) return;

    const latest = data[data.length - 1]; // last trade/candle from backend
    if (!latest) return;

    setChartData((prev) => {
      if (!prev || prev.length === 0) {
        return [latest];
      }

      const last = { ...prev[prev.length - 1] };
      const lastTime = new Date(last.Date).getTime();
      const tradeTime = new Date(latest.Date).getTime();

      // Same bucket → update existing candle
      if (tradeTime - lastTime < intervalRef.current) {
        last.Close = latest.Close;
        last.High = Math.max(last.High, latest.High ?? latest.Close);
        last.Low = Math.min(last.Low, latest.Low ?? latest.Close);
        last.Volume += latest.Volume || 0;
        return [...prev.slice(0, -1), last];
      }

      // New bucket → append new candle
      return [...prev, latest];
    });
  }, [data, live]);

  if (!chartData || chartData.length === 0) {
    return <p className="text-muted-foreground">No data to display</p>;
  }

  // ✅ Extract OHLCV
  const dates = chartData.map((row) => new Date(row["Date"]));
  const open = chartData.map((row) => row["Open"]);
  const high = chartData.map((row) => row["High"]);
  const low = chartData.map((row) => row["Low"]);
  const close = chartData.map((row) => row["Close"]);
  const volume = chartData.map((row) => row["Volume"]);

  // ✅ Base candlestick + volume
  const traces: any[] = [
    {
      x: dates,
      open,
      high,
      low,
      close,
      type: "candlestick",
      name: `${symbol} OHLC`,
      increasing: { line: { color: "#26a69a" } },
      decreasing: { line: { color: "#ef5350" } },
      xaxis: "x",
      yaxis: "y",
    },
    {
      x: dates,
      y: volume,
      type: "bar",
      name: "Volume",
      marker: { color: "rgba(100,100,100,0.5)" },
      xaxis: "x",
      yaxis: "y2",
    },
  ];

  // ✅ Add overlays
  overlays.forEach((overlay) => {
    if (chartData.some((row) => row[overlay] !== undefined)) {
      traces.push({
        x: dates,
        y: chartData.map((row) => row[overlay]),
        type: "scatter",
        mode: "lines",
        name: overlay.toUpperCase(),
        line: { width: 1.5 },
        yaxis: "y",
      });
    }
  });

  // ✅ Add indicators
  indicators.forEach((indicator) => {
    if (chartData.some((row) => row[indicator] !== undefined)) {
      traces.push({
        x: dates,
        y: chartData.map((row) => row[indicator]),
        type: "scatter",
        mode: "lines",
        name: indicator.toUpperCase(),
        line: { dash: "dot" },
        yaxis: "y3",
      });
    }
  });

  return (
    <div className="w-full h-[700px] bg-card rounded-xl border border-border">
      <Plot
        data={traces as any}
        layout={{
          title: { text: `${symbol} Stock Chart` },
          dragmode: "zoom",
          showlegend: true,
          grid: { rows: 3, columns: 1, pattern: "independent" },
          xaxis: {
            title: { text: "Time" },
            rangeslider: { visible: false },
            type: "date",
            showgrid: false,
            zeroline: false,
            showline: false,
          },
          yaxis: {
            title: { text: "Price (USD)" },
            domain: [0.4, 1],
            showgrid: false,
            zeroline: false,
            showline: false,
          },
          yaxis2: {
            title: { text: "Volume" },
            domain: [0.25, 0.35],
            showgrid: false,
            zeroline: false,
            showline: false,
          },
          yaxis3: {
            title: { text: "Indicators" },
            domain: [0, 0.2],
            showgrid: false,
            zeroline: false,
            showline: false,
          },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          font: { color: "var(--foreground)" },
        } as Partial<Plotly.Layout>}
        config={{ responsive: true } as Partial<Plotly.Config>}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
