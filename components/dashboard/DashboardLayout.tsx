"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { HiMenu, HiX } from "react-icons/hi";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/unauthorized");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0c0c] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0c0c]">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-zinc-900 flex items-center justify-between p-4">
        <div>
          <span className="text-xl font-bold text-white">Smart-X</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white"
        >
          {sidebarOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex">
        {/* Mobile sidebar */}
        <div
          className={`lg:hidden fixed inset-y-0 left-0 z-20 w-64 transform bg-zinc-900 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-16">
            {" "}
            {/* Add padding to account for mobile header */}
            <DashboardSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop sidebar - fixed */}
        <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-zinc-900 z-20">
          <DashboardSidebar />
        </div>

        {/* Main content - with custom scrollbar */}
        <div className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8 mt-16 lg:mt-0 overflow-y-auto dark-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
