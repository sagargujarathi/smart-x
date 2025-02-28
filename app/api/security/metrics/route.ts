import { NextResponse } from "next/server";

export async function GET() {
  // Replace with your actual metrics gathering logic
  const metrics = {
    activeUsers: 150,
    failedLogins: 23,
    suspiciousActivities: 5,
  };

  return NextResponse.json(metrics);
}
