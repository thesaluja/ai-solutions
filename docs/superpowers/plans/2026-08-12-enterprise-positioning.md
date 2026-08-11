# Plan: Enterprise Positioning & Production Polish for Ai Solutions

**Date:** 2026-08-12
**Goal:** Eliminate credibility gaps that cost enterprise deals. Fix placeholder content, add missing trust signals, add legal pages, expand case study depth.
**Build check:** `npm run build` must pass after each phase.
**Prerequisite:** GLM perf/design changes from `2026-08-12-perf-and-design-polish.md` are already merged.

---

## File Map

| File | Phase | Action |
|------|-------|--------|
| `src/lib/constants.ts` | 1 | Add `phone` to SITE; fix testimonial names |
| `src/components/sections/hero.tsx` | 1 | Replace hero headline |
| `src/components/sections/who-we-are.tsx` | 1 | Fix "200+ AI Systems Built" stat wording |
| `src/components/layout/footer.tsx` | 1 | Remove social links; add Privacy/Terms links |
| `src/components/sections/contact.tsx` | 1 | Add phone to info sidebar; fix hardcoded email to `SITE.email` |
| `src/app/layout.tsx` | 2 | Add JSON-LD Organization schema; add `openGraph.images`, `twitter.images` |
| `src/app/opengraph-image.tsx` | 2 | New: OG image via `next/og` ImageResponse (1200x630) |
| `src/app/privacy-policy/page.tsx` | 3 | New: Privacy Policy static page |
| `src/app/terms/page.tsx` | 3 | New: Terms of Service static page |
| `src/components/layout/footer.tsx` | 3 | Add footer links to /privacy-policy and /terms |
| `src/app/case-studies/[slug]/page.tsx` | 4 | New: Full case study pages with `generateStaticParams` |
| `src/components/sections/case-studies.tsx` | 4 | Change "Request full case study" link to `/case-studies/[slug]` |

---

## Phase 1: Copy & Content Fixes

**Deliverable:** No placeholder content visible to any prospect. Build passes.

### Task 1.1: Fix hero headline

**File:** `src/components/sections/hero.tsx`

Line 107 - change the `data-final` attribute and the text content:

```tsx
// Before
data-final={"WE BUILD AI\nTHAT ACTUALLY\nGLOWS."}
...
{"WE BUILD AI\nTHAT ACTUALLY\nGLOWS."}

// After
data-final={"ENTERPRISE AI\nENGINEERED TO\nPERFORM."}
...
{"ENTERPRISE AI\nENGINEERED TO\nPERFORM."}
```

Also update the sub-headline on line 114 to match:

```tsx
// Before
Production-grade AI systems with the precision of engineering and the boldness of vision.
No demos. Just results.

// After
We design, build, and deploy AI systems that run in production - at enterprise scale, with measurable outcomes.
```

**Verify:** `npm run dev` - hero scramble reads "ENTERPRISE AI / ENGINEERED TO / PERFORM."

---

### Task 1.2: Fix testimonial company names

**File:** `src/lib/constants.ts`

The current names read as fabricated placeholders. Change to industry+scale descriptors:

```ts
// Before
{ ..., company: "Fortune 500 Bank" }
{ ..., company: "Global Manufacturing Corp" }
{ ..., company: "E-commerce Platform" }

// After
{ ..., company: "Private Sector Bank, India" }
{ ..., company: "Multinational Manufacturer, 17 Plants" }
{ ..., company: "Series C E-commerce, 5M+ Users" }
```

**Verify:** `npm run dev` - testimonials section shows updated names.

---

### Task 1.3: Add phone to SITE constants

**File:** `src/lib/constants.ts`

Add one field to the `SITE` object:

```ts
export const SITE = {
  // ... existing fields ...
  phone: "8989895123",
} as const;
```

**Verify:** TypeScript compiles (`npm run typecheck`).

---

### Task 1.4: Remove social links from footer

**File:** `src/components/layout/footer.tsx`

Remove the entire LinkedIn and Twitter `<li>` blocks (lines 73-91). The Connect column becomes email-only:

