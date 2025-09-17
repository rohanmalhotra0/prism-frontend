"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";
import { FileText } from "lucide-react";

interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  date: string;
  abstract: string;
  pdfUrl: string;
  category: string;
  tags: string[];
}

export default function ResearchPage() {
  const papers: ResearchPaper[] = [
    {
      id: 1,
      title: "Reddit Data in Quantitative Financial Models",
      authors: "Rohan Malhotra, Colin Jones",
      date: "Feb 20, 2025",
      abstract:
        "This paper explores how Reddit sentiment, particularly from r/WallStreetBets, impacts quantitative financial models post-GameStop and AMC short squeezes.",
      pdfUrl: "/Reddit Data in Quantitative Financial Models (3).pdf",
      category: "Sentiment Analysis",
      tags: ["Reddit", "Sentiment", "GameStop", "Quantitative Finance"]
    },
    {
      id: 2,
      title: "An Economic Approach to Optimize Capital Allocation",
      authors: "Rohan Malhotra",
      date: "Dec 12, 2024",
      abstract:
        "A study on how the Kelly Criterion can optimize portfolio growth under uncertainty, balancing risk and reward.",
      pdfUrl: "/An Economic Approach to Optimize Capital Allocation.docx (2).pdf",
      category: "Portfolio Theory",
      tags: ["Kelly Criterion", "Portfolio", "Risk Management", "Optimization"]
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="transparent" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 z-5">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-black/20 to-slate-900/30"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-64 pb-32 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl lg:text-8xl font-black mb-16 text-white tracking-tight drop-shadow-2xl">
              Research Articles
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-16 px-8">
              Explore cutting-edge research in quantitative finance, machine learning, and market analysis
            </p>
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
                  <div className="relative bg-white/2 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/20">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    {/* Content layout */}
                    <div className="flex flex-col lg:flex-row">
                      {/* PDF Preview section */}
                      <div className="lg:w-2/5 relative overflow-hidden">
                        <div className="aspect-[4/3] relative group-hover:shadow-2xl transition-all duration-700">
                          {/* PDF Preview */}
                          <div className="w-full h-full bg-white/2 flex items-center justify-center relative overflow-hidden">
                            <iframe
                              src={`${paper.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                              className="w-full h-full border-0"
                              title={`Preview of ${paper.title}`}
                              onError={() => {
                                // Fallback if PDF fails to load
                                const fallback = document.querySelector(`[data-paper-id="${paper.id}"] .pdf-fallback`);
                                if (fallback) {
                                  (fallback as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            
                            {/* Fallback placeholder */}
                            <div 
                              className="pdf-fallback absolute inset-0 bg-white/2 flex items-center justify-center hidden"
                              data-paper-id={paper.id}
                            >
                              <div className="text-center">
                                <div className="mb-4 animate-pulse">
                                  <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                                </div>
                                <div className="text-gray-400">PDF Preview</div>
                                <div className="text-gray-500 text-sm mt-2">Click to view full paper</div>
                              </div>
                            </div>
                          </div>
                          
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
                            className="group/btn relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 focus:ring-4 focus:ring-blue-400/30 focus:outline-none active:scale-95"
                          >
                            <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              View Full Paper
                            </a>
                          </Button>

                          <Button
                            asChild
                            className="group/btn relative overflow-hidden rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:from-gray-500 hover:to-gray-600 hover:shadow-xl hover:shadow-gray-500/25 hover:scale-105 focus:ring-4 focus:ring-gray-400/30 focus:outline-none active:scale-95"
                          >
                            <a href={paper.pdfUrl} download className="flex items-center gap-2">
                              <span className="text-lg">↓</span>
                              Download PDF
                            </a>
                          </Button>
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

      {/* Footer */}
      <Footer />

    </div>
  );
}
