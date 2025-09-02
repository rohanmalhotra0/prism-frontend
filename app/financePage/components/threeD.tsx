"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Instances, Instance, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useCallback } from "react";

type Row = {
  Date: string;        // "YYYY-MM-DD"
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume?: number;
  [k: string]: any;    // overlays can ride along
};

type ThreeDSettings = {
  // 2D Chart Settings
  symbol: string;
  chartType: string;
  overlays: string[];
  indicators: string[];
  timePeriod: string;
  
  // 3D Specific Settings
  x: number;  // X-axis scaling (time/position)
  y: number;  // Y-axis scaling (price/height)
  z: number;  // Z-axis scaling (indicators/depth)
};

type Props = {
  data: Row[];               // OHLCV from your backend
  symbol: string;
  height?: number;           // vertical world-units (price axis)
  gap?: number;              // spacing between candles (x)
  baseThickness?: number;    // min candle thickness (z)
  threeDSettings?: ThreeDSettings; // 3D-specific settings
};

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

function useScales(data: Row[], height: number) {
  const { yScale, xScale, volScale, minLow, maxHigh } = useMemo(() => {
    const minLow  = Math.min(...data.map(d => d.Low));
    const maxHigh = Math.max(...data.map(d => d.High));
    const yRange  = maxHigh - minLow || 1;

    const yScale = (p: number) => ((p - minLow) / yRange) * height;

    // X is index-based for now (uniform spacing)
    const xScale = (i: number) => i;

    // volume → thickness scaler (0..1)
    const vols = data.map(d => d.Volume ?? 0);
    const vMax = Math.max(1, ...vols);
    const volScale = (v: number) => (vMax ? v / vMax : 0);

    return { yScale, xScale, volScale, minLow, maxHigh };
  }, [data, height]);

  return { yScale, xScale, volScale, minLow, maxHigh };
}

