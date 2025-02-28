"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ResourceCard } from "@/components/dashboard/awareness/ResourceCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useResources } from "@/hooks/useResources";

import { useDebounce } from "@/hooks/useDebounce";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TabType = "awareness" | "schemes" | "blog";

export default function AwarenessPage() {
  const [activeTab, setActiveTab] = useState<TabType>("awareness");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error, totalPages } = useResources({
    type: activeTab,
    page,
    search: debouncedSearch,
    category,
  });

  console.log("Current data:", { data, loading, error, totalPages }); // Debug log

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const renderLoadingState = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[200px] rounded-lg" />
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>Resource Center - Smart-X</title>
        <meta
          name="description"
          content="Explore awareness programs, government schemes, and updates"
        />
      </Head>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white/90">
              Resource Center
            </h1>
            <div className="flex gap-4">
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={handleSearch}
                className="w-64"
              />
              <Select
                value={category}
                onValueChange={handleCategoryChange}
                options={[
                  { label: "All Categories", value: "" },
                  { label: "Water", value: "water" },
                  { label: "Electricity", value: "electricity" },
                  { label: "General", value: "general" },
                ]}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="awareness">Awareness Programs</TabsTrigger>
              <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
              <TabsTrigger value="blog">Blog & Updates</TabsTrigger>
            </TabsList>
          </Tabs>

          {error ? (
            <div className="text-red-400 p-4 rounded-lg bg-red-950/20">
              {error}
            </div>
          ) : loading ? (
            renderLoadingState()
          ) : (
            <>
              {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((item) => (
                    <ResourceCard
                      key={item.id}
                      type={activeTab}
                      data={item}
                      onBookmark={() => {
                        console.log("Bookmark clicked:", item.id);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  No resources found matching your criteria
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "outline"}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
