"use client"

import { useState } from 'react';
import { X } from 'lucide-react';
import { toJalaali, toGregorian } from 'jalaali-js';

interface User {
    user_id: string;
    name: string;
    email: string;
    phone?: string;
    city?: string;
    address?: string;
    date_of_birth?: string;
    gender?: string;
    profile_picture?: string;
    registration_date?: string;
    [key: string]: string | undefined;
}

interface EditProfileModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedUser: User) => void;
}

// Helper function to convert Gregorian date string to Jalaali
const gregorianToJalaaliString = (gregorianDate: string): string => {
    if (!gregorianDate) return '';
    const [year, month, day] = gregorianDate.split('-').map(Number);
    const { jy, jm, jd } = toJalaali(year, month, day);
    return `${jy}-${String(jm).padStart(2, '0')}-${String(jd).padStart(2, '0')}`;
};

// Helper function to convert Jalaali date string to Gregorian
const jalaaliToGregorianString = (jalaaliDate: string): string => {
    if (!jalaaliDate) return '';
    const [year, month, day] = jalaaliDate.split('-').map(Number);
    const { gy, gm, gd } = toGregorian(year, month, day);
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
};

export default function EditProfileModal({ user, isOpen, onClose, onUpdate }: EditProfileModalProps) {
    // Convert stored Gregorian date to Jalaali for display
    const jalaaliDateOfBirth = gregorianToJalaaliString(user.date_of_birth || '');
    const initialParsed = jalaaliDateOfBirth ? jalaaliDateOfBirth.split('-').map(Number) : null;

    // Get current Jalaali year as default
    const getDefaultJalaaliYear = () => {
        const now = new Date();
        const { jy } = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
        return jy;
    };

    const [formData, setFormData] = useState({
        name: user.name || '',
        phone: user.phone || '',
        city: user.city || '',
        address: user.address || '',
        date_of_birth: user.date_of_birth || '',
        gender: user.gender || '',
    });

    const [jalaaliDateInput, setJalaaliDateInput] = useState(jalaaliDateOfBirth);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickerYear, setPickerYear] = useState(initialParsed?.[0] || getDefaultJalaaliYear() - 20);
    const [pickerMonth, setPickerMonth] = useState(initialParsed?.[1] || 1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const JALAALI_MONTHS = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
    ];

    const getDaysInMonth = (year: number, month: number) => {
        if (month < 7) return 31;
        if (month < 12) return 30;
        const isLeap = (y: number) => ((y + 1474) % 2820 + 474) % 128 < 29;
        return isLeap(year) ? 30 : 29;
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        const { gy, gm, gd } = toGregorian(year, month, 1);
        const date = new Date(gy, gm - 1, gd);
        return date.getDay();
    };

    const handleSelectDate = (day: number) => {
        const jalaaliDate = `${pickerYear}-${String(pickerMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setJalaaliDateInput(jalaaliDate);

        const gregorianDate = jalaaliToGregorianString(jalaaliDate);
        setFormData(prev => ({
            ...prev,
            date_of_birth: gregorianDate,
        }));

        setShowDatePicker(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const user_id = localStorage.getItem('user_id');
            const email = localStorage.getItem('email');
            const userType = localStorage.getItem('userType') || 'user';

            if (!user_id || !email) {
                throw new Error('اطلاعات کاربری یافت نشد');
            }

            const response = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,
                    email,
                    userType,
                    updates: formData,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'خطا در بروزرسانی پروفایل');
            }

            setSuccess('پروفایل با موفقیت به‌روز شد');
            onUpdate(data.user);
            setTimeout(() => {
                onClose();
                setSuccess(null);
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'خطای نامشخص');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 font-arabic">ویرایش پروفایل</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg font-arabic">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg font-arabic">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">نام و نام خانوادگی</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="نام و نام خانوادگی"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">شماره تماس</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="09..."
                                dir="ltr"
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">شهر</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="شهر خود را وارد کنید"
                            />
                        </div>

                        {/* Date of Birth - Jalaali Calendar Picker */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">تاریخ تولد (شمسی)</label>
                            <button
                                type="button"
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-right bg-white font-arabic"
                            >
                                {jalaaliDateInput ? `${jalaaliDateInput}` : 'انتخاب تاریخ'}
                            </button>

                            {showDatePicker && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-80">
                                    {/* Month/Year selector */}
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            type="button"
                                            onClick={() => setPickerMonth(pickerMonth === 1 ? 12 : pickerMonth - 1)}
                                            className="px-2 py-1 hover:bg-gray-200 rounded"
                                        >
                                            ›
                                        </button>
                                        <div className="flex gap-2">
                                            <select
                                                value={pickerMonth}
                                                onChange={(e) => setPickerMonth(Number(e.target.value))}
                                                className="px-2 py-1 border border-gray-300 rounded font-arabic"
                                            >
                                                {JALAALI_MONTHS.map((m, i) => (
                                                    <option key={i} value={i + 1}>{m}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={pickerYear}
                                                onChange={(e) => setPickerYear(Number(e.target.value))}
                                                className="px-2 py-1 border border-gray-300 rounded w-20 text-center"
                                                dir="ltr"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPickerMonth(pickerMonth === 12 ? 1 : pickerMonth + 1)}
                                            className="px-2 py-1 hover:bg-gray-200 rounded"
                                        >
                                            ‹
                                        </button>
                                    </div>

                                    {/* Calendar grid */}
                                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
                                            <div key={day} className="font-bold text-gray-600 py-1">
                                                {day}
                                            </div>
                                        ))}

                                        {(() => {
                                            const daysInMonth = getDaysInMonth(pickerYear, pickerMonth);
                                            const firstDay = getFirstDayOfMonth(pickerYear, pickerMonth);
                                            const cells = [];

                                            // Empty cells before month starts
                                            for (let i = 0; i < firstDay; i++) {
                                                cells.push(<div key={`empty-${i}`} className="py-2" />);
                                            }

                                            // Days of month
                                            for (let day = 1; day <= daysInMonth; day++) {
                                                const isSelected = jalaaliDateInput === `${pickerYear}-${String(pickerMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                                cells.push(
                                                    <button
                                                        key={day}
                                                        type="button"
                                                        onClick={() => handleSelectDate(day)}
                                                        className={`py-2 rounded text-sm transition ${isSelected
                                                                ? 'bg-teal-500 text-white font-bold'
                                                                : 'hover:bg-teal-100 text-gray-800'
                                                            }`}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            }

                                            return cells;
                                        })()}
                                    </div>

                                    {/* Close button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowDatePicker(false)}
                                        className="w-full mt-4 px-3 py-2 bg-gray-200 text-gray-800 rounded font-arabic hover:bg-gray-300"
                                    >
                                        بستن
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">جنسیت</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-arabic"
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="male">مرد</option>
                                <option value="female">زن</option>
                                <option value="other">سایر</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-arabic">آدرس</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="آدرس کامل"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 font-arabic"
                        >
                            {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition font-arabic"
                        >
                            بازگشت
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}