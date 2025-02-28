"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BsBell } from "react-icons/bs";

interface Notification {
  id: number;
  message: string;
  type: "alert" | "info" | "success";
  time: string;
  read: boolean;
}

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Water usage spike detected in Sector 7",
      type: "alert",
      time: "5m ago",
      read: false,
    },
    {
      id: 2,
      message: "Energy consumption reduced by 15% this week",
      type: "success",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      message: "New waste management schedule published",
      type: "info",
      time: "2h ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:bg-zinc-700/50 rounded-full transition-colors"
      >
        <BsBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-80 bg-zinc-800 rounded-lg shadow-lg z-40"
            >
              <div className="p-4 border-b border-zinc-700">
                <h3 className="text-lg font-medium text-white">
                  Notifications
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-zinc-700 ${
                        !notification.read ? "bg-zinc-700/30" : ""
                      }`}
                    >
                      <p className="text-white text-sm">
                        {notification.message}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            notification.type === "alert"
                              ? "bg-red-500/20 text-red-400"
                              : notification.type === "success"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {notification.type}
                        </span>
                        <span className="text-zinc-400 text-xs">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-zinc-400">
                    No notifications
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-zinc-700">
                <button className="w-full text-center text-sm text-primary-100 hover:text-primary-200">
                  View all notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
