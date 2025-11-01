"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";
import { 
  TrendingUp, 
  FlaskConical, 
  Sigma, 
  Shield, 
  Bitcoin, 
  BarChart3, 
  Brain,
  Calculator,
  PieChart,
  Target,
  Zap,
  Database,
  DollarSign
} from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export const CATEGORIES = [
  { 
    name: "Financial Modeling", 
    slug: "financial-modeling", 
    description: "Learn about DCF models, valuation techniques, and financial forecasting methods.",
    icon: TrendingUp,
    topics: ["DCF Models", "Valuation", "Forecasting", "Financial Statements"],
    difficulty: "Intermediate",
    duration: "4-6 weeks"
  },
  { 
    name: "General Modeling", 
    slug: "general-modeling", 
    description: "Explore regression analysis, time series, and statistical modeling techniques.",
    icon: FlaskConical,
    topics: ["Regression", "Time Series", "Monte Carlo", "Simulation"],
    difficulty: "Beginner",
    duration: "3-4 weeks"
  },
  { 
    name: "Options & Derivatives", 
    slug: "options-derivatives", 
    description: "Master Black-Scholes, binomial models, and options pricing strategies.",
    icon: Sigma,
    topics: ["Black-Scholes", "Binomial Models", "Greeks", "Volatility"],
    difficulty: "Advanced",
    duration: "6-8 weeks"
  },
  { 
    name: "Insurance Risk Analysis", 
    slug: "insurance-risk-analysis", 
    description: "Understand actuarial science, risk assessment, and insurance mathematics.",
    icon: Shield,
    topics: ["Actuarial Science", "Risk Assessment", "Pricing Models", "Reserves"],
    difficulty: "Advanced",
    duration: "8-10 weeks"
  },
  { 
    name: "Crypto Modeling", 
    slug: "crypto-modeling", 
    description: "Dive into blockchain analysis, DeFi protocols, and cryptocurrency valuation.",
    icon: Bitcoin,
    topics: ["Blockchain", "DeFi", "Tokenomics", "Market Analysis"],
    difficulty: "Intermediate",
    duration: "5-7 weeks"
  },
  { 
    name: "Statistics & Probability", 
    slug: "statistics-probability", 
    description: "Build foundations in probability theory, distributions, and statistical inference.",
    icon: BarChart3,
    topics: ["Probability", "Distributions", "Hypothesis Testing", "Bayesian"],
    difficulty: "Beginner",
    duration: "4-5 weeks"
  },
  { 
    name: "Machine Learning", 
    slug: "machine-learning", 
    description: "Apply AI and ML techniques to financial data analysis and prediction.",
    icon: Brain,
    topics: ["Neural Networks", "Random Forest", "Sentiment Analysis", "Prediction"],
    difficulty: "Advanced",
    duration: "6-8 weeks"
  },
  { 
    name: "Business Metrics", 
    slug: "business-metrics", 
    description: "Master essential financial metrics: ARR, MRR, CAC, churn rates, and TAM calculations.",
    icon: DollarSign,
    topics: ["ARR/MRR", "Churn Analysis", "CAC/LTV", "TAM Analysis", "Bookings"],
    difficulty: "Intermediate",
    duration: "3-4 weeks"
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-7xl font-black mb-8 text-foreground">
              Learn
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Master the foundations of quantitative finance, modeling techniques, and data analysis
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat, idx) => {
                const isLast = idx === CATEGORIES.length - 1;
                const difficultyColor = cat.difficulty === "Beginner" ? "text-green-600" : 
                                      cat.difficulty === "Intermediate" ? "text-yellow-600" : "text-red-600";
                return (
                  <div key={cat.slug} className={isLast ? "lg:col-start-2" : undefined}>
                    <Link href={`/learn/${cat.slug}`} className="block group">
                      <div className="bg-card rounded-xl p-6 border border-border hover:bg-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                            <cat.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {cat.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs font-medium ${difficultyColor}`}>
                                {cat.difficulty}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{cat.duration}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {cat.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cat.topics.slice(0, 3).map((topic, topicIdx) => (
                            <span key={topicIdx} className="px-2 py-1 bg-primary/15 text-primary text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                          {cat.topics.length > 3 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                              +{cat.topics.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors">
                          <span>Start Learning →</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Learning?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students and professionals who are mastering quantitative finance with our comprehensive learning platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/learn/statistics-probability">
                  Start with Basics
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
