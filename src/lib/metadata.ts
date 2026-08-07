import type { Metadata } from "next";
import { SITE } from "./constants";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  const metaDescription = description ?? SITE.description;
  const url = `https://${SITE.domain}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(`https://${SITE.domain}`),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: SITE.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
    },
    robots: { index: true, follow: true },
  };
}