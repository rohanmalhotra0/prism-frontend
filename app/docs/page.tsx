"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroBackground from "@/components/ui/HeroBackground";
import { 
  BookOpen, 
  Code, 
  Server, 
  ArrowRight,
  CheckCircle,
  FileText,
  Target,
  Lightbulb
} from "lucide-react";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen, description: "Platform introduction and features" },
    { id: "frontend", title: "Frontend", icon: Code, description: "React, Next.js, and UI components" },
    { id: "backend", title: "Backend", icon: Server, description: "API routes and Python services" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        {/* Hero section */}
        <div className="pt-32 pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            
            <h1 className="text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Complete technical documentation for Refrax's free educational platform for data analytics and mathematical visualization
            </p>
            
            {/* Quick Stats 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">15+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">2D/3D</div>
                <div className="text-sm text-gray-400">Visualization</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-sm text-gray-400">Powered</div>
              </div>
            </div>*/}

            
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-[#1877F2]" />
                    <h3 className="text-xl font-bold text-white">Table of Contents</h3>
                  </div>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 group ${
                            activeSection === section.id
                              ? "bg-[#1877F2] text-white shadow-lg transform scale-105"
                              : "text-gray-400 hover:text-white hover:bg-white/10 hover:transform hover:scale-105"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              activeSection === section.id
                                ? "bg-white/20"
                                : "bg-gray-700/50 group-hover:bg-white/10"
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold">{section.title}</div>
                              <div className={`text-xs ${
                                activeSection === section.id
                                  ? "text-white/70"
                                  : "text-gray-500 group-hover:text-gray-300"
                              }`}>
                                {section.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                
                {activeSection === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#1877F2] rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
                        <p className="text-gray-400">Understanding Refrax's architecture and capabilities</p>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-[#1877F2]/20 rounded-2xl p-8 border border-[#1877F2]/30">
                        <div className="flex items-center gap-3 mb-4">
                          <Lightbulb className="w-6 h-6 text-white" />
                          <h3 className="text-2xl font-semibold text-white">What is Refrax?</h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Refrax is a completely free educational platform that combines advanced data visualization, 
                          mathematical modeling, and interactive tools to help students learn data analytics, 
                          financial modeling, and 2D/3D mathematical visualization through hands-on experience.
                        </p>
                      </div>

                      
                       

                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                          <Code className="w-6 h-6 text-[#1877F2]" />
                          <h3 className="text-xl font-semibold text-white">Technology Stack</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-4">
                              <Code className="w-5 h-5 text-blue-400" />
                              <h4 className="text-lg font-semibold text-white">Frontend</h4>
                            </div>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Next.js 15 (App Router)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>TypeScript</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Tailwind CSS</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Plotly.js & react-plotly.js</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Three.js & @react-three/fiber</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Radix UI Components</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Particles.js</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>MathJS</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>XLSX & PapaParse</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Recharts</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-4">
                              <Server className="w-5 h-5 text-blue-400" />
                              <h4 className="text-lg font-semibold text-white">Backend</h4>
                            </div>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Next.js API Routes</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>FastAPI (Python Backend)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Supabase (BaaS)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>PostgreSQL Database</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Finnhub WebSockets</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Polygon API</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>OpenAI API</span>
                              </li>
                              
                            </ul>
                          </div>
                          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
                            <div className="flex items-center gap-2 mb-4">
                              <Server className="w-5 h-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">Infrastructure</h4>
                            </div>
                            <ul className="text-gray-300 space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span>Netlify (Frontend Hosting)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span>Fly.io (Backend Hosting)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span>Supabase (Database & Auth)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span>Cloudflare (CDN)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span>GitHub (Version Control)</span>
                              </li>
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



              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}