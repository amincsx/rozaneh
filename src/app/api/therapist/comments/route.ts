import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

// Get comments for a therapist
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const therapist_id = searchParams.get('therapist_id');

        if (!therapist_id) {
            return NextResponse.json(
                { success: false, message: 'شناسه درمانگر الزامی است' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        if (!db) {
            return NextResponse.json(
                { success: false, message: 'خطا در اتصال به پایگاه داده' },
                { status: 500 }
            );
        }

        const comments = await db.collection('therapist_comments')
            .find({ therapist_id })
            .sort({ created_at: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            comments
        });

    } catch (error) {
        console.error('[Comments API] Error:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در دریافت نظرات' },
            { status: 500 }
        );
    }
}

// Submit a new comment
export async function POST(request: NextRequest) {
    try {
        const { user_name, user_email, therapist_id, message } = await request.json();

        if (!user_name || !user_email || !therapist_id || !message) {
            return NextResponse.json(
                { success: false, message: 'تمام فیلدها الزامی است' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        if (!db) {
            return NextResponse.json(
                { success: false, message: 'خطا در اتصال به پایگاه داده' },
                { status: 500 }
            );
        }

        const commentData = {
            user_name,
            user_email,
            therapist_id,
            message,
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await db.collection('therapist_comments').insertOne(commentData);

        return NextResponse.json({
            success: true,
            message: 'نظر شما با موفقیت ارسال شد',
            comment_id: result.insertedId
        });

    } catch (error) {
        console.error('[Comments API] Error:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در ارسال نظر' },
            { status: 500 }
        );
    }
}