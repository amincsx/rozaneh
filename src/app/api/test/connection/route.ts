/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDatabase from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[Test API] Attempting connection...');

    const { client, db } = await connectToDatabase();

    if (!client || !db) {
      return NextResponse.json(
        { success: false, error: 'Failed to get client or database' },
        { status: 500 }
      );
    }

    console.log('[Test API] Connection successful');
    console.log('[Test API] Database name:', db.databaseName);

    // Try to get admin stats
    const stats = await db.admin().listDatabases();
    console.log('[Test API] Databases:', stats.databases.map((d: any) => d.name));

    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB',
      databaseName: db.databaseName,
      databases: stats.databases.map((d: any) => d.name),
    });
  } catch (error) {
    console.error('[Test API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
