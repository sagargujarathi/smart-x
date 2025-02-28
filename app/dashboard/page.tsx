import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default DashboardPage;
