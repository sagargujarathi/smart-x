"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { RoleGuard } from "@/components/RoleGuard";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { TrendChart } from "@/components/dashboard/charts/TrendChart";
import { AnomalyList } from "@/components/dashboard/admin/AnomalyList";
import { ExportDialog } from "@/components/dashboard/admin/ExportDialog";
import { trendService } from "@/services/trendService";
import { Toast } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { USER_ROLE } from "@/constants/enums";
import { useAuthContext } from "@/context/auth-context";

export default function TrendsPage() {
  const { data } = useAuthContext();
  const [timeRange, setTimeRange] = useState("7d");
  const [utilityType, setUtilityType] = useState("all");
  const [trendData, setTrendData] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSuperAdmin = data?.role_type === USER_ROLE.SUPER_ADMIN;
  const isAdmin = data?.role_type === USER_ROLE.ADMIN;

  useEffect(() => {
    fetchTrendData();
  }, [timeRange, utilityType]);

  const fetchTrendData = async () => {
    setLoading(true);
    try {
      const { trends, anomalies } = await trendService.getTrends({
        timeRange,
        utilityType,
        userRole: data?.role_type,
      });
      setTrendData(trends);
      setAnomalies(anomalies);
      setError(null);
    } catch (err) {
      setError("Failed to fetch trend data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      await trendService.exportTrends({
        timeRange,
        utilityType,
        format,
        userRole: data?.role_type,
      });
      Toast.success("Export successful");
    } catch (err) {
      Toast.error("Export failed");
    }
  };

  const handleAnomalyAction = async (anomalyId: string, action: string) => {
    if (!isAdmin && !isSuperAdmin) return;

    try {
      await trendService.updateAnomaly(anomalyId, action);
      await fetchTrendData(); // Refresh data
      Toast.success("Anomaly updated successfully");
    } catch (err) {
      Toast.error("Failed to update anomaly");
    }
  };

  return (
    <RoleGuard allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white/90">Usage Trends</h1>
              <p className="text-zinc-400 mt-1">
                {isSuperAdmin
                  ? "Complete system analytics and trend management"
                  : "Utility usage trends and anomaly detection"}
              </p>
            </div>

            <div className="flex gap-4">
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
                options={[
                  { label: "Last 7 Days", value: "7d" },
                  { label: "Last 30 Days", value: "30d" },
                  { label: "Last 3 Months", value: "3m" },
                  ...(isSuperAdmin
                    ? [{ label: "Last Year", value: "1y" }]
                    : []),
                ]}
              />
              <Select
                value={utilityType}
                onValueChange={setUtilityType}
                options={[
                  { label: "All Utilities", value: "all" },
                  { label: "Electricity", value: "electricity" },
                  { label: "Water", value: "water" },
                  { label: "Gas", value: "gas" },
                ]}
              />
              {isSuperAdmin && (
                <Button
                  onClick={() => setShowExportDialog(true)}
                  variant="outline"
                >
                  Export Data
                </Button>
              )}
            </div>
          </div>

          {error ? (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h2 className="text-lg font-medium mb-4">Usage Predictions</h2>
                {loading ? (
                  <div className="h-64 flex items-center justify-center">
                    Loading trends...
                  </div>
                ) : (
                  <TrendChart
                    data={trendData}
                    type={utilityType}
                    showAdvancedMetrics={isSuperAdmin}
                  />
                )}
              </Card>

              <Card className="p-4">
                <h2 className="text-lg font-medium mb-4">Anomaly Detection</h2>
                <AnomalyList
                  anomalies={anomalies}
                  loading={loading}
                  onAction={handleAnomalyAction}
                  userRole={data?.role_type}
                />
              </Card>
            </div>
          )}
        </div>

        {showExportDialog && (
          <ExportDialog
            onExport={handleExport}
            onClose={() => setShowExportDialog(false)}
          />
        )}
      </DashboardLayout>
    </RoleGuard>
  );
}
