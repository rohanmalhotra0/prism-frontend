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
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('[data-navigation-menu]')) {
      setOpenDropdown(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    const handleCloseDropdown = () => setOpenDropdown(null);
    document.addEventListener('closeDropdown', handleCloseDropdown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('closeDropdown', handleCloseDropdown);
    };
  }, []);

  if (!mounted) {
    return <div className="hidden md:flex h-9 w-32 bg-transparent" />;
  }
  return (
    <div className="hidden md:flex items-center space-x-1" data-navigation-menu>
      {/* Modeling Tools */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('modeling')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <Calculator className="w-4 h-4" />
          Math Tools
        </button>
        {openDropdown === 'modeling' && (
          <div className="absolute top-full left-0 mt-1 w-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <ul className="grid gap-3 p-4 md:grid-cols-2">
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
          </div>
        )}
      </div>

      {/* Learn */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('learn')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Learn
        </button>
        {openDropdown === 'learn' && (
          <div className="absolute top-full left-0 mt-1 w-[400px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <ul className="grid gap-3 p-4">
              {community.map((item) => (
                <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Docs */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('docs')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <FileText className="w-4 h-4" />
          Docs
        </button>
        {openDropdown === 'docs' && (
          <div className="absolute top-full left-0 mt-1 w-[400px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <ul className="grid gap-3 p-4">
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
          </div>
        )}
      </div>
    </div>
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
      <Link
        href={props.href || '#'}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-gray-800 focus:text-white hover:bg-gray-800/50",
          className
        )}
        onClick={() => {
          // Close dropdown when item is clicked
          const event = new CustomEvent('closeDropdown');
          document.dispatchEvent(event);
        }}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon className="w-3 h-3 text-white" />
            </div>
          )}
          <div className="text-sm font-medium leading-none text-white">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-gray-400 ml-7">
          {children}
        </p>
      </Link>
    </li>
  );
}

// Export with dynamic import to prevent hydration issues
const Navigation = dynamic(() => Promise.resolve(NavigationComponent), {
  ssr: false,
  loading: () => <div className="hidden md:flex h-9 w-32 bg-transparent" />
});

export default Navigation;
