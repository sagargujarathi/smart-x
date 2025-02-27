import { NextResponse } from 'next/server';

const MOCK_USER = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "ADMIN"
};

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would validate the session/token here
  return NextResponse.json(MOCK_USER);
}
