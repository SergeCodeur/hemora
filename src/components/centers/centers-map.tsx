"use client";

import * as React from "react";
import { BloodDonationCenter, CountryConfig, UserCoordinates } from "@/types/centers";
import "leaflet/dist/leaflet.css";

interface CentersMapProps {
  centers: (BloodDonationCenter & { distanceKm?: number })[];
  countryConfig: CountryConfig;
  selectedCenter: BloodDonationCenter | null;
  userCoords: UserCoordinates | null;
  onSelectCenter: (center: BloodDonationCenter) => void;
}

export function CentersMap({
  centers,
  countryConfig,
  selectedCenter,
  userCoords,
  onSelectCenter,
}: CentersMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = React.useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersLayerRef = React.useRef<any>(null);
  const [hasError, setHasError] = React.useState(false);
  const [isMapReady, setIsMapReady] = React.useState(false);
  const lastCountryCodeRef = React.useRef<string>(countryConfig.code);

  // Initialisation de la carte Leaflet
  React.useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      try {
        const L = await import("leaflet");

        if (!isMounted || !mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current, {
          center: countryConfig.defaultCenter,
          zoom: countryConfig.defaultZoom,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        // Tuiles CartoDB Voyager : claires, élégantes et universelles
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19,
          }
        ).addTo(map);

        const markersLayer = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        markersLayerRef.current = markersLayer;
        lastCountryCodeRef.current = countryConfig.code;
        setIsMapReady(true);
      } catch (err) {
        console.error("Erreur d'initialisation Leaflet :", err);
        if (isMounted) setHasError(true);
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [countryConfig.defaultCenter, countryConfig.defaultZoom, countryConfig.code]);

  // Recentrage lors du changement de pays
  React.useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current) return;

    if (lastCountryCodeRef.current !== countryConfig.code) {
      lastCountryCodeRef.current = countryConfig.code;
      mapInstanceRef.current.flyTo(countryConfig.defaultCenter, countryConfig.defaultZoom, {
        duration: 1.2,
      });
    }
  }, [countryConfig, isMapReady]);

  // Mise à jour des marqueurs et synchronisation
  React.useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !markersLayerRef.current) return;

    let isMounted = true;

    async function updateMarkers() {
      try {
        const L = await import("leaflet");
        if (!isMounted) return;

        const map = mapInstanceRef.current;
        const markersLayer = markersLayerRef.current;
        markersLayer.clearLayers();

        // 1. Marqueur position utilisateur (si disponible)
        if (userCoords) {
          const userIcon = L.divIcon({
            className: "custom-user-pin",
            html: `
              <div style="
                position: relative;
                width: 20px;
                height: 20px;
                background-color: #2563EB;
                border: 3px solid #FFFFFF;
                border-radius: 50%;
                box-shadow: 0 0 14px rgba(37, 99, 235, 0.6);
              ">
                <div style="
                  position: absolute;
                  top: -6px;
                  left: -6px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background-color: rgba(37, 99, 235, 0.25);
                  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                "></div>
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          const userMarker = L.marker([userCoords.latitude, userCoords.longitude], {
            icon: userIcon,
            zIndexOffset: 1000,
          });

          userMarker.bindTooltip("Votre position détectée", {
            direction: "top",
            offset: [0, -10],
          });

          markersLayer.addLayer(userMarker);
        }

        // 2. Marqueurs des centres
        const bounds: [number, number][] = [];

        centers.forEach((center) => {
          const isSelected = selectedCenter?.id === center.id;
          bounds.push([center.latitude, center.longitude]);

          const centerIcon = L.divIcon({
            className: `custom-center-pin-${center.id}`,
            html: `
              <div style="
                width: ${isSelected ? "36px" : "28px"};
                height: ${isSelected ? "36px" : "28px"};
                background-color: ${isSelected ? "#A92F3D" : "#FFFFFF"};
                border: 2px solid ${isSelected ? "#FFFFFF" : "#A92F3D"};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                transition: all 0.2s ease;
                cursor: pointer;
              ">
                <svg width="${isSelected ? "18" : "14"}" height="${isSelected ? "18" : "14"}" viewBox="0 0 24 24" fill="${isSelected ? "#FFFFFF" : "#A92F3D"}">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            `,
            iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
            iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
          });

          const marker = L.marker([center.latitude, center.longitude], {
            icon: centerIcon,
            zIndexOffset: isSelected ? 900 : 100,
          });

          marker.on("click", () => {
            onSelectCenter(center);
          });

          marker.bindTooltip(`<strong>${center.name}</strong><br/>${center.city}, ${center.country}`, {
            direction: "top",
            offset: [0, isSelected ? -20 : -16],
          });

          markersLayer.addLayer(marker);
        });

        // 3. Recentrage automatique : centre sélectionné OU vue globale du pays / centres visibles
        if (selectedCenter) {
          map.flyTo([selectedCenter.latitude, selectedCenter.longitude], 14, {
            duration: 1.2,
          });
        } else if (bounds.length > 0) {
          // Si tous les centres ou un sous-ensemble sont visibles sans sélection, ajuster la vue
          if (bounds.length === 1) {
            map.flyTo(bounds[0], 13, { duration: 1.0 });
          } else {
            map.fitBounds(bounds, {
              padding: [45, 45],
              maxZoom: 12,
            });
          }
        } else {
          map.flyTo(countryConfig.defaultCenter, countryConfig.defaultZoom, {
            duration: 1.0,
          });
        }
      } catch (err) {
        console.error("Erreur de mise à jour des marqueurs :", err);
      }
    }

    updateMarkers();
  }, [centers, selectedCenter, userCoords, countryConfig, isMapReady, onSelectCenter]);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[420px] rounded-3xl border border-hemora-border bg-stone-50 p-8 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="font-semibold text-hemora-text text-base">
          Impossible d’afficher la carte pour le moment.
        </p>
        <p className="text-sm text-hemora-muted max-w-sm">
          Vous pouvez toujours consulter et filtrer les centres dans la liste ci-contre.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[460px] lg:min-h-[580px] rounded-3xl border border-hemora-border overflow-hidden relative shadow-xs">
      <div ref={mapContainerRef} className="w-full h-full min-h-[460px] lg:min-h-[580px] z-0" />
    </div>
  );
}
