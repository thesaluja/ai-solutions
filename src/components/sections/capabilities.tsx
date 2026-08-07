"use client";

import {
  Cpu,
  Workflow,
  Bot,
  Lightbulb,
  GitBranch,
  Puzzle,
  ArrowUpRight,
} from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem, TiltCard } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  workflow: Workflow,
  bot: Bot,
  lightbulb: Lightbulb,
  "git-branch": GitBranch,
  puzzle: Puzzle,
};

export function Capabilities() {
  return (
    <SectionReveal id="capabilities" className="relative py-32 md:py-40">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            AI engineering across the{" "}
            <span className="text-gradient">full stack</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            From strategy to production deployment, we handle every layer of
            the AI stack so you don't need multiple vendors.
          </p>
        </BlurReveal>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.title}>
                <TiltCard>
                  <Card className="group h-full bg-card/50 hover:bg-card/80 border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500">
                          {Icon && <Icon className="h-7 w-7 text-primary" />}
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}