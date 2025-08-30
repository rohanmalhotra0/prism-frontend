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
  title = "Simple, transparent pricing for Prism.",
  description = "Choose the plan that fits your journey — whether you’re experimenting with data science or building advanced financial models.",
  plans = [
    {
      name: "Free",
      description: "For students, learners, and anyone curious about Prism.",
      price: 0,
      priceNote: "Always free. No credit card required.",
      cta: {
        variant: "glow",
        label: "Start for free",
        href: "/signup", // 👈 update to your signup route
      },
      features: [
        "Basic charting & analytics",
        "Access to core indicators",
        "Community support",
      ],
      variant: "default",
      className: "hidden lg:flex",
    },
    {
      name: "Pro",
      icon: <User className="size-4" />,
      description: "For individual quants, researchers, and early founders.",
      price: 29,
      priceNote: "Per month, billed annually.",
      cta: {
        variant: "default",
        label: "Get Pro Access",
        href: "/signup", // 👈 update to checkout
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
      icon: <Users className="size-4" />,
      description: "For teams, startups, and research groups.",
      price: 99,
      priceNote: "Per month, billed annually.",
      cta: {
        variant: "default",
        label: "Get Team Access",
        href: "/signup", // 👈 update to checkout
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
    <Section id="Pricing" className={cn(className)}> {/* 👈 anchor for smooth scroll */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {(title || description) && (
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">
            {title && (
              <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        {plans !== false && plans.length > 0 && (
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PricingColumn
                key={plan.name}
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
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
