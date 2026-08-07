"use client";

import { Shield, Key, Rocket, Gauge, Lock, Layers } from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { BENEFITS } from "@/lib/constants";

const iconMap: Record<number, React.ComponentType<{ className?: string }>> = {
  0: Shield,
  1: Lock,
  2: Key,
  3: Rocket,
  4: Gauge,
  5: Layers,
};

export function EnterpriseBenefits() {
  return (
    <SectionReveal id="benefits" className="relative py-32 md:py-40">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl -translate-y-1/3 translate-x-[-30%]" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Why Enterprise
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Built for organizations that{" "}
            <span className="text-gradient">cannot afford to fail</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Enterprise AI is not the same as startup AI. Our systems operate
            under regulatory scrutiny, handle sensitive data, and support
            thousands of concurrent users at 99.9% uptime.
          </p>
        </BlurReveal>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = iconMap[i];
            return (
              <StaggerItem key={benefit.title}>
                <Card className="group h-full bg-card/30 hover:bg-card/60 border-white/5 hover:border-primary/10 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center mb-5 group-hover:from-primary/20 transition-colors duration-500">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}