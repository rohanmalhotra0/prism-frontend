"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useCallback, useEffect, Suspense } from "react";
import React from "react";

class R3FErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[700px] rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center p-6">
          <div className="text-center space-y-2 max-w-xl">
            <div className="font-semibold text-foreground">3D renderer failed to start</div>
            <p className="text-sm text-muted-foreground">
              This can happen if WebGL is restricted or the GPU/driver is outdated. Try refreshing,
              switching browsers, or enabling hardware acceleration. The 2D chart will continue to work.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

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
    // Calculate volume range for proper scaling
    const volumes = data.map(d => d.Volume || 0).filter(v => v > 0);
    const minVol = Math.min(...volumes);
    const maxVol = Math.max(...volumes);
    const volRange = maxVol - minVol || 1;

    return data.map((d, i) => {
      const x = i * gap * xScale;
      const o = ((d.Open - minLow) / yRange) * height * yScale;
      const c = ((d.Close - minLow) / yRange) * height * yScale;
      const h = ((d.High - minLow) / yRange) * height * yScale;
      const l = ((d.Low - minLow) / yRange) * height * yScale;

      const bodyHeight = Math.max(0.002, Math.abs(c - o));
      const bodyMid = Math.min(o, c) + bodyHeight / 2;

      // Z-position based on volume with proper scaling
      let zPos = 0;
      if (d.Volume && d.Volume > 0) {
        // Normalize volume to 0-1 range, then scale by zScale
        const normalizedVol = (d.Volume - minVol) / volRange;
        zPos = normalizedVol * 8 * zScale; // 8 units max depth
      }

      const color = d.Close >= d.Open ? "#26a69a" : "#ef5350";

      return {
        x,
        z: zPos,
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
        <group key={i} position={[0, 0, c.z]}>
          {/* Wick */}
          <mesh
            position={[c.x, c.wick.y, 0]}
            scale={[0.03, c.wick.h, 0.03]}
            onPointerOver={() => setHover(i)}
            onPointerOut={() => setHover(null)}
          >
            <boxGeometry />
            <meshStandardMaterial color="#cfd8dc" />
          </mesh>

          {/* Body */}
          <mesh
            position={[c.x, c.body.y, 0]}
            scale={[0.4, c.body.h, c.body.t]}
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
          <div className="backdrop-blur-md bg-card/95 text-foreground text-xs rounded-lg px-3 py-2 border border-border shadow-xl">
            <div className="font-semibold text-primary">{candles[hover].date}</div>
            <div className="space-y-1 mt-2">
              <div>O: ${candles[hover].d.Open.toFixed(2)}</div>
              <div>H: ${candles[hover].d.High.toFixed(2)}</div>
              <div>L: ${candles[hover].d.Low.toFixed(2)}</div>
              <div>C: ${candles[hover].d.Close.toFixed(2)}</div>
              {candles[hover].d.Volume && (
                <div>V: {candles[hover].d.Volume.toLocaleString()}</div>
              )}
              <div className="text-muted-foreground">Z: {candles[hover].z.toFixed(2)}</div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

/* ---------------- 3D Area Chart ---------------- */
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
  const zScale = threeDSettings?.z ?? 1;

  const minLow = Math.min(...data.map((d) => d.Low));
  const maxHigh = Math.max(...data.map((d) => d.High));
  const yRange = maxHigh - minLow || 1;

  // Create layered 3D surface geometry based on volume
  const surfaceGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const segments = data.length;
    const depthSegments = 8; // Number of depth layers

    // Calculate volume range for proper scaling
    const volumes = data.map(d => d.Volume || 0).filter(v => v > 0);
    const minVol = Math.min(...volumes);
    const maxVol = Math.max(...volumes);
    const volRange = maxVol - minVol || 1;

    // Create vertices for the 3D surface
    for (let i = 0; i < segments; i++) {
      const x = i * gap * xScale;
      const y = ((data[i].Close - minLow) / yRange) * height * yScale;
      
      // Calculate depth based on volume
      const volume = data[i].Volume || 0;
      const normalizedVol = volume > 0 ? (volume - minVol) / volRange : 0;
      const maxDepth = normalizedVol * 6 * zScale; // 6 units max depth
      
      for (let j = 0; j <= depthSegments; j++) {
        const z = (j / depthSegments) * maxDepth;
        vertices.push(x, y, z);
        
        // Color based on depth (teal to green gradient)
        const normalizedDepth = j / depthSegments;
        const color = new THREE.Color();
        color.setHSL(0.5 - normalizedDepth * 0.2, 0.8, 0.4 + normalizedDepth * 0.4);
        colors.push(color.r, color.g, color.b);
      }
    }

    // Create faces
    for (let i = 0; i < segments - 1; i++) {
      for (let j = 0; j < depthSegments; j++) {
        const a = i * (depthSegments + 1) + j;
        const b = i * (depthSegments + 1) + j + 1;
        const c = (i + 1) * (depthSegments + 1) + j;
        const d = (i + 1) * (depthSegments + 1) + j + 1;

        // Two triangles per quad
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [data, gap, xScale, yScale, zScale, height, minLow, yRange]);

  // Create contour lines on the base
  const contourPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];

    // Top line
    data.forEach((d, i) => {
      const x = i * gap * xScale;
      const y = ((d.Close - minLow) / yRange) * height * yScale;
      points.push(new THREE.Vector3(x, y, 0));
    });

    return points;
  }, [data, gap, xScale, yScale, height, minLow, yRange]);

  return (
    <group>
      {/* 3D Surface */}
      <mesh geometry={surfaceGeometry}>
        <meshStandardMaterial 
          vertexColors 
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Contour line on the base */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={contourPoints} />
        <lineBasicMaterial attach="material" color="#2196f3" linewidth={3} />
      </line>

      {/* 3D Grid System */}
      <Grid3D 
        width={data.length * gap * xScale} 
        height={height * yScale} 
        depth={6 * zScale} 
      />
    </group>
  );
}

