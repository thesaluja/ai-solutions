"use client";

import { Brain, Shield, Zap, Users } from "lucide-react";
import { SectionReveal, SlideIn, BlurReveal, StaggerChildren, StaggerItem, AnimatedCounter } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { useInView } from "@/hooks";

const stats = [
  { value: 50, suffix: "+", label: "Enterprise Deployments" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 6, suffix: "", label: "Years of AI Engineering" },
  { value: 200, suffix: "+", label: "AI Systems Built" },
];

const principles = [
  {
    icon: Brain,
    title: "Engineers, Not Consultants",
    description:
      "Every project is led by senior engineers who write code, train models, and architect systems. We don't produce slide decks and hand them off.",
  },
  {
    icon: Shield,
    title: "Enterprise Grade Only",
    description:
      "We build for production from day one. Monitoring, security, compliance, and scalability are foundational, not afterthoughts.",
  },
  {
    icon: Zap,
    title: "Measurable Results",
    description:
      "Every engagement starts with a quantified business case. We track real metrics, not vanity numbers, and report actual impact.",
  },
  {
    icon: Users,
    title: "Long-Term Partnership",
    description:
      "We embed with your teams, transfer knowledge, and build systems you can own and extend independently. No lock-in, no dependency.",
  },
];

export function WhoWeAre() {
  const { ref, inView } = useInView();

  return (
    <SectionReveal id="who-we-are" className="relative py-32 md:py-40 overflow-hidden">

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-[#00F5FF] font-mono tracking-widest uppercase mb-4">
            Who We Are
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            We build the AI systems that{" "}
            <span className="text-gradient">other consultancies</span>{" "}
            only present in slide decks
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Ai Solutions is an enterprise AI engineering firm. We design,
            build, and deploy production-grade artificial intelligence
            systems for organizations that demand measurable results.
          </p>
        </BlurReveal>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <SlideIn key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  startCounting={inView}
                />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </SlideIn>
          ))}
        </div>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="group h-full bg-[rgba(255,255,255,0.04)] backdrop-blur-sm border border-[rgba(0,245,255,0.35)] shadow-[4px_4px_0_#00F5FF] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#00F5FF] hover:border-[#00F5FF] transition-all duration-150">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl border border-[#00F5FF]/30 bg-transparent flex items-center justify-center mb-5 group-hover:border-[#00F5FF] group-hover:bg-[rgba(0,245,255,0.04)] transition-all duration-150">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}