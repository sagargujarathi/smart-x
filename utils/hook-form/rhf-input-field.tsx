"use client";

import { Controller, useFormContext } from "react-hook-form";

interface IRHFInputFieldType {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  autoComplete?: string;
  fullWidth?: boolean;
}

const RHFInputField = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  helperText,
  className,
  wrapperClassName,
  labelClassName,
  helperClassName,
  autoComplete,
  fullWidth,
  ...other
}: IRHFInputFieldType) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`${fullWidth ? "w-full" : ""}`}>
          {label && (
            <label
              htmlFor={name}
              className={
                labelClassName ||
                "block text-sm font-medium leading-6 text-white/80"
              }
            >
              {label}
            </label>
          )}
          <div
            className={`${fullWidth ? "w-full" : ""} ${label ? "mt-2" : ""}`}
          >
            <div
              className={`w-full flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary-200 duration-200 ${wrapperClassName}`}
            >
              <input
                {...field}
                {...other}
                id={name}
                type={type}
                disabled={disabled}
                autoComplete={autoComplete}
                onChange={(event) => {
                  if (type === "number") {
                    field.onChange(Number(event.target.value));
                  } else {
                    field.onChange(event.target.value);
                  }
                }}
                value={
                  type === "number" && field.value === 0 ? "" : field.value
                }
                className={
                  className ||
                  "w-full px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:border-zinc-700 transition-colors disabled:text-gray-500"
                }
                placeholder={placeholder}
              />
            </div>
          </div>
          {(helperText || error?.message) && (
            <small
              className={
                helperClassName ||
                `mt-1.5 text-xs ${error ? "text-red-400" : "text-gray-500"}`
              }
            >
              {error?.message || helperText}
            </small>
          )}
        </div>
      )}
    />
  );
};

export default RHFInputField;
