"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";
import HeroBackground from "@/components/ui/HeroBackground";

import { ChartAreaInteractive } from "@/components/ui/ChartAreaInteractive"

interface HeroProps {
  title?: string;
  description?: string;
  mockup?: React.ReactNode | false;
  badge?: React.ReactNode | false;
  className?: string;
}

export default function Hero({
  title = "Refrax",
  description = "Free education platform for data analytics, financial modeling, and 2D/3D math visualization. Learn by doing with interactive tools.",
  mockup = <ChartAreaInteractive />,
  className,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const BASE_DURATION_SECONDS = 50;

  // Typewriter animation state
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const texts = [
    "Refrax",
    "Financial Modeling",
    "Risk Analysis",
    "General Modeling"
  ];

  // Slideshow images (all photos from 'Refrax Photos' directory)
  const slideshowItems = [
    { src: "/Refrax Photos/2DDatasets.png", title: "2D Datasets", href: "/learn/ml-playground" },
    { src: "/Refrax Photos/2DstockModel.png", title: "2D Stock Modeling", href: "/learn/financial-modeling" },
    { src: "/Refrax Photos/3DLineCharts.png", title: "3D Financial Charts", href: "/financePage" },
    { src: "/Refrax Photos/Animations.png", title: "Data Animations", href: "/general" },
    { src: "/Refrax Photos/clusterGraphing.png", title: "Cluster Analysis", href: "/learn/ml-playground" },
    { src: "/Refrax Photos/machineLearning.png", title: "Machine Learning", href: "/learn/machine-learning" },
    { src: "/Refrax Photos/math.png", title: "Math Tools", href: "/general" },
    { src: "/Refrax Photos/predictive_analyitics.png", title: "Predictive Analytics", href: "/learn/ml-playground" },
    { src: "/Refrax Photos/spiral.png", title: "3D Visualizations", href: "/general" },
    { src: "/Refrax Photos/stockChart3D.png", title: "3D Stock Charts", href: "/financePage" },
    { src: "/Refrax Photos/monteCarlo.png", title: "Monte Carlo Simulation", href: "/business" },
    { src: "/Refrax Photos/ScenarioAnalysis.png", title: "Revenue Forecast", href: "/business" },
    { src: "/Refrax Photos/CustomerRetention.png", title: "Customer Retention", href: "/business" },
    { src: "/Refrax Photos/Base Cases.png", title: "Base Case Analysis", href: "/business" },
  ];

  // Typewriter animation effect
  useEffect(() => {
    if (!hasStarted) return;
    
    const typeSpeed = isDeleting ? 40 : 120;
    const pauseTime = 4000;

    const timeout = setTimeout(() => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      } else {
        setDisplayedText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        
        if (currentIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, textIndex, texts, hasStarted]);

  // Start the animation after a 1.5 second delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  // Marquee interaction helpers
  const pauseMarquee = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "paused";
    }
  };
  const resumeMarquee = (durationSeconds: number = BASE_DURATION_SECONDS, direction: "normal" | "reverse" = "normal") => {
    const node = marqueeRef.current;
    if (!node) return;
    node.style.animationDuration = `${durationSeconds}s`;
    node.style.animationDirection = direction;
    node.style.animationPlayState = "running";
  };
  const handlePointerDown = (clientX: number) => {
    isDraggingRef.current = true;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    pauseMarquee();
  };
  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dx = clientX - lastXRef.current; // right positive
    const dt = Math.max(1, now - lastTimeRef.current);
    const velocityPxPerMs = Math.abs(dx) / dt;
    const direction: "normal" | "reverse" = dx < 0 ? "normal" : "reverse";
    // Map velocity to a speed factor [1, 6]
    const speedFactor = Math.min(6, Math.max(1, velocityPxPerMs * 12));
    const duration = BASE_DURATION_SECONDS / speedFactor;
    resumeMarquee(duration, direction);
    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };
  const handlePointerUp = () => {
    isDraggingRef.current = false;
    resumeMarquee(BASE_DURATION_SECONDS, "normal");
  };

  useEffect(() => {
    // Cursor-following dot removed
  }, []);
  return (
    <Section
      className={cn(
        "relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-transparent",
        className,
      )}
    >

      <div ref={containerRef} className="relative max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        {/* Removed interactive glowing cursor dot */}
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12 relative">
          <h1 className="animate-appear text-white relative z-10 text-4xl font-bold drop-shadow-2xl sm:text-6xl md:text-8xl min-h-[1.2em]">
            {displayedText}
            <span className="animate-pulse text-white">|</span>
          </h1>

          <p className="text-md animate-appear text-white relative z-10 max-w-[740px] font-medium opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {/* Start Learning Free Button */}
          <div className="animate-appear relative z-10 delay-300">
            <a
              ref={buttonRef}
              href="/general"
              className="relative group px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden inline-block"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-[#1877F2] rounded-full opacity-100"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-[#1877F2] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
              
              {/* Text */}
              <span className="relative z-10 text-white">Get Started</span>
            </a>
          </div>
        </div>

        {/* Image Slideshow Section - moved above YouTube and full-bleed */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 pt-16">
          <div className="px-4">
            <h3 className="text-2xl font-bold text-center text-white mb-8 animate-appear opacity-0 delay-1200">
           
            </h3>

            {/* Modern marquee-style carousel */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm animate-appear opacity-0 delay-1400 marquee-mask">
              <div
                ref={marqueeRef}
                className="marquee-track"
                onMouseDown={(e) => handlePointerDown(e.clientX)}
                onMouseMove={(e) => handlePointerMove(e.clientX)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
                onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                onTouchEnd={handlePointerUp}
              >
                {/* Dynamic set A */}
                {slideshowItems.map((item, idx) => (
                  <a key={`a-${idx}`} href={item.href || '#'} className="flex-shrink-0 w-[320px] sm:w-[420px] md:w-[520px] group">
                    <div className="relative" style={{ aspectRatio: '16/9' }}>
                      <img src={item.src.replaceAll(' ', '%20')} alt={item.title || 'Refrax'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      {item.title && (
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="text-lg font-semibold group-hover:text-blue-200 transition-colors">{item.title}</h4>
                        </div>
                      )}
                    </div>
                  </a>
                ))}

                {/* Dynamic set B (duplicate for seamless loop) */}
                {slideshowItems.map((item, idx) => (
                  <a key={`b-${idx}`} href={item.href || '#'} className="flex-shrink-0 w-[320px] sm:w-[420px] md:w-[520px] group">
                    <div className="relative" style={{ aspectRatio: '16/9' }}>
                      <img src={item.src.replaceAll(' ', '%20')} alt={item.title || 'Refrax'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      {item.title && (
                        <div className="absolute bottom-4 left-4 text-white">
                          <h4 className="text-lg font-semibold group-hover:text-blue-200 transition-colors">{item.title}</h4>
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="relative w-full pt-12">
          <MockupFrame
            className="animate-appear opacity-0 delay-700"
            size="small"
          >
            <Mockup
              type="responsive"
              className="bg-background/90 w-full rounded-xl border-0"
            >
              <div className="w-full">
                <div 
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  style={{ aspectRatio: '16/9' }}
                >
                  <iframe
                    ref={iframeRef}
                    src="https://www.youtube.com/embed/J7e7Fx0Nu2A"
                    title="Refrax Platform Demo"
                    className="w-full h-full rounded-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </div>
            </Mockup>
          </MockupFrame>
          
        </div>

        
      </div>
    </Section>
  );
}