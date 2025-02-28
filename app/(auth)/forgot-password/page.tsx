"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white">Reset your password</h1>
        <p className="text-zinc-400">
          Enter your email address and we'll send you a reset link
        </p>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="bg-green-500/10 text-green-500 p-4 rounded-lg">
            <p>
              If an account exists with that email, you'll receive a reset link
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}

        <Link
          href="/signin"
          className="text-primary-100 hover:text-primary-200 text-center"
        >
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
