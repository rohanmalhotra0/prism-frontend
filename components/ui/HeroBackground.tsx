"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type PositionMode = "fixed" | "absolute";

interface HeroBackgroundProps {
  className?: string;
  /** Background color under the particles. Use "transparent" when layering inside sections. */
  backgroundColor?: string;
  /** Positioning mode. Use "absolute" to confine to a section, "fixed" to cover viewport. */
  position?: PositionMode;
  /** CSS blend mode to increase visibility over dark backgrounds */
  blendModeClassName?: string; // e.g., "mix-blend-screen" | "mix-blend-lighten"
}

/**
 * Full-screen particle network background.
 * - White particles connected by subtle lines
 * - Gentle repulse on hover (tracked on window)
 * - Dark background (#0a0a0a)
 * - Sits behind content; content should have a higher z-index (e.g., z-10)
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  className,
  backgroundColor = "#0a0a0a",
  position = "fixed",
  blendModeClassName = "mix-blend-screen",
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      console.log("Particles engine loaded successfully");
    });
  }, []);
  const options: ISourceOptions = useMemo(() => ({
    background: {
      color: theme === "light" ? "#ffffff" : backgroundColor,
    },
    particles: {
      number: {
        value: 360,
        density: { enable: true }, // maintain visual density across screen sizes
      },
      color: {
        value: theme === "light" ? "#000000" : "#ffffff",
      },
      links: {
        enable: true,
        color: theme === "light" ? "#000000" : "#ffffff",
        distance: 160,
        opacity: 0.55,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 0.8,
      },
      opacity: {
        value: 0.9,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1.5, max: 3.5 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 140,
          duration: 0.3,
        },
      },
    },
  }), [theme, backgroundColor]);

  return (
    <div
      className={cn(
        position === "fixed" ? "fixed inset-0" : "absolute inset-0",
        "pointer-events-none",
        mounted && theme !== "light" ? blendModeClassName : "",
        className,
      )}
      // Keep SSR and first client render identical to avoid hydration mismatch
      // Background is driven by the particles canvas; wrapper stays transparent
      style={{ backgroundColor: "transparent" }}
    >
      {mounted && (
        <Particles
          id="hero-background"
          options={options}
          particlesLoaded={async (container) => {
            console.log("Particles loaded:", container);
          }}
        />
      )}
    </div>
  );
};

export default HeroBackground;


