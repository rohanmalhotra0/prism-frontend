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
  [k: string]: any; // indicators and overlays can ride along
};

type ThreeDSettings = {
  x: number; // X-axis scaling
  y: number; // Y-axis scaling
  z: number; // Z-axis scaling
  indicators?: string[];
  overlays?: string[];
};

type Props = {
  data: Row[];
  symbol: string;
  height?: number;
  gap?: number;
  baseThickness?: number;
  threeDSettings?: ThreeDSettings;
};

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

  // Precompute all candles
  const candles = useMemo(() => {
    const maxVol = Math.max(...data.map((d) => d.Volume || 1));

    return data.map((d, i) => {
      const x = i * gap * xScale;

      // Price → Y
      const o = ((d.Open - minLow) / yRange) * height * yScale;
      const c = ((d.Close - minLow) / yRange) * height * yScale;
      const h = ((d.High - minLow) / yRange) * height * yScale;
      const l = ((d.Low - minLow) / yRange) * height * yScale;

      const bodyHeight = Math.max(0.002, Math.abs(c - o));
      const bodyMid = Math.min(o, c) + bodyHeight / 2;

      // Indicator or Volume → Z
      let z = 0;
      if (threeDSettings?.indicators && threeDSettings.indicators.length > 0) {
        const ind = threeDSettings.indicators[0];
        if (d[ind] !== undefined) {
          z = (Number(d[ind]) || 0) * 0.05 * zScale; // normalize indicator depth
        }
      } else if (d.Volume) {
        z = ((d.Volume ?? 0) / maxVol) * 5 * zScale;
      }

      const color = d.Close >= d.Open ? "#26a69a" : "#ef5350";

      return {
        x,
        z,
        wick: { y: (h + l) / 2, h: Math.max(0.002, h - l) },
        body: { y: bodyMid, h: bodyHeight, t: baseThickness },
        color,
        date: d.Date,
        d,
      };
    });
  }, [data, gap, xScale, yScale, zScale, height, minLow, yRange, baseThickness, threeDSettings]);

  return (
    <>
      {candles.map((c, i) => (
        <group key={i}>
          {/* Wick */}
          <mesh
            position={[c.x, c.wick.y, c.z]}
            scale={[0.05, c.wick.h, 0.05]}
            onPointerOver={() => setHover(i)}
            onPointerOut={() => setHover(null)}
          >
            <boxGeometry />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>

          {/* Body */}
          <mesh
            position={[c.x, c.body.y, c.z]}
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
        <Html position={[candles[hover].x, candles[hover].body.y, candles[hover].z + 1]} center>
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

function Overlays2D({ data, overlays, gap = 1, xScale = 1 }: { data: Row[]; overlays?: string[]; gap?: number; xScale?: number }) {
  if (!overlays || overlays.length === 0) return null;

  return (
    <group>
      {overlays.map((overlay, idx) => {
        if (!overlay) return null;

        const points = data
          .filter((d) => d[overlay] !== undefined)
          .map((d, i) => new THREE.Vector3(i * gap * xScale, d[overlay], 0)); // force flat z=0

        if (points.length < 2) return null;

        return (
          <line key={idx}>
            <bufferGeometry attach="geometry" setFromPoints={points} />
            <lineBasicMaterial color={idx === 0 ? "yellow" : "cyan"} linewidth={2} />
          </line>
        );
      })}
    </group>
  );
}

function Grid3D({ width, height, depth }: { width: number; height: number; depth: number }) {
  return (
    <group>
      {/* Base grid */}
      <gridHelper args={[width, 20, "#555", "#333"]} position={[width / 2, 0, 0]} />
      {/* Y axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, height, 0]), 3]}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#888" />
      </line>
      {/* Z axis */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, 0, 0, depth]), 3]}
            count={2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="purple" />
      </line>
    </group>
  );
}

export default function ThreeStockChart({
  data,
  symbol,
  height = 20,
  gap = 1,
  baseThickness = 0.15,
  threeDSettings,
}: Props) {
  const controlsRef = useRef<any>(null);

  const xScale = threeDSettings?.x ?? 1;
  const width = data.length * gap * xScale;
  const depth = (threeDSettings?.z ?? 1) * 10;

  const resetCamera = useCallback(() => {
    if (controlsRef.current) controlsRef.current.reset();
  }, []);

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden border border-white/10 relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[width * 0.3, height * 0.6, depth * 1.5]} fov={55} />
        <color attach="background" args={["#0a0a0f"]} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={1.0} castShadow />

        {/* Grid */}
        <Grid3D width={width} height={height} depth={depth} />

        {/* Title */}
        <Text position={[0, height + 2, 0]} fontSize={1} color="#e2e8f0" anchorX="left">
          {symbol} • 3D Chart
        </Text>

        {/* Candles */}
        <Candles
          data={data}
          gap={gap}
          baseThickness={baseThickness}
          height={height}
          threeDSettings={threeDSettings}
        />

        {/* Overlays (2D flat) */}
        <Overlays2D data={data} overlays={threeDSettings?.overlays} gap={gap} xScale={xScale} />

        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={Math.max(100, width * 2)}
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
