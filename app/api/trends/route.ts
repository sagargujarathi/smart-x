import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timeRange = searchParams.get("timeRange") || "7d";
  const utilityType = searchParams.get("utilityType") || "all";

  // Replace with actual database query
  const trends = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Usage",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return NextResponse.json({
    trends,
    anomalies: [],
    predictions: {
      nextDay: 45,
      nextWeek: 350,
    },
  });
}

export async function POST(request: Request) {
  const { format } = await request.json();
  // Handle export request
  return NextResponse.json({
    url: `/exports/trends-${Date.now()}.${format}`,
    message: "Export completed",
  });
}
