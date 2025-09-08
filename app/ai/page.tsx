"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { SendHorizonal, Bot, User, Loader2, MessageSquare, Plus, Menu, Trash2, Save } from "lucide-react";
import { useAuth } from "@/lib/AuthProvider";
import { saveChatSession, updateChatSession, deleteChatSession, loadChatSessions } from "@/lib/api-utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export default function AIPage() {
  const { user, loading: authLoading } = useAuth();
  const [currentSession, setCurrentSession] = useState<ChatSession>({
    id: "temp",
    title: "New Chat",
    messages: [
      {
        role: "assistant",
        content: "Hey there! I'm Tomas, the King of Analytics! I'm a master at data, stats, and all things analytical. Whether you need help with financial modeling, statistical analysis, or just want to chat about data - I'm your guy! What can I help you analyze today?",
        timestamp: new Date(),
      },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [currentSession.messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // Load chat sessions when user is authenticated
  useEffect(() => {
    if (user && !authLoading) {
      loadSessions();
    }
  }, [user, authLoading]);

  // Check for messages from chatbot widget
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatbot-messages");
    if (storedMessages) {
      try {
        const messages = JSON.parse(storedMessages);
        if (messages.length > 0) {
          setCurrentSession(prev => ({
            ...prev,
            messages: messages,
            title: "Chat from Widget"
          }));
          sessionStorage.removeItem("chatbot-messages");
        }
      } catch (err) {
        console.error("Error parsing stored messages:", err);
      }
    }
  }, []);

  const loadSessions = async () => {
    try {
      const chatSessions = await loadChatSessions();
      setSessions(chatSessions);
      if (chatSessions.length > 0) {
        setCurrentSession(chatSessions[0]);
      }
    } catch (err) {
      console.error("Error loading chat sessions:", err);
      // Don't show error for unauthenticated users
      if (user) {
        setError("Failed to load chat sessions");
      }
    }
  };

  const saveCurrentSession = async () => {
    if (!user) {
      setError("Please sign in to save chats");
      return;
    }

    if (currentSession.id === "temp") {
      // Create new session
      try {
        setSaving(true);
        setError(null);
        const newSession = await saveChatSession({
          title: currentSession.title,
          messages: currentSession.messages,
        });
        setCurrentSession(newSession);
        setSessions([newSession, ...sessions]);
      } catch (err: any) {
        setError(err.message || "Failed to save chat");
      } finally {
        setSaving(false);
      }
    } else {
      // Update existing session
      try {
        setSaving(true);
        setError(null);
        const updatedSession = await updateChatSession(currentSession.id, {
          title: currentSession.title,
          messages: currentSession.messages,
        });
        setCurrentSession(updatedSession);
        setSessions(sessions.map(s => s.id === currentSession.id ? updatedSession : s));
      } catch (err: any) {
        setError(err.message || "Failed to update chat");
      } finally {
        setSaving(false);
      }
    }
  };

  const deleteSession = async (sessionId: string) => {
    if (!user) {
      setError("Please sign in to delete chats");
      return;
    }

    try {
      await deleteChatSession(sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
      if (currentSession.id === sessionId) {
        if (sessions.length > 1) {
          const remainingSessions = sessions.filter(s => s.id !== sessionId);
          setCurrentSession(remainingSessions[0]);
        } else {
          // Create a new temporary session
          setCurrentSession({
            id: "temp",
            title: "New Chat",
            messages: [
              {
                role: "assistant",
                content: "New chat started! I'm Tomas, your analytics master! What data challenge can I help you conquer today?",
                timestamp: new Date(),
              },
            ],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete chat");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim(), timestamp: new Date() };

    const updatedMessages = [...currentSession.messages, userMessage];
    setCurrentSession((prev) => ({ ...prev, messages: updatedMessages }));
    setInput("");
    setIsLoading(true);

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
      setCurrentSession((prev) => ({ ...prev, messages: finalMessages }));
      
      // Auto-save after getting AI response (if user is authenticated)
      if (user && currentSession.id !== "temp") {
        setTimeout(() => {
          saveCurrentSession();
        }, 1000);
      }
    } catch (e) {
      console.error("Chat error:", e);
      const errorMessage: Message = { 
        role: "assistant", 
        content: "I'm having trouble connecting right now. Please try again in a moment!", 
        timestamp: new Date() 
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setCurrentSession((prev) => ({ ...prev, messages: finalMessages }));
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: "temp",
      title: "New Chat",
      messages: [
        { role: "assistant", content: "New chat started! I'm Tomas, your analytics master! What data challenge can I help you conquer today?", timestamp: new Date() },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
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
              <div className="p-4 border-b border-white/10 space-y-3">
                <button
                  onClick={createNewChat}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">New Chat</span>
                </button>
                
                {user && (
                  <button
                    onClick={saveCurrentSession}
                    disabled={saving || !user}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-green-600 hover:opacity-90 disabled:opacity-50 transition"
                  >
                    <Save className="w-5 h-5" />
                    <span className="font-medium">
                      {saving ? "Saving..." : currentSession.id === "temp" ? "Save Chat" : "Update Chat"}
                    </span>
                  </button>
                )}
                
                {!user && (
                  <div className="text-center text-sm text-gray-400 p-2">
                    Sign in to save your chats (max 5)
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sessions.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm p-4">
                    No saved chats yet
                  </div>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                        currentSession.id === session.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      <button
                        onClick={() => setCurrentSession(session)}
                        className="flex-1 text-left flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="truncate">{session.title}</span>
                      </button>
                      {user && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 rounded transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))
                )}
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
            <div className="flex items-center gap-2">
              {user && sessions.length >= 5 && (
                <div className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                  Max 5 chats reached
                </div>
              )}
              {saving && (
                <div className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Saving...
                </div>
              )}
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
            {currentSession.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}>
                {/* Avatar for assistant messages */}
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {/* Avatar for user messages */}
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
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
                  className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-2 text-white hover:opacity-90 disabled:opacity-50 transition-all duration-200 flex-shrink-0"
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
      
      {/* Footer */}
      
    </div>
  );
}