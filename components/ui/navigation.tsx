"use client";

import * as React from "react";
import Link from "next/link";
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

interface ComponentItem {
  title: string;
  href: string;
  description: string;
}

interface NavigationProps {
  components?: ComponentItem[];
  community?: ComponentItem[];
}

export default function Navigation({
  components = [
    {
      title: "Stocks & Indices",
      href: "/financePage",
      description: "Quantitative models for corporate finance and forecasting.",
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
    {
      title: "General Modeling",
      href: "/general",
      description: "Regression, simulation, and time-series forecasting.",
    },
  ],
  community = [
    {
      title: "Learn",
      href: "/learn",
      description: "Foundations of modeling, indicators, and workflows.",
    },
    {
      title: "Research",
      href: "/research",
      description: "Explore research examples using Refrax models.",
    },
    
    /*{
      title: "💬 Forum",
      href: "/forum",
      description: "Ask questions, share insights, connect with community.",
    },
    */
  ],
}: NavigationProps) {
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
            className="hover:bg-transparent hover:text-current"
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            Modeling Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
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
            className="hover:bg-transparent hover:text-current"
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              <ListItem href="/about" title="About Us">
                Learn about the Refrax team.
              </ListItem>
              <ListItem href="/#FAQ" title=" FAQ">
                Find answers to common questions about Refrax.
              </ListItem>
              <ListItem href="/docs" title="Documentation">
                Guides and API documentation for Refrax features.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Community */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="hover:bg-transparent hover:text-current"
            onPointerEnter={(e) => e.preventDefault()}
            onPointerLeave={(e) => e.preventDefault()}
          >
            Community
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[400px]">
              {community.map((item) => (
                <ListItem key={item.title} href={item.href} title={item.title}>
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
  ...props
}: React.ComponentProps<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
