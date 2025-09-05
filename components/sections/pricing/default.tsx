"use client";

import { User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingColumn, PricingColumnProps } from "../../ui/pricing-column";
import { Section } from "../../ui/section";

interface PricingProps {
  title?: string | false;
  description?: string | false;
  plans?: PricingColumnProps[] | false;
  className?: string;
}

export default function Pricing({
  title = "Simple, transparent pricing for Refrax.",
  description = "Choose the plan that fits your journey — whether you’re experimenting with data science or building advanced financial models.",
  plans = [
    {
      name: "Free",
      description: "For students, learners, and anyone curious about Refrax.",
      price: 0,
      priceNote: "Always free. No credit card required.",
      cta: {
        variant: "default",
        label: "Start for free",
        href: "/", // 👈 update to signup
      },
      features: [
        "Basic charting & analytics",
        "Access to core indicators",
        "Community support",
      ],
      variant: "glow",
      //className: "",
    },
    {
      name: "Pro",
      icon: <User className="h-4 w-4" />,
      description: "For individual quants, researchers, and early founders.",
      price: 29,
      priceNote: "Per month, billed annually.",
      cta: {
        variant: "default",
        label: "Get Pro Access",
        href: "/", // 👈 update to checkout
      },
      features: [
        "All Free features",
        "Advanced financial modeling tools",
        "Custom indicator builder",
        "Export to Excel & Python",
        "Email support",
      ],
      variant: "glow-brand",
    },
    {
      name: "Team",
      icon: <Users className="h-4 w-4" />,
      description: "For teams, startups, and research groups.",
      price: 99,
      priceNote: "Per month, billed annually.",
      cta: {
        variant: "default",
        label: "Get Team Access",
        href: "/", // 👈 update to checkout
      },
      features: [
        "All Pro features",
        "Unlimited team members",
        "Shared dashboards",
        "Priority support",
        "Early access to new models",
      ],
      variant: "glow",
    },
  ],
  className = "",
}: PricingProps) {
  return (
    <Section id="pricing" className={cn("py-20 px-6 bg-black/90", className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Title + Description */}
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            {title && (
              <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-[650px] text-gray-400 text-lg sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Plans */}
        {plans !== false && plans.length > 0 && (
          <div className="max-w-6xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/90 p-6 shadow-xl hover:shadow-2xl transition"
              >
                <PricingColumn
                  name={plan.name}
                  icon={plan.icon}
                  description={plan.description}
                  price={plan.price}
                  priceNote={plan.priceNote}
                  cta={plan.cta}
                  features={plan.features}
                  variant={plan.variant}
                  className={plan.className}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
