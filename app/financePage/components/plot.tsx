"use client";

import Plot from "react-plotly.js";

interface PlotProps {
  data: Record<string, any>[];
  symbol: string;
  overlays?: string[];
  indicators?: string[];
}

export default function FinancePlot({
  data,
  symbol,
  overlays = [],
  indicators = [],
}: PlotProps) {
  if (!data || data.length === 0) {
    return <p className="text-gray-400">No data to display</p>;
  }

  const dates = data.map((row) => row.Date);

  const traces: any[] = [];

  // 📈 Price as candlesticks
  traces.push({
    x: dates,
    open: data.map((row) => row.Open),
    high: data.map((row) => row.High),
    low: data.map((row) => row.Low),
    close: data.map((row) => row.Close),
    type: "candlestick",
    name: "Price",
    increasing: { line: { color: "#16a34a" } },
    decreasing: { line: { color: "#dc2626" } },
    xaxis: "x",
    yaxis: "y",
  });

  // 📊 Overlays
  overlays.forEach((overlay) => {
    if (data[0][overlay] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[overlay]),
        type: "scatter",
        mode: "lines",
        name: overlay.toUpperCase(),
        line: { width: 2 },
        xaxis: "x",
        yaxis: "y",
      });
    }
  });

  // 📉 Indicators
  indicators.forEach((indicator) => {
    if (data[0][indicator] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[indicator]),
        type: "scatter",
        mode: "lines",
        name: indicator.toUpperCase(),
        line: { dash: "dot" },
        xaxis: "x",
        yaxis: "y2",
      });
    }
  });

  return (
    <div className="w-full h-[700px]">
      <Plot
        data={traces}
        layout={{
          paper_bgcolor: "black",
          plot_bgcolor: "black",
          font: { color: "white" },

          title: { text: `${symbol} Stock Chart`, x: 0.05 }, // ✅ FIXED

          xaxis: {
            title: { text: "Date" }, // ✅ FIXED
            rangeslider: { visible: false },
          },

          yaxis: {
            title: { text: "Price (USD)" }, // ✅ FIXED
            domain: [0.35, 1],
          },

          yaxis2: {
            title: { text: "Indicators" }, // ✅ FIXED
            domain: [0, 0.25],
          },
        }}
        config={{ responsive: true, scrollZoom: true, displayModeBar: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
