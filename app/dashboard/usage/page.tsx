"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { RoleGuard } from "@/components/RoleGuard";
import { UserRole } from "@/types/auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart } from "@/components/dashboard/charts/LineChart";
import { Card } from "@/components/ui/card";

export default function UsagePage() {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Usage",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <RoleGuard allowedRoles={[UserRole.USER]}>
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white/90">Utility Usage</h1>

          <Tabs defaultValue="electricity">
            <TabsList>
              <TabsTrigger value="electricity">Electricity</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="gas">Gas</TabsTrigger>
            </TabsList>

            <TabsContent value="electricity" className="space-y-4">
              <Card className="p-4">
                <h2 className="text-lg font-medium mb-4">Current Usage</h2>
                <LineChart data={chartData} xAxis="Month" yAxis="Usage (kWh)" />
              </Card>

              <Card className="p-4">
                <h2 className="text-lg font-medium mb-4">Payment Status</h2>
                {/* Payment status details */}
              </Card>
            </TabsContent>

            {/* Similar content for water and gas tabs */}
          </Tabs>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
