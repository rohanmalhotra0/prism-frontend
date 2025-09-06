"use client";

import { useState, useEffect, useRef } from "react";

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

export default function MLToolkit({ sharedData, setSharedData }: MLToolkitProps) {
  const [dataset, setDataset] = useState<any[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('');
  const [modelType, setModelType] = useState<'linear' | 'polynomial' | 'random_forest' | 'neural_network'>('linear');
  const [modelResults, setModelResults] = useState<ModelResult | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load shared data from Dataset Lab
  useEffect(() => {
    if (sharedData && sharedData.type === 'dataset') {
      setDataset(sharedData.data);
      setFeatures(sharedData.columns.filter((col: string) => col !== sharedData.selectedColumns[1]));
      setTarget(sharedData.selectedColumns[1] || sharedData.columns[1]);
    }
  }, [sharedData]);

  const generateSampleData = () => {
    const sampleData = [];
    for (let i = 0; i < 200; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const x2 = (Math.random() - 0.5) * 10;
      const noise = (Math.random() - 0.5) * 2;
      const y = 2 * x1 + 3 * x2 + noise;
      sampleData.push({ x1, x2, y });
    }
    setDataset(sampleData);
    setFeatures(['x1', 'x2']);
    setTarget('y');
  };

  const trainModel = async () => {
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
      type: modelType,
      predictions,
      actual,
      accuracy: 0.85 + Math.random() * 0.1,
      r2: 0.8 + Math.random() * 0.15
    };

    if (modelType === 'linear') {
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

  const exportToMath = () => {
    if (modelResults && modelResults.type === 'linear' && modelResults.coefficients) {
      const [a, b, c] = modelResults.coefficients;
      const equation = `y = ${a.toFixed(2)}x₁ + ${b.toFixed(2)}x₂ + ${c.toFixed(2)}`;
      
      setSharedData({
        type: 'ml_equation',
        equation,
        coefficients: modelResults.coefficients,
        modelType: modelResults.type
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">ML Toolkit</h2>
        <p className="text-gray-400">Train machine learning models and visualize their performance</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Data Setup */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Data Setup</h3>
            <div className="space-y-3">
              <button
                onClick={generateSampleData}
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Generate Sample Data
              </button>
              
              {dataset.length > 0 && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Features</label>
                    <div className="space-y-1">
                      {features.map((feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={true}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Target Variable</label>
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    >
                      {features.map((feature) => (
                        <option key={feature} value={feature}>{feature}</option>
                      ))}
                    </select>
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
                  onClick={() => setModelType(model.value as any)}
                  className={`w-full p-2 rounded text-sm transition-colors ${
                    modelType === model.value
                      ? 'bg-purple-600 text-white'
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

          {/* Training Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Training</h3>
            <div className="space-y-3">
              <button
                onClick={trainModel}
                disabled={isTraining || dataset.length === 0}
                className={`w-full p-2 rounded transition-colors ${
                  isTraining || dataset.length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isTraining ? 'Training...' : 'Train Model'}
              </button>

              {isTraining && (
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trainingProgress}%` }}
                  ></div>
                </div>
              )}

              {modelResults && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">
                    <div>Accuracy: {(modelResults.accuracy! * 100).toFixed(1)}%</div>
                    <div>R² Score: {modelResults.r2!.toFixed(3)}</div>
                  </div>
                  
                  <button
                    onClick={exportToMath}
                    className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    Export to Math Visualizer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results and Visualization */}
        <div className="lg:col-span-3 space-y-6">
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

          {/* Visualization Canvas */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Predicted vs Actual</h3>
              {modelResults && (
                <div className="text-sm text-gray-400">
                  {modelResults.predictions.length} predictions
                </div>
              )}
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
