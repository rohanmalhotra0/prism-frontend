"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import prismLogo from "@/components/logos/prismLogo.jpeg";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface MenuItem {
  title: string;
  href?: string;
  isLink?: boolean;
  content?: ReactNode;
}

interface NavigationProps {
  menuItems?: MenuItem[];
  components?: ComponentItem[];
  community?: ComponentItem[];
  logo?: ReactNode;
  logoTitle?: string;
  logoDescription?: string;
  logoHref?: string;
  introItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export default function Navigation({
  menuItems = [
    {
      title: "Modeling Tools",
      content: "components",
    },
    {
      title: "Resources",
      content: "default",
    },
    {
      title: "Community",
      content: "community",
    },
  ],
  components = [
  {
    title: "📈 Stocks & Indices",
    href: "/financePage",
    description:
      "Quantitative models for corporate finance, valuation, and forecasting.",
  },
  {
    title: "💱 Currency",
    href: "/currency",
    description:
      "Forex spot rates, interest rate parity, and currency risk modeling.",
  },
  {
    title: "📊 Options & Derivatives",
    href: "/options",
    description:
      "Options pricing, hedging strategies, and binomial/Black-Scholes models.",
  },
  {
    title: "₿ Crypto Modeling",
    href: "/crypto",
    description:
      "On-chain data analysis, risk modeling, and DeFi pricing strategies.",
  },
  {
    title: "🛡️ Insurance Risk Analysis",
    href: "/insurance",
    description:
      "Stochastic risk modeling for actuarial science and portfolio management.",
  },
  {
    title: "🔬 General Modeling",
    href: "/general",
    description:
      "Regression, simulation, and time-series forecasting techniques.",
  },
  ],
  community = [
  {
    title: "📚 Research",
    href: "/research",
    description:
      "Explore research examples using our models in research papers and articles.",
  },
  {
    title: "🎓 Learn",
    href: "/learn",
    description:
      "Understand the foundations of modeling, indicators, and workflows in Prism.",
  },
  {
    title: "💬 Forum",
    href: "/forum",
    description:
      "Connect with the community, ask questions, and share your insights.",
  },
],

 
  logo = <Image src={prismLogo} alt="Prism Logo" width={250} height={250} />,
  logoTitle = "Pricing",
  logoDescription =
    "Learn about Prism's mission and how to get started with the platform.",
  logoHref = "#Pricing",
  introItems = [
  {
    title: "❓ FAQ",
    href: "/#FAQ",
    description:
      "Find answers to common questions about using Prism and our platform.",
  },
  {
    title: "📖 Documentation",
    href: "/docs",
    description:
      "Comprehensive guides and API documentation for all Prism features.",
  },
],
}: NavigationProps) {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.isLink ? (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href={item.href || ""}>{item.title}</Link>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.content === "default" ? (
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="from-muted/30 to-muted/10 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href={logoHref}
                          >
                            {logo}
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {logoTitle}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              {logoDescription}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {introItems.map((intro, i) => (
                        <ListItem key={i} href={intro.href} title={intro.title}>
                          {intro.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : item.content === "components" ? (
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
                  ) : item.content === "community" ? (
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {community.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  ) : (
                    item.content
                  )}
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
