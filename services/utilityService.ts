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
    message: "High voltage fluctuation detected",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    location: {
      lat: 17.385,
      lng: 78.4867,
      address: "Hitech City, Hyderabad",
    },
  },
  {
    id: "alert-2",
    utilityId: "water-main",
    type: "WATER",
    severity: "critical",
    message: "Low water pressure in main pipeline",
    timestamp: new Date().toISOString(),
    acknowledged: true,
    location: {
      lat: 17.4156,
      lng: 78.4347,
      address: "Kukatpally Housing Board, Hyderabad",
    },
  },
  {
    id: "alert-3",
    utilityId: "waste-management",
    type: "WASTE",
    severity: "warning",
    message: "Waste container capacity exceeding threshold",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    location: {
      lat: 17.3616,
      lng: 78.4747,
      address: "Jubilee Hills, Hyderabad",
    },
  },
  {
    id: "alert-4",
    utilityId: "water-main",
    type: "WATER",
    severity: "critical",
    message: "Water contamination detected",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    location: {
      lat: 18.0529,
      lng: 79.5501,
      address: "Warangal Municipal Corporation",
    },
  },
  {
    id: "alert-5",
    utilityId: "electricity-grid",
    type: "ELECTRICITY",
    severity: "warning",
    message: "Transformer overload",
    timestamp: new Date().toISOString(),
    acknowledged: false,
    location: {
      lat: 17.4474,
      lng: 78.3762,
      address: "Gachibowli, Hyderabad",
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
    message: "Water quality below standard",
    severity: "warning",
    location: {
      address: "Secunderabad Railway Station Area",
      lat: 17.4344,
      lng: 78.5013,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    type: "ELECTRICITY",
    message: "Substation overload detected",
    severity: "critical",
    location: {
      address: "Madhapur IT Park",
      lat: 17.4486,
      lng: 78.3908,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    type: "WASTE",
    message: "Garbage collection delay",
    severity: "warning",
    location: {
      address: "Nizampet, Hyderabad",
      lat: 17.5197,
      lng: 78.387,
    },
    timestamp: new Date().toISOString(),
  },
  {
    id: "4",
    type: "ELECTRICITY",
    message: "Power grid maintenance required",
    severity: "warning",
    location: {
      address: "Kompally, Hyderabad",
      lat: 17.5434,
      lng: 78.4849,
    },
    timestamp: new Date().toISOString(),
  },
];

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
};
