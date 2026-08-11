"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal, BlurReveal, FadeIn } from "@/components/motion";
import { Card, CardContent, Badge } from "@/components/ui";
import { CASE_STUDIES } from "@/lib/constants";

export function CaseStudies() {
  return (
    <SectionReveal id="case-studies" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <BlurReveal className="text-center mb-20">
          <p className="text-sm font-medium font-mono text-accent tracking-widest uppercase mb-4">
            Case Studies
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Real results from{" "}
            <span className="text-gradient">real deployments</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            No hypotheticals. No synthetic benchmarks. These are production
            systems delivering measurable business impact today.
          </p>
        </BlurReveal>

        <div className="space-y-8">
          {CASE_STUDIES.map((study, i) => (
            <FadeIn key={study.title} delay={i * 0.15}>
              <Card className="group overflow-hidden bg-[rgba(255,255,255,0.03)] border-2 border-[rgba(0,245,255,0.35)] shadow-[4px_4px_0_#00F5FF] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#00F5FF] transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5">
                    <div className="md:col-span-3 p-8 md:p-10">
                      <Badge className="mb-4 border border-[#00F5FF]/40 text-[#00F5FF] bg-transparent font-mono text-xs">
                        {study.industry}
                      </Badge>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        {study.title}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                            Challenge
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                            Solution
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {study.solution}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {study.results.map((result) => (
                          <span
                            key={result}
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 rounded-full px-3 py-1.5"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]" />
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-white/[0.02] p-8 md:p-10 flex flex-col items-center justify-center border-l border-[#00F5FF]/30">
                      <p className="font-display text-6xl md:text-7xl font-bold text-gradient">
                        {study.metric}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground text-center">
                        {study.metricLabel}
                      </p>
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="mt-6 flex items-center gap-2 text-sm text-[#00F5FF] group-hover:underline"
                      >
                        Read full case study <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
