"use client";

import { useState } from 'react';
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function StatisticsProbabilityPage() {
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const setActiveTab = (topicId: string, tab: string) => {
    setActiveTabs(prev => ({ ...prev, [topicId]: tab }));
  };

  const statsTopics = [
    {
      id: "probability-distributions",
      title: "Probability Distributions",
      icon: "•",
      description: "Mathematical functions that describe the likelihood of different outcomes in random experiments.",
      details: {
        howItWorks: "Distributions characterize the behavior of random variables through probability density functions and cumulative distribution functions.",
        keyComponents: ["Normal Distribution", "Binomial Distribution", "Poisson Distribution", "Exponential Distribution", "Student's t-distribution"],
        useCases: ["Risk modeling", "Portfolio optimization", "Credit scoring", "Market analysis"],
        formulas: {
          normal: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
          binomial: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}",
          poisson: "P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
          exponential: "f(x) = \\lambda e^{-\\lambda x} \\text{ for } x \\geq 0",
          t_distribution: "f(t) = \\frac{\\Gamma\\left(\\frac{\\nu+1}{2}\\right)}{\\sqrt{\\nu\\pi}\\Gamma\\left(\\frac{\\nu}{2}\\right)}\\left(1+\\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}"
        },
        codeExample: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

def analyze_distributions(data):
    """
    Analyze different probability distributions
    """
    # Normal distribution
    mu, sigma = stats.norm.fit(data)
    normal_pdf = stats.norm.pdf(data, mu, sigma)
    
    # Student's t-distribution
    df, loc, scale = stats.t.fit(data)
    t_pdf = stats.t.pdf(data, df, loc, scale)
    
    # Exponential distribution
    lambda_param = stats.expon.fit(data)[0]
    exp_pdf = stats.expon.pdf(data, lambda_param)
    
    # Goodness of fit tests
    ks_normal = stats.kstest(data, 'norm', args=(mu, sigma))
    ks_t = stats.kstest(data, 't', args=(df, loc, scale))
    
    return {
        'normal': {'params': (mu, sigma), 'ks_stat': ks_normal.statistic},
        't_dist': {'params': (df, loc, scale), 'ks_stat': ks_t.statistic},
        'exponential': {'params': lambda_param}
    }`
      }
    },
    {
      id: "hypothesis-testing",
      title: "Hypothesis Testing",
      icon: "•",
      description: "Statistical methods for making decisions about population parameters based on sample data.",
      details: {
        howItWorks: "Formulates null and alternative hypotheses, calculates test statistics, and determines statistical significance using p-values.",
        keyComponents: ["Null Hypothesis", "Alternative Hypothesis", "Test Statistics", "P-values", "Type I/II Errors"],
        useCases: ["A/B testing", "Model validation", "Risk assessment", "Performance evaluation"],
        formulas: {
          t_test: "t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}",
          chi_square: "\\chi^2 = \\sum_{i=1}^{n} \\frac{(O_i - E_i)^2}{E_i}",
          p_value: "p = P(T \\geq |t_{obs}| | H_0 \\text{ is true})",
          confidence_interval: "CI = \\bar{x} \\pm t_{\\alpha/2, n-1} \\cdot \\frac{s}{\\sqrt{n}}"
        },
        codeExample: `from scipy import stats
import numpy as np

def hypothesis_tests(sample1, sample2, alpha=0.05):
    """
    Perform various hypothesis tests
    """
    # One-sample t-test
    t_stat, p_value = stats.ttest_1samp(sample1, 0)
    
    # Two-sample t-test
    t_stat_2, p_value_2 = stats.ttest_ind(sample1, sample2)
    
    # Paired t-test
    t_stat_paired, p_value_paired = stats.ttest_rel(sample1, sample2)
    
    # Chi-square test
    chi2_stat, chi2_p_value = stats.chisquare(sample1)
    
    # Kolmogorov-Smirnov test
    ks_stat, ks_p_value = stats.kstest(sample1, 'norm')
    
    # Results interpretation
    results = {
        'one_sample_t': {'statistic': t_stat, 'p_value': p_value, 'significant': p_value < alpha},
        'two_sample_t': {'statistic': t_stat_2, 'p_value': p_value_2, 'significant': p_value_2 < alpha},
        'paired_t': {'statistic': t_stat_paired, 'p_value': p_value_paired, 'significant': p_value_paired < alpha},
        'chi_square': {'statistic': chi2_stat, 'p_value': chi2_p_value, 'significant': chi2_p_value < alpha},
        'ks_test': {'statistic': ks_stat, 'p_value': ks_p_value, 'significant': ks_p_value < alpha}
    }
    
    return results`
      }
    },
    {
      id: "bayesian",
      title: "Bayesian Statistics",
      icon: "•",
      description: "A statistical approach that updates probability estimates as new evidence becomes available.",
      details: {
        howItWorks: "Uses Bayes' theorem to update prior beliefs with observed data, resulting in posterior probability distributions.",
        keyComponents: ["Prior Distribution", "Likelihood Function", "Posterior Distribution", "Bayes' Theorem", "Markov Chain Monte Carlo"],
        useCases: ["Risk assessment", "Portfolio optimization", "Model uncertainty", "Parameter estimation"],
        formulas: {
          bayes_theorem: "P(\\theta|D) = \\frac{P(D|\\theta) \\cdot P(\\theta)}{P(D)}",
          posterior: "\\text{Posterior} \\propto \\text{Likelihood} \\times \\text{Prior}",
          marginal_likelihood: "P(D) = \\int P(D|\\theta) \\cdot P(\\theta) \\, d\\theta",
          conjugate_prior: "\\text{If } \\theta \\sim \\text{Beta}(\\alpha, \\beta) \\text{ and } x|\\theta \\sim \\text{Binomial}(n, \\theta), \\text{ then } \\theta|x \\sim \\text{Beta}(\\alpha + x, \\beta + n - x)"
        },
        codeExample: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

def bayesian_analysis(prior_mean, prior_std, data, likelihood_std):
    """
    Simple Bayesian analysis example
    """
    # Prior distribution
    prior = stats.norm(prior_mean, prior_std)
    
    # Likelihood function
    def likelihood(mu):
        return np.prod(stats.norm(mu, likelihood_std).pdf(data))
    
    # Posterior parameters (conjugate prior case)
    n = len(data)
    data_mean = np.mean(data)
    
    # Posterior precision = prior precision + likelihood precision
    prior_precision = 1 / (prior_std ** 2)
    likelihood_precision = n / (likelihood_std ** 2)
    posterior_precision = prior_precision + likelihood_precision
    
    # Posterior mean = weighted average
    posterior_mean = (prior_precision * prior_mean + likelihood_precision * data_mean) / posterior_precision
    posterior_std = np.sqrt(1 / posterior_precision)
    
    # Posterior distribution
    posterior = stats.norm(posterior_mean, posterior_std)
    
    return {
        'prior': prior,
        'posterior': posterior,
        'posterior_mean': posterior_mean,
        'posterior_std': posterior_std
    }`
      }
    },
    {
      id: "correlation",
      title: "Correlation Analysis",
      icon: "🔗",
      description: "Statistical methods for measuring the strength and direction of relationships between variables.",
      details: {
        howItWorks: "Calculates correlation coefficients that quantify linear relationships, ranging from -1 (perfect negative) to +1 (perfect positive).",
        keyComponents: ["Pearson Correlation", "Spearman Correlation", "Kendall's Tau", "Partial Correlation", "Correlation Matrix"],
        useCases: ["Portfolio diversification", "Risk factor analysis", "Market relationships", "Feature selection"],
        formulas: {
          pearson: "r = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^2\\sum_{i=1}^{n}(y_i - \\bar{y})^2}}",
          spearman: "\\rho = 1 - \\frac{6\\sum d_i^2}{n(n^2-1)}",
          kendall: "\\tau = \\frac{C - D}{\\binom{n}{2}}",
          partial_correlation: "r_{xy.z} = \\frac{r_{xy} - r_{xz}r_{yz}}{\\sqrt{(1-r_{xz}^2)(1-r_{yz}^2)}}"
        },
        codeExample: `import numpy as np
import pandas as pd
from scipy.stats import pearsonr, spearmanr, kendalltau

def correlation_analysis(data):
    """
    Comprehensive correlation analysis
    """
    # Pearson correlation (linear)
    pearson_corr, pearson_p = pearsonr(data['x'], data['y'])
    
    # Spearman correlation (monotonic)
    spearman_corr, spearman_p = spearmanr(data['x'], data['y'])
    
    # Kendall's tau (rank-based)
    kendall_tau, kendall_p = kendalltau(data['x'], data['y'])
    
    # Correlation matrix for multiple variables
    corr_matrix = data.corr()
    
    # Partial correlation (controlling for other variables)
    def partial_correlation(x, y, z):
        # Calculate residuals after regressing on z
        from sklearn.linear_model import LinearRegression
        lr = LinearRegression()
        lr.fit(z.reshape(-1, 1), x)
        x_residuals = x - lr.predict(z.reshape(-1, 1))
        
        lr.fit(z.reshape(-1, 1), y)
        y_residuals = y - lr.predict(z.reshape(-1, 1))
        
        return np.corrcoef(x_residuals, y_residuals)[0, 1]
    
    return {
        'pearson': {'correlation': pearson_corr, 'p_value': pearson_p},
        'spearman': {'correlation': spearman_corr, 'p_value': spearman_p},
        'kendall': {'correlation': kendall_tau, 'p_value': kendall_p},
        'correlation_matrix': corr_matrix
    }`
      }
    },
    {
      id: "confidence-intervals",
      title: "Confidence Intervals",
      icon: "📏",
      description: "Range estimates that provide uncertainty bounds around point estimates with specified confidence levels.",
      details: {
        howItWorks: "Uses sampling distributions and standard errors to construct intervals that contain the true parameter with specified probability.",
        keyComponents: ["Point Estimate", "Standard Error", "Confidence Level", "Critical Values", "Margin of Error"],
        useCases: ["Risk measurement", "Performance evaluation", "Model validation", "Parameter estimation"],
        codeExample: `import numpy as np
from scipy import stats

def confidence_intervals(data, confidence_level=0.95):
    """
    Calculate various confidence intervals
    """
    n = len(data)
    mean = np.mean(data)
    std = np.std(data, ddof=1)  # Sample standard deviation
    se = std / np.sqrt(n)  # Standard error
    
    # t-distribution critical value
    alpha = 1 - confidence_level
    df = n - 1
    t_critical = stats.t.ppf(1 - alpha/2, df)
    
    # Mean confidence interval
    margin_error = t_critical * se
    ci_mean = (mean - margin_error, mean + margin_error)
    
    # Variance confidence interval (chi-square distribution)
    chi2_lower = stats.chi2.ppf(alpha/2, df)
    chi2_upper = stats.chi2.ppf(1 - alpha/2, df)
    ci_variance = ((df * std**2) / chi2_upper, (df * std**2) / chi2_lower)
    
    # Proportion confidence interval (if binary data)
    if all(x in [0, 1] for x in data):
        p = np.mean(data)
        se_prop = np.sqrt(p * (1 - p) / n)
        z_critical = stats.norm.ppf(1 - alpha/2)
        margin_error_prop = z_critical * se_prop
        ci_proportion = (p - margin_error_prop, p + margin_error_prop)
    else:
        ci_proportion = None
    
    return {
        'mean_ci': ci_mean,
        'variance_ci': ci_variance,
        'proportion_ci': ci_proportion,
        'confidence_level': confidence_level
    }`
      }
    },
    {
      id: "regression",
      title: "Regression Analysis",
      icon: "•",
      description: "Statistical methods for modeling relationships between dependent and independent variables.",
      details: {
        howItWorks: "Fits mathematical models to data to understand and predict relationships, measuring how well the model explains the data.",
        keyComponents: ["Linear Regression", "Multiple Regression", "R-squared", "Residual Analysis", "Assumptions Testing"],
        useCases: ["Risk factor modeling", "Performance attribution", "Price prediction", "Market analysis"],
        formulas: {
          linear_regression: "y = \\beta_0 + \\beta_1 x + \\epsilon",
          multiple_regression: "y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\cdots + \\beta_k x_k + \\epsilon",
          r_squared: "R^2 = 1 - \\frac{SS_{res}}{SS_{tot}} = \\frac{SS_{reg}}{SS_{tot}}",
          adjusted_r_squared: "R^2_{adj} = 1 - \\frac{(1-R^2)(n-1)}{n-k-1}",
          f_statistic: "F = \\frac{MS_{reg}}{MS_{res}} = \\frac{SS_{reg}/k}{SS_{res}/(n-k-1)}"
        },
        codeExample: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
from sklearn.model_selection import train_test_split
import numpy as np

def regression_analysis(X, y):
    """
    Comprehensive regression analysis
    """
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Fit linear regression
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # Predictions
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)
    
    # Metrics
    r2_train = r2_score(y_train, y_pred_train)
    r2_test = r2_score(y_test, y_pred_test)
    mse_train = mean_squared_error(y_train, y_pred_train)
    mse_test = mean_squared_error(y_test, y_pred_test)
    
    # Residual analysis
    residuals = y_test - y_pred_test
    
    # Assumptions testing
    from scipy.stats import shapiro, jarque_bera
    normality_test = shapiro(residuals)
    jb_test = jarque_bera(residuals)
    
    return {
        'model': model,
        'coefficients': model.coef_,
        'intercept': model.intercept_,
        'r2_train': r2_train,
        'r2_test': r2_test,
        'mse_train': mse_train,
        'mse_test': mse_test,
        'residuals': residuals,
        'normality_p_value': normality_test.pvalue,
        'jb_p_value': jb_test.pvalue
    }`
      }
    }
  ];

  const applications = [
    {
      title: "Risk Management",
      description: "Use statistical methods to quantify and manage various types of financial risks.",
      tools: ["Probability Distributions", "Hypothesis Testing", "Confidence Intervals", "Bayesian Analysis"],
      example: "Calculate Value-at-Risk using historical simulation and parametric methods with confidence intervals."
    },
    {
      title: "Portfolio Management",
      description: "Apply statistical techniques to optimize portfolio construction and performance evaluation.",
      tools: ["Correlation Analysis", "Regression Analysis", "Hypothesis Testing", "Bayesian Statistics"],
      example: "Use correlation analysis to identify diversification opportunities and optimize asset allocation."
    },
    {
      title: "Market Research",
      description: "Analyze market data using statistical methods to identify patterns and opportunities.",
      tools: ["Hypothesis Testing", "Regression Analysis", "Probability Distributions", "Confidence Intervals"],
      example: "Test whether a new trading strategy generates statistically significant excess returns."
    },
    {
      title: "Model Validation",
      description: "Validate financial models using statistical tests and goodness-of-fit measures.",
      tools: ["Hypothesis Testing", "Goodness-of-Fit Tests", "Residual Analysis", "Confidence Intervals"],
      example: "Validate a credit scoring model using out-of-sample testing and statistical significance tests."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Statistics & Probability
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
              Build a strong foundation in statistical methods and probability theory for quantitative finance
            </p>
          </div>
        </div>

        {/* Statistics Topics Section */}
        <div id="topics" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">

          <div className="space-y-8">
            {statsTopics.map((topic, index) => (
              <div key={index} className="bg-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">{topic.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{topic.title}</h3>
                    <p className="text-gray-200 mb-6 text-lg">{topic.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">How It Works</h4>
                        <p className="text-gray-200 text-sm mb-4">{topic.details.howItWorks}</p>
                        
                        <h4 className="text-lg font-semibold text-green-400 mb-3">Key Components</h4>
                        <ul className="text-gray-200 text-sm space-y-1">
                          {topic.details.keyComponents.map((component, idx) => (
                            <li key={idx}>• {component}</li>
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
            <h2 className="text-4xl font-bold text-white mb-4">💼 Professional Applications</h2>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto">
              Discover how statistical methods are applied across different areas of finance and quantitative analysis.
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
            <h3 className="text-2xl font-bold text-white mb-6 text-center">• Learning Path</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">1</div>
                <h4 className="text-white font-semibold mb-2">Descriptive Stats</h4>
                <p className="text-gray-200 text-sm">Means, variances, distributions</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-white font-semibold mb-2">Probability</h4>
                <p className="text-gray-200 text-sm">Distributions, Bayes' theorem</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-white font-semibold mb-2">Inference</h4>
                <p className="text-gray-200 text-sm">Hypothesis testing, CIs</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-white font-semibold mb-2">Regression</h4>
                <p className="text-gray-200 text-sm">Linear models, correlation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Libraries Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/2 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Essential Tools & Libraries</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-200 text-xs">Primary language</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">NumPy</h4>
                <p className="text-gray-200 text-xs">Numerical computing</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">🔢</div>
                <h4 className="text-white font-semibold mb-1">SciPy</h4>
                <p className="text-gray-200 text-xs">Scientific computing</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Pandas</h4>
                <p className="text-gray-200 text-xs">Data manipulation</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Statsmodels</h4>
                <p className="text-gray-200 text-xs">Statistical modeling</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Scikit-learn</h4>
                <p className="text-gray-200 text-xs">Machine learning</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Matplotlib</h4>
                <p className="text-gray-200 text-xs">Data visualization</p>
              </div>
              <div className="bg-white/2 rounded-xl p-4 border border-white/5 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Seaborn</h4>
                <p className="text-gray-200 text-xs">Statistical plots</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Statistics & Probability?</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Build a solid foundation in statistical methods that are essential for quantitative finance, risk management, and data analysis.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            >
              <Link href="/learn/general-modeling">
                Next: General Modeling
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
