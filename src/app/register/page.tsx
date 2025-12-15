"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the new signup page
        router.replace('/auth/signup');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-600 font-arabic">در حال انتقال به صفحه ثبت نام...</p>
            </div>
        </div>
    );
}