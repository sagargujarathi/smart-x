import { FC } from "react";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export const Select: FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  className = "",
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "h-10 w-full appearance-none rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 pr-8 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none" />
    </div>
  );
};
