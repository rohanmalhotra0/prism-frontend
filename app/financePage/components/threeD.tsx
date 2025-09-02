"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useCallback } from "react";

type Row = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume?: number;
  [k: string]: any;
};

type ThreeDSettings = {
  x: number;  // X-axis scaling
  y: number;  // Y-axis scaling
  z: number;  // Z-axis scaling
};

type Props = {
  data: Row[];
  symbol: string;
  chartType: "candlestick" | "area";
  height?: number;
  gap?: number;
  baseThickness?: number;
  threeDSettings?: ThreeDSettings;
};

/* ---------------- Candlestick ---------------- */
function Candles({
  data,
  gap = 1,
  baseThickness = 0.15,
  height = 20,
  threeDSettings,
}: {
  data: Row[];
  gap?: number;
  baseThickness?: number;
  height?: number;
  threeDSettings?: ThreeDSettings;
}) {
  const [hover, setHover] = useState<number | null>(null);

  const xScale = threeDSettings?.x ?? 1;
  const yScale = threeDSettings?.y ?? 1;
  const zScale = threeDSettings?.z ?? 1;

  const minLow = Math.min(...data.map((d) => d.Low));
  const maxHigh = Math.max(...data.map((d) => d.High));
  const yRange = maxHigh - minLow || 1;

  const candles = useMemo(() => {
    return data.map((d, i) => {
      const x = i * gap * xScale;
      const o = ((d.Open - minLow) / yRange) * height * yScale;
      const c = ((d.Close - minLow) / yRange) * height * yScale;
      const h = ((d.High - minLow) / yRange) * height * yScale;
      const l = ((d.Low - minLow) / yRange) * height * yScale;

      const bodyHeight = Math.max(0.002, Math.abs(c - o));
      const bodyMid = Math.min(o, c) + bodyHeight / 2;

      const color = d.Close >= d.Open ? "#26a69a" : "#ef5350";

      return {
        x,
        wick: { y: (h + l) / 2, h: Math.max(0.002, h - l) },
        body: { y: bodyMid, h: bodyHeight, t: baseThickness * zScale },
        color,
        date: d.Date,
        d,
      };
    });
  }, [data, gap, xScale, yScale, zScale, height, minLow, yRange, baseThickness]);

  return (
    <>
      {candles.map((c, i) => (
        <group key={i}>
          {/* Wick */}
          <mesh
            position={[c.x, c.wick.y, 0]}
            scale={[0.05, c.wick.h, 0.05]}
            onPointerOver={() => setHover(i)}
            onPointerOut={() => setHover(null)}
          >
            <boxGeometry />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>

          {/* Body */}
          <mesh
            position={[c.x, c.body.y, 0]}
            scale={[0.6, c.body.h, c.body.t]}
            onPointerOver={() => setHover(i)}
            onPointerOut={() => setHover(null)}
          >
            <boxGeometry />
            <meshStandardMaterial color={c.color} />
          </mesh>
        </group>
      ))}

      {/* Tooltip */}
      {hover !== null && (
        <Html position={[candles[hover].x, candles[hover].body.y, 1]} center>
          <div className="backdrop-blur-md bg-black/70 text-white text-xs rounded-md px-2 py-1 border border-white/10">
            <div>{candles[hover].date}</div>
            <div>O: {candles[hover].d.Open.toFixed(2)}</div>
            <div>H: {candles[hover].d.High.toFixed(2)}</div>
            <div>L: {candles[hover].d.Low.toFixed(2)}</div>
            <div>C: {candles[hover].d.Close.toFixed(2)}</div>
            {candles[hover].d.Volume && (
              <div>V: {candles[hover].d.Volume.toLocaleString()}</div>
            )}
          </div>
        </Html>
      )}
    </>
  );
}

/* ---------------- Area Chart ---------------- */
function AreaChart({
  data,
  height = 20,
  gap = 1,
  threeDSettings,
}: {
  data: Row[];
  height?: number;
  gap?: number;
  threeDSettings?: ThreeDSettings;
}) {
  const xScale = threeDSettings?.x ?? 1;
  const yScale = threeDSettings?.y ?? 1;

  const minLow = Math.min(...data.map((d) => d.Low));
  const maxHigh = Math.max(...data.map((d) => d.High));
  const yRange = maxHigh - minLow || 1;

  const vertices = useMemo(() => {
    return data.map((d, i) => {
      const x = i * gap * xScale;
      const y = ((d.Close - minLow) / yRange) * height * yScale;
      return new THREE.Vector3(x, y, 0);
    });
  }, [data, gap, xScale, yScale, height, minLow, yRange]);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(vertices);
    return geom;
  }, [vertices]);

  return (
    <group>
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial attach="material" color="#4cafef" linewidth={2} />
      </line>
    </group>
  );
}

/* ---------------- Main Export ---------------- */
export default function ThreeStockChart({
  data,
  symbol,
  chartType,
  height = 20,
  gap = 1,
  baseThickness = 0.15,
  threeDSettings,
}: Props) {
  const controlsRef = useRef<any>(null);
  const width = data.length * gap * (threeDSettings?.x ?? 1);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) controlsRef.current.reset();
  }, []);

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden border border-white/10 relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera
          makeDefault
          position={[width * 0.3, height * 0.6, width * 0.5]}
          fov={55}
        />
        <color attach="background" args={["#0a0a0f"]} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={1.0} castShadow />

        {/* Chart Title */}
        <Text position={[0, height + 2, 0]} fontSize={1} color="#e2e8f0" anchorX="left">
          {symbol} • 3D {chartType === "candlestick" ? "Candlestick" : "Area"} Chart
        </Text>

        {/* Chart Content */}
        {chartType === "candlestick" ? (
          <Candles
            data={data}
            gap={gap}
            baseThickness={baseThickness}
            height={height}
            threeDSettings={threeDSettings}
          />
        ) : (
          <AreaChart data={data} height={height} gap={gap} threeDSettings={threeDSettings} />
        )}

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={Math.max(80, width)}
          target={[width / 2, height / 2, 0]}
        />
      </Canvas>

      {/* Reset Button */}
      <button
        onClick={resetCamera}
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg"
      >
        Reset View
      </button>
    </div>
  );
}
