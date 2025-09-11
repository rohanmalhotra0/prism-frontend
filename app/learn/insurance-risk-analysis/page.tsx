"use client";

import { useState } from 'react';
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function InsuranceRiskAnalysisPage() {
  const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

  const setActiveTab = (topicId: string, tab: string) => {
    setActiveTabs(prev => ({ ...prev, [topicId]: tab }));
  };

  const riskTopics = [
    {
      id: "actuarial-science",
      title: "Actuarial Science",
      icon: "🧮",
      description: "The discipline that applies mathematical and statistical methods to assess risk in insurance and finance.",
      details: {
        howItWorks: "Uses probability theory, statistics, and financial mathematics to evaluate uncertain future events and their financial impact.",
        keyComponents: ["Mortality Tables", "Life Contingencies", "Premium Calculation", "Reserve Setting", "Risk Assessment"],
        useCases: ["Life insurance pricing", "Pension fund management", "Health insurance", "Annuity products"],
        formulas: {
          actuarial_present_value: "\\text{APV} = \\sum_{t=1}^{\\infty} v^t \\cdot {}_t p_x \\cdot b_t",
          net_premium: "P = \\frac{\\sum_{t=1}^{n} v^t \\cdot {}_t p_x \\cdot b_t}{\\sum_{t=0}^{n-1} v^t \\cdot {}_t p_x}",
          reserve: "V_t = \\sum_{s=t+1}^{n} v^{s-t} \\cdot {}_{s-t} p_{x+t} \\cdot b_s - P \\sum_{s=t}^{n-1} v^{s-t} \\cdot {}_{s-t} p_{x+t}",
          force_of_mortality: "\\mu_x = -\\frac{d}{dx} \\ln S(x) = \\frac{f(x)}{S(x)}"
        },
        codeExample: `import numpy as np
import pandas as pd

def actuarial_present_value(age, interest_rate, mortality_table):
    """
    Calculate actuarial present value for life insurance
    """
    # Life expectancy calculation
    remaining_life = mortality_table[mortality_table['age'] >= age]['remaining_life'].iloc[0]
    
    # Present value factors
    pv_factors = []
    for year in range(1, int(remaining_life) + 1):
        # Probability of survival to year t
        prob_survival = mortality_table[mortality_table['age'] == age + year]['survival_prob'].iloc[0]
        
        # Present value factor
        pv_factor = prob_survival / ((1 + interest_rate) ** year)
        pv_factors.append(pv_factor)
    
    # Actuarial present value
    apv = sum(pv_factors)
    
    return apv

def premium_calculation(sum_assured, age, term, interest_rate, mortality_table):
    """
    Calculate level premium for term life insurance
    """
    # Actuarial present value of benefits
    apv_benefits = sum_assured * actuarial_present_value(age, interest_rate, mortality_table)
    
    # Actuarial present value of premiums
    apv_premiums = actuarial_present_value(age, interest_rate, mortality_table)
    
    # Level premium
    level_premium = apv_benefits / apv_premiums
    
    return level_premium`
      }
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      icon: "•",
      description: "The process of identifying, analyzing, and evaluating risks to determine appropriate risk management strategies.",
      details: {
        howItWorks: "Systematically identifies potential risks, quantifies their probability and impact, and prioritizes them for management action.",
        keyComponents: ["Risk Identification", "Risk Measurement", "Risk Evaluation", "Risk Monitoring", "Risk Reporting"],
        useCases: ["Underwriting decisions", "Portfolio management", "Regulatory compliance", "Capital allocation"],
        formulas: {
          risk_score: "R = P \\times I",
          value_at_risk: "\\text{VaR}_\\alpha = F^{-1}(\\alpha)",
          expected_shortfall: "\\text{ES}_\\alpha = \\frac{1}{1-\\alpha} \\int_\\alpha^1 \\text{VaR}_u \\, du",
          risk_adjusted_return: "\\text{RAR} = \\frac{\\text{Return} - \\text{Risk-free Rate}}{\\text{Risk Measure}}"
        },
        codeExample: `def risk_assessment_framework(risks_data):
    """
    Comprehensive risk assessment framework
    """
    # Risk scoring matrix
    def calculate_risk_score(probability, impact):
        return probability * impact
    
    # Risk categories
    risk_categories = {
        'credit_risk': {'probability': 0.3, 'impact': 8, 'mitigation': 'Diversification'},
        'market_risk': {'probability': 0.4, 'impact': 6, 'mitigation': 'Hedging'},
        'operational_risk': {'probability': 0.2, 'impact': 7, 'mitigation': 'Controls'},
        'liquidity_risk': {'probability': 0.1, 'impact': 9, 'mitigation': 'Reserves'}
    }
    
    # Calculate risk scores
    risk_scores = {}
    for risk, data in risk_categories.items():
        score = calculate_risk_score(data['probability'], data['impact'])
        risk_scores[risk] = {
            'score': score,
            'probability': data['probability'],
            'impact': data['impact'],
            'mitigation': data['mitigation']
        }
    
    # Risk prioritization
    sorted_risks = sorted(risk_scores.items(), key=lambda x: x[1]['score'], reverse=True)
    
    return {
        'risk_scores': risk_scores,
        'prioritized_risks': sorted_risks,
        'total_risk_score': sum(score['score'] for score in risk_scores.values())
    }`
      }
    },
    {
      id: "pricing-models",
      title: "Pricing Models",
      icon: "•",
      description: "Mathematical models used to determine appropriate premiums and pricing for insurance products.",
      details: {
        howItWorks: "Combines actuarial principles with statistical modeling to estimate expected claims and set competitive premiums.",
        keyComponents: ["Expected Claims", "Loading Factors", "Profit Margins", "Competition Analysis", "Regulatory Requirements"],
        useCases: ["Product pricing", "Rate setting", "Profitability analysis", "Market positioning"],
        formulas: {
          pure_premium: "\\text{Pure Premium} = \\frac{\\text{Expected Claims}}{\\text{Exposure Units}}",
          gross_premium: "\\text{Gross Premium} = \\text{Pure Premium} \\times (1 + \\text{Loading Factor})",
          loading_factor: "L = L_E + L_C + L_P",
          credibility_premium: "P = Z \\cdot \\bar{X} + (1-Z) \\cdot M"
        },
        codeExample: `def insurance_pricing_model(historical_claims, exposure_units, target_profit_margin):
    """
    Insurance pricing model with multiple factors
    """
    # Calculate pure premium (expected claims per exposure unit)
    total_claims = sum(historical_claims)
    total_exposure = sum(exposure_units)
    pure_premium = total_claims / total_exposure
    
    # Add loading factors
    expense_loading = 0.15  # 15% for expenses
    contingency_loading = 0.10  # 10% for contingencies
    profit_loading = target_profit_margin
    
    # Calculate gross premium
    gross_premium = pure_premium * (1 + expense_loading + contingency_loading + profit_loading)
    
    # Risk adjustment factors
    risk_factors = {
        'age_factor': 1.2,  # Higher risk for certain age groups
        'location_factor': 1.1,  # Geographic risk adjustment
        'deductible_factor': 0.9  # Lower premium for higher deductibles
    }
    
    # Apply risk factors
    adjusted_premium = gross_premium
    for factor_name, factor_value in risk_factors.items():
        adjusted_premium *= factor_value
    
    return {
        'pure_premium': pure_premium,
        'gross_premium': gross_premium,
        'adjusted_premium': adjusted_premium,
        'risk_factors': risk_factors
    }`
      }
    },
    {
      id: "reserve-setting",
      title: "Reserve Setting",
      icon: "•",
      description: "The process of setting aside funds to cover future claims and obligations in insurance and pension funds.",
      details: {
        howItWorks: "Uses actuarial methods to estimate future liabilities and determine appropriate reserve levels to ensure solvency.",
        keyComponents: ["Liability Estimation", "Discount Rates", "Mortality Assumptions", "Reserve Methods", "Regulatory Requirements"],
        useCases: ["Solvency management", "Regulatory compliance", "Financial planning", "Risk management"],
        formulas: {
          net_premium_reserve: "V_t = \\sum_{s=t+1}^{n} v^{s-t} \\cdot {}_{s-t} p_{x+t} \\cdot b_s - P \\sum_{s=t}^{n-1} v^{s-t} \\cdot {}_{s-t} p_{x+t}",
          gross_premium_reserve: "V_t^G = \\sum_{s=t+1}^{n} v^{s-t} \\cdot {}_{s-t} p_{x+t} \\cdot b_s - G \\sum_{s=t}^{n-1} v^{s-t} \\cdot {}_{s-t} p_{x+t}",
          terminal_reserve: "V_n = 0",
          initial_reserve: "V_0 = 0"
        },
        codeExample: `def reserve_calculation(policy_data, interest_rate, mortality_assumptions):
    """
    Calculate insurance reserves using various methods
    """
    # Net premium reserve method
    def net_premium_reserve(age, term, sum_assured, premium):
        # Present value of future benefits
        pv_benefits = 0
        for year in range(1, term + 1):
            prob_death = mortality_assumptions[f'q_{age + year - 1}']
            pv_benefits += sum_assured * prob_death / ((1 + interest_rate) ** year)
        
        # Present value of future premiums
        pv_premiums = 0
        for year in range(1, term + 1):
            prob_survival = 1 - mortality_assumptions[f'q_{age + year - 1}']
            pv_premiums += premium * prob_survival / ((1 + interest_rate) ** year)
        
        return pv_benefits - pv_premiums
    
    # Gross premium reserve method
    def gross_premium_reserve(age, term, sum_assured, gross_premium, expenses):
        # Similar to net premium but includes expenses
        pv_benefits = 0
        pv_premiums = 0
        pv_expenses = 0
        
        for year in range(1, term + 1):
            prob_death = mortality_assumptions[f'q_{age + year - 1}']
            prob_survival = 1 - prob_death
            
            pv_benefits += sum_assured * prob_death / ((1 + interest_rate) ** year)
            pv_premiums += gross_premium * prob_survival / ((1 + interest_rate) ** year)
            pv_expenses += expenses * prob_survival / ((1 + interest_rate) ** year)
        
        return pv_benefits - pv_premiums + pv_expenses
    
    # Calculate reserves for each policy
    reserves = []
    for policy in policy_data:
        net_reserve = net_premium_reserve(
            policy['age'], policy['term'], policy['sum_assured'], policy['premium']
        )
        gross_reserve = gross_premium_reserve(
            policy['age'], policy['term'], policy['sum_assured'], 
            policy['gross_premium'], policy['expenses']
        )
        
        reserves.append({
            'policy_id': policy['id'],
            'net_reserve': net_reserve,
            'gross_reserve': gross_reserve
        })
    
    return reserves`
      }
    },
    {
      id: "solvency-analysis",
      title: "Solvency Analysis",
      icon: "•",
      description: "The assessment of an insurer's ability to meet its financial obligations and regulatory capital requirements.",
      details: {
        howItWorks: "Compares available capital against required capital using various stress scenarios and regulatory frameworks.",
        keyComponents: ["Available Capital", "Required Capital", "Solvency Ratio", "Stress Testing", "Risk-Based Capital"],
        useCases: ["Regulatory compliance", "Financial stability", "Risk management", "Strategic planning"],
        formulas: {
          solvency_ratio: "\\text{Solvency Ratio} = \\frac{\\text{Available Capital}}{\\text{Required Capital}}",
          available_capital: "\\text{AC} = \\text{Assets} - \\text{Liabilities}",
          risk_based_capital: "\\text{RBC} = \\sqrt{\\sum_{i} \\text{RBC}_i^2 + \\sum_{i \\neq j} \\rho_{ij} \\text{RBC}_i \\text{RBC}_j}",
          capital_adequacy_ratio: "\\text{CAR} = \\frac{\\text{Tier 1 Capital} + \\text{Tier 2 Capital}}{\\text{Risk-Weighted Assets}}"
        },
        codeExample: `def solvency_analysis(assets, liabilities, regulatory_requirements):
    """
    Comprehensive solvency analysis
    """
    # Calculate available capital
    available_capital = assets - liabilities
    
    # Risk-based capital calculation
    def calculate_rbc(assets, liabilities, risk_factors):
        # Credit risk capital
        credit_risk_capital = assets * risk_factors['credit_risk']
        
        # Market risk capital
        market_risk_capital = assets * risk_factors['market_risk']
        
        # Operational risk capital
        operational_risk_capital = assets * risk_factors['operational_risk']
        
        # Total required capital
        total_rbc = credit_risk_capital + market_risk_capital + operational_risk_capital
        
        return total_rbc
    
    # Calculate required capital
    risk_factors = {
        'credit_risk': 0.08,  # 8% of assets
        'market_risk': 0.06,  # 6% of assets
        'operational_risk': 0.04  # 4% of assets
    }
    
    required_capital = calculate_rbc(assets, liabilities, risk_factors)
    
    # Solvency ratio
    solvency_ratio = available_capital / required_capital
    
    # Stress testing scenarios
    stress_scenarios = {
        'mild_recession': {'asset_decline': 0.10, 'liability_increase': 0.05},
        'severe_recession': {'asset_decline': 0.25, 'liability_increase': 0.15},
        'market_crash': {'asset_decline': 0.40, 'liability_increase': 0.20}
    }
    
    stress_results = {}
    for scenario, factors in stress_scenarios.items():
        stressed_assets = assets * (1 - factors['asset_decline'])
        stressed_liabilities = liabilities * (1 + factors['liability_increase'])
        stressed_capital = stressed_assets - stressed_liabilities
        stressed_ratio = stressed_capital / required_capital
        
        stress_results[scenario] = {
            'stressed_capital': stressed_capital,
            'stressed_ratio': stressed_ratio,
            'solvent': stressed_ratio > 1.0
        }
    
    return {
        'available_capital': available_capital,
        'required_capital': required_capital,
        'solvency_ratio': solvency_ratio,
        'solvent': solvency_ratio > 1.0,
        'stress_results': stress_results
    }`
      }
    },
    {
      id: "catastrophe-modeling",
      title: "Catastrophe Modeling",
      icon: "•",
      description: "Advanced modeling techniques for assessing and pricing catastrophic risks such as natural disasters.",
      details: {
        howItWorks: "Uses historical data, scientific models, and Monte Carlo simulation to estimate the frequency and severity of catastrophic events.",
        keyComponents: ["Event Frequency", "Loss Severity", "Geographic Exposure", "Monte Carlo Simulation", "Reinsurance"],
        useCases: ["Natural disaster insurance", "Reinsurance pricing", "Capital planning", "Risk management"],
        formulas: {
          poisson_frequency: "P(N = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
          pareto_severity: "f(x) = \\frac{\\alpha \\beta^\\alpha}{x^{\\alpha+1}} \\text{ for } x \\geq \\beta",
          probable_maximum_loss: "\\text{PML}_T = F^{-1}(1 - \\frac{1}{T})",
          expected_annual_loss: "\\text{EAL} = \\int_0^{\\infty} x \\cdot f(x) \\, dx"
        },
        codeExample: `import numpy as np
import pandas as pd

def catastrophe_modeling(exposure_data, historical_events, simulation_years=10000):
    """
    Catastrophe risk modeling using Monte Carlo simulation
    """
    # Event frequency modeling (Poisson process)
    def poisson_frequency(annual_rate, years):
        return np.random.poisson(annual_rate * years)
    
    # Loss severity modeling (Pareto distribution)
    def pareto_severity(scale, shape, n_events):
        return scale * (np.random.pareto(shape, n_events) + 1)
    
    # Historical event analysis
    historical_frequency = len(historical_events) / len(set([event['year'] for event in historical_events]))
    historical_severity = [event['loss'] for event in historical_events]
    
    # Fit severity distribution
    scale_param = np.mean(historical_severity)
    shape_param = 2.0  # Typical for catastrophe losses
    
    # Monte Carlo simulation
    simulation_results = []
    
    for _ in range(simulation_years):
        # Generate number of events
        n_events = poisson_frequency(historical_frequency, 1)
        
        if n_events > 0:
            # Generate loss amounts
            losses = pareto_severity(scale_param, shape_param, n_events)
            total_loss = np.sum(losses)
        else:
            total_loss = 0
        
        simulation_results.append(total_loss)
    
    # Calculate risk metrics
    simulation_results = np.array(simulation_results)
    
    # Probable Maximum Loss (PML) at different return periods
    pml_100 = np.percentile(simulation_results, 99)  # 100-year return period
    pml_250 = np.percentile(simulation_results, 99.6)  # 250-year return period
    pml_500 = np.percentile(simulation_results, 99.8)  # 500-year return period
    
    # Expected annual loss
    expected_annual_loss = np.mean(simulation_results)
    
    # Value at Risk (VaR)
    var_95 = np.percentile(simulation_results, 95)
    var_99 = np.percentile(simulation_results, 99)
    
    return {
        'expected_annual_loss': expected_annual_loss,
        'pml_100': pml_100,
        'pml_250': pml_250,
        'pml_500': pml_500,
        'var_95': var_95,
        'var_99': var_99,
        'simulation_results': simulation_results
    }`
      }
    }
  ];

  const applications = [
    {
      title: "Life Insurance",
      description: "Apply actuarial methods to price and manage life insurance products and annuities.",
      tools: ["Mortality Tables", "Actuarial Present Value", "Reserve Setting", "Pricing Models"],
      example: "Calculate level premiums for a 20-year term life insurance policy using mortality tables and interest rate assumptions."
    },
    {
      title: "Property & Casualty",
      description: "Use statistical methods to assess and price property and casualty insurance risks.",
      tools: ["Catastrophe Modeling", "Risk Assessment", "Pricing Models", "Reserve Setting"],
      example: "Model hurricane risk for coastal property insurance using historical data and Monte Carlo simulation."
    },
    {
      title: "Health Insurance",
      description: "Develop models for health insurance pricing, risk assessment, and claims management.",
      tools: ["Morbidity Tables", "Risk Adjustment", "Pricing Models", "Reserve Setting"],
      example: "Build a risk adjustment model to account for differences in health status across insurance populations."
    },
    {
      title: "Pension Funds",
      description: "Manage pension fund liabilities and assets using actuarial valuation methods.",
      tools: ["Actuarial Valuation", "Asset-Liability Matching", "Solvency Analysis", "Risk Management"],
      example: "Conduct an actuarial valuation of a defined benefit pension plan to determine funding requirements."
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
              Insurance Risk Analysis
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master actuarial science and risk management techniques for insurance and financial institutions
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="#topics">
                  Explore Topics
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

        {/* Risk Topics Section */}
        <div id="topics" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">• Core Risk Analysis Concepts</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learn essential actuarial science and risk management methods used in insurance and financial institutions.
            </p>
          </div>

          <div className="space-y-8">
            {riskTopics.map((topic, index) => (
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

                        <h4 className="text-lg font-semibold text-purple-400 mb-3">Financial Use Cases</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
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
                                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                                }`}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  Key Formulas
                                </div>
                              </button>
                            )}
                            <button
                              onClick={() => setActiveTab(topic.id, 'code')}
                              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                                activeTabs[topic.id] === 'code' || (!activeTabs[topic.id] && !topic.details.formulas)
                                  ? 'bg-yellow-500/20 text-yellow-400 border-b-2 border-yellow-400'
                                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
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
                                    <div className="text-gray-300 text-lg mb-4 font-semibold capitalize">
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
                                    <span className="text-gray-300 text-sm ml-2 font-medium">Python</span>
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
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover how actuarial science and risk analysis are applied across different areas of insurance and finance.
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
                <h4 className="text-white font-semibold mb-2">Probability</h4>
                <p className="text-gray-300 text-sm">Basic probability theory</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2</div>
                <h4 className="text-white font-semibold mb-2">Actuarial Math</h4>
                <p className="text-gray-300 text-sm">Life contingencies, annuities</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3</div>
                <h4 className="text-white font-semibold mb-2">Risk Models</h4>
                <p className="text-gray-300 text-sm">Pricing, reserving, solvency</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4</div>
                <h4 className="text-white font-semibold mb-2">Advanced Topics</h4>
                <p className="text-gray-300 text-sm">Catastrophe modeling, regulation</p>
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
                <h4 className="text-white font-semibold mb-1">R</h4>
                <p className="text-gray-400 text-xs">Statistical computing</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">Excel</h4>
                <p className="text-gray-400 text-xs">Spreadsheet modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">💼</div>
                <h4 className="text-white font-semibold mb-1">Moody's Analytics</h4>
                <p className="text-gray-400 text-xs">Risk modeling platform</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">RMS</h4>
                <p className="text-gray-400 text-xs">Catastrophe modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">AIR</h4>
                <p className="text-gray-400 text-xs">Catastrophe risk models</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">SAS</h4>
                <p className="text-gray-400 text-xs">Statistical analysis</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">•</div>
                <h4 className="text-white font-semibold mb-1">SPSS</h4>
                <p className="text-gray-400 text-xs">Statistical software</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Insurance Risk Analysis?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Build expertise in actuarial science and risk management techniques used by insurance companies and financial institutions.
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
