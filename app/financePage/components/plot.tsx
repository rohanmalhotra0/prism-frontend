"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotRow {
  Date: string;
  Close: number;
  [key: string]: number | string | undefined; // allow dynamic fields for overlays/indicators
}

interface PlotProps {
  data: PlotRow[];
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

  // Always include close price trace
  const traces: Plotly.Data[] = [
    {
      x: dates,
      y: data.map((row) => row.Close),
      type: "scatter",
      mode: "lines",
      name: "Close",
      line: { color: "white" },
    },
  ];

  // Add overlays (e.g. SMA, EMA, Bollinger)
  overlays.forEach((overlay) => {
    if (data[0][overlay] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[overlay] as number),
        type: "scatter",
        mode: "lines",
        name: overlay.replace(/_/g, " "), // prettier legend
        line: { dash: "solid" },
      });
    }
  });

  // Add indicators (e.g. RSI, ATR, Volume)
  indicators.forEach((indicator) => {
    if (data[0][indicator] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[indicator] as number),
        type: "scatter",
        mode: "lines",
        name: indicator.replace(/_/g, " "),
        line: { dash: "dot" },
        yaxis: "y2", // put indicators on right-hand side
      });
    }
  });

  return (
    <div className="w-full h-[600px]">
      <Plot
        data={traces}
        layout={{
          title: { text: `${symbol} Stock Chart` },// ✅ use string, avoids type issues
          paper_bgcolor: "black",
          plot_bgcolor: "black",
          font: { color: "white" },
          xaxis: { title: { text: "Date" } }, // ✅ also wrap xaxis/yaxis titles
          yaxis: { title: { text: "Price (USD)" } },
          yaxis2: {
            title: { text: "Indicators" },
            overlaying: "y",
            side: "right",
          },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
