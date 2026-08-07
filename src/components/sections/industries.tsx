"use client";

import { Landmark, Factory, HeartPulse, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { INDUSTRIES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  landmark: Landmark,
  factory: Factory,
  "heart-pulse": HeartPulse,
  "shield-check": ShieldCheck,
  "shopping-cart": ShoppingCart,
  truck: Truck,
};

export function Industries() {
  return (
    <SectionReveal id="industries" className="relative py-32 md:py-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Industries
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Deep expertise across{" "}
            <span className="text-gradient">regulated industries</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            We understand the compliance, data sensitivity, and operational
            complexity of enterprise environments. Each solution is built with
            industry-specific knowledge embedded from day one.
          </p>
        </BlurReveal>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => {
            const Icon = iconMap[industry.icon];
            return (
              <StaggerItem key={industry.name}>
                <Card className="group h-full bg-card/30 hover:bg-card/50 border-white/5 hover:border-white/10 transition-all duration-500">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-500">
                      {Icon && <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-500" />}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
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