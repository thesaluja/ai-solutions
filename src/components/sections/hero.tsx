"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();
  const [wipeDone, setWipeDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWipeDone(true), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const el = headlineRef.current;
    if (!el) return;
    const FINAL = el.getAttribute("data-final") || el.innerText;
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const DURATION = 1600;
    const START = Date.now();
    const allChars: Array<{ span: HTMLSpanElement; final: string; resolved: boolean }> = [];

    el.innerHTML = "";
    for (let i = 0; i < FINAL.length; i++) {
      if (FINAL[i] === "\n") {
        el.appendChild(document.createElement("br"));
      } else {
        const span = document.createElement("span");
        span.style.display = "inline";
        span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        el.appendChild(span);
        allChars.push({ span, final: FINAL[i], resolved: false });
      }
    }

    let raf: number;
    function tick() {
      const elapsed = Date.now() - START;
      const progress = Math.min(elapsed / DURATION, 1);
      allChars.forEach((c, i) => {
        const charProgress = i / allChars.length;
        if (!c.resolved && charProgress <= progress) {
          c.resolved = true;
          c.span.textContent = c.final;
          c.span.style.textShadow = "0 0 24px #00F5FF, 0 0 48px #00F5FF";
          setTimeout(() => {
            c.span.style.textShadow = "";
            c.span.style.transition = "text-shadow 0.6s";
          }, 80);
        } else if (!c.resolved) {
          c.span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      });
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  const scrollToNext = () => {
    document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Page wipe overlay */}
      {!wipeDone && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
          style={{
            position: "fixed", inset: 0, background: "#000", zIndex: 9998,
            transformOrigin: "top", borderBottom: "3px solid #00F5FF",
            pointerEvents: "none",
          }}
        />
      )}

      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
      >
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none grid-bg" />

        {/* Subtle glow orbs */}
        <div className="absolute pointer-events-none top-[20%] left-[60%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(191,0,255,0.08)_0%,transparent_70%)] blur-[40px]" />
        <div className="absolute pointer-events-none top-[50%] left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,245,255,0.06)_0%,transparent_70%)] blur-[40px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full py-20">
          {/* Tag */}
          <FadeIn delay={0.4} className="font-mono text-[0.7rem] text-[#00F5FF] uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-[#00F5FF]" />
            AI Consulting Studio &mdash; Since 2016
          </FadeIn>

          {/* Headline - scramble target */}
          <h1
            ref={headlineRef}
            data-final={"WE BUILD AI\nTHAT ACTUALLY\nGLOWS."}
            className="font-display font-black leading-[0.9] tracking-tight mb-8 text-[#F0F0FF] text-[clamp(3.5rem,9vw,8.5rem)] whitespace-pre-line"
          >
            {"WE BUILD AI\nTHAT ACTUALLY\nGLOWS."}
          </h1>

          {/* Sub */}
          <FadeIn delay={0.8} className="font-sans text-[1.05rem] text-[rgba(240,240,255,0.55)] max-w-[500px] leading-relaxed mb-10">
            Production-grade AI systems with the precision of engineering and the boldness of vision.
            No demos. Just results.
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={1.0}>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-[0.8rem] uppercase tracking-widest text-[#0A0A14] bg-[#00F5FF] border-2 border-[#00F5FF] shadow-[5px_5px_0_#BF00FF] px-8 py-3.5 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#BF00FF] transition-all duration-100 cursor-pointer"
              >
                Explore Our Work
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-mono text-[0.8rem] uppercase tracking-widest text-[#BF00FF] bg-transparent border-2 border-[#BF00FF] shadow-[5px_5px_0_#BF00FF] px-8 py-3.5 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#00F5FF] hover:border-[#00F5FF] hover:text-[#00F5FF] transition-all duration-100 cursor-pointer"
              >
                Start a Project
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[rgba(240,240,255,0.4)] hover:text-[#00F5FF] transition-colors"
          aria-label="Scroll to explore"
        >
          <span className="font-mono text-[0.6rem] tracking-widest uppercase">Explore</span>
          <span className="text-lg">&darr;</span>
        </button>
      </section>
    </>
  );
}
