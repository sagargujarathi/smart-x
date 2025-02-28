"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface LineChartProps {
  data: ChartData<"line">;
  xAxis: string;
  yAxis: string;
}

export function LineChart({ data, xAxis, yAxis }: LineChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxis,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxis,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
