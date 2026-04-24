import type { Metadata } from "next";
import { Mulish, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const mulish = Mulish({
  variable: "--font-muli",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Nothing Creative Ad Studio",
    template: "%s | Nothing Creative Ad Studio",
  },
  description:
    "Nothing Creative Ad Studio — Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
  keywords: [
    "creative agency",
    "ad studio",
    "branding",
    "advertising",
    "digital marketing",
    "creative design",
    "Nothing Creative Ad Studio",
  ],
  authors: [{ name: "Nothing Creative Ad Studio" }],
  openGraph: {
    type: "website",
    title: "Nothing Creative Ad Studio",
    description:
      "Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
    siteName: "Nothing Creative Ad Studio",
    images: [
      {
        url: "/images/nothing-logo.png",
        width: 1200,
        height: 630,
        alt: "Nothing Creative Ad Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nothing Creative Ad Studio",
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
      className={`${mulish.variable} ${roboto.variable} ${poppins.variable}`}
    >
      <body className="overflow-x-hidden">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
