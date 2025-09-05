"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu } from "lucide-react";
import RefraxLogo from "@/components/logos/RefraxLogo.jpeg";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supaBaseClient";

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
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Track user session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUserEmail(session?.user?.email ?? null)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push("/");
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
            {userEmail ? (
              <Button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-full font-medium transition"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openAuthModal"))
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-7 py-2 rounded-full text-sm font-medium transition"
              >
                Sign In
              </Button>
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
                className="bg-black/95 backdrop-blur-xl"
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

                  <a href="/ai" className="hover:text-white transition">
                    AI Assistant
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
