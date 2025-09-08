"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "📋 Overview", icon: "📋" },
    { id: "frontend", title: "Frontend", icon: "🎨" },
    { id: "backend", title: "Backend", icon: "⚙️" },
    { id: "database", title: "Database", icon: "🗄️" },
    { id: "apis", title: "🔌 APIs", icon: "🔌" },
    { id: "features", title: "✨ Features", icon: "✨" },
    { id: "deployment", title: "Deployment", icon: "🚀" },
    { id: "architecture", title: "Architecture", icon: "🏗️" },
  ];

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
              Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Complete technical documentation for Refrax's financial modeling platform
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                {activeSection === "overview" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">📋 Tech Stack Overview</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-lg mb-6">
                        Refrax is a comprehensive financial modeling platform built with modern web technologies. 
                        Our tech stack is designed for scalability, performance, and developer experience.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <h3 className="text-xl font-semibold text-white mb-3">Frontend Stack</h3>
                          <ul className="text-gray-300 space-y-2">
                            <li>• <strong>Next.js 15</strong> - React framework with App Router</li>
                            <li>• <strong>TypeScript</strong> - Type-safe JavaScript</li>
                            <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
                            <li>• <strong>Radix UI</strong> - Accessible component primitives</li>
                            <li>• <strong>Plotly.js</strong> - Interactive data visualization</li>
                            <li>• <strong>Three.js & React Three Fiber</strong> - 3D graphics</li>
                            <li>• <strong>React Context API</strong> - Global state management</li>
                            <li>• <strong>Lucide React</strong> - Beautiful icons</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <h3 className="text-xl font-semibold text-white mb-3">Backend Stack</h3>
                          <ul className="text-gray-300 space-y-2">
                            <li>• <strong>Next.js API Routes</strong> - Serverless functions</li>
                            <li>• <strong>Supabase</strong> - Backend-as-a-Service</li>
                            <li>• <strong>PostgreSQL</strong> - Primary database</li>
                            <li>• <strong>Row Level Security (RLS)</strong> - Database security</li>
                            <li>• <strong>JWT Authentication</strong> - Secure sessions</li>
                            <li>• <strong>Fly.io</strong> - Backend deployment</li>
                            <li>• <strong>OpenAI API</strong> - AI chat functionality</li>
                            <li>• <strong>File System Operations</strong> - Dataset management</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>• <strong>AI-Powered Chatbot</strong> - OpenAI integration for financial insights</li>
                          <li>• <strong>Dataset Management</strong> - Upload, manage, and analyze financial data</li>
                          <li>• <strong>Chat History</strong> - Save and manage up to 5 chat sessions per user</li>
                          <li>• <strong>Real-time Financial Data</strong> - Live market data processing</li>
                          <li>• <strong>Interactive 2D/3D Visualization</strong> - Advanced charting capabilities</li>
                          <li>• <strong>User Authentication</strong> - Google OAuth + email/password</li>
                          <li>• <strong>Protected Routes</strong> - Secure dashboard access</li>
                          <li>• <strong>Responsive Design</strong> - Mobile-first approach</li>
                          <li>• <strong>Cloud Infrastructure</strong> - Scalable Fly.io backend</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "frontend" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Frontend Technologies</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Next.js 15</h3>
                        <p className="text-gray-300 mb-4">
                          We use Next.js 15 with the App Router for our React framework. This provides:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Server-Side Rendering (SSR)</strong> - Better SEO and performance</li>
                          <li>• <strong>Static Site Generation (SSG)</strong> - Fast loading times</li>
                          <li>• <strong>API Routes</strong> - Built-in backend functionality</li>
                          <li>• <strong>File-based routing</strong> - Intuitive page structure</li>
                          <li>• <strong>Automatic code splitting</strong> - Optimized bundle sizes</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">TypeScript</h3>
                        <p className="text-gray-300 mb-4">
                          TypeScript provides type safety and better developer experience:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Static type checking</strong> - Catch errors at compile time</li>
                          <li>• <strong>IntelliSense support</strong> - Better IDE experience</li>
                          <li>• <strong>Refactoring safety</strong> - Confident code changes</li>
                          <li>• <strong>Documentation</strong> - Types serve as documentation</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Tailwind CSS</h3>
                        <p className="text-gray-300 mb-4">
                          Utility-first CSS framework for rapid UI development:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Utility classes</strong> - Rapid styling without custom CSS</li>
                          <li>• <strong>Responsive design</strong> - Mobile-first approach</li>
                          <li>• <strong>Dark mode support</strong> - Built-in theme switching</li>
                          <li>• <strong>Custom components</strong> - Reusable UI elements</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Plotly.js</h3>
                        <p className="text-gray-300 mb-4">
                          Interactive data visualization library for financial charts:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Financial charts</strong> - Candlestick, OHLC, volume charts</li>
                          <li>• <strong>Interactive features</strong> - Zoom, pan, hover tooltips</li>
                          <li>• <strong>Real-time updates</strong> - Dynamic data streaming</li>
                          <li>• <strong>Export capabilities</strong> - PNG, SVG, PDF export</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Radix UI</h3>
                        <p className="text-gray-300 mb-4">
                          Accessible component primitives for modern UI development:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Navigation Menu</strong> - Accessible dropdown menus</li>
                          <li>• <strong>Dialog Components</strong> - Modal and popup dialogs</li>
                          <li>• <strong>Form Controls</strong> - Input, select, and form elements</li>
                          <li>• <strong>Accessibility</strong> - WCAG compliant components</li>
                          <li>• <strong>Customizable</strong> - Styled with Tailwind CSS</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">React Context API</h3>
                        <p className="text-gray-300 mb-4">
                          Global state management for authentication and user data:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>AuthProvider</strong> - Centralized authentication state</li>
                          <li>• <strong>useAuth Hook</strong> - Easy access to auth state</li>
                          <li>• <strong>Protected Routes</strong> - HOC for route protection</li>
                          <li>• <strong>Session Management</strong> - Automatic token handling</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Three.js & React Three Fiber</h3>
                        <p className="text-gray-300 mb-4">
                          3D graphics library for advanced data visualization:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>3D charts</strong> - Volume-based depth visualization</li>
                          <li>• <strong>Interactive controls</strong> - Orbit, zoom, pan</li>
                          <li>• <strong>WebGL rendering</strong> - Hardware-accelerated graphics</li>
                          <li>• <strong>React integration</strong> - Declarative 3D components</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "backend" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Backend Technologies</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Node.js</h3>
                        <p className="text-gray-300 mb-4">
                          JavaScript runtime for server-side development:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Non-blocking I/O</strong> - High performance for concurrent requests</li>
                          <li>• <strong>NPM ecosystem</strong> - Rich package ecosystem</li>
                          <li>• <strong>JavaScript everywhere</strong> - Same language for frontend and backend</li>
                          <li>• <strong>Event-driven architecture</strong> - Scalable and efficient</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Next.js API Routes</h3>
                        <p className="text-gray-300 mb-4">
                          Serverless functions for backend logic:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>API endpoints</strong> - RESTful API design</li>
                          <li>• <strong>Authentication</strong> - User sign-in/sign-up handling</li>
                          <li>• <strong>Data processing</strong> - Financial calculations and analysis</li>
                          <li>• <strong>Database operations</strong> - CRUD operations with PostgreSQL</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Authentication System</h3>
                        <p className="text-gray-300 mb-4">
                          Secure user authentication with multiple providers:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Google OAuth</strong> - Social login integration</li>
                          <li>• <strong>Email/Password</strong> - Traditional authentication</li>
                          <li>• <strong>JWT tokens</strong> - Secure session management</li>
                          <li>• <strong>Supabase Auth</strong> - Built-in authentication</li>
                          <li>• <strong>Row Level Security</strong> - Database-level access control</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">AI Integration</h3>
                        <p className="text-gray-300 mb-4">
                          OpenAI-powered chatbot for financial insights:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>OpenAI API</strong> - GPT integration for chat</li>
                          <li>• <strong>Chat Sessions</strong> - Save up to 5 chats per user</li>
                          <li>• <strong>Context Management</strong> - Maintain conversation history</li>
                          <li>• <strong>Financial Focus</strong> - Specialized for financial queries</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">File Management</h3>
                        <p className="text-gray-300 mb-4">
                          Dataset upload and management system:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>File Upload</strong> - Excel/CSV dataset uploads</li>
                          <li>• <strong>Storage Management</strong> - User storage limits and tracking</li>
                          <li>• <strong>File Validation</strong> - Type and size validation</li>
                          <li>• <strong>CRUD Operations</strong> - Create, read, update, delete datasets</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "database" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Database Technologies</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">PostgreSQL</h3>
                        <p className="text-gray-300 mb-4">
                          Primary relational database for data storage:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>ACID compliance</strong> - Data integrity and consistency</li>
                          <li>• <strong>JSON support</strong> - Flexible data structures</li>
                          <li>• <strong>Advanced indexing</strong> - Optimized query performance</li>
                          <li>• <strong>Scalability</strong> - Handles large datasets efficiently</li>
                        </ul>
                        
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">Database Schema:</h4>
                          <pre className="text-gray-300 text-sm">
{`-- Profiles table (Supabase auth.users integration)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  subscription TEXT DEFAULT 'Free',
  storage_used INT DEFAULT 0,
  storage_limit INT DEFAULT 50,
  datasets_count INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datasets table
CREATE TABLE datasets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size INT NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Supabase</h3>
                        <p className="text-gray-300 mb-4">
                          Backend-as-a-Service for additional functionality:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Real-time subscriptions</strong> - Live data updates</li>
                          <li>• <strong>Row Level Security</strong> - Database-level security</li>
                          <li>• <strong>Auto-generated APIs</strong> - REST and GraphQL endpoints</li>
                          <li>• <strong>Built-in authentication</strong> - User management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "apis" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">🔌 External APIs</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Polygon.io</h3>
                        <p className="text-gray-300 mb-4">
                          Financial data provider for real-time market data:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Stock prices</strong> - Real-time and historical data</li>
                          <li>• <strong>Market data</strong> - OHLC, volume, market cap</li>
                          <li>• <strong>News feeds</strong> - Financial news and updates</li>
                          <li>• <strong>Options data</strong> - Options chains and pricing</li>
                        </ul>
                        
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">API Usage Example:</h4>
                          <pre className="text-gray-300 text-sm">
{`// Fetch stock data
const response = await fetch(
  \`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-01/2023-12-31?apikey=\${API_KEY}\`
);
const data = await response.json();`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">OpenAI API</h3>
                        <p className="text-gray-300 mb-4">
                          AI-powered chatbot for financial insights:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>GPT Integration</strong> - Advanced language model</li>
                          <li>• <strong>Financial Focus</strong> - Specialized for financial queries</li>
                          <li>• <strong>Context Awareness</strong> - Maintains conversation history</li>
                          <li>• <strong>Real-time Responses</strong> - Instant AI-powered answers</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Internal API Endpoints</h3>
                        <p className="text-gray-300 mb-4">
                          Custom API routes for application functionality:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>/api/chat</strong> - AI chatbot endpoint</li>
                          <li>• <strong>/api/chats</strong> - Chat session management</li>
                          <li>• <strong>/api/datasets</strong> - Dataset CRUD operations</li>
                          <li>• <strong>/api/profile</strong> - User profile management</li>
                          <li>• <strong>/api/datasets/upload</strong> - File upload handling</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Google OAuth</h3>
                        <p className="text-gray-300 mb-4">
                          Authentication service for user login:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Social login</strong> - One-click authentication</li>
                          <li>• <strong>User profile data</strong> - Name, email, profile picture</li>
                          <li>• <strong>Secure tokens</strong> - JWT-based authentication</li>
                          <li>• <strong>Privacy compliant</strong> - GDPR and privacy regulations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "features" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">✨ Application Features</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">🤖 AI Chatbot</h3>
                        <p className="text-gray-300 mb-4">
                          Intelligent financial assistant powered by OpenAI:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Financial Expertise</strong> - Specialized in financial modeling and analysis</li>
                          <li>• <strong>Chat History</strong> - Save up to 5 conversation sessions per user</li>
                          <li>• <strong>Context Awareness</strong> - Maintains conversation context</li>
                          <li>• <strong>Real-time Responses</strong> - Instant AI-powered insights</li>
                          <li>• <strong>Session Management</strong> - Create, update, and delete chat sessions</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Dataset Management</h3>
                        <p className="text-gray-300 mb-4">
                          Comprehensive data upload and management system:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>File Upload</strong> - Support for Excel (.xlsx) and CSV files</li>
                          <li>• <strong>Storage Tracking</strong> - Monitor storage usage and limits</li>
                          <li>• <strong>File Validation</strong> - Type and size validation before upload</li>
                          <li>• <strong>CRUD Operations</strong> - Create, read, update, delete datasets</li>
                          <li>• <strong>User Isolation</strong> - Each user sees only their own datasets</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">🔐 Authentication & Security</h3>
                        <p className="text-gray-300 mb-4">
                          Secure user authentication and data protection:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Google OAuth</strong> - One-click social login</li>
                          <li>• <strong>Email/Password</strong> - Traditional authentication method</li>
                          <li>• <strong>Protected Routes</strong> - Dashboard requires authentication</li>
                          <li>• <strong>Row Level Security</strong> - Database-level access control</li>
                          <li>• <strong>JWT Tokens</strong> - Secure session management</li>
                          <li>• <strong>Profile Management</strong> - User profile creation and updates</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Financial Visualization</h3>
                        <p className="text-gray-300 mb-4">
                          Advanced charting and data visualization capabilities:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>2D Charts</strong> - Candlestick, OHLC, volume charts with Plotly.js</li>
                          <li>• <strong>3D Visualization</strong> - Volume-based depth charts with Three.js</li>
                          <li>• <strong>Real-time Data</strong> - WebSocket connections for live updates</li>
                          <li>• <strong>Interactive Controls</strong> - Zoom, pan, hover tooltips</li>
                          <li>• <strong>Multiple Chart Types</strong> - Area, line, candlestick, volume</li>
                          <li>• <strong>Technical Indicators</strong> - Moving averages, RSI, MACD, etc.</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Learning Resources</h3>
                        <p className="text-gray-300 mb-4">
                          Comprehensive educational content for financial modeling:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Machine Learning</strong> - ML techniques for finance</li>
                          <li>• <strong>Financial Modeling</strong> - DCF, valuation, forecasting</li>
                          <li>• <strong>Options & Derivatives</strong> - Black-Scholes, Greeks, volatility</li>
                          <li>• <strong>Statistics & Probability</strong> - Statistical analysis methods</li>
                          <li>• <strong>Insurance Risk Analysis</strong> - Actuarial science and risk assessment</li>
                          <li>• <strong>Crypto Modeling</strong> - Blockchain and DeFi analysis</li>
                          <li>• <strong>Code Examples</strong> - Python implementations for each topic</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">User Interface</h3>
                        <p className="text-gray-300 mb-4">
                          Modern, responsive, and accessible user interface:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Responsive Design</strong> - Mobile-first approach</li>
                          <li>• <strong>Dark Theme</strong> - Professional dark mode interface</li>
                          <li>• <strong>Accessibility</strong> - WCAG compliant with Radix UI</li>
                          <li>• <strong>Click-only Navigation</strong> - Disabled hover menus for better UX</li>
                          <li>• <strong>Glass Morphism</strong> - Modern UI design elements</li>
                          <li>• <strong>Loading States</strong> - Proper loading and error handling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "deployment" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Deployment & Infrastructure</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Frontend: Vercel (Recommended)</h3>
                        <p className="text-gray-300 mb-4">
                          Optimal platform for Next.js applications:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Zero-config deployment</strong> - Automatic builds and deployments</li>
                          <li>• <strong>Edge functions</strong> - Global CDN with serverless functions</li>
                          <li>• <strong>Automatic scaling</strong> - Handles traffic spikes</li>
                          <li>• <strong>Preview deployments</strong> - Test changes before production</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Backend: Fly.io</h3>
                        <p className="text-gray-300 mb-4">
                          Cloud platform for backend API deployment:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>Global deployment</strong> - Deploy close to users worldwide</li>
                          <li>• <strong>Auto-scaling</strong> - Automatically scale based on demand</li>
                          <li>• <strong>Health checks</strong> - Built-in monitoring and health checks</li>
                          <li>• <strong>Custom domains</strong> - Easy custom domain configuration</li>
                          <li>• <strong>Environment variables</strong> - Secure configuration management</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Environment Variables</h3>
                        <p className="text-gray-300 mb-4">
                          Required environment variables for deployment:
                        </p>
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                          <pre className="text-gray-300 text-sm">
{`# Backend API
NEXT_PUBLIC_API_URL=https://prismbackend.fly.dev

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI API
NEXT_OPENAI_API_KEY=your_openai_api_key

# Google OAuth (if using)
NEXT_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database (Supabase handles this)
# DATABASE_URL is automatically provided by Supabase`}
                          </pre>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Build Process</h3>
                        <p className="text-gray-300 mb-4">
                          Automated build and deployment pipeline:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>TypeScript compilation</strong> - Type checking and compilation</li>
                          <li>• <strong>ESLint</strong> - Code quality and style checking</li>
                          <li>• <strong>Build optimization</strong> - Code splitting and minification</li>
                          <li>• <strong>Static generation</strong> - Pre-rendered pages for performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "architecture" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">System Architecture</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Application Flow</h3>
                        <div className="bg-gray-800 rounded-lg p-6">
                          <div className="grid md:grid-cols-4 gap-4 text-center">
                            <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                              <h4 className="text-white font-semibold mb-2">Frontend</h4>
                              <p className="text-gray-300 text-sm">Next.js 15</p>
                              <p className="text-gray-300 text-sm">TypeScript + Tailwind</p>
                              <p className="text-gray-300 text-sm">Radix UI</p>
                            </div>
                            <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                              <h4 className="text-white font-semibold mb-2">API Layer</h4>
                              <p className="text-gray-300 text-sm">Next.js API Routes</p>
                              <p className="text-gray-300 text-sm">Authentication</p>
                              <p className="text-gray-300 text-sm">File Management</p>
                            </div>
                            <div className="bg-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                              <h4 className="text-white font-semibold mb-2">Database</h4>
                              <p className="text-gray-300 text-sm">PostgreSQL</p>
                              <p className="text-gray-300 text-sm">Supabase</p>
                              <p className="text-gray-300 text-sm">Row Level Security</p>
                            </div>
                            <div className="bg-orange-600/20 rounded-lg p-4 border border-orange-500/30">
                              <h4 className="text-white font-semibold mb-2">External APIs</h4>
                              <p className="text-gray-300 text-sm">OpenAI GPT</p>
                              <p className="text-gray-300 text-sm">Fly.io Backend</p>
                              <p className="text-gray-300 text-sm">Google OAuth</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Data Flow</h3>
                        <ol className="text-gray-300 space-y-3 ml-4">
                          <li><strong>1. User Authentication</strong> - Google OAuth or email/password via Supabase</li>
                          <li><strong>2. Profile Creation</strong> - Automatic profile setup with storage limits</li>
                          <li><strong>3. Data Upload</strong> - Excel/CSV files uploaded to server storage</li>
                          <li><strong>4. AI Chat</strong> - OpenAI GPT integration for financial insights</li>
                          <li><strong>5. Chat History</strong> - Save up to 5 chat sessions per user</li>
                          <li><strong>6. Dataset Management</strong> - CRUD operations on user datasets</li>
                          <li><strong>7. Data Visualization</strong> - Plotly.js and Three.js for charts</li>
                          <li><strong>8. Real-time Updates</strong> - WebSocket connections for live data</li>
                          <li><strong>9. Backend Integration</strong> - Fly.io backend for financial calculations</li>
                        </ol>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Security Features</h3>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>• <strong>HTTPS encryption</strong> - Secure data transmission</li>
                          <li>• <strong>JWT tokens</strong> - Secure session management via Supabase</li>
                          <li>• <strong>Row Level Security (RLS)</strong> - Database-level access control</li>
                          <li>• <strong>Protected Routes</strong> - HOC for authentication enforcement</li>
                          <li>• <strong>File Validation</strong> - Type and size validation for uploads</li>
                          <li>• <strong>User Isolation</strong> - Each user sees only their own data</li>
                          <li>• <strong>API Authentication</strong> - All API routes require valid JWT</li>
                          <li>• <strong>Environment variables</strong> - Secure configuration management</li>
                          <li>• <strong>CORS protection</strong> - Cross-origin request security</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
                        <h3 className="text-xl font-semibold text-white mb-3">Performance Optimizations</h3>
                        <ul className="text-gray-300 space-y-2">
                          <li>• <strong>Code splitting</strong> - Lazy loading for faster initial load</li>
                          <li>• <strong>Image optimization</strong> - Next.js automatic image optimization</li>
                          <li>• <strong>Static generation</strong> - Pre-rendered pages for SEO</li>
                          <li>• <strong>CDN delivery</strong> - Global content delivery network</li>
                          <li>• <strong>Database indexing</strong> - Optimized query performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
