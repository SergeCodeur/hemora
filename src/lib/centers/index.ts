import { DonationCenter, CenterOpenStatus, GPSCoordinates } from "@/types";

/**
 * Calculates Haversine distance in kilometers between two GPS coordinates.
 */
export function calculateDistance(coord1: GPSCoordinates, coord2: GPSCoordinates): number {
  return 0;
}

/**
 * Calculates open/closed status for a donation center based on current time and opening hours.
 */
export function getCenterOpenStatus(center: DonationCenter, now: Date = new Date()): CenterOpenStatus {
  return { isOpen: true, message: "Ouvert" };
}

/**
 * Filters centers by search term, city, donation type, open status and appointment requirements.
 */
export function filterCenters(centers: DonationCenter[], query: string, filters: Record<string, unknown>): DonationCenter[] {
  return centers;
}
