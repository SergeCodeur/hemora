import {
  calculateDistance,
  formatDistance,
  sortCentersByDistance,
} from "@/lib/centers/distance";
import { getCenterOpenStatus } from "@/lib/centers/open-status";
import { filterCenters, normalizeSearchString } from "@/lib/centers/filter";
import {
  BENIN_CENTERS,
  TOGO_CENTERS,
  COTE_IVOIRE_CENTERS,
  SENEGAL_CENTERS,
  FRANCE_CENTERS,
  getCentersByCountry,
  isCountrySupported,
} from "@/data/centers";

export function runCentersUnitTests(): { passed: number; failed: number; results: string[] } {
  let passed = 0;
  let failed = 0;
  const results: string[] = [];

  function assert(condition: boolean, testName: string) {
    if (condition) {
      passed++;
      results.push(`PASS: ${testName}`);
    } else {
      failed++;
      results.push(`FAIL: ${testName}`);
      console.error(`Test failed: ${testName}`);
    }
  }

  // 1. Tests multi-pays datasets
  assert(BENIN_CENTERS.length >= 8, `Bénin contient au moins 8 centres (${BENIN_CENTERS.length})`);
  assert(TOGO_CENTERS.length >= 8, `Togo contient au moins 8 centres (${TOGO_CENTERS.length})`);
  assert(COTE_IVOIRE_CENTERS.length >= 8, `Côte d'Ivoire contient au moins 8 centres (${COTE_IVOIRE_CENTERS.length})`);
  assert(SENEGAL_CENTERS.length >= 8, `Sénégal contient au moins 8 centres (${SENEGAL_CENTERS.length})`);
  assert(FRANCE_CENTERS.length >= 8, `France contient au moins 8 centres (${FRANCE_CENTERS.length})`);

  assert(isCountrySupported("BJ") === true, "Bénin (BJ) est un pays supporté");
  assert(isCountrySupported("SN") === true, "Sénégal (SN) est un pays supporté");
  assert(isCountrySupported("CA") === false, "Canada (CA) n'est pas dans les datasets de démo");

  // 2. Tests de normalisation
  assert(
    normalizeSearchString("HÉMORA Cotonou") === "hemora cotonou",
    "normalizeSearchString retire les majuscules et les accents"
  );

  // 3. Tests de calcul de distance (Haversine)
  // Distance Cotonou CNTS (6.3639, 2.4286) -> Abomey-Calavi (6.4475, 2.3551) ~ 12.5 km
  const distCotonouCalavi = calculateDistance(6.3639, 2.4286, 6.4475, 2.3551);
  assert(
    distCotonouCalavi >= 11 && distCotonouCalavi <= 14,
    `calculateDistance(Cotonou, Calavi) attendu ~12 km (obtenu: ${distCotonouCalavi} km)`
  );

  assert(formatDistance(2.3) === "2,3 km", "formatDistance(2.3) === '2,3 km'");
  assert(formatDistance(0.45) === "450 m", "formatDistance(0.45) === '450 m'");

  // 4. Tests de tri par proximité à Cotonou
  const userInCotonou = { latitude: 6.365, longitude: 2.425 };
  const sortedBJ = sortCentersByDistance(BENIN_CENTERS, userInCotonou);
  assert(
    sortedBJ[0].city === "Cotonou",
    "sortCentersByDistance place les centres de Cotonou en 1er pour un utilisateur à Cotonou"
  );
  assert(
    sortedBJ[0].distanceKm < sortedBJ[sortedBJ.length - 1].distanceKm,
    "sortCentersByDistance respecte l'ordre croissant"
  );

  // 5. Tests du statut d'ouverture dynamique
  const centerCotonou = BENIN_CENTERS[0]; // ANTS Cotonou : Lundi 07:30 -> 17:30, Fermé Dimanche

  // Simulation Lundi à 10:00 (ouvert) -> 17 août 2026 est un Lundi
  const mondayOpenTime = new Date(2026, 7, 17, 10, 0);
  const statusOpen = getCenterOpenStatus(centerCotonou, mondayOpenTime);
  assert(
    statusOpen.isOpen === true && statusOpen.detail.includes("17:30"),
    "getCenterOpenStatus retourne isOpen: true le lundi à 10h avec fermeture à 17:30"
  );

  // Simulation Dimanche à 12:00 (fermé)
  const sundayTime = new Date(2026, 7, 16, 12, 0);
  const statusSunday = getCenterOpenStatus(centerCotonou, sundayTime);
  assert(
    statusSunday.isOpen === false && statusSunday.detail.includes("demain"),
    "getCenterOpenStatus retourne isOpen: false le dimanche et indique la réouverture demain"
  );

  // 6. Tests de recherche et filtrage multi-critères
  const filterByCalavi = filterCenters(
    BENIN_CENTERS,
    "calavi",
    { city: "all", donationType: "all", onlyOpenNow: false, appointmentMode: "all" }
  );
  assert(
    filterByCalavi.length >= 1 && filterByCalavi.every((c) => c.city === "Abomey-Calavi" || c.name.includes("Calavi")),
    "filterCenters avec recherche 'calavi' filtre correctement"
  );

  return { passed, failed, results };
}