/* ---------------- Enhanced 3D Wireframe Grid System ---------------- */
function Grid3D({ width, height, depth }: { width: number; height: number; depth: number }) {
  const gridPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const gridDensity = 100; // Increased density for better visibility

    // X-Y plane grid (floor) - Main grid with perspective
    for (let i = 0; i <= gridDensity; i++) {
      const x = (i / gridDensity) * width;
      points.push(new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, 0, depth));
    }
    for (let i = 0; i <= gridDensity; i++) {
      const z = (i / gridDensity) * depth;
      points.push(new THREE.Vector3(0, 0, z), new THREE.Vector3(width, 0, z));
    }

    // Y-Z plane grid (back wall) - Vertical grid
    for (let i = 0; i <= gridDensity; i++) {
      const y = (i / gridDensity) * height;
      points.push(new THREE.Vector3(0, y, 0), new THREE.Vector3(0, y, depth));
    }
    for (let i = 0; i <= gridDensity; i++) {
      const z = (i / gridDensity) * depth;
      points.push(new THREE.Vector3(0, 0, z), new THREE.Vector3(0, height, z));
    }

    // X-Z plane grid (side wall) - Side vertical grid
    for (let i = 0; i <= gridDensity; i++) {
      const x = (i / gridDensity) * width;
      points.push(new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, height, 0));
    }
    for (let i = 0; i <= gridDensity; i++) {
      const y = (i / gridDensity) * height;
      points.push(new THREE.Vector3(0, y, 0), new THREE.Vector3(width, y, 0));
    }

    return points;
  }, [width, height, depth]);

  return (
    <group>
      {/* Main grid lines - Enhanced visibility */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={gridPoints} />
        <lineBasicMaterial attach="material" color="#94a3b8" opacity={0.8} transparent linewidth={2} />
      </line>
      
      {/* Highlighted major grid lines for better structure */}
      <MajorGridLines width={width} height={height} depth={depth} />
      
      {/* Enhanced floor grid for better depth perception */}
      <FloorGrid width={width} depth={depth} />
    </group>
  );
}

