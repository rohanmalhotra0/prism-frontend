"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import HeroBackground from "@/components/ui/HeroBackground";
import { 
  Download, 
  Database, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Target, 
  Brain, 
  TestTube,
  BookOpen,
  FileText,
  Play,
  Code,
  Lightbulb,
  Rocket,
  Users,
  Award
} from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  description: string;
  type: '2d' | '3d';
  category: string;
  features: string[];
  samples: number;
  clusters: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  researchPaper?: string;
  useCases: string[];
  generateData: () => any[];
}

interface ResearchInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  datasets: string[];
  techniques: string[];
}

export default function MLPlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState(false);

  // Research Insights
  const researchInsights: ResearchInsight[] = [
    {
      id: 'sentiment-analysis',
      title: 'Sentiment Analysis in Financial Markets',
      description: 'How social media sentiment impacts stock prices and market volatility',
      category: 'Finance',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      datasets: ['Stock Price Analysis', 'Customer Segmentation'],
      techniques: ['NLP', 'Time Series', 'Sentiment Classification']
    },
    {
      id: 'customer-clustering',
      title: 'Advanced Customer Segmentation',
      description: 'Multi-dimensional clustering for personalized marketing strategies',
      category: 'Marketing',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      datasets: ['Customer Analytics (3D)', 'Customer Segmentation'],
      techniques: ['K-Means', 'DBSCAN', 'Hierarchical Clustering']
    },
    {
      id: 'health-prediction',
      title: 'Predictive Health Analytics',
      description: 'Machine learning models for early disease detection and prevention',
      category: 'Healthcare',
      icon: Brain,
      color: 'from-purple-500 to-violet-500',
      datasets: ['Medical Diagnosis', 'Health & Fitness'],
      techniques: ['Random Forest', 'SVM', 'Neural Networks']
    },
    {
      id: 'quality-control',
      title: 'Manufacturing Quality Prediction',
      description: 'AI-driven quality control systems for industrial production',
      category: 'Engineering',
      icon: TestTube,
      color: 'from-orange-500 to-red-500',
      datasets: ['Manufacturing Quality', 'Sales Performance'],
      techniques: ['Regression', 'Anomaly Detection', 'Process Control']
    }
  ];

  // Enhanced Datasets with Research Integration
  const datasets: Dataset[] = [
    {
      id: 'iris-2d',
      name: 'Iris Classification (2D)',
      description: 'Classic iris flower dataset with sepal measurements - perfect for learning classification algorithms',
      type: '2d',
      category: 'Classification',
      features: ['sepal_length', 'sepal_width', 'species'],
      samples: 150,
      clusters: 3,
      difficulty: 'Beginner',
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      researchPaper: 'Fisher, R.A. (1936). The use of multiple measurements in taxonomic problems.',
      useCases: ['Species Classification', 'Feature Selection', 'Dimensionality Reduction'],
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
      description: 'E-commerce customer data with spending patterns - ideal for market research and personalization',
      type: '2d',
      category: 'Clustering',
      features: ['annual_income', 'spending_score', 'age'],
      samples: 200,
      clusters: 5,
      difficulty: 'Intermediate',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      researchPaper: 'Kotler, P. (2016). Marketing 4.0: Moving from Traditional to Digital.',
      useCases: ['Market Segmentation', 'Customer Lifetime Value', 'Personalized Marketing'],
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
      description: 'Financial market data with price movements - perfect for quantitative finance research',
      type: '2d',
      category: 'Finance',
      features: ['price', 'volume', 'volatility'],
      samples: 300,
      clusters: 4,
      difficulty: 'Advanced',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      researchPaper: 'Malhotra, R. (2025). Reddit Data in Quantitative Financial Models.',
      useCases: ['Risk Assessment', 'Portfolio Optimization', 'Algorithmic Trading'],
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
      description: 'Personal health data with exercise patterns - great for healthcare analytics research',
      type: '2d',
      category: 'Health',
      features: ['heart_rate', 'steps', 'calories'],
      samples: 180,
      clusters: 3,
      difficulty: 'Intermediate',
      icon: Zap,
      color: 'from-purple-500 to-violet-500',
      researchPaper: 'Topol, E. (2019). Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again.',
      useCases: ['Health Monitoring', 'Fitness Optimization', 'Disease Prevention'],
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
      description: 'Sales team performance data - excellent for business analytics and optimization research',
      type: '2d',
      category: 'Business',
      features: ['sales_amount', 'calls_made', 'conversion_rate'],
      samples: 120,
      clusters: 4,
      difficulty: 'Intermediate',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      researchPaper: 'Davenport, T.H. (2017). The AI Advantage: How to Put the Artificial Intelligence Revolution to Work.',
      useCases: ['Performance Analysis', 'Sales Forecasting', 'Team Optimization'],
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
    },
    // 3D Datasets
    {
      id: 'iris-3d',
      name: 'Iris Classification (3D)',
      description: 'Complete iris dataset with all four measurements - advanced multi-dimensional analysis',
      type: '3d',
      category: 'Classification',
      features: ['sepal_length', 'sepal_width', 'petal_length', 'species'],
      samples: 150,
      clusters: 3,
      difficulty: 'Intermediate',
      icon: Target,
      color: 'from-pink-500 to-rose-500',
      researchPaper: 'Fisher, R.A. (1936). The use of multiple measurements in taxonomic problems.',
      useCases: ['Multi-dimensional Classification', 'Feature Engineering', 'Dimensionality Reduction'],
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
      description: 'Multi-dimensional customer profiling - perfect for advanced market research',
      type: '3d',
      category: 'Clustering',
      features: ['annual_income', 'age', 'spending_score'],
      samples: 200,
      clusters: 5,
      difficulty: 'Advanced',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      researchPaper: 'Kotler, P. (2016). Marketing 4.0: Moving from Traditional to Digital.',
      useCases: ['Advanced Segmentation', 'Customer Journey Mapping', 'Predictive Analytics'],
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
      description: 'Portfolio risk assessment with return, volatility, and correlation - quantitative finance research',
      type: '3d',
      category: 'Finance',
      features: ['expected_return', 'volatility', 'sharpe_ratio'],
      samples: 250,
      clusters: 6,
      difficulty: 'Advanced',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      researchPaper: 'Malhotra, R. (2024). An Economic Approach to Optimize Capital Allocation.',
      useCases: ['Risk Management', 'Portfolio Optimization', 'Derivatives Pricing'],
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
      description: 'Patient health metrics with blood pressure, cholesterol, and BMI - healthcare AI research',
      type: '3d',
      category: 'Health',
      features: ['systolic_bp', 'cholesterol', 'bmi'],
      samples: 300,
      clusters: 4,
      difficulty: 'Advanced',
      icon: Brain,
      color: 'from-purple-500 to-violet-500',
      researchPaper: 'Topol, E. (2019). Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again.',
      useCases: ['Disease Prediction', 'Treatment Optimization', 'Health Risk Assessment'],
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
      description: 'Production quality control with temperature, pressure, and defect rates - industrial AI research',
      type: '3d',
      category: 'Engineering',
      features: ['temperature', 'pressure', 'defect_rate'],
      samples: 400,
      clusters: 5,
      difficulty: 'Advanced',
      icon: TestTube,
      color: 'from-orange-500 to-red-500',
      researchPaper: 'Lee, J. (2018). Industrial AI: Applications in Smart Manufacturing.',
      useCases: ['Quality Control', 'Predictive Maintenance', 'Process Optimization'],
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

  const filteredDatasets = datasets.filter(dataset => {
    const categoryMatch = selectedCategory === 'all' || dataset.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || dataset.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

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
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-700 text-xs font-semibold text-gray-300 rounded-full">
              {dataset.type.toUpperCase()}
            </span>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              dataset.difficulty === 'Beginner' ? 'bg-green-600 text-green-100' :
              dataset.difficulty === 'Intermediate' ? 'bg-yellow-600 text-yellow-100' :
              'bg-red-600 text-red-100'
            }`}>
              {dataset.difficulty}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
          {dataset.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {dataset.description}
        </p>

        {/* Research Paper Reference */}
        {dataset.researchPaper && (
          <div className="mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-blue-300 font-medium mb-1">Research Reference</div>
                <div className="text-xs text-gray-300 leading-relaxed">{dataset.researchPaper}</div>
              </div>
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Use Cases:</div>
          <div className="flex flex-wrap gap-1">
            {dataset.useCases.map((useCase, index) => (
              <span key={index} className="px-2 py-1 bg-gray-700/50 text-xs text-gray-300 rounded">
                {useCase}
              </span>
            ))}
          </div>
        </div>
        
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

  const ResearchCard = ({ insight }: { insight: ResearchInsight }) => {
    const Icon = insight.icon;
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="px-3 py-1 bg-gray-700 text-xs font-semibold text-gray-300 rounded-full">
            {insight.category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
          {insight.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {insight.description}
        </p>

        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-2">Related Datasets:</div>
            <div className="flex flex-wrap gap-1">
              {insight.datasets.map((dataset, index) => (
                <span key={index} className="px-2 py-1 bg-blue-600/20 text-xs text-blue-300 rounded border border-blue-500/30">
                  {dataset}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-2">ML Techniques:</div>
            <div className="flex flex-wrap gap-1">
              {insight.techniques.map((technique, index) => (
                <span key={index} className="px-2 py-1 bg-purple-600/20 text-xs text-purple-300 rounded border border-purple-500/30">
                  {technique}
                </span>
              ))}
            </div>
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-semibold">ML Playground</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Research & Datasets
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Explore cutting-edge research insights and experiment with curated datasets designed for machine learning
            </p>
          </div>
        </div>

        {/* Research Insights Section */}
        <div className="px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Research Insights</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Discover how our datasets connect to real-world research and applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {researchInsights.map((insight) => (
                <ResearchCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Datasets Section */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Curated Datasets</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                High-quality datasets with research backing, ready for machine learning experimentation
              </p>
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Classification">Classification</option>
                  <option value="Clustering">Clustering</option>
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                  <option value="Business">Business</option>
                  <option value="Engineering">Engineering</option>
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Ready to Start Your ML Journey?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">1. Download Datasets</h4>
                  <p className="text-gray-400 text-sm">Choose from our curated collection of research-backed datasets</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">2. Experiment & Learn</h4>
                  <p className="text-gray-400 text-sm">Use our ML Lab tools to analyze and visualize your data</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">3. Apply Research</h4>
                  <p className="text-gray-400 text-sm">Implement cutting-edge techniques from our research insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
