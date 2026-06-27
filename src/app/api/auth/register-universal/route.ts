import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizePhone } from '@/lib/otp';
import { getDisplayEmail } from '@/lib/user-display';

export async function POST(request: NextRequest) {
    console.log('[UniversalRegister] REGISTRATION REQUEST STARTED');

    try {
        console.log('[UniversalRegister] Parsing request body');
        const { name, phone, userType } = await request.json();
        console.log('[UniversalRegister] Body parsed successfully - phone-only signup');

        if (!name || !phone) {
            return NextResponse.json(
                { success: false, message: 'نام و شماره تلفن الزامی است' },
                { status: 400 }
            );
        }

        const normalizedPhone = normalizePhone(phone);
        if (!/^0\d{10}$/.test(normalizedPhone)) {
            return NextResponse.json(
                { success: false, message: 'شماره تلفن باید 11 رقمی با 0 شروع شود' },
                { status: 400 }
            );
        }

        try {
            const existingUser = await prisma.user.findFirst({
                where: { phone: normalizedPhone }
            });

            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: 'شماره تلفن قبلا ثبت شده است' },
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

        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email: normalizedPhone,
                    phone: normalizedPhone,
                    role: userType === 'therapist' ? 'THERAPIST' : 'PATIENT'
                }
            });

            console.log('[UniversalRegister] ✓ User created successfully:', newUser.id);

            const { password: _, ...userWithoutPassword } = newUser;

            return NextResponse.json(
                {
                    success: true,
                    message: 'ثبت نام با موفقیت انجام شد',
                    user: {
                        ...userWithoutPassword,
                        email: getDisplayEmail(newUser.email),
                        user_id: newUser.id,
                        userType: userType === 'therapist' ? 'therapist' : 'user'
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