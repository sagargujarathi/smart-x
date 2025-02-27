"use client";

import { useState, useEffect } from "react";
import { UtilityData } from "@/types/utility";
import { utilityService } from "@/services/utilityService";
import { UtilityStatusCard } from "./utilities/UtilityStatusCard";
import { AlertsList } from "./utilities/AlertsList";

export const DashboardOverview = () => {
  const [utilities, setUtilities] = useState<UtilityData[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await utilityService.getUtilities();
        setUtilities(data);
      } catch (error) {
        console.error("Error fetching utilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white/90">
          Smart City Utilities Dashboard
        </h1>
        <p className="text-zinc-400 mt-2">
          Monitor and manage public utilities across the city
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilities.map((utility) => (
          <UtilityStatusCard key={utility.id} utility={utility} />
        ))}
      </div>

      <div className="mt-8">
        <AlertsList alerts={alerts} onAcknowledge={handleAcknowledgeAlert} />
      </div>
    </div>
  );
};
