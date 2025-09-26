"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/sections/navbar/default";
import HeroBackground from "@/components/ui/HeroBackground";
import { Button } from "@/components/ui/button";
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
  Award,
  Search,
  Filter,
  Grid,
  List,
  ExternalLink,
  Image,
  Video,
  Eye
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

interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  date: string;
  abstract: string;
  pdfUrl: string;
  category: string;
  tags: string[];
  relatedDatasets?: string[];
  techniques?: string[];
}

export default function ExamplesPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'datasets' | 'research' | 'demo'>('datasets');

  // Handle URL parameter to switch to demo tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'demo') {
      setActiveTab('demo');
    }
  }, [searchParams]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isGenerating, setIsGenerating] = useState(false);

  // Research Papers
  const researchPapers: ResearchPaper[] = [
    {
      id: 1,
      title: "Reddit Data in Quantitative Financial Models",
      authors: "Rohan Malhotra, Colin Jones",
      date: "Feb 20, 2025",
      abstract: "This paper explores how Reddit sentiment, particularly from r/WallStreetBets, impacts quantitative financial models post-GameStop and AMC short squeezes. We analyze sentiment patterns, correlation with stock movements, and develop predictive models for market volatility.",
      pdfUrl: "/Reddit Data in Quantitative Financial Models (3).pdf",
      category: "Sentiment Analysis",
      tags: ["Reddit", "Sentiment", "GameStop", "Quantitative Finance", "Social Media"],
      relatedDatasets: ["Stock Price Analysis", "Customer Segmentation"],
      techniques: ["NLP", "Time Series Analysis", "Sentiment Classification", "LSTM Networks"]
    },
    {
      id: 2,
      title: "An Economic Approach to Optimize Capital Allocation",
      authors: "Rohan Malhotra",
      date: "Dec 12, 2024",
      abstract: "A comprehensive study on how the Kelly Criterion can optimize portfolio growth under uncertainty, balancing risk and reward. We examine various market conditions and provide practical implementation strategies for portfolio managers.",
      pdfUrl: "/An Economic Approach to Optimize Capital Allocation.docx (2).pdf",
      category: "Portfolio Theory",
      tags: ["Kelly Criterion", "Portfolio", "Risk Management", "Optimization", "Capital Allocation"],
      relatedDatasets: ["Financial Risk Analysis", "Stock Price Analysis"],
      techniques: ["Kelly Criterion", "Monte Carlo Simulation", "Risk Assessment", "Portfolio Optimization"]
    }
  ];

  // Datasets
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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
      color: 'from-[#1877F2] to-[#1877F2]',
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

  // Refrax Photos for Demo
  const refraxPhotos = [
    {
      id: '2d-datasets',
      title: '2D Datasets',
      description: 'Interactive 2D data visualization and analysis tools',
      image: '/Refrax Photos/2DDatasets.png',
      category: 'Visualization',
      href: '/learn/ml-playground'
    },
    {
      id: '2d-stock-model',
      title: '2D Stock Modeling',
      description: 'Advanced financial modeling with 2D charts and indicators',
      image: '/Refrax Photos/2DstockModel.png',
      category: 'Finance',
      href: '/learn/financial-modeling'
    },
    {
      id: '3d-line-charts',
      title: '3D Financial Charts',
      description: 'Immersive 3D financial data visualization',
      image: '/Refrax Photos/3DLineCharts.png',
      category: 'Visualization',
      href: '/financePage'
    },
    {
      id: 'animations',
      title: 'Data Animations',
      description: 'Dynamic data animations and interactive visualizations',
      image: '/Refrax Photos/Animations.png',
      category: 'Visualization',
      href: '/general'
    },
    {
      id: 'cluster-graphing',
      title: 'Cluster Analysis',
      description: 'Advanced clustering algorithms and data grouping',
      image: '/Refrax Photos/clusterGraphing.png',
      category: 'Machine Learning',
      href: '/learn/ml-playground'
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description: 'AI and ML tools for predictive analytics',
      image: '/Refrax Photos/machineLearning.png',
      category: 'Machine Learning',
      href: '/learn/machine-learning'
    },
    {
      id: 'math-tools',
      title: 'Math Tools',
      description: 'Mathematical visualization and calculation tools',
      image: '/Refrax Photos/math.png',
      category: 'Mathematics',
      href: '/general'
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics',
      description: 'Advanced forecasting and prediction models',
      image: '/Refrax Photos/predictive_analyitics.png',
      category: 'Analytics',
      href: '/learn/machine-learning'
    },
    {
      id: 'monte-carlo',
      title: 'Monte Carlo Simulation',
      description: 'Statistical simulation and risk analysis',
      image: '/Refrax Photos/monteCarlo.png',
      category: 'Simulation',
      href: '/business'
    },
    {
      id: 'customer-retention',
      title: 'Customer Retention',
      description: 'Customer lifecycle and retention analysis',
      image: '/Refrax Photos/CustomerRetention.png',
      category: 'Business',
      href: '/business'
    },
    {
      id: 'base-cases',
      title: 'Base Cases',
      description: 'Financial modeling base case scenarios',
      image: '/Refrax Photos/Base Cases.png',
      category: 'Finance',
      href: '/business'
    },
    {
      id: 'scenario-analysis',
      title: 'Scenario Analysis',
      description: 'Multi-scenario financial modeling and analysis',
      image: '/Refrax Photos/ScenarioAnalysis.png',
      category: 'Finance',
      href: '/business'
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

  const ResearchCard = ({ paper }: { paper: ResearchPaper }) => (
    <article className="group relative">
      <div className="relative bg-white/2 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#1877F2]"></div>
        
        {/* Content layout */}
        <div className="flex flex-col lg:flex-row">
          {/* PDF Preview section */}
          <div className="lg:w-2/5 relative overflow-hidden">
            <div className="aspect-[4/3] relative group-hover:shadow-2xl transition-all duration-700">
              {/* PDF Preview */}
              <div className="w-full h-full bg-white/2 flex items-center justify-center relative overflow-hidden">
                <iframe
                  src={`${paper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-0"
                  title={`Preview of ${paper.title}`}
                  onError={() => {
                    // Fallback if PDF fails to load
                    const fallback = document.querySelector(`[data-paper-id="${paper.id}"] .pdf-fallback`);
                    if (fallback) {
                      (fallback as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                
                {/* Fallback placeholder */}
                <div 
                  className="pdf-fallback absolute inset-0 bg-white/2 flex items-center justify-center hidden"
                  data-paper-id={paper.id}
                >
                  <div className="text-center">
                    <div className="mb-4 animate-pulse">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                    </div>
                    <div className="text-gray-400">PDF Preview</div>
                    <div className="text-gray-500 text-sm mt-2">Click to view full paper</div>
                  </div>
                </div>
              </div>
              
              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md text-blue-300 text-sm font-semibold rounded-full border border-blue-500/40 shadow-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  {paper.category}
                </span>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1877F2]/20 to-transparent rounded-bl-full"></div>
            </div>
          </div>

          {/* Content section */}
          <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-gray-100 transition-colors duration-300">
                {paper.title}
              </h2>
              
              {/* Meta information */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-medium">{paper.authors}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                  {paper.date}
                </span>
              </div>
              
              {/* Abstract */}
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                {paper.abstract}
              </p>

              {/* Related Datasets */}
              {paper.relatedDatasets && (
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">Related Datasets:</div>
                  <div className="flex flex-wrap gap-2">
                    {paper.relatedDatasets.map((dataset, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                        {dataset}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Techniques */}
              {paper.techniques && (
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">ML Techniques:</div>
                  <div className="flex flex-wrap gap-2">
                    {paper.techniques.map((technique, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {paper.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="group/btn relative overflow-hidden rounded-full bg-[#1877F2] px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-[#1877F2] hover:shadow-xl hover:shadow-[#1877F2]/25 hover:scale-105 focus:ring-4 focus:ring-[#1877F2]/30 focus:outline-none active:scale-95"
              >
                <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  View Full Paper
                </a>
              </Button>

              <Button
                asChild
                className="group/btn relative overflow-hidden rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:from-gray-500 hover:to-gray-600 hover:shadow-xl hover:shadow-gray-500/25 hover:scale-105 focus:ring-4 focus:ring-gray-400/30 focus:outline-none active:scale-95"
              >
                <a href={paper.pdfUrl} download className="flex items-center gap-2">
                  <span className="text-lg">↓</span>
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

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
                : 'bg-[#1877F2] text-white hover:bg-[#1877F2] hover:scale-105'
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-semibold">Examples & Research</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Research & Datasets
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Explore cutting-edge research papers and experiment with curated datasets designed for machine learning
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-gray-800/50 rounded-2xl p-2 border border-white/10">
                <button
                  onClick={() => setActiveTab('datasets')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'datasets'
                      ? 'bg-[#1877F2] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Datasets
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('research')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'research'
                      ? 'bg-[#1877F2] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Research Papers
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'demo'
                      ? 'bg-[#1877F2] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Demo
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Datasets Tab */}
        {activeTab === 'datasets' && (
          <div className="px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
              {/* Filters and Controls */}
              <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex flex-wrap gap-4">
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

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Datasets Grid */}
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredDatasets.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Research Tab */}
        {activeTab === 'research' && (
          <div className="px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 lg:gap-12">
                {researchPapers.map((paper, index) => (
                  <ResearchCard key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
              {/* YouTube Demo Section */}
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Watch Refrax in Action</h2>
                  <p className="text-gray-400 text-lg">See how Refrax's powerful analytics tools work in practice</p>
                </div>
                
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                  <div className="aspect-video relative">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/J7e7Fx0Nu2A"
                      title="Refrax Platform Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Video overlay info */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md text-white text-sm font-semibold rounded-full border border-white/20">
                      <Video className="w-4 h-4" />
                      Demo Video
                    </div>
                  </div>
                </div>
              </div>

              {/* Refrax Photos Gallery */}
              <div className="mb-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Platform Screenshots</h2>
                  <p className="text-gray-400 text-lg">Explore the different features and capabilities of Refrax</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {refraxPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#1877F2]/20"
                    >
                      {/* Image */}
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-[#1877F2]/80 text-white text-xs font-semibold rounded">
                                {photo.category}
                              </span>
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-1">{photo.title}</h3>
                            <p className="text-gray-300 text-xs leading-relaxed">{photo.description}</p>
                          </div>
                        </div>
                        
                        {/* View button */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <a
                            href={photo.href}
                            className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:bg-[#1877F2] transition-colors"
                            title="View Feature"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold text-sm group-hover:text-blue-200 transition-colors">
                            {photo.title}
                          </h3>
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                            {photo.category}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                          {photo.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Try Refrax?</h3>
                  <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                    Start exploring our powerful analytics tools and see how they can transform your data analysis workflow.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="rounded-full bg-[#1877F2] hover:bg-[#1877F2] px-8 py-4"
                    >
                      <a href="/general">
                        <Play className="w-5 h-5 mr-2" />
                        Start Exploring
                      </a>
                    </Button>
                    <Button
                      asChild
                      className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4"
                    >
                      <a href="/learn">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Learn More
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started Section */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Ready to Start Your ML Journey?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">1. Download Datasets</h4>
                  <p className="text-gray-400 text-sm">Choose from our curated collection of research-backed datasets</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
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