/* ---------------- Enhanced Floor Grid ---------------- */
function FloorGrid({ width, depth }: { width: number; depth: number }) {
  const floorPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const floorDensity = 20; // Dense floor grid for better depth perception

    // Create a more prominent floor grid
    for (let i = 0; i <= floorDensity; i++) {
      const x = (i / floorDensity) * width;
      points.push(new THREE.Vector3(x, -0.01, 0), new THREE.Vector3(x, -0.01, depth));
    }
    for (let i = 0; i <= floorDensity; i++) {
      const z = (i / floorDensity) * depth;
      points.push(new THREE.Vector3(0, -0.01, z), new THREE.Vector3(width, -0.01, z));
    }

    return points;
  }, [width, depth]);

  return (
    <line>
      <bufferGeometry attach="geometry" setFromPoints={floorPoints} />
      <lineBasicMaterial attach="material" color="#64748b" opacity={0.6} transparent linewidth={1} />
    </line>
  );
}

/* ---------------- Major Grid Lines (Highlighted) ---------------- */
function MajorGridLines({ width, height, depth }: { width: number; height: number; depth: number }) {
  const majorPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const majorDivisions = 10; // Every 10th line is highlighted for better visibility

    // Major X-Y plane lines
    for (let i = 0; i <= majorDivisions; i++) {
      const x = (i / majorDivisions) * width;
      points.push(new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, 0, depth));
    }
    for (let i = 0; i <= majorDivisions; i++) {
      const z = (i / majorDivisions) * depth;
      points.push(new THREE.Vector3(0, 0, z), new THREE.Vector3(width, 0, z));
    }

    // Major Y-Z plane lines
    for (let i = 0; i <= majorDivisions; i++) {
      const y = (i / majorDivisions) * height;
      points.push(new THREE.Vector3(0, y, 0), new THREE.Vector3(0, y, depth));
    }
    for (let i = 0; i <= majorDivisions; i++) {
      const z = (i / majorDivisions) * depth;
      points.push(new THREE.Vector3(0, 0, z), new THREE.Vector3(0, height, z));
    }

    // Major X-Z plane lines
    for (let i = 0; i <= majorDivisions; i++) {
      const x = (i / majorDivisions) * width;
      points.push(new THREE.Vector3(x, 0, 0), new THREE.Vector3(x, height, 0));
    }
    for (let i = 0; i <= majorDivisions; i++) {
      const y = (i / majorDivisions) * height;
      points.push(new THREE.Vector3(0, y, 0), new THREE.Vector3(width, y, 0));
    }

    return points;
  }, [width, height, depth]);

  return (
    <line>
      <bufferGeometry attach="geometry" setFromPoints={majorPoints} />
      <lineBasicMaterial attach="material" color="#e2e8f0" opacity={1.0} transparent linewidth={3} />
    </line>
  );
}

/* ---------------- Enhanced Axis Lines ---------------- */
function Axes3D({ width, height, depth }: { width: number; height: number; depth: number }) {
  const axisPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];

    // X-axis (red) - extends beyond the grid
    points.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(width + 3, 0, 0));
    
    // Y-axis (green) - extends beyond the grid
    points.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, height + 3, 0));
    
    // Z-axis (blue) - extends beyond the grid
    points.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, depth + 3));

    return points;
  }, [width, height, depth]);

  return (
    <group>
      {/* Main axis lines with enhanced visibility */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={axisPoints} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={4} />
      </line>
      
      {/* Colored axis lines for better identification */}
      <ColoredAxes width={width} height={height} depth={depth} />
      
      {/* Axis markers for better reference */}
      <AxisMarkers width={width} height={height} depth={depth} />
    </group>
  );
}