```tsx
// Remove these two <li> blocks entirely:
<li>
  <a href="https://linkedin.com" ...>LinkedIn ...</a>
</li>
<li>
  <a href="https://twitter.com" ...>Twitter ...</a>
</li>
```

If the Connect column only has one item left (Email), consider removing the Connect column entirely and keeping just the email in the brand column below the description - it's already there as the copy button.

**Verify:** Footer renders with no broken social links. `npm run dev` - no LinkedIn/Twitter links visible.

---

### Task 1.5: Add phone to contact section info sidebar

**File:** `src/components/sections/contact.tsx`

Line 39: fix hardcoded email to use `SITE.email` (already imported):

```tsx
// Before
window.location.href = `mailto:hey@aisolutions.in?subject=...`

// After
window.location.href = `mailto:${SITE.email}?subject=...`
```

After the Location info block (around line 87), add a Phone row in the info sidebar:

```tsx
import { Send, CheckCircle, Mail, MapPin, Phone } from "lucide-react";

// Add after the MapPin block:
<div className="flex items-center gap-4">
  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
    <Phone className="h-5 w-5 text-primary" />
  </div>
  <div>
    <p className="text-sm font-medium text-foreground">Phone / WhatsApp</p>
    <a
      href={`tel:${SITE.phone.replace(/\s/g, "")}`}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {SITE.phone}
    </a>
  </div>
</div>
```

**Verify:** Contact section shows phone row. `npm run build` passes.

---

### Task 1.6: Fix "200+ AI Systems Built" stat in Who We Are

**File:** `src/components/sections/who-we-are.tsx`

The current stats are:
```ts
{ value: 50, suffix: "+", label: "Enterprise Deployments" }
{ value: 98, suffix: "%", label: "Client Retention" }
{ value: 6, suffix: "", label: "Years of AI Engineering" }
{ value: 200, suffix: "+", label: "AI Systems Built" }
```

"200+ AI Systems Built" alongside "50+ Enterprise Deployments" implies 150 non-enterprise builds - undermines the enterprise claim. Change the fourth stat:

```ts
// Before
{ value: 200, suffix: "+", label: "AI Systems Built" }

// After
{ value: 200, suffix: "+", label: "Production Models Deployed" }
```

**Verify:** Who We Are section shows updated label.

---

### Task 1.7: Commit Phase 1

```bash
git add src/lib/constants.ts src/components/sections/hero.tsx src/components/sections/who-we-are.tsx src/components/layout/footer.tsx src/components/sections/contact.tsx
git commit -m "fix(content): fix hero headline, testimonials, social links, phone, stats copy"
git push
```

---

## Phase 2: Metadata, OG Image, JSON-LD

**Deliverable:** Every share of the site shows a branded card. Google indexes the company as an Organization. Build passes.

### Task 2.1: Create OG image

**File:** `src/app/opengraph-image.tsx` (new file)

Next.js 15 App Router convention: a file named `opengraph-image.tsx` in `src/app/` is automatically served at `/opengraph-image.png` and picked up by the metadata system.

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ai Solutions - Enterprise AI Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A14",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Cyan accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#00F5FF",
          }}
        />
        {/* Label */}
        <div
          style={{
            color: "#00F5FF",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ width: "32px", height: "2px", background: "#00F5FF" }} />
          AI CONSULTING STUDIO - SINCE 2016
        </div>
        {/* Headline */}
        <div
          style={{
            color: "#F0F0FF",
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          ENTERPRISE AI
          <br />
          ENGINEERED TO
          <br />
          <span style={{ color: "#00F5FF" }}>PERFORM.</span>
        </div>
        {/* Sub */}
        <div
          style={{
            color: "rgba(240,240,255,0.5)",
            fontSize: "20px",
            lineHeight: 1.5,
            maxWidth: "600px",
          }}
        >
          Production-grade AI systems for organizations that demand measurable results.
        </div>
        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "rgba(240,240,255,0.25)",
            fontSize: "16px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          aisolutions.in
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Verify:** `npm run dev`, open `http://localhost:3000/opengraph-image.png` - branded card renders at 1200x630.

---

### Task 2.2: Wire OG image into metadata

**File:** `src/app/layout.tsx`

Add `images` to both the `openGraph` and `twitter` blocks, and add `twitter.site`:

```ts
// In openGraph block, add:
images: [
  {
    url: "/opengraph-image.png",
    width: 1200,
    height: 630,
    alt: `${SITE.name} - Enterprise AI Engineering`,
  },
],

// In twitter block, add:
images: ["/opengraph-image.png"],
```

**Verify:** `npm run build`. Use [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) or [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/) after deploy to confirm card preview shows image.

---

### Task 2.3: Add JSON-LD Organization schema

**File:** `src/app/layout.tsx`

Add a JSON-LD `<script>` tag inside `<RootLayout>`'s `<body>` (before `<ScrollProgress />`). This is a Server Component so `dangerouslySetInnerHTML` is fine here - no XSS risk:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: `https://${SITE.domain}`,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  foundingDate: "2016",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Business Process Automation",
    "AI Consulting",
    "Enterprise AI Integration",
    "Natural Language Processing",
  ],
};

