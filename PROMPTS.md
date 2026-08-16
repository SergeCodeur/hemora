# PROMPTS.md — Hemora

## 1. À propos de ce document

Ce document retrace l’utilisation de l’intelligence artificielle pendant la conception et le développement de Hemora dans le cadre du Figma to Code Challenge — Édition 4.

L’objectif n’est pas de reproduire l’intégralité des échanges avec les différents outils, mais de documenter les prompts et décisions qui ont réellement influencé le projet.

Pour chaque étape significative, je cherche à préciser :

- ce que j’ai demandé à l’IA ;
- ce qu’elle a proposé ou généré ;
- ce que j’ai conservé ;
- ce que j’ai modifié ou rejeté ;
- pourquoi j’ai pris cette décision.

L’IA a été utilisée comme outil de conception, de génération et d’implémentation, mais les choix de produit, de hiérarchie, de direction artistique et d’expérience utilisateur ont été ajustés progressivement à travers plusieurs itérations.

---

## 2. Concept directeur

Hemora est une landing page informative autour du don de sang.

Le projet est parti d’une idée simple :

> Accompagner quelqu’un de « j’hésite à donner » jusqu’à « je sais si je peux donner, comment cela va se passer et où aller ».

Cette direction a donné naissance au concept interne :

**Le Déclic**

L’objectif n’était donc pas seulement de présenter des informations sur le don de sang, mais de construire un parcours capable de réduire progressivement les incertitudes d’un futur donneur.

La phrase éditoriale retenue pour résumer cette approche est :

> **Donner commence par savoir.**

Le parcours a ensuite été organisé autour de plusieurs questions successives :

1. Pourquoi donner ?
2. Est-ce que je peux donner ?
3. Comment cela va-t-il se passer ?
4. Est-ce que d’autres personnes avaient les mêmes inquiétudes ?
5. Quelles réponses à mes dernières questions ?
6. Quels groupes sanguins sont actuellement recherchés ?
7. Où puis-je aller donner ?

---

## 3. Outils d’IA sollicités

### ChatGPT

ChatGPT a principalement servi en amont et pendant les itérations comme partenaire de réflexion.

Utilisation principale :

- analyse du brief du challenge ;
- définition du concept produit ;
- construction de l’architecture narrative de la landing page ;
- réflexion sur la direction artistique ;
- critique des différentes propositions générées ;
- rédaction et amélioration des prompts transmis à l’outil de développement ;
- réflexion UX sur le simulateur d’éligibilité, la géolocalisation, les centres, les témoignages et les autres sections ;
- identification des incohérences visuelles ou rédactionnelles au fil des captures.

ChatGPT n’a pas été utilisé pour générer directement la version finale du code du projet.

---

### Codex

Codex a été testé au début du projet pour lancer une première implémentation.

Cependant, la direction obtenue ne correspondait pas suffisamment à ce que je recherchais, notamment sur la qualité visuelle et la capacité à construire une expérience plus éditoriale et humaine.

J’ai donc décidé de ne pas poursuivre le projet avec cette implémentation.

Cette première tentative a été abandonnée et n’a pas servi de base à la version finale de Hemora.

---

### Gemini dans Antigravity

Gemini dans Antigravity est devenu l’outil principal utilisé pour la réalisation du projet.

Il a notamment servi à :

- créer et modifier les composants ;
- implémenter les sections ;
- appliquer les différentes directions visuelles ;
- développer le simulateur d’éligibilité ;
- développer les interactions ;
- mettre en place la FAQ ;
- créer le carousel de témoignages ;
- implémenter le répertoire de centres ;
- intégrer la carte et la géolocalisation ;
- travailler le responsive ;
- appliquer les différentes corrections demandées au fil des itérations.

Le projet n’a volontairement pas été généré en une seule fois.

Chaque grande partie a été traitée séparément, puis revue avant de passer à la suivante.

---

### Nano Banana

Nano Banana a été utilisé directement depuis l’environnement Gemini / Antigravity pour produire les visuels nécessaires à Hemora.

Les images ont été générées au fur et à mesure des sections puis directement intégrées dans le projet.

La direction donnée aux images reposait notamment sur :

