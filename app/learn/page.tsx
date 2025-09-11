"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  FlaskConical, 
  Sigma, 
  Shield, 
  Bitcoin, 
  BarChart3, 
  Brain,
  Calculator,
  PieChart,
  Target,
  Zap,
  Database
} from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export const CATEGORIES = [
  { 
    name: "Financial Modeling", 
    slug: "financial-modeling", 
    description: "Learn about DCF models, valuation techniques, and financial forecasting methods.",
    icon: TrendingUp,
    topics: ["DCF Models", "Valuation", "Forecasting", "Financial Statements"],
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    formula: "DCF = \\sum_{t=1}^{n} \\frac{CF_t}{(1+r)^t} + \\frac{TV}{(1+r)^n}",
    formulaDescription: "Discounted Cash Flow Valuation"
  },
  { 
    name: "General Modeling", 
    slug: "general-modeling", 
    description: "Explore regression analysis, time series, and statistical modeling techniques.",
    icon: FlaskConical,
    topics: ["Regression", "Time Series", "Monte Carlo", "Simulation"],
    difficulty: "Beginner",
    duration: "3-4 weeks",
    formula: "y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\cdots + \\beta_n x_n + \\epsilon",
    formulaDescription: "Multiple Linear Regression"
  },
  { 
    name: "Options & Derivatives", 
    slug: "options-derivatives", 
    description: "Master Black-Scholes, binomial models, and options pricing strategies.",
    icon: Sigma,
    topics: ["Black-Scholes", "Binomial Models", "Greeks", "Volatility"],
    difficulty: "Advanced",
    duration: "6-8 weeks",
    formula: "C = S_0 N(d_1) - Ke^{-rT} N(d_2)",
    formulaDescription: "Black-Scholes Option Pricing"
  },
  { 
    name: "Insurance Risk Analysis", 
    slug: "insurance-risk-analysis", 
    description: "Understand actuarial science, risk assessment, and insurance mathematics.",
    icon: Shield,
    topics: ["Actuarial Science", "Risk Assessment", "Pricing Models", "Reserves"],
    difficulty: "Advanced",
    duration: "8-10 weeks",
    formula: "P = \\frac{E[X] + \\lambda \\cdot \\sigma_X}{1 + r}",
    formulaDescription: "Insurance Premium Pricing"
  },
  { 
    name: "Crypto Modeling", 
    slug: "crypto-modeling", 
    description: "Dive into blockchain analysis, DeFi protocols, and cryptocurrency valuation.",
    icon: Bitcoin,
    topics: ["Blockchain", "DeFi", "Tokenomics", "Market Analysis"],
    difficulty: "Intermediate",
    duration: "5-7 weeks",
    formula: "TVL = \\sum_{i=1}^{n} A_i \\cdot P_i",
    formulaDescription: "Total Value Locked in DeFi"
  },
  { 
    name: "Statistics & Probability", 
    slug: "statistics-probability", 
    description: "Build foundations in probability theory, distributions, and statistical inference.",
    icon: BarChart3,
    topics: ["Probability", "Distributions", "Hypothesis Testing", "Bayesian"],
    difficulty: "Beginner",
    duration: "4-5 weeks",
    formula: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}",
    formulaDescription: "Bayes' Theorem"
  },
  { 
    name: "Machine Learning", 
    slug: "machine-learning", 
    description: "Apply AI and ML techniques to financial data analysis and prediction.",
    icon: Brain,
    topics: ["Neural Networks", "Random Forest", "Sentiment Analysis", "Prediction"],
    difficulty: "Advanced",
    duration: "6-8 weeks",
    formula: "\\hat{y} = \\sigma(W^T x + b)",
    formulaDescription: "Neural Network Activation"
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Learn
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Master the foundations of quantitative finance, modeling techniques, and data analysis
            </p>
            
            {/* Mathematical Introduction */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 max-w-6xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Mathematical Foundations</h2>
              <div className="space-y-6">
                {/* Core Mathematical Concepts */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4 text-center">Core Mathematical Concepts</h3>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Probability Union Rule</h4>
                          <p className="text-gray-300 text-sm">Fundamental rule for calculating the probability of the union of two events, accounting for their intersection.</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: Risk assessment, portfolio diversification</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="PV = \frac{FV}{(1 + r)^t}" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Present Value Formula</h4>
                          <p className="text-gray-300 text-sm">Calculates the current worth of a future cash flow, accounting for the time value of money.</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: DCF valuation, bond pricing, investment analysis</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="E[R] = \sum_{i=1}^{n} p_i \cdot R_i" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Expected Return</h4>
                          <p className="text-gray-300 text-sm">Weighted average of possible returns, where weights are the probabilities of occurrence.</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: Portfolio optimization, risk management</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="dS_t = \mu S_t dt + \sigma S_t dW_t" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Geometric Brownian Motion</h4>
                          <p className="text-gray-300 text-sm">Stochastic differential equation modeling asset price movements with drift and volatility.</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: Black-Scholes model, Monte Carlo simulation</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="\min_w \frac{1}{2}w^T \Sigma w - \lambda \mu^T w" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Portfolio Optimization</h4>
                          <p className="text-gray-300 text-sm">Mean-variance optimization balancing risk (variance) and return (expected value).</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: Modern portfolio theory, asset allocation</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex-shrink-0 min-w-[200px]">
                          <BlockMath math="\hat{y} = \sigma(W^T x + b)" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">Neural Network Activation</h4>
                          <p className="text-gray-300 text-sm">Non-linear transformation in neural networks for learning complex patterns.</p>
                          <div className="mt-2 text-xs text-gray-400">Used in: Deep learning, algorithmic trading</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="space-y-8">
              {CATEGORIES.map((cat, idx) => {
                const difficultyColor = cat.difficulty === "Beginner" ? "text-green-400" : 
                                      cat.difficulty === "Intermediate" ? "text-yellow-400" : "text-red-400";
                return (
                  <div key={cat.slug} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <Link href={`/learn/${cat.slug}`} className="block group">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Math Formula */}
                        <div className="lg:w-1/3 flex-shrink-0">
                          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700">
                            <div className="text-center mb-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <cat.icon className="w-8 h-8 text-white" />
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2">{cat.name}</h3>
                              <div className="flex items-center justify-center gap-2">
                                <span className={`text-xs font-medium ${difficultyColor}`}>
                                  {cat.difficulty}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-xs text-gray-400">{cat.duration}</span>
                              </div>
                            </div>
                            <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-600">
                              <div className="text-gray-400 text-xs mb-3 font-medium text-center">
                                {cat.formulaDescription}
                              </div>
                              <div className="text-center">
                                <BlockMath math={cat.formula} />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Side - Content */}
                        <div className="lg:w-2/3 flex-1">
                          <div className="h-full flex flex-col justify-between">
                            <div>
                              <p className="text-gray-300 text-base leading-relaxed mb-6">
                                {cat.description}
                              </p>
                              
                              <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Key Topics Covered:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {cat.topics.map((topic, topicIdx) => (
                                    <span key={topicIdx} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                              <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                                Start Learning →
                              </div>
                              <div className="text-xs text-gray-400">
                                {cat.difficulty} Level • {cat.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mathematical Learning Path */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Mathematical Learning Path</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-lg">Foundation Level</h4>
                      <p className="text-gray-300 text-sm mb-4">Master basic mathematics and statistics fundamentals</p>
                      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700 mb-3">
                        <div className="text-gray-400 text-xs mb-2 font-medium">Expected Value:</div>
                        <BlockMath math="E[X] = \sum_{i=1}^{n} x_i \cdot P(x_i)" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Topics: Probability, Statistics, Basic Calculus, Linear Algebra
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-lg">Modeling Level</h4>
                      <p className="text-gray-300 text-sm mb-4">Apply mathematical concepts to financial modeling</p>
                      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700 mb-3">
                        <div className="text-gray-400 text-xs mb-2 font-medium">DCF Valuation:</div>
                        <BlockMath math="V = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} + \frac{TV}{(1+r)^n}" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Topics: DCF Models, Regression Analysis, Time Series, Monte Carlo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sigma className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-lg">Derivatives Level</h4>
                      <p className="text-gray-300 text-sm mb-4">Master options pricing and derivatives mathematics</p>
                      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700 mb-3">
                        <div className="text-gray-400 text-xs mb-2 font-medium">Black-Scholes Model:</div>
                        <BlockMath math="C = S_0 N(d_1) - Ke^{-rT} N(d_2)" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Topics: Black-Scholes, Greeks, Volatility Models, Risk Management
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-lg">AI/ML Level</h4>
                      <p className="text-gray-300 text-sm mb-4">Apply machine learning to financial data analysis</p>
                      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700 mb-3">
                        <div className="text-gray-400 text-xs mb-2 font-medium">Neural Network:</div>
                        <BlockMath math="\hat{y} = \sigma(W^T x + b)" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Topics: Neural Networks, Deep Learning, Algorithmic Trading, Sentiment Analysis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students and professionals who are mastering quantitative finance with our comprehensive learning platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="/learn/statistics-probability">
                  Start with Basics
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="/research">
                  View Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
