"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState("discussions");

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
              Community Forum
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Connect with fellow users, share insights, and get help with your modeling challenges
            </p>
            
            {/* Navigation Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("discussions")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "discussions"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                💬 Discussions
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "questions"
                    ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                ❓ Q&A
              </button>
              <button
                onClick={() => setActiveTab("showcase")}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "showcase"
                    ? "bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                • Showcase
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          {activeTab === "discussions" && (
            <div className="grid gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Recent Discussions</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Best practices for portfolio optimization</h3>
                    <p className="text-gray-400 mb-4">Share your strategies and learn from the community about portfolio optimization techniques.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 John Doe</span>
                      <span>📅 2 hours ago</span>
                      <span>💬 12 replies</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Crypto volatility modeling approaches</h3>
                    <p className="text-gray-400 mb-4">Discuss different methods for modeling cryptocurrency price volatility and risk assessment.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 Sarah Wilson</span>
                      <span>📅 5 hours ago</span>
                      <span>💬 8 replies</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Options pricing model comparisons</h3>
                    <p className="text-gray-400 mb-4">Compare Black-Scholes vs Binomial models and their practical applications.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 Mike Chen</span>
                      <span>📅 1 day ago</span>
                      <span>💬 15 replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="grid gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Questions & Answers</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">How to implement Monte Carlo simulation?</h3>
                    <p className="text-gray-400 mb-4">Looking for guidance on setting up Monte Carlo simulations for risk analysis.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 Alex Rodriguez</span>
                      <span>📅 3 hours ago</span>
                      <span>✅ 3 answers</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">Currency hedging strategies</h3>
                    <p className="text-gray-400 mb-4">What are the best practices for hedging currency risk in international portfolios?</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 Emma Thompson</span>
                      <span>📅 6 hours ago</span>
                      <span>✅ 5 answers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "showcase" && (
            <div className="grid gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Community Showcase</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">• Advanced Portfolio Optimization Model</h3>
                    <p className="text-gray-400 mb-4">A comprehensive model that combines multiple optimization techniques for institutional portfolios.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 David Park</span>
                      <span>📅 2 days ago</span>
                      <span>• 24 likes</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-2">• Real-time Risk Monitoring Dashboard</h3>
                    <p className="text-gray-400 mb-4">An innovative dashboard for real-time portfolio risk monitoring with automated alerts.</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>👤 Lisa Zhang</span>
                      <span>📅 4 days ago</span>
                      <span>• 18 likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
