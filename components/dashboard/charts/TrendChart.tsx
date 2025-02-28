import { ResponsiveLine } from "@nivo/line";
import { Card } from "@/components/ui/card";

interface TrendChartProps {
  data: any;
  type: string;
  showAdvancedMetrics?: boolean;
}

export const TrendChart = ({
  data,
  type,
  showAdvancedMetrics = false,
}: TrendChartProps) => {
  if (!data) return null;

  return (
    <div className="h-[300px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        colors={{ scheme: "category10" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#9ca3af",
              },
            },
          },
          grid: {
            line: {
              stroke: "#374151",
            },
          },
        }}
      />
    </div>
  );
};
