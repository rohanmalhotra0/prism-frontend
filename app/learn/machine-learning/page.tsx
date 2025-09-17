"use client";

import { useState } from 'react';
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { 
  TreePine, 
  Brain, 
  BarChart3, 
  Target, 
  Zap, 
  Database,
  TrendingUp,
  PieChart,
  Code,
  Cpu,
  Layers,
  GitBranch,
  Search,
  Settings,
  FileText,
  BookOpen,
  GraduationCap,
  ArrowRight
} from "lucide-react";

export default function MachineLearningPage() {
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const setActiveTab = (topicId: string, tab: string) => {
    setActiveTabs(prev => ({ ...prev, [topicId]: tab }));
  };

  const mlTopics = [
    {
      id: "random-forest",
      title: "Random Forest",
      icon: TreePine,
      description: "An ensemble learning method that combines multiple decision trees to make more accurate predictions.",
      details: {
        howItWorks: "Random Forest creates multiple decision trees using random subsets of data and features, then averages their predictions.",
        advantages: ["Reduces overfitting", "Handles missing values well", "Works with both classification and regression", "Provides feature importance"],
        useCases: ["Stock price prediction", "Credit risk assessment", "Market sentiment analysis", "Portfolio optimization"],
        codeExample: `from sklearn.ensemble import RandomForestRegressor
import pandas as pd

# Load financial data
df = pd.read_csv('stock_data.csv')

# Prepare features and target
X = df[['volume', 'volatility', 'rsi', 'macd']]
y = df['price_change']

# Train Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X, y)

# Make predictions
predictions = rf.predict(X_test)`
      }
    },
    {
      id: "neural-networks",
      title: "Neural Networks",
      icon: Brain,
      description: "Computational models inspired by biological neural networks, capable of learning complex patterns in financial data.",
      details: {
        howItWorks: "Neural networks consist of interconnected nodes (neurons) organized in layers that process information through weighted connections.",
        advantages: ["Can model non-linear relationships", "Handles large datasets well", "Adapts to new patterns", "Works with unstructured data"],
        useCases: ["Algorithmic trading", "Fraud detection", "Risk modeling", "Price forecasting"],
        formulas: {
          neuron_output: "y = f\\left(\\sum_{i=1}^{n} w_i x_i + b\\right)",
          sigmoid: "\\sigma(x) = \\frac{1}{1 + e^{-x}}",
          relu: "\\text{ReLU}(x) = \\max(0, x)",
          backpropagation: "\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}",
          gradient_descent: "w_{new} = w_{old} - \\alpha \\nabla L(w)"
        },
        codeExample: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout

# Create neural network
model = Sequential([
    Dense(128, activation='relu', input_shape=(10,)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dense(1, activation='linear')
])

# Compile and train
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
model.fit(X_train, y_train, epochs=100, validation_split=0.2)`
      }
    },
    {
      id: "svm",
      title: "Support Vector Machines",
      icon: Target,
      description: "A powerful classification and regression algorithm that finds optimal decision boundaries in high-dimensional space.",
      details: {
        howItWorks: "SVM finds the best hyperplane that separates different classes with maximum margin, using kernel functions for non-linear data.",
        advantages: ["Effective in high dimensions", "Memory efficient", "Versatile with different kernels", "Works well with small datasets"],
        useCases: ["Credit scoring", "Market regime classification", "Anomaly detection", "Binary trading signals"],
        codeExample: `from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train SVM
svm = SVR(kernel='rbf', C=1.0, gamma='scale')
svm.fit(X_scaled, y)

# Make predictions
predictions = svm.predict(X_test_scaled)`
      }
    },
    {
      id: "linear-regression",
      title: "Linear Regression",
      icon: BarChart3,
      description: "A fundamental statistical method that models the relationship between dependent and independent variables.",
      details: {
        howItWorks: "Finds the best straight line through data points by minimizing the sum of squared residuals between predicted and actual values.",
        advantages: ["Simple to understand", "Fast computation", "No hyperparameters", "Provides interpretable coefficients"],
        useCases: ["Beta calculation", "Risk factor modeling", "Price prediction", "Performance attribution"],
        codeExample: `from sklearn.linear_model import LinearRegression
import numpy as np

# Prepare data
X = np.array([[1, 2], [2, 3], [3, 4], [4, 5]])
y = np.array([2, 4, 6, 8])

# Train model
lr = LinearRegression()
lr.fit(X, y)

# Make predictions
predictions = lr.predict(X_test)
print(f"Coefficients: {lr.coef_}")
print(f"R-squared: {lr.score(X, y)}")`
      }
    },
    {
      id: "k-means",
      title: "K-Means Clustering",
      icon: PieChart,
      description: "An unsupervised learning algorithm that groups similar data points into clusters based on feature similarity.",
      details: {
        howItWorks: "K-means iteratively assigns data points to the nearest cluster center and updates cluster centers based on assigned points.",
        advantages: ["Simple and fast", "Works with any distance metric", "Scales to large datasets", "Easy to interpret results"],
        useCases: ["Customer segmentation", "Portfolio clustering", "Market regime identification", "Risk grouping"],
        codeExample: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Prepare data
X = df[['returns', 'volatility', 'volume']]

# Find optimal number of clusters
inertias = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

# Train with optimal k
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)`
      }
    },
    {
      id: "gradient-boosting",
      title: "Gradient Boosting",
      icon: TrendingUp,
      description: "An ensemble method that builds models sequentially, with each new model correcting errors of previous models.",
      details: {
        howItWorks: "Gradient boosting trains models sequentially, where each new model focuses on the mistakes made by previous models.",
        advantages: ["High predictive accuracy", "Handles different data types", "Feature importance", "Robust to outliers"],
        useCases: ["Credit risk modeling", "High-frequency trading", "Market prediction", "Portfolio optimization"],
        codeExample: `from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score

# Train gradient boosting
gb = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

gb.fit(X_train, y_train)

# Cross-validation
scores = cross_val_score(gb, X, y, cv=5)
print(f"Mean CV Score: {scores.mean():.4f}")`
      }
    }
  ];

  const applications = [
    {
      title: "Algorithmic Trading",
      description: "Use ML to develop automated trading strategies based on market patterns and signals.",
      tools: ["Random Forest", "Neural Networks", "SVM"],
      example: "Predict stock price movements using technical indicators and market sentiment data."
    },
    {
      title: "Risk Management",
      description: "Assess and predict various types of financial risks using machine learning models.",
      tools: ["Logistic Regression", "Random Forest", "Neural Networks"],
      example: "Build credit scoring models to assess borrower default probability."
    },
    {
      title: "Portfolio Optimization",
      description: "Optimize investment portfolios using ML to find optimal asset allocations.",
      tools: ["Clustering", "Reinforcement Learning", "Genetic Algorithms"],
      example: "Use clustering to group similar assets and optimize portfolio diversification."
    },
    {
      title: "Sentiment Analysis",
      description: "Analyze market sentiment from news, social media, and other text sources.",
      tools: ["NLP", "Neural Networks", "Naive Bayes"],
      example: "Analyze Twitter sentiment to predict market movements and volatility."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-indigo-900/10 pointer-events-none z-5"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Machine Learning
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
              Master AI and machine learning techniques for financial data analysis, prediction, and automated decision-making
            </p>
          </div>
        </div>

        {/* ML Algorithms Section */}
        <div id="algorithms" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">

          <div className="space-y-8">
            {mlTopics.map((topic, index) => (
              <div key={index} className="bg-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{topic.title}</h3>
                    <p className="text-gray-200 mb-6 text-lg">{topic.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">How It Works</h4>
                        <p className="text-gray-200 text-sm mb-4">{topic.details.howItWorks}</p>
                        
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Advantages</h4>
                        <ul className="text-gray-200 text-sm space-y-1">
                          {topic.details.advantages.map((advantage, idx) => (
                            <li key={idx}>• {advantage}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Financial Use Cases</h4>
                        <ul className="text-gray-200 text-sm space-y-1">
                          {topic.details.useCases.map((useCase, idx) => (
                            <li key={idx}>• {useCase}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="bg-gray-900/30 rounded-lg border border-gray-700 overflow-hidden">
                          {/* Tab Headers */}
                          <div className="flex border-b border-gray-700">
                            {topic.details.formulas && (
                              <button
                                onClick={() => setActiveTab(topic.id, 'formulas')}
                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                  activeTabs[topic.id] === 'formulas' || (!activeTabs[topic.id] && topic.details.formulas)
                                    ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400'
                                    : 'text-gray-200 hover:text-gray-200 hover:bg-gray-800/50'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  Math Formulas
                                </div>
                              </button>
                            )}
                            <button
                              onClick={() => setActiveTab(topic.id, 'code')}
                              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTabs[topic.id] === 'code' || (!activeTabs[topic.id] && !topic.details.formulas)
                                  ? 'bg-yellow-500/20 text-yellow-400 border-b-2 border-yellow-400'
                                  : 'text-gray-200 hover:text-gray-200 hover:bg-gray-800/50'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                Code Example
                              </div>
                            </button>
                          </div>

                          {/* Tab Content */}
                          <div className="p-6">
                            {(activeTabs[topic.id] === 'formulas' || (!activeTabs[topic.id] && topic.details.formulas)) && topic.details.formulas && (
                              <div className="space-y-6">
                                {Object.entries(topic.details.formulas).map(([key, formula]) => (
                                  <div key={key} className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                                    <div className="text-gray-200 text-lg mb-4 font-semibold capitalize">
                                      {key.replace(/_/g, ' ')}:
                                    </div>
                                    <div className="bg-gray-900/50 rounded-md p-4 border border-gray-700">
                                      <div className="text-center">
                                        <BlockMath math={formula} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {(activeTabs[topic.id] === 'code' || (!activeTabs[topic.id] && !topic.details.formulas)) && (
                              <div className="bg-gray-800/50 rounded-lg border border-gray-600">
                                <div className="bg-gray-700/50 px-4 py-3 border-b border-gray-600 rounded-t-lg">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-200 text-sm ml-2 font-medium">Python</span>
                                  </div>
                                </div>
                                <div className="p-6">
                                  <pre className="text-green-400 text-sm overflow-x-auto leading-relaxed">
                                    <code>{topic.details.codeExample}</code>
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div id="applications" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="w-10 h-10 text-blue-400" />
              Financial Applications
            </h2>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto">
              Discover how machine learning is transforming the financial industry across various domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{app.title}</h3>
                <p className="text-gray-200 mb-4">{app.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Common Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                  <h4 className="text-sm font-semibold text-green-400 mb-1">Example</h4>
                  <p className="text-gray-200 text-sm">{app.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-purple-400" />
              Learning Path
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Foundation</h4>
                <p className="text-gray-200 text-sm">Linear Regression, Basic Statistics</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Supervised Learning</h4>
                <p className="text-gray-200 text-sm">Random Forest, SVM, Neural Networks</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Unsupervised Learning</h4>
                <p className="text-gray-200 text-sm">Clustering, Dimensionality Reduction</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Advanced Topics</h4>
                <p className="text-gray-200 text-sm">Deep Learning, Reinforcement Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Libraries Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <Settings className="w-8 h-8 text-orange-400" />
              Essential Tools & Libraries
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-200 text-xs">Primary programming language</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Scikit-learn</h4>
                <p className="text-gray-200 text-xs">Classical ML algorithms</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">TensorFlow</h4>
                <p className="text-gray-200 text-xs">Deep learning framework</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">PyTorch</h4>
                <p className="text-gray-200 text-xs">Dynamic neural networks</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">XGBoost</h4>
                <p className="text-gray-200 text-xs">Gradient boosting</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Feature Tools</h4>
                <p className="text-gray-200 text-xs">Automated feature engineering</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">MLflow</h4>
                <p className="text-gray-200 text-xs">ML lifecycle management</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Optuna</h4>
                <p className="text-gray-200 text-xs">Hyperparameter optimization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Examples Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Code className="w-10 h-10 text-green-400" />
              Practical Examples
            </h2>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto">
              Real-world machine learning projects and case studies in quantitative finance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Stock Price Prediction</h3>
              </div>
              <p className="text-gray-200 mb-4">
                Build a machine learning model to predict stock prices using historical data, technical indicators, and market sentiment.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>LSTM neural networks for time series</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Feature engineering with technical indicators</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Sentiment analysis from news data</span>
                </div>
              </div>
            </div>

            <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Credit Risk Assessment</h3>
              </div>
              <p className="text-gray-200 mb-4">
                Develop a credit scoring model using machine learning to assess the risk of loan defaults and optimize lending decisions.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Random Forest for feature importance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Logistic regression for interpretability</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Model validation and backtesting</span>
                </div>
              </div>
            </div>

            <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Portfolio Optimization</h3>
              </div>
              <p className="text-gray-200 mb-4">
                Use clustering algorithms and reinforcement learning to optimize portfolio allocation and maximize risk-adjusted returns.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>K-means clustering for asset grouping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Reinforcement learning for trading strategies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Risk factor modeling and attribution</span>
                </div>
              </div>
            </div>

            <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Fraud Detection</h3>
              </div>
              <p className="text-gray-200 mb-4">
                Implement anomaly detection algorithms to identify fraudulent transactions and suspicious trading activities in real-time.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Isolation Forest for anomaly detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Autoencoders for pattern recognition</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <ArrowRight className="w-4 h-4" />
                  <span>Real-time monitoring and alerting</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Paths Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              Career Paths in ML Finance
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/2 rounded-xl p-6 border border-white/5 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2 text-lg">Quantitative Researcher</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Develop and test machine learning models for trading strategies, risk management, and market analysis.
                </p>
                <div className="text-xs text-blue-400">
                  <div>• PhD in Quantitative Finance</div>
                  <div>• Strong programming skills</div>
                  <div>• $150k - $300k+</div>
                </div>
              </div>
              <div className="bg-white/2 rounded-xl p-6 border border-white/5 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2 text-lg">ML Engineer</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Build and deploy machine learning systems for financial applications, focusing on scalability and reliability.
                </p>
                <div className="text-xs text-green-400">
                  <div>• Computer Science background</div>
                  <div>• MLOps expertise</div>
                  <div>• $120k - $250k+</div>
                </div>
              </div>
              <div className="bg-white/2 rounded-xl p-6 border border-white/5 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2 text-lg">Data Scientist</h4>
                <p className="text-gray-200 text-sm mb-4">
                  Analyze financial data, build predictive models, and provide insights to support business decisions.
                </p>
                <div className="text-xs text-purple-400">
                  <div>• Statistics/Mathematics degree</div>
                  <div>• Strong analytical skills</div>
                  <div>• $100k - $200k+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your ML Journey?</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Begin with the fundamentals and work your way up to advanced machine learning techniques for financial applications.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              <Link href="/learn/statistics-probability">
                Start with Statistics
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
            >
              <Link href="/learn">
                Back to Learn
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
