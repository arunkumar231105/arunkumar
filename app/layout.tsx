import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://arunkumar.dev"),
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
    url: "https://arunkumar.dev",
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
      <body className="antialiased noise-overlay">{children}</body>
    </html>
  );
}
