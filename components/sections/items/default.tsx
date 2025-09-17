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
  title = "Learn data analytics, financial modeling, and math visualization with interactive tools.",
  items = [
    {
      title: "2D & 3D Math Visualization",
      description: "Interactive mathematical plots, surfaces, and animations for learning complex concepts.",
      icon: <LineChartIcon className="size-5 stroke-1" />,
    },
    {
      title: "Financial Data Analysis",
      description: "Upload and analyze Excel/CSV files with real-time visualizations and insights.",
      icon: <CalculatorIcon className="size-5 stroke-1" />,
    },
    {
      title: "Dataset Lab",
      description: "Import, explore, and transform datasets with drag-and-drop functionality.",
      icon: <DatabaseIcon className="size-5 stroke-1" />,
    },
    {
      title: "Free Learning Resources",
      description: "Comprehensive tutorials and examples for data analytics and modeling.",
      icon: <UsersIcon className="size-5 stroke-1" />,
    },
    {
      title: "Interactive Charts",
      description: "Create dynamic financial charts and mathematical visualizations.",
      icon: <BarChart3Icon className="size-5 stroke-1" />,
    },
    {
      title: "AI-Powered Insights",
      description: "Get help and explanations from our AI assistant for complex topics.",
      icon: <CloudIcon className="size-5 stroke-1" />,
    },
    {
      title: "Mathematical Functions",
      description: "Plot trigonometric, exponential, and logarithmic functions in 2D and 3D.",
      icon: <LayersIcon className="size-5 stroke-1" />,
    },
    {
      title: "No Registration Required",
      description: "Start learning immediately with our free, accessible platform.",
      icon: <RocketIcon className="size-5 stroke-1" />,
    },
  ],
  className,
}: ItemsProps) {
  return (
    <Section className={`bg-transparent ${className}`}>
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
