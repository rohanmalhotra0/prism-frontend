import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Stats from "../components/sections/stats/default";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Items />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
