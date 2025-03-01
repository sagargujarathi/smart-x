import { NextResponse } from "next/server";

export async function GET() {
  // Replace with your actual database logic
  const users = [
    { id: "1", name: "Sampath", email: "sampathgujarathi123@.com", role: "USER" },
  ];

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const data = await request.json();
  // Handle user creation
  return NextResponse.json({ message: "User created" });
}
