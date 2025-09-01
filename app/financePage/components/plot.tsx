"use client";

import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PlotProps {
  data: any[];
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

  // ✅ Ensure correct keys from backend
  const dates = data.map((row) => row["Date"]);
  const open = data.map((row) => row["Open"]);
  const high = data.map((row) => row["High"]);
  const low = data.map((row) => row["Low"]);
  const close = data.map((row) => row["Close"]);
  const volume = data.map((row) => row["Volume"]);

  // ✅ Base candlestick + volume traces
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

  // ✅ Add overlays if present (EMA, SMA, etc.)
  overlays.forEach((overlay) => {
    if (data[0][overlay] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[overlay]),
        type: "scatter",
        mode: "lines",
        name: overlay.toUpperCase(),
        line: { width: 1.5 },
        yaxis: "y",
      });
    }
  });

  // ✅ Add indicators (RSI, MACD, etc.)
  indicators.forEach((indicator) => {
    if (data[0][indicator] !== undefined) {
      traces.push({
        x: dates,
        y: data.map((row) => row[indicator]),
        type: "scatter",
        mode: "lines",
        name: indicator.toUpperCase(),
        line: { dash: "dot" },
        yaxis: "y3",
      });
    }
  });
  console.log("Plot data sample:", data[0], traces);
  return (
    <div className="w-full h-[700px]">
      <Plot
  data={traces as any}
  layout={{
    title: { text: `${symbol} Stock Chart` },
    dragmode: "zoom",
    showlegend: true,
    grid: { rows: 3, columns: 1, pattern: "independent" },
    xaxis: { title: { text: "Date" }, rangeslider: { visible: false } },
    yaxis: { title: { text: "Price (USD)" }, domain: [0.4, 1] },
    yaxis2: { title: { text: "Volume" }, domain: [0.25, 0.35] },
    yaxis3: { title: { text: "Indicators" }, domain: [0, 0.2] },
    paper_bgcolor: "black",
    plot_bgcolor: "black",
    font: { color: "white" },
  } as Partial<Plotly.Layout>}
  config={{ responsive: true } as Partial<Plotly.Config>}
  style={{ width: "100%", height: "100%" }}

/>
    </div>
  );
  
}
