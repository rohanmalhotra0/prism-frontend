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
  TrendingUp, 
  Calculator, 
  PieChart, 
  BarChart3, 
  Target, 
  Zap,
  Database,
  FileText,
  DollarSign,
  Percent
} from "lucide-react";

export default function FinancialModelingPage() {
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const setActiveTab = (topicId: string, tab: string) => {
    setActiveTabs(prev => ({ ...prev, [topicId]: tab }));
  };

  const modelingTopics = [
    {
      id: "dcf",
      title: "Discounted Cash Flow (DCF)",
      icon: DollarSign,
      description: "A fundamental valuation method that estimates the value of an investment based on its expected future cash flows.",
      details: {
        howItWorks: "DCF calculates the present value of projected future cash flows by discounting them back to today using a required rate of return.",
        keyComponents: ["Free Cash Flow Projections", "Terminal Value", "Discount Rate (WACC)", "Present Value Calculation"],
        useCases: ["Company valuation", "Investment analysis", "M&A transactions", "Project evaluation"],
        formulas: {
          dcf_value: "\\text{DCF Value} = \\sum_{t=1}^{n} \\frac{\\text{FCF}_t}{(1+r)^t} + \\frac{\\text{TV}}{(1+r)^n}",
          terminal_value: "\\text{TV} = \\frac{\\text{FCF}_{n+1}}{r - g} = \\frac{\\text{FCF}_n \\times (1+g)}{r - g}",
          wacc: "\\text{WACC} = \\frac{E}{V} \\times r_e + \\frac{D}{V} \\times r_d \\times (1-T)",
          free_cash_flow: "\\text{FCF} = \\text{EBIT} \\times (1-T) + \\text{Depreciation} - \\text{Capex} - \\Delta \\text{NWC}"
        },
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
      id: "comps",
      title: "Comparable Company Analysis",
      icon: BarChart3,
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
      id: "lbo",
      title: "Leveraged Buyout (LBO) Model",
      icon: TrendingUp,
      description: "A financial model used to evaluate leveraged buyout transactions, focusing on debt capacity and returns.",
      details: {
        howItWorks: "Models the acquisition using significant debt financing, projects cash flows to service debt, and calculates returns to equity investors.",
        keyComponents: ["Sources & Uses", "Debt Schedule", "Cash Flow Waterfall", "IRR Calculation"],
        useCases: ["Private equity analysis", "M&A evaluation", "Debt capacity analysis", "Investment returns"],
        formulas: {
          irr: "\\text{IRR}: \\sum_{t=0}^{n} \\frac{\\text{CF}_t}{(1+\\text{IRR})^t} = 0",
          debt_capacity: "\\text{Max Debt} = \\frac{\\text{EBITDA} \\times \\text{Leverage Multiple}}{\\text{Interest Coverage Ratio}}",
          equity_multiple: "\\text{Equity Multiple} = \\frac{\\text{Exit Value}}{\\text{Initial Equity Investment}}",
          cash_flow_waterfall: "\\text{Free Cash} = \\text{EBITDA} - \\text{Interest} - \\text{Taxes} - \\text{Capex} - \\Delta \\text{NWC}"
        },
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
      id: "three-statement",
      title: "Three-Statement Model",
      icon: FileText,
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
      id: "monte-carlo",
      title: "Monte Carlo Simulation",
      icon: Target,
      description: "A statistical method that uses random sampling to model uncertainty and risk in financial projections.",
      details: {
        howItWorks: "Runs thousands of simulations with random inputs to generate a distribution of possible outcomes and assess risk.",
        keyComponents: ["Input Variables", "Probability Distributions", "Simulation Runs", "Risk Metrics"],
        useCases: ["Risk assessment", "Portfolio optimization", "Project evaluation", "Stress testing"],
        formulas: {
          var: "\\text{VaR}_{\\alpha} = F^{-1}(\\alpha) ",
          expected_shortfall: "\\text{ES}_{\\alpha} = \\frac{1}{1-\\alpha} \\int_{\\alpha}^{1} \\text{VaR}_u \\, du",
          monte_carlo_estimate: "\\hat{E}[f(X)] = \\frac{1}{N} \\sum_{i=1}^{N} f(X_i)",
          confidence_interval: "\\text{CI} = \\hat{\\mu} \\pm z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{N}}"
        },
       // \\text{ where } F \\text{ is the cumulative distribution}
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
      id: "sensitivity",
      title: "Sensitivity Analysis",
      icon: PieChart,
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
            <h1 className="text-6xl lg:text-7xl font-black mb-8 text-foreground">
              Financial Modeling
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Master the art of building comprehensive financial models for valuation, forecasting, and investment analysis
            </p>
            
          </div>
        </div>

        {/* Financial Models Section */}
        <div id="models" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          

          <div className="space-y-8">
            {modelingTopics.map((topic, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:bg-muted transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground mb-6 text-lg">{topic.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-primary mb-3">How It Works</h4>
                        <p className="text-muted-foreground text-sm mb-4">{topic.details.howItWorks}</p>
                        
                        <h4 className="text-lg font-semibold text-primary mb-3">Key Components</h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          {topic.details.keyComponents.map((component, idx) => (
                            <li key={idx}>• {component}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-lg font-semibold text-primary mb-3">Financial Use Cases</h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          {topic.details.useCases.map((useCase, idx) => (
                            <li key={idx}>• {useCase}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <div className="bg-input rounded-lg border border-border overflow-hidden">
                          {/* Tab Headers */}
                          <div className="flex border-b border-border">
                            {topic.details.formulas && (
                              <button
                                onClick={() => setActiveTab(topic.id, 'formulas')}
                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                  activeTabs[topic.id] === 'formulas' || (!activeTabs[topic.id] && topic.details.formulas)
                                    ? 'bg-primary/15 text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  Math Formulas
                                </div>
                              </button>
                            )}
                            <button
                              onClick={() => setActiveTab(topic.id, 'code')}
                              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTabs[topic.id] === 'code' || (!activeTabs[topic.id] && !topic.details.formulas)
                                  ? 'bg-primary/15 text-primary border-b-2 border-primary'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                Code Example
                              </div>
                            </button>
                          </div>

                          {/* Tab Content */}
                          <div className="p-6">
                            {(activeTabs[topic.id] === 'formulas' || (!activeTabs[topic.id] && topic.details.formulas)) && topic.details.formulas && (
                              <div className="space-y-6">
                                {Object.entries(topic.details.formulas).map(([key, formula]) => (
                                  <div key={key} className="bg-card rounded-lg p-6 border border-border">
                                    <div className="text-foreground text-lg mb-4 font-semibold capitalize">
                                      {key.replace(/_/g, ' ')}:
                                    </div>
                                    <div className="bg-input rounded-md p-4 border border-border">
                                      <div className="text-center">
                                        <BlockMath math={formula} />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {(activeTabs[topic.id] === 'code' || (!activeTabs[topic.id] && !topic.details.formulas)) && (
                              <div className="bg-card rounded-lg border border-border">
                                <div className="bg-muted px-4 py-3 border-b border-border rounded-t-lg">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                    <div className="w-3 h-3 bg-primary/70 rounded-full"></div>
                                    <div className="w-3 h-3 bg-primary/50 rounded-full"></div>
                                    <span className="text-muted-foreground text-sm ml-2 font-medium">Python</span>
                                  </div>
                                </div>
                                <div className="p-6">
                                  <pre className="text-muted-foreground text-sm overflow-x-auto leading-relaxed">
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
            <h2 className="text-4xl font-bold text-foreground mb-4">💼 Professional Applications</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Discover how financial modeling is applied across different areas of finance and investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border hover:bg-muted transition-colors">
                <h3 className="text-xl font-bold text-foreground mb-3">{app.title}</h3>
                <p className="text-muted-foreground mb-4">{app.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Common Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/15 text-primary text-xs rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-input rounded-lg p-3 border border-border">
                  <h4 className="text-sm font-semibold text-primary mb-1">Example</h4>
                  <p className="text-muted-foreground text-sm">{app.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">• Learning Path</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="text-2xl mb-2">1</div>
                <h4 className="text-foreground font-semibold mb-2">Excel Fundamentals</h4>
                <p className="text-muted-foreground text-sm">Formulas, functions, and best practices</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-foreground font-semibold mb-2">Basic Models</h4>
                <p className="text-muted-foreground text-sm">DCF, Comparable Analysis</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-foreground font-semibold mb-2">Advanced Models</h4>
                <p className="text-muted-foreground text-sm">LBO, Three-Statement Models</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-foreground font-semibold mb-2">Risk Analysis</h4>
                <p className="text-muted-foreground text-sm">Monte Carlo, Sensitivity Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Software Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">🛠️ Essential Tools & Software</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">Excel</h4>
                <p className="text-muted-foreground text-xs">Primary modeling platform</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Database className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">Python</h4>
                <p className="text-muted-foreground text-xs">Advanced modeling & analysis</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">Bloomberg Terminal</h4>
                <p className="text-muted-foreground text-xs">Market data & analytics</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">FactSet</h4>
                <p className="text-muted-foreground text-xs">Financial data platform</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">@RISK</h4>
                <p className="text-muted-foreground text-xs">Risk analysis add-in</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <PieChart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">Tableau</h4>
                <p className="text-muted-foreground text-xs">Data visualization</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">Power BI</h4>
                <p className="text-muted-foreground text-xs">Business intelligence</p>
              </div>
              <div className="bg-muted rounded-xl p-4 border border-border text-center">
                <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-foreground font-semibold mb-1">VBA</h4>
                <p className="text-muted-foreground text-xs">Excel automation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Master Financial Modeling?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start building professional-grade financial models that will set you apart in investment banking, private equity, and corporate finance.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/learn/statistics-probability">
                Start with Statistics
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-muted hover:bg-muted/80"
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
