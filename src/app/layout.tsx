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
  title: "Nothing Creative Ad Studio",
  description: "Nothing Creative Ad Studio - Where bold ideas meet creative execution",
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
