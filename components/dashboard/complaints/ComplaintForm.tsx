"use client";

import { UtilityType } from "@/types/utility";
import { useState } from "react";

interface ComplaintFormProps {
  onSubmit: (data: {
    type: UtilityType;
    description: string;
    address: string;
  }) => void;
}

export const ComplaintForm = ({ onSubmit }: ComplaintFormProps) => {
  const [formData, setFormData] = useState({
    type: "WATER" as UtilityType,
    description: "",
    address: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-6 max-w-2xl"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Utility Type
        </label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as UtilityType })
          }
          className="w-full bg-secondary-100 rounded-lg px-4 py-2.5"
        >
          <option value="WATER">Water</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="WASTE">Waste</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full bg-secondary-100 rounded-lg px-4 py-2.5 min-h-[100px]"
          placeholder="Describe the issue..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-300">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full bg-secondary-100 rounded-lg px-4 py-2.5"
          placeholder="Enter location address..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-100 hover:bg-primary-200 text-white rounded-lg px-4 py-2.5 transition-colors"
      >
        Submit Complaint
      </button>
    </form>
  );
};
