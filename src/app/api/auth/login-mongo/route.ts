import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'ایمیل و رمز عبور الزامی است' },
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

        // Find user by email
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'ایمیل یا رمز عبور نادرست است' },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.is_active) {
            return NextResponse.json(
                { success: false, message: 'حساب کاربری غیرفعال است' },
                { status: 403 }
            );
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: 'ایمیل یا رمز عبور نادرست است' },
                { status: 401 }
            );
        }

        // Update last login
        await db.collection('users').updateOne(
            { user_id: user.user_id },
            { $set: { last_login: new Date(), updated_at: new Date() } }
        );

        console.log('[Login] User logged in:', user.user_id);

        return NextResponse.json(
            {
                success: true,
                message: 'ورود موفق',
                user: {
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('[Login] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'خطا در ورود',
            },
            { status: 500 }
        );
    }
}
