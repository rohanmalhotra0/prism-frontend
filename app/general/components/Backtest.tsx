"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

// -------- Plotly (client-only) --------
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/70">
      Loading visualization...
    </div>
  ),
});

// -------- Simplified Types --------
interface DatasetRow {
  [key: string]: any;
  timestamp?: string | number;
  date?: string | number;
}

interface SimpleRule {
  id: string;
  name: string;
  condition: string;
  action: 'Buy' | 'Sell' | 'Alert';
  enabled: boolean;
}

interface SimulationResult {
  timestamp: number;
  value: number;
  action: string;
  equity: number;
}

interface BacktestProps {
  sharedData?: any;
  setSharedData?: (data: any) => void;
}

// -------- Utilities --------
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Simple condition evaluator
function evaluateCondition(condition: string, data: DatasetRow): boolean {
  try {
    // Replace common column names with actual values
    let expr = condition
      .replace(/\bvalue\b/g, data.value || 0)
      .replace(/\bprice\b/g, data.price || data.value || 0)
      .replace(/\bvolume\b/g, data.volume || 0)
      .replace(/\brsi\b/g, data.rsi || 50)
      .replace(/\bmacd\b/g, data.macd || 0);
    
    // Basic safety check
    if (!/^[0-9+\-*/.()<>=!&\s]+$/.test(expr)) return false;
    
    return eval(expr);
  } catch {
    return false;
  }
}

