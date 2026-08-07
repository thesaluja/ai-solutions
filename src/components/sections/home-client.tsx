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

export function HomeClient() {
  return (
    <>
      <Hero />
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