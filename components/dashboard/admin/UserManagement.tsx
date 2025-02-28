import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "./ExportDialog";
import { IUser } from "@/types/auth";

interface UserManagementProps {
  users: IUser[];
  loading: boolean;
}

export const UserManagement = ({ users, loading }: UserManagementProps) => {
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format: "csv" | "pdf") => {
    // Implement export logic here
    console.log(`Exporting as ${format}`);
    setShowExport(false);
  };

  const handleAction = async (userId: string, action: "suspend" | "delete") => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        body: JSON.stringify({ action }),
      });
      // Refresh users list
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={() => setShowExport(true)}>Export Users</Button>
      </div>

      <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                <td className="px-6 py-4 text-sm text-white">{user.role}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(user.id, "suspend")}
                  >
                    Suspend
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(user.id, "delete")}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showExport && (
        <ExportDialog
          onExport={handleExport}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};
