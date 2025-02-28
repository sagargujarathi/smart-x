"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { SecurityDashboard } from "@/components/dashboard/admin/SecurityDashboard";
import { USER_ROLE } from "@/constants/enums";
import { useAuthContext } from "@/context/auth-context";

export default function SecurityPage() {
  const { data } = useAuthContext();

  if (data?.role_type === USER_ROLE.USER) {
    return <div>Unauthorized</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
        <SecurityDashboard />
      </div>
    </DashboardLayout>
  );
}
