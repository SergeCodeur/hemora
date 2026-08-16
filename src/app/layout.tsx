import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF8F6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Hemora — Donner commence par savoir",
  description:
    "Vérifiez votre éligibilité au don de sang, découvrez le déroulement d'un don et trouvez un centre de collecte près de chez vous.",
  keywords: [
    "don de sang",
    "Hemora",
    "éligibilité don de sang",
    "centre de don",
    "don de plasma",
    "don de plaquettes",
    "santé publique",
  ],
  authors: [{ name: "Hemora" }],
  openGraph: {
    title: "Hemora — Donner commence par savoir",
    description:
      "Vérifiez votre éligibilité au don de sang, découvrez le déroulement d'un don et trouvez un centre de collecte près de chez vous.",
    url: "https://hemora.org",
    siteName: "Hemora",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemora — Donner commence par savoir",
    description:
      "Vérifiez votre éligibilité au don de sang, découvrez le déroulement d'un don et trouvez un centre de collecte près de chez vous.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${figtree.variable} ${newsreader.variable} h-full antialiased scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-hemora-bg bg-grain text-hemora-text font-sans"
      >
        {children}
      </body>
    </html>
  );
}
