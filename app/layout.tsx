import type { Metadata } from "next";
import { Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

// Space Mono — body text, nav, labels, code-style copy
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

// Bebas Neue — large display headings only (days counter, section titles)
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SecurityGuidebook — Cybersecurity Portfolio",
  description:
    "Pawarid Tupmongkol — Cybersecurity professional. SOC, AppSec, Cloud Security. Open to AUS opportunities.",
  keywords: ["cybersecurity", "SOC analyst", "AppSec", "cloud security", "portfolio", "Australia"],
  authors: [{ name: "Pawarid Tupmongkol" }],
  openGraph: {
    title: "SecurityGuidebook",
    description: "Cybersecurity portfolio — SOC · AppSec · Cloud Security.",
    type: "website",
    url: "https://securityguidebook.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${bebasNeue.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
