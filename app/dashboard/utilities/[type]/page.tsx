"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsSummary } from "@/components/dashboard/stats/StatsSummary";
import { UtilityType, UtilityStats } from "@/types/utility";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { utilityService } from "@/services/utilityService";
import { UtilityChart } from "@/components/dashboard/utilities/UtilityChart";
import { AlertsList } from "@/components/dashboard/utilities/AlertsList";
import { use } from "react";

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
      </div>
    </DashboardLayout>
  );
}
