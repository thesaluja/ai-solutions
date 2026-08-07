"use client";

import { motion } from "framer-motion";
import { SectionReveal, BlurReveal } from "@/components/motion";
import { TIMELINE_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ImplementationProcess() {
  return (
    <SectionReveal id="process" className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            A process refined over{" "}
            <span className="text-gradient">50+ enterprise deployments</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every engagement follows a battle-tested methodology designed to
            deliver measurable results in weeks, not months.
          </p>
        </BlurReveal>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-primary/30 md:-translate-x-px" />

          {TIMELINE_STEPS.map((step, i) => (
            <div
              key={step.phase}
              className={cn(
                "relative flex items-start gap-8 pb-16 last:pb-0",
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "hidden md:block flex-1",
                  i % 2 === 0 ? "text-right md:pr-12" : "text-left md:pl-12"
                )}
              >
                {i % 2 === 0 ? (
                  <div>
                    <p className="font-display text-6xl font-bold text-white/5 mb-3">
                      {step.phase}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className="h-16 w-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </motion.div>
              </div>

              <div className={cn("flex-1", i % 2 === 0 ? "md:pl-12" : "md:pr-12")}>
                <p className="md:hidden font-display text-4xl font-bold text-white/5 mb-2">
                  {step.phase}
                </p>
                <h3 className="md:hidden text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="md:hidden text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i % 2 !== 0 ? (
                  <div className="hidden md:block">
                    <p className="font-display text-6xl font-bold text-white/5 mb-3">
                      {step.phase}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}