/* ---------------- Colored Axis Lines ---------------- */
function ColoredAxes({ width, height, depth }: { width: number; height: number; depth: number }) {
  const xAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0), 
    new THREE.Vector3(width + 2, 0, 0)
  ], [width]);

  const yAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0), 
    new THREE.Vector3(0, height + 2, 0)
  ], [height]);

  const zAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0), 
    new THREE.Vector3(0, 0, depth + 2)
  ], [depth]);

  return (
    <group>
      {/* X-axis (red) */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={xAxisPoints} />
        <lineBasicMaterial attach="material" color="#ef4444" linewidth={2} />
      </line>
      
      {/* Y-axis (green) */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={yAxisPoints} />
        <lineBasicMaterial attach="material" color="#22c55e" linewidth={2} />
      </line>
      
      {/* Z-axis (blue) */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={zAxisPoints} />
        <lineBasicMaterial attach="material" color="#3b82f6" linewidth={2} />
      </line>
    </group>
  );
}

/* ---------------- Enhanced Axis Markers ---------------- */
function AxisMarkers({ width, height, depth }: { width: number; height: number; depth: number }) {
  const markerPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const markerCount = 8; // Increased marker count

    // X-axis markers
    for (let i = 1; i <= markerCount; i++) {
      const x = (i / markerCount) * width;
      points.push(new THREE.Vector3(x, -0.3, 0), new THREE.Vector3(x, 0.3, 0));
    }

    // Y-axis markers
    for (let i = 1; i <= markerCount; i++) {
      const y = (i / markerCount) * height;
      points.push(new THREE.Vector3(-0.3, y, 0), new THREE.Vector3(0.3, y, 0));
    }

    // Z-axis markers
    for (let i = 1; i <= markerCount; i++) {
      const z = (i / markerCount) * depth;
      points.push(new THREE.Vector3(0, -0.3, z), new THREE.Vector3(0, 0.3, z));
    }

    return points;
  }, [width, height, depth]);

  return (
    <group>
      {/* Main markers */}
      <line>
        <bufferGeometry attach="geometry" setFromPoints={markerPoints} />
        <lineBasicMaterial attach="material" color="#f1f5f9" opacity={0.8} transparent linewidth={2} />
      </line>
      
      {/* Corner markers for better reference */}
      <CornerMarkers width={width} height={height} depth={depth} />
    </group>
  );
}

