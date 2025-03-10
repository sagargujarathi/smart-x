import { Line } from "react-chartjs-2";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

interface PredictionData {
  dates: string[];
  actual: number[];
  predicted: number[];
  upperBound: number[];
  lowerBound: number[];
  unit: string;
}

interface UtilityPredictionsProps {
  type: string;
  predictions: PredictionData;
}

export const UtilityPredictions = ({
  type,
  predictions,
}: UtilityPredictionsProps) => {
  const data = {
    labels: predictions.dates,
    datasets: [
      {
        label: "Actual Usage",
        data: predictions.actual,
        borderColor: "rgb(75, 192, 192)",
        fill: false,
      },
      {
        label: "Predicted Usage",
        data: predictions.predicted,
        borderColor: "rgb(255, 159, 64)",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: "Prediction Range",
        data: predictions.upperBound,
        borderColor: "rgba(255, 159, 64, 0.2)",
        backgroundColor: "rgba(255, 159, 64, 0.1)",
        fill: "+1",
      },
      {
        label: "Lower Bound",
        data: predictions.lowerBound,
        borderColor: "rgba(255, 159, 64, 0.2)",
        fill: false,
      },
    ],
  };

  const predictedChange =
    ((predictions.predicted[predictions.predicted.length - 1] -
      predictions.actual[predictions.actual.length - 1]) /
      predictions.actual[predictions.actual.length - 1]) *
    100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaChartLine className="text-primary-100 h-5 w-5" />
          <h2 className="text-xl font-semibold text-white">
            Usage Predictions
          </h2>
        </div>
        {Math.abs(predictedChange) > 10 && (
          <div className="flex items-center gap-2 text-yellow-400">
            <FaExclamationTriangle />
            <span className="text-sm">Significant change predicted</span>
          </div>
        )}
      </div>

      <div className="bg-zinc-700/30 p-6 rounded-lg">
        <Line
          data={data}
          options={{
            responsive: true,
            scales: {
              y: {
                title: {
                  display: true,
                  text: predictions.unit,
                },
              },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-700/30 p-4 rounded-lg">
          <h3 className="text-zinc-400 text-sm">Predicted Trend</h3>
          <p className="text-2xl font-bold text-white mt-1">
            {predictedChange >= 0 ? "↗" : "↘"}{" "}
            {14}%
          </p>
          <p className="text-sm text-zinc-400 mt-1">
            Expected {predictedChange >= 0 ? "increase" : "decrease"}
          </p>
        </div>

        <div className="bg-zinc-700/30 p-4 rounded-lg">
          <h3 className="text-zinc-400 text-sm">Confidence Level</h3>
          <p className="text-2xl font-bold text-white mt-1">85%</p>
          <p className="text-sm text-zinc-400 mt-1">Prediction accuracy</p>
        </div>

        <div className="bg-zinc-700/30 p-4 rounded-lg">
          <h3 className="text-zinc-400 text-sm">Forecast Period</h3>
          <p className="text-2xl font-bold text-white mt-1">30 Days</p>
          <p className="text-sm text-zinc-400 mt-1">Rolling forecast</p>
        </div>
      </div>
    </div>
  );
};
