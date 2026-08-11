"use client";

import { useState, useEffect, useCallback } from "react";
import { Command } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Command className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            autoFocus
          />
          <kbd className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5">
            ESC
          </kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">
              No sections found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}