/* ---------------- Corner Markers ---------------- */
function CornerMarkers({ width, height, depth }: { width: number; height: number; depth: number }) {
  const cornerPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const markerSize = 0.5;

    // Corner markers at key positions
    const corners = [
      [0, 0, 0], [width, 0, 0], [0, height, 0], [width, height, 0],
      [0, 0, depth], [width, 0, depth], [0, height, depth], [width, height, depth]
    ];

    corners.forEach(([x, y, z]) => {
      // X-axis marker
      points.push(
        new THREE.Vector3(x - markerSize, y, z), 
        new THREE.Vector3(x + markerSize, y, z)
      );
      // Y-axis marker
      points.push(
        new THREE.Vector3(x, y - markerSize, z), 
        new THREE.Vector3(x, y + markerSize, z)
      );
      // Z-axis marker
      points.push(
        new THREE.Vector3(x, y, z - markerSize), 
        new THREE.Vector3(x, y, z + markerSize)
      );
    });

    return points;
  }, [width, height, depth]);

  return (
    <line>
      <bufferGeometry attach="geometry" setFromPoints={cornerPoints} />
      <lineBasicMaterial attach="material" color="#e2e8f0" opacity={0.6} transparent linewidth={1} />
    </line>
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
  const effectiveHeight = height * (threeDSettings?.y ?? 1);
  const effectiveDepth = 8 * (threeDSettings?.z ?? 1);

  // Detect WebGL support and gracefully fallback if unavailable
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
        (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
        (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
      setWebglSupported(!!gl);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      // Reset to a head-on view facing the chart
      controlsRef.current.object.position.set(
        width * 0.5, 
        effectiveHeight * 0.5, 
        effectiveDepth * 10
      );
      controlsRef.current.target.set(width * 0.5, effectiveHeight * 0.5, 0);
      controlsRef.current.update();
    }
  }, [width, effectiveHeight, effectiveDepth]);

  if (!webglSupported) {
    return (
      <div className="w-full h-[700px] rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center p-6">
        <div className="text-center space-y-2 max-w-xl">
          <div className="font-semibold text-foreground">3D view requires WebGL</div>
          <p className="text-sm text-muted-foreground">
            It looks like your browser or device has WebGL disabled or unsupported. Enable hardware acceleration and WebGL in your browser settings, or try a modern browser like Chrome, Edge, or Firefox. The 2D chart should continue to work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] rounded-xl overflow-hidden border border-border bg-card relative">
      <R3FErrorBoundary>
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-sm text-muted-foreground">Loading 3D renderer…</div>
            </div>
          }
        >
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: false,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={({ gl }) => {
              const canvasEl = gl.domElement as HTMLCanvasElement;
              const handleLost = (e: Event) => {
                e.preventDefault();
                setWebglSupported(false);
              };
              const handleRestored = () => {
                setWebglSupported(true);
              };
              const handleCreationError = () => {
                setWebglSupported(false);
              };
              canvasEl.addEventListener("webglcontextlost", handleLost as any, false);
              canvasEl.addEventListener("webglcontextrestored", handleRestored as any, false);
              canvasEl.addEventListener("webglcontextcreationerror", handleCreationError as any, false);
            }}
          >
            <PerspectiveCamera
              makeDefault
              position={[width * 0.5, effectiveHeight * 0.5, effectiveDepth * 10]}
              fov={45}
            />

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 15, 10]} intensity={1.0} castShadow />
            <pointLight position={[-10, 10, 10]} intensity={0.3} />
            <hemisphereLight intensity={0.2} color="#4a90e2" groundColor="#1f2937" />

            {/* 3D Grid System */}
            <Grid3D width={width} height={effectiveHeight} depth={effectiveDepth} />
        
            {/* 3D Axes */}
            <Axes3D width={width} height={effectiveHeight} depth={effectiveDepth} />

            {/* Chart Title */}
            <Text position={[width / 2, effectiveHeight + 4, 0]} fontSize={1.4} color="#0f172a" anchorX="center" fontWeight="bold">
              {symbol} • 3D {chartType === "candlestick" ? "Candlestick" : "Area"} Chart
            </Text>

            {/* Enhanced Axis Labels */}
            <Text position={[width/2, -3, 0]} fontSize={1.0} color="#60a5fa" anchorX="center" fontWeight="bold">
              Time (X)
            </Text>
            <Text position={[-3, effectiveHeight/2, 0]} fontSize={1.0} color="#34d399" anchorX="center" rotation={[0, 0, Math.PI/2]} fontWeight="bold">
              Price (Y)
            </Text>
            <Text position={[0, -3, effectiveDepth/2]} fontSize={1.0} color="#f472b6" anchorX="center" rotation={[0, Math.PI/2, 0]} fontWeight="bold">
              Volume/Depth (Z)
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

            {/* Enhanced Orbit Controls */}
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.05}
              minDistance={2}
              maxDistance={100}
              maxPolarAngle={Math.PI * 0.6}
              minPolarAngle={Math.PI * 0.2}
              enablePan={true}
              panSpeed={0.8}
              rotateSpeed={0.8}
              zoomSpeed={1.5}
              target={[width / 2, effectiveHeight / 2, 0]}
            />
          </Canvas>
        </Suspense>
      </R3FErrorBoundary>

      {/* Enhanced Reset Button */}
      <button
        onClick={resetCamera}
        className="absolute top-4 right-4 bg-primary hover:opacity-90 text-primary-foreground px-6 py-3 rounded-xl shadow-xl transition-all duration-300 flex items-center space-x-2 font-semibold"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </svg>
        <span>Reset View</span>
      </button>


    </div>
  );
}