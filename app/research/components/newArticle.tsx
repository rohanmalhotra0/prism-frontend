"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  date: string;
  abstract: string;
  pdfUrl: string;
  datasetUrl?: string;
  coverImage?: string;
  category: string;
  tags: string[];
}

export default function NewArticlePage() {
  const [papers] = useState<ResearchPaper[]>([
    {
      id: 1,
      title: "Reddit Data in Quantitative Financial Models",
      authors: "Rohan Malhotra, Colin Jones",
      date: "Feb 20, 2025",
      abstract:
        "This paper explores how Reddit sentiment, particularly from r/WallStreetBets, impacts quantitative financial models post-GameStop and AMC short squeezes.",
      pdfUrl: "/papers/reddit-finance.pdf",
      datasetUrl: "/datasets/reddit-finance-dataset.csv",
      coverImage: "/components/logos/prismLogo.jpeg",
      category: "Sentiment Analysis",
      tags: ["Reddit", "Sentiment", "GameStop", "Quantitative Finance"]
    },
    {
      id: 2,
      title: "Capital Allocation with the Kelly Criterion",
      authors: "Rohan Malhotra",
      date: "Dec 12, 2024",
      abstract:
        "A study on how the Kelly Criterion can optimize portfolio growth under uncertainty, balancing risk and reward.",
      pdfUrl: "/papers/kelly-criterion.pdf",
      coverImage: "/components/logos/prismLogo.jpeg",
      category: "Portfolio Theory",
      tags: ["Kelly Criterion", "Portfolio", "Risk Management", "Optimization"]
    },
  ]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero section */}
        <div className="pt-20 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Latest Research</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Research Articles
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Explore cutting-edge research in quantitative finance, machine learning, and market analysis
            </p>
            
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Quantitative Finance</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Machine Learning</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Market Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles grid */}
        <div className="px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-8 lg:gap-12">
              {papers.map((paper, index) => (
                <article
                  key={paper.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Card container */}
                  <div className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    {/* Content layout */}
                    <div className="flex flex-col lg:flex-row">
                      {/* Image section */}
                      <div className="lg:w-2/5 relative overflow-hidden">
                        <div className="aspect-[4/3] relative group-hover:shadow-2xl transition-all duration-700">
                          {paper.coverImage ? (
                            <img
                              src={paper.coverImage}
                              alt={`Cover of ${paper.title}`}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-6xl mb-4 animate-pulse">📊</div>
                                <div className="text-gray-400">Research Paper</div>
                              </div>
                            </div>
                          )}
                          
                          {/* Category badge */}
                          <div className="absolute top-6 left-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md text-blue-300 text-sm font-semibold rounded-full border border-blue-500/40 shadow-lg">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              {paper.category}
                            </span>
                          </div>
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Corner accent */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full"></div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-gray-100 transition-colors duration-300">
                            {paper.title}
                          </h2>
                          
                          {/* Meta information */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <span className="text-gray-300 font-medium">{paper.authors}</span>
                            </div>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                              {paper.date}
                            </span>
                          </div>
                          
                          {/* Abstract */}
                          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                            {paper.abstract}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {paper.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            asChild
                            className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 focus:ring-4 focus:ring-blue-400/30 focus:outline-none active:scale-95"
                          >
                            <a href={paper.pdfUrl} download className="flex items-center gap-2">
                              <span className="text-lg">📄</span>
                              Download PDF
                            </a>
                          </Button>

                          {paper.datasetUrl && (
                            <Button
                              asChild
                              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 focus:ring-4 focus:ring-purple-400/30 focus:outline-none active:scale-95"
                            >
                              <a href={paper.datasetUrl} download className="flex items-center gap-2">
                                <span className="text-lg">📊</span>
                                Download Dataset
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="text-center pb-20">
          <div className="inline-block p-8 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300 font-medium">More Research Coming Soon</span>
            </div>
            <p className="text-gray-400 text-lg">
              Stay tuned for cutting-edge insights in quantitative finance
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
