"use client";

import Link from "next/link";
import * as React from "react";
import { ReactNode } from "react";
import prismLogo from "@/components/logos/prismLogo.jpeg";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

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
      title: "Math Tools",
      content: "components",
    },
    {
      title: "Resources",
      content: "default",
    },
  ],
  components = [
    {
      title: "Financial Modeling",
      href: "/financePage",
      description:
        "Quantitative models for corporate finance, valuation, and forecasting.",
    },
    {
      title: "Insurance Risk Analysis",
      href: "/docs/insurance-risk",
      description:
        "Stochastic risk modeling for actuarial science and portfolio management.",
    },
    {
      title: "Options & Derivatives",
      href: "/docs/options",
      description:
        "Options pricing, hedging strategies, and binomial/Black-Scholes models.",
    },
    {
      title: "Crypto Modeling",
      href: "/docs/crypto-modeling",
      description:
        "On-chain data analysis, risk modeling, and DeFi pricing strategies.",
    },
    {
      title: "Unconventional Data",
      href: "/docs/unconventional",
      description:
        "Sentiment, alternative data, and non-traditional market signals.",
    },
    {
      title: "General Modeling",
      href: "/docs/general-modeling",
      description:
        "Regression, simulation, and time-series forecasting techniques.",
    },
  ],
  logo = <Image src={prismLogo} alt="Prism Logo" width={250} height={250} />,
  logoTitle = "Pricing",
  logoDescription =
    "Learn about Prism’s mission and how to get started with the platform.",
  logoHref = "#Pricing",
  introItems = [
    {
      title: "Research",
      href: "/research",
      description:
        "Explore research examples using our models in research papers and articles.",
    },
    {
      title: "Learn",
      href: "/learn",
      description:
        "Understand the foundations of modeling, indicators, and workflows in Prism.",
    },
    {
      title: "FAQ",
      href: "#FAQ",
      description:
        "Find answers to common questions about using Prism and our platform.",
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
          data-slot="list-item"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
