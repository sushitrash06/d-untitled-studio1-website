import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://d-untitled-studio.com";
const siteName = "D-Untitled-1 Studio";
const siteDescription =
  "Premium architecture and interior design studio by Yuditia & Rizky Chandra. Specializing in wabi-sabi inspired residential, commercial, and interior design solutions in Indonesia.";

export const metadata: Metadata = {
  // Core
  title: {
    default: `${siteName} — Architecture & Interior Design Studio`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "architecture studio",
    "interior design",
    "wabi-sabi design",
    "Indonesian architect",
    "premium interior design Indonesia",
    "residential architecture",
    "commercial architecture",
    "sustainable design",
    "minimalist architecture",
    "D-Untitled Studio",
    "Yuditia architect",
    "Rizky Chandra architect",
    "custom furniture design",
    "architecture planning",
    "styling and finishing",
    "desain interior Jakarta",
    "arsitek Indonesia",
    "jasa arsitek",
    "desain rumah minimalis",
    "studio arsitektur",
  ],
  authors: [
    { name: "Yuditia", url: siteUrl },
    { name: "Rizky Chandra", url: siteUrl },
  ],
  creator: siteName,
  publisher: siteName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} — Architecture & Interior Design Studio`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/img/logo.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Premium Architecture & Interior Design`,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Architecture & Interior Design Studio`,
    description: siteDescription,
    images: [`${siteUrl}/img/logo.png`],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
  },

  // Verification (add your IDs when ready)
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_ID",
  // },

  // Category
  category: "Architecture & Interior Design",
};

// JSON-LD Structured Data for rich search results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ArchitectureFirm"],
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  logo: `${siteUrl}/img/logo.png`,
  image: `${siteUrl}/img/logo.png`,
  telephone: "+62-813-1539-0886",
  email: "untitledD.studio1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressLocality: "Indonesia",
  },
  founder: [
    {
      "@type": "Person",
      name: "Yuditia",
      jobTitle: "Principal Architect",
    },
    {
      "@type": "Person",
      name: "Rizky Chandra",
      jobTitle: "Principal Architect",
    },
  ],
  foundingDate: "2015",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  knowsAbout: [
    "Architecture",
    "Interior Design",
    "Sustainable Design",
    "Wabi-sabi",
    "Residential Architecture",
    "Commercial Architecture",
    "Custom Furniture Design",
  ],
  sameAs: [
    "https://wa.me/6281315390886",
  ],
  priceRange: "$$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
