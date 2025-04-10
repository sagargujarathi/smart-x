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
  {
    id: "air-quality",
    type: "AIRQUALITY",
    name: "Air Quality Control",
    currentUsage: 57.41,
    previousUsage: 52.59,
    prediction: 62,
    unit: "aqi",
    status: "warning",
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

const mockActions: Record<UtilityType, UtilityAction[]> = {
  ELECTRICITY: [
    {
      id: "elec-1",
      name: "Smart Grid Implementation",
      description: "Deploy smart meters for real-time consumption monitoring",
      impact: "high",
      estimatedSavings: 20,
    },
    {
      id: "elec-2",
      name: "Peak Load Shifting",
      description: "Shift non-critical operations to off-peak hours",
      impact: "medium",
      estimatedSavings: 15,
    },
  ],
  WATER: [
    {
      id: "water-1",
      name: "Leak Detection System",
      description: "Install smart sensors for early leak detection",
      impact: "high",
      estimatedSavings: 25,
    },
    {
      id: "water-2",
      name: "Pressure Optimization",
      description: "Implement dynamic pressure management",
      impact: "medium",
      estimatedSavings: 10,
    },
  ],
  AIRQUALITY: [
    {
      id: "air-1",
      name: "Ventilation Enhancement",
      description: "Upgrade air filtration systems",
      impact: "high",
      estimatedSavings: 30,
    },
    {
      id: "air-2",
      name: "Pollution Monitoring",
      description: "Install real-time air quality sensors",
      impact: "medium",
      estimatedSavings: 12,
    },
  ],
  WASTE: [
    {
      id: "waste-1",
      name: "Smart Waste Sorting",
      description: "Implement automated waste segregation",
      impact: "high",
      estimatedSavings: 18,
    },
    {
      id: "waste-2",
      name: "Route Optimization",
      description: "AI-based collection route planning",
      impact: "medium",
      estimatedSavings: 15,
    },
  ],
};

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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  async getRecommendedActions(type: string): Promise<UtilityAction[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActions[type]), 300);
    });
  },

  getPredictions: async (
    type: string,
    period: string = "month",
    retries = 3
  ) => {
    const typeMap: Record<string, string> = {
      WATER: "water",
      ELECTRICITY: "electricity",
      WASTE: "waste",
      AIRQUALITY: "air-quality",
      TRAFFIC: "traffic",
    };

    const mappedType = typeMap[type];
    if (!mappedType) throw new Error("Invalid utility type");

    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(
          `http://172.16.15.156:3200/predict/${mappedType}/${period}`,
          {
            method: "POST",
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch predictions: ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await wait(1000 * (i + 1)); // Exponential backoff
      }
    }
  },
};
