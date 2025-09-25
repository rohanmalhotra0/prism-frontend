"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import HeroBackground from "@/components/ui/HeroBackground";
import { Download, Database, BarChart3, TrendingUp, Zap, Target, Brain, TestTube } from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  description: string;
  type: '2d' | '3d';
  category: string;
  features: string[];
  samples: number;
  clusters: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  generateData: () => any[];
}

export default function DemoPage() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 2D Datasets
  const datasets2D: Dataset[] = [
    {
      id: 'iris-2d',
      name: 'Iris Classification (2D)',
      description: 'Classic iris flower dataset with sepal length/width for species classification',
      type: '2d',
      category: 'Classification',
      features: ['sepal_length', 'sepal_width', 'species'],
      samples: 150,
      clusters: 3,
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      generateData: () => {
        const species = ['setosa', 'versicolor', 'virginica'];
        const data = [];
        for (let i = 0; i < 150; i++) {
          const speciesIndex = Math.floor(i / 50);
          const baseLength = [5.0, 6.0, 6.5][speciesIndex];
          const baseWidth = [3.4, 2.8, 3.0][speciesIndex];
          data.push({
            sepal_length: baseLength + (Math.random() - 0.5) * 1.5,
            sepal_width: baseWidth + (Math.random() - 0.5) * 1.0,
            species: species[speciesIndex],
            petal_length: 1.4 + Math.random() * 3.0,
            petal_width: 0.1 + Math.random() * 1.5
          });
        }
        return data;
      }
    },
    {
      id: 'customer-segments',
      name: 'Customer Segmentation',
      description: 'E-commerce customer data with spending patterns and demographics',
      type: '2d',
      category: 'Clustering',
      features: ['annual_income', 'spending_score', 'age'],
      samples: 200,
      clusters: 5,
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 200; i++) {
          const age = 18 + Math.random() * 50;
          const income = 15000 + Math.random() * 100000;
          const spending = Math.random() * 100;
          data.push({
            annual_income: income,
            spending_score: spending,
            age: age,
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            purchases: Math.floor(Math.random() * 50)
          });
        }
        return data;
      }
    },
    {
      id: 'stock-prices',
      name: 'Stock Price Analysis',
      description: 'Stock market data with price movements and volume patterns',
      type: '2d',
      category: 'Finance',
      features: ['price', 'volume', 'volatility'],
      samples: 300,
      clusters: 4,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      generateData: () => {
        const data = [];
        let price = 100;
        for (let i = 0; i < 300; i++) {
          const change = (Math.random() - 0.5) * 10;
          price += change;
          const volume = 1000000 + Math.random() * 5000000;
          const volatility = Math.abs(change) * 10;
          data.push({
            price: Math.max(price, 10),
            volume: volume,
            volatility: volatility,
            date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
            rsi: 20 + Math.random() * 60
          });
        }
        return data;
      }
    },
    {
      id: 'health-metrics',
      name: 'Health & Fitness',
      description: 'Personal health data with exercise patterns and biometrics',
      type: '2d',
      category: 'Health',
      features: ['heart_rate', 'steps', 'calories'],
      samples: 180,
      clusters: 3,
      icon: Zap,
      color: 'from-purple-500 to-violet-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 180; i++) {
          const steps = 2000 + Math.random() * 12000;
          const heartRate = 60 + Math.random() * 40;
          const calories = steps * 0.04 + Math.random() * 200;
          data.push({
            heart_rate: heartRate,
            steps: steps,
            calories: calories,
            sleep_hours: 6 + Math.random() * 4,
            weight: 60 + Math.random() * 30
          });
        }
        return data;
      }
    },
    {
      id: 'sales-performance',
      name: 'Sales Performance',
      description: 'Sales team performance data with targets and achievements',
      type: '2d',
      category: 'Business',
      features: ['sales_amount', 'calls_made', 'conversion_rate'],
      samples: 120,
      clusters: 4,
      icon: Database,
      color: 'from-orange-500 to-red-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 120; i++) {
          const calls = 20 + Math.random() * 80;
          const conversion = 0.05 + Math.random() * 0.25;
          const sales = calls * conversion * (500 + Math.random() * 1000);
          data.push({
            sales_amount: sales,
            calls_made: calls,
            conversion_rate: conversion,
            experience_years: Math.random() * 10,
            region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)]
          });
        }
        return data;
      }
    }
  ];

  // 3D Datasets
  const datasets3D: Dataset[] = [
    {
      id: 'iris-3d',
      name: 'Iris Classification (3D)',
      description: 'Complete iris dataset with all four measurements for 3D clustering',
      type: '3d',
      category: 'Classification',
      features: ['sepal_length', 'sepal_width', 'petal_length', 'species'],
      samples: 150,
      clusters: 3,
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      generateData: () => {
        const species = ['setosa', 'versicolor', 'virginica'];
        const data = [];
        for (let i = 0; i < 150; i++) {
          const speciesIndex = Math.floor(i / 50);
          const baseLength = [5.0, 6.0, 6.5][speciesIndex];
          const baseWidth = [3.4, 2.8, 3.0][speciesIndex];
          const basePetalLength = [1.4, 4.7, 6.0][speciesIndex];
          data.push({
            sepal_length: baseLength + (Math.random() - 0.5) * 1.5,
            sepal_width: baseWidth + (Math.random() - 0.5) * 1.0,
            petal_length: basePetalLength + (Math.random() - 0.5) * 1.0,
            species: species[speciesIndex],
            petal_width: 0.1 + Math.random() * 1.5
          });
        }
        return data;
      }
    },
    {
      id: 'customer-3d',
      name: 'Customer Analytics (3D)',
      description: 'Multi-dimensional customer data with income, age, and spending patterns',
      type: '3d',
      category: 'Clustering',
      features: ['annual_income', 'age', 'spending_score'],
      samples: 200,
      clusters: 5,
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 200; i++) {
          const age = 18 + Math.random() * 50;
          const income = 15000 + Math.random() * 100000;
          const spending = Math.random() * 100;
          data.push({
            annual_income: income,
            age: age,
            spending_score: spending,
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            purchases: Math.floor(Math.random() * 50),
            satisfaction: 1 + Math.random() * 4
          });
        }
        return data;
      }
    },
    {
      id: 'financial-3d',
      name: 'Financial Risk Analysis',
      description: 'Portfolio risk assessment with return, volatility, and correlation',
      type: '3d',
      category: 'Finance',
      features: ['expected_return', 'volatility', 'sharpe_ratio'],
      samples: 250,
      clusters: 6,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 250; i++) {
          const return_rate = -0.2 + Math.random() * 0.4;
          const volatility = 0.05 + Math.random() * 0.3;
          const sharpe = return_rate / volatility;
          data.push({
            expected_return: return_rate,
            volatility: volatility,
            sharpe_ratio: sharpe,
            beta: 0.5 + Math.random() * 1.5,
            market_cap: 1000000 + Math.random() * 1000000000
          });
        }
        return data;
      }
    },
    {
      id: 'medical-3d',
      name: 'Medical Diagnosis',
      description: 'Patient health metrics with blood pressure, cholesterol, and BMI',
      type: '3d',
      category: 'Health',
      features: ['systolic_bp', 'cholesterol', 'bmi'],
      samples: 300,
      clusters: 4,
      icon: Brain,
      color: 'from-purple-500 to-violet-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 300; i++) {
          const systolic = 90 + Math.random() * 60;
          const cholesterol = 150 + Math.random() * 100;
          const bmi = 18 + Math.random() * 20;
          data.push({
            systolic_bp: systolic,
            cholesterol: cholesterol,
            bmi: bmi,
            age: 25 + Math.random() * 50,
            diabetes: Math.random() > 0.8 ? 1 : 0
          });
        }
        return data;
      }
    },
    {
      id: 'manufacturing-3d',
      name: 'Manufacturing Quality',
      description: 'Production quality control with temperature, pressure, and defect rates',
      type: '3d',
      category: 'Engineering',
      features: ['temperature', 'pressure', 'defect_rate'],
      samples: 400,
      clusters: 5,
      icon: TestTube,
      color: 'from-orange-500 to-red-500',
      generateData: () => {
        const data = [];
        for (let i = 0; i < 400; i++) {
          const temp = 180 + Math.random() * 40;
          const pressure = 2 + Math.random() * 3;
          const defectRate = Math.max(0, (temp - 200) * 0.01 + (pressure - 3) * 0.05 + Math.random() * 0.1);
          data.push({
            temperature: temp,
            pressure: pressure,
            defect_rate: defectRate,
            speed: 50 + Math.random() * 50,
            material_type: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
          });
        }
        return data;
      }
    }
  ];

  const downloadDataset = (dataset: Dataset) => {
    setIsGenerating(true);
    
    // Generate data
    const data = dataset.generateData();
    
    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => 
          typeof row[header] === 'string' ? `"${row[header]}"` : row[header]
        ).join(',')
      )
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataset.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setIsGenerating(false);
  };

  const DatasetCard = ({ dataset }: { dataset: Dataset }) => {
    const Icon = dataset.icon;
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${dataset.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="px-3 py-1 bg-gray-700 text-xs font-semibold text-gray-300 rounded-full">
            {dataset.type.toUpperCase()}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
          {dataset.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {dataset.description}
        </p>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Samples:</span>
            <span className="text-white font-medium">{dataset.samples.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Features:</span>
            <span className="text-white font-medium">{dataset.features.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Clusters:</span>
            <span className="text-white font-medium">{dataset.clusters}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="text-white font-medium">{dataset.category}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => downloadDataset(dataset)}
            disabled={isGenerating}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isGenerating
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:scale-105'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Download Dataset'}
            </div>
          </button>
          
          <div className="text-xs text-gray-500 text-center">
            Features: {dataset.features.join(', ')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black/20 to-slate-900/30"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              ML Lab Datasets
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Curated datasets designed specifically for machine learning experimentation and analysis
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* 2D Datasets Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">2D Datasets</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Perfect for basic clustering, classification, and pattern recognition tasks
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {datasets2D.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            </div>

            {/* 3D Datasets Section */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">3D Datasets</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Advanced multi-dimensional datasets for complex clustering and deep learning analysis
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {datasets3D.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">How to Use These Datasets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-3">For General Modeling</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">1</span>
                      Download your preferred dataset
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">2</span>
                      Go to General Modeling page
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">3</span>
                      Upload the CSV file in Dataset Lab
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">4</span>
                      Switch to Machine Learning Lab
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">5</span>
                      Select features and run clustering analysis
                    </li>
                  </ol>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-3">For Backtesting Sandbox</h4>
                  <ol className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">1</span>
                      Download a time-series dataset (Stock Prices, Health Metrics)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">2</span>
                      Go to Backtesting Sandbox
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">3</span>
                      Upload the dataset
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">4</span>
                      Create trading/alert rules
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-0.5">5</span>
                      Run simulation and analyze results
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
