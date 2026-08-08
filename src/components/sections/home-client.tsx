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
    <>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      <div
        style={{
          borderTop: "2px solid #BF00FF",
          borderBottom: "2px solid #BF00FF",
          background: "rgba(191,0,255,0.04)",
          overflow: "hidden",
          padding: "0.7rem 0",
        }}
      >
        <div
          className="flex w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-ibm-plex-mono, monospace)",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#BF00FF",
                padding: "0 2.5rem",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
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