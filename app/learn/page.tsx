"use client";

import Navbar from "@/components/sections/navbar/default";
import Link from "next/link";

export const CATEGORIES = [
  { name: "Financial Modeling", slug: "financial-modeling", description: "Learn about DCF models, valuation techniques, and financial forecasting methods." },
  { name: "Options & Derivatives", slug: "options-derivatives", description: "Master Black-Scholes, binomial models, and options pricing strategies." },
  { name: "General Modeling", slug: "general-modeling", description: "Explore regression analysis, time series, and statistical modeling techniques." },
  { name: "Insurance Risk Analysis", slug: "insurance-risk-analysis", description: "Understand actuarial science, risk assessment, and insurance mathematics." },
  { name: "Crypto Modeling", slug: "crypto-modeling", description: "Dive into blockchain analysis, DeFi protocols, and cryptocurrency valuation." },
  { name: "Statistics & Probability", slug: "statistics-probability", description: "Build foundations in probability theory, distributions, and statistical inference." },
  { name: "Machine Learning", slug: "machine-learning", description: "Apply AI and ML techniques to financial data analysis and prediction." },
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
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Master the foundations of quantitative finance, modeling techniques, and data analysis
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat, idx) => {
                const isLast = idx === CATEGORIES.length - 1;
                return (
                  <div key={cat.slug} className={isLast ? "lg:col-start-2" : undefined}>
                    <Link href={`/learn/${cat.slug}`} className="block group">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                          {cat.name}
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {cat.description}
                        </p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                          <span>Explore →</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Learning Resources */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Getting Started</h3>
            <p className="text-gray-300 mb-6">
              New to quantitative finance? Start with our foundational courses and work your way up to advanced topics. 
              Each category includes interactive examples, real-world applications, and hands-on exercises.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-2">📚 Interactive Content</h4>
                <p className="text-gray-300 text-sm">Learn through hands-on examples and interactive visualizations</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-2">🎯 Real Applications</h4>
                <p className="text-gray-300 text-sm">Apply concepts to real financial data and market scenarios</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-2">💡 Expert Insights</h4>
                <p className="text-gray-300 text-sm">Learn from industry professionals and academic research</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
