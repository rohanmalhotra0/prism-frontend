import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Stats from "../components/sections/stats/default";
import { ChartAreaInteractive } from "@/components/ui/ChartAreaInteractive";
import { Mockup, MockupFrame } from "../components/ui/mockup";
import Glow from "../components/ui/glow";
import { Section } from "../components/ui/section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      {/* Interactive Chart Section */}
      <Section className="relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-black">
        <div className="relative max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-24">
          <div className="relative w-full pt-12">
            <MockupFrame
              className="animate-appear opacity-0 delay-700"
              size="small"
            >
              <Mockup
                type="responsive"
                className="bg-background/90 w-full rounded-xl border-0"
              >
                <div className="w-full">
                  <ChartAreaInteractive />
                </div>
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        </div>
      </Section>
      
      <Items />
      {/* <Stats /> */}
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
