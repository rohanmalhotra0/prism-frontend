"use client";

import Navbar from "@/components/sections/navbar/default";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const CATEGORIES = [
  { name: "Financial Modeling", slug: "financial-modeling" },
  { name: "Options & Derivatives", slug: "options-derivatives" },
  { name: "General Modeling", slug: "general-modeling" },
  { name: "Insurance Risk Analysis", slug: "insurance-risk-analysis" },
  { name: "Crypto Modeling", slug: "crypto-modeling" },
  { name: "Statistics & Probability", slug: "statistics-probability" },
  { name: "Machine Learning", slug: "machine-learning" }, // last item
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="p-12 space-y-8">
        <h1 className="text-4xl font-bold mb-6">Learn Page</h1>
        <p className="mt-2 text-gray-400 mb-12">
          Explore definitions, formulas, and explanations across different categories.
        </p>

        {/* Single grid: 3 columns on lg */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => {
            const isLast = idx === CATEGORIES.length - 1;
            return (
              // Make the *grid item* carry the centering class
              <div key={cat.slug} className={isLast ? "lg:col-start-2" : undefined}>
                <Link href={`/learn/${cat.slug}`} className="block">
                  <Card className="p-6 hover:shadow-md hover:bg-gray-900 transition hover:-translate-y-0.5">
                    <h2 className="text-xl font-semibold mb-4">{cat.name}</h2>
                    <p className="text-gray-400 text-sm">
                      Click to explore!! {cat.name}.
                    </p>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

