export function isPhoneOnlyEmail(email: string | null | undefined): boolean {
    if (!email) return true

    const normalized = email.trim().toLowerCase()

    if (normalized.endsWith('@rozaneh.local')) return true
    if (normalized.startsWith('phone-')) return true
    if (/^0\d{10}$/.test(normalized)) return true
    if (/^9\d{9}$/.test(normalized)) return true

    return false
}

export function getDisplayEmail(email: string | null | undefined): string | null {
    if (!email || isPhoneOnlyEmail(email)) return null
    return email.trim()
}

export function getProfileMissingFields(user: {
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    birthDate?: Date | string | null
    date_of_birth?: string | null
    gender?: string | null
}): string[] {
    const missing: string[] = []

    if (!getDisplayEmail(user.email ?? undefined)) missing.push('email')
    if (!user.address && !user.city) missing.push('city')
    if (!user.address) missing.push('address')
    if (!user.birthDate && !user.date_of_birth) missing.push('date_of_birth')
    if (!user.gender) missing.push('gender')

    return missing
}

export function sanitizeStoredEmail(email: string | null | undefined): string | null {
    const display = getDisplayEmail(email)
    return display
}
