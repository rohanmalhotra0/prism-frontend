"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MachineLearningPage() {
  const mlTopics = [
    {
      title: "Random Forest",
      icon: "🌲",
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
      title: "Neural Networks",
      icon: "🧠",
      description: "Computational models inspired by biological neural networks, capable of learning complex patterns in financial data.",
      details: {
        howItWorks: "Neural networks consist of interconnected nodes (neurons) organized in layers that process information through weighted connections.",
        advantages: ["Can model non-linear relationships", "Handles large datasets well", "Adapts to new patterns", "Works with unstructured data"],
        useCases: ["Algorithmic trading", "Fraud detection", "Risk modeling", "Price forecasting"],
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
      title: "Support Vector Machines",
      icon: "•",
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
      title: "Linear Regression",
      icon: "•",
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
      title: "K-Means Clustering",
      icon: "•",
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
      title: "Gradient Boosting",
      icon: "•",
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
              Machine Learning
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master AI and machine learning techniques for financial data analysis, prediction, and automated decision-making
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="#algorithms">
                  Explore Algorithms
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
              >
                <Link href="#applications">
                  View Applications
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ML Algorithms Section */}
        <div id="algorithms" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🤖 Core ML Algorithms</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn the essential machine learning algorithms used in quantitative finance and their practical applications.
            </p>
          </div>

          <div className="space-y-8">
            {mlTopics.map((topic, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{topic.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg">{topic.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">How It Works</h4>
                        <p className="text-gray-300 text-sm mb-4">{topic.details.howItWorks}</p>
                        
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Advantages</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {topic.details.advantages.map((advantage, idx) => (
                            <li key={idx}>• {advantage}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Financial Use Cases</h4>
                        <ul className="text-gray-300 text-sm space-y-1 mb-4">
                          {topic.details.useCases.map((useCase, idx) => (
                            <li key={idx}>• {useCase}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-lg font-semibold text-yellow-400 mb-3">Code Example</h4>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                          <pre className="text-green-400 text-xs overflow-x-auto">
                            <code>{topic.details.codeExample}</code>
                          </pre>
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
            <h2 className="text-4xl font-bold text-white mb-4">💼 Financial Applications</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover how machine learning is transforming the financial industry across various domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">{app.title}</h3>
                <p className="text-gray-300 mb-4">{app.description}</p>
                
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
                  <p className="text-gray-300 text-sm">{app.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">• Learning Path</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">1</div>
                <h4 className="text-white font-semibold mb-2">Foundation</h4>
                <p className="text-gray-300 text-sm">Linear Regression, Basic Statistics</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-white font-semibold mb-2">Supervised Learning</h4>
                <p className="text-gray-300 text-sm">Random Forest, SVM, Neural Networks</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-white font-semibold mb-2">Unsupervised Learning</h4>
                <p className="text-gray-300 text-sm">Clustering, Dimensionality Reduction</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-white font-semibold mb-2">Advanced Topics</h4>
                <p className="text-gray-300 text-sm">Deep Learning, Reinforcement Learning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Libraries Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Essential Tools & Libraries</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-400 text-xs">Primary programming language</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Scikit-learn</h4>
                <p className="text-gray-400 text-xs">Classical ML algorithms</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="text-white font-semibold mb-1">TensorFlow</h4>
                <p className="text-gray-400 text-xs">Deep learning framework</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">PyTorch</h4>
                <p className="text-gray-400 text-xs">Dynamic neural networks</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">XGBoost</h4>
                <p className="text-gray-400 text-xs">Gradient boosting</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🔍</div>
                <h4 className="text-white font-semibold mb-1">Feature Tools</h4>
                <p className="text-gray-400 text-xs">Automated feature engineering</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">MLflow</h4>
                <p className="text-gray-400 text-xs">ML lifecycle management</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Optuna</h4>
                <p className="text-gray-400 text-xs">Hyperparameter optimization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your ML Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
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
