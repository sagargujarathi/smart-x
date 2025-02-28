import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { FaWater, FaLightbulb, FaTrash, FaChartLine } from "react-icons/fa";

export default function UtilitiesPage() {
  const utilities = [
    {
      id: "water",
      name: "Water Management",
      icon: <FaWater className="h-8 w-8 text-blue-400" />,
      description:
        "Monitor water usage, detect leaks, and optimize distribution",
      stats: "2.5M gallons/day",
      color: "bg-blue-900/20",
      link: "/dashboard/utilities/water",
    },
    {
      id: "electricity",
      name: "Power Grid",
      icon: <FaLightbulb className="h-8 w-8 text-yellow-400" />,
      description:
        "Track electricity consumption and manage smart grid operations",
      stats: "450 MWh/day",
      color: "bg-yellow-900/20",
      link: "/dashboard/utilities/electricity",
    },
    {
      id: "waste",
      name: "Waste Management",
      icon: <FaTrash className="h-8 w-8 text-green-400" />,
      description:
        "Monitor waste collection, recycling rates, and disposal efficiency",
      stats: "120 tons/day",
      color: "bg-green-900/20",
      link: "/dashboard/utilities/waste",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white/90">
              Utilities Management
            </h1>
            <p className="text-zinc-400 mt-2">
              Detailed management and analytics for each utility service
            </p>
          </div>
          <Link
            href="/dashboard/utilities/analytics"
            className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
          >
            <FaChartLine />
            <span>Analytics Overview</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilities.map((utility) => (
            <Link
              key={utility.id}
              href={utility.link}
              className="block bg-zinc-800/60 rounded-lg p-6 hover:bg-zinc-700/60 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className={`p-3 rounded-full ${utility.color} w-fit`}>
                  {utility.icon}
                </div>
                <h3 className="text-lg font-medium text-white mt-4">
                  {utility.name}
                </h3>
                <p className="text-zinc-400 mt-2 text-sm">
                  {utility.description}
                </p>
                <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg">
                  <span className="text-sm text-zinc-500">Current Usage</span>
                  <p className="text-lg text-white font-medium">
                    {utility.stats}
                  </p>
                </div>
                <div className="mt-4 text-sm text-primary-100">
                  View details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
