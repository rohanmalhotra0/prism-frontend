"use client";

import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";

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
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none z-5"></div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-3xl mx-auto px-6 py-16 flex items-center justify-center">
          {/* Centered Profile Card */}
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center hover:bg-white/15 transition-colors shadow-lg">
            <div className="flex flex-col items-center">
              <img
                src="/rohanphoto.jpg"
                alt="Rohan Malhotra"
                className="w-40 h-40 rounded-full object-cover border-4 border-purple-500/50 shadow-lg mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-white">About Me</h1>
              <h2 className="mt-3 text-2xl font-semibold text-white">Rohan Malhotra</h2>
              <p className="text-purple-400">Founder & Developer</p>
              <p className="mt-4 text-gray-300 leading-relaxed">
                Pursuing a degree in Computer Science and Economics with a Mathematics minor at New York University,
                with an educational path designed around interdisciplinary problem‑solving. Past experiences include
                contributing to a NASA CubeSat imaging systems proposal, building data‑driven stock market prediction
                models, and developing Refrax — a platform that applies advanced analytics and interactive
                visualization to complex financial and technical challenges. Committed to leveraging technology to
                drive impactful, resource‑conscious solutions in finance and beyond.
              </p>

              <div className="mt-6 grid sm:grid-cols-3 gap-4 w-full text-left">
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow">
                  <h3 className="text-sm font-semibold text-white mb-2">Education</h3>
                  <p className="text-sm text-gray-300">B.A. Computer Science & Economics; Math Minor</p>
                  <p className="text-xs text-gray-400">New York University</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow">
                  <h3 className="text-sm font-semibold text-white mb-2">Research</h3>
                  <p className="text-sm text-gray-300">Virginia Tech Hume Center — CubeSat imaging systems, signal processing, autonomy</p>
                  <p className="text-xs text-gray-400">Supported NASA‑focused proposal work</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow">
                  <h3 className="text-sm font-semibold text-white mb-2">Work Experience</h3>
                  <ul className="text-sm text-gray-300 list-disc pl-4 space-y-1">
                    <li>ML Intern — ARESS Software (Summer 2025)</li>
                    <li>Business Analyst Intern — Y‑Axis Overseas (Summer 2024)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">Python</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">React</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">Finance</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">ML</span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
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
        </div>
        {/* Resume-style sections */}
        <div className="max-w-5xl mx-auto px-6 pb-20 space-y-10">
          {/* Education */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Education</h3>
            <div className="grid gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">New York University, Courant Institute</h4>
                  <span className="text-xs text-gray-400">Aug 2025 – May 2027</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">B.A. Computer Science & Economics; Mathematics Minor · Combined GPA: 3.75</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Virginia Tech College of Engineering</h4>
                  <span className="text-xs text-gray-400">Aug 2024 – May 2025</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">B.S. Computer Science · Transferred</p>
              </div>
            </div>
          </section>

          {/* Technical Skills & Certifications */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Technical Skills & Certifications</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow">
                <h4 className="text-sm font-semibold text-white mb-2">Actuarial Exams</h4>
                <p className="text-sm text-gray-300">Taken: Exam P, Exam FM · Scheduled: MAS‑I (Mar), MAS‑II (Jun)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow">
                <h4 className="text-sm font-semibold text-white mb-2">Languages</h4>
                <p className="text-sm text-gray-300">Python, Java, C/C++, SQL, R, JavaScript, HTML/CSS, MATLAB</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow">
                <h4 className="text-sm font-semibold text-white mb-2">Technologies</h4>
                <p className="text-sm text-gray-300">TensorFlow, Flask, React, Three.js, Node/Next.js, WebSockets, Git, Linux, Excel/VBA</p>
              </div>
            </div>
          </section>

          {/* Experience (Research) */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Experience</h3>
            <div className="grid gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Aerospace Research Assistant — Hume Center (VT)</h4>
                  <span className="text-xs text-gray-400">Aug 2024 – May 2025 · Blacksburg, VA</span>
                </div>
                <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Researched imaging & signal‑processing techniques for environmental monitoring.</li>
                  <li>Co‑authored a NASA CubeSat Launch Initiative proposal; autonomous imaging integration.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Work Experience</h3>
            <div className="grid gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Machine Learning Intern — ARESS Software</h4>
                  <span className="text-xs text-gray-400">Jun 2025 – Aug 2025 · Chatham, NJ</span>
                </div>
                <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Built LASSO/Ridge prototypes in Python (scikit‑learn) for IT‑ticket ETA forecasting; projected 15% SLA improvement.</li>
                  <li>Created interactive Excel dashboards for real‑time reporting and prioritization.</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Business Analyst Intern — Y‑Axis Overseas Careers</h4>
                  <span className="text-xs text-gray-400">Jun 2024 – Aug 2024 · Blacksburg, VA</span>
                </div>
                <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Cleaned/normalized SQL data for predictive models of approval rates and timelines; cut prep time by 15%.</li>
                  <li>Built Excel dashboards and translated forecasts into actionable recommendations.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Leadership</h3>
            <div className="grid gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Pivot at VT — Co‑President & Lead Software Engineer</h4>
                  <span className="text-xs text-gray-400">Sep 2024 – Present</span>
                </div>
                <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li>Led 40‑member org, coordinated teams, managed GitHub workflows and algorithm integration.</li>
                  <li>Built a Raspberry Pi automated trading bot (live data, Python, Alpaca API), up to 68% predictive accuracy.</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-white font-semibold">Special Olympics — Intern & Volunteer</h4>
                  <span className="text-xs text-gray-400">Sep 2019 – Present</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">Interned at a school for students with disabilities (math) and served as a 5‑year volunteer.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

