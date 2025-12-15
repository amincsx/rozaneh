import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { getMockDatabaseStats } from '@/lib/mock-database';

export async function GET(request: NextRequest) {
  try {
    // Test MongoDB connection
    let mongoStatus = 'disconnected';
    let mongoError = null;
    
    try {
      const { db } = await connectToDatabase();
      if (db) {
        mongoStatus = 'connected';
      }
    } catch (error) {
      mongoError = error instanceof Error ? error.message : 'Unknown error';
    }

    // Get mock database stats
    const mockStats = getMockDatabaseStats();

    return NextResponse.json({
      mongodb: {
        status: mongoStatus,
        error: mongoError
      },
      mockDatabase: {
        isActive: mongoStatus === 'disconnected',
        stats: mockStats
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Database Status] Error:', error);
    return NextResponse.json(
      { error: 'خطا در بررسی وضعیت پایگاه داده' },
      { status: 500 }
    );
  }
}