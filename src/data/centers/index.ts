import { BloodDonationCenter, CountryConfig } from "@/types/centers";
import { BENIN_CENTERS } from "./benin";
import { TOGO_CENTERS } from "./togo";
import { COTE_IVOIRE_CENTERS } from "./cote-ivoire";
import { SENEGAL_CENTERS } from "./senegal";
import { FRANCE_CENTERS } from "./france";

export { BENIN_CENTERS, TOGO_CENTERS, COTE_IVOIRE_CENTERS, SENEGAL_CENTERS, FRANCE_CENTERS };

export const COUNTRIES: CountryConfig[] = [
  {
    code: "BJ",
    name: "Bénin",
    flag: "🇧🇯",
    defaultCenter: [6.3703, 2.4183], // Cotonou / Bénin sud
    defaultZoom: 8,
    cities: ["Cotonou", "Abomey-Calavi", "Porto-Novo", "Parakou", "Bohicon", "Ouidah", "Natitingou"],
  },
  {
    code: "TG",
    name: "Togo",
    flag: "🇹🇬",
    defaultCenter: [6.1624, 1.2223], // Lomé / Togo
    defaultZoom: 8,
    cities: ["Lomé", "Kara", "Sokodé", "Atakpamé", "Kpalimé", "Dapaong"],
  },
  {
    code: "CI",
    name: "Côte d’Ivoire",
    flag: "🇨🇮",
    defaultCenter: [5.3600, -4.0083], // Abidjan / Côte d'Ivoire
    defaultZoom: 7,
    cities: ["Abidjan", "Yamoussoukro", "Bouaké", "San-Pédro", "Daloa", "Korhogo"],
  },
  {
    code: "SN",
    name: "Sénégal",
    flag: "🇸🇳",
    defaultCenter: [14.6937, -17.4441], // Dakar / Sénégal
    defaultZoom: 7,
    cities: ["Dakar", "Thiès", "Saint-Louis", "Kaolack", "Touba", "Ziguinchor"],
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    defaultCenter: [46.603354, 1.888334], // France centrale
    defaultZoom: 6,
    cities: ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Lille", "Nantes", "Strasbourg", "Montpellier"],
  },
];

export const ALL_CENTERS_BY_COUNTRY: Record<string, BloodDonationCenter[]> = {
  BJ: BENIN_CENTERS,
  TG: TOGO_CENTERS,
  CI: COTE_IVOIRE_CENTERS,
  SN: SENEGAL_CENTERS,
  FR: FRANCE_CENTERS,
};

export const ALL_CENTERS: BloodDonationCenter[] = [
  ...BENIN_CENTERS,
  ...TOGO_CENTERS,
  ...COTE_IVOIRE_CENTERS,
  ...SENEGAL_CENTERS,
  ...FRANCE_CENTERS,
];

/**
 * Récupère les centres d'un pays selon son code ISO (ex: "BJ", "FR")
 * Si le pays n'existe pas, retourne par défaut les centres du premier pays (Bénin ou France)
 */
export function getCentersByCountry(countryCode: string): BloodDonationCenter[] {
  const normalized = countryCode.toUpperCase();
  return ALL_CENTERS_BY_COUNTRY[normalized] || BENIN_CENTERS;
}

/**
 * Récupère la configuration d'un pays par son code ISO
 */
export function getCountryConfig(countryCode: string): CountryConfig {
  const normalized = countryCode.toUpperCase();
  const found = COUNTRIES.find((c) => c.code === normalized);
  return found || COUNTRIES[0]; // Défaut Bénin
}

/**
 * Vérifie si un code pays est supporté dans nos datasets
 */
export function isCountrySupported(countryCode: string): boolean {
  const normalized = countryCode.toUpperCase();
  return Boolean(ALL_CENTERS_BY_COUNTRY[normalized]);
}