function Candles({ data, gap = 1, baseThickness = 0.15, height = 20, threeDSettings }: { 
  data: Row[]; 
  gap: number; 
  baseThickness: number; 
  height: number; 
  threeDSettings?: ThreeDSettings; 
}) {
  const { yScale, xScale, volScale } = useScales(data, height);
  const [hover, setHover] = useState<number | null>(null);
  
  // Use 3D settings if provided, otherwise use defaults
  const xScaleFactor = threeDSettings?.x ?? 1.0;
  const yScaleFactor = threeDSettings?.y ?? 1.0;
  const zScaleFactor = threeDSettings?.z ?? 1.0;

  // Precompute candle transforms
  const candles = useMemo(() => {
    return data.map((d, i) => {
      const x = xScale(i) * gap * xScaleFactor;
      const yOpen  = yScale(d.Open) * yScaleFactor;
      const yClose = yScale(d.Close) * yScaleFactor;
      const yHigh  = yScale(d.High) * yScaleFactor;
      const yLow   = yScale(d.Low) * yScaleFactor;

      const bodyHeight = Math.max(0.001, Math.abs(yClose - yOpen));
      const bodyMidY   = Math.min(yOpen, yClose) + bodyHeight / 2;

      // Z-axis: Use indicators if available, otherwise volume
      let zValue = 0;
      if (threeDSettings?.indicators && threeDSettings.indicators.length > 0) {
        // Use the first indicator for Z-axis depth
        const indicator = threeDSettings.indicators[0];
        if (d[indicator] !== undefined) {
          zValue = Math.abs(d[indicator]) * 0.1; // Scale indicator values
        }
      } else {
        // Fallback to volume
        zValue = volScale(d.Volume ?? 0) * 0.6;
      }
      
      const t = (baseThickness + zValue) * zScaleFactor;

      const color = (d.Close >= d.Open) ? "#26a69a" : "#ef5350";

      return {
        x,
        wick: { y: (yHigh + yLow) / 2, h: Math.max(0.001, yHigh - yLow) },
        body: { y: bodyMidY, h: bodyHeight, t },
        color,
        date: d.Date,
        d
      };
    });
  }, [data, gap, baseThickness, yScale, xScale, volScale, xScaleFactor, yScaleFactor, zScaleFactor]);

  return (
    <>
      {/* WICKS */}
      <Instances limit={candles.length} range={candles.length}>
        <boxGeometry args={[0.05, 1, 0.05]} />
        <meshStandardMaterial color="#cfd8dc" />
        {candles.map((c, i) => (
          <Instance
            key={`wick-${i}`}
            position={[c.x, c.wick.y, 0]}
            scale={[1, c.wick.h, 1]}
            onPointerOver={(e) => { e.stopPropagation(); setHover(i); }}
            onPointerOut={() => setHover((h) => (h === i ? null : h))}
          />
        ))}
      </Instances>

      {/* BODIES */}
      <Instances limit={candles.length} range={candles.length}>
        <boxGeometry args={[1, 1, 1]} />
        {/* material color per-instance via setColorAt: easier by separate Instances per color */}
        <meshStandardMaterial color="#ffffff" />
        {candles.map((c, i) => (
          <Instance
            key={`body-${i}`}
            position={[c.x, c.body.y, 0]}
            scale={[0.75, Math.max(0.002, c.body.h), clamp(c.body.t, 0.05, 1.2)]}
            color={new THREE.Color(c.color)}
            onPointerOver={(e) => { e.stopPropagation(); setHover(i); }}
            onPointerOut={() => setHover((h) => (h === i ? null : h))}
          />
        ))}
      </Instances>

      {/* Tooltip */}
      {hover !== null && (
        <Html
          position={[candles[hover].x, candles[hover].wick.y, 1.2]}
          center
          distanceFactor={8}
          occlude
          className="pointer-events-none"
        >
          <div style={{
            backdropFilter: "blur(6px)",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 12,
            whiteSpace: "nowrap"
          }}>
            <div style={{ opacity: 0.8 }}>{candles[hover].date}</div>
            <div>O: {candles[hover].d.Open.toFixed(2)}</div>
            <div>H: {candles[hover].d.High.toFixed(2)}</div>
            <div>L: {candles[hover].d.Low.toFixed(2)}</div>
            <div>C: {candles[hover].d.Close.toFixed(2)}</div>
            {typeof candles[hover].d.Volume === "number" && (
              <div>V: {(candles[hover].d.Volume as number).toLocaleString()}</div>
            )}
          </div>
        </Html>
      )}
    </>
  );
}

function Axes({ width, height }: { width: number; height: number }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array([
      // X axis
      0, 0, 0,  width, 0, 0,
      // Y axis
      0, 0, 0,  0, height, 0,
      // Z axis
      0, 0, 0,  0, 0, 5,
    ]);
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return g;
  }, [width, height]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#607d8b" linewidth={2} />
    </lineSegments>
  );
}

function Grid3D({ width, height, depth }: { width: number; height: number; depth: number }) {
  const gridGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts: number[] = [];
    
    // X-Y plane grid (floor) - Time vs Price
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      verts.push(x, 0, 0, x, 0, depth);
    }
    for (let i = 0; i <= 10; i++) {
      const z = (i / 10) * depth;
      verts.push(0, 0, z, width, 0, z);
    }
    
    // Y-Z plane grid (back wall) - Price vs Indicators
    for (let i = 0; i <= 10; i++) {
      const y = (i / 10) * height;
      verts.push(0, y, 0, 0, y, depth);
    }
    for (let i = 0; i <= 10; i++) {
      const z = (i / 10) * depth;
      verts.push(0, 0, z, 0, height, z);
    }
    
    // X-Z plane grid (side wall) - Time vs Indicators
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width;
      verts.push(x, 0, 0, x, 0, depth);
    }
    for (let i = 0; i <= 10; i++) {
      const z = (i / 10) * depth;
      verts.push(0, 0, z, width, 0, z);
    }
    
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
    return g;
  }, [width, height, depth]);

  return (
    <group>
      <lineSegments geometry={gridGeo}>
        <lineBasicMaterial color="#374151" opacity={0.3} transparent />
      </lineSegments>
      
      {/* Axis Labels */}
      <Text position={[width/2, -1, 0]} fontSize={0.8} color="#9ca3af" anchorX="center">
        Time (X)
      </Text>
      <Text position={[-1, height/2, 0]} fontSize={0.8} color="#9ca3af" anchorX="center" rotation={[0, 0, Math.PI/2]}>
        Price (Y)
      </Text>
      <Text position={[0, -1, depth/2]} fontSize={0.8} color="#9ca3af" anchorX="center" rotation={[0, Math.PI/2, 0]}>
        Indicators (Z)
      </Text>
    </group>
  );
}

