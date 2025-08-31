"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user" as const, text: input }];
  
    // Fake bot response for now
    setMessages([
      ...newMessages,
      { role: "bot" as const, text: "Analyzing your request..." },
    ]);
    setInput("");
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 shadow-lg hover:scale-105 transition"
        >
          Chat 💬
        </button>
      ) : (
        <div className="w-80 h-96 bg-gray-900 border border-gray-700 rounded-xl shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-xl border-b border-gray-700">
            <h3 className="text-sm font-bold text-white">Analytics Buddy</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>
  
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
  
          {/* Input */}
          <div className="p-2 border-t border-gray-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me about your data..."
              className="flex-1 rounded-lg bg-gray-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-2 text-white transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}