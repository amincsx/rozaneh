import { NextRequest, NextResponse } from 'next/server'
import { generateOtp, normalizePhone, storeOtp } from '@/lib/otp'

const MELIPAYAMAK_OTP_TOKEN = process.env.MELIPAYAMAK_OTP_TOKEN || '2fb02a7a446d4301832cb4c27c247ca1'
const MELIPAYAMAK_SEND_URL = `https://console.melipayamak.com/api/send/otp/${MELIPAYAMAK_OTP_TOKEN}`

function extractOtpFromResponse(data: unknown): string | null {
    if (typeof data === 'string' || typeof data === 'number') {
        const match = String(data).match(/\b\d{4,6}\b/)
        return match ? match[0] : null
    }

    if (!data || typeof data !== 'object') {
        return null
    }

    const record = data as Record<string, unknown>
    const directKeys = ['code', 'Code', 'otp', 'OTP', 'token', 'Token', 'verificationCode', 'verification_code']

    for (const key of directKeys) {
        const value = record[key]
        if (typeof value === 'string' || typeof value === 'number') {
            const match = String(value).match(/\b\d{4,6}\b/)
            if (match) {
                return match[0]
            }
        }
    }

    for (const value of Object.values(record)) {
        const nested = extractOtpFromResponse(value)
        if (nested) {
            return nested
        }
    }

    return null
}

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber, mode = 'login' } = await request.json()
        if (!phoneNumber) {
            return NextResponse.json({ success: false, message: 'شماره تلفن الزامی است' }, { status: 400 })
        }

        const normalizedPhone = normalizePhone(phoneNumber)
        if (!/^0\d{10}$/.test(normalizedPhone)) {
            return NextResponse.json({ success: false, message: 'شماره تلفن باید 11 رقمی با 0 شروع شود' }, { status: 400 })
        }

        const devMode = process.env.OTP_DEV_MODE === 'true'

        if (devMode) {
            const code = generateOtp()
            await storeOtp(normalizedPhone, code, mode === 'consultation' ? 'consultation' : 'login')
            console.log(`[SendOtp] DEV mode — OTP for ${normalizedPhone}: ${code}`)
            return NextResponse.json({ success: true, message: 'کد تایید ارسال شد' })
        }

        const response = await fetch(MELIPAYAMAK_SEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: normalizedPhone }),
        })

        const responseText = await response.text()
        let responseData: unknown = null

        try {
            responseData = JSON.parse(responseText)
        } catch {
            responseData = null
        }

        const sentCode = extractOtpFromResponse(responseData) ?? extractOtpFromResponse(responseText)
        const isSuccessResponse = response.ok || !!sentCode || /success|ok|sent|ارسال|موفق/i.test(responseText)

        if (!isSuccessResponse) {
            console.error('[SendOtp] Melipayamak failed', response.status, responseText)
            return NextResponse.json({ success: false, message: 'خطا در ارسال کد پیامکی' }, { status: 502 })
        }

        if (!sentCode) {
            console.warn('[SendOtp] Melipayamak response did not include OTP code; using fallback code for local verification', responseText)
        }

        const finalCode = sentCode || generateOtp()
        await storeOtp(normalizedPhone, finalCode, mode === 'consultation' ? 'consultation' : 'login')

        return NextResponse.json({ success: true, message: 'کد تایید ارسال شد' })
    } catch (error) {
        console.error('[SendOtp] Error', error)
        return NextResponse.json({ success: false, message: 'خطا در ارسال کد' }, { status: 500 })
    }
}
