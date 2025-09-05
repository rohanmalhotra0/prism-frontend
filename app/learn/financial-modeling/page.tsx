"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FinancialModelingPage() {
  const modelingTopics = [
    {
      title: "Discounted Cash Flow (DCF)",
      icon: "💰",
      description: "A fundamental valuation method that estimates the value of an investment based on its expected future cash flows.",
      details: {
        howItWorks: "DCF calculates the present value of projected future cash flows by discounting them back to today using a required rate of return.",
        keyComponents: ["Free Cash Flow Projections", "Terminal Value", "Discount Rate (WACC)", "Present Value Calculation"],
        useCases: ["Company valuation", "Investment analysis", "M&A transactions", "Project evaluation"],
        codeExample: `def dcf_valuation(cash_flows, discount_rate, terminal_growth_rate):
    """
    Calculate DCF valuation
    """
    # Project cash flows for 5 years
    projected_cf = []
    for i in range(1, 6):
        cf = cash_flows * (1 + 0.05) ** i  # 5% growth assumption
        projected_cf.append(cf)
    
    # Calculate terminal value
    terminal_value = projected_cf[-1] * (1 + terminal_growth_rate) / (discount_rate - terminal_growth_rate)
    
    # Discount all cash flows
    present_values = []
    for i, cf in enumerate(projected_cf):
        pv = cf / (1 + discount_rate) ** (i + 1)
        present_values.append(pv)
    
    # Add terminal value
    terminal_pv = terminal_value / (1 + discount_rate) ** 5
    present_values.append(terminal_pv)
    
    return sum(present_values)`
      }
    },
    {
      title: "Comparable Company Analysis",
      icon: "📊",
      description: "A relative valuation method that compares a company's metrics to similar companies in the same industry.",
      details: {
        howItWorks: "Identifies similar companies, calculates valuation multiples (P/E, EV/EBITDA, etc.), and applies them to the target company.",
        keyComponents: ["Peer Selection", "Multiple Calculation", "Financial Metrics", "Valuation Range"],
        useCases: ["IPO pricing", "M&A valuation", "Market analysis", "Investment screening"],
        codeExample: `import pandas as pd
import numpy as np

def comparable_analysis(target_company, peer_companies):
    """
    Perform comparable company analysis
    """
    # Calculate key multiples for peers
    peer_data = []
    for company in peer_companies:
        pe_ratio = company['market_cap'] / company['net_income']
        ev_ebitda = company['enterprise_value'] / company['ebitda']
        peer_data.append({
            'name': company['name'],
            'pe_ratio': pe_ratio,
            'ev_ebitda': ev_ebitda
        })
    
    # Calculate median multiples
    pe_median = np.median([p['pe_ratio'] for p in peer_data])
    ev_ebitda_median = np.median([p['ev_ebitda'] for p in peer_data])
    
    # Apply to target company
    target_valuation_pe = target_company['net_income'] * pe_median
    target_valuation_ev = target_company['ebitda'] * ev_ebitda_median
    
    return {
        'pe_valuation': target_valuation_pe,
        'ev_ebitda_valuation': target_valuation_ev,
        'peer_data': peer_data
    }`
      }
    },
    {
      title: "Leveraged Buyout (LBO) Model",
      icon: "🏗️",
      description: "A financial model used to evaluate leveraged buyout transactions, focusing on debt capacity and returns.",
      details: {
        howItWorks: "Models the acquisition using significant debt financing, projects cash flows to service debt, and calculates returns to equity investors.",
        keyComponents: ["Sources & Uses", "Debt Schedule", "Cash Flow Waterfall", "IRR Calculation"],
        useCases: ["Private equity analysis", "M&A evaluation", "Debt capacity analysis", "Investment returns"],
        codeExample: `def lbo_model(acquisition_price, debt_ratio, interest_rate, exit_multiple):
    """
    Basic LBO model framework
    """
    # Sources and uses
    equity_contribution = acquisition_price * (1 - debt_ratio)
    debt_amount = acquisition_price * debt_ratio
    
    # Project cash flows (simplified)
    annual_cash_flow = 1000000  # Example
    annual_interest = debt_amount * interest_rate
    
    # Debt paydown
    annual_debt_paydown = annual_cash_flow - annual_interest
    
    # Calculate exit value
    exit_value = annual_cash_flow * exit_multiple
    
    # Calculate IRR
    cash_flows = [-equity_contribution]  # Initial investment
    for year in range(1, 6):  # 5-year hold
        if year == 5:
            cash_flows.append(exit_value)
        else:
            cash_flows.append(0)
    
    return {
        'equity_contribution': equity_contribution,
        'debt_amount': debt_amount,
        'exit_value': exit_value,
        'cash_flows': cash_flows
    }`
      }
    },
    {
      title: "Three-Statement Model",
      icon: "📋",
      description: "An integrated financial model that links the income statement, balance sheet, and cash flow statement.",
      details: {
        howItWorks: "Creates a dynamic model where changes in one statement automatically flow through to the other statements using accounting relationships.",
        keyComponents: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Supporting Schedules"],
        useCases: ["Financial planning", "Scenario analysis", "Credit analysis", "Investment research"],
        codeExample: `def three_statement_model(revenue_growth, margin_assumptions):
    """
    Build integrated three-statement model
    """
    # Income Statement
    revenue = 10000000  # Starting revenue
    cogs = revenue * margin_assumptions['cogs_margin']
    ebitda = revenue - cogs
    ebit = ebitda - margin_assumptions['depreciation']
    ebt = ebit - margin_assumptions['interest_expense']
    net_income = ebt * (1 - margin_assumptions['tax_rate'])
    
    # Balance Sheet
    cash = net_income * 0.1  # 10% of net income
    accounts_receivable = revenue * 0.15  # 15% of revenue
    inventory = cogs * 0.2  # 20% of COGS
    total_assets = cash + accounts_receivable + inventory
    
    # Cash Flow Statement
    operating_cash_flow = ebitda - margin_assumptions['capex']
    investing_cash_flow = -margin_assumptions['capex']
    financing_cash_flow = 0  # Simplified
    
    return {
        'income_statement': {
            'revenue': revenue,
            'net_income': net_income
        },
        'balance_sheet': {
            'total_assets': total_assets
        },
        'cash_flow': {
            'operating_cf': operating_cash_flow
        }
    }`
      }
    },
    {
      title: "Monte Carlo Simulation",
      icon: "🎲",
      description: "A statistical method that uses random sampling to model uncertainty and risk in financial projections.",
      details: {
        howItWorks: "Runs thousands of simulations with random inputs to generate a distribution of possible outcomes and assess risk.",
        keyComponents: ["Input Variables", "Probability Distributions", "Simulation Runs", "Risk Metrics"],
        useCases: ["Risk assessment", "Portfolio optimization", "Project evaluation", "Stress testing"],
        codeExample: `import numpy as np
import matplotlib.pyplot as plt

def monte_carlo_simulation(n_simulations=10000):
    """
    Monte Carlo simulation for project valuation
    """
    # Define input distributions
    revenue_mean = 1000000
    revenue_std = 100000
    cost_mean = 600000
    cost_std = 50000
    
    results = []
    
    for _ in range(n_simulations):
        # Sample from distributions
        revenue = np.random.normal(revenue_mean, revenue_std)
        costs = np.random.normal(cost_mean, cost_std)
        
        # Calculate NPV
        npv = revenue - costs
        results.append(npv)
    
    # Calculate risk metrics
    mean_npv = np.mean(results)
    std_npv = np.std(results)
    var_95 = np.percentile(results, 5)  # 95% VaR
    
    return {
        'mean_npv': mean_npv,
        'std_npv': std_npv,
        'var_95': var_95,
        'results': results
    }`
      }
    },
    {
      title: "Sensitivity Analysis",
      icon: "🔍",
      description: "A technique to understand how changes in input variables affect the output of a financial model.",
      details: {
        howItWorks: "Systematically varies key input variables while holding others constant to measure their impact on model outputs.",
        keyComponents: ["Key Variables", "Range Analysis", "Tornado Charts", "Scenario Planning"],
        useCases: ["Risk identification", "Model validation", "Decision making", "Stress testing"],
        codeExample: `def sensitivity_analysis(base_case, variables, ranges):
    """
    Perform sensitivity analysis on key variables
    """
    results = {}
    
    for var_name, var_range in ranges.items():
        sensitivity_results = []
        
        for value in var_range:
            # Create modified case
            modified_case = base_case.copy()
            modified_case[var_name] = value
            
            # Calculate output (e.g., NPV)
            npv = calculate_npv(modified_case)
            sensitivity_results.append(npv)
        
        results[var_name] = {
            'values': var_range,
            'npvs': sensitivity_results,
            'impact': max(sensitivity_results) - min(sensitivity_results)
        }
    
    return results`
      }
    }
  ];

  const applications = [
    {
      title: "Investment Banking",
      description: "Create comprehensive financial models for M&A transactions, IPOs, and capital raising.",
      tools: ["DCF Models", "LBO Models", "Comparable Analysis", "Three-Statement Models"],
      example: "Build a DCF model to value a tech startup for a potential acquisition by a larger company."
    },
    {
      title: "Private Equity",
      description: "Develop LBO models to evaluate potential investments and calculate expected returns.",
      tools: ["LBO Models", "Sensitivity Analysis", "Monte Carlo", "Scenario Planning"],
      example: "Model a leveraged buyout of a manufacturing company with 70% debt financing."
    },
    {
      title: "Corporate Finance",
      description: "Build integrated models for budgeting, forecasting, and strategic planning.",
      tools: ["Three-Statement Models", "Budget Models", "Forecasting", "Variance Analysis"],
      example: "Create a 5-year integrated model for a company's strategic planning process."
    },
    {
      title: "Equity Research",
      description: "Develop valuation models to support investment recommendations and price targets.",
      tools: ["DCF Models", "Comparable Analysis", "Sum-of-Parts", "Sensitivity Analysis"],
      example: "Build a DCF model to establish a price target for a publicly traded company."
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
              Financial Modeling
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master the art of building comprehensive financial models for valuation, forecasting, and investment analysis
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

        {/* Financial Models Section */}
        <div id="models" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">📊 Core Financial Models</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn the essential financial modeling techniques used in investment banking, private equity, and corporate finance.
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
              Discover how financial modeling is applied across different areas of finance and investment.
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
                <h4 className="text-white font-semibold mb-2">Excel Fundamentals</h4>
                <p className="text-gray-300 text-sm">Formulas, functions, and best practices</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="text-white font-semibold mb-2">Basic Models</h4>
                <p className="text-gray-300 text-sm">DCF, Comparable Analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="text-white font-semibold mb-2">Advanced Models</h4>
                <p className="text-gray-300 text-sm">LBO, Three-Statement Models</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4️⃣</div>
                <h4 className="text-white font-semibold mb-2">Risk Analysis</h4>
                <p className="text-gray-300 text-sm">Monte Carlo, Sensitivity Analysis</p>
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
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Excel</h4>
                <p className="text-gray-400 text-xs">Primary modeling platform</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-400 text-xs">Advanced modeling & analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="text-white font-semibold mb-1">Bloomberg Terminal</h4>
                <p className="text-gray-400 text-xs">Market data & analytics</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">💼</div>
                <h4 className="text-white font-semibold mb-1">FactSet</h4>
                <p className="text-gray-400 text-xs">Financial data platform</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🔍</div>
                <h4 className="text-white font-semibold mb-1">@RISK</h4>
                <p className="text-gray-400 text-xs">Risk analysis add-in</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Tableau</h4>
                <p className="text-gray-400 text-xs">Data visualization</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">Power BI</h4>
                <p className="text-gray-400 text-xs">Business intelligence</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="text-white font-semibold mb-1">VBA</h4>
                <p className="text-gray-400 text-xs">Excel automation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Financial Modeling?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Start building professional-grade financial models that will set you apart in investment banking, private equity, and corporate finance.
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
