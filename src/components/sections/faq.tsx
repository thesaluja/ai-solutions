"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionReveal, BlurReveal, StaggerChildren, StaggerItem } from "@/components/motion";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <SectionReveal id="faq" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl -translate-x-1/2" />

      <div className="mx-auto max-w-3xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium text-accent tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Questions{" "}
            <span className="text-gradient">we hear often</span>
          </h2>
        </BlurReveal>

        <StaggerChildren className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <StaggerItem key={i}>
              <div className="border border-white/5 rounded-2xl overflow-hidden bg-card/20 hover:bg-card/30 transition-colors duration-300">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-medium text-foreground pr-8">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}