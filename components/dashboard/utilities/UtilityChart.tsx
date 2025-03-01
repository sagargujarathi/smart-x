"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { UtilityStats, UtilityType } from "@/types/utility";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  stats: UtilityStats;
  type: UtilityType;
  timeFrame: "daily" | "weekly" | "monthly";
  weekly: number[];
}

export const UtilityChart = ({ stats, type, timeFrame, weekly }: Props) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const generateLabels = () => {
      switch (timeFrame) {
        case "daily":
          return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        case "weekly":
          return ["Week 1", "Week 2", "Week 3", "Week 4"];
        case "monthly":
          return [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
      }
    };
    console.log(chartData);
    const getData = () => {
      switch (timeFrame) {
        case "daily":
          return stats.dailyUsage || [];
        case "weekly":
          return stats.weeklyUsage || [];
        case "monthly":
          return stats.monthlyUsage || [];
      }
    };

    const getLineColor = () => {
      switch (type) {
        case "WATER":
          return "rgba(56, 189, 248, 0.8)";
        case "ELECTRICITY":
          return "rgba(250, 204, 21, 0.8)";
        case "WASTE":
          return "rgba(74, 222, 128, 0.8)";
        case "AIRQUALITY":
          return "rgba(150, 150, 150, 0.8)";
      }
    };

    setChartData({
      labels: generateLabels(),
      datasets: [
        {
          label: `${type} Usage`,
          data: weekly,
          borderColor: getLineColor(),
          backgroundColor: getLineColor().replace("0.8", "0.2"),
          tension: 0.3,
        },
      ],
    });
  }, [stats, type, timeFrame, weekly]);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      title: {
        display: true,
        text: `${type} Usage - ${
          timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)
        }`,
        color: "rgba(255, 255, 255, 0.9)",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  };

  if (!chartData)
    return (
      <div className="h-64 flex items-center justify-center">
        Loading chart...
      </div>
    );

  return (
    <div className="bg-zinc-800 rounded-lg p-5 shadow-md h-80">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
