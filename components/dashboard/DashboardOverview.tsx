"use client";

import { useState, useEffect } from "react";
import { UtilityData } from "@/types/utility";
import { utilityService } from "@/services/utilityService";
import { UtilityStatusCard } from "./utilities/UtilityStatusCard";
import { AlertsList } from "./utilities/AlertsList";
import { AwarenessCard } from "./awareness/AwarenessCard";
import Link from "next/link";
import { NotificationBell } from "./notifications/NotificationBell";
import { FaLightbulb, FaHandHoldingUsd, FaNewspaper } from "react-icons/fa";

export const DashboardOverview = () => {
  const [utilities, setUtilities] = useState<UtilityData[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await utilityService.getUtilities();
        setUtilities(data);
      } catch (error) {
        console.error("Error fetching utilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const [awarenessItems] = useState([
    {
      id: 1,
      title: "🌟 New Water Conservation Scheme",
      description: "Save up to 40% on your water bill! Learn how...",
      link: "/awareness/water-conservation",
    },
    {
      id: 2,
      title: "⚡ Smart Energy Challenge",
      description: "Join thousands saving energy - Win exciting prizes!",
      link: "/awareness/energy-challenge",
    },
  ]);

  const quickAccess = [
    {
      title: "Awareness Hub",
      description: "Educational resources and programs",
      icon: <FaLightbulb className="h-6 w-6 text-primary-100" />,
      link: "/dashboard/awareness",
      stats: "12 Active Programs",
    },
    {
      title: "Government Schemes",
      description: "Available subsidies and programs",
      icon: <FaHandHoldingUsd className="h-6 w-6 text-green-400" />,
      link: "/dashboard/schemes",
      stats: "5 Active Schemes",
    },
    {
      title: "Latest Updates",
      description: "News and announcements",
      icon: <FaNewspaper className="h-6 w-6 text-blue-400" />,
      link: "/dashboard/blog",
      stats: "3 New Articles",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white/90">
            Smart City Utilities Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">
            Monitor and manage public utilities across the city
          </p>
        </div>
        <NotificationBell />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilities.map((utility) => (
          <UtilityStatusCard key={utility.id} utility={utility} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickAccess.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className="bg-zinc-800/60 rounded-lg p-6 hover:bg-zinc-700/60 transition-colors"
          >
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <div>
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-500">{item.stats}</span>
              <span className="text-primary-100">View →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-800/60 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Featured Awareness Programs
          </h2>
          <div className="space-y-4">
            {awarenessItems.map((item) => (
              <AwarenessCard key={item.id} {...item} />
            ))}
            <Link
              href="/awareness"
              className="block text-primary-100 hover:text-primary-200 text-sm mt-4"
            >
              View all programs →
            </Link>
          </div>
        </div>

        <div className="bg-zinc-800/60 rounded-lg p-6">
          <AlertsList alerts={alerts} onAcknowledge={handleAcknowledgeAlert} />
        </div>
      </div>
    </div>
  );
};
