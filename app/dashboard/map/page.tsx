"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UtilityMap } from "@/components/dashboard/map/UtilityMap";
import { utilityService } from "@/services/utilityService";
import { UtilityAlert } from "@/types/utility";
import { useEffect, useState } from "react";
import { HiFilter, HiLocationMarker } from "react-icons/hi";

export default function MapPage() {
  const [alerts, setAlerts] = useState<UtilityAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<UtilityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | UtilityAlert["type"]>(
    "all"
  );
  const [filterSeverity, setFilterSeverity] = useState<
    "all" | UtilityAlert["severity"]
  >("all");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const alertsData = await utilityService.getAlerts();
        setAlerts(alertsData);
        setFilteredAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    let filtered = [...alerts];

    if (filterType !== "all") {
      filtered = filtered.filter((alert) => alert.type === filterType);
    }

    if (filterSeverity !== "all") {
      filtered = filtered.filter((alert) => alert.severity === filterSeverity);
    }

    setFilteredAlerts(filtered);
  }, [filterType, filterSeverity, alerts]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">City Utility Map</h1>
          <p className="text-zinc-400 mt-2">
            Monitor utility alerts and issues across the city
          </p>
        </div>

        <div className="bg-zinc-800/60 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
            <div className="flex items-center">
              <HiLocationMarker className="text-zinc-400 mr-2" />
              <span className="text-white">{filteredAlerts.length} alerts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2 bg-zinc-700 px-3 py-1.5 rounded-md">
                <HiFilter className="text-zinc-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-transparent text-white text-sm focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="WATER">Water</option>
                  <option value="ELECTRICITY">Electricity</option>
                  <option value="WASTE">Waste</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 bg-zinc-700 px-3 py-1.5 rounded-md">
                <HiFilter className="text-zinc-400" />
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value as any)}
                  className="bg-transparent text-white text-sm focus:outline-none"
                >
                  <option value="all">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-white">Loading map data...</div>
            </div>
          ) : (
            <UtilityMap alerts={filteredAlerts} />
          )}
        </div>

        <div className="bg-zinc-800/60 p-4 rounded-lg">
          <h2 className="text-lg font-medium text-white mb-4">Alert Details</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Severity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {alert.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {alert.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          alert.severity === "critical"
                            ? "bg-red-900/30 text-red-400"
                            : alert.severity === "warning"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : "bg-blue-900/30 text-blue-400"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-300">
                      {alert.location?.address || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}

                {filteredAlerts.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-zinc-400"
                    >
                      No alerts match your current filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
