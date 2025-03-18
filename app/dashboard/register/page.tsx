"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UTILITY_TYPE_OPTIONS } from "@/constants";
import { useAuthContext } from "@/context/auth-context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  HiUser,
  HiMail,
  HiDocumentText,
  HiExclamationCircle,
  HiCheck,
} from "react-icons/hi";

interface ComplaintFormData {
  fullName: string;
  email: string;
  complaintType: string;
  complaint: string;
}
// make this server component | abstract logic into another component and make it client

const ComplaintPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { data } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ComplaintFormData>();

  const onSubmit = async (data: ComplaintFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit complaint");

      setSuccess(true);
      reset();
    } catch (err) {
      setSuccess(true);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white/90">
              Submit a Complaint
            </h1>
            <p className="mt-2 text-zinc-400">
              Please provide detailed information about your complaint. We'll
              review it as soon as possible.
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    {...register("fullName", {
                      value: data?.first_name + " " + data?.last_name,
                      required: "Full name is required",
                    })}
                    disabled
                    type="text"
                    className="block w-full pl-10 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white focus:border-primary-100 focus:ring-1 focus:ring-primary-100 
                    transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <HiExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.fullName.message}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      value: data?.email,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    disabled
                    className="block w-full pl-10 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white focus:border-primary-100 focus:ring-1 focus:ring-primary-100 
                    transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <HiExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Complaint Type Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Complaint Type
                </label>
                <select
                  {...register("complaintType", {
                    required: "Please select a complaint type",
                  })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2.5 
                  text-white focus:border-primary-100 focus:ring-1 focus:ring-primary-100 
                  transition-colors"
                >
                  <option value="">Select type...</option>
                  {UTILITY_TYPE_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.complaintType && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <HiExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.complaintType.message}
                  </div>
                )}
              </div>

              {/* Complaint Details Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Complaint Details
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <HiDocumentText className="h-5 w-5 text-zinc-500" />
                  </div>
                  <textarea
                    {...register("complaint", {
                      required: "Please describe your complaint",
                      minLength: {
                        value: 20,
                        message:
                          "Please provide more details (minimum 20 characters)",
                      },
                    })}
                    rows={4}
                    className="block w-full pl-10 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    px-4 py-2.5 text-white focus:border-primary-100 focus:ring-1 focus:ring-primary-100 
                    transition-colors"
                    placeholder="Describe your complaint in detail..."
                  />
                </div>
                {errors.complaint && (
                  <div className="flex items-center mt-2 text-red-400 text-sm">
                    <HiExclamationCircle className="w-4 h-4 mr-1" />
                    {errors.complaint.message}
                  </div>
                )}
              </div>

              {/* Status Messages */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="flex items-center text-red-400 text-sm">
                    <HiExclamationCircle className="w-4 h-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="flex items-center text-green-400 text-sm">
                    <HiCheck className="w-4 h-4 mr-2" />
                    Complaint submitted successfully!
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary-100 px-4 py-3 text-sm font-medium text-white 
                hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-primary-100 focus:ring-offset-2 
                focus:ring-offset-zinc-900"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintPage;
