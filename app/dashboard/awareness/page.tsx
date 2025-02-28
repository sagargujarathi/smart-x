"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ResourceCard } from "@/components/dashboard/awareness/ResourceCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AwarenessPage() {
  const [activeTab, setActiveTab] = useState("awareness");

  const awarenessPrograms = [
    {
      id: 1,
      title: "Smart Water Usage Program",
      description: "Learn how to reduce water consumption by up to 40%",
      image: "/images/water-conservation.jpg",
      category: "water",
      readTime: "5 min",
      link: "/awareness/water-conservation",
    },
    {
      id: 2,
      title: "Energy Conservation Challenge",
      description: "Join the community challenge to save energy",
      image: "/images/energy-challenge.jpg",
      category: "electricity",
      readTime: "8 min",
      link: "/awareness/energy-challenge",
    },
    // Add more programs...
  ];

  const schemes = [
    {
      id: 1,
      title: "Solar Panel Subsidy",
      description: "Get up to 50% subsidy on solar panel installation",
      deadline: "2024-12-31",
      category: "electricity",
      status: "active",
    },
    {
      id: 2,
      title: "Smart Meter Installation",
      description: "Free smart meter installation for residential areas",
      deadline: "2024-06-30",
      category: "water",
      status: "active",
    },
    // Add more schemes...
  ];

  const blogs = [
    {
      id: 1,
      title: "Future of Smart Cities",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "10 min",
      category: "general",
      excerpt: "Exploring how smart utilities are shaping future cities...",
    },
    // Add more blogs...
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white/90">Resource Center</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="awareness">Awareness Programs</TabsTrigger>
            <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
            <TabsTrigger value="blog">Blog & Updates</TabsTrigger>
          </TabsList>

          {activeTab === "awareness" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awarenessPrograms.map((program) => (
                <ResourceCard key={program.id} type="program" data={program} />
              ))}
            </div>
          )}

          {activeTab === "schemes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => (
                <ResourceCard key={scheme.id} type="scheme" data={scheme} />
              ))}
            </div>
          )}

          {activeTab === "blog" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <ResourceCard key={blog.id} type="blog" data={blog} />
              ))}
            </div>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
