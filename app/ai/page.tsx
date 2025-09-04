"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { SendHorizonal, Bot, User, Loader2, MessageSquare, Plus, Menu } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function AIPage() {
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: "1",
    title: "New Chat",
    messages: [
      {
        role: "assistant",
        content: "👋 Hey there! I'm Tomas, the King of Analytics! 👑 I'm a master at data, stats, and all things analytical. Whether you need help with financial modeling, statistical analysis, or just want to chat about data - I'm your guy! What can I help you analyze today?",
        timestamp: new Date(),
      },
    ],
    createdAt: new Date(),
  });

  const [sessions, setSessions] = useState<ChatSession[]>([currentSession]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [currentSession.messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim(), timestamp: new Date() };

    setCurrentSession((prev) => ({ ...prev, messages: [...prev.messages, userMessage] }));
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...currentSession.messages, userMessage].map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.message, timestamp: new Date() };
      setCurrentSession((prev) => ({ ...prev, messages: [...prev.messages, assistantMessage] }));
    } catch (e) {
      setCurrentSession((prev) => ({
        ...prev,
        messages: [...prev.messages, { role: "assistant", content: "⚠️ Something went wrong. Try again.", timestamp: new Date() }],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        { role: "assistant", content: "👋 New chat started! I'm Tomas, your analytics master! What data challenge can I help you conquer today? 🚀", timestamp: new Date() },
      ],
      createdAt: new Date(),
    };
    setSessions([newSession, ...sessions]);
    setCurrentSession(newSession);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col overflow-hidden`}>
          {sidebarOpen && (
            <>
              <div className="p-4 border-b border-white/10">
                <button
                  onClick={createNewChat}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">New Chat</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setCurrentSession(session)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      currentSession.id === session.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <MessageSquare className="inline w-4 h-4 mr-2" />
                    {session.title}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Tomas - King of Analytics</h1>
                  <p className="text-sm text-gray-400">Master of Data & Statistical Wizardry</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {currentSession.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-2xl px-4 py-3 rounded-full text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 border border-white/10 text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-full bg-white/10 text-gray-400 flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Message Tomas, King of Analytics..."
                className="flex-1 rounded-full bg-white/10 px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/20 placeholder-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white font-medium hover:opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizonal className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      
    </div>
  );
}