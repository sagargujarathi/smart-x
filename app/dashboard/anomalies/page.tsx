"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { RoleGuard } from "@/components/RoleGuard";
import { useState, useEffect } from "react";
import { AnomalyList } from "@/components/dashboard/admin/AnomalyList";
import { USER_ROLE } from "@/constants/enums";

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const response = await fetch("/api/anomalies");
        const data = await response.json();
        setAnomalies(data);
      } catch (error) {
        console.error("Error fetching anomalies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnomalies();
  }, []);

  const handleAction = async (id: string, action: string) => {
    try {
      await fetch(`/api/anomalies`, {
        method: "PUT",
        body: JSON.stringify({ id, action }),
      });
      // Refresh anomalies
      const response = await fetch("/api/anomalies");
      const data = await response.json();
      setAnomalies(data);
    } catch (error) {
      console.error("Error updating anomaly:", error);
    }
  };

  return (
    <RoleGuard allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Anomaly Detection</h1>
          <AnomalyList
            anomalies={anomalies}
            loading={loading}
            onAction={handleAction}
          />
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
