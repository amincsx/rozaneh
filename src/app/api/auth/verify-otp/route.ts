import { NextRequest, NextResponse } from 'next/server'
import { normalizePhone, verifyOtp } from '@/lib/otp'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { getDisplayEmail } from '@/lib/user-display'

function mapRoleToUserType(role: UserRole): string {
    if (role === 'THERAPIST') return 'therapist'
    if (role === 'ADMIN') return 'employee'
    return 'user'
}

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber, otp, mode } = await request.json()

        if (!phoneNumber || !otp) {
            return NextResponse.json({ success: false, message: 'شماره تلفن و کد تایید الزامی است' }, { status: 400 })
        }

        const normalizedPhone = normalizePhone(phoneNumber)
        if (!/^0\d{10}$/.test(normalizedPhone)) {
            return NextResponse.json({ success: false, message: 'شماره تلفن باید 11 رقمی با 0 شروع شود' }, { status: 400 })
        }

        const otpResult = await verifyOtp(normalizedPhone, String(otp).trim())
        if (!otpResult.valid) {
            return NextResponse.json({ success: false, message: otpResult.reason }, { status: 400 })
        }

        if (mode === 'login') {
            const user = await prisma.user.findFirst({
                where: { phone: normalizedPhone },
            })

            if (!user) {
                return NextResponse.json(
                    { success: false, message: 'حسابی با این شماره ثبت نشده است. لطفا ابتدا ثبت نام کنید' },
                    { status: 404 }
                )
            }

            return NextResponse.json({
                success: true,
                message: 'ورود با موفقیت انجام شد',
                user: {
                    user_id: user.id,
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    email: getDisplayEmail(user.email),
                    role: user.role,
                    userType: mapRoleToUserType(user.role),
                },
            })
        }

        if (mode === 'signup') {
            const existingUser = await prisma.user.findFirst({
                where: { phone: normalizedPhone },
            })

            if (existingUser) {
                return NextResponse.json(
                    { success: false, message: 'این شماره قبلا ثبت شده است. لطفا وارد شوید' },
                    { status: 409 }
                )
            }
        }

        return NextResponse.json({
            success: true,
            message: 'شماره تلفن تایید شد',
            verified: true,
        })
    } catch (error) {
        console.error('[VerifyOtp] Error', error)
        return NextResponse.json({ success: false, message: 'خطا در تایید کد' }, { status: 500 })
    }
}
