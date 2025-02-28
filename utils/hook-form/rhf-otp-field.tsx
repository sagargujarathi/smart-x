"use client";

import { Controller, useFormContext } from "react-hook-form";
import { useCallback, useRef } from "react";
import cn from "classnames";

interface RHFOTPFieldProps {
  name: string;
  label?: string;
  length?: number;
  helperText?: string;
}

const RHFOTPField = ({
  name,
  label,
  length = 6,
  helperText,
}: RHFOTPFieldProps) => {
  const { control, setValue } = useFormContext();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (element: HTMLInputElement, index: number) => {
      const value = element.value;
      if (value.length > 1) {
        element.value = value[0];
      }

      // Get the combined OTP value
      const otpValue = inputRefs.current
        .map((input) => input?.value || "")
        .join("");
      setValue(name, otpValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      // Move to next input if value is entered
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length, name, setValue]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (
        event.key === "Backspace" &&
        !event.currentTarget.value &&
        index > 0
      ) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    []
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent) => {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text");
      const otpArray = pastedData.slice(0, length).split("");

      otpArray.forEach((value, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = value;
          handleChange(inputRefs.current[index]!, index);
        }
      });
    },
    [handleChange, length]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div>
          {label && (
            <label className="block text-sm font-medium mb-2 text-gray-200">
              {label}
            </label>
          )}
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                className={cn(
                  "w-12 h-12 text-center text-xl rounded-lg",
                  "bg-zinc-900 border border-zinc-700 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "transition-all duration-200",
                  error && "border-red-500 focus:ring-red-500"
                )}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {(error?.message || helperText) && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {error?.message || helperText}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFOTPField;
