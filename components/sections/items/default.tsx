import {
  LineChartIcon,
  BarChart3Icon,
  DatabaseIcon,
  CalculatorIcon,
  UsersIcon,
  RocketIcon,
  LayersIcon,
  CloudIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Item, ItemDescription, ItemIcon, ItemTitle } from "../../ui/item";
import { Section } from "../../ui/section";

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ItemsProps {
  title?: string;
  items?: ItemProps[] | false;
  className?: string;
}

export default function Items({
  title = "Prism gives you the tools to model, analyze, and scale.",
  items = [
    {
      title: "Advanced Charting",
      description: "Interactive charts for indicators, simulations, and backtests.",
      icon: <LineChartIcon className="size-5 stroke-1" />,
    },
    {
      title: "Financial Modeling",
      description: "Options, derivatives, and portfolio risk models out-of-the-box.",
      icon: <CalculatorIcon className="size-5 stroke-1" />,
    },
    {
      title: "Data Integrations",
      description: "Connect to APIs, live markets, and alternative datasets.",
      icon: <DatabaseIcon className="size-5 stroke-1" />,
    },
    {
      title: "Team Collaboration",
      description: "Share dashboards and research with your team in real time.",
      icon: <UsersIcon className="size-5 stroke-1" />,
    },
    {
      title: "Strategy Backtesting",
      description: "Simulate and evaluate trading strategies before going live.",
      icon: <BarChart3Icon className="size-5 stroke-1" />,
    },
    {
      title: "Cloud Powered",
      description: "Run heavy simulations in the cloud without slowing down.",
      icon: <CloudIcon className="size-5 stroke-1" />,
    },
    {
      title: "Custom Indicators",
      description: "Build and visualize your own financial metrics and signals.",
      icon: <LayersIcon className="size-5 stroke-1" />,
    },
    {
      title: "Production Ready",
      description: "Move from prototype to deployment seamlessly with Prism.",
      icon: <RocketIcon className="size-5 stroke-1" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <div className="grid auto-rows-fr grid-cols-2 gap-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((item, index) => (
              <Item key={index}>
                <ItemTitle className="flex items-center gap-2">
                  <ItemIcon>{item.icon}</ItemIcon>
                  {item.title}
                </ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </Item>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
