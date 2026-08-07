import { SITE } from "@/lib/constants";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[70] bg-background flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-accent animate-spin" />
        <div className="absolute inset-0 rounded-full blur-xl bg-accent/20 animate-pulse" />
      </div>
      <p className="mt-6 text-sm text-muted-foreground tracking-wide animate-pulse">
        {SITE.name}
      </p>
    </div>
  );
}