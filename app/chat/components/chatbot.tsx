"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot, User, Loader2, BarChart3, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm Tomas, the King of Analytics! I'm a master at data, stats, and all things analytical. Whether you need help with financial modeling, statistical analysis, or just want to chat about data - I'm your guy! What can I help you analyze today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const expandToFullPage = () => {
    // Store current messages in session storage for the AI page
    sessionStorage.setItem("chatbot-messages", JSON.stringify(messages));
    router.push("/ai");
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I'm having trouble connecting right now. Please try again shortly.",
        timestamp: new Date(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="group relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">Analytics AI</span>
          </div>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </button>
      ) : (
        <div className="w-96 h-[520px] bg-black/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Tomas - King of Analytics</h3>
                <p className="text-xs text-gray-400">Master of Data & Statistical Wizardry</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={expandToFullPage}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                title="Expand to full page"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 border border-white/20 text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading bubble */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white/10 text-gray-400 flex items-center gap-2 text-sm border border-white/20">
                  <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/70 backdrop-blur">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Message Tomas, King of Analytics..."
                className="flex-1 rounded-2xl bg-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/20 placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white font-medium hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <SendHorizonal className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
