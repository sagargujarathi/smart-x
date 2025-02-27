"use client";

import { useState, useEffect } from "react";
import { UtilityAction } from "@/types/utility";
import { utilityService } from "@/services/utilityService";
import { HiArrowSmRight, HiCheck, HiLightningBolt, HiX } from "react-icons/hi";

interface Props {
  type?: "all" | "WATER" | "ELECTRICITY" | "WASTE";
}

export const UtilityActions = ({ type = "all" }: Props) => {
  const [actions, setActions] = useState<UtilityAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [implementing, setImplementing] = useState<string | null>(null);
  const [implemented, setImplemented] = useState<string[]>([]);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const actionsData = await utilityService.getRecommendedActions();
        setActions(actionsData);
      } catch (error) {
        console.error("Error fetching recommended actions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  const handleImplement = async (actionId: string) => {
    setImplementing(actionId);

    // Simulate API call to implement the action
    setTimeout(() => {
      setImplemented((prev) => [...prev, actionId]);
      setImplementing(null);
    }, 1500);
  };

  const getImpactColor = (impact: "low" | "medium" | "high") => {
    switch (impact) {
      case "high":
        return "bg-green-900/30 text-green-400";
      case "medium":
        return "bg-blue-900/30 text-blue-400";
      case "low":
        return "bg-yellow-900/30 text-yellow-400";
    }
  };

  if (loading) {
    return <div className="text-zinc-400">Loading recommended actions...</div>;
  }

  if (actions.length === 0) {
    return (
      <div className="bg-zinc-800 rounded-lg p-6 text-center">
        <p className="text-zinc-400">No recommended actions at this time</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Recommended Actions</h3>
      <div className="grid gap-4">
        {actions.map((action) => (
          <div key={action.id} className="bg-zinc-800 rounded-lg p-5">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-white">{action.name}</h4>
                <p className="text-zinc-400 mt-1 text-sm">
                  {action.description}
                </p>
                <div className="flex mt-3 space-x-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getImpactColor(
                      action.impact
                    )}`}
                  >
                    {action.impact} impact
                  </span>
                  {action.estimatedSavings && (
                    <span className="px-2 py-1 text-xs rounded-full bg-primary-900/20 text-primary-100">
                      {action.estimatedSavings}% savings
                    </span>
                  )}
                </div>
              </div>

              {implemented.includes(action.id) ? (
                <div className="flex items-center text-green-500 bg-green-900/20 px-3 py-1 rounded-full">
                  <HiCheck className="mr-1" /> Implemented
                </div>
              ) : (
                <button
                  onClick={() => handleImplement(action.id)}
                  disabled={implementing === action.id}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    implementing === action.id
                      ? "bg-primary-900/50 text-primary-300"
                      : "bg-primary-100 hover:bg-primary-200 text-white"
                  }`}
                >
                  {implementing === action.id ? (
                    <>
                      <span className="mr-2">Implementing</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    </>
                  ) : (
                    <>
                      <span>Implement</span>
                      <HiArrowSmRight className="ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
