"use client";

import { Controller, useFormContext } from "react-hook-form";

interface RHFCheckboxProps {
  name: string;
  label?: string;
  helperText?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  toggleClassName?: string;
  circleClassName?: string;
  disabled?: boolean;
}

const RHFCheckbox = ({
  name,
  label,
  helperText,
  wrapperClassName = "flex items-center gap-2",
  labelClassName = "text-sm text-zinc-300",
  helperClassName = "text-xs text-zinc-500",
  toggleClassName = "w-10 h-6 rounded-full transition-colors duration-200",
  circleClassName = "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200",
  disabled,
}: RHFCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <div className={wrapperClassName}>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={value}
                className="sr-only"
                disabled={disabled}
                {...field}
              />
              <div
                className={`${toggleClassName} ${
                  value ? "bg-primary-100" : "bg-zinc-700"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`${circleClassName} ${
                    value ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
            {label && <span className={labelClassName}>{label}</span>}
          </label>
          {(helperText || error?.message) && (
            <small className={helperClassName}>
              {error?.message || helperText}
            </small>
          )}
        </div>
      )}
    />
  );
};

export default RHFCheckbox;
