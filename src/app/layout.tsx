import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Anton, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

// Altair — brand headline font (replaces Mulish)
const altair = localFont({
  variable: "--font-muli",
  src: [
    { path: "../fonts/altair/Altair-Thin Trial.ttf", weight: "100 300", style: "normal" },
    { path: "../fonts/altair/Altair-Bold Trial.ttf", weight: "600 900", style: "normal" },
  ],
});

// Nexa — brand body font (replaces Roboto)
const nexa = localFont({
  variable: "--font-roboto",
  src: [
    { path: "../fonts/nexa/Nexa Thin.otf", weight: "100 200", style: "normal" },
    { path: "../fonts/nexa/Nexa Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/nexa/Nexa Book.otf", weight: "400", style: "normal" },
    { path: "../fonts/nexa/Nexa Regular.otf", weight: "500", style: "normal" },
    { path: "../fonts/nexa/Nexa Bold.otf", weight: "600 700", style: "normal" },
    { path: "../fonts/nexa/Nexa Heavy.otf", weight: "800 900", style: "normal" },
  ],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Coming Soon | Nothing Advertising Agency",
    template: "%s | Nothing Advertising Agency",
  },
  description:
    "Something extraordinary is on its way. Nothing Advertising Agency — where bold ideas meet creative execution. Stay tuned.",
  keywords: [
    "creative agency",
    "ad studio",
    "branding",
    "advertising",
    "digital marketing",
    "creative design",
    "Nothing Advertising Agency",
    "coming soon",
  ],
  authors: [{ name: "Nothing Advertising Agency" }],
  openGraph: {
    type: "website",
    title: "Coming Soon | Nothing Advertising Agency",
    description:
      "Something extraordinary is on its way. Bold ideas, sharp execution, and a new standard in creative advertising.",
    siteName: "Nothing Advertising Agency",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nothing Advertising Agency — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coming Soon | Nothing Advertising Agency",
    description:
      "Something extraordinary is on its way. Bold ideas, sharp execution, and a new standard in creative advertising.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${altair.variable} ${nexa.variable} ${poppins.variable} ${anton.variable} ${notoKufiArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
