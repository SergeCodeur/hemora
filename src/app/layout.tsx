import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll";
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

const siteUrl = "https://hemora.sergeamoussougbo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hemora : Donner commence par savoir",
    template: "%s | Hemora",
  },
  description:
    "Hemora est une plateforme d'information, d'orientation et de réassurance dédiée au don de sang bénévole. Vérifiez votre éligibilité, comprenez le parcours de prélèvement et localisez les centres de don ouverts près de chez vous.",
  keywords: [
    "don de sang",
    "donner son sang",
    "éligibilité don de sang",
    "centres de don de sang",
    "réserves sanguines",
    "sensibilisation don de sang",
    "santé publique",
    "Hemora",
  ],
  authors: [{ name: "Hemora" }],
  creator: "Hemora",
  publisher: "Hemora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Hemora",
    title: "Hemora : Donner commence par savoir",
    description:
      "Informations claires, vérification d'éligibilité en 2 minutes et localisation des centres de don de sang ouverts près de chez vous.",
    images: [
      {
        url: "/images/hero-main-donation.webp",
        width: 1400,
        height: 1050,
        alt: "Hemora : Expérience sereine et sécurisée de don de sang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemora : Donner commence par savoir",
    description:
      "Plateforme d'orientation, d'éligibilité et de sensibilisation au don de sang bénévole.",
    images: ["/images/hero-main-donation.webp"],
    creator: "@hemora",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  category: "Health & Medical",
};

// Données structurées JSON-LD Schema.org (WebSite, MedicalOrganization, FAQPage)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://hemora.sergeamoussougbo.com/#organization",
      name: "Hemora",
      url: "https://hemora.sergeamoussougbo.com",
      logo: "https://hemora.sergeamoussougbo.com/images/hero-main-donation.webp",
      description:
        "Plateforme d'information et d'orientation pour les donneurs de sang bénévoles.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://hemora.sergeamoussougbo.com/#website",
      url: "https://hemora.sergeamoussougbo.com",
      name: "Hemora",
      publisher: {
        "@id": "https://hemora.sergeamoussougbo.com/#organization",
      },
      inLanguage: "fr-FR",
    },
    {
      "@type": "FAQPage",
      "@id": "https://hemora.sergeamoussougbo.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Est-ce que le don de sang fait mal ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La piqûre provoque une sensation brève similaire à une prise de sang classique. Le prélèvement en lui-même est totalement indolore et surveillé en permanence par le personnel infirmier.",
          },
        },
        {
          "@type": "Question",
          name: "Dois-je venir à jeun pour donner mon sang ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non, surtout pas ! Il est au contraire vivement recommandé de prendre un repas léger et de boire au moins 500 ml d'eau ou de jus de fruit avant votre venue.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de temps dure un don de sang au total ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Comptez environ 45 minutes sur place, dont seulement 8 à 10 minutes pour le prélèvement effectif. Le reste du temps est consacré à l'accueil, l'entretien médical et la collation.",
          },
        },
      ],
    },
  ],
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
      className={`${figtree.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-hemora-bg bg-grain text-hemora-text font-sans"
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
