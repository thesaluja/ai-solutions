import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASE_STUDIES, SITE } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.challenge.slice(0, 155),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#case-studies"
          className="inline-flex items-center gap-2 text-sm font-mono text-[rgba(240,240,255,0.4)] hover:text-[#00F5FF] transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          All case studies
        </Link>

        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] border border-[#00F5FF]/40 px-2 py-0.5 mb-6 inline-block">
            {study.industry}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl text-[#F0F0FF] mt-4 mb-6">
            {study.title}
          </h1>
          <div className="flex items-baseline gap-4">
            <span className="font-display font-black text-6xl text-[#00F5FF]">
              {study.metric}
            </span>
            <span className="text-[rgba(240,240,255,0.5)]">{study.metricLabel}</span>
          </div>
        </div>

        {/* Content sections - rendered from fullContent */}
        <div className="space-y-12 text-[rgba(240,240,255,0.75)] leading-relaxed">
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">The Challenge</h2>
            <p className="text-lg">{study.challenge}</p>
          </section>

          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Overview</h2>
            <p>{study.fullContent.overview}</p>
          </section>
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Our Approach</h2>
            <p>{study.fullContent.approach}</p>
          </section>
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Architecture</h2>
            <p>{study.fullContent.architecture}</p>
          </section>
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.fullContent.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-[rgba(0,245,255,0.7)] border border-[rgba(0,245,255,0.2)] px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Timeline</h2>
            <p>{study.fullContent.timeline}</p>
          </section>
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Outcome</h2>
            <p>{study.fullContent.outcome}</p>
          </section>

          {/* Results */}
          <section>
            <h2 className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">Results</h2>
            <ul className="space-y-3">
              {study.results.map((result) => (
                <li key={result} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00F5FF] mt-2 shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t-2 border-[#00F5FF]/20">
          <p className="text-[rgba(240,240,255,0.5)] mb-6">
            Want to discuss a similar challenge?
          </p>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Inquiry after reading ${study.title} case study`)}`}
            className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-widest text-[#0A0A14] bg-[#00F5FF] border-2 border-[#00F5FF] shadow-[4px_4px_0_#BF00FF] px-6 py-3 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#BF00FF] transition-all duration-100"
          >
            Start a Conversation <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