// -------- Simplified Component --------
export default function Backtest({ sharedData, setSharedData }: BacktestProps) {
  // Simplified State
  const [dataset, setDataset] = useState<DatasetRow[]>([]);
  const [rules, setRules] = useState<SimpleRule[]>([
    { id: generateUUID(), name: "Buy Low", condition: "value < 95", action: "Buy", enabled: true },
    { id: generateUUID(), name: "Sell High", condition: "value > 105", action: "Sell", enabled: true }
  ]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Load shared data
  useEffect(() => {
    if (sharedData && sharedData.type === 'dataset') {
      setDataset(sharedData.data);
    }
  }, [sharedData]);

  // Simple file processing
  const processFile = async (file: File) => {
    setSelectedFile(file);
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',');
      
      const data = lines.slice(1).map((line, i) => {
        const values = line.split(',');
        const row: DatasetRow = { index: i };
        headers.forEach((header, j) => {
          const value = values[j] || '';
          const numValue = Number(value);
          row[header.trim()] = !isNaN(numValue) ? numValue : value;
        });
        return row;
      });

      setDataset(data);
      setResults([]);
    } catch (error) {
      alert('Error processing file');
    }
  };

  // Generate sample data
  const generateSample = () => {
    const data: DatasetRow[] = [];
    let value = 100;
    
    for (let i = 0; i < 100; i++) {
      value += (Math.random() - 0.5) * 10;
      data.push({
        index: i,
        date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
        value: Math.max(50, value),
        volume: Math.floor(Math.random() * 1000) + 100
      });
    }
    
    setDataset(data);
    setResults([]);
  };

  // Simple simulation
  const runSimulation = async () => {
    if (dataset.length === 0) return;
    
    setIsRunning(true);
    const simulationResults: SimulationResult[] = [];
    let equity = 1000;
    let position = 0;
    
    for (let i = 0; i < dataset.length; i++) {
      const row = dataset[i];
      const value = row.value || 0;
      let action = '';
      
      // Check rules
      for (const rule of rules) {
        if (rule.enabled && evaluateCondition(rule.condition, row)) {
          if (rule.action === 'Buy' && equity > 0) {
            position = equity / value;
            equity = 0;
            action = 'Buy';
          } else if (rule.action === 'Sell' && position > 0) {
            equity = position * value;
            position = 0;
            action = 'Sell';
          } else if (rule.action === 'Alert') {
            action = 'Alert';
          }
        }
      }
      
      const currentEquity = equity + (position * value);
      simulationResults.push({
        timestamp: i,
        value,
        action,
        equity: currentEquity
      });
    }
    
    setResults(simulationResults);
    setIsRunning(false);
  };

  // Rule management
  const addRule = () => {
    setRules([...rules, {
      id: generateUUID(),
      name: `Rule ${rules.length + 1}`,
      condition: 'value > 100',
      action: 'Alert',
      enabled: true
    }]);
  };

  const updateRule = (id: string, updates: Partial<SimpleRule>) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  // Chart data
  const chartData = useMemo(() => {
    if (results.length === 0) return [];
    
    return [{
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: results.map(r => r.timestamp),
      y: results.map(r => r.value),
      name: 'Price',
      line: { color: '#4ecdc4', width: 2 }
    }, {
      type: 'scatter' as const,
      mode: 'markers' as const,
      x: results.filter(r => r.action).map(r => r.timestamp),
      y: results.filter(r => r.action).map(r => r.value),
      name: 'Actions',
      marker: { color: '#ff6b6b', size: 8 }
    }];
  }, [results]);

  const equityData = useMemo(() => {
    if (results.length === 0) return [];
    
    return [{
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: results.map(r => r.timestamp),
      y: results.map(r => r.equity),
      name: 'Equity',
      line: { color: '#ff6b6b', width: 2 }
    }];
  }, [results]);

  // 3D Chart data
  const chart3DData = useMemo(() => {
    if (results.length === 0) return [];
    
    const x = results.map(r => r.timestamp);
    const y = results.map(r => r.value);
    const z = results.map(r => r.equity);
    
    return [{
      type: 'scatter3d' as const,
      mode: 'lines+markers' as const,
      x: x,
      y: y,
      z: z,
      name: 'Price vs Equity',
      line: { color: '#4ecdc4', width: 4 },
      marker: { 
        color: results.map(r => r.action ? '#ff6b6b' : '#4ecdc4'),
        size: results.map(r => r.action ? 6 : 3)
      }
    }];
  }, [results]);

  // Volume chart data
  const volumeData = useMemo(() => {
    if (results.length === 0) return [];
    
    return [{
      type: 'bar' as const,
      x: results.map(r => r.timestamp),
      y: results.map(r => r.value * 0.1), // Simulated volume
      name: 'Volume',
      marker: { color: '#45b7d1', opacity: 0.7 }
    }];
  }, [results]);

  const layout = {
    title: { text: 'Backtest Results', font: { color: 'white', size: 16 } },
    xaxis: { color: 'white', gridcolor: '#2e3440' },
    yaxis: { color: 'white', gridcolor: '#2e3440' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white' },
    legend: { font: { color: 'white' } },
    margin: { l: 60, r: 20, t: 40, b: 50 }
  };

  const layout3D = {
    title: { text: '3D Price vs Equity', font: { color: 'white', size: 16 } },
    scene: {
      xaxis: { color: 'white', gridcolor: '#2e3440', title: 'Time' },
      yaxis: { color: 'white', gridcolor: '#2e3440', title: 'Price' },
      zaxis: { color: 'white', gridcolor: '#2e3440', title: 'Equity' },
      bgcolor: 'rgba(0,0,0,0)'
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white' },
    legend: { font: { color: 'white' } },
    margin: { l: 60, r: 20, t: 40, b: 50 }
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true
  };

  return (
    <div className="min-h-[90vh] text-white p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Data & Rules */}
        <div className="space-y-6">
          {/* Data Upload */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Data</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) processFile(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-block px-4 py-2 bg-[#1877F2] text-white rounded hover:bg-[#145db2] transition-colors"
                >
                  Upload CSV
                </label>
                <p className="text-gray-400 text-sm mt-2">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </p>
              </div>
              
              <button
                onClick={generateSample}
                className="w-full p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Generate Sample Data
              </button>
              
              {dataset.length > 0 && (
                <div className="bg-gray-900/30 rounded p-3 text-sm">
                  <div>Rows: {dataset.length}</div>
                  <div>Columns: {Object.keys(dataset[0] || {}).length}</div>
                </div>
              )}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Rules</h3>
              <button
                onClick={addRule}
                className="px-3 py-1 bg-[#1877F2] text-white rounded text-sm hover:bg-[#145db2] transition-colors"
              >
                + Add
              </button>
            </div>
            
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-gray-900/30 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={rule.name}
                      onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                      className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-1 text-sm"
                      placeholder="Rule name"
                    />
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={(e) => updateRule(rule.id, { enabled: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={rule.condition}
                      onChange={(e) => updateRule(rule.id, { condition: e.target.value })}
                      className="w-full bg-transparent border border-gray-600 rounded px-2 py-1 text-sm font-mono"
                      placeholder="value > 100"
                    />
                    <select
                      value={rule.action}
                      onChange={(e) => updateRule(rule.id, { action: e.target.value as 'Buy' | 'Sell' | 'Alert' })}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                    >
                      <option value="Buy">Buy</option>
                      <option value="Sell">Sell</option>
                      <option value="Alert">Alert</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={runSimulation}
            disabled={dataset.length === 0 || isRunning}
            className="w-full p-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#145db2] transition-colors font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isRunning ? 'Running...' : 'Run Backtest'}
          </button>
        </div>

        {/* Right Panel - Results */}
        <div className="lg:col-span-2 space-y-6">
          {results.length === 0 ? (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">No Results</h3>
              <p className="text-gray-400">Upload data and run a backtest to see results</p>
            </div>
          ) : (
            <>
              {/* Summary - Moved to Top */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700/50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      ${results[results.length - 1]?.equity.toFixed(0) || 0}
                    </div>
                    <div className="text-sm text-gray-400">Final Equity</div>
                  </div>
                  <div className="bg-gray-700/50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {results.filter(r => r.action).length}
                    </div>
                    <div className="text-sm text-gray-400">Total Actions</div>
                  </div>
                  <div className="bg-gray-700/50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {((results[results.length - 1]?.equity || 1000) - 1000).toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-400">Return</div>
                  </div>
                  <div className="bg-gray-700/50 rounded p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {results.length}
                    </div>
                    <div className="text-sm text-gray-400">Data Points</div>
                  </div>
                </div>
              </div>

              {/* 2D Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Price & Actions</h3>
                  <div className="h-80">
                    <Plot
                      data={chartData}
                      layout={layout}
                      config={config}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Equity Curve</h3>
                  <div className="h-80">
                    <Plot
                      data={equityData}
                      layout={layout}
                      config={config}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* 3D Chart */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">3D Price vs Equity</h3>
                <div className="h-96">
                  <Plot
                    data={chart3DData}
                    layout={layout3D}
                    config={config}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>

              {/* Volume Chart */}
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Volume Analysis</h3>
                <div className="h-80">
                  <Plot
                    data={volumeData}
                    layout={layout}
                    config={config}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
