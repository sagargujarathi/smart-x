"use client";

import { Controller, useFormContext } from "react-hook-form";
import cn from "classnames";
import { IoChevronDownOutline } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}

interface RHFSelectFieldProps {
  name: string;
  label?: string;
  options: Option[];
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const RHFSelectField = ({
  name,
  label,
  options,
  helperText,
  placeholder,
  required,
  disabled,
}: RHFSelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          {label && (
            <label
              htmlFor={name}
              className="block text-sm font-medium mb-1.5 text-gray-200"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              {...field}
              id={name}
              disabled={disabled}
              className={cn(
                "w-full rounded-lg px-3 py-2.5 text-base transition-colors appearance-none",
                "bg-zinc-900 border border-zinc-700 text-white",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "hover:border-zinc-600",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                error && "border-red-500 focus:ring-red-500"
              )}
            >
              {placeholder && (
                <option value="" disabled className="text-gray-400">
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-zinc-800 py-2"
                >
                  {option.label}
                </option>
              ))}
            </select>
            <IoChevronDownOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {(error?.message || helperText) && (
            <p className="mt-1.5 text-sm text-red-500">
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelectField;