function FlyThrough({ enabled, width }: { enabled: boolean; width: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ camera, clock }) => {
    if (!enabled) return;
    const t = clock.getElapsedTime() * 0.08;
    const x = (t % (width + 10)) - 5; // loop
    camera.position.x = x;
    camera.position.y = 8 + Math.sin(t) * 2;
    camera.position.z = 12 + Math.cos(t * 0.7) * 1.5;
    camera.lookAt(x + 2, 8, 0);
  });
  return <group ref={ref} />;
}

function ResetCameraButton({ onReset }: { onReset: () => void }) {
  return (
    <Html position={[0, 0, 0]} center>
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={onReset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
          style={{ pointerEvents: 'auto' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          <span>Reset View</span>
        </button>
        
        {/* Help Panel */}
        <div className="bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg shadow-lg max-w-48">
          <div className="font-semibold mb-2">Navigation:</div>
          <div className="space-y-1 text-gray-300">
            <div>🖱️ <strong>Left drag:</strong> Rotate</div>
            <div>🖱️ <strong>Right drag:</strong> Pan</div>
            <div>🖱️ <strong>Scroll:</strong> Zoom</div>
            <div>👆 <strong>Hover:</strong> Tooltip</div>
          </div>
        </div>
      </div>
    </Html>
  );
}

export default function ThreeStockChart({
  data,
  symbol,
  height = 20,
  gap = 0.9,
  baseThickness = 0.15,
  threeDSettings,
}: Props) {
  const xScaleFactor = threeDSettings?.x ?? 1.0;
  const yScaleFactor = threeDSettings?.y ?? 1.0;
  const zScaleFactor = threeDSettings?.z ?? 1.0;
  
  const width = Math.max(20, data.length * gap * xScaleFactor);
  const effectiveHeight = height * yScaleFactor;
  const controlsRef = useRef<any>(null);
  
  // Calculate optimal initial camera position
  const initialCameraPosition = useMemo(() => [
    Math.min(15, width * 0.3), 
    effectiveHeight * 0.6, 
    Math.max(12, width * 0.4)
  ] as [number, number, number], [width, effectiveHeight]);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden border border-white/10 relative">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }} shadows>
        {/* Camera */}
        <PerspectiveCamera makeDefault position={initialCameraPosition} fov={50} />
        <color attach="background" args={["#0b0f14"]} />

        {/* Lights */}
        <hemisphereLight intensity={0.7} color={"#dfe7ef"} groundColor={"#0b0f14"} />
        <directionalLight position={[5, 10, 6]} intensity={0.9} castShadow />

        {/* 3D Grid System */}
        <Grid3D width={width} height={effectiveHeight} depth={zScaleFactor * 5} />

        <Axes width={width} height={effectiveHeight} />

        {/* Title */}
        <Text position={[0, effectiveHeight + 1.6, 0]} fontSize={1} color="#e2e8f0" anchorX="left">
          {symbol} • 3D Candles
        </Text>

        <Candles 
          data={data} 
          gap={gap} 
          baseThickness={baseThickness} 
          height={height} 
          threeDSettings={threeDSettings} 
        />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={4}
          maxDistance={Math.max(60, width * 1.5)}
          maxPolarAngle={Math.PI * 0.6}
          minPolarAngle={Math.PI * 0.1}
          enablePan={true}
          panSpeed={0.8}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          target={[width / 2, height / 2, 0]}
        />

        {/* Reset Camera Button */}
        <ResetCameraButton onReset={resetCamera} />

        {/* Toggle this to true to auto-fly the camera */}
        <FlyThrough enabled={false} width={width} />
      </Canvas>
    </div>
  );
}
