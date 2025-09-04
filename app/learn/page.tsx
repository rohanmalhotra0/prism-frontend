"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CATEGORIES = [
  { 
    name: "Financial Modeling", 
    slug: "financial-modeling", 
    description: "Learn about DCF models, valuation techniques, and financial forecasting methods.",
    icon: "📊",
    topics: ["DCF Models", "Valuation", "Forecasting", "Financial Statements"],
    difficulty: "Intermediate",
    duration: "4-6 weeks"
  },
  { 
    name: "General Modeling", 
    slug: "general-modeling", 
    description: "Explore regression analysis, time series, and statistical modeling techniques.",
    icon: "🔬",
    topics: ["Regression", "Time Series", "Monte Carlo", "Simulation"],
    difficulty: "Beginner",
    duration: "3-4 weeks"
  },
  { 
    name: "Options & Derivatives", 
    slug: "options-derivatives", 
    description: "Master Black-Scholes, binomial models, and options pricing strategies.",
    icon: "📈",
    topics: ["Black-Scholes", "Binomial Models", "Greeks", "Volatility"],
    difficulty: "Advanced",
    duration: "6-8 weeks"
  },
  { 
    name: "Insurance Risk Analysis", 
    slug: "insurance-risk-analysis", 
    description: "Understand actuarial science, risk assessment, and insurance mathematics.",
    icon: "🛡️",
    topics: ["Actuarial Science", "Risk Assessment", "Pricing Models", "Reserves"],
    difficulty: "Advanced",
    duration: "8-10 weeks"
  },
  { 
    name: "Crypto Modeling", 
    slug: "crypto-modeling", 
    description: "Dive into blockchain analysis, DeFi protocols, and cryptocurrency valuation.",
    icon: "₿",
    topics: ["Blockchain", "DeFi", "Tokenomics", "Market Analysis"],
    difficulty: "Intermediate",
    duration: "5-7 weeks"
  },
  { 
    name: "Statistics & Probability", 
    slug: "statistics-probability", 
    description: "Build foundations in probability theory, distributions, and statistical inference.",
    icon: "🎲",
    topics: ["Probability", "Distributions", "Hypothesis Testing", "Bayesian"],
    difficulty: "Beginner",
    duration: "4-5 weeks"
  },
  { 
    name: "Machine Learning", 
    slug: "machine-learning", 
    description: "Apply AI and ML techniques to financial data analysis and prediction.",
    icon: "🤖",
    topics: ["Neural Networks", "Random Forest", "Sentiment Analysis", "Prediction"],
    difficulty: "Advanced",
    duration: "6-8 weeks"
  },
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
                const difficultyColor = cat.difficulty === "Beginner" ? "text-green-400" : 
                                      cat.difficulty === "Intermediate" ? "text-yellow-400" : "text-red-400";
                return (
                  <div key={cat.slug} className={isLast ? "lg:col-start-2" : undefined}>
                    <Link href={`/learn/${cat.slug}`} className="block group">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{cat.icon}</span>
                          <div>
                            <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {cat.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs font-medium ${difficultyColor}`}>
                                {cat.difficulty}
                              </span>
                              <span className="text-gray-500">•</span>
                              <span className="text-xs text-gray-400">{cat.duration}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {cat.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cat.topics.slice(0, 3).map((topic, topicIdx) => (
                            <span key={topicIdx} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                          {cat.topics.length > 3 && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                              +{cat.topics.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                          <span>Start Learning →</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Path Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Recommended Learning Path</h3>
            <p className="text-gray-300 mb-6">
              Follow our structured learning path to build expertise in quantitative finance step by step.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="text-white font-semibold mb-2">Foundation</h4>
                <p className="text-gray-300 text-sm">Statistics & Probability</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="text-white font-semibold mb-2">Modeling</h4>
                <p className="text-gray-300 text-sm">General & Financial Modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="text-white font-semibold mb-2">Advanced</h4>
                <p className="text-gray-300 text-sm">Options & Machine Learning</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">4️⃣</div>
                <h4 className="text-white font-semibold mb-2">Specialization</h4>
                <p className="text-gray-300 text-sm">Insurance & Crypto</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🌟 What You'll Learn</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">📚</div>
                <h4 className="text-white font-semibold mb-3">Interactive Content</h4>
                <p className="text-gray-300 text-sm mb-4">Learn through hands-on examples, interactive visualizations, and real-time data analysis.</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Live coding examples</li>
                  <li>• Interactive charts</li>
                  <li>• Step-by-step tutorials</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="text-white font-semibold mb-3">Real Applications</h4>
                <p className="text-gray-300 text-sm mb-4">Apply concepts to real financial data, market scenarios, and industry case studies.</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Market data analysis</li>
                  <li>• Portfolio optimization</li>
                  <li>• Risk assessment</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">💡</div>
                <h4 className="text-white font-semibold mb-3">Expert Insights</h4>
                <p className="text-gray-300 text-sm mb-4">Learn from industry professionals, academic research, and cutting-edge methodologies.</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Industry best practices</li>
                  <li>• Research publications</li>
                  <li>• Professional insights</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tools & Resources Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">🛠️ Tools & Technologies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🐍</div>
                <h4 className="text-white font-semibold mb-1">Python</h4>
                <p className="text-gray-400 text-xs">Data analysis & modeling</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Pandas</h4>
                <p className="text-gray-400 text-xs">Data manipulation</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🧮</div>
                <h4 className="text-white font-semibold mb-1">NumPy</h4>
                <p className="text-gray-400 text-xs">Numerical computing</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="text-white font-semibold mb-1">Matplotlib</h4>
                <p className="text-gray-400 text-xs">Data visualization</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="text-white font-semibold mb-1">Scikit-learn</h4>
                <p className="text-gray-400 text-xs">Machine learning</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-1">TensorFlow</h4>
                <p className="text-gray-400 text-xs">Deep learning</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="text-white font-semibold mb-1">Plotly</h4>
                <p className="text-gray-400 text-xs">Interactive charts</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <div className="text-2xl mb-2">🗄️</div>
                <h4 className="text-white font-semibold mb-1">SQL</h4>
                <p className="text-gray-400 text-xs">Database queries</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students and professionals who are mastering quantitative finance with our comprehensive learning platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <Link href="/learn/statistics-probability">
                  Start with Basics
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
              >
                <Link href="/research">
                  View Research
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
