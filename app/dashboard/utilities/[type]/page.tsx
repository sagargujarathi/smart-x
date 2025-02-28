"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StatsSummary } from "@/components/dashboard/stats/StatsSummary";
import { UtilityType, UtilityStats } from "@/types/utility";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { utilityService } from "@/services/utilityService";
import { UtilityChart } from "@/components/dashboard/utilities/UtilityChart";
import { AlertsList } from "@/components/dashboard/utilities/AlertsList";
import { use } from "react";
import { EfficiencyMetrics } from "@/components/dashboard/utilities/EfficiencyMetrics";
import { SolutionsList } from "@/components/dashboard/utilities/SolutionsList";
import { UtilityPredictions } from "@/components/dashboard/predictions/UtilityPredictions";

interface Props {
  params: Promise<{ type: string }>;
}

export default function UtilityDetailsPage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type.toUpperCase() as UtilityType;
  const [stats, setStats] = useState<UtilityStats | null>(null);
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [loading, setLoading] = useState(true);

  if (!["WATER", "ELECTRICITY", "WASTE"].includes(type)) {
    notFound();
  }

  useEffect(() => {
    const fetchUtilityStats = async () => {
      try {
        const data = await utilityService.getUtilityStats(type);
        setStats(data);
      } catch (error) {
        console.error(`Error fetching ${type} stats:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilityStats();
  }, [type]);

  const getEfficiencyData = () => {
    const efficiencyMap = {
      WATER: {
        current: 85,
        target: 95,
        unit: "liters/person/day",
        solutions: [
          "Install smart meters",
          "Fix leaking infrastructure",
          "Implement pressure management",
        ],
      },
      ELECTRICITY: {
        current: 92,
        target: 98,
        unit: "kWh efficiency",
        solutions: [
          "Smart grid optimization",
          "Peak load management",
          "Renewable integration",
        ],
      },
      WASTE: {
        current: 75,
        target: 90,
        unit: "recycling rate",
        solutions: [
          "Improve sorting systems",
          "Expand recycling programs",
          "Community education",
        ],
      },
    };

    return efficiencyMap[type];
  };

  const getPredictionData = () => {
    // Simulate prediction data - in production this would come from your API
    const dates = Array.from(
      { length: 30 },
      (_, i) =>
        new Date(Date.now() + i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    );

    const baseValue =
      type === "WATER" ? 2500 : type === "ELECTRICITY" ? 4000 : 1800;
    const variation = baseValue * 0.2;

    return {
      dates,
      actual: dates
        .slice(0, 15)
        .map(() => baseValue + (Math.random() - 0.5) * variation),
      predicted: dates.map(() => baseValue + (Math.random() - 0.5) * variation),
      upperBound: dates.map(() => baseValue + variation),
      lowerBound: dates.map(() => baseValue - variation),
      unit: type === "WATER" ? "kL" : type === "ELECTRICITY" ? "MWh" : "tons",
    };
  };

  if (loading || !stats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading {type.toLowerCase()} data...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-white/90">
          {type} Management Dashboard
        </h1>

        <StatsSummary stats={stats} type={type} />

        <div className="bg-zinc-800/60 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-white">Usage History</h2>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeFrame === "daily"
                    ? "bg-primary-100 text-white"
                    : "bg-zinc-700 text-zinc-300"
                }`}
                onClick={() => setTimeFrame("daily")}
              >
                Daily
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeFrame === "weekly"
                    ? "bg-primary-100 text-white"
                    : "bg-zinc-700 text-zinc-300"
                }`}
                onClick={() => setTimeFrame("weekly")}
              >
                Weekly
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md ${
                  timeFrame === "monthly"
                    ? "bg-primary-100 text-white"
                    : "bg-zinc-700 text-zinc-300"
                }`}
                onClick={() => setTimeFrame("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <UtilityChart stats={stats} type={type} timeFrame={timeFrame} />
        </div>

        <div className="bg-zinc-800/60 p-4 rounded-lg">
          <AlertsList alerts={stats.alerts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-800/60 p-6 rounded-lg">
            <EfficiencyMetrics type={type} data={getEfficiencyData()} />
          </div>
          <div className="bg-zinc-800/60 p-6 rounded-lg">
            <SolutionsList
              solutions={getEfficiencyData().solutions}
              type={type}
            />
          </div>
        </div>

        <div className="bg-zinc-800/60 p-6 rounded-lg">
          <UtilityPredictions type={type} predictions={getPredictionData()} />
        </div>
      </div>
    </DashboardLayout>
  );
}
