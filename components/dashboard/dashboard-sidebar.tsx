"use client";

import { USER_ROLE_OPTIONS } from "@/constants";
import { USER_ROLE } from "@/constants/enums";
import { useAuthContext } from "@/context/auth-context";
import { ROUTER_LINKS } from "@/router-links";
import { IUserDetailsType } from "@/types/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaToolbox,
  FaLightbulb,
  FaNewspaper,
  FaHandHoldingUsd,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import {
  HiUsers,
  HiShieldCheck,
  HiExclamationCircle,
  HiMap,
} from "react-icons/hi";

const getNavLinks = (data?: IUserDetailsType) => {
  const isAdmin =
    data?.role_type === USER_ROLE.ADMIN ||
    data?.role_type === USER_ROLE.SUPER_ADMIN;

  return [
    {
      label: "Main",
      items: [
        {
          name: "Overview",
          href: ROUTER_LINKS.ROOT,
          icon: <FaHome className="h-5 w-5" />,
        },
        {
          name: "City Map",
          href: ROUTER_LINKS.MAP,
          icon: <HiMap className="h-5 w-5" />,
        },
      ],
    },
    {
      label: "Utilities",
      items: [
        {
          name: "Management",
          href: ROUTER_LINKS.UTILITIES,
          icon: <FaToolbox className="h-5 w-5" />,
        },
        {
          name: "Analytics",
          href: ROUTER_LINKS.ANALYTICS,
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
          href: ROUTER_LINKS.AWARENESS,
          icon: <FaLightbulb className="h-5 w-5" />,
          badge: "New",
        },
        {
          name: "Schemes",
          href: ROUTER_LINKS.SCHEMES,
          icon: <FaHandHoldingUsd className="h-5 w-5" />,
        },
        {
          name: "Blog & Updates",
          href: ROUTER_LINKS.BLOGS,
          icon: <FaNewspaper className="h-5 w-5" />,
        },
      ],
    },
    // Admin-only navigation group
    ...(isAdmin
      ? [
          {
            label: "Admin",
            items: [
              {
                name: "User Management",
                href: ROUTER_LINKS.ADMIN.USERS,
                icon: <HiUsers className="h-5 w-5" />,
              },
              {
                name: "System Settings",
                href: ROUTER_LINKS.ADMIN.DASHBOARD,
                icon: <FaCog className="h-5 w-5" />,
              },
              {
                name: "Security",
                href: ROUTER_LINKS.ADMIN.SECURITY,
                icon: <HiShieldCheck className="h-5 w-5" />,
              },
              {
                name: "Anomalies",
                href: ROUTER_LINKS.ADMIN.ANOMALIES,
                icon: <HiExclamationCircle className="h-5 w-5" />,
              },
            ],
          },
        ]
      : []),
  ];
};

export const DashboardSidebar = () => {
  const router = useRouter();
  const { data, logout } = useAuthContext();
  const pathname = usePathname();

  const navigationGroups = getNavLinks(data);

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
              {data?.first_name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {data?.first_name + " " + data?.last_name}
            </p>
            <p className="text-xs text-zinc-500 truncate">
              {
                USER_ROLE_OPTIONS.find((item) => item.value === data?.role_type)
                  ?.label
              }
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              router.push(ROUTER_LINKS.SIGNIN);
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
