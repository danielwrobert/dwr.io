import type { Metadata } from "next";
import { Ovo, Mulish } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Footer from "@/components/Footer/Footer";
import {
  COLOR_THEME_COOKIE_NAME,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from "@/lib/constants";
import "./globals.css";

const ovo = Ovo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ovo",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-muli",
  display: "swap",
});

const SITE_URL = "https://dwr.io";
const SITE_TITLE = "Daniel W. Robert";
const SITE_DESCRIPTION = "Front-End Engineer. Always a student.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "dwr.io",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@danielwrobert",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const saved = (await cookies()).get(COLOR_THEME_COOKIE_NAME);
  const theme: "light" | "dark" =
    saved?.value === "light" ? "light" : "dark";
  const tokens = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <html
      lang="en"
      data-color-theme={theme}
      className={`${ovo.variable} ${mulish.variable} h-full antialiased`}
      style={tokens as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col bg-background text-text font-sans leading-relaxed">
        <Header initialTheme={theme} />
        <Layout>{children}</Layout>
        <Footer />
      </body>
    </html>
  );
}
