import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password } = await request.json();

        console.log('[Register] Request:', { name, email, phone });

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'نام، ایمیل و رمز عبور الزامی است' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, message: 'رمز عبور باید حداقل 8 کاراکتر باشد' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'ایمیل نامعتبر است' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();
        if (!db) {
            console.error('[Register] Database connection failed');
            return NextResponse.json(
                { success: false, message: 'خطا در اتصال به پایگاه داده' },
                { status: 500 }
            );
        }

        console.log('[Register] Checking if user exists:', email);

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            console.log('[Register] User already exists:', email);
            return NextResponse.json(
                { success: false, message: 'کاربری با این ایمیل قبلا ثبت نام کرده است' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate user ID
        const user_id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const userData = {
            user_id,
            name,
            email,
            phone: phone || null,
            password_hash: hashedPassword,
            is_active: true,
            registration_date: new Date(),
            last_login: null,
            preferences: {},
            created_at: new Date(),
            updated_at: new Date(),
        };

        console.log('[Register] Creating user:', userData);

        // Create user in MongoDB
        const result = await db.collection('users').insertOne(userData);

        console.log('[Register] User created successfully:', user_id, 'MongoDB ID:', result.insertedId);

        return NextResponse.json(
            {
                success: true,
                message: 'ثبت نام با موفقیت انجام شد',
                user: {
                    user_id,
                    name,
                    email,
                    phone,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('[Register] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'خطا در ثبت نام',
            },
            { status: 500 }
        );
    }
}
