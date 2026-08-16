import { BloodDonationCenter, CenterOpenStatus } from "@/types/centers";

function parseTimeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map((v) => parseInt(v, 10));
  return hours * 60 + minutes;
}

/**
 * Calcule dynamiquement le statut ouvert/fermé en fonction du jour et de l'heure
 */
export function getCenterOpenStatus(
  center: BloodDonationCenter,
  now: Date = new Date()
): CenterOpenStatus {
  const currentDayIndex = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = center.openingHours.find((s) => s.dayIndex === currentDayIndex);

  // 1. Si ouvert aujourd'hui, vérifier l'heure
  if (todaySchedule && todaySchedule.isOpen && todaySchedule.openTime && todaySchedule.closeTime) {
    const openMinutes = parseTimeToMinutes(todaySchedule.openTime);
    const closeMinutes = parseTimeToMinutes(todaySchedule.closeTime);

    // Ouvert actuellement
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return {
        isOpen: true,
        label: "Ouvert actuellement",
        detail: `ferme à ${todaySchedule.closeTime}`,
        badgeVariant: "open",
      };
    }

    // Pas encore ouvert aujourd'hui
    if (currentMinutes < openMinutes) {
      return {
        isOpen: false,
        label: "Fermé actuellement",
        detail: `ouvre aujourd’hui à ${todaySchedule.openTime}`,
        badgeVariant: "closed",
      };
    }
  }

  // 2. Si fermé aujourd'hui ou après l'heure de fermeture, chercher le prochain créneau
  for (let offset = 1; offset <= 7; offset++) {
    const nextDayIndex = (currentDayIndex + offset) % 7;
    const nextSchedule = center.openingHours.find((s) => s.dayIndex === nextDayIndex);

    if (nextSchedule && nextSchedule.isOpen && nextSchedule.openTime) {
      if (offset === 1) {
        return {
          isOpen: false,
          label: "Fermé actuellement",
          detail: `ouvre demain à ${nextSchedule.openTime}`,
          badgeVariant: "closed",
        };
      }
      return {
        isOpen: false,
        label: "Fermé actuellement",
        detail: `ouvre ${nextSchedule.dayName.toLowerCase()} à ${nextSchedule.openTime}`,
        badgeVariant: "closed",
      };
    }
  }

  return {
    isOpen: false,
    label: "Fermé temporairement",
    detail: "Consultez les horaires de la semaine",
    badgeVariant: "closed",
  };
}
