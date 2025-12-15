import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log('[Therapists API] POST request received');

        const { db } = await connectToDatabase();
        if (!db) throw new Error('Database connection failed');

        const therapistData = await request.json();

        const therapistRecord = {
            therapist_id: `therapist_${Date.now()}`,
            name: therapistData.name || 'Test Therapist',
            email: therapistData.email || 'test@example.com',
            phone: therapistData.phone || '09123456789',
            specializations: therapistData.specializations || ['مشاوره فردی'],
            experience_years: therapistData.experience_years || 5,
            bio: therapistData.bio || 'Test biography',
            languages: ['فارسی', 'English'],
            rating: therapistData.rating || 4.5,
            hourly_rate: therapistData.hourly_rate || 300000,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        };

        console.log('[Therapists API] Inserting:', therapistRecord);

        const result = await db.collection('therapists').insertOne(therapistRecord);

        console.log('[Therapists API] ✓ Inserted with ID:', result.insertedId);

        return NextResponse.json({
            success: true,
            message: 'Therapist added to MongoDB app2.therapists',
            insertedId: result.insertedId,
            data: therapistRecord,
        });
    } catch (error) {
        console.error('[Therapists API] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        console.log('[Therapists API] GET request received');

        const { db } = await connectToDatabase();
        if (!db) throw new Error('Database connection failed');

        const therapists = await db.collection('therapists').find({}).toArray();

        console.log('[Therapists API] ✓ Found', therapists.length, 'therapists');

        return NextResponse.json({
            success: true,
            message: 'Retrieved all therapists from MongoDB app2.therapists',
            count: therapists.length,
            data: therapists,
        });
    } catch (error) {
        console.error('[Therapists API] Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
