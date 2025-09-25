"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

// -------- Plotly (client-only) --------
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      Loading plot...
    </div>
  ),
});

// -------- Types --------
type EqKind = "explicit2D" | "implicit2D" | "explicit3D" | "implicit3D" | "constant" | "identityTrue" | "identityFalse";

interface EquationItem {
  id: string;
  expr: string;
  color: string;
  visible: boolean;
}

interface MathVisualizerProps {
  sharedData?: any;
  setSharedData?: (d: any) => void;
}

// -------- Utilities --------
const COLORS = ["#a78bfa", "#4ecdc4", "#45b7d1", "#ff6b6b", "#f7b267", "#93c5fd", "#f472b6"];

const hasVar = (expr: string, v: "x" | "y" | "z" | "t") =>
  new RegExp(`(^|[^a-zA-Z0-9_])${v}([^a-zA-Z0-9_]|$)`, "i").test(expr);

const trimWS = (s: string) => s.replace(/\s+/g, "");

// Normalize: let users type `y=...`, `z=...`, `exp`, `ipi` etc.
const normalize = (raw: string) => {
  let s = raw.trim();
  s = s.replace(/ipi/gi, "i*pi");
  // Common aliases for exp()
  s = s.replace(/\bexp\(/gi, "e^(");
  return s;
};

// Equation classification
function classify(exprRaw: string, is3DMode: boolean): EqKind {
  const expr = normalize(exprRaw);
  const hasX = hasVar(expr, "x");
  const hasY = hasVar(expr, "y");
  const hasZ = hasVar(expr, "z");
  const hasT = hasVar(expr, "t");

  const hasEq = expr.includes("=");

  // Identity checks (no variables)
  if (!hasX && !hasY && !hasZ && !hasT) {
    // If it is `A=B`, evaluate A-B; if single expression, it’s a constant
    return hasEq ? "constant" : "constant";
  }

  // If user wrote y=... or z=... treat as explicit
  if (/^\s*y\s*=/.test(expr)) return "explicit2D";
  if (/^\s*z\s*=/.test(expr)) return "explicit3D";

  // No equals: explicit functions
  if (!hasEq) {
    // 3D explicit if depends on x and y (and maybe t)
    if (hasX && hasY) return "explicit3D";
    // otherwise explicit2D (function of x, maybe t)
    return "explicit2D";
  }

  // With equals and variables: implicit
  if (hasZ || (is3DMode && (hasX || hasY))) return "implicit3D";
  return "implicit2D";
}

// Safe mathjs evaluate; window.math is loaded async
function safeEval(expr: string, scope: Record<string, number>) {
  try {
    const math: any = (window as any).math;
    if (!math) return NaN;
    return math.evaluate(expr, scope);
  } catch {
    return NaN;
  }
}

// Convert "A=B" to "A-(B)" for implicit plotting: F(...) = 0
const toZeroLevel = (exprRaw: string) => {
  const expr = normalize(exprRaw);
  if (!expr.includes("=")) return expr;
  const [L, R] = expr.split("=");
  return `(${L ?? "0"})-(${R ?? "0"})`;
};

// -------- Component --------
export default function MathVisualizer({ sharedData, setSharedData }: MathVisualizerProps) {
  // UI State
  const [mode3D, setMode3D] = useState(false);
  const [equations, setEquations] = useState<EquationItem[]>([
    { id: crypto.randomUUID(), expr: "y = cos(x + 5t)", color: COLORS[1], visible: true },
    { id: crypto.randomUUID(), expr: "y = x^2", color: COLORS[2], visible: true },
    { id: crypto.randomUUID(), expr: "z = sin(x)*cos(y)", color: COLORS[0], visible: false },
    { id: crypto.randomUUID(), expr: "x^2 + y^2 + z^2 = 9", color: COLORS[3], visible: false },
  ]);
  const [activeId, setActiveId] = useState<string | null>(equations[0]?.id ?? null);

  // Global t (animation parameter)
  const [t, setT] = useState(0);
  const [anim, setAnim] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1);

  // Ranges: 2D defaults; 3D must be 30×30×30 as requested
  const [xRange, setXRange] = useState<{ min: number; max: number }>({ min: -10, max: 10 });
  const [yRange, setYRange] = useState<{ min: number; max: number }>({ min: -10, max: 10 });

  // 30×30×30 bounds for 3D
  const [x3, setX3] = useState<{ min: number; max: number }>({ min: -15, max: 15 });
  const [y3, setY3] = useState<{ min: number; max: number }>({ min: -15, max: 15 });
  const [z3, setZ3] = useState<{ min: number; max: number }>({ min: -15, max: 15 });

  // Sampling density controls
  const [res2D, setRes2D] = useState(600); // # of x-samples in 2D
  const [grid3D, setGrid3D] = useState(30); // # points per axis (<= 36 recommended for perf)

  // MathJS loader
  const [mathReady, setMathReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const mathjs = await import("mathjs");
        const { create, all } = mathjs;
        (window as any).math = create(all, {});
        setMathReady(true);
      } catch (e) {
        console.error("MathJS load failed", e);
      }
    })();
  }, []);

  // Animation
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!anim) return;
    let last = 0;
    const step = (ts: number) => {
      if (ts - last > 16) {
        setT((prev) => prev + 0.02 * animSpeed);
        last = ts;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [anim, animSpeed]);

  // ------- Core Generators -------
  const genExplicit2D = useCallback(
    (exprRaw: string, color: string) => {
      const expr = normalize(exprRaw);
      // Accept "y = f(x,t)" or just "f(x,t)"
      const rhs = expr.includes("=") ? expr.split("=")[1] : expr;
      const xVals: number[] = [];
      const yVals: number[] = [];
      const dx = (xRange.max - xRange.min) / Math.max(2, res2D - 1);

      for (let x = xRange.min; x <= xRange.max + 1e-9; x += dx) {
        const out = safeEval(rhs, { x, t });
        const y = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
        if (Number.isFinite(y)) {
          xVals.push(x);
          yVals.push(y);
        } else {
          // break the path on NaNs to avoid spikes
          if (xVals.length && yVals.length) {
            xVals.push(NaN);
            yVals.push(NaN);
          }
        }
      }

      return {
        type: "scatter",
        mode: "lines",
        x: xVals,
        y: yVals,
        line: { color, width: 2.5 },
        name: exprRaw,
        hovertemplate: "x=%{x:.3f}<br>y=%{y:.3f}<extra></extra>",
      } as any;
    },
    [xRange, res2D, t]
  );

  const genImplicit2D = useCallback(
    (exprRaw: string, color: string) => {
      const F = toZeroLevel(exprRaw);
      // Build grid over (x,y), evaluate z = F(x,y,t)
      const xs: number[] = [];
      const ys: number[] = [];
      const nx = Math.max(80, Math.floor(res2D * 0.75));
      const ny = nx;
      const dx = (xRange.max - xRange.min) / (nx - 1);
      const dy = (yRange.max - yRange.min) / (ny - 1);

      for (let i = 0; i < nx; i++) xs.push(xRange.min + i * dx);
      for (let j = 0; j < ny; j++) ys.push(yRange.min + j * dy);

      const z: number[][] = new Array(ny);
      for (let j = 0; j < ny; j++) {
        const row: number[] = new Array(nx);
        for (let i = 0; i < nx; i++) {
          const out = safeEval(F, { x: xs[i], y: ys[j], t });
          const v = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
          row[i] = Number.isFinite(v) ? v : NaN;
        }
        z[j] = row;
      }

      return {
        type: "contour",
        x: xs,
        y: ys,
        z,
        contours: { start: 0, end: 0, size: 1, coloring: "lines" },
        line: { color, width: 2.5 },
        showscale: false,
        name: exprRaw,
        hoverinfo: "skip",
      } as any;
    },
    [xRange, yRange, res2D, t]
  );

  const genExplicit3D = useCallback(
    (exprRaw: string, color: string) => {
      const expr = normalize(exprRaw);
      const rhs = expr.includes("=") ? expr.split("=")[1] : expr;

      const nx = Math.max(2, Math.min(50, grid3D)); // Limit grid size for performance
      const ny = Math.max(2, Math.min(50, grid3D));
      const xs: number[] = [];
      const ys: number[] = [];
      const dx = (x3.max - x3.min) / (nx - 1);
      const dy = (y3.max - y3.min) / (ny - 1);
      for (let i = 0; i < nx; i++) xs.push(x3.min + i * dx);
      for (let j = 0; j < ny; j++) ys.push(y3.min + j * dy);

      const z: number[][] = new Array(ny);
      for (let j = 0; j < ny; j++) {
        const row: number[] = new Array(nx);
        for (let i = 0; i < nx; i++) {
          const out = safeEval(rhs, { x: xs[i], y: ys[j], t });
          const v = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
          row[i] = Number.isFinite(v) ? v : 0; // Use 0 instead of NaN for WebGL compatibility
        }
        z[j] = row;
      }

      // Ensure all arrays have the same length and are properly formatted
      if (xs.length !== nx || ys.length !== ny || z.length !== ny || z[0]?.length !== nx) {
        console.warn("3D surface data mismatch, skipping plot");
        return null;
      }

      return {
        type: "surface",
        x: xs,
        y: ys,
        z,
        colorscale: [["0", color], ["1", color]],
        showscale: false,
        opacity: 0.8,
        name: exprRaw,
        hovertemplate: "x=%{x:.2f}<br>y=%{y:.2f}<br>z=%{z:.2f}<extra></extra>",
        connectgaps: false,
      } as any;
    },
    [grid3D, x3, y3, t]
  );

  const genImplicit3D = useCallback(
    (exprRaw: string, color: string) => {
      const F = toZeroLevel(exprRaw);

      const nx = Math.max(2, Math.min(30, grid3D)); // Limit for performance
      const ny = Math.max(2, Math.min(30, grid3D));
      const nz = Math.max(2, Math.min(30, grid3D));

      const xs: number[] = [];
      const ys: number[] = [];
      const zs: number[] = [];

      const dx = (x3.max - x3.min) / (nx - 1);
      const dy = (y3.max - y3.min) / (ny - 1);
      const dz = (z3.max - z3.min) / (nz - 1);

      for (let i = 0; i < nx; i++) xs.push(x3.min + i * dx);
      for (let j = 0; j < ny; j++) ys.push(y3.min + j * dy);
      for (let k = 0; k < nz; k++) zs.push(z3.min + k * dz);

      // Flattened volume arrays for Plotly isosurface
      const X: number[] = [];
      const Y: number[] = [];
      const Z: number[] = [];
      const VAL: number[] = [];

      for (let k = 0; k < nz; k++) {
        for (let j = 0; j < ny; j++) {
          for (let i = 0; i < nx; i++) {
            const x = xs[i], y = ys[j], z = zs[k];
            const out = safeEval(F, { x, y, z, t });
            const v = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
            X.push(x); Y.push(y); Z.push(z);
            VAL.push(Number.isFinite(v) ? v : 0); // Use 0 instead of NaN
          }
        }
      }

      // Validate data before returning
      if (X.length !== nx * ny * nz || Y.length !== nx * ny * nz || Z.length !== nx * ny * nz || VAL.length !== nx * ny * nz) {
        console.warn("3D isosurface data mismatch, skipping plot");
        return null;
      }

      return {
        type: "isosurface",
        x: X, y: Y, z: Z, value: VAL,
        isomin: -0.1, isomax: 0.1, // Small range around zero for better visualization
        surface: { show: true, count: 1 },
        caps: { x: { show: false }, y: { show: false }, z: { show: false } },
        showscale: false,
        colorscale: [["0", color], ["1", color]],
        name: exprRaw,
        opacity: 0.8,
      } as any;
    },
    [grid3D, x3, y3, z3, t]
  );

  // Constants / Identities handling
  const genConstant2D = useCallback((exprRaw: string, color: string): any => {
    const expr = normalize(exprRaw);
    // y=const or const
    let val: number;
    if (expr.includes("=")) {
      const rhs = expr.split("=")[1] ?? "0";
      const out = safeEval(rhs, { t });
      val = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
    } else {
      const out = safeEval(expr, { t });
      val = (typeof out === "object" && out?.re != null) ? out.re : Number(out);
    }
    if (!Number.isFinite(val)) return null;

    return {
      type: "scatter",
      mode: "lines",
      x: [xRange.min, xRange.max],
      y: [val, val],
      line: { color, width: 2, dash: "dot" },
      name: exprRaw,
      hovertemplate: "y=%{y:.3f}<extra></extra>",
    } as any;
  }, [xRange, t]);

  // Identity verdict (A=B): true everywhere / false everywhere (no solution)
  function identityVerdict(exprRaw: string): "true" | "false" | "unknown" {
    if (!exprRaw.includes("=")) return "unknown";
    const F = toZeroLevel(exprRaw);
    const out = safeEval(F, { });
    if (typeof out === "number" && Number.isFinite(out)) {
      return Math.abs(out) < 1e-12 ? "true" : "false";
    }
    return "unknown";
  }

  // -------- Build traces from all equations --------
  const traces = useMemo(() => {
    if (!mathReady) return [];

    const list: any[] = [];

    for (const eq of equations) {
      if (!eq.visible) continue;

      const kind = classify(eq.expr, mode3D);

      // Identity handling (no variables + equals)
      if (kind === "constant" && eq.expr.includes("=")) {
        const verdict = identityVerdict(eq.expr);
        if (verdict === "true") {
          // Show info line near top
          list.push({
            type: "scatter",
            mode: "text",
            x: [mode3D ? x3.min : xRange.min],
            y: [mode3D ? y3.max : yRange.max],
            text: [`"${eq.expr}" is true (all points)`],
            textfont: { color: "#9ca3af" },
            hoverinfo: "skip",
            showlegend: false,
          } as any);
          continue;
        } else if (verdict === "false") {
          list.push({
            type: "scatter",
            mode: "text",
            x: [mode3D ? x3.min : xRange.min],
            y: [mode3D ? y3.max : yRange.max],
            text: [`"${eq.expr}" has no solutions`],
            textfont: { color: "#ef4444" },
            hoverinfo: "skip",
            showlegend: false,
          } as any);
          continue;
        }
        // fallthrough: unknown → treat as implicit
      }

      // Route to generators
      if (!mode3D) {
        if (kind === "explicit2D") {
          const tr = genExplicit2D(eq.expr, eq.color);
          if (tr) list.push(tr);
        } else if (kind === "implicit2D") {
          const tr = genImplicit2D(eq.expr, eq.color);
          if (tr) list.push(tr);
        } else if (kind === "constant") {
          const tr = genConstant2D(eq.expr, eq.color);
          if (tr) list.push(tr);
        } else {
          // fallback
          const tr = genExplicit2D(eq.expr, eq.color);
          if (tr) list.push(tr);
        }
      } else {
        // 3D mode - add safety checks
        try {
          if (kind === "explicit3D") {
            const tr = genExplicit3D(eq.expr, eq.color);
            if (tr && tr.x && tr.y && tr.z && Array.isArray(tr.z) && tr.z.length > 0) {
              list.push(tr);
            }
          } else if (kind === "implicit3D" || kind === "implicit2D") {
            const tr = genImplicit3D(eq.expr, eq.color);
            if (tr && tr.x && tr.y && tr.z && tr.value && Array.isArray(tr.value) && tr.value.length > 0) {
              list.push(tr);
            }
          } else if (kind === "constant") {
            // in 3D constants don't render meaningfully—show an info tag
            list.push({
              type: "scatter3d",
              mode: "text",
              x: [x3.min], y: [y3.max], z: [z3.max],
              text: [`"${eq.expr}" is constant`],
              textfont: { color: "#9ca3af" },
              hoverinfo: "skip",
              showlegend: false,
            } as any);
          } else {
            const tr = genExplicit3D(eq.expr, eq.color);
            if (tr && tr.x && tr.y && tr.z && Array.isArray(tr.z) && tr.z.length > 0) {
              list.push(tr);
            }
          }
        } catch (error) {
          console.warn(`Error generating 3D plot for "${eq.expr}":`, error);
          // Skip this equation if it causes errors
        }
      }
    }

    return list;
  }, [
    equations, mode3D, mathReady,
    genExplicit2D, genImplicit2D, genExplicit3D, genImplicit3D, genConstant2D,
    xRange, yRange, x3, y3, z3
  ]);

  // -------- Layout / Config --------
  const layout = useMemo(() => {
    if (!mode3D) {
      return {
        title: { text: "2D Math Visualizer", font: { color: "white", size: 18 } },
        xaxis: { range: [xRange.min, xRange.max], gridcolor: "#2e3440", zerolinecolor: "#475569", color: "white" },
        yaxis: { range: [yRange.min, yRange.max], gridcolor: "#2e3440", zerolinecolor: "#475569", color: "white" },
        margin: { l: 60, r: 20, t: 40, b: 50 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "white" },
        legend: { font: { color: "white" } },
      } as any;
    }

    return {
      title: { text: "3D Math Visualizer", font: { color: "white", size: 18 } },
      scene: {
        xaxis: { range: [x3.min, x3.max], gridcolor: "#2e3440", zerolinecolor: "#475569", color: "white", title: "x" },
        yaxis: { range: [y3.min, y3.max], gridcolor: "#2e3440", zerolinecolor: "#475569", color: "white", title: "y" },
        zaxis: { range: [z3.min, z3.max], gridcolor: "#2e3440", zerolinecolor: "#475569", color: "white", title: "z" },
        bgcolor: "rgba(0,0,0,0)",
        aspectmode: "cube",
        camera: { eye: { x: 1.6, y: 1.6, z: 1.2 } },
      },
      margin: { l: 0, r: 0, t: 40, b: 0 },
      paper_bgcolor: "rgba(0,0,0,0)",
      font: { color: "white" },
      legend: { font: { color: "white" } },
    } as any;
  }, [mode3D, xRange, yRange, x3, y3, z3]);

  const config = useMemo(
    () => ({ displayModeBar: true, displaylogo: false, responsive: true, scrollZoom: true }),
    []
  );

  // -------- UI helpers --------
  const addEquation = () => {
    const color = COLORS[equations.length % COLORS.length];
    const id = crypto.randomUUID();
    setEquations((prev) => [
      ...prev,
      { id, expr: mode3D ? "z = sin(x)+cos(y)" : "y = sin(x)", color, visible: true },
    ]);
    setActiveId(id);
  };

  const updateEquation = (id: string, patch: Partial<EquationItem>) => {
    setEquations((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const deleteEquation = (id: string) => {
    setEquations((prev) => prev.filter((e) => e.id !== id));
    if (activeId === id) setActiveId(null);
  };

  // -------- Render --------
  if (!mathReady) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-black text-white/80">
        Loading math engine…
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-black text-white grid grid-cols-12 gap-4 p-4">
      {/* Sidebar (Desmos-like, dark) */}
      <aside className="col-span-4 lg:col-span-3 xl:col-span-3 bg-[#0b0f17] border border-white/10 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Math Visualizer</h2>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!mode3D ? "text-white" : "text-white/40"}`}>2D</span>
            <button
              onClick={() => setMode3D((v) => !v)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${mode3D ? "bg-blue-600" : "bg-gray-600"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mode3D ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm ${mode3D ? "text-white" : "text-white/40"}`}>3D</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addEquation}
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          >
            + Add Expression
          </button>
          <button
            onClick={() => {
              setEquations([]);
              setActiveId(null);
            }}
            className="py-2 px-3 rounded-xl bg-gray-700 hover:bg-gray-600 border border-white/10"
            title="Clear all expressions"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-2 max-h-[52vh] overflow-auto pr-1">
          {equations.map((eq) => {
            const active = eq.id === activeId;
            return (
              <div
                key={eq.id}
                className={`rounded-xl border ${active ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-[#101826]"} p-3`}
                onClick={() => setActiveId(eq.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={eq.color}
                    onChange={(e) => updateEquation(eq.id, { color: e.target.value })}
                    className="h-6 w-6 rounded-md bg-transparent"
                    title="Color"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={eq.visible}
                      onChange={(e) => updateEquation(eq.id, { visible: e.target.checked })}
                    />
                    visible
                  </label>
                  <button
                    className="ml-auto text-red-300 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEquation(eq.id);
                    }}
                    aria-label="Delete"
                  >
                    ×
                  </button>
                </div>
                <input
                  className="w-full bg-[#0b111a] border border-white/10 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:border-purple-500"
                  value={eq.expr}
                  onChange={(e) => updateEquation(eq.id, { expr: e.target.value })}
                  placeholder={mode3D ? "z = f(x, y, t)  or  F(x,y,z,t)=0" : "y = f(x, t)  or  F(x,y,t)=0"}
                />
                <div className="mt-2 text-[11px] text-white/60 font-mono">
                  {(() => {
                    const k = classify(eq.expr, mode3D);
                    return `type: ${k}`;
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="rounded-2xl border border-white/10 p-3 space-y-3">
          <div className="text-sm font-semibold">Parameter t</div>
          <div className="flex items-center gap-3">
            <input
              type="range" min={-20} max={20} step={0.01}
              value={t}
              onChange={(e) => setT(parseFloat(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="w-16 text-right font-mono text-white/80">{t.toFixed(2)}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAnim((v) => !v)}
              className={`px-3 py-1.5 rounded-lg ${anim ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              {anim ? "Stop" : "Animate"}
            </button>
            <div className="flex-1">
              <input
                type="range" min={0.1} max={3} step={0.1}
                value={animSpeed}
                onChange={(e) => setAnimSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
            <div className="w-14 text-right font-mono text-white/80">{animSpeed.toFixed(1)}×</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 p-3 space-y-3">
          <div className="text-sm font-semibold">Ranges & Resolution</div>
          {/* Simplified numeric inputs only */}
          {!mode3D ? (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center gap-2">
                x-min
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={xRange.min} onChange={(e) => setXRange({ ...xRange, min: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                x-max
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={xRange.max} onChange={(e) => setXRange({ ...xRange, max: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                y-min
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={yRange.min} onChange={(e) => setYRange({ ...yRange, min: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                y-max
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={yRange.max} onChange={(e) => setYRange({ ...yRange, max: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2 col-span-2">
                samples
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={res2D} onChange={(e) => setRes2D(parseInt(e.target.value) || 200)}/>
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center gap-2">
                x-min
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={x3.min} onChange={(e) => setX3({ ...x3, min: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                x-max
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={x3.max} onChange={(e) => setX3({ ...x3, max: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                y-min
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={y3.min} onChange={(e) => setY3({ ...y3, min: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                y-max
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={y3.max} onChange={(e) => setY3({ ...y3, max: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                z-min
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={z3.min} onChange={(e) => setZ3({ ...z3, min: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2">
                z-max
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={z3.max} onChange={(e) => setZ3({ ...z3, max: +e.target.value })}/>
              </label>
              <label className="flex items-center gap-2 col-span-2">
                grid (per axis)
                <input type="number" className="bg-[#0b111a] w-full px-2 py-1 rounded border border-white/10"
                  value={grid3D} onChange={(e) => setGrid3D(Math.max(10, Math.min(60, parseInt(e.target.value) || 30)))}/>
              </label>
            </div>
          )}
        </div>
      </aside>

      {/* Plot area */}
      <main className="col-span-8 lg:col-span-9 xl:col-span-9 bg-[#0b0f17] border border-white/10 rounded-2xl overflow-hidden">
        <div className="h-[78vh] w-full">
          <Plot data={traces} layout={layout} config={config} style={{ width: "100%", height: "100%" }} useResizeHandler />
        </div>
      </main>
    </div>
  );
}