- des adultes africains ;
- des scènes naturelles ;
- une lumière chaude ;
- des environnements contemporains ;
- une photographie éditoriale ;
- peu de clichés médicaux ;
- aucune imagerie anxiogène ou trop clinique.

L’objectif était que les visuels semblent appartenir à une même campagne photographique et non à une accumulation d’images de banque.

---

## 4. Méthode de travail avec l’IA

La méthode utilisée pendant le projet peut être résumée ainsi :

**Brief → proposition IA → observation → critique → correction → validation → section suivante**

Je n’ai pas demandé à l’IA de générer toute la landing page dans une seule instruction.

Après avoir posé le concept et l’architecture générale, chaque partie importante a été retravaillée indépendamment.

Par exemple :

- le Hero a fait l’objet de plusieurs compositions avant validation ;
- la section Réassurance a été entièrement recomposée après le rejet d’une première version trop générique ;
- la section Pourquoi donner a été simplifiée lorsqu’elle est devenue trop technique pour la cible ;
- le simulateur d’éligibilité a été retravaillé pour ne pas ressembler à un onboarding SaaS ;
- plusieurs versions de la section Déroulement ont été rejetées avant de revenir à une timeline verticale ;
- un vert initialement utilisé pour les états positifs du simulateur a été supprimé car il n’appartenait pas à l’identité visuelle de Hemora ;
- la section Témoignages a été densifiée après une première proposition jugée trop vide ;
- le répertoire de centres a ensuite évolué vers une expérience localisée utilisant la géolocalisation et différents jeux de données selon le pays.

Cette approche itérative constitue une partie importante de ma manière d’utiliser l’IA sur Hemora : générer rapidement une hypothèse, l’évaluer dans le contexte global du produit, puis la corriger ou la rejeter.

---

## 5. Séquence de prompts significatifs

### P01 — Refonte du Header et du Hero en triptyque éditorial

**Objectif**

Sortir d'un Hero SaaS classique centré avec boutons génériques pour instaurer d'emblée la signature visuelle de Hemora : typographie à fort caractère, découpe d'onglets de dossier d'archives (*folder tabs*) et narration photographique en 3 temps.

**Prompt significatif**

