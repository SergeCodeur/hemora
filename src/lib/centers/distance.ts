import { BloodDonationCenter, UserCoordinates } from "@/types/centers";

/**
 * Calcul de distance géographique via formule de Haversine (en km)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

/**
 * Formate une distance pour un affichage soigné (ex: "2,3 km" ou "450 m")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1).replace(".", ",")} km`;
}

/**
 * Trie les centres d'une liste par proximité croissante avec l'utilisateur
 */
export function sortCentersByDistance(
  centers: BloodDonationCenter[],
  userCoords: UserCoordinates
): (BloodDonationCenter & { distanceKm: number })[] {
  return centers
    .map((center) => ({
      ...center,
      distanceKm: calculateDistance(
        userCoords.latitude,
        userCoords.longitude,
        center.latitude,
        center.longitude
      ),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
