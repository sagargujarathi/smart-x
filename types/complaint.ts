import { UtilityType } from "./utility";

export interface Complaint {
  id: string;
  type: UtilityType;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  submittedBy: string;
}

export interface ComplaintStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  averageResolutionTime: number;
}
