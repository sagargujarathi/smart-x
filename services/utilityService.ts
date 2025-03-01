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
    }
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
    }
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
    }
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
    }
  ]
};

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

  async getRecommendedActions(type:string): Promise<UtilityAction[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockActions[type]), 300);
    });
  },

  getPredictions: async (type: string, period: string = "month", retries = 3) => {
    const typeMap: Record<string, string> = {
      WATER: "water",
      ELECTRICITY: "electricity",
      WASTE: "waste",
      AIRQUALITY: "air-quality",
      TRAFFIC: "traffic"
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
