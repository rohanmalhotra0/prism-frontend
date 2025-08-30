import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import SignInModal from "@/components/sections/signInModal";
import SignUpModal from "@/components/sections/signUpModal";

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
  logo = null,
  name = "Prism",
  homeUrl = "/",
  mobileLinks = [
    { text: "Math Tools", href: "" },
    { text: "Resources", href: "" },
    { text: "About Us", href: "https://www.rohanm.org" },
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
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>

          {/* Right side */}
          <NavbarRight>
              {/* Desktop About Us link */}
              <nav className="hidden md:flex items-center gap-6">
                {mobileLinks
                  .filter((link) => link.text === "About Us")
                  .map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm font-medium"
                    >
                      {link.text}
                    </a>
                  ))}
              </nav>

              {/* Sign In Modal */}
              <SignInModal />

              {/* Mobile hamburger menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="grid gap-6 text-lg font-medium">
                    <a
                      href={homeUrl}
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <span>{name}</span>
                    </a>
                    {mobileLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground"
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
