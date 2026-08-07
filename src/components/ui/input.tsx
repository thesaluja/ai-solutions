import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-border bg-white/5 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 hover:border-white/20 focus:border-accent focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}