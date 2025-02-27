"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { utilityService } from "@/services/utilityService";
import { UtilityStats, UtilityType } from "@/types/utility";
import { UtilityChart } from "@/components/dashboard/utilities/UtilityChart";
import { UtilityActions } from "@/components/dashboard/actions/UtilityActions";

export default function UtilityAnalyticsPage() {
  const [utilityType, setUtilityType] = useState<UtilityType>("ELECTRICITY");
  const [stats, setStats] = useState<UtilityStats | null>(null);
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await utilityService.getUtilityStats(utilityType);
        setStats(data);
      } catch (error) {
        console.error(`Error fetching ${utilityType} stats:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [utilityType]);

  const getUtilityComparisonData = () => {
    switch (utilityType) {
      case "WATER":
        return {
          current: stats?.currentUsage || 0,
          previous: stats?.previousUsage || 0,
          change: stats
            ? ((stats.currentUsage - stats.previousUsage) /
                stats.previousUsage) *
              100
            : 0,
          target: 2500,
          unit: "kL",
        };
      case "ELECTRICITY":
        return {
          current: stats?.currentUsage || 0,
          previous: stats?.previousUsage || 0,
          change: stats
            ? ((stats.currentUsage - stats.previousUsage) /
                stats.previousUsage) *
              100
            : 0,
          target: 4000,
          unit: "MWh",
        };
      case "WASTE":
        return {
          current: stats?.currentUsage || 0,
          previous: stats?.previousUsage || 0,
          change: stats
            ? ((stats.currentUsage - stats.previousUsage) /
                stats.previousUsage) *
              100
            : 0,
          target: 1800,
          unit: "tons",
        };
    }
  };

  const comparisonData = getUtilityComparisonData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">
            Utility Analytics
          </h1>
          <p className="text-zinc-400 mt-2">
            Detailed analytics and optimization recommendations for city
            utilities
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {["ELECTRICITY", "WATER", "WASTE"].map((type) => (
            <button
              key={type}
              onClick={() => setUtilityType(type as UtilityType)}
              className={`px-4 py-2 rounded-md ${
                utilityType === type
                  ? "bg-primary-100 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-white">
              Loading {utilityType.toLowerCase()} analytics...
            </div>
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-zinc-800/60 rounded-lg p-6">
                <h3 className="text-zinc-400 text-sm">Current Usage</h3>
                <p className="text-3xl font-bold text-white mt-2">
                  {comparisonData.current.toLocaleString()}{" "}
                  {comparisonData.unit}
                </p>
                <div
                  className={`mt-2 text-sm ${
                    comparisonData.change >= 0
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {comparisonData.change >= 0 ? "+" : ""}
                  {comparisonData.change.toFixed(1)}% vs last period
                </div>
              </div>

              <div className="bg-zinc-800/60 rounded-lg p-6">
                <h3 className="text-zinc-400 text-sm">Target</h3>
                <p className="text-3xl font-bold text-white mt-2">
                  {comparisonData.target.toLocaleString()} {comparisonData.unit}
                </p>
                <div
                  className={`mt-2 text-sm ${
                    comparisonData.current <= comparisonData.target
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {comparisonData.current <= comparisonData.target
                    ? "On target"
                    : "Above target"}
                </div>
              </div>

              <div className="bg-zinc-800/60 rounded-lg p-6">
                <h3 className="text-zinc-400 text-sm">Efficiency Score</h3>
                <p className="text-3xl font-bold text-white mt-2">
                  {Math.max(
                    50,
                    100 -
                      Math.abs(
                        ((comparisonData.current - comparisonData.target) /
                          comparisonData.target) *
                          100
                      )
                  ).toFixed(0)}
                  /100
                </p>
                <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-3">
                  <div
                    className="bg-primary-100 h-2.5 rounded-full"
                    style={{
                      width: `${Math.max(
                        50,
                        100 -
                          Math.abs(
                            ((comparisonData.current - comparisonData.target) /
                              comparisonData.target) *
                              100
                          )
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/60 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-white">
                  Historical Data
                </h2>
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

              <UtilityChart
                stats={stats}
                type={utilityType}
                timeFrame={timeFrame}
              />
            </div>

            <div className="bg-zinc-800/60 p-4 rounded-lg">
              <UtilityActions type={utilityType} />
            </div>
          </>
        ) : (
          <div className="bg-zinc-800/60 rounded-lg p-6 text-center">
            <p className="text-zinc-400">Failed to load utility data</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
