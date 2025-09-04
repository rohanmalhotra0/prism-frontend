"use client";

import { cn } from "@/lib/utils";
import SignUpModal from "@/components/sections/signUpModal";
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
  title = "Prism",
  description = "Turning complex data into clear, interactive insights  free and accessible for everyone.",
  mockup = <ChartAreaInteractive />,
  className,
}: HeroProps) {
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

          {/* ✨ Use your SignUp modal instead of href button */}
          <div className="animate-appear relative z-10 opacity-0 delay-300">
            <button 
              className="relative group px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              onClick={() => window.dispatchEvent(new CustomEvent('openSignInModal'))}
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
            </button>
          </div>
        </div>

        {/* Mockup */}
        {mockup !== false && (
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
                  {mockup}
                </div>
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        )}
      </div>
    </Section>
  );
}
