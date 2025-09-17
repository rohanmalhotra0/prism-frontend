import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Section } from "../../ui/section";

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  value?: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItemProps[] | false;
  className?: string;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  items = [
    {
      question: "What is Refrax?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Refrax is a data science and financial modeling platform that helps
          anyone — even without a technical background — explore, build, and
          run advanced models. From visual analytics to financial simulations,
          Refrax makes complex tools accessible.
        </p>
      ),
    },
    {
      question: "Do I need to know how to code to use Refrax?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Nope! While Refrax is built with developers and quants in mind, the
          platform is designed for non-engineers too. You can drag, drop, and
          configure models visually — and if you know Python, you can go even
          deeper with full customization.
        </p>
      ),
    },
    {
      question: "How is Refrax different from spreadsheets or no-code tools?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px]">
            Traditional spreadsheets are powerful but become messy and
            error-prone at scale. No-code tools often lock you in and limit
            advanced use cases. Refrax combines the flexibility of coding with
            the simplicity of drag-and-drop modeling, without locking you into a
            closed ecosystem.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px]">
            Everything you build in Refrax is portable, transparent, and ready
            for real-world use.
          </p>
        </>
      ),
    },
    {
      question: "Can Refrax handle real financial data?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Yes! Refrax connects to live market APIs, financial datasets, and
          alternative data sources. You can backtest strategies, analyze market
          trends, and build dashboards with real data streams.
        </p>
      ),
    },
    {
      question:  "Why is Refrax free?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
         Refrax is completely free with no registration required. 
         We believe that learning complex concepts should be interactive, 
         engaging, and accessible to everyone. Our platform provides hands-on tools
          for 2D and 3D mathematical visualization, financial data analysis, 
          and comprehensive learning resources - all completely free with no 
          registration required.
        </p>
      ),
    },
 
  ],
  className,
}: FAQProps) {
  return (
    <Section id="FAQ" className={cn("bg-transparent", className)}> {/* 👈 anchor for smooth scroll */}
      <div className="max-w-container mx-auto flex flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {items !== false && items.length > 0 && (
          <Accordion type="single" collapsible className="w-full max-w-[800px]">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.value || `item-${index + 1}`}
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </Section>
  );
}
