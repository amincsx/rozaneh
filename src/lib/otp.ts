import { prisma } from '@/lib/prisma'

const OTP_TTL_MS = 5 * 60 * 1000 // 5 minutes
const MAX_VERIFY_ATTEMPTS = 5
const OTP_IDENTIFIER_PREFIX = 'otp:'

const attemptStore = new Map<string, number>()

export function normalizePhone(phone: string) {
    const digits = phone.toString().replace(/\D/g, '')

    if (!digits) {
        return ''
    }

    if (digits.startsWith('98')) {
        return `0${digits.slice(2)}`
    }

    if (digits.startsWith('0')) {
        return digits.slice(0, 11)
    }

    return `0${digits.slice(-10)}`
}

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

function otpIdentifier(normalizedPhone: string) {
    return `${OTP_IDENTIFIER_PREFIX}${normalizedPhone}`
}

export async function storeOtp(phone: string, code: string) {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)
    const expires = new Date(Date.now() + OTP_TTL_MS)

    await prisma.verificationToken.deleteMany({
        where: { identifier },
    })

    await prisma.verificationToken.create({
        data: {
            identifier,
            token: code,
            expires,
        },
    })

    attemptStore.delete(normalizedPhone)
}

export async function verifyOtp(phone: string, otp: string) {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)

    const entry = await prisma.verificationToken.findFirst({
        where: { identifier },
        orderBy: { expires: 'desc' },
    })

    if (!entry) {
        return { valid: false, reason: 'کد ارسال نشده است' }
    }

    if (entry.expires.getTime() <= Date.now()) {
        await prisma.verificationToken.deleteMany({ where: { identifier } })
        attemptStore.delete(normalizedPhone)
        return { valid: false, reason: 'کد منقضی شده است' }
    }

    const attempts = attemptStore.get(normalizedPhone) ?? 0
    if (attempts >= MAX_VERIFY_ATTEMPTS) {
        await prisma.verificationToken.deleteMany({ where: { identifier } })
        attemptStore.delete(normalizedPhone)
        return { valid: false, reason: 'تعداد تلاش‌ها بیش از حد مجاز است' }
    }

    if (entry.token !== otp) {
        attemptStore.set(normalizedPhone, attempts + 1)
        return { valid: false, reason: 'کد تایید اشتباه است' }
    }

    await prisma.verificationToken.deleteMany({ where: { identifier } })
    attemptStore.delete(normalizedPhone)
    return { valid: true }
}

export async function getStoredOtp(phone: string) {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)

    return prisma.verificationToken.findFirst({
        where: { identifier },
        orderBy: { expires: 'desc' },
    })
}

export async function cleanupExpiredOtps() {
    await prisma.verificationToken.deleteMany({
        where: {
            identifier: { startsWith: OTP_IDENTIFIER_PREFIX },
            expires: { lte: new Date() },
        },
    })
}
