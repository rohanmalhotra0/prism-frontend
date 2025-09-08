"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import RefraxLogo from "@/components/logos/RefraxLogo.jpeg";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supaBaseClient";
import { useAuth } from "@/lib/AuthProvider"; // 👈 new import

import { Button } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import Navigation from "../../ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { DashboardSidebar } from "@/app/dashboard/components/DashboardSidebar";

export default function Navbar({
  className,
  homeUrl = "/",
}: {
  className?: string;
  homeUrl?: string;
}) {
  const router = useRouter();
  const { user, loading } = useAuth(); // 👈 get user from context

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // optional redirect
  };

  return (
    <header className={cn("sticky top-0 z-50 px-4 py-3", className)}>
      <div className="fade-bottom bg-background/15 absolute inset-x-0 top-0 h-20 backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          {/* Left side */}
          <NavbarLeft>
            {/* Logo */}
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition"
            >
              <Image
                src={RefraxLogo}
                alt="Refrax Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              Refrax
            </a>

            {/* Dashboard Sidebar Trigger (desktop) */}
            <DashboardSidebar />

            {/* Global Navigation */}
            <Navigation />
          </NavbarLeft>

          {/* Right side */}
          <NavbarRight>
            {/* Auth buttons */}
            {!loading && user ? (
              <div className="flex items-center gap-4">
                {/* Show user email */}
                <span className="text-sm text-gray-300">{user.email}</span>
                <Button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-medium transition"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              !loading && (
                <Button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openAuthModal"))
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-7 py-2 rounded-full text-sm font-medium transition"
                >
                  Sign In
                </Button>
              )
            )}

            {/* Mobile menu */}
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
              <SheetContent
                side="right"
                className="bg-black/95 backdrop-blur-xl w-80 touch-manipulation"
              >
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition"
                  >
                    Refrax
                  </a>

                  {/* Dashboard Sidebar Trigger (mobile) */}
                  <DashboardSidebar />

                  {/* Modeling Tools Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Modeling Tools</h3>
                    <div className="space-y-2 pl-4">
                      <a href="/financePage" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        Stocks & Indices
                      </a>
                      <a href="/general" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        General Modeling
                      </a>
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                    <div className="space-y-2 pl-4">
                      <a href="/about" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        About Us
                      </a>
                      <a href="/#FAQ" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        FAQ
                      </a>
                      <a href="/docs" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        Documentation
                      </a>
                    </div>
                  </div>

                  {/* Community Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Community</h3>
                    <div className="space-y-2 pl-4">
                      <a href="/learn" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        Learn
                      </a>
                      <a href="/research" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        Research
                      </a>
                    </div>
                  </div>

                  {/* AI Assistant */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">AI</h3>
                    <div className="space-y-2 pl-4">
                      <a href="/ai" className="block hover:text-white transition text-base py-2 px-3 -mx-3 rounded-lg touch-manipulation">
                        AI Assistant
                      </a>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
