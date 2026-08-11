"use client";

import dynamic from "next/dynamic";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { Capabilities } from "@/components/sections/capabilities";
import { AutomationJourney } from "@/components/sections/automation-journey";
import { Industries } from "@/components/sections/industries";
import { FeaturedSolutions } from "@/components/sections/featured-solutions";
import { EnterpriseBenefits } from "@/components/sections/enterprise-benefits";
import { WhyAiSolutions } from "@/components/sections/why-ai-solutions";
import { ImplementationProcess } from "@/components/sections/implementation-process";
import { TechnologyStack } from "@/components/sections/technology-stack";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

const Hero = dynamic(
  () => import("@/components/sections/hero").then((mod) => mod.Hero),
  { ssr: false }
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