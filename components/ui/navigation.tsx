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
  Bot,
  TestTube,
  Database
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
    {
      title: "Backtesting Sandbox",
      href: "/backtesting",
      description: "Upload datasets, define strategies, and simulate historical performance.",
      icon: TestTube,
    },
    {
      title: "Demo Datasets",
      href: "/demo",
      description: "Curated datasets for machine learning experimentation and analysis.",
      icon: Database,
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
      {/* Math Tools */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('modeling')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5"
        >
          <Calculator className="w-4 h-4" />
          Math Tools
        </button>
        {openDropdown === 'modeling' && (
          <div className="absolute top-full left-0 mt-2 w-[550px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Math Tools</h3>
              </div>
              <ul className="grid gap-3">
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
          </div>
        )}
      </div>

      {/* Learn */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('learn')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5"
        >
          <BookOpen className="w-4 h-4" />
          Learn
        </button>
        {openDropdown === 'learn' && (
          <div className="absolute top-full left-0 mt-2 w-[450px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Learn</h3>
              </div>
              <ul className="grid gap-3">
                {community.map((item) => (
                  <ListItem key={item.title} href={item.href} title={item.title} icon={item.icon}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Resources */}
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle('resources')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 rounded-lg hover:bg-white/5"
        >
          <FileText className="w-4 h-4" />
          Resources
        </button>
        {openDropdown === 'resources' && (
          <div className="absolute top-full left-0 mt-2 w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
              </div>
              <ul className="grid gap-3">
                <ListItem href="/about" title="About Me" icon={User}>
                  Learn about the Refrax team and our mission.
                </ListItem>
                <ListItem href="/docs" title="Documentation" icon={FileText}>
                  Comprehensive guides and API documentation.
                </ListItem>
              </ul>
            </div>
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
          "group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-white/10 hover:backdrop-blur-sm border border-transparent hover:border-white/10",
          className
        )}
        onClick={() => {
          // Close dropdown when item is clicked
          const event = new CustomEvent('closeDropdown');
          document.dispatchEvent(event);
        }}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Icon className="w-3 h-3 text-white" />
            </div>
          )}
          <div className="text-sm font-semibold leading-none text-white group-hover:text-blue-200 transition-colors duration-200">{title}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-gray-300 ml-9 group-hover:text-gray-200 transition-colors duration-200">
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
