import { UtilityStats, UtilityType } from "@/types/utility";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

interface UtilityCardProps {
  type: UtilityType;
  stats: UtilityStats;
}

export const UtilityCard = ({ type, stats }: UtilityCardProps) => {
  const percentageChange =
    ((stats.currentUsage - stats.previousUsage) / stats.previousUsage) * 100;
  const isIncrease = percentageChange > 0;

  return (
    <div className="p-6 rounded-xl bg-secondary-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-white/80">{type}</h3>
          <p className="mt-2 text-3xl font-semibold">{stats.currentUsage}</p>
        </div>
        <span
          className={`flex items-center ${
            isIncrease ? "text-red-500" : "text-green-500"
          }`}
        >
          {isIncrease ? <HiArrowSmUp /> : <HiArrowSmDown />}
          {Math.abs(percentageChange).toFixed(1)}%
        </span>
      </div>
      {stats.anomalyCount > 0 && (
        <div className="mt-4 p-2 bg-red-500/10 rounded-lg">
          <p className="text-sm text-red-500">
            {stats.anomalyCount} anomalies detected
          </p>
        </div>
      )}
    </div>
  );
};
