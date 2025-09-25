"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// -------- Plotly (client-only) --------
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      Loading 3D visualization...
    </div>
  ),
});

interface MLToolkitProps {
  sharedData: any;
  setSharedData: (data: any) => void;
}

interface ModelResult {
  type: string;
  accuracy?: number;
  r2?: number;
  predictions: number[];
  actual: number[];
  coefficients?: number[];
}

interface ClusterData {
  x: number[];
  y: number[];
  z: number[];
  labels: number[];
  colors: string[];
}

interface VisualizationMode {
  type: '2d' | '3d' | 'clustering';
  showClusters: boolean;
  showPredictions: boolean;
}

export default function MLToolkit({ sharedData, setSharedData }: MLToolkitProps) {
  const [dataset, setDataset] = useState<any[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('');
  const [modelType, setModelType] = useState<'linear' | 'polynomial' | 'random_forest' | 'neural_network'>('linear');
  const [modelResults, setModelResults] = useState<ModelResult | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>({
    type: '2d',
    showClusters: true,
    showPredictions: true
  });
  const [clusterData, setClusterData] = useState<ClusterData | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load shared data from Dataset Lab
  useEffect(() => {
    if (sharedData && sharedData.type === 'dataset') {
      setDataset(sharedData.data);
      setFeatures(sharedData.columns.filter((col: string) => col !== sharedData.selectedColumns[1]));
      setTarget(sharedData.selectedColumns[1] || sharedData.columns[1]);
    }
  }, [sharedData]);

  // Auto-train when dataset changes
  useEffect(() => {
    if (dataset.length > 0 && target && !isTraining) {
      trainModel();
    }
  }, [dataset, target]);

  // Generate 3D cluster data when dataset changes
  useEffect(() => {
    if (dataset.length > 0 && features.length >= 2) {
      generateClusterData();
    }
  }, [dataset, features, selectedFeatures]);

  // Initialize selected features when features change
  useEffect(() => {
    if (features.length > 0) {
      const maxFeatures = visualizationMode.type === '3d' ? 3 : 2;
      setSelectedFeatures(features.slice(0, maxFeatures));
    }
  }, [features, visualizationMode.type]);

  const generateSampleData = () => {
    const sampleData = [];
    for (let i = 0; i < 200; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const x2 = (Math.random() - 0.5) * 10;
      const x3 = (Math.random() - 0.5) * 10;
      const noise = (Math.random() - 0.5) * 2;
      const y = 2 * x1 + 3 * x2 + 1.5 * x3 + noise;
      sampleData.push({ x1, x2, x3, y });
    }
    setDataset(sampleData);
    setFeatures(['x1', 'x2', 'x3']);
    setTarget('y');
  };

  // Simple K-means clustering implementation
  const kMeansClustering = (data: number[][], k: number = 3): number[] => {
    const n = data.length;
    const d = data[0].length;
    
    // Initialize centroids randomly
    let centroids: number[][] = [];
    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * n);
      centroids.push([...data[randomIndex]]);
    }
    
    let labels = new Array(n).fill(0);
    let changed = true;
    let iterations = 0;
    const maxIterations = 100;
    
    while (changed && iterations < maxIterations) {
      changed = false;
      const newLabels = [...labels];
      
      // Assign points to nearest centroid
      for (let i = 0; i < n; i++) {
        let minDistance = Infinity;
        let bestCluster = 0;
        
        for (let j = 0; j < k; j++) {
          let distance = 0;
          for (let dim = 0; dim < d; dim++) {
            distance += Math.pow(data[i][dim] - centroids[j][dim], 2);
          }
          distance = Math.sqrt(distance);
          
          if (distance < minDistance) {
            minDistance = distance;
            bestCluster = j;
          }
        }
        
        if (newLabels[i] !== bestCluster) {
          newLabels[i] = bestCluster;
          changed = true;
        }
      }
      
      labels = newLabels;
      
      // Update centroids
      for (let j = 0; j < k; j++) {
        const clusterPoints = data.filter((_, i) => labels[i] === j);
        if (clusterPoints.length > 0) {
          for (let dim = 0; dim < d; dim++) {
            centroids[j][dim] = clusterPoints.reduce((sum, point) => sum + point[dim], 0) / clusterPoints.length;
          }
        }
      }
      
      iterations++;
    }
    
    return labels;
  };

  const generateClusterData = () => {
    if (dataset.length === 0 || selectedFeatures.length < 2) return;

    // Prepare data for clustering
    const numericData = dataset.map(row => 
      selectedFeatures.map(feature => {
        const value = row[feature];
        return typeof value === 'number' ? value : 0;
      })
    );

    // Perform clustering
    const labels = kMeansClustering(numericData, Math.min(5, Math.max(2, Math.floor(dataset.length / 20))));
    
    // Generate colors for clusters
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    // Prepare data based on visualization mode
    const x = numericData.map(point => point[0] || 0);
    const y = numericData.map(point => point[1] || 0);
    const z = visualizationMode.type === '3d' ? numericData.map(point => point[2] || 0) : [];
    const clusterColors = labels.map(label => colors[label % colors.length]);

    setClusterData({
      x,
      y,
      z,
      labels,
      colors: clusterColors
    });
  };

  const processUploadedFile = async (file: File) => {
    setIsProcessingFile(true);
    setSelectedFile(file);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          const value = values[index];
          // Try to parse as number, fallback to string
          row[header] = isNaN(Number(value)) ? value : Number(value);
        });
        return row;
      }).filter(row => Object.values(row).some(val => val !== ''));

      setDataset(data);
      setFeatures(headers);
      setTarget(headers[headers.length - 1] || headers[0]);
      
      // Clear any existing model results
      setModelResults(null);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please make sure it\'s a valid CSV file.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const trainModel = async (selectedModelType?: string) => {
    const currentModelType = selectedModelType || modelType;
    if (dataset.length === 0 || !target) return;

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const progressInterval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate model training
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock results based on model type
    const actual = dataset.map(row => row[target]);
    const predictions = actual.map(val => val + (Math.random() - 0.5) * 2);

    let result: ModelResult = {
      type: currentModelType,
      predictions,
      actual,
      accuracy: 0.85 + Math.random() * 0.1,
      r2: 0.8 + Math.random() * 0.15
    };

    if (currentModelType === 'linear') {
      result.coefficients = [2.1, 2.9, 0.5]; // Mock coefficients
    }

    setModelResults(result);
    setIsTraining(false);
    setTrainingProgress(0);
  };

  const drawResults = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, width, height);

    if (!modelResults) return;

    const { predictions, actual } = modelResults;

    // Draw predicted vs actual scatter plot
    const margin = 50;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Find data ranges
    const allValues = [...predictions, ...actual];
    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);
    const range = maxVal - minVal || 1;

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, height - margin);
    ctx.stroke();

    // Draw perfect prediction line (y = x)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(margin, height - margin - ((minVal - minVal) / range) * plotHeight);
    ctx.lineTo(width - margin, height - margin - ((maxVal - minVal) / range) * plotHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw data points
    ctx.fillStyle = '#8b5cf6';
    actual.forEach((actualVal, index) => {
      const predVal = predictions[index];
      const x = margin + ((predVal - minVal) / range) * plotWidth;
      const y = height - margin - ((actualVal - minVal) / range) * plotHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText('Predicted', width - 100, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Actual', 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    if (modelResults) {
      drawResults();
    }
  }, [modelResults]);

  // Generate visualization data (2D or 3D)
  const plotData = useMemo(() => {
    if (!clusterData || dataset.length === 0) return [];

    const traces: any[] = [];
    const is3D = visualizationMode.type === '3d';

    if (visualizationMode.showClusters) {
      // Group data by clusters
      const clusterGroups: { [key: number]: { x: number[], y: number[], z: number[], colors: string[] } } = {};
      
      clusterData.labels.forEach((label, index) => {
        if (!clusterGroups[label]) {
          clusterGroups[label] = { x: [], y: [], z: [], colors: [] };
        }
        clusterGroups[label].x.push(clusterData.x[index]);
        clusterGroups[label].y.push(clusterData.y[index]);
        if (is3D) {
          clusterGroups[label].z.push(clusterData.z[index]);
        }
        clusterGroups[label].colors.push(clusterData.colors[index]);
      });

      // Create traces for each cluster
      Object.entries(clusterGroups).forEach(([label, data]) => {
        if (is3D) {
          traces.push({
            type: 'scatter3d',
            mode: 'markers',
            x: data.x,
            y: data.y,
            z: data.z,
            marker: {
              size: 4,
              color: data.colors[0],
              opacity: 0.8
            },
            name: `Cluster ${parseInt(label) + 1}`,
            hovertemplate: `${selectedFeatures[0] || 'X'}: %{x:.2f}<br>${selectedFeatures[1] || 'Y'}: %{y:.2f}<br>${selectedFeatures[2] || 'Z'}: %{z:.2f}<extra></extra>`
          });
        } else {
          traces.push({
            type: 'scatter',
            mode: 'markers',
            x: data.x,
            y: data.y,
            marker: {
              size: 6,
              color: data.colors[0],
              opacity: 0.8
            },
            name: `Cluster ${parseInt(label) + 1}`,
            hovertemplate: `${selectedFeatures[0] || 'X'}: %{x:.2f}<br>${selectedFeatures[1] || 'Y'}: %{y:.2f}<extra></extra>`
          });
        }
      });
    }

    if (visualizationMode.showPredictions && modelResults) {
      const predictions = modelResults.predictions;
      
      if (is3D && selectedFeatures.length >= 3) {
        // 3D prediction surface
        traces.push({
          type: 'scatter3d',
          mode: 'markers',
          x: clusterData.x,
          y: clusterData.y,
          z: predictions,
          marker: {
            size: 3,
            color: '#ff6b6b',
            opacity: 0.6,
            symbol: 'diamond'
          },
          name: 'Predictions',
          hovertemplate: `${selectedFeatures[0] || 'X'}: %{x:.2f}<br>${selectedFeatures[1] || 'Y'}: %{y:.2f}<br>Prediction: %{z:.2f}<extra></extra>`
        });
      } else if (!is3D && selectedFeatures.length >= 2) {
        // 2D prediction line
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: clusterData.x,
          y: predictions,
          marker: {
            size: 4,
            color: '#ff6b6b',
            opacity: 0.6,
            symbol: 'diamond'
          },
          name: 'Predictions',
          hovertemplate: `${selectedFeatures[0] || 'X'}: %{x:.2f}<br>Prediction: %{y:.2f}<extra></extra>`
        });
      }
    }

    return traces;
  }, [clusterData, visualizationMode, modelResults, selectedFeatures, dataset]);

  // Layout for plot (2D or 3D)
  const plotLayout = useMemo(() => {
    if (!clusterData) return {};

    const is3D = visualizationMode.type === '3d';
    const title = is3D ? '3D Data Clustering & Predictions' : '2D Data Clustering & Predictions';

    if (is3D) {
      return {
        title: {
          text: title,
          font: { color: 'white', size: 16 }
        },
        scene: {
          xaxis: { 
            title: selectedFeatures[0] || 'Feature 1',
            color: 'white',
            gridcolor: '#2e3440',
            zerolinecolor: '#475569'
          },
          yaxis: { 
            title: selectedFeatures[1] || 'Feature 2',
            color: 'white',
            gridcolor: '#2e3440',
            zerolinecolor: '#475569'
          },
          zaxis: { 
            title: selectedFeatures[2] || 'Feature 3',
            color: 'white',
            gridcolor: '#2e3440',
            zerolinecolor: '#475569'
          },
          bgcolor: 'rgba(0,0,0,0)',
          camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' },
        legend: { font: { color: 'white' } },
        margin: { l: 0, r: 0, t: 40, b: 0 }
      };
    } else {
      return {
        title: {
          text: title,
          font: { color: 'white', size: 16 }
        },
        xaxis: { 
          title: selectedFeatures[0] || 'Feature 1',
          color: 'white',
          gridcolor: '#2e3440',
          zerolinecolor: '#475569'
        },
        yaxis: { 
          title: selectedFeatures[1] || 'Feature 2',
          color: 'white',
          gridcolor: '#2e3440',
          zerolinecolor: '#475569'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: 'white' },
        legend: { font: { color: 'white' } },
        margin: { l: 60, r: 20, t: 40, b: 50 }
      };
    }
  }, [clusterData, selectedFeatures, visualizationMode.type]);

  const plotConfig = useMemo(() => ({
    displayModeBar: true,
    displaylogo: false,
    responsive: true,
    scrollZoom: true
  }), []);


  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Machine Learning Lab</h2>
        <p className="text-gray-400">Train machine learning models and visualize their performance</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Data Lab */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Data Lab</h3>
            <div className="space-y-4">
              {/* File Upload Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Import Data</h4>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        processUploadedFile(file);
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                    disabled={isProcessingFile}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`cursor-pointer inline-block px-4 py-2 rounded transition-colors ${
                      isProcessingFile
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-[#1877F2] text-white hover:bg-[#1877F2]'
                    }`}
                  >
                    {isProcessingFile ? 'Processing...' : 'Choose File'}
                  </label>
                  <p className="text-gray-400 text-sm mt-2">
                    {selectedFile ? selectedFile.name : 'No file chosen'}
                  </p>
                </div>
                <p className="text-xs text-gray-400 text-center mt-1">
                  Supported formats: CSV, XLSX, XLS
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-600"></div>
                <span className="px-2 text-xs text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>

              {/* Sample Data Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Generate Sample Data</h4>
                <button
                  onClick={generateSampleData}
                  className="w-full p-2 bg-[#1877F2] text-white rounded hover:bg-[#1877F2] transition-colors"
                >
                  Generate Sample Data
                </button>
              </div>

              {/* Data Summary */}
              {dataset.length > 0 && (
                <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Dataset Summary</h4>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>Rows: {dataset.length}</div>
                    <div>Features: {features.length}</div>
                    <div>Target: {target}</div>
                  </div>
                </div>
              )}

          {/* Feature Selection */}
          {dataset.length > 0 && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visualization Features</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {features.map((feature) => (
                    <label key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const maxFeatures = visualizationMode.type === '3d' ? 3 : 2;
                            if (selectedFeatures.length < maxFeatures) {
                              setSelectedFeatures([...selectedFeatures, feature]);
                            }
                          } else {
                            setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                          }
                        }}
                        disabled={!selectedFeatures.includes(feature) && selectedFeatures.length >= (visualizationMode.type === '3d' ? 3 : 2)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">{feature}</span>
                      {selectedFeatures.includes(feature) && (
                        <span className="text-xs text-blue-400">
                          {selectedFeatures.indexOf(feature) === 0 ? '(X)' : 
                           selectedFeatures.indexOf(feature) === 1 ? '(Y)' : '(Z)'}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Select up to {visualizationMode.type === '3d' ? '3' : '2'} features for {visualizationMode.type} visualization
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Variable</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                >
                  {features.map((feature) => (
                    <option key={feature} value={feature}>{feature}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Visualization Controls */}
          {dataset.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Visualization</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Visualization Mode</label>
                  <div className="space-y-2">
                    {[
                      { value: '2d', label: '2D Scatter Plot' },
                      { value: '3d', label: '3D Scatter Plot' },
                      { value: 'clustering', label: 'Clustering View' }
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => {
                          setVisualizationMode(prev => ({ ...prev, type: mode.value as any }));
                          // Update selected features when switching modes
                          const maxFeatures = mode.value === '3d' ? 3 : 2;
                          if (selectedFeatures.length > maxFeatures) {
                            setSelectedFeatures(selectedFeatures.slice(0, maxFeatures));
                          }
                        }}
                        className={`w-full p-2 rounded text-sm transition-colors ${
                          visualizationMode.type === mode.value
                            ? 'bg-[#1877F2] text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visualizationMode.showClusters}
                      onChange={(e) => setVisualizationMode(prev => ({ ...prev, showClusters: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-300">Show Clusters</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visualizationMode.showPredictions}
                      onChange={(e) => setVisualizationMode(prev => ({ ...prev, showPredictions: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-300">Show Predictions</span>
                  </label>
                </div>

                <button
                  onClick={generateClusterData}
                  className="w-full p-2 bg-[#1877F2] text-white rounded hover:bg-[#1877F2] transition-colors text-sm"
                >
                  Regenerate Clusters
                </button>
              </div>
            </div>
          )}
            </div>
          </div>

          {/* Model Selection */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Model Type</h3>
            <div className="space-y-2">
              {[
                { value: 'linear', label: 'Linear Regression', desc: 'y = mx + b' },
                { value: 'polynomial', label: 'Polynomial', desc: 'y = ax² + bx + c' },
                { value: 'random_forest', label: 'Random Forest', desc: 'Ensemble method' },
                { value: 'neural_network', label: 'Neural Network', desc: 'Deep learning' }
              ].map((model) => (
                <button
                  key={model.value}
                  onClick={() => {
                    setModelType(model.value as any);
                    trainModel(model.value as any);
                  }}
                  disabled={isTraining || dataset.length === 0}
                  className={`w-full p-2 rounded text-sm transition-colors ${
                    modelType === model.value
                      ? 'bg-[#1877F2] text-white'
                      : isTraining || dataset.length === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium">{model.label}</div>
                    <div className="text-xs opacity-75">{model.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Training Status */}
          {isTraining && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Training Status</h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  Training {modelType.replace('_', ' ')} model...
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trainingProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 text-center">
                  {trainingProgress}% complete
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results and Visualization */}
        <div className="lg:col-span-3 space-y-6">
          {/* Data Preview */}
          {dataset.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Data Preview</h3>
              <div className="bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-auto">
                <div className="text-sm text-gray-400 mb-2">
                  {dataset.length} rows × {features.length} columns
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {features.map((feature, index) => (
                          <th key={index} className="text-left p-2 text-gray-300 font-medium">
                            {feature}
                            {feature === target && (
                              <span className="ml-1 text-blue-400">(target)</span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataset.slice(0, 10).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-800">
                          {features.map((feature, colIndex) => (
                            <td key={colIndex} className="p-2 text-gray-400">
                              {typeof row[feature] === 'number' 
                                ? row[feature].toFixed(2) 
                                : row[feature]
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {dataset.length > 10 && (
                    <div className="text-center text-gray-500 text-xs mt-2">
                      ... and {dataset.length - 10} more rows
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Model Performance */}
          {modelResults && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Model Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400">
                    {(modelResults.accuracy! * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">
                    {modelResults.r2!.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-400">R² Score</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">
                    {modelResults.type.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-400">Model Type</div>
                </div>
              </div>
            </div>
          )}

          {/* Clustering Performance */}
          {clusterData && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Clustering Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-400">
                    {new Set(clusterData.labels).size}
                  </div>
                  <div className="text-sm text-gray-400">Clusters Found</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-cyan-400">
                    {clusterData.x.length}
                  </div>
                  <div className="text-sm text-gray-400">Data Points</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-pink-400">
                    {visualizationMode.type === '3d' ? selectedFeatures.length : 2}D
                  </div>
                  <div className="text-sm text-gray-400">Dimensions</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                <div>Features: {selectedFeatures.join(', ')}</div>
                <div>Clustering: K-means algorithm</div>
              </div>
            </div>
          )}

          {/* Data Visualization */}
          {clusterData && (
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {visualizationMode.type === '3d' ? '3D' : '2D'} Data Visualization
                </h3>
                <div className="text-sm text-gray-400">
                  {clusterData.x.length} data points, {new Set(clusterData.labels).size} clusters
                </div>
              </div>
              
              <div className="bg-black rounded-lg overflow-hidden" style={{ height: '500px' }}>
                <Plot
                  data={plotData}
                  layout={plotLayout}
                  config={plotConfig}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          )}

          {/* 2D Visualization Canvas (fallback) */}
          {!clusterData && modelResults && (
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Predicted vs Actual</h3>
                <div className="text-sm text-gray-400">
                  {modelResults.predictions.length} predictions
                </div>
              </div>
              
              <div className="bg-black rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Model Equation */}
          {modelResults && modelResults.coefficients && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Model Equation</h3>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <code className="text-green-400 text-lg">
                  {modelResults.type === 'linear' && modelResults.coefficients.length === 3
                    ? `y = ${modelResults.coefficients[0].toFixed(3)}x₁ + ${modelResults.coefficients[1].toFixed(3)}x₂ + ${modelResults.coefficients[2].toFixed(3)}`
                    : 'Complex model - see coefficients above'
                  }
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
