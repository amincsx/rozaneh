import { NextRequest, NextResponse } from 'next/server'
import { generateOtp, normalizePhone, storeOtp } from '@/lib/otp'

const MELIPAYAMAK_OTP_TOKEN = process.env.MELIPAYAMAK_OTP_TOKEN || '2fb02a7a446d4301832cb4c27c247ca1'
const MELIPAYAMAK_SEND_URL = `https://console.melipayamak.com/api/send/otp/${MELIPAYAMAK_OTP_TOKEN}`

function extractOtpFromResponse(data: unknown): string | null {
    if (!data || typeof data !== 'object') {
        return null
    }

    const record = data as Record<string, unknown>
    const candidate = record.code ?? record.Code ?? record.otp ?? record.OTP

    if (typeof candidate === 'string' || typeof candidate === 'number') {
        return String(candidate)
    }

    return null
}

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber } = await request.json()
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
            await storeOtp(normalizedPhone, code)
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

        if (!response.ok) {
            console.error('[SendOtp] Melipayamak failed', response.status, responseText)
            return NextResponse.json({ success: false, message: 'خطا در ارسال کد پیامکی' }, { status: 502 })
        }

        const sentCode = extractOtpFromResponse(responseData)
        if (!sentCode) {
            console.error('[SendOtp] Melipayamak response missing OTP code:', responseText)
            return NextResponse.json({ success: false, message: 'خطا در ارسال کد پیامکی' }, { status: 502 })
        }

        await storeOtp(normalizedPhone, sentCode)

        return NextResponse.json({ success: true, message: 'کد تایید ارسال شد' })
    } catch (error) {
        console.error('[SendOtp] Error', error)
        return NextResponse.json({ success: false, message: 'خطا در ارسال کد' }, { status: 500 })
    }
}
