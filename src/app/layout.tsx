import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CommandPalette } from "@/components/layout/command-palette";
import { SITE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: `https://${SITE.domain}`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Enterprise AI Engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
        >
          <ScrollProgress />
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}