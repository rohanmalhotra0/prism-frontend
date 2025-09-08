"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

// Declare global objects
declare global {
  interface Window {
    math: any;
    Plotly: any;
  }
}

// Dynamically import Plotly React wrapper
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white">
      Loading plot...
    </div>
  ),
});

interface MathVisualizerProps {
  sharedData: any;
  setSharedData: (data: any) => void;
}

interface Equation {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

export default function MathVisualizer({
  sharedData,
  setSharedData,
}: MathVisualizerProps) {
  const [equations, setEquations] = useState<Equation[]>([
    { id: "1", expression: "sin(x+t)", color: "#ff6b6b", visible: true },
    { id: "2", expression: "cos(x+t)", color: "#4ecdc4", visible: true },
    { id: "3", expression: "x^2", color: "#45b7d1", visible: true },
  ]);

  const [activeEquation, setActiveEquation] = useState("1");
  const [is3D, setIs3D] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [plotData, setPlotData] = useState<any[]>([]);
  const [plotLayout, setPlotLayout] = useState<any>(null);
  const [plotConfig, setPlotConfig] = useState<any>(null);

  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const [mathLoaded, setMathLoaded] = useState(false);
  const plotRef = useRef<any>(null);

  const [xRange, setXRange] = useState({ min: -10, max: 10 });
  const [yRange, setYRange] = useState({ min: -10, max: 10 });
  const [zRange, setZRange] = useState({ min: -10, max: 10 });

  // Load mathjs dynamically
  useEffect(() => {
    const loadMath = async () => {
      try {
        const mathjs = await import("mathjs");
        const { create, all } = mathjs;
        window.math = create(all, {});
        setMathLoaded(true);
      } catch (error) {
        console.error("Failed to load mathjs:", error);
      }
    };
    loadMath();
  }, []);

  // Math evaluator
  const evaluateExpression = useCallback(
    (expression: string, x: number, y?: number, t?: number): number => {
      if (!window.math) return 0;
      try {
        return window.math.evaluate(expression, { x, y: y || 0, t: t || 0 });
      } catch {
        return NaN;
      }
    },
    []
  );

  // Generate 2D data
  const generate2DData = useCallback(
    (eq: Equation, t: number) => {
      const x: number[] = [];
      const y: number[] = [];
      const step = (xRange.max - xRange.min) / 500;

      for (let xi = xRange.min; xi <= xRange.max; xi += step) {
        const yi = evaluateExpression(eq.expression, xi, undefined, t);
        if (isFinite(yi) && yi >= yRange.min && yi <= yRange.max) {
          x.push(xi);
          y.push(yi);
        }
      }

      return {
        x,
        y,
        type: "scatter",
        mode: "lines",
        line: { color: eq.color, width: 3 },
        name: `f(x) = ${eq.expression}`,
      };
    },
    [xRange, yRange, evaluateExpression]
  );

  // Generate 3D data
  const generate3DData = useCallback(
    (eq: Equation, t: number) => {
      const step = 0.3;
      const xs: number[] = [];
      const ys: number[] = [];

      for (let x = xRange.min; x <= xRange.max; x += step) xs.push(x);
      for (let y = yRange.min; y <= yRange.max; y += step) ys.push(y);

      const z: number[][] = [];
      ys.forEach((yv) => {
        const row: number[] = [];
        xs.forEach((xv) => {
          const zv = evaluateExpression(eq.expression, xv, yv, t);
          row.push(isFinite(zv) ? zv : 0);
        });
        z.push(row);
      });

      return {
        x: xs,
        y: ys,
        z,
        type: "surface",
        colorscale: "Viridis",
        showscale: false,
        opacity: 0.9,
        name: `f(x,y) = ${eq.expression}`,
      };
    },
    [xRange, yRange, evaluateExpression]
  );

  // Generate all data
  const generateData = useCallback(
    (t: number) => {
      const visible = equations.filter((eq) => eq.visible);
      return visible.map((eq) =>
        is3D ? generate3DData(eq, t) : generate2DData(eq, t)
      );
    },
    [equations, is3D, generate2DData, generate3DData]
  );

  // Update plot when layout/data settings change
  useEffect(() => {
    if (!mathLoaded) return;
    const data = generateData(timeRef.current);
    setPlotData(data);

    const layout = is3D
      ? {
          title: { text: "3D Math Visualizer", font: { color: "white" } },
          scene: {
            xaxis: { range: [xRange.min, xRange.max], color: "white" },
            yaxis: { range: [yRange.min, yRange.max], color: "white" },
            zaxis: { range: [zRange.min, zRange.max], color: "white" },
            bgcolor: "rgba(0,0,0,0)",
            aspectmode: "manual",
            aspectratio: { x: 1, y: 1, z: 0.7 },
            dragmode: "orbit",
            uirevision: "scene-1",
            camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } },
          },
          margin: { l: 0, r: 0, t: 40, b: 0 },
          paper_bgcolor: "rgba(0,0,0,0)",
          font: { color: "white" },
          uirevision: "layout-1",
        }
      : {
          title: { text: "2D Math Visualizer", font: { color: "white" } },
          xaxis: { range: [xRange.min, xRange.max], color: "white" },
          yaxis: { range: [yRange.min, yRange.max], color: "white" },
          margin: { l: 60, r: 20, t: 40, b: 40 },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font: { color: "white" },
          uirevision: "layout-1",
        };

    setPlotLayout(layout);
    setPlotConfig({ displayModeBar: true, displaylogo: false, responsive: true, scrollZoom: true });
  }, [equations, is3D, xRange, yRange, zRange, generateData, mathLoaded]);

  // Animation loop - drive updates via React state (Plotly uirevision preserves camera)
  useEffect(() => {
    if (!mathLoaded) return;

    if (isAnimating) {
      let lastFrame = 0;
      const animate = (time: number) => {
        if (time - lastFrame > 50) { // ~20 fps
          timeRef.current += 0.05 * animationSpeed;
          const newData = generateData(timeRef.current);
          // Update through React; uirevision keeps camera/zoom stable
          setPlotData(newData);
          lastFrame = time;
        }
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, animationSpeed, generateData, mathLoaded]);

  // Equation management
  const addEquation = () => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"];
    const newEq: Equation = {
      id: crypto.randomUUID(),
      expression: "sin(x+t)",
      color: colors[equations.length % colors.length],
      visible: true,
    };
    setEquations((prev) => [...prev, newEq]);
    setActiveEquation(newEq.id);
  };

  const updateEquation = (id: string, field: keyof Equation, value: any) => {
    setEquations((prev) =>
      prev.map((eq) => (eq.id === id ? { ...eq, [field]: value } : eq))
    );
  };

  const deleteEquation = (id: string) => {
    setEquations((prev) => prev.filter((eq) => eq.id !== id));
    if (activeEquation === id && equations.length > 1) {
      setActiveEquation(equations[0].id);
    }
  };

  const activeEq = equations.find((eq) => eq.id === activeEquation);

  if (!mathLoaded) {
    return (
      <div className="h-full flex items-center justify-center text-white">
        Loading Math Engine...
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold">
          {is3D ? "3D Math Visualizer" : "2D Math Visualizer"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIs3D(!is3D)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            {is3D ? "Switch to 2D" : "Switch to 3D"}
          </button>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isAnimating ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {isAnimating ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0 px-2">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 bg-gray-900/70 p-4 rounded-xl border border-white/10 overflow-y-auto">
          <h3 className="mb-3 font-semibold">Equations</h3>
          <button
            onClick={addEquation}
            className="mb-4 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            + Add
          </button>

          <div className="space-y-2 mb-4">
            {equations.map((eq) => (
              <div
                key={eq.id}
                onClick={() => setActiveEquation(eq.id)}
                className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                  activeEquation === eq.id ? "bg-purple-700/40 border-purple-500" : "bg-gray-800/70 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-sm">{eq.expression}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEquation(eq.id);
                    }}
                    className="text-red-300 hover:text-red-400"
                    aria-label="Delete equation"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {activeEq && (
            <div className="mb-4">
              <input
                type="text"
                value={activeEq.expression}
                onChange={(e) =>
                  updateEquation(activeEq.id, "expression", e.target.value)
                }
                className="w-full mb-2 px-3 py-2 bg-gray-800 rounded-lg border border-white/10 focus:outline-none focus:border-purple-500"
              />
              <input
                type="color"
                value={activeEq.color}
                onChange={(e) =>
                  updateEquation(activeEq.id, "color", e.target.value)
                }
                className="w-full h-10 rounded-lg"
              />
            </div>
          )}

          {isAnimating && (
            <div className="mb-4">
              <label>Speed: {animationSpeed.toFixed(1)}x</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          )}
        </div>

        {/* Plot */}
        <div className="flex-1 flex bg-gray-800/50 rounded-xl border border-white/10 overflow-hidden min-h-[65vh]">
          {plotData && plotLayout && plotConfig ? (
            <div className="w-full h-full" ref={plotRef}>
              <Plot
                data={plotData}
                layout={plotLayout}
                config={plotConfig}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full text-gray-400">
              Loading plot...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
