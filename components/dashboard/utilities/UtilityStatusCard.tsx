import { UtilityData } from "@/types/utility";
import { FaWater, FaLightbulb, FaCloud, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface Props {
  utility: UtilityData;
}

const utilityIcons = {
  WATER: FaWater,
  ELECTRICITY: FaLightbulb,
  WASTE: FaTrash,
  AIRQUALITY: FaCloud,
};

const utilityColors = {
  WATER: "text-blue-400",
  ELECTRICITY: "text-yellow-400",
  WASTE: "text-green-400",
  AIRQUALITY: "text-gray-400",
};

export const UtilityStatusCard = ({ utility }: Props) => {
  const Icon = utilityIcons[utility.type];
  const iconColor = utilityColors[utility.type];

  const percentageChange =
    ((utility.currentUsage - utility.previousUsage) / utility.previousUsage) *
    100;

  return (
    <Link
      href={`/dashboard/utilities/${utility.type.toLowerCase()}`}
      className="block bg-zinc-800/60 rounded-lg p-6 hover:bg-zinc-700/80 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-full bg-zinc-700/50`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            utility.status === "critical"
              ? "bg-red-900/30 text-red-400"
              : utility.status === "warning"
              ? "bg-yellow-900/30 text-yellow-400"
              : "bg-green-900/30 text-green-400"
          }`}
        >
          {utility.status}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-white">{utility.name}</h3>
        <div className="mt-1 text-3xl font-semibold text-white">
          {utility.currentUsage.toLocaleString()} {utility.unit}
        </div>
        <div
          className={`mt-1 text-sm ${
            percentageChange > 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {percentageChange > 0 ? "↑" : "↓"}{" "}
          {Math.abs(percentageChange).toFixed(1)}% vs last period
        </div>
      </div>

      <div className="mt-4 text-sm text-primary-100">View details →</div>
    </Link>
  );
};
