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
  Percent,
  Users,
  Calendar,
  TrendingDown,
  Building,
  Globe,
  Code2,
  FunctionSquare
} from "lucide-react";

export default function BusinessMetricsLearnPage() {
  const [activeSection, setActiveSection] = useState('bookings');
  const [viewMode, setViewMode] = useState<'formula' | 'code'>('formula');

  const sections = [
    { id: 'bookings', title: 'Bookings', icon: DollarSign },
    { id: 'revenue', title: 'Revenue', icon: TrendingUp },
    { id: 'arr', title: 'ARR', icon: Target },
    { id: 'mrr', title: 'MRR', icon: Calendar },
    { id: 'cac', title: 'CAC', icon: Users },
    { id: 'churn', title: 'Churn', icon: TrendingDown },
    { id: 'tam', title: 'TAM', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none z-5"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Business Metrics
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master the essential financial metrics that drive business success. Learn formulas, calculations, and implementation strategies.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            
            {/* Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-[#1877F2] text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {section.title}
                  </button>
                );
              })}
            </div>


            {/* Content */}
            <div className="space-y-12">
              {activeSection === 'bookings' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-blue-400" />
                    Bookings
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What are Bookings?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Bookings represent the total value of contracts or sales agreements signed during a specific period, 
                        regardless of when the revenue is actually recognized. This is a leading indicator of business growth.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Key Characteristics:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Measured when contract is signed</li>
                          <li>• Includes both new and expansion bookings</li>
                          <li>• Can be one-time or recurring</li>
                          <li>• Often includes multi-year contracts</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'Formula' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div>
                          <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                            <BlockMath math="\text{Bookings} = \sum_{i=1}^{n} \text{Contract Value}_i" />
                          </div>
                          <p className="text-gray-300 mb-4">Where:</p>
                          <ul className="text-gray-300 space-y-1 ml-4">
                            <li>• <InlineMath math="n" /> = Number of contracts signed</li>
                            <li>• <InlineMath math="\text{Contract Value}_i" /> = Total value of contract i</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate total bookings for a period
function calculateBookings(contracts) {
  return contracts.reduce((total, contract) => {
    return total + contract.value;
  }, 0);
}

// Example usage
const contracts = [
  { id: 1, value: 50000, type: 'new' },
  { id: 2, value: 25000, type: 'expansion' },
  { id: 3, value: 100000, type: 'new' }
];

const totalBookings = calculateBookings(contracts);
console.log(\`Total Bookings: $\${totalBookings.toLocaleString()}\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">Types of Bookings</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-blue-400 mb-2">New Bookings</h4>
                          <p className="text-gray-300 text-sm">Revenue from new customers acquired during the period.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-green-400 mb-2">Expansion Bookings</h4>
                          <p className="text-gray-300 text-sm">Additional revenue from existing customers upgrading or adding services.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-purple-400 mb-2">Renewal Bookings</h4>
                          <p className="text-gray-300 text-sm">Revenue from customers renewing their existing contracts.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-orange-400 mb-2">Upsell Bookings</h4>
                          <p className="text-gray-300 text-sm">Revenue from customers purchasing additional products or services.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'revenue' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    Revenue
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is Revenue?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Revenue is the total amount of money earned from business operations during a specific period. 
                        It's recognized when goods are delivered or services are performed, following accounting principles.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Revenue Recognition Principles:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Performance obligation satisfied</li>
                          <li>• Control transferred to customer</li>
                          <li>• Price is determinable</li>
                          <li>• Collection is probable</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'Revenue Types' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">Recurring Revenue</h4>
                            <BlockMath math="\text{Recurring Revenue} = \sum_{i=1}^{n} \text{Monthly Fee}_i \times \text{Number of Customers}_i" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">One-time Revenue</h4>
                            <BlockMath math="\text{One-time Revenue} = \sum_{i=1}^{n} \text{Project Value}_i" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">Total Revenue</h4>
                            <BlockMath math="\text{Total Revenue} = \text{Recurring Revenue} + \text{One-time Revenue}" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate monthly recurring revenue
function calculateMRR(customers) {
  return customers.reduce((total, customer) => {
    return total + (customer.monthlyFee * customer.quantity);
  }, 0);
}

// Calculate total revenue for a period
function calculateTotalRevenue(recurringRevenue, oneTimeRevenue) {
  return recurringRevenue + oneTimeRevenue;
}

// Revenue growth rate
function calculateRevenueGrowth(currentRevenue, previousRevenue) {
  if (previousRevenue === 0) return 0;
  return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
}

// Example usage
const customers = [
  { monthlyFee: 100, quantity: 50 },
  { monthlyFee: 250, quantity: 20 },
  { monthlyFee: 500, quantity: 10 }
];

const mrr = calculateMRR(customers);
const oneTimeRevenue = 50000;
const totalRevenue = calculateTotalRevenue(mrr, oneTimeRevenue);

console.log(\`MRR: $\${mrr.toLocaleString()}\`);
console.log(\`Total Revenue: $\${totalRevenue.toLocaleString()}\`);`}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'arr' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Target className="w-8 h-8 text-purple-400" />
                    Annual Recurring Revenue (ARR)
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is ARR?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        ARR is the annualized value of all recurring revenue from subscriptions, contracts, and other 
                        recurring revenue streams. It's a key metric for SaaS and subscription businesses.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Why ARR Matters:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Predictable revenue stream</li>
                          <li>• Growth measurement</li>
                          <li>• Valuation basis</li>
                          <li>• Investor confidence</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'ARR Calculation' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">From MRR</h4>
                            <BlockMath math="\text{ARR} = \text{MRR} \times 12" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">From Individual Contracts</h4>
                            <BlockMath math="\text{ARR} = \sum_{i=1}^{n} \frac{\text{Contract Value}_i}{\text{Contract Duration}_i} \times 12" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">ARR per Customer</h4>
                            <BlockMath math="\text{ARR per Customer} = \frac{\text{ARR}}{\text{Number of Customers}}" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate ARR from MRR
function calculateARRFromMRR(mrr) {
  return mrr * 12;
}

// Calculate ARR from contracts
function calculateARRFromContracts(contracts) {
  return contracts.reduce((total, contract) => {
    const annualValue = (contract.value / contract.durationInMonths) * 12;
    return total + annualValue;
  }, 0);
}

// Calculate ARR per customer
function calculateARRPerCustomer(arr, customerCount) {
  return customerCount > 0 ? arr / customerCount : 0;
}

// ARR growth rate
function calculateARRGrowth(currentARR, previousARR) {
  if (previousARR === 0) return 0;
  return ((currentARR - previousARR) / previousARR) * 100;
}

// Example usage
const mrr = 50000;
const arr = calculateARRFromMRR(mrr);
const customerCount = 200;
const arrPerCustomer = calculateARRPerCustomer(arr, customerCount);

console.log(\`ARR: $\${arr.toLocaleString()}\`);
console.log(\`ARR per Customer: $\${arrPerCustomer.toLocaleString()}\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">ARR Components</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-blue-400 mb-2">New ARR</h4>
                          <p className="text-gray-300 text-sm">ARR from new customers acquired during the period.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-green-400 mb-2">Expansion ARR</h4>
                          <p className="text-gray-300 text-sm">Additional ARR from existing customers upgrading their plans.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-red-400 mb-2">Churn ARR</h4>
                          <p className="text-gray-300 text-sm">ARR lost due to customer cancellations or downgrades.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-purple-400 mb-2">Net ARR Growth</h4>
                          <p className="text-gray-300 text-sm">Net change in ARR: New + Expansion - Churn.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'mrr' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-400" />
                    Monthly Recurring Revenue (MRR)
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is MRR?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        MRR is the predictable monthly revenue from all active subscriptions and recurring revenue streams. 
                        It's the foundation for calculating ARR and measuring business growth.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">MRR Characteristics:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Measured monthly</li>
                          <li>• Predictable and recurring</li>
                          <li>• Excludes one-time revenue</li>
                          <li>• Key growth metric</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'MRR Calculation' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">Basic MRR</h4>
                            <BlockMath math="\text{MRR} = \sum_{i=1}^{n} \text{Monthly Subscription Value}_i" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">From Annual Plans</h4>
                            <BlockMath math="\text{MRR} = \sum_{i=1}^{n} \frac{\text{Annual Plan Value}_i}{12}" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">MRR Growth Rate</h4>
                            <BlockMath math="\text{MRR Growth} = \frac{\text{Current MRR} - \text{Previous MRR}}{\text{Previous MRR}} \times 100\%" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate MRR from subscriptions
function calculateMRR(subscriptions) {
  return subscriptions.reduce((total, subscription) => {
    return total + subscription.monthlyValue;
  }, 0);
}

// Calculate MRR from annual plans
function calculateMRRFromAnnual(annualPlans) {
  return annualPlans.reduce((total, plan) => {
    return total + (plan.annualValue / 12);
  }, 0);
}

// Calculate MRR growth
function calculateMRRGrowth(currentMRR, previousMRR) {
  if (previousMRR === 0) return 0;
  return ((currentMRR - previousMRR) / previousMRR) * 100;
}

// Calculate MRR per customer
function calculateMRRPerCustomer(mrr, customerCount) {
  return customerCount > 0 ? mrr / customerCount : 0;
}

// Example usage
const subscriptions = [
  { monthlyValue: 100, customerId: 1 },
  { monthlyValue: 250, customerId: 2 },
  { monthlyValue: 500, customerId: 3 }
];

const mrr = calculateMRR(subscriptions);
const customerCount = subscriptions.length;
const mrrPerCustomer = calculateMRRPerCustomer(mrr, customerCount);

console.log(\`MRR: $\${mrr.toLocaleString()}\`);
console.log(\`MRR per Customer: $\${mrrPerCustomer.toLocaleString()}\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">MRR Types</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-blue-400 mb-2">New MRR</h4>
                          <p className="text-gray-300 text-sm">MRR from new customers acquired during the month.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-green-400 mb-2">Expansion MRR</h4>
                          <p className="text-gray-300 text-sm">Additional MRR from existing customers upgrading.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-red-400 mb-2">Churn MRR</h4>
                          <p className="text-gray-300 text-sm">MRR lost due to customer cancellations.</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-purple-400 mb-2">Net MRR Growth</h4>
                          <p className="text-gray-300 text-sm">Net change: New + Expansion - Churn.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'cac' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Users className="w-8 h-8 text-orange-400" />
                    Customer Acquisition Cost (CAC)
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is CAC?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        CAC is the total cost of acquiring a new customer, including all marketing and sales expenses. 
                        It's a crucial metric for understanding the efficiency of your customer acquisition strategy.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">CAC Components:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Marketing spend</li>
                          <li>• Sales team costs</li>
                          <li>• Tools and software</li>
                          <li>• Overhead allocation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'CAC Calculation' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">Basic CAC</h4>
                            <BlockMath math="\text{CAC} = \frac{\text{Total Acquisition Costs}}{\text{Number of New Customers}}" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">CAC by Channel</h4>
                            <BlockMath math="\text{CAC}_{\text{channel}} = \frac{\text{Channel Spend}}{\text{Customers from Channel}}" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">CAC Payback Period</h4>
                            <BlockMath math="\text{Payback Period} = \frac{\text{CAC}}{\text{Monthly Revenue per Customer}}" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate basic CAC
function calculateCAC(totalAcquisitionCosts, newCustomers) {
  return newCustomers > 0 ? totalAcquisitionCosts / newCustomers : 0;
}

// Calculate CAC by channel
function calculateCACByChannel(channelData) {
  return channelData.map(channel => ({
    channel: channel.name,
    cac: channel.spend / channel.customers,
    customers: channel.customers,
    spend: channel.spend
  }));
}

// Calculate CAC payback period
function calculateCACPaybackPeriod(cac, monthlyRevenuePerCustomer) {
  return monthlyRevenuePerCustomer > 0 ? cac / monthlyRevenuePerCustomer : 0;
}

// Calculate blended vs paid CAC
function calculateBlendedCAC(totalSpend, totalCustomers) {
  return totalCustomers > 0 ? totalSpend / totalCustomers : 0;
}

// Example usage
const acquisitionData = {
  totalSpend: 100000,
  newCustomers: 200,
  monthlyRevenuePerCustomer: 100
};

const cac = calculateCAC(acquisitionData.totalSpend, acquisitionData.newCustomers);
const paybackPeriod = calculateCACPaybackPeriod(cac, acquisitionData.monthlyRevenuePerCustomer);

console.log(\`CAC: $\${cac.toLocaleString()}\`);
console.log(\`Payback Period: \${paybackPeriod.toFixed(1)} months\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">CAC Optimization</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-blue-400 mb-2">Lower CAC</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Improve conversion rates</li>
                            <li>• Optimize marketing channels</li>
                            <li>• Increase organic acquisition</li>
                            <li>• Improve sales efficiency</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-green-400 mb-2">CAC Benchmarks</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• SaaS: 1-3x LTV</li>
                            <li>• E-commerce: 20-30% of LTV</li>
                            <li>• B2B: 3-5x LTV</li>
                            <li>• Payback: 6-12 months</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'churn' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <TrendingDown className="w-8 h-8 text-red-400" />
                    Churn Rate
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is Churn?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        Churn rate measures the percentage of customers who stop using your service during a given period. 
                        It's a critical metric for understanding customer retention and business health.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">Types of Churn:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Customer churn (headcount)</li>
                          <li>• Revenue churn (value)</li>
                          <li>• Gross churn (total losses)</li>
                          <li>• Net churn (net losses)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'Churn Calculations' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">Customer Churn Rate</h4>
                            <BlockMath math="\text{Customer Churn Rate} = \frac{\text{Customers Lost}}{\text{Total Customers at Start}} \times 100\%" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">Revenue Churn Rate</h4>
                            <BlockMath math="\text{Revenue Churn Rate} = \frac{\text{Revenue Lost}}{\text{Total Revenue at Start}} \times 100\%" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">Monthly Unit Churn</h4>
                            <BlockMath math="\text{Monthly Unit Churn} = \frac{\text{Customers Lost This Month}}{\text{Customers at Start of Month}} \times 100\%" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-orange-400 mb-2">Gross MRR Churn</h4>
                            <BlockMath math="\text{Gross MRR Churn} = \frac{\text{MRR Lost}}{\text{MRR at Start of Month}} \times 100\%" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-red-400 mb-2">Net MRR Churn</h4>
                            <BlockMath math="\text{Net MRR Churn} = \frac{\text{MRR Lost} - \text{MRR Gained}}{\text{MRR at Start of Month}} \times 100\%" />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Calculate customer churn rate
function calculateCustomerChurnRate(customersLost, totalCustomersAtStart) {
  return totalCustomersAtStart > 0 ? (customersLost / totalCustomersAtStart) * 100 : 0;
}

// Calculate revenue churn rate
function calculateRevenueChurnRate(revenueLost, totalRevenueAtStart) {
  return totalRevenueAtStart > 0 ? (revenueLost / totalRevenueAtStart) * 100 : 0;
}

// Calculate monthly unit churn
function calculateMonthlyUnitChurn(customersLostThisMonth, customersAtStartOfMonth) {
  return customersAtStartOfMonth > 0 ? (customersLostThisMonth / customersAtStartOfMonth) * 100 : 0;
}

// Calculate gross MRR churn
function calculateGrossMRRChurn(mrrLost, mrrAtStartOfMonth) {
  return mrrAtStartOfMonth > 0 ? (mrrLost / mrrAtStartOfMonth) * 100 : 0;
}

// Calculate net MRR churn
function calculateNetMRRChurn(mrrLost, mrrGained, mrrAtStartOfMonth) {
  return mrrAtStartOfMonth > 0 ? ((mrrLost - mrrGained) / mrrAtStartOfMonth) * 100 : 0;
}

// Example usage
const churnData = {
  customersLost: 20,
  totalCustomersAtStart: 1000,
  revenueLost: 5000,
  totalRevenueAtStart: 100000,
  mrrLost: 2000,
  mrrGained: 500,
  mrrAtStartOfMonth: 50000
};

const customerChurn = calculateCustomerChurnRate(churnData.customersLost, churnData.totalCustomersAtStart);
const revenueChurn = calculateRevenueChurnRate(churnData.revenueLost, churnData.totalRevenueAtStart);
const netMRRChurn = calculateNetMRRChurn(churnData.mrrLost, churnData.mrrGained, churnData.mrrAtStartOfMonth);

console.log(\`Customer Churn: \${customerChurn.toFixed(2)}%\`);
console.log(\`Revenue Churn: \${revenueChurn.toFixed(2)}%\`);
console.log(\`Net MRR Churn: \${netMRRChurn.toFixed(2)}%\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">Churn Benchmarks</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-blue-400 mb-2">Good Churn Rates</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• SaaS: 5-7% annually</li>
                            <li>• B2B: 3-5% annually</li>
                            <li>• B2C: 10-15% annually</li>
                            <li>• Enterprise: 1-3% annually</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-green-400 mb-2">Reducing Churn</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Improve onboarding</li>
                            <li>• Regular check-ins</li>
                            <li>• Feature adoption</li>
                            <li>• Customer success programs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'tam' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-8 h-8 text-cyan-400" />
                    Total Addressable Market (TAM)
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">What is TAM?</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        TAM represents the total revenue opportunity available for a product or service. It's the maximum 
                        revenue a company could achieve if it captured 100% market share.
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="text-lg font-medium text-white mb-2">TAM Analysis Methods:</h4>
                        <ul className="text-gray-300 space-y-1">
                          <li>• Top-down analysis</li>
                          <li>• Bottom-up analysis</li>
                          <li>• Value theory approach</li>
                          <li>• Market research data</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {viewMode === 'formula' ? 'TAM Calculation Methods' : 'Code Implementation'}
                        </h3>
                        <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => setViewMode('formula')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'formula'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <FunctionSquare className="w-3 h-3" />
                            Formula
                          </button>
                          <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 text-sm ${
                              viewMode === 'code'
                                ? 'bg-[#1877F2] text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                          >
                            <Code2 className="w-3 h-3" />
                            Code
                          </button>
                        </div>
                      </div>
                      
                      {viewMode === 'formula' ? (
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-medium text-blue-400 mb-2">Top-Down Analysis</h4>
                            <BlockMath math="\text{TAM} = \text{Total Market Size} \times \text{Addressable Percentage}" />
                            <p className="text-gray-300 text-sm mt-2">Uses industry reports and market research to estimate total market size.</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-green-400 mb-2">Bottom-Up Analysis</h4>
                            <BlockMath math="\text{TAM} = \sum_{i=1}^{n} (\text{Customer Segment}_i \times \text{Average Price}_i \times \text{Market Penetration}_i)" />
                            <p className="text-gray-300 text-sm mt-2">Calculates TAM by analyzing individual customer segments and pricing.</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-purple-400 mb-2">Value Theory Approach</h4>
                            <BlockMath math="\text{TAM} = \text{Total Value Created} \times \text{Value Capture Rate}" />
                            <p className="text-gray-300 text-sm mt-2">Estimates TAM based on the total value created for customers.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
{`// Top-down TAM calculation
function calculateTopDownTAM(totalMarketSize, addressablePercentage) {
  return totalMarketSize * (addressablePercentage / 100);
}

// Bottom-up TAM calculation
function calculateBottomUpTAM(customerSegments) {
  return customerSegments.reduce((total, segment) => {
    const segmentTAM = segment.customerCount * segment.averagePrice * segment.marketPenetration;
    return total + segmentTAM;
  }, 0);
}

// Value theory TAM calculation
function calculateValueTheoryTAM(totalValueCreated, valueCaptureRate) {
  return totalValueCreated * (valueCaptureRate / 100);
}

// Calculate SAM (Serviceable Addressable Market)
function calculateSAM(tam, serviceablePercentage) {
  return tam * (serviceablePercentage / 100);
}

// Calculate SOM (Serviceable Obtainable Market)
function calculateSOM(sam, obtainablePercentage) {
  return sam * (obtainablePercentage / 100);
}

// Example usage
const marketData = {
  totalMarketSize: 1000000000, // $1B
  addressablePercentage: 20, // 20%
  serviceablePercentage: 5, // 5% of TAM
  obtainablePercentage: 10 // 10% of SAM
};

const tam = calculateTopDownTAM(marketData.totalMarketSize, marketData.addressablePercentage);
const sam = calculateSAM(tam, marketData.serviceablePercentage);
const som = calculateSOM(sam, marketData.obtainablePercentage);

console.log(\`TAM: $\${tam.toLocaleString()}\`);
console.log(\`SAM: $\${sam.toLocaleString()}\`);
console.log(\`SOM: $\${som.toLocaleString()}\`);`}
                          </pre>
                        </div>
                      )}
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4">Market Sizing Framework</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-900/20 rounded-lg p-4">
                          <h4 className="text-lg font-medium text-blue-400 mb-2">TAM (Total Addressable Market)</h4>
                          <p className="text-gray-300 text-sm">The total revenue opportunity if you captured 100% market share.</p>
                        </div>
                        <div className="bg-green-900/20 rounded-lg p-4">
                          <h4 className="text-lg font-medium text-green-400 mb-2">SAM (Serviceable Addressable Market)</h4>
                          <p className="text-gray-300 text-sm">The portion of TAM that you can realistically serve with your product.</p>
                        </div>
                        <div className="bg-purple-900/20 rounded-lg p-4">
                          <h4 className="text-lg font-medium text-purple-400 mb-2">SOM (Serviceable Obtainable Market)</h4>
                          <p className="text-gray-300 text-sm">The portion of SAM you can realistically capture (typically 1-10%).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
