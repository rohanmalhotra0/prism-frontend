"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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

// -------- Types --------
interface DatasetRow {
  [key: string]: any;
  timestamp?: string | number;
  date?: string | number;
}

interface StrategyRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
  color: string;
}

interface SimulationResult {
  timestamp: number;
  rowIndex: number;
  data: DatasetRow;
  triggers: {
    ruleId: string;
    ruleName: string;
    action: string;
    value: any;
  }[];
  cumulativeScore: number;
  equity: number;
}

interface BacktestingMetrics {
  totalTriggers: number;
  successRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  winRate: number;
  averageReturn: number;
  customKPIs: { [key: string]: number };
}

interface BacktestProps {
  sharedData?: any;
  setSharedData?: (data: any) => void;
}

// -------- Utilities --------
const COLORS = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff"];

// Generate UUID function (fallback for crypto.randomUUID)
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Safe evaluation function for strategy rules
function safeEval(expression: string, context: DatasetRow): any {
  try {
    // Simple expression evaluator for basic math operations
    // This is much safer than using Function constructor
    
    // Replace column references with actual values
    let processedExpression = expression;
    Object.keys(context).forEach(key => {
      const value = context[key];
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      if (typeof value === 'number') {
        processedExpression = processedExpression.replace(regex, value.toString());
      } else if (typeof value === 'string') {
        processedExpression = processedExpression.replace(regex, `"${value}"`);
      } else {
        processedExpression = processedExpression.replace(regex, '0');
      }
    });
    
    // Basic math operations
    const mathOps = {
      'Math.abs': Math.abs,
      'Math.max': Math.max,
      'Math.min': Math.min,
      'Math.round': Math.round,
      'Math.floor': Math.floor,
      'Math.ceil': Math.ceil,
      'Math.sqrt': Math.sqrt,
      'Math.sin': Math.sin,
      'Math.cos': Math.cos,
      'Math.tan': Math.tan,
      'Math.log': Math.log,
      'Math.exp': Math.exp,
      'Math.pow': Math.pow
    };
    
    // Replace Math functions
    Object.entries(mathOps).forEach(([funcName, func]) => {
      const regex = new RegExp(funcName.replace('.', '\\.'), 'g');
      processedExpression = processedExpression.replace(regex, func.toString());
    });
    
    // Evaluate the expression safely
    // Only allow basic math operations and comparisons
    const allowedChars = /^[0-9+\-*/.()<>=!&|"'\s]+$/;
    if (!allowedChars.test(processedExpression)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Use eval with strict mode (still not ideal, but better than Function constructor)
    return eval(processedExpression);
  } catch (error) {
    console.warn('Rule evaluation error:', error);
    return false;
  }
}

// -------- Component --------
export default function Backtest({ sharedData, setSharedData }: BacktestProps) {
  // State
  const [dataset, setDataset] = useState<DatasetRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  
  const [rules, setRules] = useState<StrategyRule[]>([
    {
      id: generateUUID(),
      name: "High Value Alert",
      condition: "value > 100",
      action: "Alert",
      enabled: true,
      color: COLORS[0]
    },
    {
      id: generateUUID(),
      name: "Buy Low",
      condition: "value < 95",
      action: "Buy",
      enabled: true,
      color: COLORS[1]
    },
    {
      id: generateUUID(),
      name: "Sell High",
      condition: "value > 105",
      action: "Sell",
      enabled: true,
      color: COLORS[2]
    }
  ]);
  
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [metrics, setMetrics] = useState<BacktestingMetrics | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'rules' | 'simulation' | 'visualization'>('rules');
  const [ruleBuilderMode, setRuleBuilderMode] = useState<'code' | 'visual'>('code');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  
  // Load shared data from Dataset Lab
  useEffect(() => {
    if (sharedData && sharedData.type === 'dataset') {
      setDataset(sharedData.data);
      setColumns(sharedData.columns);
      setSelectedColumns(sharedData.selectedColumns || sharedData.columns.slice(0, 3));
    }
  }, [sharedData]);

  // File processing
  const processUploadedFile = async (file: File) => {
    setIsProcessingFile(true);
    setSelectedFile(file);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('File must have at least a header row and one data row');
      }
      
      // Parse CSV more robustly
      const parseCSVLine = (line: string): string[] => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };
      
      const headers = parseCSVLine(lines[0]);
      
      const data = lines.slice(1).map((line, index) => {
        const values = parseCSVLine(line);
        const row: DatasetRow = { index };
        
        headers.forEach((header, colIndex) => {
          const value = values[colIndex] || '';
          // Try to parse as number, fallback to string
          const numValue = Number(value);
          row[header] = (value !== '' && !isNaN(numValue) && isFinite(numValue)) ? numValue : value;
        });
        
        return row;
      }).filter(row => Object.values(row).some(val => val !== '' && val !== null && val !== undefined));

      if (data.length === 0) {
        throw new Error('No valid data rows found');
      }

      setDataset(data);
      setColumns(headers);
      setSelectedColumns(headers.slice(0, Math.min(3, headers.length)));
      
      // Clear previous results
      setSimulationResults([]);
      setMetrics(null);
    } catch (error) {
      console.error('Error processing file:', error);
      alert(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Generate sample dataset
  const generateSampleData = () => {
    console.log('Generating sample data...');
    const sampleData: DatasetRow[] = [];
    const startDate = new Date('2023-01-01');
    
    let currentValue = 100;
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Create more realistic price movement with trend and volatility
      const trend = Math.sin(i / 50) * 0.5; // Long-term trend
      const volatility = (Math.random() - 0.5) * 4; // Daily volatility
      const momentum = i > 0 ? (currentValue - sampleData[i-1].value) * 0.1 : 0; // Momentum
      
      currentValue = Math.max(50, currentValue + trend + volatility + momentum);
      
      // Calculate technical indicators
      const rsi = i > 14 ? calculateRSI(sampleData.slice(-14).map(d => d.value), currentValue) : 50;
      const macd = i > 26 ? calculateMACD(sampleData.slice(-26).map(d => d.value), currentValue) : 0;
      const volume = Math.floor(Math.random() * 1000) + 100;
      
      sampleData.push({
        index: i,
        date: date.toISOString().split('T')[0],
        timestamp: date.getTime(),
        value: currentValue,
        volume: volume,
        rsi: rsi,
        macd: macd,
        price: currentValue,
        change: i > 0 ? currentValue - sampleData[i-1].value : 0
      });
    }
    
    console.log('Sample data generated:', sampleData.length, 'rows');
    setDataset(sampleData);
    setColumns(['date', 'timestamp', 'value', 'volume', 'rsi', 'macd', 'price', 'change']);
    setSelectedColumns(['value', 'rsi', 'volume']);
    
    // Clear previous results
    setSimulationResults([]);
    setMetrics(null);
  };

  // Helper function to calculate RSI
  const calculateRSI = (prices: number[], currentPrice: number): number => {
    if (prices.length < 14) return 50;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i-1];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }
    
    const avgGain = gains / 14;
    const avgLoss = losses / 14;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  // Helper function to calculate MACD
  const calculateMACD = (prices: number[], currentPrice: number): number => {
    if (prices.length < 26) return 0;
    
    const ema12 = calculateEMA(prices.slice(-12), 12);
    const ema26 = calculateEMA(prices.slice(-26), 26);
    
    return ema12 - ema26;
  };

  // Helper function to calculate EMA
  const calculateEMA = (prices: number[], period: number): number => {
    if (prices.length === 0) return 0;
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  };

  // Rule management
  const addRule = () => {
    const newRule: StrategyRule = {
      id: generateUUID(),
      name: `Rule ${rules.length + 1}`,
      condition: 'value > 0',
      action: 'Alert',
      enabled: true,
      color: COLORS[rules.length % COLORS.length]
    };
    setRules([...rules, newRule]);
  };

  const updateRule = (id: string, updates: Partial<StrategyRule>) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  // Simulation engine
  const runSimulation = async () => {
    if (dataset.length === 0 || rules.length === 0) {
      alert('Please upload a dataset and create at least one rule before running simulation.');
      return;
    }

    console.log('Starting simulation with', dataset.length, 'rows and', rules.length, 'rules');
    setIsSimulating(true);
    setSimulationProgress(0);
    const results: SimulationResult[] = [];
    
    let cumulativeScore = 0;
    let equity = 1000; // Starting equity
    let maxEquity = equity;
    let maxDrawdown = 0;
    let wins = 0;
    let totalTrades = 0;
    let position = 0; // Track position size
    let cash = 1000; // Track cash separately

    for (let i = 0; i < dataset.length; i++) {
      const row = dataset[i];
      const triggers: SimulationResult['triggers'] = [];

      // Check each enabled rule
      rules.filter(rule => rule.enabled && rule.condition.trim()).forEach(rule => {
        try {
          const conditionResult = safeEval(rule.condition, row);
          if (conditionResult === true || conditionResult === 1) {
            const currentValue = row[selectedColumns[0]] || row.value || 0;
            
            console.log(`Rule ${rule.name} triggered: ${rule.condition} = ${conditionResult}, value = ${currentValue}`);
            
            triggers.push({
              ruleId: rule.id,
              ruleName: rule.name,
              action: rule.action,
              value: currentValue
            });

            // Update equity based on action
            if (rule.action === 'Buy' && typeof currentValue === 'number' && cash > 0) {
              const tradeAmount = Math.min(cash * 0.1, 100); // 10% of cash or max $100
              position += tradeAmount / currentValue; // Buy shares
              cash -= tradeAmount;
              totalTrades++;
              console.log(`BUY: ${tradeAmount} for ${position} shares at ${currentValue}`);
            } else if (rule.action === 'Sell' && typeof currentValue === 'number' && position > 0) {
              const sellAmount = position * currentValue;
              cash += sellAmount;
              position = 0; // Sell all position
              totalTrades++;
              if (sellAmount > 0) wins++;
              console.log(`SELL: ${position} shares at ${currentValue} for ${sellAmount}`);
            } else if (rule.action === 'Alert') {
              cumulativeScore += 1;
              console.log(`ALERT: ${rule.name}`);
            }
          }
        } catch (error) {
          console.warn(`Error evaluating rule ${rule.name}:`, error);
        }
      });

      // Calculate current equity (cash + position value)
      const currentValue = row[selectedColumns[0]] || row.value || 0;
      equity = cash + (position * (typeof currentValue === 'number' ? currentValue : 0));

      // Calculate drawdown
      if (equity > maxEquity) maxEquity = equity;
      const currentDrawdown = maxEquity > 0 ? (maxEquity - equity) / maxEquity : 0;
      if (currentDrawdown > maxDrawdown) maxDrawdown = currentDrawdown;

      // Generate timestamp if not present
      let timestamp = i;
      if (row.timestamp && typeof row.timestamp === 'number') {
        timestamp = row.timestamp;
      } else if (row.date) {
        const date = new Date(row.date);
        if (!isNaN(date.getTime())) {
          timestamp = date.getTime();
        }
      }

      results.push({
        timestamp,
        rowIndex: i,
        data: row,
        triggers,
        cumulativeScore,
        equity
      });

      // Update progress
      setSimulationProgress(Math.round((i / dataset.length) * 100));
      
      // Small delay to show progress
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    console.log('Simulation completed with', results.length, 'results');
    setSimulationResults(results);
    
    // Calculate metrics
    const returns = results.map((r, i) => 
      i > 0 && results[i-1].equity > 0 ? (r.equity - results[i-1].equity) / results[i-1].equity : 0
    ).filter(r => !isNaN(r) && isFinite(r));
    
    const averageReturn = returns.length > 0 ? returns.reduce((sum, r) => sum + r, 0) / returns.length : 0;
    const returnStdDev = returns.length > 1 ? Math.sqrt(
      returns.reduce((sum, r) => sum + Math.pow(r - averageReturn, 2), 0) / (returns.length - 1)
    ) : 0;
    
    const sharpeRatio = returnStdDev > 0 ? averageReturn / returnStdDev : 0;
    
    const totalTriggers = results.reduce((sum, r) => sum + r.triggers.length, 0);
    const totalAlerts = results.reduce((sum, r) => sum + r.triggers.filter(t => t.action === 'Alert').length, 0);
    const totalBuys = results.reduce((sum, r) => sum + r.triggers.filter(t => t.action === 'Buy').length, 0);
    const totalSells = results.reduce((sum, r) => sum + r.triggers.filter(t => t.action === 'Sell').length, 0);
    
    // Calculate success rate based on profitable trades
    const profitableTrades = results.filter(r => r.triggers.some(t => t.action === 'Sell')).length;
    const successRate = totalSells > 0 ? profitableTrades / totalSells : 0;
    
    console.log('Total triggers:', totalTriggers, 'Total trades:', totalTrades, 'Success rate:', successRate);
    console.log('Final equity:', equity, 'Max equity:', maxEquity, 'Drawdown:', maxDrawdown);
    
    setMetrics({
      totalTriggers: totalTriggers,
      successRate: successRate,
      maxDrawdown: maxDrawdown,
      sharpeRatio: sharpeRatio,
      winRate: successRate,
      averageReturn: averageReturn,
      customKPIs: {
        'Total Alerts': totalAlerts,
        'Total Buys': totalBuys,
        'Total Sells': totalSells,
        'Final Equity': equity,
        'Max Equity': maxEquity,
        'Total Trades': totalTrades
      }
    });

    setIsSimulating(false);
    setSimulationProgress(0);
  };

  // Visualization data
  const timelineData = useMemo(() => {
    if (simulationResults.length === 0) return [];

    const traces: any[] = [];
    
    // Main data line
    if (selectedColumns.length > 0 && selectedColumns[0]) {
      const mainColumn = selectedColumns[0];
      const yValues = simulationResults.map(r => {
        const value = r.data[mainColumn];
        return typeof value === 'number' ? value : 0;
      });
      
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: simulationResults.map(r => r.timestamp),
        y: yValues,
        name: mainColumn,
        line: { color: '#4ecdc4', width: 2 },
        hovertemplate: 'Time: %{x}<br>Value: %{y:.2f}<extra></extra>'
      });
    }

    // Trigger markers
    rules.forEach(rule => {
      const triggerPoints = simulationResults
        .filter(r => r.triggers.some(t => t.ruleId === rule.id))
        .map(r => {
          const mainColumn = selectedColumns[0];
          const value = r.data[mainColumn];
          return {
            x: r.timestamp,
            y: typeof value === 'number' ? value : 0,
            text: rule.name
          };
        });

      if (triggerPoints.length > 0) {
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: triggerPoints.map(p => p.x),
          y: triggerPoints.map(p => p.y),
          name: rule.name,
          marker: { 
            color: rule.color, 
            size: 8,
            symbol: rule.action === 'Buy' ? 'triangle-up' : 
                   rule.action === 'Sell' ? 'triangle-down' : 'circle'
          },
          hovertemplate: 'Rule: %{text}<br>Time: %{x}<br>Value: %{y:.2f}<extra></extra>',
          text: triggerPoints.map(p => p.text)
        });
      }
    });

    return traces;
  }, [simulationResults, selectedColumns, rules]);

  const equityData = useMemo(() => {
    if (simulationResults.length === 0) return [];

    return [{
      type: 'scatter' as const,
      mode: 'lines' as const,
      x: simulationResults.map(r => r.timestamp),
      y: simulationResults.map(r => r.equity),
      name: 'Equity Curve',
      line: { color: '#ff6b6b', width: 2 },
      hovertemplate: 'Time: %{x}<br>Equity: $%{y:.2f}<extra></extra>'
    }];
  }, [simulationResults]);

  // Layouts
  const timelineLayout = {
    title: { text: 'Strategy Timeline', font: { color: 'white', size: 16 } },
    xaxis: { color: 'white', gridcolor: '#2e3440' },
    yaxis: { color: 'white', gridcolor: '#2e3440' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white' },
    legend: { font: { color: 'white' } },
    margin: { l: 60, r: 20, t: 40, b: 50 }
  };

  const equityLayout = {
    title: { text: 'Equity Curve', font: { color: 'white', size: 16 } },
    xaxis: { color: 'white', gridcolor: '#2e3440' },
    yaxis: { color: 'white', gridcolor: '#2e3440' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white' },
    legend: { font: { color: 'white' } },
    margin: { l: 60, r: 20, t: 40, b: 50 }
  };

  const plotConfig = {
    displayModeBar: true,
    displaylogo: false,
    responsive: true,
    scrollZoom: true
  };

  return (
    <div className="min-h-[90vh] bg-black text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Backtest</h2>
        <p className="text-gray-400">Upload datasets, define strategies, and simulate historical performance</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Dataset Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Dataset</h3>
            
            {/* File Upload */}
            <div className="mb-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) processUploadedFile(file);
                  }}
                  className="hidden"
                  id="dataset-upload"
                  disabled={isProcessingFile}
                />
                <label
                  htmlFor="dataset-upload"
                  className={`cursor-pointer inline-block px-4 py-2 rounded transition-colors ${
                    isProcessingFile
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isProcessingFile ? 'Processing...' : 'Upload Dataset'}
                </label>
                <p className="text-gray-400 text-sm mt-2">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </p>
              </div>
              
              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-gray-600"></div>
                <span className="px-2 text-xs text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>
              
              <button
                onClick={generateSampleData}
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Generate Sample Data
              </button>
            </div>

            {/* Dataset Info */}
            {dataset.length > 0 && (
              <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Dataset Info</h4>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>Rows: {dataset.length}</div>
                  <div>Columns: {columns.length}</div>
                  <div>Date Range: {dataset[0]?.date || 'N/A'} to {dataset[dataset.length-1]?.date || 'N/A'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Rule Builder */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Strategy Rules</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setRuleBuilderMode('code')}
                  className={`px-2 py-1 rounded text-xs ${
                    ruleBuilderMode === 'code' ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setRuleBuilderMode('visual')}
                  className={`px-2 py-1 rounded text-xs ${
                    ruleBuilderMode === 'visual' ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  Visual
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.id} className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="color"
                      value={rule.color}
                      onChange={(e) => updateRule(rule.id, { color: e.target.value })}
                      className="h-4 w-4 rounded"
                    />
                    <input
                      type="text"
                      value={rule.name}
                      onChange={(e) => updateRule(rule.id, { name: e.target.value })}
                      className="flex-1 bg-transparent border border-gray-600 rounded px-2 py-1 text-sm"
                    />
                    <label className="flex items-center gap-1 text-xs">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => updateRule(rule.id, { enabled: e.target.checked })}
                      />
                      Active
                    </label>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Condition</label>
                      <input
                        type="text"
                        value={rule.condition}
                        onChange={(e) => updateRule(rule.id, { condition: e.target.value })}
                        className="w-full bg-transparent border border-gray-600 rounded px-2 py-1 text-sm font-mono"
                        placeholder="value > 100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Action</label>
                      <select
                        value={rule.action}
                        onChange={(e) => updateRule(rule.id, { action: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                      >
                        <option value="Alert">Alert</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                        <option value="Flag">Flag</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                onClick={addRule}
                className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                + Add Rule
              </button>
            </div>
          </div>

          {/* Simulation Controls */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Simulation</h3>
            
            <button
              onClick={runSimulation}
              disabled={isSimulating || dataset.length === 0 || rules.length === 0}
              className={`w-full p-3 rounded-lg font-semibold transition-colors ${
                isSimulating || dataset.length === 0 || rules.length === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSimulating ? `Running... ${simulationProgress}%` : 'Run Simulation'}
            </button>

            {isSimulating && (
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulationProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'rules', label: 'Rules' },
              { id: 'simulation', label: 'Simulation' },
              { id: 'visualization', label: 'Visualization' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content based on active tab */}
          {activeTab === 'rules' && (
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Rule Builder Help</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Available Variables:</h4>
                  {columns.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {columns.map(col => (
                        <div key={col} className="bg-gray-900/30 rounded px-2 py-1 font-mono">
                          {col}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Upload a dataset to see available variables</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-2">Example Conditions:</h4>
                  <div className="space-y-2 text-sm font-mono bg-gray-900/30 rounded p-3">
                    <div>value &gt; 100</div>
                    <div>rsi &lt; 30 && volume &gt; 500</div>
                    <div>price &gt; 50 || change &gt; 0</div>
                    <div>Math.abs(change) &gt; 5</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {/* No data message */}
              {dataset.length === 0 && (
                <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">No Dataset Loaded</h3>
                  <p className="text-gray-400 mb-4">Upload a CSV file or generate sample data to get started</p>
                  <button
                    onClick={generateSampleData}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Generate Sample Data
                  </button>
                </div>
              )}

              {/* No rules message */}
              {dataset.length > 0 && rules.length === 0 && (
                <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">No Rules Created</h3>
                  <p className="text-gray-400">Create at least one strategy rule to run a simulation</p>
                </div>
              )}

              {/* Metrics */}
              {metrics && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">
                        {(metrics.successRate * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">
                        {metrics.totalTriggers}
                      </div>
                      <div className="text-sm text-gray-400">Total Triggers</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-400">
                        {(metrics.maxDrawdown * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-400">Max Drawdown</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-400">
                        {metrics.sharpeRatio.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">Sharpe Ratio</div>
                    </div>
                  </div>
                  
                  {/* Custom KPIs */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-white mb-2">Custom KPIs</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(metrics.customKPIs).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-white">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Results Table */}
              {simulationResults.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Simulation Results</h3>
                  <div className="bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-auto">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left p-2 text-gray-300">Time</th>
                            <th className="text-left p-2 text-gray-300">Value</th>
                            <th className="text-left p-2 text-gray-300">Triggers</th>
                            <th className="text-left p-2 text-gray-300">Equity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {simulationResults.slice(0, 20).map((result, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="p-2 text-gray-400">
                                {new Date(result.timestamp).toLocaleDateString()}
                              </td>
                              <td className="p-2 text-gray-400">
                                {result.data[selectedColumns[0]]?.toFixed(2) || 'N/A'}
                              </td>
                              <td className="p-2 text-gray-400">
                                {result.triggers.length > 0 ? result.triggers.map(t => t.ruleName).join(', ') : 'None'}
                              </td>
                              <td className="p-2 text-gray-400">
                                ${result.equity.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {simulationResults.length > 20 && (
                        <div className="text-center text-gray-500 text-xs mt-2">
                          ... and {simulationResults.length - 20} more rows
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'visualization' && (
            <div className="space-y-6">
              {/* No data message */}
              {simulationResults.length === 0 && (
                <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">No Simulation Results</h3>
                  <p className="text-gray-400 mb-4">Run a simulation to see visualizations</p>
                </div>
              )}

              {/* Timeline Chart */}
              {timelineData.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Strategy Timeline</h3>
                  <div className="h-96">
                    <Plot
                      data={timelineData}
                      layout={timelineLayout}
                      config={plotConfig}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )}

              {/* Equity Curve */}
              {equityData.length > 0 && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Equity Curve</h3>
                  <div className="h-96">
                    <Plot
                      data={equityData}
                      layout={equityLayout}
                      config={plotConfig}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
