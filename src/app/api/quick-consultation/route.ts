import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { normalizePhone } from '@/lib/otp'
import { sendConsultationToTelegram } from '@/lib/telegram'
import {
    buildScheduledDateTime,
    isCallNowAvailable,
    isFutureScheduledTime,
} from '@/lib/working-hours'

export async function GET() {
    return NextResponse.json({
        success: true,
        callNowAvailable: isCallNowAvailable(),
        workingHours: '۹ تا ۱۷ (به جز جمعه)',
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

        if (callType !== 'now' && callType !== 'scheduled') {
            return NextResponse.json({ success: false, message: 'نوع زمان تماس نامعتبر است' }, { status: 400 })
        }

        let scheduledAt: Date | null = null

        if (callType === 'now') {
            if (!isCallNowAvailable()) {
                return NextResponse.json(
                    { success: false, message: 'تماس فوری فقط در ساعات کاری (۹ تا ۱۷، غیر از جمعه) امکان‌پذیر است' },
                    { status: 400 }
                )
            }
        } else {
            scheduledAt = buildScheduledDateTime(String(scheduledDate), String(scheduledTime))
            if (!scheduledAt) {
                return NextResponse.json(
                    { success: false, message: 'زمان انتخاب‌شده معتبر نیست. فقط ۹ تا ۱۷ و غیر از جمعه' },
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

        const record = await prisma.consultationRequest.create({
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

        const telegramResult = await sendConsultationToTelegram({
            name: record.name,
            age: record.age,
            phone: record.phone,
            problem: record.problem,
            callType: callType as 'now' | 'scheduled',
            scheduledAt: record.scheduledAt,
            source: record.source,
        })

        return NextResponse.json({
            success: true,
            message: 'درخواست شما ثبت شد. به زودی با شما تماس می‌گیریم',
            id: record.id,
            telegramSent: telegramResult.ok,
        })
    } catch (error) {
        console.error('[QuickConsultation] Error', error)
        return NextResponse.json(
            { success: false, message: 'خطا در ثبت درخواست. لطفا دوباره تلاش کنید' },
            { status: 500 }
        )
    }
}
