"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import HTTPService from "@/services";
import { FormProvider } from "@/utils/hook-form";
import { useForm } from "react-hook-form";
import { schema, SignUpFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFInputField from "@/utils/hook-form/rhf-input-field";
import { SERVICE_ID } from "@/constants";
import { useRouter } from "next/navigation";
import { ROUTER_LINKS } from "@/router-links";

export default function SignUpPage() {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
    mode: "all",
  });

  const {
    mutateAsync: mutate,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: HTTPService.signup,
    onSuccess: () => {
      router.push(ROUTER_LINKS.SIGNIN);
    },
  });

  const onSubmit = (data: SignUpFormType) => {
    mutate({ service_id: SERVICE_ID, ...data });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <p className="text-zinc-400">Join Smart-X to manage your utilities</p>

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
          <RHFInputField
            name="confirmPassword"
            label="Confirm password"
            type="password"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !methods.formState.isValid}
          >
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </FormProvider>

        <p className="text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary-100 hover:text-primary-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
