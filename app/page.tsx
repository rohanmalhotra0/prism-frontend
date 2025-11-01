import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Stats from "../components/sections/stats/default";
import { ChartAreaInteractive } from "@/components/ui/ChartAreaInteractive";
import { Mockup, MockupFrame } from "../components/ui/mockup";
import { Section } from "../components/ui/section";
import HeroBackground from "@/components/ui/HeroBackground";

export default function Home() {
  return (
    <main className="relative bg-background">
      {/* Particle background */}
      <HeroBackground position="fixed" backgroundColor="#000000" className="z-0" blendModeClassName="mix-blend-screen" />
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
      
      {/* Interactive Chart Section */}
      <Section className="relative overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-transparent">
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
          </div>
        </div>
      </Section>
      
      <section className="relative bg-transparent">
        <div className="relative z-10">
          <Items />
        </div>
      </section>
        {/* <Stats /> */}
      <section className="relative bg-transparent">
        <div className="relative z-10">
          <FAQ />
        </div>
      </section>
      <section className="relative bg-transparent">
        <div className="relative z-10">
          <CTA />
        </div>
      </section>
      <section className="relative bg-transparent">
        <div className="relative z-10 bg-transparent">
          <Footer />
        </div>
      </section>
      </div>
    </main>
  );
}
