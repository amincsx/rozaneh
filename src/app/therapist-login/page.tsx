"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TherapistLoginPage() {
    const [therapistId, setTherapistId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/therapist-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    therapist_id: therapistId,
                    password: password
                }),
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (data.success) {
                // Store login state and therapist data with string key
                const idString = String(therapistId);
                console.log(`Setting localStorage for therapist ${idString}`);
                localStorage.setItem(`therapist_${idString}_logged_in`, 'true');
                localStorage.setItem(`therapist_${idString}_data`, JSON.stringify(data.therapist));

                // Verify storage
                console.log(`Verification - logged_in:`, localStorage.getItem(`therapist_${idString}_logged_in`));
                console.log(`Verification - data:`, localStorage.getItem(`therapist_${idString}_data`));

                // Redirect to individual dashboard
                console.log(`Redirecting to /therapist-dashboard/${idString}`);
                router.push(`/therapist-dashboard/${idString}`);
            } else {
                setError(data.message || 'خطا در ورود');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('خطا در اتصال به سرور');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-600 to-green-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">ورود درمانگران</h1>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={therapistId}
                                onChange={(e) => setTherapistId(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-center"
                                placeholder="شناسه"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="رمز عبور"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 transition"
                        >
                            {loading ? 'در حال ورود...' : 'ورود'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-teal-600 hover:text-teal-700 text-sm">
                            بازگشت
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
