"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { FaClock, FaUser, FaTag } from "react-icons/fa";
import Link from "next/link";
import { QuickNav } from "@/components/dashboard/QuickNav";
import Image from "next/image";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const posts = [
    {
      id: 1,
      title: "Future of Smart Cities",
      excerpt: "Exploring how smart utilities are shaping future cities...",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "10 min",
      category: "technology",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
      featured: true,
    },
    // ...more posts
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white/90">Blog & Updates</h1>
          <div className="flex gap-2">
            {["all", "technology", "environment", "policy"].map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedCategory === cat
                    ? "bg-primary-100 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <QuickNav
          links={[
            {
              href: "/dashboard/awareness",
              label: "Awareness Programs",
              description: "Educational resources",
            },
            {
              href: "/dashboard/schemes",
              label: "Schemes",
              description: "Government initiatives",
            },
          ]}
        />

        {posts
          .filter((post) => post.featured)
          .map((post) => (
            <Link
              key={post.id}
              href={`/dashboard/blog/${post.id}`}
              className="block relative h-96 rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="flex items-center gap-4 text-zinc-400 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <FaUser className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaTag className="h-4 w-4" />
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-primary-100 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 mt-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter((post) => !post.featured)
            .filter(
              (post) =>
                selectedCategory === "all" || post.category === selectedCategory
            )
            .map((post) => (
              <Link
                key={post.id}
                href={`/dashboard/blog/${post.id}`}
                className="block bg-zinc-800/60 rounded-lg overflow-hidden group hover:bg-zinc-700/60 transition-colors"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-zinc-400 text-sm mb-3">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-primary-100 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
