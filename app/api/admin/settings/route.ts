import { NextResponse } from "next/server";

export async function GET() {
  // Replace with actual database query
  const settings = {
    security: {
      mfaRequired: true,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
      },
      sessionTimeout: 30,
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
    },
  };

  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const data = await request.json();
  // Update settings in database
  return NextResponse.json({ message: "Settings updated" });
}
