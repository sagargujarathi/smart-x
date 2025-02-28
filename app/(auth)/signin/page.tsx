"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import HTTPService from "@/services";
import { FormProvider } from "@/utils/hook-form";
import { useForm } from "react-hook-form";
import { schema, SignInFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInputField from "@/utils/hook-form/rhf-input-field";
import { SERVICE_ID } from "@/constants";

export default function SignInPage() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    reValidateMode: "onChange",
    mode: "all",
  });

  const {
    mutateAsync: mutate,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: HTTPService.signIn,
  });

  const onSubmit = (data: SignInFormType) => {
    mutate({ service_id: SERVICE_ID, ...data });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-zinc-400">Sign in to your account to continue</p>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
            {error.message}
          </div>
        )}

        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <RHFInputField name="email" label="Email address" type="email" />

          <RHFInputField name="password" label="Password" type="password" />
          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary-100 hover:text-primary-200"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !methods.formState.isValid}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </FormProvider>

        <p className="text-center text-zinc-400">
          {"Don't have an account?  "}
          <Link
            href="/signup"
            className="text-primary-100 hover:text-primary-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
