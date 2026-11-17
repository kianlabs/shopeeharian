import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const pageTitle = `${site.name} - Rekomendasi Produk Dapur, Organizer & Kebersihan Terbaik`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: pageTitle,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "shopee",
    "dapur",
    "organizer",
    "kebersihan",
    "peralatan dapur",
    "home living",
    "kos-kosan",
    "rekomendasi produk",
    "belanja online",
    "diskon shopee",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title: pageTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ee4e2e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
