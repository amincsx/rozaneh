"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
    textColor?: "white" | "gray";
    backButtonText?: string;
    backButtonAction?: "back" | "home";
}

export default function Navbar({ textColor = "gray", backButtonText = "بازگشت", backButtonAction = "back" }: NavbarProps) {
    const router = useRouter();

    const textColorClass = textColor === "white" ? "text-white hover:text-teal-200" : "text-gray-700 hover:text-teal-600";
    const iconColorClass = textColor === "white" ? "text-white" : "text-gray-700";

    const handleBackClick = () => {
        if (backButtonAction === "home") {
            router.push("/");
        } else {
            router.back();
        }
    };

    return (
        <nav className="absolute top-6 right-4 md:right-20 z-50">
            <div className="bg-white/50 backdrop-blur-lg border border-white/80 rounded-lg px-4 py-2 shadow-xl hover:shadow-2xl transition-shadow">
                <button
                    onClick={handleBackClick}
                    className={`group flex items-center justify-center gap-1 ${textColorClass} font-regular transition-all duration-300 px-2 py-1 rounded-md text-sm inline-flex transform hover:scale-110`}
                >
                    <ArrowRight className={`w-4 h-4 flex-shrink-0 ${iconColorClass}`} />
                    <span className="font-farsi leading-none">{backButtonText}</span>
                </button>
            </div>
        </nav>
    );
}

