import Link from "next/link";

export default function TherapistLoginPage() {
    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="Rozaneh Logo" className="w-16 h-16 object-contain mx-auto mb-2" />
                    <h1 className="text-3xl font-bold text-teal-700">کلینیک روزنه</h1>
                    <p className="text-gray-600 mt-2">ورود مشاور</p>
                </div>

                {/* Login Form */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-sm mb-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">شناسه مشاور</label>
                            <input type="text" className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition" placeholder="شناسه خود را وارد کنید" />
                        </div>

                        <div>
                            <label className="block text-right text-gray-700 font-medium mb-2">رمز عبور</label>
                            <input type="password" className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white/70 transition" placeholder="رمز عبور خود را وارد کنید" />
                        </div>

                        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm mt-6">
                            ورود
                        </button>
                    </form>
                </div>

                {/* Links */}
                <div className="text-center space-y-3">
                    <p className="text-gray-700">
                        <Link href="/login" className="text-teal-600 font-medium hover:underline">
                            ورود کاربر عادی
                        </Link>
                    </p>
                    <Link href="/" className="block text-teal-600 font-medium hover:underline">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </div>
    );
}
