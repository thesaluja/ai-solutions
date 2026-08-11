"use client";

import dynamic from "next/dynamic";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { Capabilities } from "@/components/sections/capabilities";

const Hero = dynamic(
  () => import("@/components/sections/hero").then((mod) => mod.Hero),
  { ssr: false }
);

const AutomationJourney = dynamic(
  () => import("@/components/sections/automation-journey").then((mod) => mod.AutomationJourney),
  { ssr: true }
);

const Industries = dynamic(
  () => import("@/components/sections/industries").then((mod) => mod.Industries),
  { ssr: true }
);

const FeaturedSolutions = dynamic(
  () => import("@/components/sections/featured-solutions").then((mod) => mod.FeaturedSolutions),
  { ssr: true }
);

const EnterpriseBenefits = dynamic(
  () => import("@/components/sections/enterprise-benefits").then((mod) => mod.EnterpriseBenefits),
  { ssr: true }
);

const WhyAiSolutions = dynamic(
  () => import("@/components/sections/why-ai-solutions").then((mod) => mod.WhyAiSolutions),
  { ssr: true }
);

const ImplementationProcess = dynamic(
  () => import("@/components/sections/implementation-process").then((mod) => mod.ImplementationProcess),
  { ssr: true }
);

const TechnologyStack = dynamic(
  () => import("@/components/sections/technology-stack").then((mod) => mod.TechnologyStack),
  { ssr: true }
);

const CaseStudies = dynamic(
  () => import("@/components/sections/case-studies").then((mod) => mod.CaseStudies),
  { ssr: true }
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((mod) => mod.Testimonials),
  { ssr: true }
);

const FAQ = dynamic(
  () => import("@/components/sections/faq").then((mod) => mod.FAQ),
  { ssr: true }
);

const Contact = dynamic(
  () => import("@/components/sections/contact").then((mod) => mod.Contact),
  { ssr: true }
);

function Ticker() {
  const items = [
    "AI SOLUTIONS", "×", "ENTERPRISE AI", "×", "DATA INTELLIGENCE", "×",
    "AUTOMATION", "×", "ML ENGINEERING", "×", "RESULTS", "×",
    "AI SOLUTIONS", "×", "ENTERPRISE AI", "×", "DATA INTELLIGENCE", "×",
    "AUTOMATION", "×", "ML ENGINEERING", "×", "RESULTS", "×",
  ];
  return (
    <div className="border-t-2 border-b-2 border-violet bg-violet/4 overflow-hidden py-[0.7rem]">
      <div className="flex w-max animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-violet px-[2.5rem] whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HomeClient() {
  return (
    <>
      <Hero />
      <Ticker />
      <WhoWeAre />
      <Capabilities />
      <AutomationJourney />
      <Industries />
      <FeaturedSolutions />
      <EnterpriseBenefits />
      <WhyAiSolutions />
      <ImplementationProcess />
      <TechnologyStack />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}