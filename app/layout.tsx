import type { Metadata } from "next";
import { Ovo, Mulish } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Daniel W. Robert",
  description: "Front-End Engineer. Always a student. This is my Digital Notebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ovo.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text font-sans leading-relaxed">
        {children}
      </body>
    </html>
  );
}
