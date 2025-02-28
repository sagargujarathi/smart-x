import { UserRole } from "@/types/auth";

interface TrendParams {
  timeRange: string;
  utilityType: string;
  userRole?: UserRole;
}

interface ExportParams extends TrendParams {
  format: "csv" | "pdf";
}

export const trendService = {
  async getTrends({ timeRange, utilityType, userRole }: TrendParams) {
    const response = await fetch(
      `/api/trends?timeRange=${timeRange}&utilityType=${utilityType}`
    );
    if (!response.ok) throw new Error("Failed to fetch trends");
    return response.json();
  },

  async exportTrends({
    timeRange,
    utilityType,
    format,
    userRole,
  }: ExportParams) {
    const response = await fetch("/api/trends", {
      method: "POST",
      body: JSON.stringify({ timeRange, utilityType, format }),
    });
    if (!response.ok) throw new Error("Failed to export trends");
    return response.json();
  },

  async updateAnomaly(anomalyId: string, action: string) {
    const response = await fetch("/api/anomalies", {
      method: "PUT",
      body: JSON.stringify({ id: anomalyId, action }),
    });
    if (!response.ok) throw new Error("Failed to update anomaly");
    return response.json();
  },
};
