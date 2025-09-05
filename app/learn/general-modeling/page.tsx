"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GeneralModelingPage() {
  const modelingTopics = [
    {
      title: "Linear Regression",
      icon: "📈",
      description: "A fundamental statistical method that models the relationship between a dependent variable and one or more independent variables.",
      details: {
        howItWorks: "Finds the best straight line through data points by minimizing the sum of squared residuals between predicted and actual values.",
        keyComponents: ["Dependent Variable", "Independent Variables", "Coefficients", "R-squared", "P-values"],
        useCases: ["Risk factor analysis", "Price prediction", "Performance attribution", "Beta calculation"],
        codeExample: `import numpy as np
from sklearn.linear_model import LinearRegression
import pandas as pd

def linear_regression_analysis(data):
    """
    Perform linear regression analysis
    """
    # Prepare data
    X = data[['market_return', 'volatility', 'volume']]
    y = data['stock_return']
    
    # Fit model
    model = LinearRegression()
    model.fit(X, y)
    
    # Get results
    coefficients = model.coef_
    intercept = model.intercept_
    r_squared = model.score(X, y)
    
    # Make predictions
    predictions = model.predict(X)
    
    return {
        'coefficients': coefficients,
        'intercept': intercept,
        'r_squared': r_squared,
        'predictions': predictions
    }`
      }
    },
    {
      title: "Time Series Analysis",
      icon: "⏰",
      description: "Statistical methods for analyzing time-ordered data to identify patterns, trends, and make forecasts.",
      details: {
        howItWorks: "Decomposes time series into trend, seasonal, and random components, then models each component separately for forecasting.",
        keyComponents: ["Trend Analysis", "Seasonality", "Autocorrelation", "Stationarity", "Forecasting"],
        useCases: ["Stock price forecasting", "Economic indicators", "Sales forecasting", "Risk modeling"],
        codeExample: `import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.arima.model import ARIMA

def time_series_analysis(price_data):
    """
    Comprehensive time series analysis
    """
    # Decompose time series
    decomposition = seasonal_decompose(price_data, model='additive')
    
    # Check stationarity
    from statsmodels.tsa.stattools import adfuller
    adf_result = adfuller(price_data)
    
    # Fit ARIMA model
    model = ARIMA(price_data, order=(1,1,1))
    fitted_model = model.fit()
    
    # Make forecasts
    forecast = fitted_model.forecast(steps=30)
    
    return {
        'trend': decomposition.trend,
        'seasonal': decomposition.seasonal,
        'residual': decomposition.resid,
        'adf_pvalue': adf_result[1],
        'forecast': forecast
    }`
      }
    },
    {
      title: "Monte Carlo Simulation",
      icon: "🎲",
      description: "A computational method that uses random sampling to model uncertainty and assess risk in complex systems.",
      details: {
        howItWorks: "Runs thousands of simulations with random inputs following specified probability distributions to generate outcome distributions.",
        keyComponents: ["Random Variables", "Probability Distributions", "Simulation Runs", "Risk Metrics", "Confidence Intervals"],
        useCases: ["Portfolio optimization", "Risk assessment", "Project evaluation", "Stress testing"],
        codeExample: `import numpy as np
import matplotlib.pyplot as plt

def monte_carlo_portfolio(returns, weights, n_simulations=10000):
    """
    Monte Carlo simulation for portfolio returns
    """
    # Calculate portfolio statistics
    portfolio_return = np.dot(weights, returns.mean())
    portfolio_vol = np.sqrt(np.dot(weights.T, np.dot(returns.cov(), weights)))
    
    # Generate random scenarios
    scenarios = np.random.normal(portfolio_return, portfolio_vol, n_simulations)
    
    # Calculate risk metrics
    var_95 = np.percentile(scenarios, 5)
    var_99 = np.percentile(scenarios, 1)
    expected_shortfall = scenarios[scenarios <= var_95].mean()
    
    return {
        'scenarios': scenarios,
        'var_95': var_95,
        'var_99': var_99,
        'expected_shortfall': expected_shortfall,
        'mean_return': portfolio_return,
        'volatility': portfolio_vol
    }`
      }
    },
    {
      title: "Logistic Regression",
      icon: "📊",
      description: "A statistical method for modeling binary outcomes using a logistic function to estimate probabilities.",
      details: {
        howItWorks: "Uses the logistic function to model the probability of a binary outcome, with coefficients representing log-odds ratios.",
        keyComponents: ["Binary Outcome", "Logistic Function", "Odds Ratios", "Maximum Likelihood", "Classification"],
        useCases: ["Credit scoring", "Default prediction", "Market classification", "Risk assessment"],
        codeExample: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

def logistic_regression_model(X, y):
    """
    Build logistic regression model for binary classification
    """
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Fit model
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Evaluate model
    auc_score = roc_auc_score(y_test, y_pred_proba)
    classification_rep = classification_report(y_test, y_pred)
    
    return {
        'model': model,
        'predictions': y_pred,
        'probabilities': y_pred_proba,
        'auc_score': auc_score,
        'classification_report': classification_rep
    }`
      }
    },
    {
      title: "Clustering Analysis",
      icon: "🎪",
      description: "An unsupervised learning technique that groups similar data points together based on their characteristics.",
      details: {
        howItWorks: "Groups data points into clusters by minimizing within-cluster variance and maximizing between-cluster separation.",
        keyComponents: ["Distance Metrics", "Cluster Centers", "K-means", "Hierarchical", "Silhouette Analysis"],
        useCases: ["Customer segmentation", "Portfolio clustering", "Market regime identification", "Risk grouping"],
        codeExample: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

def clustering_analysis(data, max_clusters=10):
    """
    Perform clustering analysis with optimal cluster selection
    """
    # Standardize data
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)
    
    # Find optimal number of clusters
    inertias = []
    silhouette_scores = []
    
    for k in range(2, max_clusters + 1):
        kmeans = KMeans(n_clusters=k, random_state=42)
        cluster_labels = kmeans.fit_predict(data_scaled)
        
        inertias.append(kmeans.inertia_)
        silhouette_scores.append(silhouette_score(data_scaled, cluster_labels))
    
    # Choose optimal k
    optimal_k = silhouette_scores.index(max(silhouette_scores)) + 2
    
    # Final clustering
    final_kmeans = KMeans(n_clusters=optimal_k, random_state=42)
    final_labels = final_kmeans.fit_predict(data_scaled)
    
    return {
        'optimal_k': optimal_k,
        'cluster_labels': final_labels,
        'inertias': inertias,
        'silhouette_scores': silhouette_scores
    }`
      }
    },
    {
      title: "Principal Component Analysis (PCA)",
      icon: "🔍",
      description: "A dimensionality reduction technique that transforms data into a lower-dimensional space while preserving maximum variance.",
      details: {
        howItWorks: "Finds orthogonal directions of maximum variance in the data and projects the data onto these principal components.",
        keyComponents: ["Eigenvalues", "Eigenvectors", "Variance Explained", "Component Loadings", "Dimensionality Reduction"],
        useCases: ["Risk factor analysis", "Data compression", "Noise reduction", "Feature extraction"],
        codeExample: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

def pca_analysis(data, n_components=None):
    """
    Perform Principal Component Analysis
    """
    # Standardize data
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)
    
    # Fit PCA
    pca = PCA(n_components=n_components)
    pca_result = pca.fit_transform(data_scaled)
    
    # Calculate explained variance
    explained_variance_ratio = pca.explained_variance_ratio_
    cumulative_variance = np.cumsum(explained_variance_ratio)
    
    # Get component loadings
    components = pca.components_
    
    return {
        'transformed_data': pca_result,
        'explained_variance_ratio': explained_variance_ratio,
        'cumulative_variance': cumulative_variance,
        'components': components,
        'n_components': pca.n_components_
    }`
      }
    }
  ];

  const applications = [
    {
      title: "Risk Management",
      description: "Build models to assess and quantify various types of financial risks using statistical techniques.",
      tools: ["Monte Carlo", "Logistic Regression", "Time Series", "PCA"],
      example: "Use Monte Carlo simulation to assess portfolio Value-at-Risk under different market scenarios."
    },
    {
      title: "Portfolio Management",
      description: "Develop models for portfolio optimization, asset allocation, and performance attribution.",
      tools: ["Linear Regression", "Clustering", "PCA", "Time Series"],
      example: "Apply clustering analysis to group similar assets and optimize portfolio diversification."
    },
    {
      title: "Credit Analysis",
      description: "Create models to assess creditworthiness and predict default probabilities.",
      tools: ["Logistic Regression", "Time Series", "Monte Carlo", "Clustering"],
      example: "Build a logistic regression model to predict corporate default probability using financial ratios."
    },
    {
      title: "Market Research",
      description: "Analyze market data to identify patterns, trends, and investment opportunities.",
      tools: ["Time Series", "Linear Regression", "Clustering", "PCA"],
      example: "Use time series analysis to forecast commodity prices and identify trading opportunities."
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
              General Modeling
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master statistical modeling techniques for data analysis, forecasting, and quantitative research
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="#models">
                  Explore Models
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

        {/* Modeling Techniques Section */}
        <div id="models" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">🔬 Core Modeling Techniques</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn essential statistical and mathematical modeling methods used in quantitative finance and data analysis.
            </p>
          </div>

          <div className="space-y-8">
            {modelingTopics.map((topic, index) => (
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
                        
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Key Components</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {topic.details.keyComponents.map((component, idx) => (
                            <li key={idx}>• {component}</li>
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
            <h2 className="text-4xl font-bold text-white mb-4">💼 Professional Applications</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover how statistical modeling techniques are applied across different areas of finance and business.
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
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🎯 Learning Path</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="text-white font-semibold mb-2">Statistics Basics</h4>
                <p className="text-gray-300 text-sm">Descriptive statistics, distributions</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="text-white font-semibold mb-2">Linear Models</h4>
                <p className="text-gray-300 text-sm">Regression, correlation analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="text-white font-semibold mb-2">Advanced Techniques</h4>
                <p className="text-gray-300 text-sm">Time series, clustering, PCA</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4️⃣</div>
                <h4 className="text-white font-semibold mb-2">Simulation</h4>
                <p className="text-gray-300 text-sm">Monte Carlo, risk modeling</p>
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
                <h4 className="text-white font-semibold mb-1">Pandas</h4>
                <p className="text-gray-400 text-xs">Data manipulation</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🔢</div>
                <h4 className="text-white font-semibold mb-1">NumPy</h4>
                <p className="text-gray-400 text-xs">Numerical computing</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="text-white font-semibold mb-1">SciPy</h4>
                <p className="text-gray-400 text-xs">Scientific computing</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Statsmodels</h4>
                <p className="text-gray-400 text-xs">Statistical modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="text-white font-semibold mb-1">Scikit-learn</h4>
                <p className="text-gray-400 text-xs">Machine learning</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Matplotlib</h4>
                <p className="text-gray-400 text-xs">Data visualization</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="text-white font-semibold mb-1">Seaborn</h4>
                <p className="text-gray-400 text-xs">Statistical plots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Statistical Modeling?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Build a strong foundation in statistical modeling techniques that are essential for quantitative finance and data analysis.
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
