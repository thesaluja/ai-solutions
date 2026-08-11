import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing engagements with ${SITE.name}.`,
};

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-[rgba(240,240,255,0.4)] hover:text-[#00F5FF] transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00F5FF] mb-4">
          Legal
        </p>
        <h1 className="font-display font-black text-4xl md:text-5xl text-[#F0F0FF] mb-4">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-[rgba(240,240,255,0.4)] mb-16">
          Last updated: August 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-[rgba(240,240,255,0.7)] leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Scope</h2>
            <p>
              These terms apply to all consulting, engineering, and advisory engagements between
              {SITE.name} and its clients. Specific project terms, deliverables, timelines, and
              compensation are defined in individual Statement of Work (SOW) agreements, which
              take precedence over these general terms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Intellectual Property</h2>
            <p>
              All code, models, documentation, data pipelines, and other deliverables produced
              under a paid engagement are assigned to the client upon full payment. {SITE.name}
              retains no rights to client-specific work product. Generic tooling, libraries, and
              methodologies developed independently remain the property of {SITE.name}.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Confidentiality</h2>
            <p>
              Both parties agree to treat proprietary information shared during an engagement as
              confidential. {SITE.name} will not disclose client data, business processes, or
              technical architecture to third parties without written consent. Mutual NDAs are
              available upon request before any discovery call.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Limitation of Liability</h2>
            <p>
              {SITE.name}'s liability in connection with any engagement is limited to the fees
              paid under the applicable SOW during the three months preceding the claim. We are
              not liable for indirect, consequential, or speculative damages.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Governing Law</h2>
            <p>
              These terms are governed by the laws of Karnataka, India. Disputes shall be resolved
              by arbitration in Bangalore under the Arbitration and Conciliation Act, 1996.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#00F5FF] hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
