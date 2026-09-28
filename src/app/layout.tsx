import type { Metadata } from "next";
import { Mulish, Roboto, Poppins, Anton, Noto_Kufi_Arabic } from "next/font/google";
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

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Nothing Advertising Agency",
    template: "%s | Nothing Advertising Agency",
  },
  description:
    "Nothing Advertising Agency — Where bold ideas meet creative execution. We craft compelling brand identities, advertising campaigns, and digital experiences.",
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
      className={`${mulish.variable} ${roboto.variable} ${poppins.variable} ${anton.variable} ${notoKufiArabic.variable}`}
    >
      <body className="overflow-x-hidden">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
