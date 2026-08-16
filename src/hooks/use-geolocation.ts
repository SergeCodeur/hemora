"use client";

import * as React from "react";
import {
  GeolocationStatus,
  UserCoordinates,
  ReverseGeocodingResult,
} from "@/types/centers";
import { reverseGeocodeCoordinates } from "@/lib/centers/reverse-geocoding";
import { isCountrySupported } from "@/data/centers";

export interface UseGeolocationReturn {
  status: GeolocationStatus;
  coordinates: UserCoordinates | null;
  detectedLocation: ReverseGeocodingResult | null;
  errorMessage: string | null;
  isSupportedCountry: boolean;
  requestLocation: () => Promise<ReverseGeocodingResult | null>;
  resetLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [status, setStatus] = React.useState<GeolocationStatus>("idle");
  const [coordinates, setCoordinates] = React.useState<UserCoordinates | null>(null);
  const [detectedLocation, setDetectedLocation] = React.useState<ReverseGeocodingResult | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSupportedCountry, setIsSupportedCountry] = React.useState<boolean>(true);

  const requestLocation = React.useCallback((): Promise<ReverseGeocodingResult | null> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("geolocation" in navigator)) {
        setStatus("unavailable");
        setErrorMessage("La géolocalisation n’est pas supportée par votre navigateur.");
        resolve(null);
        return;
      }

      setStatus("requesting");
      setErrorMessage(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: UserCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);

          try {
            // Reverse Geocoding via Nominatim
            const geoResult = await reverseGeocodeCoordinates(coords);
            setDetectedLocation(geoResult);

            const supported = isCountrySupported(geoResult.countryCode);
            setIsSupportedCountry(supported);

            setStatus("success");
            setErrorMessage(null);
            resolve(geoResult);
          } catch (err) {
            console.error("Erreur reverse geocoding :", err);
            setStatus("success");
            resolve(null);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setStatus("denied");
              setErrorMessage(
                "Nous n’avons pas accès à votre position. Vous pouvez toujours sélectionner votre pays ou rechercher une ville manuellement."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setStatus("unavailable");
              setErrorMessage("Votre position actuelle n’a pas pu être déterminée avec précision.");
              break;
            case error.TIMEOUT:
              setStatus("error");
              setErrorMessage("La demande de localisation a expiré. Veuillez réessayer.");
              break;
            default:
              setStatus("error");
              setErrorMessage("Une erreur est survenue lors de la géolocalisation.");
              break;
          }
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        }
      );
    });
  }, []);

  const resetLocation = React.useCallback(() => {
    setStatus("idle");
    setCoordinates(null);
    setDetectedLocation(null);
    setErrorMessage(null);
    setIsSupportedCountry(true);
  }, []);

  return {
    status,
    coordinates,
    detectedLocation,
    errorMessage,
    isSupportedCountry,
    requestLocation,
    resetLocation,
  };
}
