"use client";

import { TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IRHFTextareaFieldType
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

const RHFTextareaField = ({
  name,
  label,
  placeholder,
  disabled,
  rows,
  ...other
}: IRHFTextareaFieldType) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div role="group" aria-labelledby={`${name}-label`}>
          {label && (
            <label
              id={`${name}-label`}
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              {label}
            </label>
          )}
          <textarea
            {...field}
            rows={rows}
            name={name}
            disabled={disabled}
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-white focus:outline-none focus:border-zinc-700 transition-colors"
            placeholder={placeholder}
            {...other}
          />
          <small>{error?.message}</small>
        </div>
      )}
    />
  );
};

export default RHFTextareaField;
