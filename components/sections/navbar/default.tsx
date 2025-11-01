"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, BarChart3, Calculator, BookOpen, HelpCircle, FileText, GraduationCap, Search, User, X, TestTube, Database, TrendingUp, Edit3 } from "lucide-react";
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
import { ModeToggle } from "@/components/ui/mode-toggle";

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
            {/* Theme toggle */}
            <div className="mr-2">
              <ModeToggle />
            </div>
            {/* Dataset Editor Button */}
            <a
              href="/dataset-editor"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg hover:bg-muted"
            >
              <Edit3 className="w-4 h-4" />
              Dataset Editor
            </a>

            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex shrink-0 rounded-xl hover:bg-muted border border-border hover:border-border transition-all duration-200"
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
                className="shrink-0 md:hidden rounded-xl hover:bg-muted border border-border hover:border-border transition-all duration-200"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="size-5 text-gray-300 hover:text-white transition-colors" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card/90 backdrop-blur-sm w-72 touch-manipulation border-l border-border"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Refrax Header */}
                <div className="flex items-center justify-center py-3 border-b border-border mb-4">
                  <a 
                    href={homeUrl}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity touch-manipulation"
                  >
                    <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base font-bold text-foreground">Refrax</span>
                  </a>
                </div>

                <nav className="space-y-3">

                  {/* Math Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Math Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      
                      <a 
                        href="/general" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">General Modeling</span>
                      </a>

                      <a 
                        href="/dataset-editor" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Edit3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Dataset Editor</span>
                      </a>
                    </div>
                  </div>

                  {/* Learn Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Learn</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/learn" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Learn</span>
                      </a>
                      
                      <a 
                        href="/learn/examples" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Database className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Examples</span>
                      </a>
                    </div>
                  </div>

                  {/* Finance Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Finance Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Financial Modeling</span>
                      </a>
                      
                      
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Resources</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/about" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">About Us</span>
                      </a>
                      <a 
                        href="/docs" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Documentation</span>
                      </a>
                    </div>
                  </div>

                  {/* AI Assistant Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">AI Assistant</h3>
                    </div>
                    <div className="space-y-1">
                      <a 
                        href="/ai" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-white">AI</span>
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">AI Assistant</span>
                      </a>
                    </div>
                  </div>
                </nav>

                {/* Theme Section */}
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Theme</h3>
                  <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                    <span className="text-xs text-muted-foreground">Light / Dark</span>
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Persistent Sidebar */}
            {sidebarOpen && (
              <div className="hidden lg:block fixed right-0 top-0 h-full w-72 bg-card/90 backdrop-blur-sm border-l border-border z-40 overflow-y-auto">
              <div className="p-4">
                {/* Refrax Header with Close Button */}
                <div className="flex items-center justify-between py-3 border-b border-border mb-4">
                  <a 
                    href={homeUrl}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity touch-manipulation"
                  >
                    <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-base font-bold text-foreground">Refrax</span>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(false)}
                    className="shrink-0 rounded-lg hover:bg-muted border border-border hover:border-border transition-all duration-200"
                    aria-label="Close sidebar"
                  >
                    <X className="size-4 text-gray-300 hover:text-white transition-colors" />
                  </Button>
                </div>

                <nav className="space-y-3">
                  {/* Learn Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Learn</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/learn" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Learn</span>
                      </a>
                      
                      <a 
                        href="/learn/examples" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Database className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Examples</span>
                      </a>
                    </div>
                  </div>

                  {/* Finance Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Finance Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Financial Modeling</span>
                      </a>
                      
                      
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Docs</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/about" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">About Me</span>
                      </a>
                      <a 
                        href="/docs" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Documentation</span>
                      </a>
                    </div>
                  </div>

                  {/* Math Tools Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Math Tools</h3>
                    </div>
                    <div className="space-y-0.5">
                      <a 
                        href="/financePage" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BarChart3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Stocks & Indices</span>
                      </a>
                      
                      <a 
                        href="/general" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Calculator className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">General Modeling</span>
                      </a>

                      <a 
                        href="/dataset-editor" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Edit3 className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">Dataset Editor</span>
                      </a>
                    </div>
                  </div>

                  {/* AI Assistant Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">AI Assistant</h3>
                    </div>
                    <div className="space-y-1">
                      <a 
                        href="/ai" 
                        className="group flex items-center gap-2 p-2 rounded-lg bg-muted backdrop-blur-sm border border-border hover:bg-muted transition-all duration-200 touch-manipulation"
                      >
                        <div className="w-6 h-6 bg-[#1877F2] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-sm font-bold text-white">AI</span>
                        </div>
                        <span className="font-semibold text-foreground transition-colors text-xs">AI Assistant</span>
                      </a>
                    </div>
                  </div>
                </nav>

                {/* Theme Section */}
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Theme</h3>
                  <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                    <span className="text-xs text-muted-foreground">Light / Dark</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>
            )}
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
