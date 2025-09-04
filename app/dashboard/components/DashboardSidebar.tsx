"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  MessageSquare,
  Database,
  Settings,
  CreditCard,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { supabase } from "@/lib/supaBaseClient"; // ✅ make sure supabase client is imported

const items = [
  { title: "Account Profile", icon: LayoutDashboard, href: "/profile" },
  { title: "Your AI Assistant", icon: MessageSquare, href: "/ai" },
  { title: "Your Data Sets", icon: Database, href: "/datasets" },
  { title: "Change Plan", icon: CreditCard, href: "/upgrade" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

export function DashboardSidebar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      // ✅ Try to use full_name metadata if available, fallback to email
      const name =
        data.user?.user_metadata?.full_name ||
        data.user?.email?.split("@")[0] ||
        null;
      setUserName(name);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const name =
          session?.user?.user_metadata?.full_name ||
          session?.user?.email?.split("@")[0] ||
          null;
        setUserName(name);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Sheet>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-lg"
          aria-label="Open Dashboard"
        >
          <Menu className="h-5 w-5" />
          <span>Dashboard</span>
        </Button>
      </SheetTrigger>

      {/* Sidebar modal */}
      <SheetContent side="left" className="w-64 bg-black/95 text-white">
        {/* Required by Radix for accessibility */}
        <DialogTitle className="sr-only">Dashboard Menu</DialogTitle>

        {/* Greeting */}
        {userName && (
          <div className="px-3 py-4 text-lg font-semibold border-b border-gray-800">
            Hi, {userName} 
          </div>
        )}

        <nav className="flex flex-col gap-4 mt-6">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
