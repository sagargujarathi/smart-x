export type UtilityType = "WATER" | "ELECTRICITY" | "WASTE" | "AIRQUALITY";

export interface UtilityData {
  id: string;
  type: UtilityType;
  name: string;
  currentUsage: number;
  previousUsage: number;
  prediction: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  lastUpdated: string;
}

export interface UtilityAlert {
  id: string;
  type: UtilityType;
  message: string;
  severity: "info" | "warning" | "critical";
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  timestamp: string;
}

export interface UtilityStats {
  currentUsage: number;
  previousUsage: number;
  alerts: UtilityAlert[];
  historical: Array<{
    timestamp: string;
    value: number;
  }>;
}

export interface UtilityAction {
  id: string;
  name: string;
  description: string;
  impact: "low" | "medium" | "high";
  estimatedSavings?: number;
}
