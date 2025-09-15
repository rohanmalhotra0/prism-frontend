"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import Glow from "../../ui/glow";
import { Mockup, MockupFrame } from "../../ui/mockup";
import { Section } from "../../ui/section";

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
  mockup = false,
  className,
}: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Section
      className={cn(
        "relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-black",
        className,
      )}
    >
      {/* Purple Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.25)_0%,rgba(0,0,0,1)_85%)]" />

      <div className="relative max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <h1 className="animate-appear bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent relative z-10 text-4xl font-bold drop-shadow-2xl sm:text-6xl md:text-8xl">
            {title}
          </h1>

          <p className="text-md animate-appear text-gray-400 relative z-10 max-w-[740px] font-medium opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {/* Get Started Button */}
          <div className="animate-appear relative z-10 opacity-0 delay-300">
            <a
              href="/general"
              className="relative group px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden inline-block"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-full"></div>

              {/* Hover overlay */}
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
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-white/10" style={{ aspectRatio: '16/9' }}>
                  {!isMobile ? (
                    // ✅ Desktop iframe (Safari-optimized)
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/uU2eMfCStBs?controls=1&rel=0&modestbranding=1&playsinline=1"
                      title="Refrax Platform Demo"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      frameBorder="0"
                    />
                  ) : (
                    // ✅ Mobile thumbnail with play button
                    <div className="w-full h-full relative bg-gradient-to-br from-gray-900 to-black">
                      <a
                        href="https://www.youtube.com/watch?v=uU2eMfCStBs&t=1s"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex items-center justify-center group cursor-pointer relative"
                      >
                        {/* YouTube thumbnail */}
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage:
                              "url('https://img.youtube.com/vi/uU2eMfCStBs/maxresdefault.jpg')",
                          }}
                        />

                        {/* Gradient fallback */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-gray-900" />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                        {/* Play button */}
                        <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-red-600 rounded-full group-hover:bg-red-700 transition-colors shadow-2xl">
                          <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>

                        {/* YouTube branding */}
                        <div className="absolute bottom-4 right-4 z-10">
                          <div className="flex items-center space-x-2 bg-black/80 px-3 py-1 rounded-full">
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <span className="text-white text-sm font-medium">
                              Watch on YouTube
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
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
