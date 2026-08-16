import { ReverseGeocodingResult, UserCoordinates } from "@/types/centers";
import { COUNTRIES } from "@/data/centers";
import { calculateDistance } from "./distance";

/**
 * Reverse geocoding via l'API Nominatim (OpenStreetMap)
 * Récupère le pays, code ISO et la ville à partir des coordonnées GPS
 */
export async function reverseGeocodeCoordinates(
  coords: UserCoordinates
): Promise<ReverseGeocodingResult> {
  const { latitude, longitude } = coords;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1&accept-language=fr`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept-Language": "fr",
        "User-Agent": "Hemora-Blood-Donation-Platform",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Nominatim error: ${response.status}`);
    }

    const data = await response.json();
    const address = data.address || {};

    const countryCode = (address.country_code || "").toUpperCase();
    const country = address.country || "Pays inconnu";
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.suburb ||
      address.county ||
      address.state ||
      "Zone locale";

    return {
      countryCode,
      country,
      city,
      displayName: data.display_name,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Reverse geocoding distant indisponible, utilisation du fallback local :", error);

    // Fallback de secours hors-ligne / panne : détection par proximité du pays configuré
    let closestCountry = COUNTRIES[0];
    let minDistance = Infinity;

    for (const country of COUNTRIES) {
      const dist = calculateDistance(
        latitude,
        longitude,
        country.defaultCenter[0],
        country.defaultCenter[1]
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestCountry = country;
      }
    }

    // Si on est à moins de 800 km du centre du pays, on l'associe
    if (minDistance < 800) {
      return {
        countryCode: closestCountry.code,
        country: closestCountry.name,
        city: closestCountry.cities[0],
      };
    }

    return {
      countryCode: "UNKNOWN",
      country: "Position détectée",
      city: "Zone inconnue",
    };
  }
}
