"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Check, MapPin } from "lucide-react";
import { useState } from "react";
import { SITE, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer className="border-t-2 border-[#00F5FF]/40 bg-[#0A0A14]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-display font-black text-lg tracking-tight">
              Ai<span className="text-[#00F5FF]">.</span>Solutions
            </Link>
            <p className="mt-4 text-sm text-[rgba(240,240,255,0.45)] max-w-sm leading-relaxed">
              {SITE.description}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => copyText(SITE.email, "email")}
                className="font-mono text-xs text-[rgba(240,240,255,0.45)] hover:text-[#00F5FF] transition-colors flex items-center gap-2 w-fit"
              >
                {SITE.email}
                {copied === "email" ? (
                  <Check className="h-3 w-3 text-[#00F5FF]" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
              <span className="font-mono text-xs text-[rgba(240,240,255,0.45)] flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {SITE.location}
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Sections</p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-xs text-[rgba(240,240,255,0.4)] hover:text-[#00F5FF] uppercase tracking-wide transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Connect</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-xs text-[rgba(240,240,255,0.4)] hover:text-[#00F5FF] uppercase tracking-wide transition-colors inline-flex items-center gap-1"
                >
                  Email <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 mb-8 h-[1px] bg-[rgba(0,245,255,0.15)]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest hover:text-[#00F5FF] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest hover:text-[#00F5FF] transition-colors"
            >
              Terms
            </Link>
            <p className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest">
              {SITE.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
