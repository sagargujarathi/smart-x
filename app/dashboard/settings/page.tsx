"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";

export default function SettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    critical: true,
    warning: true,
    info: false,
  });

  const [thresholds, setThresholds] = useState({
    waterUsage: 3000,
    electricityUsage: 5000,
    wasteProduction: 2000,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [adminSettings, setAdminSettings] = useState({
    apiRefreshInterval: 5,
    dataRetentionDays: 30,
    autoAcknowledgeInfo: true,
  });

  const handleSave = async () => {
    setSaveSuccess(false);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">
            Dashboard Settings
          </h1>
          <p className="text-zinc-400 mt-2">
            Manage your preferences and notification settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-800/60 rounded-lg p-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Notifications
              </h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 border-b border-zinc-700"
                  >
                    <span className="text-zinc-300 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => {
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: !prev[key],
                          }));
                          setSaveSuccess(false);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Thresholds Panel */}
            <div className="bg-zinc-800/60 rounded-lg p-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Alert Thresholds
              </h2>
              <div className="space-y-4">
                {Object.entries(thresholds).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-zinc-300 block capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => {
                        setThresholds((prev) => ({
                          ...prev,
                          [key]: parseInt(e.target.value) || 0,
                        }));
                        setSaveSuccess(false);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admin Settings Panel */}
          {user?.role === "ADMIN" && (
            <div className="lg:col-span-1">
              <div className="bg-zinc-800/60 rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Admin Settings
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-zinc-300 block">
                      API Refresh Interval (minutes)
                    </label>
                    <input
                      type="number"
                      value={adminSettings.apiRefreshInterval}
                      onChange={(e) => {
                        setAdminSettings((prev) => ({
                          ...prev,
                          apiRefreshInterval: parseInt(e.target.value) || 1,
                        }));
                        setSaveSuccess(false);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-zinc-300 block">
                      Data Retention (days)
                    </label>
                    <input
                      type="number"
                      value={adminSettings.dataRetentionDays}
                      onChange={(e) => {
                        setAdminSettings((prev) => ({
                          ...prev,
                          dataRetentionDays: parseInt(e.target.value) || 1,
                        }));
                        setSaveSuccess(false);
                      }}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-zinc-300">
                      Auto-acknowledge Info Alerts
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminSettings.autoAcknowledgeInfo}
                        onChange={(e) => {
                          setAdminSettings((prev) => ({
                            ...prev,
                            autoAcknowledgeInfo: e.target.checked,
                          }));
                          setSaveSuccess(false);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end space-x-4">
          {saveSuccess && (
            <div className="flex items-center text-green-500">
              <HiCheck className="w-5 h-5 mr-2" />
              <span>Settings saved successfully</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-100 text-white rounded-md hover:bg-primary-200 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
