"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { NeuralNetwork } from "@/components/three/neural-network";
import { useReducedMotion } from "@/hooks";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

function FloatingCard({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl px-4 py-3 text-sm font-medium shadow-lg",
        "border border-white/10 bg-white/[0.03] backdrop-blur-2xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-white/80">{text}</span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReduced]);

  const scrollToNext = () => {
    document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <NeuralNetwork />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background z-[5]" />

      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-6 text-center"
        style={{
          x: prefersReduced ? 0 : springX,
          y: prefersReduced ? 0 : springY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Enterprise AI Engineering
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="block">Intelligence</span>
            <span className="block text-gradient">that transforms</span>
            <span className="block">your business</span>
          </h1>

          <p className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            {SITE.name} designs and deploys enterprise-grade artificial
            intelligence systems that automate complex processes, reduce
            operational costs, and unlock new revenue streams.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="xl"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("case-studies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-white/10 hover:border-white/20"
            >
              View Case Studies
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <FloatingCard
        text="AI Agents Deployed"
        className="absolute top-[15%] left-[10%] hidden lg:flex"
        delay={0.8}
      />
      <FloatingCard
        text="Neural Processing"
        className="absolute top-[20%] right-[12%] hidden lg:flex"
        delay={1.0}
      />
      <FloatingCard
        text="Enterprise Ready"
        className="absolute bottom-[25%] left-[18%] hidden lg:flex"
        delay={1.2}
      />
      <FloatingCard
        text="Real-time Analytics"
        className="absolute bottom-[30%] right-[15%] hidden lg:flex"
        delay={1.4}
      />

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-label="Scroll to explore"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}