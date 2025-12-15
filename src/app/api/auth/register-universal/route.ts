import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    console.log('[UniversalRegister] REGISTRATION REQUEST STARTED');

    try {
        console.log('[UniversalRegister] Parsing request body');
        const { name, email, phone, password } = await request.json();
        console.log('[UniversalRegister] Body parsed successfully - Users only');

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

        // Check if user email already exists
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: 'کاربری با این ایمیل قبلا ثبت نام کرده است' },
                    { status: 400 }
                );
            }
        } catch (error) {
            console.error('[UniversalRegister] Database query failed:', error);
            return NextResponse.json(
                {
                    success: false,
                    message: 'خطا در اتصال به پایگاه داده - لطفا دوباره تلاش کنید'
                },
                { status: 503 }
            );
        }

        // Hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        console.log('[UniversalRegister] Creating user:', email);
        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    phone: phone || null,
                    password: hashedPassword,
                    role: 'PATIENT'
                }
            });

            console.log('[UniversalRegister] ✓ User created successfully:', newUser.id);

            // Return user without password
            const { password: _, ...userWithoutPassword } = newUser;

            return NextResponse.json(
                {
                    success: true,
                    message: 'ثبت نام با موفقیت انجام شد',
                    user: {
                        ...userWithoutPassword,
                        user_id: newUser.id,
                        userType: 'user'
                    }
                },
                { status: 201 }
            );
        } catch (createError) {
            console.error('[UniversalRegister] User creation failed:', createError);
            return NextResponse.json(
                {
                    success: false,
                    message: 'خطا در ایجاد حساب کاربری'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('[UniversalRegister] Unexpected error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'خطایی پیش آمد - لطفا دوباره تلاش کنید'
            },
            { status: 500 }
        );
    }
}