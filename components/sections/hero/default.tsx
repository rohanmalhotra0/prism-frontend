"use client";

import { cn } from "@/lib/utils";
// ... existing code ...
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
  // ... existing code ...

  return (
    <Section
      className={cn(
        "relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-black",
        className,
      )}
    >
      {/* Background simplified */}

      <div className="relative max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <h1 className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent relative z-10 text-4xl font-bold drop-shadow-2xl sm:text-6xl md:text-8xl">
            {title}
          </h1>

          <p className="text-md text-gray-400 relative z-10 max-w-[740px] font-medium sm:text-xl">
            {description}
          </p>

          {/* Get Started Button */}
          <div className="relative z-10">
            <a
              href="/general"
              className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 inline-block"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Enhanced YouTube Video Section with Rounded Corners */}
        <div className="relative w-full pt-12">
          <MockupFrame size="small">
            <Mockup
              type="responsive"
              className="bg-background/90 w-full rounded-2xl border-0"
            >
              <div className="w-full">
                <div 
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  style={{ aspectRatio: '16/9' }}
                >
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/uU2eMfCStBs?controls=1&rel=0&modestbranding=1&playsinline=1"
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
