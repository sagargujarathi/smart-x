"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UserManagement } from "@/components/dashboard/admin/UserManagement";
import { USER_ROLE } from "@/constants/enums";
import { useAuthContext } from "@/context/auth-context";

export default function UsersPage() {
  const { data } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users - Replace with your actual API call
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (data?.role_type === USER_ROLE.USER) {
    return <div>Unauthorized</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <UserManagement users={users} loading={loading} />
      </div>
    </DashboardLayout>
  );
}
