"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/sections/navbar/default";
import Footer from "@/components/sections/footer/default";
import { Button } from "@/components/ui/button";
import HeroBackground from "@/components/ui/HeroBackground";
import { 
  Github, 
  Linkedin, 
  Globe, 
  Download, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Code,
  Brain,
  TrendingUp,
  Users,
  Rocket,
  Star,
  ChevronRight,
  ExternalLink,
  User,
  GraduationCap,
  Briefcase
} from "lucide-react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'leadership', label: 'Leadership', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="rgba(0,0,0,1)" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1877F2] to-blue-400 rounded-full blur-2xl opacity-30 scale-110"></div>
                <img
                  src="/rohanphoto.jpg"
                  alt="Rohan Malhotra"
                  className="relative w-40 h-40 rounded-full object-cover border-4 border-white/50 shadow-2xl"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 text-white">
                Rohan Malhotra
              </h1>
              <p className="text-2xl md:text-3xl text-white font-semibold mb-6">Founder & Developer</p>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Computer Science & Economics student at NYU with a passion for building data-driven solutions. 
                Creating Refrax to democratize access to advanced analytics and financial modeling tools.
              </p>
            </div>


            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button
                asChild
                className="rounded-full bg-[#1877F2] hover:bg-[#1877F2] px-6 py-3"
              >
                <a href="/rohanmalhotra_.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Resume
                </a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-[#0077B5] hover:bg-[#005885] px-6 py-3"
              >
                <a href="https://www.linkedin.com/in/rohanamal/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-[#333333] hover:bg-[#24292e] px-6 py-3"
              >
                <a href="https://github.com/rohanmalhotra0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                className="rounded-full bg-[#6B7280] hover:bg-[#4B5563] px-6 py-3"
              >
                <a href="https://rohanm.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Website
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6">Navigation</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group ${
                            activeSection === section.id
                              ? "bg-[#1877F2] text-white shadow-lg"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{section.label}</span>
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
                
                {/* Overview Section */}
                {activeSection === 'overview' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
                      <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        I'm a Computer Science and Economics student at New York University with a Mathematics minor, 
                        passionate about building data-driven solutions that solve real-world problems. My journey 
                        combines technical expertise with business acumen, allowing me to create impactful tools 
                        like Refrax that democratize access to advanced analytics.
                      </p>
                      
                      <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        My experience spans from NASA CubeSat research to building automated trading systems, 
                        always with a focus on leveraging technology to drive meaningful change. I believe in 
                        the power of interdisciplinary thinking and am committed to creating solutions that 
                        bridge the gap between complex technical concepts and practical applications.
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-[#1877F2]/10 rounded-xl p-6 border border-[#1877F2]/20">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#1877F2]" />
                            Location
                          </h3>
                          <p className="text-gray-300">New York, NY</p>
                        </div>
                        <div className="bg-[#1877F2]/10 rounded-xl p-6 border border-[#1877F2]/20">
                          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#1877F2]" />
                            Contact
                          </h3>
                          <p className="text-gray-300">ram9952@nyu.edu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Education Section */}
                {activeSection === 'education' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">Education</h2>
                      <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">New York University, Courant Institute</h3>
                            <p className="text-[#1877F2] font-medium">B.A. Computer Science & Economics; Mathematics Minor</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Aug 2025 – May 2027</span>
                        </div>
                        <p className="text-gray-300">Combined GPA: 3.75</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Virginia Tech College of Engineering</h3>
                            <p className="text-[#1877F2] font-medium">B.S. Computer Science</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Aug 2024 – May 2025</span>
                        </div>
                        <p className="text-gray-300">Transferred to NYU</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience Section */}
                {activeSection === 'experience' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">Experience</h2>
                      <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Machine Learning Intern</h3>
                            <p className="text-[#1877F2] font-medium">ARESS Software</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Jun 2025 – Aug 2025</span>
                        </div>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Built LASSO/Ridge prototypes in Python (scikit‑learn) for IT‑ticket ETA forecasting; projected 15% SLA improvement
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Created interactive Excel dashboards for real‑time reporting and prioritization
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Business Analyst Intern</h3>
                            <p className="text-[#1877F2] font-medium">Y‑Axis Overseas Careers</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Jun 2024 – Aug 2024</span>
                        </div>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Cleaned/normalized SQL data for predictive models of approval rates and timelines; cut prep time by 15%
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Built Excel dashboards and translated forecasts into actionable recommendations
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Aerospace Research Assistant</h3>
                            <p className="text-[#1877F2] font-medium">Hume Center (VT)</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Aug 2024 – May 2025</span>
                        </div>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Researched imaging & signal‑processing techniques for environmental monitoring
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Co‑authored a NASA CubeSat Launch Initiative proposal; autonomous imaging integration
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {activeSection === 'skills' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">Skills & Certifications</h2>
                      <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#1877F2]" />
                          Actuarial Exams
                        </h3>
                        <p className="text-gray-300 mb-2">Taken: Exam P, Exam FM</p>
                        <p className="text-gray-300">Scheduled: MAS‑I (Mar), MAS‑II (Jun)</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Code className="w-5 h-5 text-[#1877F2]" />
                          Programming Languages
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'Java', 'C/C++', 'SQL', 'R', 'JavaScript', 'HTML/CSS', 'MATLAB'].map((lang) => (
                            <span key={lang} className="px-3 py-1 bg-[#1877F2]/20 text-[#1877F2] text-sm rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-[#1877F2]" />
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {['TensorFlow', 'Flask', 'React', 'Three.js', 'Node/Next.js', 'WebSockets', 'Git', 'Linux', 'Excel/VBA'].map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-[#1877F2]/20 text-[#1877F2] text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-[#1877F2]" />
                          Specializations
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {['Machine Learning', 'Financial Modeling', 'Data Analytics', 'Quantitative Finance', 'Risk Management'].map((spec) => (
                            <span key={spec} className="px-3 py-1 bg-[#1877F2]/20 text-[#1877F2] text-sm rounded-full">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leadership Section */}
                {activeSection === 'leadership' && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-4">Leadership & Impact</h2>
                      <div className="w-24 h-1 bg-[#1877F2] mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Co‑President & Lead Software Engineer</h3>
                            <p className="text-[#1877F2] font-medium">Pivot at VT</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Sep 2024 – Present</span>
                        </div>
                        <ul className="text-gray-300 space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Led 40‑member organization, coordinated teams, managed GitHub workflows and algorithm integration
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-[#1877F2] mt-1 flex-shrink-0" />
                            Built a Raspberry Pi automated trading bot (live data, Python, Alpaca API), up to 68% predictive accuracy
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#1877F2]/30 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">Intern & Volunteer</h3>
                            <p className="text-[#1877F2] font-medium">Special Olympics</p>
                          </div>
                          <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">Sep 2019 – Present</span>
                        </div>
                        <p className="text-gray-300">
                          Interned at a school for students with disabilities (math) and served as a 5‑year volunteer, 
                          making a positive impact in the community through education and support.
                        </p>
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

