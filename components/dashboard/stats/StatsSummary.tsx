import { UtilityStats, UtilityType } from "@/types/utility";

interface Props {
  stats: UtilityStats;
  type: UtilityType;
}

const utilityUnits = {
  WATER: "kL",
  ELECTRICITY: "MWh",
  WASTE: "tons",
};

export const StatsSummary = ({ stats, type }: Props) => {
  const percentageChange =
    ((stats.currentUsage - stats.previousUsage) / stats.previousUsage) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-zinc-800/60 rounded-lg p-6">
        <h3 className="text-zinc-400">Current Usage</h3>
        <p className="text-3xl font-bold text-white mt-2">
          {stats.currentUsage.toLocaleString()} {utilityUnits[type]}
        </p>
        <div
          className={`mt-2 text-sm ${
            percentageChange > 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {percentageChange > 0 ? "↑" : "↓"}{" "}
          {Math.abs(percentageChange).toFixed(1)}% vs last period
        </div>
      </div>

      <div className="bg-zinc-800/60 rounded-lg p-6">
        <h3 className="text-zinc-400">Alerts</h3>
        <p className="text-3xl font-bold text-white mt-2">
          {stats.alerts.length}
        </p>
        <div className="mt-2 text-sm text-zinc-400">
          Active issues requiring attention
        </div>
      </div>

      <div className="bg-zinc-800/60 rounded-lg p-6">
        <h3 className="text-zinc-400">Efficiency Score</h3>
        <p className="text-3xl font-bold text-white mt-2">
          {Math.max(0, 100 - Math.abs(percentageChange)).toFixed(0)}/100
        </p>
        <div className="w-full bg-zinc-700 rounded-full h-2.5 mt-3">
          <div
            className="bg-primary-100 h-2.5 rounded-full"
            style={{
              width: `${Math.max(0, 100 - Math.abs(percentageChange))}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
