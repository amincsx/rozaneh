import { Metadata } from "next";

export const metadata: Metadata = {
    title: "خدمات روانشناسی کلینیک روزنه - مشاوره تخصصی",
    description: "خدمات جامع روانشناسی کلینیک روزنه: مشاوره فردی، خانوادگی، زوج درمانی، مشاوره پیش از ازدواج، درمان رفتاری شناختی و مشاوره تحصیلی و شغلی",
    keywords: [
        "خدمات روانشناسی",
        "مشاوره فردی",
        "مشاوره خانوادگی",
        "زوج درمانی",
        "مشاوره پیش از ازدواج",
        "درمان رفتاری شناختی",
        "مشاوره شغلی",
        "مشاوره تحصیلی",
        "مشاوره نوجوانان",
        "خدمات مشاوره آنلاین"
    ],
    openGraph: {
        title: "خدمات روانشناسی کلینیک روزنه - مشاوره تخصصی برای تمام سنین",
        description: "مجموعه جامع خدمات روانشناختی و مشاوره‌ای برای تمام سنین و نیازهای زندگی شما",
        url: "https://rozanehclinic.com/services",
        images: [
            {
                url: "/services svg/مشاوره فردی.svg",
                width: 1200,
                height: 630,
                alt: "خدمات مشاوره کلینیک روزنه"
            }
        ]
    },
    alternates: {
        canonical: "https://rozanehclinic.com/services"
    }
};

export default metadata;