"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem, TiltCard } from "@/components/motion";
import { Card, CardContent, Badge } from "@/components/ui";
import { SOLUTIONS } from "@/lib/constants";

export function FeaturedSolutions() {
  return (
    <SectionReveal id="solutions" className="relative py-32 md:py-40">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Solutions
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Purpose-built systems that{" "}
            <span className="text-gradient">deliver outcomes</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            These are not generic products with your logo slapped on. Each
            solution is architected specifically for your data, your processes,
            and your business objectives.
          </p>
        </BlurReveal>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution) => (
            <StaggerItem key={solution.title}>
              <TiltCard>
                <Card className="group h-full bg-card/50 hover:bg-card/80 border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {solution.category}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}