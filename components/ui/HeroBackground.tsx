"use client";

import React, { useEffect } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

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
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      console.log("Particles engine loaded successfully");
    });
  }, []);
  const options: ISourceOptions = {
    background: {
      color: backgroundColor,
    },
    particles: {
      number: {
        value: 240,
        density: { enable: true }, // maintain visual density across screen sizes
      },
      color: {
        value: "#ffffff",
      },
      links: {
        enable: true,
        color: "#ffffff",
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
  };

  return (
    <div
      className={cn(
        position === "fixed" ? "fixed inset-0" : "absolute inset-0",
        "pointer-events-none",
        blendModeClassName,
        className,
      )}
      style={{ backgroundColor }}
    >
      <Particles 
        id="hero-background" 
        options={options}
        particlesLoaded={async (container) => {
          console.log("Particles loaded:", container);
        }}
      />
    </div>
  );
};

export default HeroBackground;


