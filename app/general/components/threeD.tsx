"use client";

import { useState } from "react";

export default function ThreeDComponent() {
  const [selectedModel, setSelectedModel] = useState("portfolio");
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const models = [
    { id: "portfolio", name: "Portfolio Model", icon: "📊" },
    { id: "market", name: "Market Structure", icon: "🏛️" },
    { id: "risk", name: "Risk Analysis", icon: "⚠️" },
    { id: "correlation", name: "Correlation Matrix", icon: "🔗" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">3D Visualization</h2>
        <p className="text-gray-400 text-lg">
          Interactive 3D models for financial data visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Canvas */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">3D Canvas</h3>
          <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-xl border border-white/20 flex items-center justify-center relative overflow-hidden">
            {/* 3D Model Placeholder */}
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">🎯</div>
              <p className="text-gray-300 text-lg mb-2">{selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)} Model</p>
              <p className="text-gray-400 text-sm">3D visualization will render here</p>
            </div>
            
            {/* Rotation Controls */}
            <div className="absolute bottom-4 right-4 space-y-2">
              <button className="w-8 h-8 bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors">
                ↻
              </button>
              <button className="w-8 h-8 bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors">
                ↺
              </button>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Model Selection */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Select Model</h3>
            <div className="grid grid-cols-2 gap-3">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    selectedModel === model.id
                      ? "border-purple-500 bg-purple-500/20 text-white"
                      : "border-white/20 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="text-2xl mb-2">{model.icon}</div>
                  <div className="text-sm font-medium">{model.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Rotation Controls */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Rotation Controls</h3>
            <div className="space-y-4">
              {Object.entries(rotation).map(([axis, value]) => (
                <div key={axis} className="space-y-2">
                  <label className="text-sm text-gray-300 capitalize">{axis} Rotation</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={value}
                    onChange={(e) => setRotation(prev => ({ ...prev, [axis]: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xs text-gray-400">{value}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* View Options */}
          <div className="bg-gradient-to-br from-gray-800/20 to-gray-700/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">View Options</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-600/30 transition-colors">
                Wireframe Mode
              </button>
              <button className="w-full p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-600/30 transition-colors">
                Solid Mode
              </button>
              <button className="w-full p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-600/30 transition-colors">
                Texture Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
