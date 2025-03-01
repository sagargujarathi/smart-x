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
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
  const [predictions, setPredictions] = useState(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  const [isPredictionLoading, setIsPredictionLoading] = useState(true);

  if (!["WATER", "ELECTRICITY", "WASTE", "AIRQUALITY"].includes(type)) {
    notFound();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsPredictionLoading(true);
        setPredictionError(null);

        const [statsData, predictionsData] = await Promise.all([
          utilityService.getUtilityStats(type),
          utilityService.getPredictions(type).catch((error) => {
            console.error("Prediction fetch error:", error);
            setPredictionError(
              error instanceof Error
                ? error.message
                : "Failed to fetch predictions"
            );
            return null;
          }),
        ]);

        setStats(statsData);
        setPredictions(predictionsData);
      } catch (error) {
        console.error(`Error fetching data:`, error);
      } finally {
        setLoading(false);
        setIsPredictionLoading(false);
      }
    };

    fetchData();
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
      AIRQUALITY: {
        current: 80,
        target: 95,
        unit: "AQI",
        solutions: [
          "Improve ventilation systems",
          "Install air purifiers",
          "Regular air quality monitoring",
        ],
      },
    };

    return efficiencyMap[type];
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
          {isPredictionLoading ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <LoadingSpinner />
              <p className="text-white/60">Loading data...</p>
            </div>
          ) : predictionError ? (
            <div className="text-red-400 p-4 space-y-2">
              <p>Error loading data: {predictionError}</p>
            </div>
          ) : !predictions ? (
            <div className="text-white/60 p-4">No data available</div>
          ) : (
            <UtilityChart
              stats={stats}
              type={type}
              timeFrame={timeFrame}
              weekly={predictions.daily}
            />
          )}
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
          {isPredictionLoading ? (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
              <LoadingSpinner />
              <p className="text-white/60">Loading prediction data...</p>
            </div>
          ) : predictionError ? (
            <div className="text-red-400 p-4 space-y-2">
              <p>Error loading predictions: {predictionError}</p>
              <button
                onClick={() => {
                  setIsPredictionLoading(true);
                  setPredictionError(null);
                  utilityService
                    .getPredictions(type)
                    .then(setPredictions)
                    .catch((error) => setPredictionError(error.message))
                    .finally(() => setIsPredictionLoading(false));
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-md text-sm hover:bg-red-500/30"
              >
                Retry
              </button>
            </div>
          ) : !predictions ? (
            <div className="text-white/60 p-4">
              No prediction data available
            </div>
          ) : (
            <UtilityPredictions type={type} predictions={predictions} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
