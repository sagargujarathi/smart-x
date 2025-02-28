import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Implement your sign-in logic here
      // Example:
      // const response = await api.post('/auth/signin', { email, password });
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    try {
      // Implement your sign-up logic here
      // Example:
      // const response = await api.post('/auth/signup', data);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      // Implement your password reset logic here
      // Example:
      // await api.post('/auth/reset-password', { email });
      return true;
    } catch (err) {
      setError("Failed to send reset link");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    resetPassword,
    loading,
    error,
  };
}
