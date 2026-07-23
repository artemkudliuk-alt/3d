import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Cases } from "@/components/cases";
import { Benefits } from "@/components/benefits";
import { Testimonials } from "@/components/testimonials";
import { Partners } from "@/components/partners";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Cases />
        <Benefits />
        <Testimonials />
        <Partners />
        <LeadForm />
      </main>
      <SiteFooter />
    </>
  );
}
