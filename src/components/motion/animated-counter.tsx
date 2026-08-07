"use client";

import { useCountUp } from "@/hooks";

export function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
  startCounting = true,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  startCounting?: boolean;
}) {
  const count = useCountUp(end, duration, startCounting);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}