"use client";

import { UtilityAlert } from "@/types/utility";
import { useState } from "react";
import { HiBell, HiCheck } from "react-icons/hi";
import { utilityService } from "@/services/utilityService";

interface Props {
  alerts: UtilityAlert[];
  onAcknowledge?: (alertId: string) => void;
}

export const AlertsList = ({ alerts, onAcknowledge }: Props) => {
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  const handleAcknowledge = async (alertId: string) => {
    const success = await utilityService.acknowledgeAlert(alertId);
    if (success) {
      setAcknowledgedAlerts((prev) => [...prev, alertId]);
      if (onAcknowledge) onAcknowledge(alertId);
    }
  };

  const isAcknowledged = (alert: UtilityAlert) => {
    return acknowledgedAlerts.includes(alert.id) || alert.acknowledged;
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-400">
        No active alerts at this time
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-white">Active Alerts</h2>
        <span className="px-2 py-1 text-xs bg-zinc-700 rounded-full text-zinc-300">
          {alerts.length} alerts
        </span>
      </div>

      <div className="space-y-3">
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
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <HiBell className="h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-white font-medium">{alert.message}</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {alert.location.address} •{" "}
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              {isAcknowledged(alert) ? (
                <div className="flex items-center text-green-500">
                  <HiCheck className="h-5 w-5 mr-1" />
                  <span className="text-sm">Acknowledged</span>
                </div>
              ) : (
                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className="px-3 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300"
                >
                  Acknowledge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
