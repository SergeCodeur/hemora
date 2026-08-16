# Hemora — Donner commence par savoir

> **Landing page d'information, d'orientation et de sensibilisation au don de sang bénévole.**  
> Projet réalisé dans le cadre du **Figma to Code Challenge — Édition 4**.

* **Site en production :** [https://hemora.sergeamoussougbo.com/](https://hemora.sergeamoussougbo.com/)  
* **Documentation des prompts & démarche IA :** [PROMPTS.md](./PROMPTS.md)

---

## À propos du projet

**Hemora** est né d’une conviction : le premier obstacle au don de sang n'est pas le manque d'engagement, mais le manque d'informations claires, accessibles et rassurantes.

Le projet s'articule autour du concept directeur **« Le Déclic »** : accompagner méthodiquement l'utilisateur depuis son hésitation initiale (*« Est-ce que ça fait mal ? »*, *« Suis-je éligible ? »*) jusqu'à l'action concrète (*« Comment cela va se passer ? »*, *« Où puis-je aller donner dès aujourd'hui ? »*).

---

## Fonctionnalités majeures

### 1. Header & Hero Éditorial Asymétrique
* Titre principal composé avec la typographie serif *Newsreader*.
* Triptyque photographique narratif en trois temps (Avant la venue / L'expérience sereine / La détente post-don).
* Découpes SVG sur mesure inspirées des chemises de dossiers d'archives (*folder tab cutouts*).
* Navigation pilule compacte et double appel à l'action.

### 2. Réassurance & Démystification
* 3 piliers verticaux numérotés avec liserés fins bordeaux pour désamorcer les appréhensions.
* Photographie panoramique d'accueil en ratio 21:9.

### 3. Pourquoi donner ? (Composants du sang)
* Pédagogie bienveillante sans jargon hématologique complexe.
* Décomposition claire de l'utilité des dons : **Plasma**, **Globules rouges**, et **Plaquettes**.

### 4. Simulateur d'éligibilité interactif (2 minutes)
* Machine à états par étapes (Âge, Poids, Sexe biologique, Date du dernier don).
* Calcul physiologique précis de l'intervalle légal (4 mois pour les femmes, 3 mois pour les hommes).
* Affichage immédiat et déculpabilisant de la prochaine date possible en cas d'inaptitude temporaire.
* Formulaires de date personnalisés avec le composant accessible `CustomSelect`.

### 5. Déroulement chronométré d'un don (45 minutes)
* Timeline verticale centrale alternée détaillant les 4 étapes : *Avant de venir*, *Accueil & entretien médical*, *Prélèvement (8-10 min)*, *Repos & collation*.
* Micro-conseils pratiques intégrés (*« Buvez 500 ml d'eau »*, *« Matériel 100% stérile à usage unique »*).

### 6. Carousel de témoignages immersif
* Ruban interactif continu de 8 portraits réels de premiers donneurs.
* Focus dynamique avant/après don (*« Mon inquiétude »* vs *« Ce qui m'a rassuré »*).
* Contrôles complets : tactile (swipe mobile), boutons, clavier (`Flèches`) et pause automatique au survol.

### 7. Besoins du moment (Réserves sanguines)
* Visualisation éditoriale continue des 8 groupes sanguins (`O+`, `O-`, `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`).
* Micro-jauges minimalistes à 4 segments évitant l'effet tableau de bord anxiogène.

### 8. Répertoire de centres localisé Multi-pays
* **45 centres de démonstration réels** répartis sur 5 pays :
  * **Bénin** (Cotonou, Porto-Novo, Parakou, Abomey-Calavi...)
  * **Togo** (Lomé, Sokodé, Kara, Kpalimé...)
  * **Côte d'Ivoire** (Abidjan, Bouaké, Yamoussoukro, San-Pédro...)
  * **Sénégal** (Dakar, Thiès, Saint-Louis, Ziguinchor...)
  * **France** (Paris, Lyon, Marseille, Toulouse, Nantes...)
* **Géolocalisation intelligente & Reverse Geocoding** (OpenStreetMap Nominatim) : bascule automatique du pays actif et de la carte sur la position GPS réelle de l'utilisateur.
* Carte interactive Leaflet avec marqueurs bordeaux et calcul automatique du statut d'ouverture en temps réel (*Ouvert actuellement* / *Fermé*).
* Volet latéral avec horaires détaillés de la semaine et bouton d'itinéraire universel.

### 9. FAQ & Idées reçues
* Accordéon rapide (180ms) centré en colonne unique pour un confort de lecture optimal.

---

## Stack Technique

* **Framework :** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Langage :** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
* **Styling :** [Tailwind CSS v4](https://tailwindcss.com/) & CSS Vanilla avec tokens HSL
* **Animations :** [Framer Motion](https://www.framer.com/motion/)
* **Cartographie :** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
* **Typographies :** Google Fonts — *Figtree* (Sans-serif) & *Newsreader* (Serif éditorial)
* **Icônes :** [Lucide React](https://lucide.dev/)
* **Package Manager :** `pnpm`

---

## Performances, SEO & Accessibilité

* **Optimisation WebP & SVG :** Toutes les photographies éditoriales sont encodées en WebP (qualité 82–84) pour un poids total plume de **865 Ko** (**-91,8%** de réduction de charge réseau).
* **SEO & Réseaux Sociaux :** Balises OpenGraph complètes, Twitter Cards avec visuel haute définition (1400×1050), `/sitemap.xml` et `/robots.txt` dynamiques.
* **Données Structurées JSON-LD (Schema.org) :** Schémas `MedicalOrganization`, `WebSite` et `FAQPage` pour l'éligibilité aux Rich Snippets Google.
* **Accessibilité (a11y) :** Navigation clavier intégrale sur tous les composants interactifs (`Tab`, `Flèches`, `Entrée`, `Échap`), anneaux de focus visibles, balises sémantiques `<a>` avec `scroll-mt` et textes alternatifs `alt` descriptifs.
* **Responsive :** Optimisé de 320px (écrans ultra-compacts) jusqu'au 4K.

---

## Démarrage en local

### Prérequis
* [Node.js](https://nodejs.org/) (v18.18+ ou v20+)
* [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/SergeCodeur/hemora.git
cd hemora

# 2. Installer les dépendances
pnpm install

# 3. Lancer le serveur de développement
pnpm dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
# Valider les types et compiler le bundle de production
pnpm build

# Lancer le serveur de production
pnpm start
```

---

## Structure du projet

```
noble-fermi/
├── public/
│   ├── favicon.svg              # Favicon vectoriel officiel
│   ├── logo.svg                 # Logo SVG vectoriel
│   └── images/                  # 14 photographies éditoriales optimisées en .webp
├── src/
│   ├── app/
│   │   ├── globals.css          # Thème Tailwind v4, scrollbars discrètes & grain
│   │   ├── layout.tsx           # Layout racine, SEO, OpenGraph & Schema.org JSON-LD
│   │   ├── page.tsx             # Assemblage des sections de la landing page
│   │   ├── robots.ts            # Route handler Next.js pour /robots.txt
│   │   └── sitemap.ts           # Route handler Next.js pour /sitemap.xml
│   ├── components/
│   │   ├── centers/             # Composants Carte Leaflet, Card & Drawer
│   │   ├── layout/              # Header, Footer, Container
│   │   ├── sections/            # Hero, Reassurance, WhyGive, Eligibility,
│   │   │                        # Process, Testimonials, Reserves, Centers, FAQ, FinalCTA
│   │   └── ui/                  # CustomSelect accessible, Button, Badges
│   ├── data/
│   │   └── centers-data.ts      # 45 centres de don (BJ, TG, CI, SN, FR)
│   ├── hooks/
│   │   └── use-geolocation.ts   # Hook GPS & Reverse Geocoding
│   ├── lib/
│   │   └── centers/             # Moteur de distance Haversine, filtres, statuts horaires
│   └── types/                   # Interfaces TypeScript strictes
├── PROMPTS.md                   # Journal exhaustif des prompts et de la démarche IA
└── README.md                    # Présentation officielle du projet
```

---

## Challenge & Crédits

* **Auteur :** Serge Codeur ([amoussougboserge@gmail.com](mailto:amoussougboserge@gmail.com))
* **Challenge :** Figma to Code Challenge — Édition 4
* **Licence :** MIT
