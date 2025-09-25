"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, BarChart3, Calculator, BookOpen, HelpCircle, FileText, GraduationCap, Search, User, X, TestTube, Database } from "lucide-react";
import RefraxLogo from "@/components/logos/RefraxLogo.jpeg";
import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../../ui/sheet";

export default function Navbar({
  className,
  homeUrl = "/",
}: {
  className?: string;
  homeUrl?: string;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className={cn("sticky top-0 z-50 px-4 py-3", className)}>
      <div className="fade-bottom bg-background/15 absolute inset-x-0 top-0 h-20 backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          {/* Left side */}
          <NavbarLeft>
            {/* Logo */}
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition"
            >
             
              Refrax
            </a>


            {/* Global Navigation */}
            <Navigation />
          </NavbarLeft>

          {/* Right side */}
          <NavbarRight>

            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex shrink-0 rounded-xl hover:bg-white/10 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="size-5 text-gray-300 hover:text-white transition-colors" /> : <Menu className="size-5 text-gray-300 hover:text-white transition-colors" />}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden rounded-xl hover:bg-white/10 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="size-5 text-gray-300 hover:text-white transition-colors" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/5 backdrop-blur-sm w-72 touch-manipulation border-l border-white/5"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Refrax Header */}
                <div className="flex items-center justify-center py-3 border-b border-white/5 mb-4">
                  <a 
                    href={homeUrl}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity touch-manipulation"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base font-bold text-white">Refrax</span>
                  </a>
                </div>

                <nav className="space-y-3">

                  {/* Math Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Math Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xs">Financial Modeling</span>
                      </a>
                      
                      <a 
                        href="/backtesting" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <TestTube className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-orange-200 transition-colors text-xs">Backtesting Sandbox</span>
                      </a>
                      
                      <a 
                        href="/demo" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Database className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-cyan-200 transition-colors text-xs">Demo Datasets</span>
                      </a>
                      
                      <a 
                        href="/general" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xs">General Modeling</span>
                      </a>
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/about" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-green-200 transition-colors text-xs">About Us</span>
                      </a>
                      <a 
                        href="/docs" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-green-200 transition-colors text-xs">Documentation</span>
                      </a>
                    </div>
                  </div>

                  {/* Learn Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Learn</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/learn" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xs">Learn</span>
                      </a>
                      <a 
                        href="/research" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Search className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xs">Research</span>
                      </a>
                    </div>
                  </div>

                  {/* AI Assistant Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">AI Assistant</h3>
                    </div>
                    <div className="space-y-1">
                      <a 
                        href="/ai" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-white">AI</span>
                        </div>
                        <span className="font-semibold text-white group-hover:text-cyan-200 transition-colors text-xs">AI Assistant</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Persistent Sidebar */}
            {sidebarOpen && (
              <div className="hidden lg:block fixed right-0 top-0 h-full w-72 bg-black/5 backdrop-blur-sm border-l border-white/5 z-40 overflow-y-auto">
              <div className="p-4">
                {/* Refrax Header */}
                <div className="flex items-center justify-center py-3 border-b border-white/5 mb-4">
                  <a 
                    href={homeUrl}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity touch-manipulation"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base font-bold text-white">Refrax</span>
                  </a>
                </div>

                <nav className="space-y-3">
                  {/* Learn Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Learn</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/learn" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xs">Learn</span>
                      </a>
                      <a 
                        href="/research" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Search className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xs">Research</span>
                      </a>
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/about" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-green-200 transition-colors text-xs">About Me</span>
                      </a>
                      <a 
                        href="/docs" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-green-200 transition-colors text-xs">Documentation</span>
                      </a>
                    </div>
                  </div>

                  {/* Math Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Math Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xs">Stocks & Indices</span>
                      </a>
                      
                      <a 
                        href="/general" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xs">General Modeling</span>
                      </a>
                    </div>
                  </div>

                  {/* AI Assistant Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">AI Assistant</h3>
                    </div>
                    <div className="space-y-1">
                      <a 
                        href="/ai" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-white">AI</span>
                        </div>
                        <span className="font-semibold text-white group-hover:text-cyan-200 transition-colors text-xs">AI Assistant</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            )}
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
