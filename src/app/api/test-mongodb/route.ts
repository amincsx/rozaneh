import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function GET(request: NextRequest) {
    try {
        console.log('[MongoDB Test] Starting connection test...');

        const startTime = Date.now();
        const { db, client } = await connectToDatabase();
        const connectionTime = Date.now() - startTime;

        if (!db) {
            return NextResponse.json({
                success: false,
                message: 'Database connection failed',
                connectionTime: `${connectionTime}ms`
            }, { status: 500 });
        }

        // Test database operations
        console.log('[MongoDB Test] Testing database operations...');

        // Test 1: Database stats
        const admin = db.admin();
        const dbStats = await db.stats();

        // Test 2: Collections list
        const collections = await db.listCollections().toArray();

        // Test 3: Simple insert/find test
        const testCollection = db.collection('connection_test');
        const testDoc = {
            test: true,
            timestamp: new Date(),
            message: 'Docker MongoDB connection test'
        };

        await testCollection.insertOne(testDoc);
        const foundDoc = await testCollection.findOne({ test: true });
        await testCollection.deleteOne({ test: true });

        console.log('[MongoDB Test] ✅ All tests passed!');

        return NextResponse.json({
            success: true,
            message: '🎉 MongoDB connection successful!',
            details: {
                connectionTime: `${connectionTime}ms`,
                database: db.databaseName,
                collections: collections.map((c: any) => c.name),
                dbStats: {
                    collections: dbStats.collections,
                    objects: dbStats.objects,
                    dataSize: dbStats.dataSize
                },
                testResult: foundDoc ? '✅ Read/Write test passed' : '❌ Read/Write test failed'
            }
        });

    } catch (error) {
        console.error('[MongoDB Test] Error:', error);
        return NextResponse.json({
            success: false,
            message: 'MongoDB connection failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace'
        }, { status: 500 });
    }
}