import {
  BloodDonationCenter,
  CenterFilters,
  UserCoordinates,
} from "@/types/centers";
import { getCenterOpenStatus } from "./open-status";
import { sortCentersByDistance } from "./distance";

export function normalizeSearchString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Filtrage des centres du dataset actif
 */
export function filterCenters(
  centers: BloodDonationCenter[],
  query: string,
  filters: CenterFilters,
  userCoords: UserCoordinates | null = null,
  referenceDate: Date = new Date()
): (BloodDonationCenter & { distanceKm?: number })[] {
  const normalizedQuery = normalizeSearchString(query);

  const filtered = centers.filter((center) => {
    // 1. Filtre par recherche textuelle (Nom, Ville, Adresse, Type)
    if (normalizedQuery.length > 0) {
      const matchName = normalizeSearchString(center.name).includes(normalizedQuery);
      const matchCity = normalizeSearchString(center.city).includes(normalizedQuery);
      const matchAddress = normalizeSearchString(center.address).includes(normalizedQuery);
      const matchType = normalizeSearchString(center.type).includes(normalizedQuery);

      if (!matchName && !matchCity && !matchAddress && !matchType) {
        return false;
      }
    }

    // 2. Filtre par Ville
    if (filters.city && filters.city !== "all") {
      if (normalizeSearchString(center.city) !== normalizeSearchString(filters.city)) {
        return false;
      }
    }

    // 3. Filtre par Type de don ("sang", "plasma", "plaquettes")
    if (filters.donationType && filters.donationType !== "all") {
      if (!center.accepts.includes(filters.donationType)) {
        return false;
      }
    }

    // 4. Filtre par Modalité d'accueil ("avec-rdv", "sans-rdv")
    if (filters.appointmentMode && filters.appointmentMode !== "all") {
      if (
        center.appointmentMode !== "mixte" &&
        center.appointmentMode !== filters.appointmentMode
      ) {
        return false;
      }
    }

    // 5. Filtre "Ouvert maintenant"
    if (filters.onlyOpenNow) {
      const status = getCenterOpenStatus(center, referenceDate);
      if (!status.isOpen) {
        return false;
      }
    }

    return true;
  });

  // Si la position utilisateur est connue, trier automatiquement par proximité
  if (userCoords) {
    return sortCentersByDistance(filtered, userCoords);
  }

  return filtered;
}

/**
 * Génère le lien universel d'itinéraire (Google Maps / navigation externe)
 */
export function getDirectionsUrl(center: BloodDonationCenter): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${center.latitude},${center.longitude}`;
}
