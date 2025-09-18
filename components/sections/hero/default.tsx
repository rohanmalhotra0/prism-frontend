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
  const dotRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const dotPositionRef = useRef<{ x: number; y: number } | null>(null);

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

  useEffect(() => {
    const container = containerRef.current;
    const dot = dotRef.current;
    if (!dot) return;

    // Disable on mobile devices (iOS/Android)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
    
    if (isMobile) {
      // Hide the dot on mobile
      dot.style.display = 'none';
      return;
    }

    let animationFrameId = 0;

    // Use saved position or start at center
    let posX = dotPositionRef.current?.x ?? window.innerWidth / 2;
    let posY = dotPositionRef.current?.y ?? window.innerHeight / 2;
    let velX = 0;
    let velY = 0;
    let targetX = posX;
    let targetY = posY;
    let hasInitializedToCursor = dotPositionRef.current !== null;

    const stiffness = 0.08; // lower stiffness to reduce oscillation
    const damping = 0.9;    // higher damping for less bounce

    const setTransform = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    // No nav gating; always follow cursor

    const onMove = (e: MouseEvent) => {
      const nextX = e.clientX;
      const nextY = e.clientY;
      if (!hasInitializedToCursor) {
        // Snap to cursor on first move
        posX = nextX;
        posY = nextY;
        targetX = nextX;
        targetY = nextY;
        hasInitializedToCursor = true;
        dotPositionRef.current = { x: nextX, y: nextY };
        setTransform(posX, posY);
        return;
      }
      // Always follow cursor with smooth interpolation
      targetX = nextX;
      targetY = nextY;
    };

    const animate = () => {
      const forceX = (targetX - posX) * stiffness;
      const forceY = (targetY - posY) * stiffness;

      velX = (velX + forceX) * damping;
      velY = (velY + forceY) * damping;

      

      posX += velX;
      posY += velY;

      // Save position to ref to persist across re-renders
      dotPositionRef.current = { x: posX, y: posY };
      setTransform(posX, posY);
      animationFrameId = requestAnimationFrame(animate);
    };

    setTransform(posX, posY);
    animate();

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <Section
      className={cn(
        "relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-transparent",
        className,
      )}
    >

      <div ref={containerRef} className="relative max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        {/* Interactive glowing dot (physics-based) */}
        <div
          ref={dotRef}
          className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
          style={{ left: 0, top: 0 }}
        >
          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-purple-500/45 via-purple-600/35 to-purple-500/45 blur-[72px] animate-pulse" />
            <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-purple-500/60 via-purple-500/40 to-purple-500/60 blur-3xl" />
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-purple-400/70 via-purple-500/50 to-purple-400/70 blur-2xl" />
            <div className="relative h-3 w-3 rounded-full bg-white shadow-[0_0_55px_20px_rgba(147,51,234,0.7)]" />
          </div>
        </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full opacity-100"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
              
              {/* Text */}
              <span className="relative z-10 text-white">Get Started</span>
            </a>
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
          <Glow
            variant="top"
            color="purple"
            className="animate-appear-zoom opacity-0 delay-1000"
          />
        </div>
      </div>
    </Section>
  );
}