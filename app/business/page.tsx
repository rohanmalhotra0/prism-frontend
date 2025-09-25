"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/sections/navbar/default";
import HeroBackground from "@/components/ui/HeroBackground";

// ---- Trimmed icon imports (only what we use) ----
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Share2,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";

// ---- Plotly (client-only) ----
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      Loading chart...
    </div>
  ),
});

// Import Plotly types
import { Data as PlotlyData } from "plotly.js";

// ---- Types ----
type ViewMode = "actuals" | "forecast" | "scenarios";
type DataSource = "generated" | "uploaded";
type DatasetId = "unified" | "uploaded";

interface KPICard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  forecast?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // tailwind bg gradient stops
}

interface Dataset {
  id: DatasetId;
  name: string;
  type: "finance" | "customers" | "product" | "uploaded";
  data: any[];
}

export default function BusinessMetricsPage() {
  // ---- UI State ----
  const [dateRange, setDateRange] = useState("quarter");
  const [selectedDataset, setSelectedDataset] = useState<DatasetId>("unified");
  const [viewMode, setViewMode] = useState<ViewMode>("actuals");

  // Upload state
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [hasGeneratedData, setHasGeneratedData] = useState(false);

  // Scenario state
  const [scenarioData, setScenarioData] = useState<any[]>([]);
  const [scenarioName, setScenarioName] = useState("Base Case");
  const [savedScenarios, setSavedScenarios] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<DataSource>("generated");

  // Scenario sliders
  const [cac, setCac] = useState(150);
  const [churnRate, setChurnRate] = useState(5);
  const [pricing, setPricing] = useState(100);
  const [growthRate, setGrowthRate] = useState(20);

  // ---- Unified Dataset ----
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  
  useEffect(() => {
    const unifiedData = generateUnifiedData();
    setDatasets([
      { id: "unified", name: "Business Data", type: "finance", data: unifiedData },
      { id: "uploaded", name: "Uploaded Data", type: "uploaded", data: uploadedData },
    ]);
  }, [uploadedData]);

  // Generate scenario data based on current slider values
  const generateScenarioData = useCallback(() => {
    const baseData = datasets.find(d => d.id === selectedDataset)?.data || [];
    if (baseData.length === 0) return [];

    return baseData.map((item, index) => {
      const growthMultiplier = 1 + (growthRate / 100);
      const churnMultiplier = 1 - (churnRate / 100);
      const pricingMultiplier = pricing / 100;
      const cacMultiplier = cac / 150; // Assuming base CAC of 150

      return {
        ...item,
        // Apply scenario adjustments
        revenue: item.revenue ? item.revenue * growthMultiplier * pricingMultiplier : item.revenue,
        arr: item.arr ? item.arr * growthMultiplier * pricingMultiplier : item.arr,
        mrr: item.mrr ? item.mrr * growthMultiplier * pricingMultiplier : item.mrr,
        churn: item.churn ? item.churn * churnMultiplier : item.churn,
        cac: item.cac ? item.cac * cacMultiplier : item.cac,
        ltv: item.ltv ? item.ltv * pricingMultiplier : item.ltv,
        grossMargin: item.grossMargin ? Math.min(95, item.grossMargin * pricingMultiplier) : item.grossMargin,
        ebitda: item.ebitda ? Math.min(50, item.ebitda * growthMultiplier) : item.ebitda,
        // Add scenario metadata
        scenario: scenarioName,
        isScenario: true,
        baseValue: item.revenue || item.arr || item.mrr || 0
      };
    });
  }, [datasets, selectedDataset, growthRate, churnRate, pricing, cac, scenarioName]);

  // Update scenario data when sliders change
  useEffect(() => {
    if (viewMode === "scenarios") {
      setScenarioData(generateScenarioData());
    }
  }, [viewMode, generateScenarioData]);

  // Scenario management functions
  const saveScenario = () => {
    const newScenario = {
      id: `scenario_${Math.random().toString(36).substr(2, 9)}`,
      name: scenarioName,
      data: generateScenarioData(),
      parameters: {
        cac,
        churnRate,
        pricing,
        growthRate
      },
      createdAt: new Date().toISOString()
    };
    
    setSavedScenarios(prev => [...prev, newScenario]);
    alert(`Scenario "${scenarioName}" saved successfully!`);
  };

  const loadScenario = (scenarioId: string) => {
    const scenario = savedScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setScenarioName(scenario.name);
      setCac(scenario.parameters.cac);
      setChurnRate(scenario.parameters.churnRate);
      setPricing(scenario.parameters.pricing);
      setGrowthRate(scenario.parameters.growthRate);
      setScenarioData(scenario.data);
    }
  };

  const deleteScenario = (scenarioId: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== scenarioId));
  };

  // CSV export utilities
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(','))
    ].join('\n');
    
    return csvContent;
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---- File processing ----
  async function processUploadedFile(file: File) {
    setIsProcessingFile(true);
    setSelectedFile(file);
    try {
      const text = await file.text();
      let data: any[] = [];
      if (file.name.toLowerCase().endsWith(".csv")) {
        const lines = text.split("\n").filter((l) => l.trim());
        if (!lines.length) throw new Error("Empty CSV");
        const headers = lines[0].split(",").map((h) => h.trim());
        data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const row: any = {};
          headers.forEach((header, idx) => {
            const raw = values[idx] ?? "";
            const n = Number(raw);
            row[header] = Number.isFinite(n) && raw !== "" ? n : raw;
          });
          return row;
        });
      } else if (file.name.toLowerCase().endsWith(".json")) {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("JSON must be an array of objects");
        data = parsed;
      } else {
        throw new Error("Unsupported file format (use CSV or JSON)");
      }
      setUploadedData(data);
      setDataSource("uploaded");
      setSelectedDataset("uploaded");
      setHasGeneratedData(true);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Failed to process file. Use CSV or JSON with rows of metrics by month.");
    } finally {
      setIsProcessingFile(false);
    }
  }

  function generateSampleData() {
    setUploadedData([]);
    setSelectedFile(null);
    setDataSource("generated");
    setSelectedDataset("unified");
    setHasGeneratedData(true);
  }

  // ---- Current dataset ----
  const current = useMemo(
    () => {
      if (datasets.length === 0) {
        return { id: "finance", name: "Financial Data", type: "finance", data: [] };
      }
      return datasets.find((d) => d.id === selectedDataset) ?? datasets[0];
    },
    [datasets, selectedDataset]
  );
  
  // Determine which data to use based on view mode
  const currentData = useMemo(() => {
    if (viewMode === "scenarios" && scenarioData.length > 0) {
      return scenarioData;
    } else if (viewMode === "forecast") {
      // For forecast mode, show both actuals and forecasts
      return current?.data ?? [];
    } else {
      // For actuals mode, show only actual data
      return current?.data ?? [];
    }
  }, [viewMode, scenarioData, current?.data]);

  // ---- KPI Calculation (adapts to dataset type) ----
  const calculateKPIs = useMemo(() => {
    // Fallback (empty)
    if (!currentData.length) {
      return {
        arr: { value: "$2.40M", change: 12.5, trend: "up" as const, forecast: "$2.64M (3M)" },
        mrr: { value: "$200.0K", change: 8.3, trend: "up" as const, forecast: "$216.0K (3M)" },
        nrr: { value: "118.0%", change: 5.2, trend: "up" as const },
        churn: { value: "4.20%", change: -0.8, trend: "up" as const, forecast: "3.78% (3M)" },
        ltvCac: { value: "4.20x", change: 0.3, trend: "up" as const },
        grossMargin: { value: "78.0%", change: 2.1, trend: "up" as const },
        ebitda: { value: "15.0%", change: 1.8, trend: "up" as const },
        runway: { value: "18.0M", change: 2, trend: "up" as const },
      };
    }

    const last = currentData[currentData.length - 1] ?? {};
    const prev = currentData[currentData.length - 2] ?? {};

    // Helpers
    const pct = (v: number) => `${v.toFixed(2)}%`;
    const moneyK = (v: number) => `$${(v / 1000).toFixed(1)}K`;
    const moneyM = (v: number) => `$${(v / 1_000_000).toFixed(2)}M`;

    if (current.type === "finance" || current.type === "uploaded") {
      const arr = Number(last.arr ?? (last.revenue ? last.revenue * 12 : 2_400_000));
      const mrr = Number(last.mrr ?? last.revenue ?? 200_000);
      const nrr = Number(last.nrr ?? 118);
      const churn = Number(last.churn ?? 4.2);
      const ltv = Number(last.ltv ?? 600);
      const kCAC = Number(last.cac ?? 150);
      const gm = Number(last.grossMargin ?? 78);
      const ebitda = Number(last.ebitda ?? 15);

      const prevArr = Number(prev.arr ?? (prev.revenue ? prev.revenue * 12 : 2_200_000));
      const prevMrr = Number(prev.mrr ?? prev.revenue ?? 180_000);
      const prevNrr = Number(prev.nrr ?? 112);
      const prevChurn = Number(prev.churn ?? 5.0);
      const prevLtv = Number(prev.ltv ?? 550);
      const prevCAC = Number(prev.cac ?? 160);
      const prevGm = Number(prev.grossMargin ?? 76);
      const prevEbitda = Number(prev.ebitda ?? 13);

      return {
        arr: {
          value: moneyM(arr),
          change: ((arr - prevArr) / Math.max(1, prevArr)) * 100,
          trend: arr >= prevArr ? "up" : "down",
          forecast: moneyM(arr * 1.1) + " (3M)",
        },
        mrr: {
          value: moneyK(mrr),
          change: ((mrr - prevMrr) / Math.max(1, prevMrr)) * 100,
          trend: mrr >= prevMrr ? "up" : "down",
          forecast: moneyK(mrr * 1.1) + " (3M)",
        },
        nrr: {
          value: pct(nrr),
          change: nrr - prevNrr,
          trend: nrr >= prevNrr ? "up" : "down",
        },
        churn: {
          value: pct(churn),
          change: churn - prevChurn,
          trend: churn <= prevChurn ? "up" : "down",
          forecast: `${(churn * 0.9).toFixed(2)}% (3M)`,
        },
        ltvCac: {
          value: `${(ltv / Math.max(1, kCAC)).toFixed(2)}x`,
          change: ltv / Math.max(1, kCAC) - prevLtv / Math.max(1, prevCAC),
          trend: ltv / Math.max(1, kCAC) >= prevLtv / Math.max(1, prevCAC) ? "up" : "down",
        },
        grossMargin: {
          value: pct(gm),
          change: gm - prevGm,
          trend: gm >= prevGm ? "up" : "down",
        },
        ebitda: {
          value: pct(ebitda),
          change: ebitda - prevEbitda,
          trend: ebitda >= prevEbitda ? "up" : "down",
        },
        runway: {
          value: `${(18 * (100 - churn) / 100).toFixed(1)}M`,
          change: 0,
          trend: "neutral",
        },
      };
    }

    if (current.type === "customers") {
      const active = Number(last.active ?? 1000);
      const churned = Number(last.churned ?? 30);
      const newCus = Number(last.new ?? 50);
      const churnRate = (churned / Math.max(1, (prev.active ?? active - newCus + churned))) * 100;
      const prevActive = Number(prev.active ?? active - 20);
      const nrr = Number(last.nrr ?? 115);
      const prevNrr = Number(prev.nrr ?? 110);
      const arpu = Number(last.revenue ?? 0) / Math.max(1, active);

      return {
        arr: {
          value: "$—",
          change: 0,
          trend: "neutral",
        },
        mrr: {
          value: "$—",
          change: 0,
          trend: "neutral",
        },
        nrr: {
          value: `${nrr.toFixed(1)}%`,
          change: nrr - prevNrr,
          trend: nrr >= prevNrr ? "up" : "down",
        },
        churn: {
          value: `${churnRate.toFixed(2)}%`,
          change: 0,
          trend: "neutral",
        },
        ltvCac: {
          value: `${(arpu ? (arpu * 12 * 3) / 150 : 0).toFixed(2)}x`,
          change: 0,
          trend: "neutral",
        },
        grossMargin: { value: "—", change: 0, trend: "neutral" },
        ebitda: { value: "—", change: 0, trend: "neutral" },
        runway: { value: "—", change: 0, trend: "neutral" },
      };
    }

    // product dataset
    const dau = Number(last.dau ?? 0);
    const mau = Number(last.mau ?? 1);
    const stickiness = (dau / mau) * 100;
    const prevStickiness = (Number(prev.dau ?? dau) / Math.max(1, Number(prev.mau ?? mau))) * 100;

    return {
      arr: { value: "$—", change: 0, trend: "neutral" },
      mrr: { value: "$—", change: 0, trend: "neutral" },
      nrr: { value: "—", change: 0, trend: "neutral" },
      churn: { value: "—", change: 0, trend: "neutral" },
      ltvCac: { value: "—", change: 0, trend: "neutral" },
      grossMargin: { value: "—", change: 0, trend: "neutral" },
      ebitda: { value: "—", change: 0, trend: "neutral" },
      runway: { value: "—", change: 0, trend: "neutral" },
      _extra: { stickiness, prevStickiness },
    } as any;
  }, [current.type, currentData]);

  // ---- KPI Cards ----
  const kpiCards: KPICard[] = useMemo(() => {
    const items: KPICard[] = [
      {
        title: "ARR",
        value: (calculateKPIs as any).arr.value,
        change: (calculateKPIs as any).arr.change,
        trend: (calculateKPIs as any).arr.trend,
        forecast: (calculateKPIs as any).arr.forecast,
        icon: DollarSign,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "MRR",
        value: (calculateKPIs as any).mrr.value,
        change: (calculateKPIs as any).mrr.change,
        trend: (calculateKPIs as any).mrr.trend,
        forecast: (calculateKPIs as any).mrr.forecast,
        icon: TrendingUp,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "NRR",
        value: (calculateKPIs as any).nrr.value,
        change: (calculateKPIs as any).nrr.change,
        trend: (calculateKPIs as any).nrr.trend,
        icon: Target,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "Churn Rate",
        value: (calculateKPIs as any).churn.value,
        change: (calculateKPIs as any).churn.change,
        trend: (calculateKPIs as any).churn.trend,
        forecast: (calculateKPIs as any).churn.forecast,
        icon: Users,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "LTV/CAC",
        value: (calculateKPIs as any).ltvCac.value,
        change: (calculateKPIs as any).ltvCac.change,
        trend: (calculateKPIs as any).ltvCac.trend,
        icon: BarChart3,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "Gross Margin",
        value: (calculateKPIs as any).grossMargin.value,
        change: (calculateKPIs as any).grossMargin.change,
        trend: (calculateKPIs as any).grossMargin.trend,
        icon: PieChart,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "EBITDA",
        value: (calculateKPIs as any).ebitda.value,
        change: (calculateKPIs as any).ebitda.change,
        trend: (calculateKPIs as any).ebitda.trend,
        icon: Activity,
        color: "from-[#1877F2] to-[#1877F2]",
      },
      {
        title: "Runway",
        value: (calculateKPIs as any).runway.value,
        change: (calculateKPIs as any).runway.change,
        trend: (calculateKPIs as any).runway.trend,
        icon: Calendar,
        color: "from-[#1877F2] to-[#1877F2]",
      },
    ];

    // If product dataset, swap one card to show stickiness
    if (current.type === "product") {
      const stickiness = (calculateKPIs as any)._extra?.stickiness ?? 0;
      const prevStickiness = (calculateKPIs as any)._extra?.prevStickiness ?? 0;
      items[0] = {
        title: "DAU/MAU (Stickiness)",
        value: `${stickiness.toFixed(1)}%`,
        change: stickiness - prevStickiness,
        trend: stickiness >= prevStickiness ? "up" : "down",
        icon: Activity,
        color: "from-[#1877F2] to-[#1877F2]",
      };
      // Hide finance-only metrics visually by keeping “—”
    }
    return items;
  }, [calculateKPIs, current.type]);

  // ---- Revenue Forecast (24 months) ----
  const [revenueData, setRevenueData] = useState<any[]>([]);
  
  useEffect(() => {
    const months = 24;
    const base = 200_000;
    const rows = [];
    for (let i = 0; i < months; i++) {
      const g = Math.pow(1 + growthRate / 100, i / 12);
      const noise = (Math.random() - 0.5) * 0.08;
      const rev = base * g * (1 + noise);
      rows.push({
        month: new Date(2025, i).toISOString().slice(0, 7),
        actual: i < 12 ? rev : null,
        forecast: i >= 12 ? rev : null,
        hi: rev * 1.15,
        lo: rev * 0.85,
      });
    }
    setRevenueData(rows);
  }, [growthRate]);

  // ---- Cohort (retention) ----
  const [cohortData, setCohortData] = useState<any[]>([]);
  
  useEffect(() => {
    const cohorts = ["2025-01", "2025-02", "2025-03", "2025-04", "2025-05"];
    const months = 12;
    const data = cohorts.map((cohort) => ({
      cohort,
      data: Array.from({ length: months }, (_, m) => {
        const r = Math.max(0.3, 1 - m * 0.08 + (Math.random() - 0.5) * 0.1);
        return { month: `Month ${m + 1}`, retention: r, revenue: 1000 * r * (1 + Math.random() * 0.2) };
      }),
    }));
    setCohortData(data);
  }, []);

  // ---- Monte Carlo ----
  const [monteCarloData, setMonteCarloData] = useState<Array<Array<{ month: string; revenue: number }>>>([]);
  
  useEffect(() => {
    const sims = 100;
    const months = 24;
    const out: Array<Array<{ month: string; revenue: number }>> = [];
    for (let s = 0; s < sims; s++) {
      let rev = 200_000;
      const row: { month: string; revenue: number }[] = [];
      for (let m = 0; m < months; m++) {
        const g = 1 + (Math.random() - 0.5) * 0.08 + growthRate / 100 / 12;
        rev *= g;
        row.push({ month: new Date(2025, m).toISOString().slice(0, 7), revenue: rev });
      }
      out.push(row);
    }
    setMonteCarloData(out);
  }, [growthRate]);

  // ---- Chart traces/layouts ----
  const revenueChartData = useMemo(() => {
    const actuals = revenueData.filter((d) => d.actual !== null);
    const forecasts = revenueData.filter((d) => d.forecast !== null);
    
    const traces: any[] = [];
    
    // Show actuals based on view mode
    if (viewMode === "actuals" || viewMode === "forecast") {
      if (actuals.length > 0) {
        traces.push({
          type: "scatter",
          mode: "lines+markers",
          x: actuals.map((d) => d.month),
          y: actuals.map((d) => d.actual),
          name: "Actual Revenue",
          line: { color: "#10b981", width: 3 },
          marker: { size: 6 },
        });
      }
    }
    
    // Show forecasts based on view mode
    if (viewMode === "forecast" || viewMode === "scenarios") {
      if (forecasts.length > 0) {
        traces.push({
          type: "scatter",
          mode: "lines+markers",
          x: forecasts.map((d) => d.month),
          y: forecasts.map((d) => d.forecast),
          name: viewMode === "scenarios" ? `${scenarioName} Forecast` : "Forecast",
          line: { color: viewMode === "scenarios" ? "#8b5cf6" : "#3b82f6", width: 3, dash: "dash" },
          marker: { size: 6 },
        });
      }
    }
    
    // Show scenario data if in scenarios mode
    if (viewMode === "scenarios" && scenarioData.length > 0) {
      const scenarioRevenue = scenarioData.map((d, i) => ({
        month: d.month || `Month ${i + 1}`,
        revenue: d.revenue || d.arr || d.mrr || 0
      }));
      
      traces.push({
        type: "scatter",
        mode: "lines+markers",
        x: scenarioRevenue.map((d) => d.month),
        y: scenarioRevenue.map((d) => d.revenue),
        name: `${scenarioName} Scenario`,
        line: { color: "#f59e0b", width: 3 },
        marker: { size: 6 },
      });
    }
    
    // Add confidence bands for forecast mode
    if (viewMode === "forecast") {
      traces.push(
        {
          type: "scatter",
          mode: "lines",
          x: revenueData.map((d) => d.month),
          y: revenueData.map((d) => d.hi),
          name: "Confidence Upper",
          line: { color: "rgba(59,130,246,0.35)", width: 1 },
          showlegend: false,
          hoverinfo: "skip",
        },
        {
          type: "scatter",
          mode: "lines",
          x: revenueData.map((d) => d.month),
          y: revenueData.map((d) => d.lo),
          name: "Confidence Lower",
          line: { color: "rgba(59,130,246,0.35)", width: 1 },
          fill: "tonexty",
          fillcolor: "rgba(59,130,246,0.12)",
          showlegend: false,
          hoverinfo: "skip",
        }
      );
    }
    
    return traces as PlotlyData[];
  }, [revenueData, viewMode, scenarioData, scenarioName]);

  const revenueChartLayout = useMemo(
    () => ({
      title: { 
        text: viewMode === "actuals" ? "Actual Revenue" : 
              viewMode === "forecast" ? "Revenue Forecast" : 
              "Scenario Analysis", 
        font: { color: "white", size: 16 } 
      },
      xaxis: { color: "white", gridcolor: "#2e3440" },
      yaxis: { color: "white", gridcolor: "#2e3440" },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "white" },
      legend: { font: { color: "white" } },
      margin: { l: 60, r: 20, t: 40, b: 50 },
    }),
    [viewMode]
  );

  const cohortChartData = useMemo(
    () =>
      cohortData.map((cohort, i) => ({
        type: "scatter",
        mode: "lines+markers",
        x: cohort.data.map((d: any) => d.month),
        y: cohort.data.map((d: any) => d.retention * 100),
        name: cohort.cohort,
        line: { color: `hsl(${(i * 61) % 360},70%,55%)`, width: 2 },
        marker: { size: 4 },
      })) as PlotlyData[],
    [cohortData]
  );

  const cohortChartLayout = useMemo(
    () => ({
      title: { text: "Customer Retention by Cohort", font: { color: "white", size: 16 } },
      xaxis: { title: { text: "Months" }, color: "white", gridcolor: "#2e3440" },
      yaxis: { title: { text: "Retention %" }, color: "white", gridcolor: "#2e3440" },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "white" },
      legend: { font: { color: "white" } },
      margin: { l: 60, r: 20, t: 40, b: 50 },
    }),
    []
  );

  const monteCarloChartData = useMemo(
    () =>
      monteCarloData.slice(0, 20).map((sim) => ({
        type: "scatter",
        mode: "lines",
        x: sim.map((d) => d.month),
        y: sim.map((d) => d.revenue),
        name: "",
        line: { color: "rgba(59,130,246,0.30)", width: 1 },
        showlegend: false,
        hoverinfo: "skip",
      })) as PlotlyData[],
    [monteCarloData]
  );

  const monteCarloChartLayout = useMemo(
    () => ({
      title: { text: "Monte Carlo Revenue Simulation", font: { color: "white", size: 16 } },
      xaxis: { title: { text: "Months" }, color: "white", gridcolor: "#2e3440" },
      yaxis: { title: { text: "Revenue ($)" }, color: "white", gridcolor: "#2e3440" },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      font: { color: "white" },
      legend: { font: { color: "white" } },
      margin: { l: 60, r: 20, t: 40, b: 50 },
    }),
    []
  );

  const plotConfig = useMemo(
    () => ({ displayModeBar: true, displaylogo: false, responsive: true, modeBarButtonsToRemove: ["pan2d", "lasso2d", "select2d"] as any }),
    []
  );

  // ---- Render ----
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" blendModeClassName="mix-blend-screen" />
      <div className="fixed inset-0 z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black/20 to-slate-900/30" />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />

        {/* Header & Controls */}
        <div className="pt-32 pb-8 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Business Metrics
                </h1>
                <p className="text-lg text-gray-400">Predictive analytics and interactive business intelligence</p>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 lg:mt-0">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="month">Month</option>
                  <option value="quarter">Quarter</option>
                  <option value="year">Year</option>
                </select>


                <div className="flex bg-gray-800 rounded-lg border border-gray-600">
                  <button
                    onClick={() => setViewMode("actuals")}
                    className={`px-4 py-2 rounded-l-lg text-sm font-medium transition-colors ${
                      viewMode === "actuals" ? "bg-[#1877F2] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Actuals
                  </button>
                  <button
                    onClick={() => setViewMode("forecast")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      viewMode === "forecast" ? "bg-[#1877F2] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Forecast
                  </button>
                  <button
                    onClick={() => setViewMode("scenarios")}
                    className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-colors ${
                      viewMode === "scenarios" ? "bg-[#1877F2] text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Scenarios
                  </button>
                </div>

              </div>
            </div>

            {/* Dataset Upload */}
            <div className="mt-8 bg-gray-800/30 rounded-xl p-6 border border-white/10">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-4">Upload Dataset</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".csv,.json"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) processUploadedFile(f);
                        }}
                        className="hidden"
                        id="business-file-upload"
                        disabled={isProcessingFile}
                      />
                      <label
                        htmlFor="business-file-upload"
                        className={`cursor-pointer inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
                          isProcessingFile ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        {isProcessingFile ? "Processing..." : "Choose File"}
                      </label>
                      <button
                        onClick={generateSampleData}
                        className="px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2] transition-colors font-medium"
                      >
                        Generate Sample Data
                      </button>
                    </div>

                    {selectedFile && (
                      <div className="text-sm text-gray-400">
                        <span className="text-white">Selected:</span> {selectedFile.name}
                        <span className="ml-2 text-green-400">({uploadedData.length} records)</span>
                      </div>
                    )}

                    <div className="text-xs text-gray-400">
                      CSV/JSON rows by month. Optional columns: <code>month, revenue, arr, mrr, churn, nrr, ltv, cac, grossMargin, ebitda, active, new, churned, dau, wau, mau</code>
                    </div>
                  </div>
                </div>

                {/* Data Source */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-4">Data Source</h3>
                  <div className="space-y-3">
                    <div className="flex bg-gray-700 rounded-lg p-1">
                      <button
                        onClick={() => setDataSource("generated")}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          dataSource === "generated" ? "bg-[#1877F2] text-white" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Generated Data
                      </button>
                      <button
                        onClick={() => setDataSource("uploaded")}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          dataSource === "uploaded" ? "bg-[#1877F2] text-white" : "text-gray-400 hover:text-white"
                        }`}
                        disabled={uploadedData.length === 0}
                      >
                        Uploaded Data
                      </button>
                    </div>
                    <div className="text-sm text-gray-400">
                      Current: {dataSource === "generated" ? "Generated sample data" : `${uploadedData.length} uploaded records`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* No Data Message */}
        {!hasGeneratedData && (
          <div className="px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl p-12 border border-white/10 text-center">
                <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Generate Sample Data to Get Started</h3>
                <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
                  Click "Generate Sample Data" above to see your business metrics, charts, and analytics. 
                  You can also upload your own CSV or JSON data files.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={generateSampleData}
                    className="px-8 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2] transition-colors font-medium"
                  >
                    Generate Sample Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        {hasGeneratedData && (
          <div className="px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((kpi, i) => {
                  const Icon = kpi.icon;
                  const trendIcon =
                    kpi.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    ) : kpi.trend === "down" ? (
                      <ArrowDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <Minus className="w-4 h-4 text-gray-400" />
                    );
                  return (
                    <div
                      key={i}
                      className="bg-gray-800/50 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          {trendIcon}
                          <span
                            className={`text-sm font-medium ${
                              kpi.trend === "up"
                                ? "text-green-400"
                                : kpi.trend === "down"
                                ? "text-red-400"
                                : "text-gray-400"
                            }`}
                          >
                            {kpi.change > 0 ? "+" : ""}
                            {Number.isFinite(kpi.change) ? kpi.change.toFixed(2) : "0.00"}%
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{kpi.value}</h3>
                      <p className="text-gray-400 text-sm mb-2">{kpi.title}</p>
                      {kpi.forecast && <p className="text-blue-300 text-xs">Forecast: {kpi.forecast}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {hasGeneratedData && (
          <div className="px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Forecast - Show for all modes */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Revenue Forecast</h3>
                  <div className="h-96">
                    <Plot data={revenueChartData} layout={revenueChartLayout} config={plotConfig} style={{ width: "100%", height: "100%" }} />
                  </div>
                </div>
                
                {/* Customer Retention by Cohort - Show for Actuals and Forecast only */}
                {(viewMode === "actuals" || viewMode === "forecast") && (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Customer Retention by Cohort</h3>
                    <div className="h-96">
                      <Plot data={cohortChartData} layout={cohortChartLayout} config={plotConfig} style={{ width: "100%", height: "100%" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Monte Carlo - Show only for Scenarios mode */}
        {hasGeneratedData && viewMode === "scenarios" && (
          <div className="px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Monte Carlo Revenue Simulation</h3>
                <div className="h-96">
                  <Plot data={monteCarloChartData} layout={monteCarloChartLayout} config={plotConfig} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Export & Sharing */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const data = viewMode === "scenarios" ? scenarioData : currentData;
                  const csv = convertToCSV(data);
                  downloadCSV(csv, `${viewMode}-data-${new Date().toISOString().split('T')[0]}.csv`);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2] transition-colors"
              >
                <Download className="w-4 h-4" />
                Export {viewMode === "actuals" ? "Actuals" : viewMode === "forecast" ? "Forecast" : "Scenario"} Data
              </button>
              {viewMode === "scenarios" && (
                <button 
                  onClick={saveScenario}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Save Current Scenario
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helpers & Components ---------------- */

function Slider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function CardStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}

/* ---------- Sample data generators ---------- */

function generateUnifiedData() {
  const data = [];
  const baseRevenue = 150000;
  const baseArr = 1800000;
  const baseMrr = 150000;
  let baseChurn = 6.0;
  let baseCac = 200;
  let baseLtv = 500;
  let active = 800;
  let dau = 3000;
  let wau = 12000;
  let mau = 35000;
  let adoption = 25;

  for (let i = 0; i < 24; i++) {
    const month = new Date(2025, i).toISOString().slice(0, 7);
    
    // Financial metrics
    const growthFactor = 1 + i * 0.02 + (Math.random() - 0.5) * 0.08;
    const revenue = Math.round(baseRevenue * growthFactor);
    const arr = Math.round(baseArr * growthFactor);
    const mrr = Math.round(baseMrr * growthFactor);
    
    // Customer metrics
    const newCustomers = Math.round(40 + i * 2 + (Math.random() - 0.5) * 15);
    const churned = Math.round(Math.max(10, 25 - i * 0.8 + (Math.random() - 0.5) * 6));
    active = Math.max(0, active + newCustomers - churned);
    const nrr = Math.round((110 + i * 0.8 + (Math.random() - 0.5) * 5) * 10) / 10;
    
    // Product metrics
    dau = Math.round(dau + 180 + (Math.random() - 0.5) * 400);
    wau = Math.round(wau + 700 + (Math.random() - 0.5) * 1200);
    mau = Math.round(mau + 1800 + (Math.random() - 0.5) * 2800);
    adoption = Math.min(100, Math.max(0, adoption + (Math.random() - 0.5) * 2));
    
    // Churn and CAC trends
    baseChurn = Math.max(1, baseChurn - 0.1 + (Math.random() - 0.5) * 0.5);
    baseCac = Math.max(50, baseCac - 2 + (Math.random() - 0.5) * 10);
    baseLtv = Math.max(100, baseLtv + 5 + (Math.random() - 0.5) * 20);
    
    const arpu = 120 + Math.random() * 20;
    const grossMargin = Math.round((75 + (Math.random() - 0.5) * 10) * 10) / 10;
    const ebitda = Math.round((revenue * grossMargin / 100) * 0.8);
    
    data.push({
      month,
      revenue,
      arr,
      mrr,
      churn: Math.round(baseChurn * 10) / 10,
      nrr,
      ltv: Math.round(baseLtv),
      cac: Math.round(baseCac),
      grossMargin,
      ebitda,
      active,
      new: newCustomers,
      churned,
      dau,
      wau,
      mau,
      adoption: Math.round(adoption * 10) / 10,
      arpu: Math.round(arpu * 10) / 10,
      actual: i < 12 ? revenue : null,
      forecast: i >= 12 ? revenue : null,
    });
  }
  
  return data;
}

function generateFinancialData() {
  const data = [];
  const baseRevenue = 150000;
  const baseArr = 1800000;
  const baseMrr = 150000;
  let baseChurn = 6.0;
  let baseCac = 200;
  let baseLtv = 500;

  for (let i = 0; i < 24; i++) {
    const growthFactor = 1 + i * 0.02 + (Math.random() - 0.5) * 0.08;
    const seasonal = 1 + 0.1 * Math.sin((i * Math.PI) / 6);
    const revenue = baseRevenue * growthFactor * seasonal;
    const arr = baseArr * growthFactor * seasonal;
    const mrr = baseMrr * growthFactor * seasonal;

    baseChurn = Math.max(2.0, baseChurn - 0.15 + (Math.random() - 0.5) * 0.3);
    baseCac = baseCac + 2 + (Math.random() - 0.5) * 10;
    baseLtv = baseLtv + 10 + (Math.random() - 0.5) * 30;

    data.push({
      month: new Date(2025, i).toISOString().slice(0, 7),
      revenue: Math.round(revenue),
      arr: Math.round(arr),
      mrr: Math.round(mrr),
      churn: Math.round(baseChurn * 10) / 10,
      cac: Math.round(baseCac),
      ltv: Math.round(baseLtv),
      grossMargin: Math.round((75 + Math.random() * 5) * 10) / 10,
      ebitda: Math.round((10 + Math.random() * 8) * 10) / 10,
      nrr: Math.round((110 + Math.random() * 15) * 10) / 10,
    });
  }
  return data;
}

function generateCustomerData() {
  const data = [];
  let active = 800;
  for (let i = 0; i < 24; i++) {
    const newCustomers = Math.round(40 + i * 2 + (Math.random() - 0.5) * 15);
    const churned = Math.round(Math.max(10, 25 - i * 0.8 + (Math.random() - 0.5) * 6));
    active = Math.max(0, active + newCustomers - churned);
    const nrr = Math.round((110 + i * 0.8 + (Math.random() - 0.5) * 5) * 10) / 10;

    const arpu = 120 + Math.random() * 20;
    const revenue = active * arpu;

    data.push({
      month: new Date(2025, i).toISOString().slice(0, 7),
      active,
      new: newCustomers,
      churned,
      nrr,
      revenue: Math.round(revenue),
      churn: Math.round(((churned / Math.max(1, active)) * 100) * 100) / 100,
    });
  }
  return data;
}

function generateProductData() {
  const data = [];
  let dau = 3000;
  let wau = 12000;
  let mau = 35000;
  let adoption = 25;

  for (let i = 0; i < 24; i++) {
    dau = Math.round(dau + 180 + (Math.random() - 0.5) * 400);
    wau = Math.round(wau + 700 + (Math.random() - 0.5) * 1200);
    mau = Math.round(mau + 1800 + (Math.random() - 0.5) * 2800);
    adoption = Math.max(10, Math.round((adoption + 1.5 + (Math.random() - 0.5) * 2) * 10) / 10);

    const stickiness = Math.round(((dau / Math.max(1, mau)) * 100) * 10) / 10;
    const engagement = Math.round(((wau / Math.max(1, mau)) * 100) * 10) / 10;

    data.push({
      month: new Date(2025, i).toISOString().slice(0, 7),
      dau,
      wau,
      mau,
      feature_adoption: adoption,
      stickiness,
      engagement,
    });
  }
  return data;
}
