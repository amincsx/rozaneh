type ConsultationTelegramPayload = {
    name: string
    age: number
    phone: string
    problem: string
    callType: 'now' | 'scheduled'
    scheduledAt?: Date | null
    source: string
}

function escapeHtml(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

export async function sendConsultationToTelegram(payload: ConsultationTelegramPayload) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
        console.warn('[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured')
        return { ok: false, skipped: true }
    }

    const callTimeText = payload.callType === 'now'
        ? 'همین الان (در ساعات کاری)'
        : payload.scheduledAt
            ? new Intl.DateTimeFormat('fa-IR', {
                timeZone: 'Asia/Tehran',
                dateStyle: 'full',
                timeStyle: 'short',
                hour12: false,
            }).format(payload.scheduledAt)
            : 'زمان نامشخص'

    const sourceLabel = payload.source === 'booking' ? 'رزرو مشاوره' : 'مشاوره فوری'

    const message = [
        '<b>📞 درخواست مشاوره جدید</b>',
        '',
        `<b>نام:</b> ${escapeHtml(payload.name)}`,
        `<b>سن:</b> ${payload.age}`,
        `<b>شماره:</b> ${escapeHtml(payload.phone)}`,
        `<b>مشکل:</b> ${escapeHtml(payload.problem)}`,
        `<b>زمان تماس:</b> ${escapeHtml(callTimeText)}`,
        `<b>منبع:</b> ${escapeHtml(sourceLabel)}`,
        `<b>ثبت:</b> ${escapeHtml(new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' }))}`,
    ].join('\n')

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
        }),
    })

    if (!response.ok) {
        const errorBody = await response.text().catch(() => '')
        console.error('[Telegram] sendMessage failed', response.status, errorBody)
        return { ok: false, skipped: false }
    }

    return { ok: true, skipped: false }
}
