"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Navbar from "@/components/sections/navbar/default";
import { SendHorizonal, Bot, User, Loader2 } from "lucide-react";
import HeroBackground from "@/components/ui/HeroBackground";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi I'm Tomas, Master of Data! I'm a master at data, stats, and all things analytical. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  useEffect(() => scrollToBottom(), [messages, scrollToBottom]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  // Check for messages from chatbot widget
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedMessages = sessionStorage.getItem("chatbot-messages");
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages);
          if (parsedMessages.length > 0) {
            // Convert timestamp strings back to Date objects
            const messagesWithDates = parsedMessages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
            
            setMessages(messagesWithDates);
            sessionStorage.removeItem("chatbot-messages");
          }
        }
      } catch (err) {
        console.error("Error parsing stored messages:", err);
      }
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content: "New chat started! I'm Tomas, your analytics master! What data challenge can I help you conquer today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim(), timestamp: new Date() };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const assistantMessage: Message = { 
        role: "assistant", 
        content: data.message || "No response received", 
        timestamp: new Date() 
      };
      
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
    } catch (e) {
      console.error("Chat error:", e);
      const errorMessage: Message = { 
        role: "assistant", 
        content: "I'm having trouble connecting right now. Please try again in a moment!", 
        timestamp: new Date() 
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      setError("Failed to get response from AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

  // Memoize the HeroBackground to prevent re-renders
  const memoizedHeroBackground = useMemo(() => (
    <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
  ), []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Particle background */}
      {memoizedHeroBackground}
      
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Tomas - King of Analytics</h1>
              <p className="text-sm text-gray-400">Master of Data & Statistical Wizardry</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 text-red-300 hover:text-red-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}>
              {/* Avatar for assistant messages */}
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Message bubble */}
              <div className={`max-w-2xl relative ${
                msg.role === "user" ? "order-first" : "order-last"
              }`}>
                <div
                  className={`px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-md"
                      : "bg-gray-800/50 border border-gray-700/50 text-gray-100 rounded-2xl rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                
                {/* Timestamp */}
                <div className={`text-xs text-gray-500 mt-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}>
                  {msg.timestamp instanceof Date 
                    ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                </div>
              </div>
              
              {/* Avatar for user messages */}
              {msg.role === "user" && (
                <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-start gap-3">
              <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-400 flex items-center gap-2 text-sm rounded-2xl rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3 bg-gray-800/30 rounded-2xl px-4 py-3 border border-gray-700/50">
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Message Tomas, King of Analytics..."
                  className="w-full bg-transparent text-sm text-white placeholder-gray-400 resize-none focus:outline-none"
                  rows={1}
                  style={{ minHeight: '24px', maxHeight: '128px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-[#1877F2] p-2 text-white hover:opacity-90 disabled:opacity-50 transition-all duration-200 flex-shrink-0"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizonal className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}