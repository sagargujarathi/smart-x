import { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0e0c0c]">
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
  );
};
