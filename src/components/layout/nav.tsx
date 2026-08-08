"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useScrollSpy, useReducedMotion } from "@/hooks";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds, 120);
  const prefersReduced = useReducedMotion();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-[#0A0A14] border-b-2 border-[#00F5FF]",
          scrolled && "backdrop-blur-sm"
        )}
        initial={prefersReduced ? false : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
          <Link
            href="/"
            className="font-display font-black tracking-tight text-lg text-white hover:opacity-80 transition-opacity"
          >
            Ai<span className="text-[#00F5FF]">.</span>Solutions
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200",
                    isActive
                      ? "text-[#00F5FF]"
                      : "text-[rgba(240,240,255,0.5)] hover:text-[#00F5FF]"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border border-[#00F5FF]/30 hover:border-[#00F5FF] p-2 text-[rgba(240,240,255,0.5)] hover:text-[#00F5FF] transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              className="font-mono text-[0.75rem] uppercase tracking-widest text-[#00F5FF] bg-transparent border-2 border-[#00F5FF] shadow-[3px_3px_0_#00F5FF] px-5 py-2 hover:border-[#BF00FF] hover:shadow-[3px_3px_0_#BF00FF] hover:text-[#BF00FF] transition-all duration-150 cursor-pointer"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start a Project
            </button>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-[rgba(240,240,255,0.5)] hover:text-[#00F5FF] transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0A0A14] border-t-2 border-[#00F5FF] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 text-[rgba(240,240,255,0.5)] hover:text-[#00F5FF] transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 -mt-16 h-full">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-black text-3xl tracking-tight text-[rgba(240,240,255,0.5)] hover:text-[#00F5FF] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <button
                  className="font-mono text-[0.75rem] uppercase tracking-widest text-[#00F5FF] bg-transparent border-2 border-[#00F5FF] shadow-[3px_3px_0_#00F5FF] px-5 py-2 hover:border-[#BF00FF] hover:shadow-[3px_3px_0_#BF00FF] hover:text-[#BF00FF] transition-all duration-150 cursor-pointer"
                  onClick={() => {
                    setMobileOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start a Project
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
