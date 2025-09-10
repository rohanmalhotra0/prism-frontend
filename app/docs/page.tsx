"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "frontend", title: "Frontend" },
    { id: "backend", title: "Backend" },
    { id: "database", title: "Database" },
    { id: "apis", title: "APIs" },
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
              Complete technical documentation for Refrax's free educational platform for data analytics and mathematical visualization
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
                    <h2 className="text-3xl font-bold text-white mb-8">Platform Overview</h2>
                    
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
                        <h3 className="text-2xl font-semibold text-white mb-4">What is Refrax?</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Refrax is a completely free educational platform that combines advanced data visualization, 
                          mathematical modeling, and interactive tools to help students learn data analytics, 
                          financial modeling, and 2D/3D mathematical visualization through hands-on experience.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <h3 className="text-xl font-semibold text-white mb-4">Core Features</h3>
                          <ul className="text-gray-300 space-y-3">
                            <li>• Interactive 2D and 3D mathematical visualizations</li>
                            <li>• AI-powered learning assistant for complex topics</li>
                            <li>• Dataset upload and analysis tools (Excel/CSV)</li>
                            <li>• Financial data modeling and analysis</li>
                            <li>• Real-time mathematical calculations</li>
                            <li>• Free educational resources and tutorials</li>
                          </ul>
                        </div>
                        
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
                          <ul className="text-gray-300 space-y-3">
                            <li>• Completely free with no registration required</li>
                            <li>• User-friendly interface for all skill levels</li>
                            <li>• Interactive learning through hands-on tools</li>
                            <li>• Mobile-responsive design for learning anywhere</li>
                            <li>• Cloud-based infrastructure for reliability</li>
                            <li>• Educational focus on data analytics and math</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Frontend</h4>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li>• Next.js 15 (App Router)</li>
                              <li>• TypeScript</li>
                              <li>• Tailwind CSS</li>
                              <li>• Plotly.js & react-plotly.js</li>
                              <li>• Three.js & @react-three/fiber</li>
                              <li>• Radix UI Components</li>
                              <li>• MathJS</li>
                              <li>• XLSX & PapaParse</li>
                              <li>• Recharts</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Backend</h4>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li>• Next.js API Routes</li>
                              <li>• FastAPI (Python Backend)</li>
                              <li>• Supabase (BaaS)</li>
                              <li>• PostgreSQL Database</li>
                              <li>• Finnhub WebSockets</li>
                              <li>• Polygon API</li>
                              <li>• OpenAI API</li>
                              <li>• Stripe Integration</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Infrastructure</h4>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li>• Netlify (Frontend Hosting)</li>
                              <li>• Fly.io (Backend Hosting)</li>
                              <li>• Supabase (Database & Auth)</li>
                              <li>• Cloudflare (CDN)</li>
                              <li>• GitHub (Version Control)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "frontend" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Frontend Technologies</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Next.js 15</h3>
                        <p className="text-gray-300 mb-4">
                          Modern React framework with App Router providing server-side rendering, static generation, 
                          and built-in API routes for optimal performance and developer experience.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Server-Side Rendering (SSR)</li>
                              <li>• Static Site Generation (SSG)</li>
                              <li>• Automatic code splitting</li>
                              <li>• File-based routing</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Benefits</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Better SEO performance</li>
                              <li>• Faster loading times</li>
                              <li>• Optimized bundle sizes</li>
                              <li>• Built-in API functionality</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">TypeScript</h3>
                        <p className="text-gray-300 mb-4">
                          Type-safe JavaScript that provides static type checking, better IDE support, 
                          and improved code maintainability for large-scale applications.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Development Benefits</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Catch errors at compile time</li>
                              <li>• Enhanced IntelliSense support</li>
                              <li>• Safer refactoring</li>
                              <li>• Self-documenting code</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Production Benefits</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Reduced runtime errors</li>
                              <li>• Better code quality</li>
                              <li>• Easier maintenance</li>
                              <li>• Team collaboration</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">UI & Styling</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Tailwind CSS</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Utility-first CSS framework for rapid UI development with responsive design and dark mode support.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Utility classes for rapid styling</li>
                              <li>• Mobile-first responsive design</li>
                              <li>• Built-in dark mode support</li>
                              <li>• Custom component system</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Radix UI</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Accessible component primitives providing WCAG compliant UI elements with full customization.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Accessible navigation menus</li>
                              <li>• Modal and dialog components</li>
                              <li>• Form controls and inputs</li>
                              <li>• WCAG compliance built-in</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Data Visualization</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Plotly.js & react-plotly.js</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Interactive charting library for financial data visualization with real-time updates and export capabilities.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Financial charts (candlestick, OHLC)</li>
                              <li>• Interactive zoom and pan</li>
                              <li>• Real-time data streaming</li>
                              <li>• Multiple export formats</li>
                              <li>• 2D/3D mathematical plots</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Three.js & @react-three/fiber</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              3D graphics library for advanced visualizations including volume charts and 3D data representations.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• 3D volume charts</li>
                              <li>• Interactive 3D controls</li>
                              <li>• WebGL rendering</li>
                              <li>• Custom 3D visualizations</li>
                              <li>• @react-three/drei helpers</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Mathematical & Data Processing</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">MathJS</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              JavaScript library for mathematical expression parsing and evaluation in the Math Visualizer.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Mathematical expression parsing</li>
                              <li>• Safe evaluation of equations</li>
                              <li>• Support for sin, cos, exp, log, sqrt</li>
                              <li>• Real-time equation evaluation</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">File Processing</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Libraries for handling Excel and CSV file uploads and processing in the Dataset Lab.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• XLSX - Excel file processing</li>
                              <li>• PapaParse - CSV file parsing</li>
                              <li>• Data validation & cleaning</li>
                              <li>• Date conversion & formatting</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Additional Libraries</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Recharts</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Composable charting library built on React and D3 for additional chart types and visualizations.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Responsive chart components</li>
                              <li>• Multiple chart types</li>
                              <li>• React integration</li>
                              <li>• Custom styling support</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Lucide React</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Beautiful & consistent icon toolkit with 1000+ icons for UI components and navigation.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• 1000+ customizable icons</li>
                              <li>• Consistent design system</li>
                              <li>• Tree-shakeable imports</li>
                              <li>• TypeScript support</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "backend" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Backend Architecture</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Next.js API Routes</h3>
                        <p className="text-gray-300 mb-4">
                          Serverless API endpoints built with Next.js providing authentication, file management, 
                          and data processing capabilities.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Core Endpoints</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• /api/chat - AI chat functionality</li>
                              <li>• /api/datasets - File management</li>
                              <li>• /api/profile - User profiles</li>
                              <li>• /api/auth - Authentication</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• JWT token validation</li>
                              <li>• File upload handling</li>
                              <li>• Error handling & logging</li>
                              <li>• CORS configuration</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Supabase Integration</h3>
                        <p className="text-gray-300 mb-4">
                          Backend-as-a-Service providing authentication, database, and real-time capabilities 
                          with built-in security and scalability.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Authentication</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Google OAuth integration</li>
                              <li>• Email/password authentication</li>
                              <li>• JWT token management</li>
                              <li>• Session handling</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Database Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• PostgreSQL database</li>
                              <li>• Row Level Security (RLS)</li>
                              <li>• Real-time subscriptions</li>
                              <li>• Automatic API generation</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">FastAPI Backend</h3>
                        <p className="text-gray-300 mb-4">
                          Python-based backend service providing advanced financial data processing, 
                          machine learning capabilities, and real-time data streaming.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Core Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Financial data processing</li>
                              <li>• Machine learning model training</li>
                              <li>• Real-time WebSocket connections</li>
                              <li>• CORS middleware configuration</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Endpoints</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• /finance - Market data</li>
                              <li>• /fundamentals/[symbol] - Company data</li>
                              <li>• /chat - AI chat processing</li>
                              <li>• /health - Service health check</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">External Services</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">OpenAI Integration</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              AI-powered chatbot providing financial insights and analysis through OpenAI's GPT models.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Financial expertise training</li>
                              <li>• Context-aware responses</li>
                              <li>• Chat session management</li>
                              <li>• Real-time AI insights</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Stripe Integration</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Payment processing and subscription management for premium features and services.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Payment processing</li>
                              <li>• Subscription management</li>
                              <li>• Webhook handling</li>
                              <li>• Security compliance</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">File Management</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Data Processing</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Secure file storage and processing for Excel and CSV datasets with validation and user isolation.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Excel/CSV file processing</li>
                              <li>• File validation & security</li>
                              <li>• User storage limits</li>
                              <li>• Metadata tracking</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Real-time Features</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              WebSocket connections and real-time data streaming for live market updates and chat functionality.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Finnhub WebSocket integration</li>
                              <li>• Real-time market data</li>
                              <li>• Live chat updates</li>
                              <li>• Connection management</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "database" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">Database Design</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">PostgreSQL with Supabase</h3>
                        <p className="text-gray-300 mb-4">
                          Robust relational database with built-in security, real-time capabilities, 
                          and automatic API generation for seamless data management.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Core Tables</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• profiles - User account data</li>
                              <li>• datasets - File metadata</li>
                              <li>• chat_sessions - AI conversations</li>
                              <li>• auth.users - Authentication</li>
                              <li>• storage.objects - File storage</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">PostgreSQL Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• ACID compliance</li>
                              <li>• Advanced indexing</li>
                              <li>• JSON/JSONB support</li>
                              <li>• Full-text search</li>
                              <li>• Extensions & functions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Supabase Backend-as-a-Service</h3>
                        <p className="text-gray-300 mb-4">
                          Complete backend solution providing database, authentication, storage, 
                          and real-time capabilities with built-in security and scalability.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Core Services</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• PostgreSQL database hosting</li>
                              <li>• Real-time subscriptions</li>
                              <li>• File storage & CDN</li>
                              <li>• Edge functions</li>
                              <li>• Database backups</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Supabase Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Row Level Security (RLS)</li>
                              <li>• Automatic API generation</li>
                              <li>• Built-in authentication</li>
                              <li>• Real-time subscriptions</li>
                              <li>• Dashboard & monitoring</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Security & Access Control</h3>
                        <p className="text-gray-300 mb-4">
                          Multi-layered security approach ensuring data protection and user privacy 
                          through authentication, authorization, and encryption.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Authentication</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• JWT token validation</li>
                              <li>• Google OAuth integration</li>
                              <li>• Email/password auth</li>
                              <li>• Session management</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Authorization</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Row Level Security (RLS)</li>
                              <li>• User data isolation</li>
                              <li>• API route protection</li>
                              <li>• Permission-based access</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Data Management</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Storage Management</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Efficient storage tracking and management with user limits and file metadata.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• User storage limits</li>
                              <li>• File size tracking</li>
                              <li>• Storage usage monitoring</li>
                              <li>• Automatic cleanup</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Performance</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Optimized database performance with indexing, caching, and efficient queries.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Database indexing</li>
                              <li>• Query optimization</li>
                              <li>• Connection pooling</li>
                              <li>• Caching strategies</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "apis" && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8">API Integration</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Internal APIs</h3>
                        <p className="text-gray-300 mb-4">
                          RESTful API endpoints built with Next.js providing core functionality 
                          for authentication, data management, and AI integration.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Authentication APIs</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• POST /api/auth/login</li>
                              <li>• POST /api/auth/register</li>
                              <li>• GET /api/auth/profile</li>
                              <li>• POST /api/auth/logout</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Data APIs</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• POST /api/datasets/upload</li>
                              <li>• GET /api/datasets</li>
                              <li>• DELETE /api/datasets/[id]</li>
                              <li>• GET /api/profile</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">External API Integrations</h3>
                        <p className="text-gray-300 mb-4">
                          Third-party service integrations providing AI capabilities, 
                          financial data, and enhanced functionality.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">OpenAI API</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              AI-powered chatbot providing financial insights and analysis through GPT models.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Chat completion endpoints</li>
                              <li>• Financial expertise training</li>
                              <li>• Context-aware responses</li>
                              <li>• Rate limiting & error handling</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Polygon API</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Comprehensive financial data provider offering real-time and historical market data.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Real-time stock prices</li>
                              <li>• Historical market data</li>
                              <li>• Company fundamentals</li>
                              <li>• Market indicators</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">Real-time Data & WebSockets</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Finnhub WebSockets</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Real-time financial data streaming for live market updates and price feeds.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Real-time price streaming</li>
                              <li>• WebSocket connections</li>
                              <li>• Market data feeds</li>
                              <li>• Connection management</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Stripe API</h4>
                            <p className="text-gray-300 text-sm mb-3">
                              Payment processing and subscription management for premium features.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Payment processing</li>
                              <li>• Subscription management</li>
                              <li>• Webhook handling</li>
                              <li>• Security compliance</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-2xl font-semibold text-white mb-4">API Security & Performance</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Security Measures</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• JWT token validation</li>
                              <li>• CORS configuration</li>
                              <li>• Rate limiting</li>
                              <li>• Input validation</li>
                              <li>• Error handling</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-3">Performance Features</h4>
                            <ul className="text-gray-300 space-y-1 text-sm">
                              <li>• Response caching</li>
                              <li>• Connection pooling</li>
                              <li>• Async processing</li>
                              <li>• Error recovery</li>
                              <li>• Monitoring & logging</li>
                            </ul>
                          </div>
                        </div>
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