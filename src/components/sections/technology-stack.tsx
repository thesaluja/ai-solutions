"use client";

import { Code, Cpu, Bot, Container, Cloud, Database, GitBranch, Workflow } from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { TECH_STACK } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  cpu: Cpu,
  bot: Bot,
  container: Container,
  cloud: Cloud,
  database: Database,
  "git-branch": GitBranch,
  workflow: Workflow,
};

const categories = Array.from(new Set(TECH_STACK.map((t) => t.category)));

export function TechnologyStack() {
  return (
    <SectionReveal id="tech-stack" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Technology
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            The stack we trust for{" "}
            <span className="text-gradient">enterprise deployments</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We select technology based on your requirements, not vendor
            partnerships. Every tool in our stack has been validated across
            multiple production deployments.
          </p>
        </BlurReveal>

        <div className="space-y-12">
          {categories.map((category) => {
            const items = TECH_STACK.filter((t) => t.category === category);
            return (
              <StaggerChildren key={category} staggerDelay={0.05}>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  {category}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {items.map((tech) => {
                    const Icon = iconMap[tech.icon];
                    return (
                      <StaggerItem key={tech.name}>
                        <Card className="group bg-card/30 hover:bg-card/60 border-white/5 hover:border-white/10 transition-all duration-300 cursor-default">
                          <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                              {Icon && (
                                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                              {tech.name}
                            </span>
                          </CardContent>
                        </Card>
                      </StaggerItem>
                    );
                  })}
                </div>
              </StaggerChildren>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}