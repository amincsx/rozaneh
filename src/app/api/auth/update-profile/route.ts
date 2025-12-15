import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json() as {
            user_id: string;
            email: string;
            updates: Record<string, unknown>;
        };
        const { user_id, email, updates } = body;

        console.log('[UpdateProfile] Updating user:', { user_id, email, updates });

        if (!user_id && !email) {
            return NextResponse.json(
                { success: false, message: 'user_id یا email الزامی است' },
                { status: 400 }
            );
        }

        try {
            // Find user first
            let user;
            if (user_id) {
                user = await prisma.user.findUnique({
                    where: { id: user_id }
                });
            } else {
                user = await prisma.user.findUnique({
                    where: { email }
                });
            }

            if (!user) {
                return NextResponse.json(
                    { success: false, message: 'کاربر یافت نشد' },
                    { status: 404 }
                );
            }

            // Map form fields to database fields
            const fieldMapping: Record<string, string> = {
                'name': 'name',
                'phone': 'phone',
                'address': 'address',
                'date_of_birth': 'birthDate',
                'gender': 'gender',
                'city': 'address', // Map city to address for now
            };

            const updateData: Record<string, unknown> = {};

            for (const [formField, dbField] of Object.entries(fieldMapping)) {
                if (formField in updates) {
                    const value = updates[formField];

                    // Handle date conversion for birthDate
                    if (dbField === 'birthDate' && value) {
                        try {
                            // Value should be in YYYY-MM-DD format
                            const dateStr = value as string;
                            const [year, month, day] = dateStr.split('-').map(Number);
                            updateData[dbField] = new Date(year, month - 1, day);
                        } catch (e) {
                            console.error('[UpdateProfile] Date parsing error:', e);
                            continue;
                        }
                    } else if (dbField === 'gender' && value) {
                        // Convert gender to uppercase enum value (MALE, FEMALE, OTHER)
                        const genderValue = String(value).toUpperCase();
                        if (['MALE', 'FEMALE', 'OTHER'].includes(genderValue)) {
                            updateData[dbField] = genderValue;
                        }
                    } else if (value !== undefined && value !== null && value !== '') {
                        updateData[dbField] = value;
                    }
                }
            }

            // Update user profile
            console.log('[UpdateProfile] Updating fields:', Object.keys(updateData));

            const updatedUser = await prisma.user.update({
                where: { id: user.id },
                data: updateData
            });

            console.log('[UpdateProfile] User updated successfully');

            // Don't send password to client
            const { password, ...userWithoutPassword } = updatedUser;

            return NextResponse.json({
                success: true,
                message: 'پروفایل با موفقیت به‌روز شد',
                user: {
                    user_id: updatedUser.id,
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    address: updatedUser.address,
                    city: updatedUser.address,
                    date_of_birth: updatedUser.birthDate ? updatedUser.birthDate.toISOString().split('T')[0] : null,
                    gender: updatedUser.gender,
                    registration_date: updatedUser.createdAt,
                    role: updatedUser.role,
                }
            });
        } catch (error) {
            console.error('[UpdateProfile] Database error:', error);
            return NextResponse.json(
                { success: false, message: 'خطا در اتصال به پایگاه داده: ' + (error instanceof Error ? error.message : 'نامشخص') },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('[UpdateProfile] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'خطای نامشخص',
            },
            { status: 500 }
        );
    }
}