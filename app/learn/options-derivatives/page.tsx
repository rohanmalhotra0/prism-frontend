"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function OptionsDerivativesPage() {
  const derivativesTopics = [
    {
      title: "Black-Scholes Model",
      icon: "📐",
      description: "The fundamental model for pricing European options, providing a theoretical framework for option valuation.",
      details: {
        howItWorks: "Uses stochastic calculus to derive a partial differential equation that describes the price evolution of options under certain assumptions.",
        keyComponents: ["Underlying Price", "Strike Price", "Time to Expiration", "Risk-free Rate", "Volatility"],
        useCases: ["Option pricing", "Risk management", "Hedging strategies", "Volatility trading"],
        formulas: {
          call_price: "C = S_0 N(d_1) - Ke^{-rT} N(d_2)",
          put_price: "P = Ke^{-rT} N(-d_2) - S_0 N(-d_1)",
          d1: "d_1 = \\frac{\\ln(S_0/K) + (r + \\sigma^2/2)T}{\\sigma\\sqrt{T}}",
          d2: "d_2 = d_1 - \\sigma\\sqrt{T}",
          black_scholes_pde: "\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + rS\\frac{\\partial V}{\\partial S} - rV = 0"
        },
        codeExample: `import numpy as np
from scipy.stats import norm

def black_scholes_call(S, K, T, r, sigma):
    """
    Calculate Black-Scholes call option price
    """
    # Calculate d1 and d2
    d1 = (np.log(S/K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    # Calculate option price
    call_price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    
    return call_price

def black_scholes_put(S, K, T, r, sigma):
    """
    Calculate Black-Scholes put option price
    """
    d1 = (np.log(S/K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    put_price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    
    return put_price`
      }
    },
    {
      title: "Greeks",
      icon: "•",
      description: "Sensitivity measures that quantify how option prices change with respect to various underlying factors.",
      details: {
        howItWorks: "Partial derivatives of the option price function with respect to different variables, measuring price sensitivity.",
        keyComponents: ["Delta", "Gamma", "Theta", "Vega", "Rho"],
        useCases: ["Risk management", "Hedging strategies", "Portfolio optimization", "Market making"],
        formulas: {
          delta: "\\Delta = \\frac{\\partial C}{\\partial S} = N(d_1)",
          gamma: "\\Gamma = \\frac{\\partial^2 C}{\\partial S^2} = \\frac{N'(d_1)}{S\\sigma\\sqrt{T}}",
          theta: "\\Theta = \\frac{\\partial C}{\\partial t} = -\\frac{S N'(d_1) \\sigma}{2\\sqrt{T}} - rKe^{-rT}N(d_2)",
          vega: "\\nu = \\frac{\\partial C}{\\partial \\sigma} = S\\sqrt{T} N'(d_1)",
          rho: "\\rho = \\frac{\\partial C}{\\partial r} = KTe^{-rT}N(d_2)"
        },
        codeExample: `def calculate_greeks(S, K, T, r, sigma):
    """
    Calculate all major Greeks for options
    """
    d1 = (np.log(S/K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    # Delta - price sensitivity to underlying
    delta_call = norm.cdf(d1)
    delta_put = delta_call - 1
    
    # Gamma - delta sensitivity to underlying
    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    
    # Theta - time decay
    theta_call = -(S * norm.pdf(d1) * sigma) / (2 * np.sqrt(T)) - r * K * np.exp(-r * T) * norm.cdf(d2)
    theta_put = theta_call + r * K * np.exp(-r * T)
    
    # Vega - volatility sensitivity
    vega = S * norm.pdf(d1) * np.sqrt(T)
    
    # Rho - interest rate sensitivity
    rho_call = K * T * np.exp(-r * T) * norm.cdf(d2)
    rho_put = -K * T * np.exp(-r * T) * norm.cdf(-d2)
    
    return {
        'delta_call': delta_call,
        'delta_put': delta_put,
        'gamma': gamma,
        'theta_call': theta_call,
        'theta_put': theta_put,
        'vega': vega,
        'rho_call': rho_call,
        'rho_put': rho_put
    }`
      }
    },
    {
      title: "Binomial Model",
      icon: "🌳",
      description: "A discrete-time model that values options by creating a binomial tree of possible future stock prices.",
      details: {
        howItWorks: "Constructs a tree where the stock price can move up or down in each period, then works backwards to calculate option values.",
        keyComponents: ["Up/Down Factors", "Risk-neutral Probabilities", "Tree Construction", "Backward Induction"],
        useCases: ["American options", "Exotic options", "Dividend-paying stocks", "Early exercise"],
        codeExample: `def binomial_option_pricing(S, K, T, r, sigma, n_steps, option_type='call'):
    """
    Binomial model for option pricing
    """
    dt = T / n_steps
    u = np.exp(sigma * np.sqrt(dt))  # Up factor
    d = 1 / u  # Down factor
    p = (np.exp(r * dt) - d) / (u - d)  # Risk-neutral probability
    
    # Initialize stock price tree
    stock_prices = np.zeros((n_steps + 1, n_steps + 1))
    for i in range(n_steps + 1):
        for j in range(i + 1):
            stock_prices[j, i] = S * (u ** (i - j)) * (d ** j)
    
    # Initialize option value tree
    option_values = np.zeros((n_steps + 1, n_steps + 1))
    
    # Calculate option values at expiration
    for j in range(n_steps + 1):
        if option_type == 'call':
            option_values[j, n_steps] = max(0, stock_prices[j, n_steps] - K)
        else:  # put
            option_values[j, n_steps] = max(0, K - stock_prices[j, n_steps])
    
    # Backward induction
    for i in range(n_steps - 1, -1, -1):
        for j in range(i + 1):
            option_values[j, i] = np.exp(-r * dt) * (p * option_values[j, i + 1] + (1 - p) * option_values[j + 1, i + 1])
    
    return option_values[0, 0]`
      }
    },
    {
      title: "Implied Volatility",
      icon: "•",
      description: "The volatility level that makes the theoretical option price equal to the market price, derived from market data.",
      details: {
        howItWorks: "Uses numerical methods to find the volatility parameter that produces the observed market price when plugged into a pricing model.",
        keyComponents: ["Market Prices", "Pricing Model", "Numerical Methods", "Volatility Surface", "Smile/Skew"],
        useCases: ["Volatility trading", "Risk management", "Market sentiment", "Arbitrage opportunities"],
        codeExample: `from scipy.optimize import brentq

def implied_volatility(market_price, S, K, T, r, option_type='call'):
    """
    Calculate implied volatility using Brent's method
    """
    def objective(sigma):
        if option_type == 'call':
            theoretical_price = black_scholes_call(S, K, T, r, sigma)
        else:
            theoretical_price = black_scholes_put(S, K, T, r, sigma)
        return theoretical_price - market_price
    
    try:
        iv = brentq(objective, 0.001, 5.0)  # Search between 0.1% and 500%
        return iv
    except ValueError:
        return None  # No solution found

def volatility_smile(strikes, market_prices, S, T, r):
    """
    Calculate implied volatility smile
    """
    implied_vols = []
    for i, (K, price) in enumerate(zip(strikes, market_prices)):
        iv = implied_volatility(price, S, K, T, r)
        implied_vols.append(iv)
    
    return implied_vols`
      }
    },
    {
      title: "Hedging Strategies",
      icon: "•",
      description: "Techniques to reduce or eliminate risk exposure using derivatives and other financial instruments.",
      details: {
        howItWorks: "Uses derivatives to offset the risk of an underlying position, creating a portfolio with reduced or zero net exposure.",
        keyComponents: ["Delta Hedging", "Gamma Hedging", "Portfolio Hedging", "Dynamic Hedging", "Hedge Ratios"],
        useCases: ["Risk management", "Market making", "Portfolio protection", "Arbitrage strategies"],
        codeExample: `def delta_hedge(portfolio_value, option_delta, underlying_price, option_price):
    """
    Calculate delta hedge ratio
    """
    # Number of options to hedge
    hedge_ratio = -option_delta
    
    # Number of underlying shares needed
    shares_needed = hedge_ratio * (portfolio_value / underlying_price)
    
    return shares_needed

def gamma_hedge(portfolio_gamma, option_gamma, underlying_price):
    """
    Calculate gamma hedge using another option
    """
    # Gamma hedge ratio
    gamma_ratio = -portfolio_gamma / option_gamma
    
    return gamma_ratio

def portfolio_hedge(portfolio, hedge_instruments):
    """
    Calculate optimal hedge for entire portfolio
    """
    # This would involve solving a system of equations
    # to minimize portfolio variance
    pass`
      }
    },
    {
      title: "Exotic Options",
      icon: "•",
      description: "Complex options with non-standard features that go beyond simple call and put options.",
      details: {
        howItWorks: "Uses advanced mathematical models and numerical methods to price options with complex payoff structures and exercise conditions.",
        keyComponents: ["Barrier Options", "Asian Options", "Lookback Options", "Binary Options", "Path Dependencies"],
        useCases: ["Structured products", "Risk management", "Speculation", "Custom hedging"],
        codeExample: `def barrier_option_price(S, K, H, T, r, sigma, option_type='call', barrier_type='up_and_out'):
    """
    Price barrier options using Monte Carlo simulation
    """
    n_simulations = 100000
    dt = T / 252  # Daily steps
    n_steps = int(T * 252)
    
    payoffs = []
    
    for _ in range(n_simulations):
        # Generate price path
        price_path = [S]
        for _ in range(n_steps):
            dW = np.random.normal(0, np.sqrt(dt))
            dS = r * price_path[-1] * dt + sigma * price_path[-1] * dW
            price_path.append(price_path[-1] + dS)
        
        # Check barrier condition
        if barrier_type == 'up_and_out':
            if max(price_path) >= H:
                payoff = 0  # Barrier hit, option expires worthless
            else:
                if option_type == 'call':
                    payoff = max(0, price_path[-1] - K)
                else:
                    payoff = max(0, K - price_path[-1])
        
        payoffs.append(payoff)
    
    # Discount to present value
    option_price = np.exp(-r * T) * np.mean(payoffs)
    return option_price`
      }
    }
  ];

  const applications = [
    {
      title: "Options Trading",
      description: "Develop strategies for trading options based on market views, volatility expectations, and risk management.",
      tools: ["Black-Scholes", "Greeks", "Implied Volatility", "Hedging"],
      example: "Build a delta-neutral portfolio that profits from volatility changes while remaining market-neutral."
    },
    {
      title: "Risk Management",
      description: "Use derivatives to hedge portfolio risks and manage exposure to various market factors.",
      tools: ["Delta Hedging", "Portfolio Hedging", "Greeks Analysis", "Stress Testing"],
      example: "Implement a dynamic hedging strategy to protect a stock portfolio from market downturns."
    },
    {
      title: "Market Making",
      description: "Provide liquidity in options markets while managing inventory risk and maintaining profitable spreads.",
      tools: ["Greeks", "Implied Volatility", "Hedging Strategies", "Risk Models"],
      example: "Develop an automated market-making system that quotes options while maintaining delta neutrality."
    },
    {
      title: "Structured Products",
      description: "Design and price complex financial products that combine options with other instruments.",
      tools: ["Exotic Options", "Monte Carlo", "Binomial Models", "Pricing Models"],
      example: "Create a structured note with embedded barrier options that provides capital protection and upside participation."
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
              Options & Derivatives
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master the mathematics and strategies behind options pricing, risk management, and derivatives trading
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

        {/* Derivatives Models Section */}
        <div id="models" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">• Core Derivatives Models</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn the essential mathematical models and pricing techniques used in options and derivatives markets.
            </p>
          </div>

          <div className="space-y-8">
            {derivativesTopics.map((topic, index) => (
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
                        
                        {topic.details.formulas && (
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-orange-400 mb-3">Key Formulas</h4>
                            <div className="space-y-3">
                              {Object.entries(topic.details.formulas).map(([key, formula]) => (
                                <div key={key} className="bg-gray-900/30 rounded-lg p-3 border border-gray-700">
                                  <div className="text-gray-300 text-xs mb-1 capitalize">
                                    {key.replace(/_/g, ' ')}:
                                  </div>
                                  <div className="text-center">
                                    <BlockMath math={formula} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
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
              Discover how options and derivatives are used across different areas of finance and trading.
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
                <h4 className="text-white font-semibold mb-2">Basics</h4>
                <p className="text-gray-300 text-sm">Options terminology, payoffs</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-white font-semibold mb-2">Pricing Models</h4>
                <p className="text-gray-300 text-sm">Black-Scholes, Binomial</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-white font-semibold mb-2">Greeks & Risk</h4>
                <p className="text-gray-300 text-sm">Sensitivity analysis, hedging</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-white font-semibold mb-2">Advanced</h4>
                <p className="text-gray-300 text-sm">Exotic options, strategies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Software Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Essential Tools & Software</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-400 text-xs">Programming language</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">QuantLib</h4>
                <p className="text-gray-400 text-xs">Quantitative finance library</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🔢</div>
                <h4 className="text-white font-semibold mb-1">SciPy</h4>
                <p className="text-gray-400 text-xs">Scientific computing</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Bloomberg</h4>
                <p className="text-gray-400 text-xs">Market data & analytics</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">💼</div>
                <h4 className="text-white font-semibold mb-1">Refinitiv</h4>
                <p className="text-gray-400 text-xs">Financial data platform</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Derivatives Pro</h4>
                <p className="text-gray-400 text-xs">Options pricing software</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Excel</h4>
                <p className="text-gray-400 text-xs">Spreadsheet modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">C++</h4>
                <p className="text-gray-400 text-xs">High-performance computing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Options & Derivatives?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Build expertise in options pricing, risk management, and derivatives trading strategies used by professional traders and risk managers.
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