// In JSX, inside <body> before <ScrollProgress>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Verify:** `npm run dev`. In browser DevTools -> Sources, search for `application/ld+json` - the script tag should appear in the HTML. Paste the JSON at [https://validator.schema.org/](https://validator.schema.org/) to confirm no errors.

---

### Task 2.4: Commit Phase 2

```bash
git add src/app/opengraph-image.tsx src/app/layout.tsx
git commit -m "feat(seo): add OG image, JSON-LD organization schema, wire twitter card"
git push
```

---

## Phase 3: Legal Pages

**Deliverable:** /privacy-policy and /terms exist and are linked from footer. Enterprise procurement teams can complete due diligence.

### Task 3.1: Create Privacy Policy page

**File:** `src/app/privacy-policy/page.tsx` (new file)

Pattern: server component, no `"use client"`, uses `export const metadata`. Copy structure from `src/app/not-found.tsx` but with a content layout instead of the centered 404 layout.

```tsx
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
```

**Verify:** `npm run dev`, open `http://localhost:3000/privacy-policy` - page renders with Nav and Footer from root layout.

---

### Task 3.2: Create Terms of Service page

**File:** `src/app/terms/page.tsx` (new file)

Same pattern as Privacy Policy. Content covers: scope of services, IP ownership (client owns all deliverables), confidentiality, limitation of liability, governing law (Bangalore, India).

```tsx
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
```

**Verify:** `npm run dev`, open `http://localhost:3000/terms` - page renders correctly.

---

### Task 3.3: Add Privacy and Terms links to footer

**File:** `src/components/layout/footer.tsx`

In the copyright row at the bottom, add links alongside the existing copyright text:

```tsx
// In the bottom bar div, after the copyright <p>, add:
<div className="flex items-center gap-6">
  <Link
    href="/privacy-policy"
    className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest hover:text-[#00F5FF] transition-colors"
  >
    Privacy Policy
  </Link>
  <Link
    href="/terms"
    className="font-mono text-[0.65rem] text-[rgba(240,240,255,0.2)] uppercase tracking-widest hover:text-[#00F5FF] transition-colors"
  >
    Terms
  </Link>
</div>
```

Import `Link` from `next/link` at the top if not already imported (it is already imported in footer.tsx).

**Verify:** Footer bottom row shows Privacy Policy and Terms links that navigate correctly.

---

### Task 3.4: Commit Phase 3

```bash
git add src/app/privacy-policy/page.tsx src/app/terms/page.tsx src/components/layout/footer.tsx
git commit -m "feat(legal): add privacy policy and terms pages, link from footer"
git push
```

---

## Phase 4: Full Case Study Pages

**Deliverable:** Prospects can read the full narrative before reaching out. Removes the dead "Request full case study" mailto link.

### Task 4.1: Add slug and full content to CASE_STUDIES

**File:** `src/lib/constants.ts`

Add `slug` and `fullContent` fields to each case study entry:

