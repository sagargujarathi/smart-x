import { useState, useEffect } from "react";
import { AwarenessProgram, Scheme, BlogPost } from "@/types/awareness";
import {
  mockAwarenessPrograms,
  mockSchemes,
  mockBlogs,
} from "@/mock/resourcesData";

type ResourceType = "awareness" | "schemes" | "blog";

interface UseResourcesProps {
  type: ResourceType;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useResources({
  type,
  page = 1,
  limit = 9,
  search = "",
  category = "",
}: UseResourcesProps) {
  const [data, setData] = useState<(AwarenessProgram | Scheme | BlogPost)[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        let mockData = [];
        switch (type) {
          case "awareness":
            mockData = mockAwarenessPrograms;
            break;
          case "schemes":
            mockData = mockSchemes;
            break;
          case "blog":
            mockData = mockBlogs;
            break;
        }

        // Apply filters
        let filteredData = mockData.filter((item) => {
          const matchesSearch = search
            ? item.title.toLowerCase().includes(search.toLowerCase())
            : true;
          const matchesCategory = category ? item.category === category : true;
          return matchesSearch && matchesCategory;
        });

        // Pagination
        const start = (page - 1) * limit;
        const paginatedData = filteredData.slice(start, start + limit);

        setData(paginatedData);
        setTotalPages(Math.ceil(filteredData.length / limit));
        setError(null);
      } catch (err) {
        setError("Failed to fetch resources");
      } finally {
        setLoading(false);
      }
    }, 1000); // 1 second delay to simulate API call

    return () => clearTimeout(timer);
  }, [type, page, limit, search, category]);

  return { data, loading, error, totalPages };
}
