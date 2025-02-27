import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { FaWater, FaLightbulb, FaTrash } from "react-icons/fa";

export default function UtilitiesPage() {
  const utilities = [
    {
      id: "water",
      name: "Water Management",
      icon: <FaWater className="h-8 w-8 text-blue-400" />,
      description:
        "Monitor water usage, detect leaks, and optimize distribution",
      color: "bg-blue-900/20",
      link: "/dashboard/utilities/water",
    },
    {
      id: "electricity",
      name: "Power Grid",
      icon: <FaLightbulb className="h-8 w-8 text-yellow-400" />,
      description:
        "Track electricity consumption and manage smart grid operations",
      color: "bg-yellow-900/20",
      link: "/dashboard/utilities/electricity",
    },
    {
      id: "waste",
      name: "Waste Management",
      icon: <FaTrash className="h-8 w-8 text-green-400" />,
      description:
        "Monitor waste collection, recycling rates, and disposal efficiency",
      color: "bg-green-900/20",
      link: "/dashboard/utilities/waste",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">Public Utilities</h1>
          <p className="text-zinc-400 mt-2">
            Monitor and manage all city utilities from one central dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {utilities.map((utility) => (
            <Link
              key={utility.id}
              href={utility.link}
              className="block bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700/80 transition-colors"
            >
              <div className="flex flex-col h-full">
                <div className={`p-3 rounded-full ${utility.color} w-fit`}>
                  {utility.icon}
                </div>
                <h3 className="text-lg font-medium text-white mt-4">
                  {utility.name}
                </h3>
                <p className="text-zinc-400 mt-2 flex-grow">
                  {utility.description}
                </p>
                <div className="mt-6 text-sm text-primary-100">
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
