"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal, BlurReveal } from "@/components/motion";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

const scenes = [
  {
    id: 1,
    label: "The Challenge",
    title: "Your business is drowning in manual processes",
    description:
      "Repetitive tasks consume 60% of your team's time. Data sits in silos. Decisions rely on outdated reports. Your best people spend their days on work that machines should handle.",
  },
  {
    id: 2,
    label: "The Discovery",
    title: "We map every process, every decision, every data flow",
    description:
      "Our engineers analyze your operations end-to-end. We identify the highest-impact automation opportunities and quantify the exact ROI before writing any code.",
  },
  {
    id: 3,
    label: "The Intelligence",
    title: "AI agents learn your business logic",
    description:
      "Custom models are trained on your data, your rules, your edge cases. The system learns to make decisions with the same judgment as your best operators, at 1000x speed.",
  },
  {
    id: 4,
    label: "The Automation",
    title: "Workflows run autonomously with human oversight",
    description:
      "End-to-end processes execute automatically. Approvals, exceptions, and high-judgment decisions route to humans. Everything else runs on autopilot with full audit trails.",
  },
  {
    id: 5,
    label: "The Transformation",
    title: "Your business operates at a new level of efficiency",
    description:
      "Costs drop. Speed increases. Errors disappear. Your team focuses on strategy, innovation, and customer relationships while AI handles the operational heavy lifting.",
  },
];

export function AutomationJourney() {
  const [activeScene, setActiveScene] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const handleScroll = () => {
          const rect = el.getBoundingClientRect();
          const progress = (-rect.top / (rect.height - window.innerHeight)) * scenes.length;
          const idx = Math.min(Math.max(Math.floor(progress), 0), scenes.length - 1);
          setActiveScene(idx);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionReveal className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            The Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            From chaos to{" "}
            <span className="text-gradient">intelligent automation</span>
          </h2>
        </BlurReveal>

        <div ref={sectionRef} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
          <div className="sticky top-0 h-screen flex items-center">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              <div className="relative h-[400px] md:h-[500px]">
                <div className="absolute inset-0 rounded-3xl border border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {scenes.map((scene, i) => (
                        <motion.div
                          key={scene.id}
                          className={cn(
                            "absolute inset-0 flex flex-col items-center justify-center text-center p-8",
                            "transition-opacity duration-700"
                          )}
                          style={{ opacity: activeScene === i ? 1 : 0 }}
                        >
                          <div
                            className={cn(
                              "w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-700",
                              i === 0
                                ? "bg-red-500/10"
                                : i === 1
                                ? "bg-blue-500/10"
                                : i === 2
                                ? "bg-violet-500/10"
                                : i === 3
                                ? "bg-accent/10"
                                : "bg-emerald-500/10"
                            )}
                          >
                            <div
                              className={cn(
                                "w-12 h-12 rounded-full",
                                i === 0 && "bg-red-500/30",
                                i === 1 && "bg-blue-500/30",
                                i === 2 && "bg-violet-500/30",
                                i === 3 && "bg-accent/30",
                                i === 4 && "bg-emerald-500/30"
                              )}
                            />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Phase {(i + 1).toString().padStart(2, "0")}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {scenes.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScene(i)}
                        className={cn(
                          "w-8 h-1 rounded-full transition-all duration-300",
                          activeScene === i
                            ? "bg-accent w-12"
                            : "bg-white/10 hover:bg-white/20"
                        )}
                        aria-label={`Scene ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative" style={{ minHeight: "300px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene}
                    initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-sm font-medium text-accent mb-3">
                      {scenes[activeScene].label}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                      {scenes[activeScene].title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {scenes[activeScene].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>
                    {activeScene + 1} / {scenes.length}
                  </span>
                  <div className="flex-1 h-px bg-white/10">
                    <motion.div
                      className="h-full bg-accent"
                      style={{
                        width: `${((activeScene + 1) / scenes.length) * 100}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}