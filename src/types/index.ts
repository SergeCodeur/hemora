// Hemora Domain Types - Based on Master Brief

export type Gender = "male" | "female";

export type EligibilityStatus = "eligible" | "temporarily_ineligible" | "ineligible";

export interface EligibilityFormData {
  age?: number;
  weight?: number;
  gender?: Gender;
  hasGivenBefore?: boolean;
  lastDonationDate?: string;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  reasons?: string[];
  nextEligibleDate?: string; // ISO format date string if temporarily ineligible
}

export type DonationType = "sang_total" | "plasma" | "plaquettes";

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface TimeSlot {
  open: string;  // e.g. "08:00"
  close: string; // e.g. "17:00"
}

export type OpeningHours = Record<DayOfWeek, TimeSlot | null>;

export interface GPSCoordinates {
  lat: number;
  lng: number;
}

export interface DonationCenter {
  id: string;
  name: string;
  type: string; // e.g. "Maison du don", "Collecte mobile"
  address: string;
  city: string;
  postalCode: string;
  coordinates: GPSCoordinates;
  phone: string;
  hours: OpeningHours;
  acceptedDonationTypes: DonationType[];
  appointmentRequired: boolean;
  distanceKm?: number;
}

export type CenterOpenStatus = {
  isOpen: boolean;
  message: string; // e.g. "Ouvert maintenant · ferme à 17:00" or "Fermé · ouvre demain à 08:00"
};

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type BloodNeedLevel = "critical" | "high" | "moderate" | "stable";

export interface BloodNeedStatus {
  group: BloodGroup;
  level: BloodNeedLevel;
}

export type GeolocationStatus =
  | "idle"
  | "requesting"
  | "success"
  | "denied"
  | "unavailable"
  | "error";
