import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with actual database query
  const anomalies = [
    {
      id: '1',
      title: 'Unusual Water Usage',
      description: 'Detected 50% higher water consumption than normal',
      severity: 'high',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Electricity Spike',
      description: 'Sudden increase in electricity usage detected',
      severity: 'medium',
      status: 'active',
      createdAt: new Date().toISOString(),
    }
  ];

  return NextResponse.json(anomalies);
}

export async function PUT(request: Request) {
  const data = await request.json();
  // Handle anomaly update
  return NextResponse.json({ message: 'Anomaly updated' });
}
