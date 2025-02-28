"use client";

import { CSSProperties, HTMLAttributes } from "react";
import {
  FieldValues,
  FormProvider as Form,
  UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

export interface FormProviderProps<TFieldValues extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
  className?: HTMLAttributes<HTMLFormElement>["className"];
  formId?: string;
}

export default function FormProvider<TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  formId,
  ...other
}: FormProviderProps<TFieldValues>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} noValidate id={formId} {...other}>
        {children}
      </form>
    </Form>
  );
}
