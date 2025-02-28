"use client";

import { ChangeEvent, JSX, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

interface IRHFUploadFieldProps<S = File> {
  name: string;
  label?: string;
  accept?: string;
  maxSize?: number;
  helperText?: string;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  onChange?: (file: File) => void;
  allowDragDrop?: boolean;
  children: (props: {
    isDragActive: boolean;
    value: File | null;
    onClick: () => void;
  }) => JSX.Element;
  structureValue?: (file: File) => S;
  isLoading?: boolean;
}

const RHFUploadField = <S = File,>({
  name,
  label,
  accept = "image/*",
  maxSize = 2 * 1024 * 1024,
  allowDragDrop = true,
  helperText,
  className,
  wrapperClassName,
  labelClassName,
  helperClassName,
  children,
  structureValue = ((f: File) => f) as (file: File) => S,
  isLoading = false,
}: IRHFUploadFieldProps<S>) => {
  const { control, setValue } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    if (!files.length) return;
    setValue(name, structureValue(files[0]), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { [accept]: [] },
    maxSize,
    multiple: false,
    onDrop: handleFiles,
    disabled: !allowDragDrop || isLoading,
  });

  const handleClick = () => {
    inputRef.current?.click();
  };

  const inputProps = {
    ...getInputProps(),
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFiles(files);
    },
  };

  return (
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
          <div {...getRootProps({ className })}>
            {children({
              isDragActive,
              value,
              onClick: handleClick,
            })}
            <input name={name} type="file" {...inputProps} />
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
  );
};

export default RHFUploadField;
