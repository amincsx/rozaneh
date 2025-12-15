import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function PUT(request: NextRequest) {
    try {
        const { therapist_id, name, email, phone, specializations, experience_years, bio, hourly_rate } = await request.json();

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

        const updateData: any = {
            updated_at: new Date()
        };

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (specializations) updateData.specializations = specializations;
        if (experience_years !== undefined) updateData.experience_years = experience_years;
        if (bio) updateData.bio = bio;
        if (hourly_rate !== undefined) updateData.hourly_rate = hourly_rate;

        const result = await db.collection('therapists').updateOne(
            { therapist_id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'درمانگر یافت نشد' },
                { status: 404 }
            );
        }

        // Get updated therapist data
        const updatedTherapist = await db.collection('therapists').findOne({ therapist_id });

        return NextResponse.json({
            success: true,
            message: 'پروفایل با موفقیت به‌روزرسانی شد',
            therapist: updatedTherapist
        });

    } catch (error) {
        console.error('[Profile Update API] Error:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در به‌روزرسانی پروفایل' },
            { status: 500 }
        );
    }
}

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

        const therapist = await db.collection('therapists').findOne({ therapist_id });

        if (!therapist) {
            return NextResponse.json(
                { success: false, message: 'درمانگر یافت نشد' },
                { status: 404 }
            );
        }

        // Remove sensitive data
        const { password_hash, ...safeTherapist } = therapist;

        return NextResponse.json({
            success: true,
            therapist: safeTherapist
        });

    } catch (error) {
        console.error('[Profile Get API] Error:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در دریافت پروفایل' },
            { status: 500 }
        );
    }
}