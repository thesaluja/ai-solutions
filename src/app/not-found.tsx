import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative">
        <p className="text-[180px] font-bold leading-none text-white/5 select-none font-display">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-6xl font-bold text-gradient font-display">404</p>
        </div>
      </div>
      <p className="mt-8 text-lg text-muted-foreground text-balance text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Return home
      </Link>
    </div>
  );
}