import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Anton } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { orgSchema } from "@/lib/seo";

// Altair -  brand headline font (replaces Mulish)
const altair = localFont({
  variable: "--font-muli",
  src: [
    { path: "../fonts/altair/Altair-Thin Trial.ttf", weight: "100 300", style: "normal" },
    { path: "../fonts/altair/Altair-Bold Trial.ttf", weight: "600 900", style: "normal" },
  ],
});

// Nexa -  brand body font (replaces Roboto)
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

// The Altair trial font draws a ZetaFonts watermark for digits, so digits are
// served from Nexa instead (unicode-range limits this face to 0-9).
const digits = localFont({
  variable: "--font-digits",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+0030-0039" }],
  src: [
    { path: "../fonts/nexa/Nexa Light.otf", weight: "100 300", style: "normal" },
    { path: "../fonts/nexa/Nexa Book.otf", weight: "400 500", style: "normal" },
    { path: "../fonts/nexa/Nexa Bold.otf", weight: "600 900", style: "normal" },
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

// Self-hosted so the build never depends on fetching this font from Google
const notoKufiArabic = localFont({
  variable: "--font-noto-kufi",
  src: [
    { path: "../fonts/noto-kufi/NotoKufiArabic-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/noto-kufi/NotoKufiArabic-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/noto-kufi/NotoKufiArabic-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: {
    default: "Nothing Advertising Agency",
    template: "%s | Nothing Advertising Agency",
  },
  description:
    "Nothing Advertising Agency -  Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
  keywords: [
    "creative agency",
    "ad studio",
    "branding",
    "advertising",
    "digital marketing",
    "creative design",
    "Nothing Advertising Agency",
  ],
  authors: [{ name: "Nothing Advertising Agency" }],
  openGraph: {
    type: "website",
    title: "Nothing Advertising Agency",
    description:
      "Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
    siteName: "Nothing Advertising Agency",
    images: [
      {
        url: "/images/nothing-logo.png",
        width: 1200,
        height: 630,
        alt: "Nothing Advertising Agency Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nothing Advertising Agency",
    description:
      "Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
    images: ["/images/nothing-logo.png"],
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
      className={`${altair.variable} ${nexa.variable} ${digits.variable} ${poppins.variable} ${anton.variable} ${notoKufiArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden" suppressHydrationWarning>
        {/* Google Tag Manager */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-N3F3W2CM"
          strategy="afterInteractive"
        />
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3F3W2CM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '885414264631599');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=885414264631599&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
