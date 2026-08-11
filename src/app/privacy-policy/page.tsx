import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-[rgba(240,240,255,0.4)] mb-16">
          Last updated: August 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-[rgba(240,240,255,0.7)] leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Information We Collect</h2>
            <p>
              When you submit the contact form on this website, we collect your name, email address,
              company name (optional), and the message you provide. We do not collect any other
              personal information automatically, and we do not use cookies for tracking or analytics.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">How We Use Your Information</h2>
            <p>
              Contact form submissions are used solely to respond to your inquiry. We do not add you
              to any mailing list, sell your data, or share it with third parties except where required
              by law.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Data Retention</h2>
            <p>
              Email correspondence is retained for up to 24 months for business continuity purposes,
              after which it is permanently deleted. You may request deletion at any time.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Third-Party Services</h2>
            <p>
              This website is hosted on infrastructure that may log IP addresses and request metadata
              for security and abuse prevention. No third-party analytics, advertising, or tracking
              scripts are loaded on this site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of any personal data we hold about
              you. To exercise these rights, contact us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#00F5FF] hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[#F0F0FF] mb-3">Contact</h2>
            <p>
              {SITE.name}, {SITE.location}. Email:{" "}
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
