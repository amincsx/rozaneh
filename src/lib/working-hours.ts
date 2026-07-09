export const WORK_TIMEZONE = 'Asia/Tehran'
export const WORK_START_HOUR = 9
export const WORK_END_HOUR = 21

export const WORK_TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
]

type TehranParts = {
    year: number
    month: number
    day: number
    hour: number
    minute: number
    weekday: number
}

export function getTehranParts(date = new Date()): TehranParts {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: WORK_TIMEZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        weekday: 'short',
    })

    const parts = formatter.formatToParts(date)
    const get = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((part) => part.type === type)?.value ?? 0)

    const weekdayMap: Record<string, number> = {
        Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    }
    const weekdayLabel = parts.find((part) => part.type === 'weekday')?.value ?? 'Mon'

    return {
        year: get('year'),
        month: get('month'),
        day: get('day'),
        hour: get('hour') % 24,
        minute: get('minute'),
        weekday: weekdayMap[weekdayLabel] ?? 1,
    }
}

export function isWeeklyOff(date = new Date()) {
    return getTehranParts(date).weekday === 2
}

export function isWithinWorkingHours(date = new Date()) {
    const { hour, weekday } = getTehranParts(date)
    if (weekday === 2) return false
    return hour >= WORK_START_HOUR && hour < WORK_END_HOUR
}

export function isCallNowAvailable(date = new Date()) {
    return isWithinWorkingHours(date)
}

export function isValidWorkTimeSlot(time: string) {
    return WORK_TIME_SLOTS.includes(time)
}

export function getAvailableWorkTimeSlots(date?: string) {
    if (!date) return WORK_TIME_SLOTS

    const [year, month, day] = date.split('-').map(Number)
    const today = getTehranParts()

    if (year !== today.year || month !== today.month || day !== today.day) {
        return WORK_TIME_SLOTS
    }

    const currentMinutes = today.hour * 60 + today.minute

    return WORK_TIME_SLOTS.filter((time) => {
        const [hour, minute] = time.split(':').map(Number)
        const slotMinutes = hour * 60 + minute
        return slotMinutes > currentMinutes
    })
}

export function buildScheduledDateTime(date: string, time: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isValidWorkTimeSlot(time)) {
        return null
    }

    const scheduled = new Date(`${date}T${time}:00+03:30`)
    if (Number.isNaN(scheduled.getTime())) return null
    if (isWeeklyOff(scheduled)) return null

    const { hour, minute } = getTehranParts(scheduled)
    const totalMinutes = hour * 60 + minute
    const startMinutes = WORK_START_HOUR * 60
    const endMinutes = WORK_END_HOUR * 60

    if (totalMinutes < startMinutes || totalMinutes >= endMinutes) return null

    return scheduled
}

export function isFutureScheduledTime(scheduledAt: Date) {
    return scheduledAt.getTime() > Date.now()
}

export function formatTehranDateTime(date: Date) {
    return new Intl.DateTimeFormat('fa-IR', {
        timeZone: WORK_TIMEZONE,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date)
}
