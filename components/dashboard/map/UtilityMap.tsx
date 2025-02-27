"use client";

import { UtilityType, UtilityAlert } from "@/types/utility";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface UtilityMapProps {
  selectedUtility: UtilityType;
  onSelectUtility: (type: UtilityType) => void;
  alerts: UtilityAlert[];
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const utilityLocations = {
  WATER: [
    { lng: 72.8777, lat: 19.076, name: "Water Treatment Plant A" },
    { lng: 72.8677, lat: 19.066, name: "Reservoir B" },
    { lng: 72.8577, lat: 19.056, name: "Pump Station C" },
  ],
  ELECTRICITY: [
    { lng: 72.8977, lat: 19.086, name: "Power Station Alpha" },
    { lng: 72.8877, lat: 19.096, name: "Substation Beta" },
    { lng: 72.8777, lat: 19.106, name: "Grid Center Gamma" },
  ],
  WASTE: [
    { lng: 72.8477, lat: 19.046, name: "Waste Processing Unit 1" },
    { lng: 72.8377, lat: 19.036, name: "Recycling Center 2" },
    { lng: 72.8277, lat: 19.026, name: "Collection Point 3" },
  ],
};

const utilityColors = {
  WATER: "#4b45ff",
  ELECTRICITY: "#ffd700",
  WASTE: "#ff4545",
};

export const UtilityMap = ({
  selectedUtility,
  onSelectUtility,
  alerts,
}: UtilityMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [72.8777, 19.076], // Mumbai coordinates
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add new markers
    utilityLocations[selectedUtility].forEach((location) => {
      const marker = new mapboxgl.Marker({
        color: utilityColors[selectedUtility],
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="font-medium">${location.name}</h3>`
          )
        )
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [selectedUtility]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white/90">
          Utility Locations
        </h2>
        <div className="flex space-x-2">
          {(Object.keys(utilityColors) as UtilityType[]).map((type) => (
            <button
              key={type}
              onClick={() => onSelectUtility(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedUtility === type
                    ? "bg-primary-100 text-white"
                    : "bg-secondary-100 hover:bg-secondary-200 text-zinc-300"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={mapContainer}
        className="h-[400px] w-full rounded-xl bg-secondary-100"
      />
      <div className="relative h-96 bg-zinc-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 p-4">
          <div className="grid grid-cols-3 gap-4 h-full">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg ${
                  alert.severity === "critical"
                    ? "bg-red-900/30"
                    : alert.severity === "warning"
                    ? "bg-yellow-900/30"
                    : "bg-blue-900/30"
                }`}
              >
                <div className="text-sm font-medium text-white">
                  {alert.type}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {alert.location.address}
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Lat: {alert.location.lat.toFixed(4)}, Lng:{" "}
                  {alert.location.lng.toFixed(4)}
                </div>
                <div className="text-sm mt-2 text-white/80">
                  {alert.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-zinc-800 px-3 py-1.5 rounded text-xs text-zinc-400">
          Mock Map View (Replace with actual map implementation)
        </div>
      </div>
    </div>
  );
};
