"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Container } from "../layout/container";
import {
  COUNTRIES,
  getCentersByCountry,
  getCountryConfig,
  isCountrySupported,
} from "@/data/centers";
import { filterCenters } from "@/lib/centers/filter";
import {
  BloodDonationCenter,
  CenterFilters,
  DonationType,
  AppointmentMode,
} from "@/types/centers";
import { useGeolocation } from "@/hooks/use-geolocation";
import { CenterCard } from "@/components/centers/center-card";
import { CenterDetailsDrawer } from "@/components/centers/center-details-drawer";
import { CustomSelect, CustomSelectOption } from "@/components/ui/custom-select";
import {
  Search,
  MapPin,
  Compass,
  RotateCcw,
  SlidersHorizontal,
  Navigation,
  List,
  Map as MapIcon,
  Check,
  AlertCircle,
  Clock,
  Globe,
  ChevronDown,
} from "lucide-react";

// Chargement dynamique de la carte Leaflet côté client
const CentersMapDynamic = dynamic(
  () => import("@/components/centers/centers-map").then((mod) => mod.CentersMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] lg:min-h-[580px] rounded-3xl border border-hemora-border bg-stone-50 flex items-center justify-center text-sm text-hemora-muted">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-hemora-red border-t-transparent animate-spin" />
          Chargement de la carte...
        </div>
      </div>
    ),
  }
);

