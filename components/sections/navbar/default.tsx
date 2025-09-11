"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, BarChart3, Calculator, BookOpen, HelpCircle, FileText, GraduationCap, Search, User } from "lucide-react";
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
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-xl w-72 touch-manipulation border-l border-gray-800/50"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800/50">
                  <a 
                    href={homeUrl}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity touch-manipulation"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base font-bold text-white">Refrax</span>
                  </a>
                </div>

                <nav className="space-y-3">

                  {/* Quick Access Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-3 h-3 text-blue-400" />
                      <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Quick Access</h3>
                    </div>
                    <div className="space-y-1">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-400/40 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xs">Stocks & Indices</div>
                          <div className="text-xs text-gray-400">Financial modeling tools</div>
                        </div>
                      </a>
                      
                      <a 
                        href="/general" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 hover:border-green-400/40 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-teal-500/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-green-200 transition-colors text-xs">General Modeling</div>
                          <div className="text-xs text-gray-400">Math visualizer & datasets</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  {/* Community Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-3 h-3 text-gray-400" />
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Community</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/learn" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 touch-manipulation"
                      >
                        <BookOpen className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-xs">Learn</span>
                      </a>
                      <a 
                        href="/research" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 touch-manipulation"
                      >
                        <Search className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-xs">Research</span>
                      </a>
                    </div>
                  </div>
                  {/* Resources Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/about" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 touch-manipulation"
                      >
                        <User className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-xs">About Us</span>
                      </a>
                      <a 
                        href="/#FAQ" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 touch-manipulation"
                      >
                        <HelpCircle className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-xs">FAQ</span>
                      </a>
                      <a 
                        href="/docs" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800/50 transition-all duration-200 touch-manipulation"
                      >
                        <FileText className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="text-gray-300 group-hover:text-white transition-colors text-xs">Documentation</span>
                      </a>
                    </div>
                  </div>

                  

                  {/* AI Assistant Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AI</span>
                      </div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Assistant</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/ai" 
                        className="group flex items-center gap-2 p-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-xs font-bold text-white">AI</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-purple-200 transition-colors text-xs">AI Assistant</div>
                          <div className="text-xs text-gray-400">Chat with our AI</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
