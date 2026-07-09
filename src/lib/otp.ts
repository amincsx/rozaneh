const OTP_TTL_MS = 5 * 60 * 1000 // 5 minutes
const MAX_VERIFY_ATTEMPTS = 5
const OTP_IDENTIFIER_PREFIX = 'otp:'

type OtpStoreEntry = {
    token: string
    expires: Date
}

type VerifiedOtpSession = {
    phone: string
    mode: 'login' | 'consultation'
    expires: Date
}

type GlobalOtpStore = {
    attemptStore: Map<string, number>
    memoryOtpStore: Map<string, OtpStoreEntry>
    consultationOtpStore: Map<string, OtpStoreEntry>
    verifiedOtpSessions: Map<string, VerifiedOtpSession>
}

const globalOtpStore = ((globalThis as typeof globalThis & {
    __rozanehOtpStore?: GlobalOtpStore
}).__rozanehOtpStore ??= {
    attemptStore: new Map<string, number>(),
    memoryOtpStore: new Map<string, OtpStoreEntry>(),
    consultationOtpStore: new Map<string, OtpStoreEntry>(),
    verifiedOtpSessions: new Map<string, VerifiedOtpSession>(),
})

const attemptStore = globalOtpStore.attemptStore
const memoryOtpStore = globalOtpStore.memoryOtpStore
const consultationOtpStore = globalOtpStore.consultationOtpStore
const verifiedOtpSessions = globalOtpStore.verifiedOtpSessions

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

function getMemoryOtp(identifier: string) {
    const entry = memoryOtpStore.get(identifier)
    if (!entry) return null

    if (entry.expires.getTime() <= Date.now()) {
        memoryOtpStore.delete(identifier)
        return null
    }

    return entry
}

function setMemoryOtp(identifier: string, token: string, expires: Date) {
    memoryOtpStore.set(identifier, { token, expires })
}

function clearMemoryOtp(identifier: string) {
    memoryOtpStore.delete(identifier)
}

function getConsultationOtp(phone: string) {
    const normalizedPhone = normalizePhone(phone)
    const entry = consultationOtpStore.get(normalizedPhone)
    if (!entry) return null

    if (entry.expires.getTime() <= Date.now()) {
        consultationOtpStore.delete(normalizedPhone)
        return null
    }

    return entry
}

function setConsultationOtp(phone: string, token: string, expires: Date) {
    consultationOtpStore.set(normalizePhone(phone), { token, expires })
}

function clearConsultationOtp(phone: string) {
    consultationOtpStore.delete(normalizePhone(phone))
}

function createVerifiedOtpSession(phone: string, mode: 'login' | 'consultation') {
    const normalizedPhone = normalizePhone(phone)
    const token = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    const expires = new Date(Date.now() + OTP_TTL_MS)

    verifiedOtpSessions.set(token, { phone: normalizedPhone, mode, expires })
    return { token, expires }
}

export function consumeVerifiedOtpSession(token: string, phone: string, mode: 'login' | 'consultation') {
    const normalizedPhone = normalizePhone(phone)
    const entry = verifiedOtpSessions.get(token)

    if (!entry) return false
    if (entry.phone !== normalizedPhone || entry.mode !== mode || entry.expires.getTime() <= Date.now()) {
        verifiedOtpSessions.delete(token)
        return false
    }

    verifiedOtpSessions.delete(token)
    return true
}

async function persistOtp(identifier: string, token: string, expires: Date, mode: 'login' | 'consultation') {
    setMemoryOtp(identifier, token, expires)

    if (mode === 'consultation') {
        setConsultationOtp(identifier, token, expires)
    }
}

async function findOtpEntry(identifier: string, mode: 'login' | 'consultation') {
    const memoryEntry = getMemoryOtp(identifier)
    if (memoryEntry) {
        return { token: memoryEntry.token, expires: memoryEntry.expires, source: 'memory' as const }
    }

    if (mode === 'consultation') {
        const consultationEntry = getConsultationOtp(identifier)
        if (consultationEntry) {
            return { token: consultationEntry.token, expires: consultationEntry.expires, source: 'consultation' as const }
        }
    }

    return null
}

export async function storeOtp(phone: string, code: string, mode: 'login' | 'consultation' = 'login') {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)
    const expires = new Date(Date.now() + OTP_TTL_MS)

    setMemoryOtp(identifier, code, expires)
    if (mode === 'consultation') {
        setConsultationOtp(normalizedPhone, code, expires)
    }
    await persistOtp(identifier, code, expires, mode)

    attemptStore.delete(normalizedPhone)
}

export async function verifyOtp(phone: string, otp: string, mode: 'login' | 'consultation' = 'login') {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)

    const entry = await findOtpEntry(identifier, mode)

    if (!entry) {
        return { valid: false, reason: 'کد ارسال نشده است' }
    }

    if (entry.expires.getTime() <= Date.now()) {
        clearMemoryOtp(identifier)
        attemptStore.delete(normalizedPhone)
        return { valid: false, reason: 'کد منقضی شده است' }
    }

    const attempts = attemptStore.get(normalizedPhone) ?? 0
    if (attempts >= MAX_VERIFY_ATTEMPTS) {
        clearMemoryOtp(identifier)
        attemptStore.delete(normalizedPhone)
        return { valid: false, reason: 'تعداد تلاش‌ها بیش از حد مجاز است' }
    }

    if (entry.token !== otp) {
        attemptStore.set(normalizedPhone, attempts + 1)
        return { valid: false, reason: 'کد تایید اشتباه است' }
    }

    clearMemoryOtp(identifier)
    if (mode === 'consultation') {
        clearConsultationOtp(normalizedPhone)
    }
    attemptStore.delete(normalizedPhone)

    const verifiedSession = createVerifiedOtpSession(normalizedPhone, mode)
    return { valid: true, verifiedToken: verifiedSession.token }
}

export async function getStoredOtp(phone: string, mode: 'login' | 'consultation' = 'login') {
    const normalizedPhone = normalizePhone(phone)
    const identifier = otpIdentifier(normalizedPhone)

    const memoryEntry = getMemoryOtp(identifier)
    if (memoryEntry) {
        return { token: memoryEntry.token, expires: memoryEntry.expires }
    }

    if (mode === 'consultation') {
        return null
    }

    return null
}

export async function cleanupExpiredOtps() {
    memoryOtpStore.clear()
}