export function CentersSection() {
  // Pays actif (défaut : Bénin "BJ", ou selon la détection)
  const [selectedCountryCode, setSelectedCountryCode] = React.useState<string>("BJ");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<CenterFilters>({
    city: "all",
    donationType: "all",
    onlyOpenNow: false,
    appointmentMode: "all",
  });

  const [selectedCenter, setSelectedCenter] = React.useState<BloodDonationCenter | null>(null);
  const [drawerCenter, setDrawerCenter] = React.useState<BloodDonationCenter | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [mobileTab, setMobileTab] = React.useState<"list" | "map">("list");
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Hook de géolocalisation & reverse geocoding
  const {
    status: geoStatus,
    coordinates: userCoords,
    detectedLocation,
    errorMessage: geoErrorMessage,
    isSupportedCountry,
    requestLocation,
    resetLocation,
  } = useGeolocation();

  // Configuration du pays actif
  const currentCountryConfig = React.useMemo(
    () => getCountryConfig(selectedCountryCode),
    [selectedCountryCode]
  );

  // Dataset des centres du pays actif
  const currentCountryCenters = React.useMemo(
    () => getCentersByCountry(selectedCountryCode),
    [selectedCountryCode]
  );

  // Villes disponibles pour le pays actif
  const availableCities = React.useMemo(() => {
    const set = new Set(currentCountryCenters.map((c) => c.city));
    return Array.from(set).sort();
  }, [currentCountryCenters]);

  // Si la géolocalisation réussit et détecte un pays supporté, synchroniser le pays actif
  const handleGeolocationClick = async () => {
    const result = await requestLocation();
    if (result && isCountrySupported(result.countryCode)) {
      setSelectedCountryCode(result.countryCode);
      setFilters((f) => ({ ...f, city: "all" })); // Reset ville pour le nouveau pays
    }
  };

  // Changement manuel de pays
  const handleCountryChange = (newCode: string) => {
    setSelectedCountryCode(newCode);
    setFilters((f) => ({ ...f, city: "all" }));
    setSelectedCenter(null);
  };

  // Filtrage et tri instantané
  const filteredCenters = React.useMemo(() => {
    return filterCenters(
      currentCountryCenters,
      searchQuery,
      filters,
      userCoords
    );
  }, [currentCountryCenters, searchQuery, filters, userCoords]);

  // Détection si des filtres sont actifs
  const isFiltered =
    searchQuery.trim().length > 0 ||
    filters.city !== "all" ||
    filters.donationType !== "all" ||
    filters.onlyOpenNow ||
    filters.appointmentMode !== "all" ||
    geoStatus === "success";

  // Réinitialisation des filtres
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      city: "all",
      donationType: "all",
      onlyOpenNow: false,
      appointmentMode: "all",
    });
    setSelectedCenter(null);
    resetLocation();
  };

  const handleOpenDetails = (center: BloodDonationCenter) => {
    setDrawerCenter(center);
    setIsDrawerOpen(true);
  };

  // Préposition grammaticale selon le pays (au Bénin, en France, etc.)
  const countryWithPreposition = React.useMemo(() => {
    const name = currentCountryConfig.name;
    if (name === "Bénin" || name === "Togo" || name === "Sénégal") return `au ${name}`;
    if (name === "Côte d’Ivoire" || name === "France") return `en ${name}`;
    return `en ${name}`;
  }, [currentCountryConfig.name]);

  const activeFiltersCount =
    (filters.city !== "all" ? 1 : 0) +
    (filters.donationType !== "all" ? 1 : 0) +
    (filters.appointmentMode !== "all" ? 1 : 0) +
    (filters.onlyOpenNow ? 1 : 0);

  return (
    <section
      id="centres"
      className="py-12 sm:py-24 md:py-32 bg-hemora-bg bg-grain border-t border-hemora-border/60 scroll-mt-12 sm:scroll-mt-20"
      aria-labelledby="centres-title"
    >
      <Container size="default">
        <div className="space-y-8 sm:space-y-12">
          
          {/* ========================================================================= */}
          {/* EN-TÊTE ÉDITORIAL & SÉLECTEUR DE PAYS DÉMONSTRATION                        */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6">
            <div className="max-w-2xl space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-hemora-red block">
                  Proximité & Accès Régional
                </span>
              </div>
              <h2
                id="centres-title"
                className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-hemora-text tracking-tight leading-[1.14]"
              >
                Lieux de don {countryWithPreposition}.
              </h2>
              <p className="text-hemora-muted text-sm sm:text-base md:text-lg leading-relaxed pt-0.5 max-w-2xl">
                Maisons du don permanentes et centres hospitaliers : trouvez le lieu de collecte le plus proche de vous.
              </p>
            </div>

            {/* Sélecteur de Pays Manuel & Élégant */}
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-hemora-border shadow-2xs shrink-0 self-stretch sm:self-start md:self-auto w-full sm:w-auto min-w-[210px] space-y-1">
              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-stone-400 px-2">
                Pays actif
              </span>
              <CustomSelect
                id="country-select"
                variant="country"
                className="w-full"
                options={COUNTRIES.map((c) => ({
                  value: c.code,
                  label: `${c.flag} ${c.name}`,
                }))}
                value={selectedCountryCode}
                onChange={handleCountryChange}
                ariaLabel="Sélectionner un pays de démonstration"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BARRE D'OUTILS RESPONSIVE (RECHERCHE, GÉOLOCALISATION & FILTRES)           */}
          {/* ========================================================================= */}
          <div className="space-y-3 sm:space-y-4">
            
            {/* Ligne 1 : Recherche principale + Bouton Position sur Desktop */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
              
              {/* Champ de recherche instantanée */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Rechercher une ville, un centre (${currentCountryConfig.name})...`}
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-16 sm:pr-20 bg-white border border-hemora-border rounded-2xl text-xs sm:text-sm text-hemora-text placeholder:text-stone-400 focus:outline-none focus:border-hemora-red focus:ring-1 focus:ring-hemora-red/30 transition-colors shadow-2xs"
                  aria-label="Rechercher un centre de don"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded-full cursor-pointer"
                  >
                    Effacer
                  </button>
                )}
              </div>

              {/* Boutons d'action sur mobile (Grid 2 colonnes) vs Desktop (Alignés) */}
              <div className="grid grid-cols-2 md:flex items-center gap-2 sm:gap-3">
                {/* Bouton "Utiliser ma position" */}
                <button
                  type="button"
                  onClick={handleGeolocationClick}
                  disabled={geoStatus === "requesting"}
                  className={`h-11 sm:h-12 px-3 sm:px-5 rounded-2xl border text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-2xs shrink-0 ${
                    geoStatus === "success"
                      ? "bg-hemora-soft-red/40 border-hemora-red/40 text-hemora-red font-semibold"
                      : "bg-white border-hemora-border text-hemora-text hover:border-hemora-red/40 hover:text-hemora-red"
                  }`}
                >
                  {geoStatus === "requesting" ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-hemora-red border-t-transparent animate-spin" />
                      <span className="truncate">Détection...</span>
                    </>
                  ) : geoStatus === "success" && detectedLocation ? (
                    <>
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-hemora-red shrink-0" />
                      <span className="truncate max-w-[110px] sm:max-w-[180px]">
                        {detectedLocation.city}
                      </span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 shrink-0" />
                      <span className="truncate">Ma position</span>
                    </>
                  )}
                </button>

                {/* Bouton toggle filtres mobile */}
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className={`md:hidden h-11 px-3 rounded-2xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    showMobileFilters || activeFiltersCount > 0
                      ? "bg-hemora-soft-red/40 border-hemora-red/40 text-hemora-red font-semibold"
                      : "bg-white border-hemora-border text-hemora-text"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>
              </div>
            </div>

            {/* Notification en cas de position dans un pays non supporté */}
            {geoStatus === "success" && !isSupportedCountry && detectedLocation && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 animate-in fade-in">
                <p className="font-semibold">
                  Nous n’avons pas encore de centres de démonstration pour votre pays ({detectedLocation.country}).
                </p>
                <p className="text-amber-700">
                  Vous pouvez sélectionner un de nos pays de démonstration (Bénin, Togo, Côte d’Ivoire, Sénégal, France) dans le sélecteur ci-dessus pour explorer les fonctionnalités.
                </p>
              </div>
            )}

            {/* Message informatif en cas de refus / indisponibilité de géolocalisation */}
            {geoErrorMessage && (
              <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <p>{geoErrorMessage}</p>
              </div>
            )}

            {/* Ligne des filtres avancés */}
            <div
              className={`flex-wrap items-center gap-3 pt-1 ${
                showMobileFilters ? "flex" : "hidden md:flex"
              }`}
            >
              {/* Filtre Ville (Dynamique selon le pays) */}
              <CustomSelect
                labelPrefix="Ville :"
                variant="filter"
                options={[
                  { value: "all", label: `Toutes les villes (${currentCountryConfig.name})` },
                  ...availableCities.map((city) => ({ value: city, label: city })),
                ]}
                value={filters.city}
                onChange={(val) => setFilters((f) => ({ ...f, city: val }))}
                ariaLabel="Filtrer par ville"
              />

              {/* Filtre Type de don */}
              <CustomSelect
                labelPrefix="Type :"
                variant="filter"
                options={[
                  { value: "all", label: "Tous types de dons" },
                  { value: "sang", label: "Sang total" },
                  { value: "plasma", label: "Plasma" },
                  { value: "plaquettes", label: "Plaquettes" },
                ]}
                value={filters.donationType}
                onChange={(val) =>
                  setFilters((f) => ({
                    ...f,
                    donationType: val as DonationType | "all",
                  }))
                }
                ariaLabel="Filtrer par type de don"
              />

              {/* Filtre Modalité d'accueil */}
              <CustomSelect
                labelPrefix="Modalité :"
                variant="filter"
                options={[
                  { value: "all", label: "Toutes modalités" },
                  { value: "sans-rdv", label: "Sans rendez-vous" },
                  { value: "avec-rdv", label: "Sur rendez-vous" },
                ]}
                value={filters.appointmentMode}
                onChange={(val) =>
                  setFilters((f) => ({
                    ...f,
                    appointmentMode: val as AppointmentMode | "all",
                  }))
                }
                ariaLabel="Filtrer par modalité d'accueil"
              />

              {/* Toggle Ouvert maintenant */}
              <button
                type="button"
                onClick={() =>
                  setFilters((f) => ({ ...f, onlyOpenNow: !f.onlyOpenNow }))
                }
                className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-2 transition-colors cursor-pointer ${
                  filters.onlyOpenNow
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold"
                    : "bg-white border-hemora-border text-stone-600 hover:border-stone-400"
                }`}
                aria-pressed={filters.onlyOpenNow}
              >
                <Clock className="w-3.5 h-3.5" />
                Ouvert maintenant
              </button>

              {/* Bouton Réinitialiser */}
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-hemora-red hover:bg-hemora-soft-red/30 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Réinitialiser les filtres
                </button>
              )}
            </div>

            {/* Compteur de résultats dynamique & Contexte */}
            <div className="flex items-center justify-between text-xs font-mono text-hemora-muted pt-1">
              <span>
                {filteredCenters.length} {filteredCenters.length > 1 ? "centres trouvés" : "centre trouvé"} en {currentCountryConfig.name}
              </span>

              {/* Tabs Mobile (Liste | Carte) */}
              <div className="flex md:hidden bg-stone-200/70 p-0.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMobileTab("list")}
                  className={`px-3 py-1 text-xs font-sans font-medium rounded-lg transition-all ${
                    mobileTab === "list"
                      ? "bg-white text-hemora-text shadow-2xs font-semibold"
                      : "text-stone-500"
                  }`}
                >
                  <List className="w-3.5 h-3.5 inline mr-1" />
                  Liste
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("map")}
                  className={`px-3 py-1 text-xs font-sans font-medium rounded-lg transition-all ${
                    mobileTab === "map"
                      ? "bg-white text-hemora-text shadow-2xs font-semibold"
                      : "text-stone-500"
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5 inline mr-1" />
                  Carte
                </button>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ZONE PRINCIPALE : LISTE DES CENTRES + CARTE INTERACTIVE                   */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Colonne Liste des centres */}
            <div
              className={`lg:col-span-6 space-y-4 ${
                mobileTab === "list" ? "block" : "hidden lg:block"
              }`}
            >
              {filteredCenters.length > 0 ? (
                <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredCenters.map((center) => (
                    <CenterCard
                      key={center.id}
                      center={center}
                      isSelected={selectedCenter?.id === center.id}
                      onSelect={(c) => setSelectedCenter(c)}
                      onOpenDetails={handleOpenDetails}
                    />
                  ))}
                </div>
              ) : (
                /* État vide soigné */
                <div className="p-8 sm:p-12 rounded-3xl border border-hemora-border bg-white text-center space-y-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-hemora-text text-base">
                      Aucun centre ne correspond à ces critères en {currentCountryConfig.name}.
                    </p>
                    <p className="text-sm text-hemora-muted max-w-sm mx-auto">
                      Essayez d’élargir votre recherche, de changer de ville ou de retirer certains filtres.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-hemora-red hover:underline pt-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>

            {/* Colonne Carte Interactive */}
            <div
              className={`lg:col-span-6 lg:sticky lg:top-12 h-[480px] lg:h-[640px] ${
                mobileTab === "map" ? "block" : "hidden lg:block"
              }`}
            >
              <CentersMapDynamic
                centers={filteredCenters}
                countryConfig={currentCountryConfig}
                selectedCenter={selectedCenter}
                userCoords={userCoords}
                onSelectCenter={(c) => {
                  setSelectedCenter(c);
                  if (window.innerWidth < 1024) {
                    handleOpenDetails(c);
                  }
                }}
              />
            </div>

          </div>

        </div>
      </Container>

      {/* Drawer de détails accessible */}
      <CenterDetailsDrawer
        center={drawerCenter}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
