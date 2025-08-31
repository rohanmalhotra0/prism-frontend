"use client";

import { useState } from "react";

export default function PortfolioComponent() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedAsset, setSelectedAsset] = useState("stocks");

  const portfolioData = {
    totalValue: "$125,430.50",
    dailyChange: "+$2,145.30",
    totalReturn: "+18.7%",
    assets: [
      { name: "AAPL", value: "$15,230", change: "+$450", weight: "12.1%" },
      { name: "TSLA", value: "$12,890", change: "+$320", weight: "10.3%" },
      { name: "NVDA", value: "$18,450", change: "+$890", weight: "14.7%" },
      { name: "SPY", value: "$22,100", change: "+$180", weight: "17.6%" },
      { name: "QQQ", value: "$19,800", change: "+$305", weight: "15.8%" },
    ]
  };

  const views = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "holdings", name: "Holdings", icon: "💼" },
    { id: "performance", name: "Performance", icon: "📈" },
    { id: "allocation", name: "Allocation", icon: "🎯" },
  ];

  const assetClasses = [
    { id: "stocks", name: "Stocks", icon: "📈", color: "from-green-500 to-emerald-500" },
    { id: "bonds", name: "Bonds", icon: "📉", color: "from-blue-500 to-cyan-500" },
    { id: "etfs", name: "ETFs", icon: "📊", color: "from-purple-500 to-indigo-500" },
    { id: "alternatives", name: "Alternatives", icon: "💎", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Portfolio Management</h2>
        <p className="text-gray-400 text-lg">
          Comprehensive portfolio tracking and analysis tools
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl border border-green-500/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Value</h3>
          <div className="text-3xl font-bold text-green-400">{portfolioData.totalValue}</div>
          <div className="text-sm text-green-300 mt-2">{portfolioData.dailyChange} today</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl border border-blue-500/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Total Return</h3>
          <div className="text-3xl font-bold text-blue-400">{portfolioData.totalReturn}</div>
          <div className="text-sm text-blue-300 mt-2">Year to date</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Risk Level</h3>
          <div className="text-3xl font-bold text-purple-400">Moderate</div>
          <div className="text-sm text-purple-300 mt-2">Balanced portfolio</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedView === view.id
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
            }`}
          >
            <span className="mr-2">{view.icon}</span>
            {view.name}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset Class Breakdown */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Asset Classes</h3>
            <div className="space-y-3">
              {assetClasses.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  className={`w-full p-4 rounded-xl border transition-all duration-300 ${
                    selectedAsset === asset.id
                      ? `bg-gradient-to-r ${asset.color} text-white border-transparent`
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{asset.icon}</span>
                    <span className="font-medium">{asset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-600/30 transition-colors">
                📥 Add Funds
              </button>
              <button className="w-full p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-colors">
                🔄 Rebalance
              </button>
              <button className="w-full p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-600/30 transition-colors">
                📊 Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Holdings List */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Top Holdings</h3>
            <div className="space-y-4">
              {portfolioData.assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {asset.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{asset.name}</div>
                      <div className="text-sm text-gray-400">{asset.weight} of portfolio</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{asset.value}</div>
                    <div className="text-sm text-green-400">{asset.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Portfolio Performance</h3>
        <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl border border-white/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">📈</div>
            <p className="text-gray-300 text-lg mb-2">Performance Chart</p>
            <p className="text-gray-400 text-sm">Interactive portfolio performance will render here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
