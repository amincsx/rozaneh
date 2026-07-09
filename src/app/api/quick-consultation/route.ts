import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { consumeVerifiedOtpSession, normalizePhone, verifyOtp } from '@/lib/otp'
import { sendConsultationToTelegram } from '@/lib/telegram'
import {
    buildScheduledDateTime,
    isCallNowAvailable,
    isFutureScheduledTime,
} from '@/lib/working-hours'

type FallbackConsultationRecord = {
    id: string
    name: string
    age: number
    phone: string
    problem: string
    callType: 'now' | 'scheduled'
    scheduledAt: Date | null
    source: 'quick' | 'booking'
    createdAt: Date
}

const fallbackConsultationStore: FallbackConsultationRecord[] = []

export async function GET() {
    return NextResponse.json({
        success: true,
        callNowAvailable: isCallNowAvailable(),
        workingHours: '۹ صبح تا ۹ شب (به جز سه‌شنبه)',
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            name,
            age,
            phone,
            phoneNumber,
            problem,
            callType,
            scheduledDate,
            scheduledTime,
            otp,
            otpVerifiedToken,
            source = 'quick',
        } = body

        const rawPhone = phone || phoneNumber
        const normalizedPhone = normalizePhone(String(rawPhone || ''))

        if (!name?.trim()) {
            return NextResponse.json({ success: false, message: 'نام الزامی است' }, { status: 400 })
        }

        const parsedAge = Number(age)
        if (!parsedAge || parsedAge < 1 || parsedAge > 120) {
            return NextResponse.json({ success: false, message: 'سن معتبر وارد کنید' }, { status: 400 })
        }

        if (!/^0\d{10}$/.test(normalizedPhone)) {
            return NextResponse.json({ success: false, message: 'شماره تلفن معتبر وارد کنید' }, { status: 400 })
        }

        if (!problem?.trim() || problem.trim().length < 10) {
            return NextResponse.json({ success: false, message: 'لطفا مشکل خود را با جزئیات بیشتر بنویسید' }, { status: 400 })
        }

        const verifiedToken = typeof otpVerifiedToken === 'string' ? otpVerifiedToken : ''
        if (verifiedToken) {
            const isVerified = consumeVerifiedOtpSession(verifiedToken, normalizedPhone, 'consultation')
            if (!isVerified) {
                return NextResponse.json({ success: false, message: 'اعتبار کد تایید به پایان رسیده است' }, { status: 400 })
            }
        } else {
            if (!otp || !String(otp).trim()) {
                return NextResponse.json({ success: false, message: 'کد تایید الزامی است' }, { status: 400 })
            }

            const otpResult = await verifyOtp(normalizedPhone, String(otp).trim(), 'consultation')
            if (!otpResult.valid) {
                return NextResponse.json({ success: false, message: otpResult.reason }, { status: 400 })
            }
        }

        if (callType !== 'now' && callType !== 'scheduled') {
            return NextResponse.json({ success: false, message: 'نوع زمان تماس نامعتبر است' }, { status: 400 })
        }

        let scheduledAt: Date | null = null

        if (callType === 'now') {
            if (!isCallNowAvailable()) {
                return NextResponse.json(
                    { success: false, message: 'تماس فوری فقط در ساعات کاری (۹ صبح تا ۹ شب، غیر از سه‌شنبه) امکان‌پذیر است' },
                    { status: 400 }
                )
            }
        } else {
            scheduledAt = buildScheduledDateTime(String(scheduledDate), String(scheduledTime))
            if (!scheduledAt) {
                return NextResponse.json(
                    { success: false, message: 'زمان انتخاب‌شده معتبر نیست. فقط ۹ صبح تا ۹ شب و غیر از سه‌شنبه' },
                    { status: 400 }
                )
            }
            if (!isFutureScheduledTime(scheduledAt)) {
                return NextResponse.json(
                    { success: false, message: 'زمان انتخاب‌شده باید در آینده باشد' },
                    { status: 400 }
                )
            }
        }

        let record: FallbackConsultationRecord | null = null

        try {
            const created = await prisma.consultationRequest.create({
                data: {
                    name: name.trim(),
                    age: parsedAge,
                    phone: normalizedPhone,
                    problem: problem.trim(),
                    callType,
                    scheduledAt,
                    source: source === 'booking' ? 'booking' : 'quick',
                },
            })

            record = {
                id: created.id,
                name: created.name,
                age: created.age,
                phone: created.phone,
                problem: created.problem,
                callType: created.callType as 'now' | 'scheduled',
                scheduledAt: created.scheduledAt,
                source: created.source as 'quick' | 'booking',
                createdAt: created.createdAt,
            }
        } catch (dbError) {
            console.warn('[QuickConsultation] Prisma save failed, using in-memory fallback', dbError)
            const fallbackRecord: FallbackConsultationRecord = {
                id: `fallback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: name.trim(),
                age: parsedAge,
                phone: normalizedPhone,
                problem: problem.trim(),
                callType: callType as 'now' | 'scheduled',
                scheduledAt,
                source: source === 'booking' ? 'booking' : 'quick',
                createdAt: new Date(),
            }
            fallbackConsultationStore.push(fallbackRecord)
            record = fallbackRecord
        }

        let telegramResult = { ok: false, skipped: true }
        try {
            telegramResult = await sendConsultationToTelegram({
                name: record.name,
                age: record.age,
                phone: record.phone,
                problem: record.problem,
                callType: callType as 'now' | 'scheduled',
                scheduledAt: record.scheduledAt,
                source: record.source,
            })
        } catch (telegramError) {
            console.warn('[QuickConsultation] Telegram notification failed', telegramError)
        }

        return NextResponse.json({
            success: true,
            message: 'درخواست شما ثبت شد. به زودی با شما تماس می‌گیریم',
            id: record.id,
            telegramSent: telegramResult.ok,
            storedIn: record.id.startsWith('fallback-') ? 'fallback-memory' : 'database',
        })
    } catch (error) {
        console.error('[QuickConsultation] Error', error)
        return NextResponse.json(
            { success: false, message: 'خطا در ثبت درخواست. لطفا دوباره تلاش کنید' },
            { status: 500 }
        )
    }
}
