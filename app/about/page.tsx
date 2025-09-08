"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Button } from "@/components/ui/button";

// GitHub Icon Component
const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

// LinkedIn Icon Component
const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Globe Icon Component
const GlobeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Team Members Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Rohan Malhotra */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-6">
                  <img
                    src="/rohanphoto.jpg"
                    alt="Rohan Malhotra"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Rohan Malhotra</h2>
                <p className="text-purple-400 font-medium">Founder & Developer</p>
                <p className="text-gray-400 text-sm">Computer Science & Economics, NYU</p>
              </div>

              <div className="space-y-4 text-gray-300 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🎓 Education</h3>
                  <p className="text-sm">BS Computer Science & Economics, Mathematics Minor</p>
                  <p className="text-sm text-gray-400">New York University</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🔬 Research</h3>
                  <p className="text-sm">Virginia Tech Hume Center - CubeSats & Signal Processing</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Goals</h3>
                  <p className="text-sm">FCAS Actuary • Quantitative Finance • Full-Stack Development</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Python</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">React</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Finance</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">ML</span>
              </div>

              <div className="flex gap-3">
                <Button
                  asChild
                  className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                  <a href="/rohanmalhotra_.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <span>📄</span>
                    Resume
                  </a>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                >
                  <a href="https://www.linkedin.com/in/rohanamal/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <LinkedInIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </Button>
                <Button
  asChild
  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
>
  <a
    href="https://github.com/rohanmalhotra0"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2"
  >
    <GitHubIcon className="w-5 h-5" />
    GitHub
  </a>
</Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  <a href="https://rohanm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <GlobeIcon className="w-5 h-5" />
                    <span>Website</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Mihir Ganesan */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-6">
                  <img
                    src="/mihir-ganesan.jpeg"
                    alt="Mihir Ganesan"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500/50 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Mihir Ganesan</h2>
                <p className="text-blue-400 font-medium">Business Lead</p>
                <p className="text-gray-400 text-sm">Business and Computer Science, NYU</p>
              </div>

              <div className="space-y-4 text-gray-300 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🎓 Education</h3>
                  <p className="text-sm">BS Business and Computer Science</p>
                  <p className="text-sm text-gray-400">University Student</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">💻 Expertise</h3>
                  <p className="text-sm">Full-Stack Development • Data Structures • Algorithms</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">🎯 Goals</h3>
                  <p className="text-sm">Software Engineering • Tech Innovation • Startup Development</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">JavaScript</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Python</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">React</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">Node.js</span>
              </div>

              <div className="flex gap-3">
                <Button
                  asChild
                  className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  <a href="#" className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                    <span>📄</span>
                    Resume
                  </a>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                >
                  <a href="https://www.linkedin.com/in/mihir-ganesan/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <LinkedInIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  <a href="#" className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                    <GitHubIcon className="w-5 h-5" />
                    GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  <a href="#" className="flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                    <GlobeIcon className="w-5 h-5" />
                    <span>Website</span>
                  </a>
                </Button>
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

