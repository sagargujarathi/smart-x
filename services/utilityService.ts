import {
  UtilityData,
  UtilityAlert,
  UtilityType,
  UtilityStats,
  UtilityAction,
} from "@/types/utility";

// Mock data - in a real application, this would be fetched from an API
const mockUtilities: UtilityData[] = [
  {
    id: "water-main",
    type: "WATER",
    name: "City Water Supply",
    currentUsage: 2830,
    previousUsage: 2650,
    prediction: 2900,
    unit: "kL",
    status: "normal",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "electricity-grid",
    type: "ELECTRICITY",
    name: "Power Grid",
    currentUsage: 4250,
    previousUsage: 3980,
    prediction: 4300,
    unit: "MWh",
    status: "warning",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "waste-management",
    type: "WASTE",
    name: "Waste Management",
    currentUsage: 1870,
    previousUsage: 1920,
    prediction: 1850,
    unit: "tons",
    status: "normal",
    lastUpdated: new Date().toISOString(),
  },
];

const mockAlerts: UtilityAlert[] = [
  {
    id: "alert-1",
    utilityId: "electricity-grid",
    type: "ELECTRICITY",
    severity: "warning",
    message: "Unusual power consumption in Downtown district",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "Downtown District",
    },
  },
  {
    id: "alert-2",
    utilityId: "water-main",
    type: "WATER",
    severity: "critical",
    message: "Potential leak detected in Northwest pipeline",
    timestamp: new Date().toISOString(),
    acknowledged: true,
    location: {
      lat: 40.7328,
      lng: -74.026,
      address: "Northwest District, Pipeline Junction 23A",
    },
  },
];

const mockActions: UtilityAction[] = [
  {
    id: "action-1",
    name: "Reduce Peak Hour Usage",
    description: "Implement smart load balancing during peak hours",
    impact: "high",
    estimatedSavings: 15,
  },
  {
    id: "action-2",
    name: "Optimize Water Pressure",
    description: "Adjust water pressure in low-demand areas",
    impact: "medium",
    estimatedSavings: 8,
  },
  {
    id: "action-3",
    name: "Reroute Waste Collection",
    description: "Optimize waste collection routes based on fill level",
    impact: "medium",
    estimatedSavings: 12,
  },
];

const MOCK_ALERTS = [
  {
    id: "1",
    type: "WATER",
    message: "Water pressure drop detected",
    severity: "warning",
    location: {
      address: "123 Main St",
      lat: 40.7128,
      lng: -74.006,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    type: "ELECTRICITY",
    message: "Power grid overload",
    severity: "critical",
    location: {
      address: "456 Park Ave",
      lat: 40.7589,
      lng: -73.9851,
    },
    timestamp: new Date().toISOString(),
  },
  // Add more mock alerts as needed
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const utilityService = {
  getUtilities: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUtilities;
  },

  getAlerts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_ALERTS;
  },

  async getUtilityStats(type: UtilityType): Promise<UtilityStats> {
    const utility = mockUtilities.find((u) => u.type === type);
    const alerts = mockAlerts.filter((a) => a.type === type);

    // Generate mock usage data
    const dailyUsage = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 500) + 2000
    );
    const weeklyUsage = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 1000) + 8000
    );
    const monthlyUsage = Array.from(
      { length: 12 },
      () => Math.floor(Math.random() * 3000) + 25000
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currentUsage: utility?.currentUsage || 0,
          previousUsage: utility?.previousUsage || 0,
          prediction: utility?.prediction || 0,
          anomalyCount: alerts.length,
          alerts,
          dailyUsage,
          weeklyUsage,
          monthlyUsage,
        });
      }, 500);
    });
  },

  async getAlerts(): Promise<UtilityAlert[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAlerts), 300);
    });
  },

  async acknowledgeAlert(alertId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 200);
    });
  },

  async getRecommendedActions(): Promise<UtilityAction[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActions), 300);
    });
  },

  getPredictions: async (type: string, period: string = "month", retries = 3) => {
    const typeMap: Record<string, string> = {
      WATER: "water",
      ELECTRICITY: "electricity",
      WASTE: "waste",
      AIR: "air-quality",
      TRAFFIC: "traffic"
    };

    const mappedType = typeMap[type];
    if (!mappedType) throw new Error("Invalid utility type");

    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(
          `http://localhost:3200/predict/${mappedType}/${period}`,
          {
            method: "POST",
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to fetch predictions: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await wait(1000 * (i + 1)); // Exponential backoff
      }
    }
  }
};
