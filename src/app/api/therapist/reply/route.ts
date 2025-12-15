import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
    try {
        const { comment_id, reply } = await request.json();

        if (!comment_id || !reply) {
            return NextResponse.json(
                { success: false, message: 'شناسه نظر و پاسخ الزامی است' },
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

        const result = await db.collection('therapist_comments').updateOne(
            { _id: new ObjectId(comment_id) },
            {
                $set: {
                    reply,
                    status: 'replied',
                    replied_at: new Date(),
                    updated_at: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'نظر یافت نشد' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'پاسخ با موفقیت ارسال شد'
        });

    } catch (error) {
        console.error('[Reply API] Error:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در ارسال پاسخ' },
            { status: 500 }
        );
    }
}