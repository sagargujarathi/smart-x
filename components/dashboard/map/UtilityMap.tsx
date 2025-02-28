"use client";

import { UtilityType, UtilityAlert } from "@/types/utility";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLightningBolt,
  HiOutlineTrash,
} from "react-icons/hi";
import "leaflet/dist/leaflet.css";
import { createElement, useRef } from "react";

interface UtilityMapProps {
  selectedUtility: UtilityType;
  onSelectUtility: (type: UtilityType) => void;
  alerts: UtilityAlert[];
}

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

const utilityThemes = {
  WATER: {
    color: "#4b45ff",
    gradient: "from-blue-500/20 to-blue-500/5",
    icon: HiOutlineOfficeBuilding,
    label: "Water Systems",
  },
  ELECTRICITY: {
    color: "#ffd700",
    gradient: "from-yellow-500/20 to-yellow-500/5",
    icon: HiOutlineLightningBolt,
    label: "Power Grid",
  },
  WASTE: {
    color: "#ff4545",
    gradient: "from-red-500/20 to-red-500/5",
    icon: HiOutlineTrash,
    label: "Waste Management",
  },
};

export const UtilityMap = ({
  selectedUtility,
  onSelectUtility,
  alerts,
}: UtilityMapProps) => {
  const mapRef = useRef(null);

  const handleCardClick = (lat: number, lng: number) => {
    mapRef.current?.flyTo([lat, lng], 15, {
      duration: 1.5,
      animate: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Utility Selector */}
      <div className="bg-zinc-800/40 backdrop-blur-sm p-3 rounded-2xl border border-zinc-700/30">
        <div className="flex gap-3">
          {(Object.keys(utilityThemes) as UtilityType[]).map((type) => {
            const theme = utilityThemes[type];
            return (
              <button
                key={type}
                onClick={() => onSelectUtility(type)}
                className={`flex-1 flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200
                  ${
                    selectedUtility === type
                      ? `bg-gradient-to-br ${theme.gradient} border-2 border-${theme.color}/30 shadow-lg`
                      : "bg-zinc-700/30 hover:bg-zinc-700/50 border-2 border-transparent"
                  }`}
              >
                <div
                  className={`p-2 rounded-lg bg-${
                    type === selectedUtility ? theme.color : "zinc-600"
                  }/20`}
                >
                  <theme.icon
                    className={`h-6 w-6 ${
                      selectedUtility === type
                        ? `text-${theme.color}`
                        : "text-zinc-400"
                    }`}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">{theme.label}</div>
                  <div className="text-xs text-zinc-400">
                    {utilityLocations[type].length} Locations
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced Map Container */}
      <div className="rounded-2xl overflow-hidden shadow-2xl bg-zinc-800/40 backdrop-blur-sm p-1.5 border border-zinc-700/30">
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
          <MapContainer
            ref={mapRef}
            center={[19.076, 72.8777]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            className="z-10"
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles-dark"
            />
            {utilityLocations[selectedUtility]?.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  <div className="font-medium">{location.name}</div>
                </Popup>
              </Marker>
            ))}

            {alerts?.map((alert) => (
              <Marker
                key={alert.id}
                position={[alert.location.lat, alert.location.lng]}
                icon={L.divIcon({
                  className: "bg-transparent",
                  html: `<div class="p-2 rounded-full ${
                    alert.severity === "critical"
                      ? "bg-red-500"
                      : alert.severity === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }"></div>`,
                })}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">{alert.type}</h3>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {alert.location.address}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlay */}
          <div className="absolute top-4 right-4 z-20 bg-zinc-900/90 backdrop-blur-sm p-4 rounded-lg border border-zinc-700/30">
            <div className="space-y-2">
              <div className="text-sm font-medium text-zinc-400">Legend</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-zinc-300">Critical Alert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-zinc-300">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-zinc-300">Information</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redesigned Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 alerts-grid">
        {alerts?.map((alert) => (
          <div
            key={alert.id}
            onClick={() =>
              handleCardClick(alert.location.lat, alert.location.lng)
            }
            className={`group p-5 rounded-xl transition-all duration-200 hover:scale-102 cursor-pointer
              backdrop-blur-sm border ${
                alert.severity === "critical"
                  ? "bg-red-900/10 hover:bg-red-900/20 border-red-500/20"
                  : alert.severity === "warning"
                  ? "bg-yellow-900/10 hover:bg-yellow-900/20 border-yellow-500/20"
                  : "bg-blue-900/10 hover:bg-blue-900/20 border-blue-500/20"
              }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.severity === "critical"
                        ? "bg-red-500/20"
                        : alert.severity === "warning"
                        ? "bg-yellow-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    {createElement(utilityThemes[alert.type].icon, {
                      className: `h-5 w-5 ${
                        alert.severity === "critical"
                          ? "text-red-400"
                          : alert.severity === "warning"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }`,
                    })}
                  </div>
                  <span className="font-medium text-white">{alert.type}</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    alert.severity === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : alert.severity === "warning"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <p className="text-sm text-white/80 line-clamp-2">
                  {alert.message}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{alert.location.address}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>ID: {alert.id.slice(0, 8)}</span>
                <span className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
