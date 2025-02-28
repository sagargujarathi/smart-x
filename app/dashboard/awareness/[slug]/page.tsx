"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { FaClock, FaShare, FaBookmark } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function AwarenessProgramPage() {
  const params = useParams();
  const [program, setProg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual data fetch
    setProg({
      title: "Smart Water Usage Program",
      description: "Learn how to reduce water consumption by up to 40%",
      content: `<div class="prose prose-invert max-w-none">
        <h2>Why Water Conservation Matters</h2>
        <p>Water conservation is crucial for sustainable urban development...</p>
        <h3>Key Steps to Reduce Water Usage</h3>
        <ul>
          <li>Install water-efficient fixtures</li>
          <li>Fix leaking pipes and taps</li>
          <li>Implement rainwater harvesting</li>
        </ul>
        <h3>Expected Benefits</h3>
        <p>By following these guidelines, households can expect...</p>
      </div>`,
      image: "/images/water-conservation.jpg",
      category: "water",
      readTime: "5 min",
      author: "Environmental Team",
      date: "2024-01-15",
    });
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading program details...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <article className="max-w-4xl mx-auto space-y-6">
        <div className="relative h-80 rounded-lg overflow-hidden">
          <img
            src={program.image}
            alt={program.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <div className="inline-block px-3 py-1 bg-primary-100 text-white text-sm rounded-full mb-3">
              {program.category}
            </div>
            <h1 className="text-3xl font-bold text-white">{program.title}</h1>
          </div>
        </div>

        <div className="flex items-center justify-between text-zinc-400 text-sm">
          <div className="flex items-center gap-4">
            <span>{program.author}</span>
            <span>{new Date(program.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-1">
              <FaClock className="h-4 w-4" />
              {program.readTime} read
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <FaBookmark className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <FaShare className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="text-zinc-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: program.content }}
        />

        <div className="bg-zinc-800/60 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-medium text-white mb-4">Take Action</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors">
              Join Program
            </button>
            <button className="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
              Download Resources
            </button>
          </div>
        </div>
      </article>
    </DashboardLayout>
  );
}
