import { Complaint } from "@/types/complaint";
import { HiExclamation } from "react-icons/hi";

interface ComplaintListProps {
  complaints: Complaint[];
  onStatusChange: (id: string, status: Complaint["status"]) => void;
}

export const ComplaintList = ({
  complaints,
  onStatusChange,
}: ComplaintListProps) => {
  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <div key={complaint.id} className="p-4 rounded-lg bg-secondary-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-white/90">{complaint.type}</h3>
                {complaint.priority === "HIGH" && (
                  <HiExclamation className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                {complaint.description}
              </p>
            </div>
            <select
              value={complaint.status}
              onChange={(e) =>
                onStatusChange(
                  complaint.id,
                  e.target.value as Complaint["status"]
                )
              }
              className="bg-secondary-200 rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};
