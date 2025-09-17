"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../../ui/button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";

interface CTAButtonProps {
  href: string;
  text: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface CTAProps {
  title?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

export default function CTA({
  title = "Start Modeling",
  buttons = [
    {
      href: "/general",
      text: "Get Started",
      variant: "default",
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden bg-transparent", className)}>
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {buttons !== false && buttons.length > 0 && (
          <div className="flex justify-center gap-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "default"}
                size="lg"
                className="rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:via-purple-400 hover:to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 focus:ring-4 focus:ring-purple-400/30 focus:outline-none active:scale-95"
                onClick={() => {
                  if (button.href === "#") {
                    window.dispatchEvent(new CustomEvent('openAuthModal'));
                  } else {
                    window.location.href = button.href;
                  }
                }}
              >
                {button.icon}
                {button.text}
                {button.iconRight}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" color="purple" className="animate-appear-zoom opacity-0 delay-1000" />
      </div>
    </Section>
  );
}
