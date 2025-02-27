"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiLightningBolt,
  HiOutlineLogout,
  HiUsers,
  HiMap,
  HiChartBar,
  HiCog,
} from "react-icons/hi";
import { FaDroplet, FaTrashCan } from "react-icons/fa6";

interface SidebarProps {
  onClose?: () => void;
}

export const DashboardSidebar = ({ onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <HiHome className="h-5 w-5" />,
    },
    {
      name: "All Utilities",
      href: "/dashboard/utilities",
      icon: <HiChartBar className="h-5 w-5" />,
    },
    {
      name: "Water",
      href: "/dashboard/utilities/water",
      icon: <FaDroplet className="h-5 w-5" />,
    },
    {
      name: "Electricity",
      href: "/dashboard/utilities/electricity",
      icon: <HiLightningBolt className="h-5 w-5" />,
    },
    {
      name: "Waste",
      href: "/dashboard/utilities/waste",
      icon: <FaTrashCan className="h-5 w-5" />,
    },
  ];

  // Additional admin menu items
  const adminItems = [
    {
      name: "City Map",
      href: "/dashboard/map",
      icon: <HiMap className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <HiUsers className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <HiCog className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center" onClick={onClose}>
          <span className="text-xl font-bold text-white">Smart-X</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
              isActive(item.href)
                ? "bg-primary-100 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}

        {user?.role === "ADMIN" && (
          <>
            <div className="pt-6 pb-2">
              <div className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Admin Controls
              </div>
            </div>
            {adminItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-primary-100 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center justify-between px-2 py-2">
          <div>
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-zinc-500">{user?.role}</p>
          </div>
          <button
            onClick={() => {
              if (onClose) onClose();
              logout();
            }}
            className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800"
            title="Sign out"
          >
            <HiOutlineLogout className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
