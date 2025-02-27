import { NextResponse } from 'next/server';

const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "John Doe",
    role: "ADMIN"
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Jane Smith",
    role: "RESIDENT"
  }
];

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { password: _, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}
