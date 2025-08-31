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
      question: "What is Prism?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Prism is a data science and financial modeling platform that helps
          anyone — even without a technical background — explore, build, and
          run advanced models. From visual analytics to financial simulations,
          Prism makes complex tools accessible.
        </p>
      ),
    },
    {
      question: "Do I need to know how to code to use Prism?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Nope! While Prism is built with developers and quants in mind, the
          platform is designed for non-engineers too. You can drag, drop, and
          configure models visually — and if you know Python, you can go even
          deeper with full customization.
        </p>
      ),
    },
    {
      question: "How is Prism different from spreadsheets or no-code tools?",
      answer: (
        <>
          <p className="text-muted-foreground mb-4 max-w-[640px]">
            Traditional spreadsheets are powerful but become messy and
            error-prone at scale. No-code tools often lock you in and limit
            advanced use cases. Prism combines the flexibility of coding with
            the simplicity of drag-and-drop modeling, without locking you into a
            closed ecosystem.
          </p>
          <p className="text-muted-foreground mb-4 max-w-[640px]">
            Everything you build in Prism is portable, transparent, and ready
            for real-world use.
          </p>
        </>
      ),
    },
    {
      question: "Can Prism handle real financial data?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Yes! Prism connects to live market APIs, financial datasets, and
          alternative data sources. You can backtest strategies, analyze market
          trends, and build dashboards with real data streams.
        </p>
      ),
    },
    {
      question: "Is there a free version of Prism?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Absolutely. Prism offers a free plan for students, learners, and
          hobbyists. You’ll have access to core indicators, charting, and
          community support. When you’re ready for advanced features like
          custom modeling and team dashboards, you can upgrade to{" "}
          <Link href="#pricing" className="text-foreground underline">
            a paid plan
          </Link>
          .
        </p>
      ),
    },
    {
      question: "Can I use Prism with my team?",
      answer: (
        <p className="text-muted-foreground mb-4 max-w-[640px]">
          Yes — Prism’s Team plan is perfect for startups, research groups, and
          agencies. You’ll get unlimited seats, shared dashboards, and priority
          support to help your team collaborate effectively.
        </p>
      ),
    },
  ],
  className,
}: FAQProps) {
  return (
    <Section id="FAQ" className={cn(className)}> {/* 👈 anchor for smooth scroll */}
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
