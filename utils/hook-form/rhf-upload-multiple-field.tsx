"use client";

import { ChangeEvent, JSX, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useRHFFieldArrayContext } from "./rhf-field-array-provider";
import { FileValidation } from "./types";

interface IRHFUploadMultipleFieldProps<T> {
  name: string;
  label?: string;
  validation?: Partial<FileValidation>;
  helperText?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  allowDragDrop?: boolean;
  children: (props: {
    isDragActive: boolean;
    value: T[];
    onClick: () => void;
    isError?: boolean;
  }) => JSX.Element;
  structureValue: (files: File[]) => T[];
  isLoading?: boolean;
  className?: string;
}

const RHFUploadMultipleField = <T,>({
  name,
  label,
  validation = {
    maxSize: 5 * 1024 * 1024,
    accept: ["image/*"],
    maxFiles: 10,
  },
  helperText,
  className,
  wrapperClassName,
  labelClassName,
  helperClassName,
  children,
  structureValue,
  allowDragDrop = true,
  isLoading = false,
}: IRHFUploadMultipleFieldProps<T>) => {
  const { control } = useFormContext();
  const { append, fields } = useRHFFieldArrayContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    console.log(fields);
    const structuredFiles = structureValue(files);
    append(structuredFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: validation.accept?.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {}
    ),
    maxSize: validation.maxSize,
    multiple: true,
    onDrop: handleFiles,
    disabled: !allowDragDrop || isLoading,
    noClick: false, // Changed from true to false
  });

  const handleClick = () => {
    if (!isLoading) {
      inputRef.current?.click();
    }
  };

  const inputProps = {
    ...getInputProps(),
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFiles(files);
    },
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value }, fieldState: { error } }) => (
          <div className={wrapperClassName}>
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
            <div {...getRootProps()} className={className}>
              {children({
                isDragActive,
                value,
                onClick: handleClick,
                isError: !!error,
              })}
              <input
                ref={inputRef}
                name={name}
                type="file"
                multiple
                {...inputProps}
                style={{ display: "none" }}
              />
            </div>
            {(helperText || error?.message) && (
              <small
                className={helperClassName || "mt-1.5 text-xs text-gray-500"}
              >
                {helperText || error?.message}
              </small>
            )}
          </div>
        )}
      />
    </>
  );
};

export default RHFUploadMultipleField;
