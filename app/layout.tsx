import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "../components/SmoothScrollProvider";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arunkumar.works"),
  alternates: {
    canonical: "/",
  },
  title: "Arun Kumar - Data Engineer & Backend Developer",
  description:
    "Software Engineering student at SZABIST with hands-on experience in data engineering, ETL pipelines, backend development, and AI-powered systems. Oracle Cloud GenAI Certified.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  keywords: [
    "Arun Kumar",
    "Data Engineer",
    "Backend Developer",
    "ETL Pipeline",
    "Python",
    "Snowflake",
    "Airflow",
    "FastAPI",
    "Karachi",
    "Pakistan",
  ],
  authors: [{ name: "Arun Kumar" }],
  creator: "Arun Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunkumar.works",
    title: "Arun Kumar - Data Engineer & Backend Developer",
    description:
      "Building ETL pipelines and backend systems for startups. Oracle Cloud GenAI Certified.",
    siteName: "Arun Kumar Portfolio",
    images: [
      {
        url: "/arun-kumar.jpeg",
        width: 1200,
        height: 630,
        alt: "Arun Kumar - Data Engineer & Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Kumar - Data Engineer & Backend Developer",
    description:
      "Building ETL pipelines and backend systems for startups. Oracle Cloud GenAI Certified.",
    images: ["/arun-kumar.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data so Google understands who this site is about and can show
// a rich result (name, job title, socials) for name searches.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arun Kumar",
  url: "https://arunkumar.works",
  image: "https://arunkumar.works/arun-kumar.jpeg",
  jobTitle: "Data Engineer & Backend Developer",
  worksFor: [
    { "@type": "Organization", name: "Technocas" },
    { "@type": "Organization", name: "Zank AI" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "SZABIST",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  email: "mailto:arunkumarjuswani12@gmail.com",
  sameAs: [
    "https://github.com/arunkumar231105",
    "https://www.linkedin.com/in/arun-kumar-b578a128b/",
  ],
  knowsAbout: [
    "Data Engineering",
    "ETL Pipelines",
    "Web Scraping",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Snowflake",
    "Apache Airflow",
    "Backend Development",
    "AI Integration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${sora.variable} ${dmSans.variable}`}
    >
      <body className="antialiased noise-overlay">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
