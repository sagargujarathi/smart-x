import { useState, useEffect } from "react";
import type { UtilityStats, UtilityType } from "@/types/utility";

export function useUtilityData(type: UtilityType) {
  const [data, setData] = useState<UtilityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/utilities/${type.toLowerCase()}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
}
