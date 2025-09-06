"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-white">Loading plot...</div>
});

interface MathVisualizerProps {
  sharedData: any;
  setSharedData: (data: any) => void;
}

export default function MathVisualizer({ sharedData, setSharedData }: MathVisualizerProps) {
  const [equation, setEquation] = useState("sin(x)");
  const [is3D, setIs3D] = useState(false);
  const [parameters, setParameters] = useState({
    amplitude: 1,
    frequency: 1,
    phase: 0,
    damping: 0,
    time: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [plotData, setPlotData] = useState<any>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const animationTimeRef = useRef(0);

  const predefinedEquations = [
    { name: "Sine Wave", equation: "amplitude * sin(frequency * x + phase)", params: ["amplitude", "frequency", "phase"] },
    { name: "Cosine Wave", equation: "amplitude * cos(frequency * x + phase)", params: ["amplitude", "frequency", "phase"] },
    { name: "Exponential", equation: "amplitude * exp(-x)", params: ["amplitude"] },
    { name: "Logarithmic", equation: "amplitude * log(x + 1)", params: ["amplitude"] },
    { name: "Quadratic", equation: "amplitude * x^2", params: ["amplitude"] },
    { name: "Cubic", equation: "amplitude * x^3", params: ["amplitude"] },
    { name: "Damped Oscillator", equation: "amplitude * exp(-damping * x) * sin(frequency * x + phase)", params: ["amplitude", "frequency", "damping", "phase"] },
    { name: "Wave Equation", equation: "amplitude * sin(frequency * x - time + phase)", params: ["amplitude", "frequency", "time", "phase"] },
    { name: "3D Surface", equation: "amplitude * sin(sqrt(x^2 + y^2))", params: ["amplitude", "frequency"] },
    { name: "Ripple", equation: "amplitude * sin(sqrt(x^2 + y^2) - time)", params: ["amplitude", "frequency", "time"] },
  ];

  const evaluateEquation = (x: number, y?: number, animationTime?: number) => {
    try {
      const timeValue = animationTime !== undefined ? animationTime : parameters.time;
      let expr = equation
        .replace(/amplitude/g, parameters.amplitude.toString())
        .replace(/frequency/g, parameters.frequency.toString())
        .replace(/phase/g, parameters.phase.toString())
        .replace(/damping/g, parameters.damping.toString())
        .replace(/time/g, timeValue.toString())
        .replace(/x/g, x.toString())
        .replace(/y/g, y ? y.toString() : '0');

      expr = expr.replace(/sin/g, 'Math.sin');
      expr = expr.replace(/cos/g, 'Math.cos');
      expr = expr.replace(/tan/g, 'Math.tan');
      expr = expr.replace(/exp/g, 'Math.exp');
      expr = expr.replace(/log/g, 'Math.log');
      expr = expr.replace(/sqrt/g, 'Math.sqrt');
      expr = expr.replace(/\^/g, '**');

      return eval(expr);
    } catch (error) {
      return 0;
    }
  };

  const generatePlotData = (animationTime = 0) => {
    if (is3D) {
      // Generate 3D surface data - need to create proper grid
      const xRange = [];
      const yRange = [];
      const zData = [];
      
      // Create coordinate arrays
      for (let i = -10; i <= 10; i += 0.5) {
        xRange.push(i);
      }
      for (let j = -10; j <= 10; j += 0.5) {
        yRange.push(j);
      }
      
      // Create z data as 2D array
      for (let i = 0; i < yRange.length; i++) {
        const row = [];
        for (let j = 0; j < xRange.length; j++) {
          row.push(evaluateEquation(xRange[j], yRange[i], animationTime));
        }
        zData.push(row);
      }

      return {
        data: [{
          x: xRange,
          y: yRange,
          z: zData,
          type: 'surface',
          colorscale: 'Viridis',
          opacity: 0.8,
          name: `f(x,y) = ${equation}`,
          hovertemplate: 'x: %{x}<br>y: %{y}<br>z: %{z}<extra></extra>'
        }],
        layout: {
          title: {
            text: `3D Surface: ${equation}`,
            font: { color: 'white', size: 16 }
          },
          scene: {
            xaxis: { 
              title: 'X',
              color: 'white',
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(0,0,0,0.1)'
            },
            yaxis: { 
              title: 'Y',
              color: 'white',
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(0,0,0,0.1)'
            },
            zaxis: { 
              title: 'Z',
              color: 'white',
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(0,0,0,0.1)'
            },
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.5 }
            },
            bgcolor: 'rgba(0,0,0,0)'
          },
          margin: { l: 0, r: 0, t: 60, b: 0 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' }
        },
        config: {
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
          responsive: true
        }
      };
    } else {
      // Generate 2D line data
      const x = [];
      const y = [];
      
      for (let i = -10; i <= 10; i += 0.1) {
        x.push(i);
        y.push(evaluateEquation(i, undefined, animationTime));
      }

      return {
        data: [{
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines',
          line: { color: '#8b5cf6', width: 3 },
          name: `f(x) = ${equation}`,
          hovertemplate: 'x: %{x}<br>y: %{y}<extra></extra>'
        }],
        layout: {
          title: {
            text: `2D Plot: ${equation}`,
            font: { color: 'white', size: 16 }
          },
          xaxis: { 
            title: 'X',
            gridcolor: '#374151',
            color: 'white',
            showgrid: true,
            zeroline: true,
            zerolinecolor: '#666'
          },
          yaxis: { 
            title: 'Y',
            gridcolor: '#374151',
            color: 'white',
            showgrid: true,
            zeroline: true,
            zerolinecolor: '#666'
          },
          margin: { l: 60, r: 20, t: 60, b: 60 },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' }
        },
        config: {
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
          responsive: true
        }
      };
    }
  };

  // Generate plot data when equation, parameters, or 3D mode changes
  useEffect(() => {
    setPlotData(generatePlotData());
  }, [equation, parameters, is3D]);

  // Handle animation
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        animationTimeRef.current += 0.05;
        setPlotData(generatePlotData(animationTimeRef.current));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [isAnimating]); // Only depend on isAnimating, not parameters

  const handleEquationSelect = (selectedEquation: string) => {
    setEquation(selectedEquation);
  };

  const exportToDataset = () => {
    const data = [];
    
    if (is3D) {
      for (let x = -10; x <= 10; x += 0.5) {
        for (let y = -10; y <= 10; y += 0.5) {
          data.push({ x, y, z: evaluateEquation(x, y) });
        }
      }
    } else {
      for (let x = -10; x <= 10; x += 0.1) {
        data.push({ x, y: evaluateEquation(x) });
      }
    }
    
    setSharedData({
      type: 'equation_data',
      equation,
      parameters,
      data,
      is3D
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Math Visualizer</h2>
        <p className="text-gray-400">Interactive 2D/3D mathematical equation visualization like Desmos</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* 2D/3D Toggle */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">View Mode</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIs3D(false)}
                className={`flex-1 p-2 rounded text-sm transition-colors ${
                  !is3D
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                2D Plot
              </button>
              <button
                onClick={() => setIs3D(true)}
                className={`flex-1 p-2 rounded text-sm transition-colors ${
                  is3D
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                3D Surface
              </button>
            </div>
          </div>

          {/* Equation Selection */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Function Library</h3>
            <div className="space-y-2">
              {predefinedEquations.map((eq, index) => (
                <button
                  key={index}
                  onClick={() => handleEquationSelect(eq.equation)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    equation === eq.equation
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {eq.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Equation Input */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Custom Function</h3>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              placeholder={is3D ? "f(x,y) = ..." : "f(x) = ..."}
            />
            <p className="text-xs text-gray-400 mt-2">
              Functions: sin, cos, tan, exp, log, sqrt
            </p>
          </div>

          {/* Parameters */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Parameters</h3>
            <div className="space-y-4">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm text-gray-300 mb-1 capitalize">
                    {key}: {value.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={key === 'damping' ? 0 : -5}
                    max={5}
                    step={0.1}
                    value={value}
                    onChange={(e) => setParameters(prev => ({
                      ...prev,
                      [key]: parseFloat(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Controls</h3>
            <div className="space-y-3">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`w-full p-2 rounded transition-colors ${
                  isAnimating
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAnimating ? 'Stop Animation' : 'Start Animation'}
              </button>

              <button
                onClick={exportToDataset}
                className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Export to Dataset Lab
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-700/50 rounded text-xs text-gray-400">
              <div className="font-semibold mb-1">Plot Controls:</div>
              <div>• Zoom: Mouse wheel</div>
              <div>• Pan: Click + drag</div>
              <div>• Reset: Double click</div>
              {is3D && <div>• Rotate: Click + drag in 3D</div>}
            </div>
          </div>
        </div>

        {/* Plotly Visualization */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900/50 rounded-lg p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {is3D ? '3D Surface Plot' : '2D Function Plot'}
              </h3>
              <div className="text-sm text-gray-400">
                {is3D ? `f(x,y) = ${equation}` : `f(x) = ${equation}`}
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden" style={{ height: '600px' }}>
              {plotData ? (
                <Plot
                  data={plotData.data}
                  layout={plotData.layout}
                  config={plotData.config}
                  style={{ width: '100%', height: '100%' }}
                  useResizeHandler={true}
                  onInitialized={() => console.log('Plot initialized')}
                  onUpdate={() => console.log('Plot updated')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <div>Loading plot...</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
