import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        console.log('[UniversalLogin] Login attempt for:', email);

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'ایمیل و رمز عبور الزامی است' },
                { status: 400 }
            );
        }

        try {
            // Find user in PostgreSQL
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                console.log('[UniversalLogin] User not found:', email);
                return NextResponse.json(
                    { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
                    { status: 401 }
                );
            }

            // Check password
            if (!user.password) {
                return NextResponse.json(
                    { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
                    { status: 401 }
                );
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('[UniversalLogin] Invalid password for:', email);
                return NextResponse.json(
                    { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
                    { status: 401 }
                );
            }

            console.log('[UniversalLogin] Login successful for:', email);

            return NextResponse.json(
                {
                    success: true,
                    message: 'ورود با موفقیت انجام شد',
                    user: {
                        user_id: user.id,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        userType: 'user',
                    },
                },
                { status: 200 }
            );
        } catch (dbError) {
            console.error('[UniversalLogin] Database error:', dbError);
            return NextResponse.json(
                { success: false, message: 'خطا در اتصال به پایگاه داده' },
                { status: 503 }
            );
        }
    } catch (error) {
        console.error('[UniversalLogin] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'خطا در ورود',
            },
            { status: 500 }
        );
    }
}