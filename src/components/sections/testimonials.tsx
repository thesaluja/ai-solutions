"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionReveal, BlurReveal } from "@/components/motion";
import { Card, CardContent } from "@/components/ui";
import { TESTIMONIALS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prefersReduced = useReducedMotion();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <SectionReveal className="relative py-32 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.01] via-transparent to-accent/[0.01]" />

      <div className="mx-auto max-w-4xl px-6">
        <BlurReveal className="text-center mb-16">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Trusted by{" "}
            <span className="text-gradient">engineering leaders</span>
          </h2>
        </BlurReveal>

        <div className="relative">
          <Card className="border-white/5 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-10 md:p-16">
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={
                      prefersReduced
                        ? false
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed">
                      {TESTIMONIALS[current].quote}
                    </blockquote>
                    <div className="mt-8">
                      <p className="font-semibold text-foreground">
                        {TESTIMONIALS[current].author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {TESTIMONIALS[current].role},{" "}
                        {TESTIMONIALS[current].company}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-accent" : "w-2 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}