> *« Refonds le Header et le Hero de Hemora. Je veux une composition éditoriale forte avec Newsreader en grand titre. Le Hero doit intégrer un triptyque photographique en 3 étapes (Avant votre venue, L'expérience Hemora au centre dominant, Moment de détente après le don). Utilise des découpes SVG d’onglets de chemise de dossier pour les visuels latéraux. »*

**Résultat de l’IA**

- Création des masques SVG de découpe (`#folder-tab-left`, `#folder-tab-right`).
- Intégration du composant `Header` au sein du conteneur maître de Hero.
- Génération des 3 photographies thématiques avec Nano Banana.
- Bouton CTA principal rouge Hemora et bouton secondaire capsule avec flèche dynamique.

**Décision / intervention humaine**

- Ajustement du décalage négatif des visuels latéraux (`-translate-y-[85px]`) pour équilibrer la grille sur desktop.
- Ajout d'une disposition adaptée sur mobile pour préserver la lisibilité du titre sans écraser les images.

**Impact sur la version finale**

Le Hero donne immédiatement le ton éditorial, chaleureux et haut de gamme de la plateforme dès le premier écran.

---

### P02 — Section Réassurance : 3 piliers éditoriaux et panorama 21:9

**Objectif**

Désarmer les premières appréhensions du visiteur sans surcharger la page de texte ni recourir à un composant de cartes génériques.

**Prompt significatif**

> *« Je veux refondre la section Réassurance. Pas de cartes SaaS standard. Propose une composition en 2 colonnes pour l’en-tête, puis une grille éditoriale de 3 points numérotés (01, 02, 03) avec un liseré fin bordeaux, suivie d'une grande photographie panoramique d'accueil chaleureux. »*

**Résultat de l’IA**

- Structure en 3 points concis (*« Vous êtes accompagné »*, *« Prévoyez un peu de temps »*, *« Pas besoin de tout savoir avant de venir »*).
- Génération du panorama horizontal 21:9 (`reassurance-horizontal.webp`) avec gradient sombre et pastille de réassurance.

**Décision / intervention humaine**

- Renforcement du contraste textuel sur l'image pour garantir la conformité aux normes d'accessibilité WCAG.

**Impact sur la version finale**

Une respiration visuelle forte qui rassure immédiatement le primo-donneur sans lourdeur institutionnelle.

---

### P03 — Section “Pourquoi donner” : Vulgarisation et dé-médicalisation

**Objectif**

Expliquer l'impact d'un don de sang sans noyer l'utilisateur sous des explications hématologiques complexes.

**Prompt significatif**

> *« Refonds la section "Pourquoi donner". Reste très simple : un don de sang aide plusieurs personnes car il est séparé en plusieurs composants. Présente les 3 éléments clés (Plasma, Globules rouges, Plaquettes) avec des explications concrètes sur leur rôle, sans jargon médical. »*

**Résultat de l’IA**

- Disposition asymétrique : colonne de gauche contextuelle collante au défilement et colonne de droite avec visuel éditorial (`why-give-editorial.webp`) et 3 badges explicatifs simples.

**Décision / intervention humaine**

- Remplacement d'une première version trop axée sur la biochimie par des bénéfices patients directs (*« Utilisé lors d’opérations »*, *« Soutien à la coagulation »*).
- Modification de la phrase de conclusion pour éviter la répétition prématurée du slogan principal.

**Impact sur la version finale**

Une explication limpide et accessible à tous, montrant la démultiplication de l'impact d'un geste unique.

---

### P04 — Simulateur d’éligibilité : Évaluation par étapes et logique physiologique

**Objectif**

Permettre à l’utilisateur d’auto-évaluer son aptitude au don en moins de 2 minutes, avec un accompagnement interactif rassurant et des règles fidèles aux protocoles médicaux.

**Prompt significatif**

> *« Crée le simulateur d’éligibilité de Hemora sous forme d'un parcours pas à pas fluide. Critères à évaluer : Âge (18–70 ans), Poids (minimum 50 kg), Sexe biologique, et date du dernier don. Règle clé : intervalle minimum de 4 mois pour les femmes et 3 mois pour les hommes. Si non éligible temporairement, calcule et affiche la date exacte à laquelle le don redevient possible. »*

**Résultat de l’IA**

- Machine à états interactive (`intro` → `age` → `weight` → `gender` → `lastDonation` → `result`).
- Formulaire dynamique de date (Jour, Mois, Année).
- Algorithme de calcul du délai restant et affichage de la date estimée du prochain don.

**Décision / intervention humaine**

- Intégration d'un avertissement médical clair rappelant que seul un professionnel de santé en centre confirme définitivement l'aptitude.

**Impact sur la version finale**

L'une des pièces maîtresses de la plateforme : un outil interactif, utile, précis et déculpabilisant.

---

### P05 — Suppression du vert d’alerte dans le simulateur

**Objectif**

Maintenir une cohérence graphique stricte avec la charte Hemora en évitant les couleurs parasites de formulaires génériques.

**Prompt significatif**

> *« Dans le résultat du test d'éligibilité, le vert utilisé pour le statut positif fait trop "succès système" et détonne avec l’univers visuel bordeaux et crème de Hemora. Supprime ce vert et réintègre l'état de validation dans les teintes de la marque. »*

**Résultat de l’IA**

- Remplacement de l'état vert par une pastille `bg-hemora-soft-red` avec liseré bordeaux `#A92F3D` et typographie *Newsreader*.

**Décision / intervention humaine**

- Validation de la hiérarchie visuelle des trois états (Éligible, Délai temporaire, Attention médicale particulière).

**Impact sur la version finale**

Le simulateur reste parfaitement intégré à l'univers visuel chaleureux et éditorial de Hemora.

---

### P06 — Section Déroulement : Timeline verticale centrale équilibrée

**Objectif**

Projeter concrètement le futur donneur dans les 45 minutes de son rendez-vous pour désamorcer l’inconnu.

**Prompt significatif**

> *« Pour la section Déroulement, je ne veux pas d’une timeline horizontale qui s’étale mal. Construis une timeline verticale centrale équilibrée (max-w-5xl) à 4 étapes : 1. Avant de venir, 2. Accueil & entretien, 3. Prélèvement, 4. Repos & collation. Alterne texte et repères visuels avec des pastilles numérotées au centre. »*

**Résultat de l’IA**

- Frise verticale continue avec pastilles circulaires numérotées `01` à `04`.
- Alternance gauche/droite sur desktop et réorganisation unilatérale fluide sur mobile.
- Micro-conseils intégrés (*« Buvez 500 ml d'eau »*, *« Matériel 100% stérile »*).

**Décision / intervention humaine**

- Ajustement des temps annoncés pour refléter la réalité du don de sang total (8 à 10 min de prélèvement sur un parcours global de 45 min).

**Impact sur la version finale**

Une visualisation claire et chronométrée qui lève toutes les interrogations sur le temps réel nécessaire.

---

### P07 — Carousel de témoignages : Ruban continu et récits immersifs

**Objectif**

Humaniser la plateforme en donnant la parole à de vrais premiers donneurs ayant surmonté des peurs concrètes (l'aiguille, le temps, la peur du malaise).

**Prompt significatif**

> *« La section témoignages actuelle est trop vide. Je veux un grand module immersif avec 8 premiers donneurs. Sur la gauche, un ruban de portraits verticaux interactif qui défile en continu et s'arrête au survol. Sur la droite, une grande carte avec guillemet en filigrane affichant l'inquiétude initiale du donneur et ce qui l'a rassuré. »*

**Résultat de l’IA**

- Ruban infini avec Framer Motion gérant le défilement continu et le recalcul de position à la sélection.
- Support des contrôles tactiles (swipe mobile), des boutons fléchés et du clavier (`Flèche gauche` / `Flèche droite`).
- 8 témoignages personnalisés (Aïcha, Samuel, Nadia, Idriss, Salimata, Emmanuel, Kader, Fatou).

**Décision / intervention humaine**

- Enrichissement des profils avec des prénoms et des contextes diversifiés.
- Désactivation automatique du défilement lors du focus ou du survol pour laisser le temps de lecture.

**Impact sur la version finale**

Une des sections les plus immersives et engageantes de la landing page, créant une identification immédiate.

---

### P08 — Harmonisation du rythme : Centrage de la section FAQ

**Objectif**

Rompre la monotonie de mise en page et créer une alternance de rythme éditorial entre les sections asymétriques et les sections centrées.

**Prompt significatif**

> *« La FAQ actuelle en 2 colonnes a le même fonctionnement visuel que la section suivante. Pour préserver la cohésion et le rythme du site, refonds la FAQ en colonne unique centrée (max-w-3xl) avec un accordéon minimaliste et des réponses directes aux 8 questions les plus fréquentes. »*

**Résultat de l’IA**

- Refonte en colonne unique centrée avec en-tête éditorial.
- Accordéon compact avec pastilles circulaires `+` / `−` et animations fluides.
- 8 questions ciblées sur les freins majeurs (douleur, jeûne, sport, groupe inconnu, etc.).

**Décision / intervention humaine**

- Accélération de la transition d'ouverture de l'accordéon (180ms en courbe de Bézier réactive) pour une sensation de vivacité instantanée.

**Impact sur la version finale**

Un rythme de lecture aéré et une levée méthodique des dernières objections du visiteur.

---

### P09 — Refonte des réserves sanguines : Visualisation continue sans cartes dashboard

**Objectif**

Informer sur l'urgence des besoins en sang sans transformer la section en un tableau de bord analytique froid.

**Prompt significatif**

> *« Je veux que tu refondes uniquement la section "Les besoins du moment". La version actuelle avec 8 cartes indépendantes ressemble trop à un dashboard. Je veux une visualisation éditoriale continue des 8 groupes sanguins avec typographie Newsreader forte, micro-jauges fines à 4 segments et une palette sobre (bordeaux, ambre, bronze, pierre), sans aucun bleu parasite. »*

**Résultat de l’IA**

- Composition en 2 colonnes : volet gauche contextuel et volet droit avec liste continue des 8 groupes sanguins.
- Micro-jauges à 4 segments fins indiquant le niveau de tension sans anxiété.
- Remplacement des alertes système par un message bienveillant (*« Votre groupe n'est pas prioritaire ? Votre don reste utile »*).

**Décision / intervention humaine**

- Validation de la palette chromatique restreinte aux teintes minérales et chaudes de Hemora.

**Impact sur la version finale**

Une présentation de données élégante et digne, fidèle à l'esprit éditorial de la plateforme.

---

### P10 — Répertoire des centres : Moteur interactif local et carte Leaflet

**Objectif**

Fournir une recherche de lieux de don entièrement opérationnelle et fluide sans nécessiter de backend externe.

**Prompt significatif**

> *« Rends entièrement fonctionnelle la section "Trouver un centre". Données locales statiques : au moins 8 centres avec coordonnées GPS, adresse, téléphone, types de dons acceptés, horaires d'ouverture sur la semaine et modalité de rendez-vous. Ajoute une carte Leaflet synchronisée, des filtres instantanés, un tri de proximité par distance et un drawer latéral de détails. »*

**Résultat de l’IA**

- Création des modules métier `distance.ts` (formule de Haversine), `open-status.ts` (calcul dynamique temps réel ouvert/fermé), et `filter.ts`.
- Intégration de la carte Leaflet avec marqueurs bordeaux personnalisés, infobulles et pastille de géolocalisation pulsante.
- Drawer latéral détaillé affichant les horaires de la semaine (jour actuel surligné) et bouton d'itinéraire universel.

**Décision / intervention humaine**

- Implémentation du chargement dynamique de Leaflet (`next/dynamic` côté client) pour éviter les erreurs de compilation SSR.

**Impact sur la version finale**

Un outil de recherche de centres complet, interactif et directement actionnable.

---

### P11 — Évolution vers une expérience multi-pays et Reverse Geocoding

**Objectif**

Résoudre l'incohérence géographique où un utilisateur situé en Afrique de l'Ouest voyait des centres en France à plus de 4 000 km lors du clic sur « Utiliser ma position ».

**Prompt significatif**

> *« Quand l’utilisateur clique sur "Utiliser ma position", Hemora doit récupérer ses coordonnées GPS, déterminer son pays et sa ville par reverse geocoding, et charger automatiquement le dataset de démonstration correspondant à son pays (Bénin, Togo, Côte d’Ivoire, Sénégal, France). La carte doit se recentrer sur sa région et les centres doivent être triés par vraie distance de proximité. »*

**Résultat de l’IA**

- Création de 45 centres de démonstration répartis sur 5 pays (`BJ`, `TG`, `CI`, `SN`, `FR`).
- Service `reverse-geocoding.ts` utilisant l'API OpenStreetMap Nominatim avec fallback local hors-ligne.
- Hook `useGeolocation` gérant tous les états (détection, pays supporté, pays hors zone de démo, refus de permission).
- Recentrage dynamique de la carte selon le pays actif.

**Décision / intervention humaine**

- Conservation du sélecteur manuel de pays pour permettre d'explorer les centres de tous les pays à tout moment.
- Ajout d'une notification courtoise si l'utilisateur est géolocalisé hors des 5 pays de démonstration.

**Impact sur la version finale**

Une crédibilité totale et une expérience localisée intelligente pour les utilisateurs de plusieurs pays d'Afrique francophone et de France.

---

### P12 — Élimination des composants natifs OS : Création de `CustomSelect`

**Objectif**

Remplacer les éléments `<select>` et barres de défilement par défaut des navigateurs, jugés trop disgracieux et en rupture avec la direction artistique.

**Prompt significatif**

> *« Les menus <select> et barres de scroll par défaut de l'OS sont trop moches. Crée un composant CustomSelect sur mesure pour l'ensemble du site, avec fond blanc doux, bordures propres, pastille active bordeaux, animations Framer Motion et accessibilité clavier complète (flèches, tabulation, touche Échap). »*

**Résultat de l’IA**

- Création de `CustomSelect` (`src/components/ui/custom-select.tsx`) avec support des variantes (`country`, `filter`, `default`).
- Suppression de toutes les balises `<select>` natives du projet (filtres de centres, sélecteur de pays, formulaire de date du simulateur).
- Mise en place d'une scrollbar globale fine (5px) et discrète dans `globals.css`.

**Décision / intervention humaine**

- Suppression des doubles bordures imbriquées dans le sélecteur de pays pour obtenir un bloc épuré unique.
- Ajustement des marges internes du menu déroulant pour éviter que les options ne touchent la scrollbar.

**Impact sur la version finale**

Une finition graphique impeccable et une harmonie totale jusqu'au moindre composant interactif.

---

### P13 — Optimisation ergonomique et responsive mobile (320px–390px)

**Objectif**

Garantir une utilisation fluide et ergonomique de la section Centres sur les écrans mobiles les plus étroits sans défilement vertical excessif.

**Prompt significatif**

> *« En terme de responsive, la barre d'outils des centres s'empile trop verticalement sur mobile et le menu déroulant du pays actif déborde vers la droite. Fais une barre d'actions compacte sur 2 rangées, aligne rigoureusement le menu déroulant sur la largeur du conteneur et corrige la grammaire du titre selon le pays ("au Bénin", "en France"). »*

**Résultat de l’IA**

- Organisation mobile en 2 rangées : recherche en haut, grille à 2 colonnes avec « Ma position » et « Filtres » côte à côte.
- Alignement du menu `CustomSelect` à 100% de la largeur (`left-0 right-0`) supprimant tout débordement horizontal.
- Fonction de préposition grammaticale adaptative (*« Lieux de don au Bénin »*, *« Lieux de don au Sénégal »*, *« Lieux de don en France »*).
- Réduction du padding des cartes de centres (`p-4`) sur mobile.

**Décision / intervention humaine**

- Validation de l'ergonomie tactile au pouce sur petit écran.

**Impact sur la version finale**

Une expérience mobile irréprochable, compacte et sans rupture visuelle dès 320px de largeur.

---

### P14 — Audit global, Wording bienveillant et Sémantique d'ancres

**Objectif**

Passer en revue l'ensemble de la landing page pour corriger les derniers frottements d'UX, d'accessibilité et de sémantique avant la livraison.

**Prompt significatif**

> *« Fais un audit critique complet du projet selon les 14 axes du brief. Ne modifie rien sans mon accord. Présente les points forts, les problèmes classés par priorité et le top 10 des corrections à appliquer. »*

**Résultat de l’IA**

- Audit exhaustif identifiant les opportunités d'amélioration (unification des sous-composants de date, polissage du vocabulaire médical, sémantique des boutons de navigation par ancre, anneaux de focus).
- Application validée des corrections : conversion des boutons d'ancrage en balises sémantiques `<a>` avec `scroll-mt-12 sm:scroll-mt-20`, remplacement de la mention « Disclaimer » par « Information médicale » et ajout d'anneaux de focus visibles sur les cartes.

**Décision / intervention humaine**

- Validation globale des 10 actions recommandées et lancement de la passe de polissage final.

**Impact sur la version finale**

Un niveau de finition et de rigueur exemplaire tant sur le fond éditorial que sur l'accessibilité technique.

---

### P15 — Optimisation WebP des 14 photographies (-91,8% de payload)

**Objectif**

Réduire drastiquement le poids de la page et accélérer le temps de chargement sans aucune dégradation visuelle.

**Prompt significatif**

> *« Optimise toutes les images du projet Hemora avant le déploiement. Convertis les photographies éditoriales en WebP avec une qualité de 80–85 et redimensionne les visuels à leur taille d'affichage réelle. Mets à jour tous les chemins dans le code et supprime les anciens JPG orphelins. »*

**Résultat de l’IA**

- Script d'optimisation automatisé avec redimensionnement adapté (Hero 800–1400px, Panorama 1600px, Témoignages 480px, etc.).
- Mise à jour de tous les composants `next/image` et suppression de 21 fichiers JPG inutilisés.
- Réduction de la charge totale des images de **10,6 Mo** à **865 Ko** (**-91,8%** d'économie).

**Décision / intervention humaine**

- Conservation exclusive des formats SVG pour les logos et icônes afin de préserver une netteté vectorielle absolue.

**Impact sur la version finale**

Performances de chargement ultra-rapides et score de performance optimal pour le déploiement.

---

### P16 — Configuration SEO de production, JSON-LD, Sitemap et Robots

**Objectif**

Assurer une indexation complète et professionnelle de la plateforme par les moteurs de recherche et les réseaux sociaux.

**Prompt significatif**

> *« Configure le SEO complet et les métadonnées de Hemora pour la production. »*

**Résultat de l’IA**

- Métadonnées complètes dans `layout.tsx` (titre avec template, description soignée, canonical, OpenGraph et Twitter Card avec visuel 1400x1050).
- Données structurées JSON-LD (`schema.org`) pour les types `MedicalOrganization`, `WebSite` et `FAQPage` (Rich Snippets Google).
- Génération dynamique des routes Next.js `/sitemap.xml` et `/robots.txt`.

**Décision / intervention humaine**

- Vérification de la validité du flux de génération statique Next.js (`pnpm build`).

**Impact sur la version finale**

Une landing page techniquement irréprochable pour les moteurs de recherche et les partages sociaux.

---

## 6. Propositions de l’IA rejetées ou fortement modifiées

Le développement de Hemora s'est appuyé sur une sélection critique permanente. Voici les principaux cas où la proposition initiale de l'IA a été refusée ou profondément redirigée :

### 1. La direction visuelle initiale trop « SaaS / Tech »
- **Proposition initiale** : Interface sombre ou à dominante violette/bleue avec des badges néon et une structure de cartes uniformes.
- **Problème identifié** : Ressemblance excessive avec une application B2B, totalement inadaptée au contexte émotionnel, chaleureux et solidaire du don de sang.
- **Changement réalisé** : Réorientation vers une charte éditoriale chaleureuse (fond crème `#FAF8F6`, bordeaux Hemora `#A92F3D`, typographie serif *Newsreader* et texture de grain subtile).
- **Enseignement** : L'IA tend naturellement vers les standards visuels dominants du web tech ; un cadrage explicite de la sensibilité éditoriale est indispensable.

### 2. Les grilles de cartes répétitives dans la Réassurance
- **Proposition initiale** : Disposition classique en 3 cartes identiques avec icônes encadrées.
- **Problème identifié** : Sensation de composant « template » répétitif et manque d'impact émotionnel.
- **Changement réalisé** : Recomposition en 3 piliers éditoriaux verticaux fins numérotés `01`, `02`, `03` complétés par une photographie panoramique grand angle.
- **Enseignement** : Varier les modes de lecture (texte numéroté + image plein cadre) est essentiel pour donner du rythme à une landing page.

### 3. Le contenu trop clinique de la section “Pourquoi donner”
- **Proposition initiale** : Explications détaillées sur les fractions sanguines, les volumes en millilitres et les protocoles de centrifugation.
- **Problème identifié** : Contenu trop technique et potentiellement anxiogène pour un primo-donneur.
- **Changement réalisé** : Simplification radicale axée sur l'utilité pour les malades (Plasma, Globules rouges, Plaquettes expliqués en une phrase concrète).
- **Enseignement** : L'IA a tendance à privilégier l'exhaustivité technique au détriment de la clarté pédagogique pour l'utilisateur final.

### 4. La timeline horizontale du Déroulement
- **Proposition initiale** : Frise chronologique horizontale étalée sur 4 colonnes.
- **Problème identifié** : Manque d'espace pour détailler les étapes, mauvaise adaptation sur mobile et aspect rigide.
- **Changement réalisé** : Remplacement par une timeline verticale centrale alternée sur desktop et unilatérale sur mobile, enrichie de micro-conseils bienveillants.
- **Enseignement** : La timeline verticale offre une narration bien plus naturelle pour dérouler une expérience dans le temps.

### 5. L'état vert de validation dans le simulateur
- **Proposition initiale** : Bannière vert vif avec icône d'alerte pour le résultat d'éligibilité positif.
- **Problème identifié** : Rupture chromatique agressive qui dénaturait la palette de Hemora.
- **Changement réalisé** : Intégration du statut éligible dans un conteneur doux `bg-hemora-soft-red` avec icône bordeaux et typographie éditoriale.
- **Enseignement** : Ne pas importer aveuglément les codes d'UI utilitaires sans les harmoniser avec la charte du projet.

### 6. La première version statique des Témoignages
- **Proposition initiale** : 2 citations statiques côte à côte dans des boîtes grises.
- **Problème identifié** : Rendu plat, sans vie et peu convaincant pour rassurer un futur donneur.
- **Changement réalisé** : Création d'un module immersif complet avec ruban interactif infini de 8 portraits et récits avant/après don.
- **Enseignement** : La preuve sociale nécessite de la densité et du mouvement pour créer de l'empathie.

### 7. Les 8 cartes indépendantes des Réserves sanguines
- **Proposition initiale** : Grille régulière de 8 cartes avec badges multicolores (rouge, orange, jaune, vert).
- **Problème identifié** : L'aspect ressemblait à un dashboard de surveillance de serveurs plutôt qu'à une cause humaine.
- **Changement réalisé** : Visualisation éditoriale continue avec typographie forte, micro-jauges discrètes à 4 segments et palette minérale restreinte.
- **Enseignement** : Présenter de la donnée ne signifie pas transformer un site grand public en tableau de bord d'administration.

### 8. L'incohérence géographique de la géolocalisation mono-pays
- **Proposition initiale** : Liste de centres uniquement basée en France avec calcul de distance brut quelle que soit la position détectée.
- **Problème identifié** : Un utilisateur géolocalisé à Cotonou ou Lomé se voyait proposer des centres à 4 500 km.
- **Changement réalisé** : Refonte complète de l'architecture en système multi-pays (Bénin, Togo, Côte d'Ivoire, Sénégal, France) avec détection automatique par reverse geocoding OpenStreetMap.
- **Enseignement** : Toujours tester la crédibilité contextuelle et locale des données de démonstration.

---

## 7. Limites rencontrées avec l’IA

Pendant toute la durée du projet, plusieurs limites inhérentes aux modèles d'IA ont été constatées :

1. **Biais persistant vers les patterns SaaS génériques** : Sans directives stylistiques fermes et itératives, l'IA produit spontanément des interfaces stéréotypées (fonds violets, cartes bento encombrées d'icônes, badges inutiles).
2. **Sur-médicalisation et vocabulaire administratif** : L'IA a fréquemment proposé des formulations cliniques ou juridiques (*« Critère réglementaire non rempli »*, *« Disclaimer obligatoire »*) nécessitant une réécriture humaine pour restaurer un ton bienveillant et chaleureux.
3. **Pertes de cohérence transversale sur les projets longs** : Au fur et à mesure des itérations sur des composants isolés, l'IA a parfois réintroduit des éléments en rupture avec les décisions antérieures (ex : balises `<select>` natives de l'OS réapparues dans une section, composant `CustomDropdown` dupliqué dans le simulateur).
4. **Gestion du responsive extrême (320px–375px)** : L'IA optimise facilement pour les résolutions classiques (390px, 768px, 1024px), mais nécessite des ajustements manuels guidés pour les très petits viewports afin d'éviter les empilements verticaux excessifs ou les débordements de menus.
5. **Absence de sensibilité au contexte émotionnel** : L'IA ne ressent pas la charge émotionnelle d'un geste comme le don de sang. Le choix des visuels, la délicatesse des messages d'inaptitude temporaire et la valorisation de chaque donneur ont exigé une intention et un regard purement humains.

---

## 8. Conclusion

L’intelligence artificielle a joué un rôle d'accélérateur décisif dans le développement de **Hemora** :
- exploration rapide de structures et de variantes d'interface ;
- génération et itération continue des photographies éditoriales adaptées ;
- implémentation rigoureuse de la logique métier (calculs d'éligibilité, distances géographiques, reverse geocoding) ;
- refactorisation TypeScript stricte et optimisation poussée des performances (WebP, SEO, données structurées).

Néanmoins, la qualité, la cohérence et l'âme de la version finale ne découlent pas d'une génération automatique d'un seul bloc, mais de la **vigilance constante du concepteur** : savoir refuser une proposition facile, simplifier un contenu trop technique, harmoniser chaque pixel avec la charte et veiller à ce que la technologie serve toujours le propos humain du produit :

> **Donner commence par savoir.**
