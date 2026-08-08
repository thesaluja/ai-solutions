"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Check, MapPin } from "lucide-react";
import { useState } from "react";
import { SITE, NAV_ITEMS } from "@/lib/constants";
import { Separator } from "@/components/ui";

export function Footer() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <span className="text-gradient">{SITE.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {SITE.description}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => copyText(SITE.email, "email")}
                className="flex items-center gap-2 hover:text-foreground transition-colors w-fit"
              >
                {SITE.email}
                {copied === "email" ? (
                  <Check className="h-3 w-3 text-accent" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {SITE.location}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-4">Sections</p>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-4">Connect</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Email <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Twitter <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>{SITE.location}</p>
        </div>
      </div>
    </footer>
  );
}