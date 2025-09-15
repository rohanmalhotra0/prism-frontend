"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Screenshot from "../../ui/screenshot";
import { Section } from "../../ui/section";

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
        "relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-black",
        className,
      )}
    >
      {/* Purple Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.35)_0%,rgba(0,0,0,1)_85%)]" />

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
          {/* Stronger purple glow behind title */}
          <div className="pointer-events-none absolute z-0 left-1/2 top-6 -translate-x-1/2 h-56 w-[70%] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.35)_0%,rgba(59,7,100,0.1)_55%,transparent_80%)] blur-2xl opacity-90" />
          <h1 className="animate-appear bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent relative z-10 text-4xl font-bold drop-shadow-2xl sm:text-6xl md:text-8xl">
            {title}
          </h1>

          <p className="text-md animate-appear text-gray-400 relative z-10 max-w-[740px] font-medium opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {/* Start Learning Free Button */}
          <div className="animate-appear relative z-10 opacity-0 delay-300">
            <a
              ref={buttonRef}
              href="/general"
              className="relative group px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden inline-block"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full"></div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
              
              {/* Text */}
              <span className="relative z-10">Get Started</span>
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
                  {/* Transparent overlay to ensure cursor tracking above iframe */}
                  <div
                    className="absolute inset-0 z-[70] bg-transparent"
                    onClick={() => {
                      const win = iframeRef.current?.contentWindow;
                      if (win) {
                        win.postMessage(
                          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
                          "*",
                        );
                      }
                    }}
                  />
                  <iframe
                    ref={iframeRef}
                    src="https://www.youtube-nocookie.com/embed/uU2eMfCStBs?controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
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
            className="animate-appear-zoom opacity-0 delay-1000"
          />
        </div>
      </div>
    </Section>
  );
}