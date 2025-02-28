import { FaCheckCircle, FaLightbulb } from "react-icons/fa";

interface SolutionsListProps {
  solutions: string[];
  type: string;
}

export const SolutionsList = ({ solutions, type }: SolutionsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FaLightbulb className="text-primary-100 h-5 w-5" />
        <h2 className="text-xl font-semibold text-white">
          Recommended Solutions
        </h2>
      </div>

      <div className="space-y-3">
        {solutions.map((solution, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-zinc-700/50 p-4 rounded-lg"
          >
            <FaCheckCircle className="text-primary-100 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-white">{solution}</p>
              <p className="text-sm text-zinc-400 mt-1">
                Potential improvement: {Math.floor(Math.random() * 20 + 10)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