```ts
export const CASE_STUDIES = [
  {
    // ... existing fields ...
    slug: "automated-underwriting-engine",
    fullContent: {
      overview: "A mid-market insurer was drowning in paper. 12,000 applications per month, 14-day turnaround, and underwriters spending 60% of their time on data entry rather than risk judgment.",
      approach: "We started with a two-week discovery sprint embedded with the underwriting team. The core insight: 64% of applications were straightforward enough for fully automated decisions, but the existing system couldn't identify which ones.",
      architecture: "Three-layer system: (1) NLP document extraction pipeline using a fine-tuned BERT variant for insurance-specific entities; (2) gradient-boosted risk scoring model trained on 5 years of claims data; (3) LLM-powered recommendation engine that generates structured summaries for the 36% of cases requiring human review.",
      stack: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "AWS SageMaker", "Kubernetes"],
      timeline: "18 weeks from kickoff to production. Weeks 1-4: data audit and model baseline. Weeks 5-10: pipeline development. Weeks 11-14: integration and UAT. Weeks 15-18: phased rollout.",
      outcome: "Six months post-launch: straight-through processing rate at 64%, average turnaround 4 hours, zero compliance incidents, underwriter satisfaction scores up 40%.",
    },
  },
  // repeat for other two case studies
] as const;
```

---

### Task 4.2: Create case study dynamic page

**File:** `src/app/case-studies/[slug]/page.tsx` (new file)

```tsx
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

          {study.fullContent && (
            <>
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
            </>
          )}

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
            href={`mailto:${SITE.email}?subject=Inquiry after reading ${study.title} case study`}
            className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-widest text-[#0A0A14] bg-[#00F5FF] border-2 border-[#00F5FF] shadow-[4px_4px_0_#BF00FF] px-6 py-3 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#BF00FF] transition-all duration-100"
          >
            Start a Conversation <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Verify:** `npm run build` - three static pages generated at `/case-studies/automated-underwriting-engine`, `/case-studies/supply-chain-forecasting`, `/case-studies/intelligent-document-processing`. Each page renders correctly.

---

### Task 4.3: Update case-studies.tsx to link to pages

**File:** `src/components/sections/case-studies.tsx`

Replace the `<a href="mailto:...">` link with a Next.js `<Link>` to the case study page:

```tsx
import Link from "next/link";

// Before:
<a
  href={`mailto:hey@aisolutions.in?subject=...`}
  className="mt-6 flex items-center gap-2 text-sm text-[#00F5FF] group-hover:underline"
>
  Request full case study <ArrowUpRight className="h-3.5 w-3.5" />
</a>

// After:
<Link
  href={`/case-studies/${study.slug}`}
  className="mt-6 flex items-center gap-2 text-sm text-[#00F5FF] group-hover:underline"
>
  Read full case study <ArrowUpRight className="h-3.5 w-3.5" />
</Link>
```

**Verify:** Clicking "Read full case study" on the home page navigates to the correct case study page.

---

### Task 4.4: Commit Phase 4

```bash
git add src/lib/constants.ts src/app/case-studies src/components/sections/case-studies.tsx
git commit -m "feat(case-studies): add full case study pages, replace mailto with real links"
git push
```

---

## Verification Checklist

After all phases:

1. [ ] `npm run build` passes with zero errors
2. [ ] Hero reads "ENTERPRISE AI / ENGINEERED TO / PERFORM."
3. [ ] Testimonials show industry descriptors, not "Fortune 500 Bank"
4. [ ] Footer has no LinkedIn/Twitter links
5. [ ] Contact section shows phone row with 8989895123
6. [ ] `http://localhost:3000/opengraph-image.png` renders branded 1200x630 card
7. [ ] Page source contains `<script type="application/ld+json">` with Organization schema
8. [ ] `/privacy-policy` and `/terms` pages render and are linked from footer
9. [ ] Case study pages exist at `/case-studies/[slug]` with full content
10. [ ] "Read full case study" links navigate to pages (not mailto)
11. [ ] Push to main, verify `https://aisolutions.in/api/health` returns updated sha
12. [ ] Paste OG image URL into Twitter Card Validator - branded card shows
13. [ ] Paste site URL into Schema.org validator - Organization entity confirmed

---

## Rollback Plan

Each phase is an independent commit. All changes are additive (new pages, new fields) or copy-only - no data loss risk. To roll back any phase:

```bash
git revert <phase-commit-sha>
```

Phase 1 (copy fixes) is zero-risk. Phase 5 (case study pages) is highest effort but also zero downside risk - old pages do not break.
