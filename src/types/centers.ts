export type DonationType = "sang" | "plasma" | "plaquettes";
export type AppointmentMode = "avec-rdv" | "sans-rdv" | "mixte";
export type EstablishmentType =
  | "Maison du don"
  | "Centre hospitalier"
  | "Site fixe de collecte"
  | "Collecte mobile";

export interface DaySchedule {
  dayName: "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";
  dayIndex: number; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  isOpen: boolean;
  openTime?: string; // Format "HH:mm", ex: "08:30"
  closeTime?: string; // Format "HH:mm", ex: "17:30"
}

export interface BloodDonationCenter {
  id: string;
  countryCode: string; // "BJ", "TG", "CI", "SN", "FR"
  country: string; // "Bénin", "Togo", "Côte d'Ivoire", "Sénégal", "France"
  city: string;
  name: string;
  type: EstablishmentType;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email?: string;
  accepts: DonationType[];
  appointmentMode: AppointmentMode;
  openingHours: DaySchedule[];
  notes?: string;
  accessInfo?: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  defaultCenter: [number, number]; // [lat, lng]
  defaultZoom: number;
  cities: string[];
}

export interface CenterOpenStatus {
  isOpen: boolean;
  label: string; // Ex: "Ouvert actuellement" ou "Fermé actuellement"
  detail: string; // Ex: "ferme à 17:00" ou "ouvre demain à 08:00"
  badgeVariant: "open" | "closed";
}

export interface CenterFilters {
  city: string;
  donationType: DonationType | "all";
  onlyOpenNow: boolean;
  appointmentMode: AppointmentMode | "all";
}

export type GeolocationStatus =
  | "idle"
  | "requesting"
  | "success"
  | "denied"
  | "unavailable"
  | "error";

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

export interface ReverseGeocodingResult {
  countryCode: string; // "BJ", "FR", etc.
  country: string; // "Bénin", "France", etc.
  city: string; // "Cotonou", "Paris", etc.
  displayName?: string;
}
