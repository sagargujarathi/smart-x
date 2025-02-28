import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SecurityMetrics {
  activeUsers: number;
  failedLogins: number;
  suspiciousActivities: number;
}

export const SecurityDashboard = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    activeUsers: 0,
    failedLogins: 0,
    suspiciousActivities: 0,
  });

  useEffect(() => {
    // Fetch security metrics - Replace with actual API call
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/security/metrics");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching security metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white">Active Users</h3>
          <p className="text-3xl font-bold text-primary-100 mt-2">
            {metrics.activeUsers}
          </p>
        </div>
        <div className="bg-zinc-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white">
            Failed Logins (24h)
          </h3>
          <p className="text-3xl font-bold text-red-400 mt-2">
            {metrics.failedLogins}
          </p>
        </div>
        <div className="bg-zinc-800/50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white">
            Suspicious Activities
          </h3>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {metrics.suspiciousActivities}
          </p>
        </div>
      </div>

      <div className="bg-zinc-800/50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
        <div className="space-x-4">
          <Button>Force Password Reset</Button>
          <Button variant="destructive">Lock All Accounts</Button>
          <Button variant="outline">Generate Security Report</Button>
        </div>
      </div>
    </div>
  );
};
