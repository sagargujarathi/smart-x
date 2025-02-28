interface EfficiencyMetricsProps {
  type: string;
  data: {
    current: number;
    target: number;
    unit: string;
  };
}

interface AIInsight {
  message: string;
  impact: "positive" | "negative" | "neutral";
}

export const EfficiencyMetrics = ({ type, data }: EfficiencyMetricsProps) => {
  const efficiency = (data.current / data.target) * 100;

  const getAIInsights = (): AIInsight[] => {
    const insights: AIInsight[] = [];

    if (data.current < data.target * 0.8) {
      insights.push({
        message: "Significant optimization potential detected",
        impact: "negative",
      });
    }

    if (data.current > data.target * 0.95) {
      insights.push({
        message: "Near optimal performance achieved",
        impact: "positive",
      });
    }

    if (type === "ELECTRICITY" && data.current > data.target * 0.85) {
      insights.push({
        message: "Peak load management is effective",
        impact: "positive",
      });
    }

    return insights;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Efficiency Metrics</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Current: {data.current}%</span>
            <span>Target: {data.target}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2.5">
            <div
              className="bg-primary-100 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${efficiency}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-700/50 p-4 rounded-lg">
            <div className="text-sm text-zinc-400">Unit Efficiency</div>
            <div className="text-xl font-semibold text-white mt-1">
              {data.unit}
            </div>
          </div>
          <div className="bg-zinc-700/50 p-4 rounded-lg">
            <div className="text-sm text-zinc-400">Improvement</div>
            <div className="text-xl font-semibold text-white mt-1">
              +{(data.target - data.current).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-medium text-zinc-400">AI Insights</h3>
          {getAIInsights().map((insight, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm ${
                insight.impact === "positive"
                  ? "bg-green-500/10 text-green-400"
                  : insight.impact === "negative"
                  ? "bg-red-500/10 text-red-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {insight.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
