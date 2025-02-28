"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useState } from "react";
import { FaFilter, FaSearch, FaCalendar } from "react-icons/fa";

export default function SchemesPage() {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const schemes = [
    {
      id: 1,
      title: "Solar Panel Subsidy",
      description: "Get up to 50% subsidy on solar panel installation",
      deadline: "2024-12-31",
      category: "electricity",
      status: "active",
      eligibility: "Residential properties",
      fundingAmount: "Up to $5,000",
    },
    // ...more schemes
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    if (category !== "all" && scheme.category !== category) return false;
    if (status !== "all" && scheme.status !== status) return false;
    if (
      searchQuery &&
      !scheme.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white/90">Government Schemes</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-800/60 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 bg-zinc-800/60 rounded-lg text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="waste">Waste</option>
            </select>

            <select
              className="px-4 py-2 bg-zinc-800/60 rounded-lg text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-zinc-800/60 rounded-lg p-6">
              <div
                className={`text-xs inline-block px-2 py-1 rounded-full ${
                  scheme.status === "active"
                    ? "bg-green-500/20 text-green-400"
                    : scheme.status === "upcoming"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {scheme.status}
              </div>

              <h3 className="text-lg font-medium text-white mt-3">
                {scheme.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-2">{scheme.description}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-zinc-400 text-sm">
                  <FaCalendar className="mr-2" />
                  Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                </div>
                <div className="text-sm text-zinc-400">
                  Funding: {scheme.fundingAmount}
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
