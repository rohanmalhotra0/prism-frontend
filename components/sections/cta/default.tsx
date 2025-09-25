"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../../ui/button";
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
                className="rounded-full bg-[#1877F2] hover:bg-[#1877F2] text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#1877F2]/25 hover:scale-105 focus:ring-4 focus:ring-[#1877F2]/30 focus:outline-none active:scale-95"
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
    </Section>
  );
}
