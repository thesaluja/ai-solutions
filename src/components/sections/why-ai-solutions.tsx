"use client";

import { SectionReveal, BlurReveal, SlideIn } from "@/components/motion";
import { SITE } from "@/lib/constants";

const differentiators = [
  {
    label: "Engineering Depth",
    content:
      "Our team includes former engineering leaders from enterprise AI teams at major technology companies. Every project is led by someone who has deployed AI systems at scale, not a junior consultant reading from a playbook.",
  },
  {
    label: "Full Ownership",
    content:
      "All code, models, documentation, and infrastructure configuration belong to you from day one. We build with open standards and transfer complete knowledge to your team throughout the engagement.",
  },
  {
    label: "Production Reality",
    content:
      "We don't demo in notebooks and call it done. Every system ships with monitoring, alerting, failover, logging, access control, and operational runbooks. If it can't run in production, it's not complete.",
  },
  {
    label: "Measured Outcomes",
    content:
      "We define success metrics during discovery and report actual results throughout the engagement. No vanity metrics. No 'AI transformation' narratives without numbers. You see exactly what your investment delivers.",
  },
  {
    label: "Long-Term Thinking",
    content:
      "We design architectures that grow with your business. Our systems have handled 10x volume increases without rearchitecture because we plan for scale from the beginning.",
  },
];

export function WhyAiSolutions() {
  return (
    <SectionReveal id="why-us" className="relative py-32 md:py-40">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Why {SITE.name}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            What separates us from{" "}
            <span className="text-gradient">every other AI firm</span>
          </h2>
        </BlurReveal>

        <div className="grid md:grid-cols-2 gap-1">
          {differentiators.map((item, i) => (
            <SlideIn
              key={item.label}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.1}
              className="p-8 md:p-10 rounded-2xl border border-white/5 bg-card/20 hover:bg-card/40 transition-colors duration-500"
            >
              <p className="font-display text-5xl font-bold text-white/5 mb-4 tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {item.label}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.content}
              </p>
            </SlideIn>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}