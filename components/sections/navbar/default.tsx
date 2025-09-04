"use client";

import { Menu } from "lucide-react";
import { ReactNode } from "react";
import prismLogo from "@/components/logos/prismLogo.jpeg";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <Image src={prismLogo} alt="Prism Logo" width={32} height={32} className="rounded-lg" />,
  name = "Prism",
  homeUrl = "/",
  mobileLinks = [
    { text: "AI Assistant", href: "/ai" },
    { text: "Math Tools", href: "" },
    { text: "Resources", href: "" },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          {/* Left side */}
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition"
            >
              {logo}
              {name}
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>

          {/* Right side */}
          <NavbarRight>
            {/* Desktop navigation links */}
            <nav className="hidden md:flex items-center gap-6">
              {mobileLinks
                .filter((link) => link.text === "AI Assistant")
                .map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
                  >
                    {link.text}
                  </a>
                ))}
            </nav>

            {/* Sign In Button */}
            <button
              className="relative group px-5 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openSignInModal"))
              }
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full"></div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>

              {/* Text */}
              <span className="relative z-10">Sign In</span>
            </button>

            {/* Mobile hamburger menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden rounded-xl"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl">
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition"
                  >
                    {name}
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
