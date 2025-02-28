"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaToolbox,
  FaLightbulb,
  FaNewspaper,
  FaHandHoldingUsd,
  FaBell,
  FaChartLine,
  FaCog,
  FaQuestionCircle,
  FaUserCircle,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

interface DashboardSidebarProps {
  onClose?: () => void;
}

export const DashboardSidebar = ({ onClose }: DashboardSidebarProps) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navigationGroups = [
    {
      label: "Main",
      items: [
        {
          name: "Overview",
          href: "/dashboard",
          icon: <FaHome className="h-5 w-5" />,
        },
      ],
    },
    {
      label: "Utilities",
      items: [
        {
          name: "Management",
          href: "/dashboard/utilities",
          icon: <FaToolbox className="h-5 w-5" />,
        },
        {
          name: "Analytics",
          href: "/dashboard/utilities/analytics",
          icon: <FaChartLine className="h-5 w-5" />,
          badge: "Live",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          name: "Awareness Programs",
          href: "/dashboard/awareness",
          icon: <FaLightbulb className="h-5 w-5" />,
          badge: "New",
        },
        {
          name: "Schemes",
          href: "/dashboard/schemes",
          icon: <FaHandHoldingUsd className="h-5 w-5" />,
        },
        {
          name: "Blog & Updates",
          href: "/dashboard/blog",
          icon: <FaNewspaper className="h-5 w-5" />,
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          name: "Profile",
          href: "/dashboard/profile",
          icon: <FaUserCircle className="h-5 w-5" />,
        },
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: <FaCog className="h-5 w-5" />,
        },
        {
          name: "Help Center",
          href: "/dashboard/help",
          icon: <FaQuestionCircle className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SX</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Smart-X</h1>
            <p className="text-xs text-zinc-400">City Utilities Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation - with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8 thin-scrollbar dark-scrollbar">
        {navigationGroups.map((group) => (
          <div key={group.label}>
            <div className="px-4 mb-2">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {group.label}
              </h2>
            </div>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-primary-100 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.badge === "New"
                          ? "bg-green-500/20 text-green-400"
                          : item.badge === "Live"
                          ? "bg-red-500/20 text-red-400"
                          : ""
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-zinc-500 truncate">{user?.role}</p>
          </div>
          <button
            onClick={() => {
              if (onClose) onClose();
              logout();
            }}
            className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-700"
            title="Sign out"
          >
            <HiOutlineLogout className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
