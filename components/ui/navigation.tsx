"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { 
  Calculator, 
  TrendingUp, 
  BookOpen, 
  Search, 
  User, 
  HelpCircle, 
  FileText,
  BarChart3,
  FlaskConical,
  Bot
} from "lucide-react";

interface ComponentItem {
  title: string;
  href: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavigationProps {
  components?: ComponentItem[];
  community?: ComponentItem[];
}

function NavigationComponent({
  components = [
    {
      title: "General Modeling",
      href: "/general",
      description: "Regression, simulation, and time-series forecasting.",
      icon: FlaskConical,
    },
    {
      title: "Financial Modeling",
      href: "/financePage",
      description: "Quantitative 2D/3D models for corporate finance and forecasting.",
      icon: TrendingUp,
    },
    /* 
    {
      title: "₿ Crypto Modeling",
      href: "/crypto",
      description: "On-chain data analysis, risk modeling, DeFi pricing.",
    },
    
  {
      title: "💱 Currency",
      href: "/currency",
      description: "Forex spot rates, parity models, and risk simulations.",
    },
    {
      title: "Options & Derivatives",
      href: "/options",
      description: "Options pricing, hedging, and binomial/Black-Scholes models.",
    }, 
    
    
    {
      title: "Insurance Risk Analysis",
      href: "/insurance",
      description: "Stochastic risk modeling for actuarial science.",
    },
    */
  
  ],
  community = [
    {
      title: "Learn",
      href: "/learn",
      description: "Foundations of modeling, indicators, and workflows.",
      icon: BookOpen,
    },
    {
      title: "Research",
      href: "/research",
      description: "Explore research examples using Refrax models.",
      icon: Search,
    },
    {
      title: "AI Assistant",
      href: "/ai",
      description: "Chat with Tomas, our AI analytics expert.",
      icon: Bot,
    },
    
    /*{
      title: "💬 Forum",
      href: "/forum",
      description: "Ask questions, share insights, connect with community.",
    },
    */
  ],
}: NavigationProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="hidden md:flex h-9 w-32 bg-transparent" />;
  }
  return (
    <NavigationMenu 
      className="hidden md:flex [&_[data-radix-navigation-menu-trigger]]:hover:bg-transparent [&_[data-radix-navigation-menu-trigger]]:hover:text-current [&_[data-radix-navigation-menu-trigger]]:hover:opacity-100"
      delayDuration={0}
      skipDelayDuration={0}
    >
      <NavigationMenuList>
        {/* Modeling Tools */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="hover:bg-transparent hover:text-current touch-manipulation flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Modeling Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="hover:bg-transparent hover:text-current touch-manipulation flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem href="/about" title="About Us" icon={User}>
                Learn about the Refrax team.
              </ListItem>
              <ListItem href="/#FAQ" title="FAQ" icon={HelpCircle}>
                Find answers to common questions about Refrax.
              </ListItem>
              <ListItem href="/docs" title="Documentation" icon={FileText}>
                Guides and API documentation for Refrax features.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Learn */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="hover:bg-transparent hover:text-current touch-manipulation flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Learn
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              {community.map((item) => (
                <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  className,
  title,
  children,
  icon: Icon,
  ...props
}: React.ComponentProps<"a"> & { 
  title: string; 
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent/50",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center flex-shrink-0">
                <Icon className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ml-7">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

// Export with dynamic import to prevent hydration issues
const Navigation = dynamic(() => Promise.resolve(NavigationComponent), {
  ssr: false,
  loading: () => <div className="hidden md:flex h-9 w-32 bg-transparent" />
});

export default Navigation;
