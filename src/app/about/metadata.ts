import { Metadata } from "next";

export const metadata: Metadata = {
    title: "درباره کلینیک روزنه - تاریخچه و ارزش‌های ما",
    description: "آشنایی با کلینیک روانشناسی روزنه، تاریخچه تأسیس، ارزش‌های بنیادین و تیم متخصص ما. فضایی امن برای سلامت روان شما",
    keywords: [
        "درباره کلینیک روزنه",
        "تاریخچه کلینیک روانشناسی",
        "ارزش های روزنه",
        "تیم متخصص روانشناسی",
        "مرکز مشاوره تهران",
        "فلسفه درمان روانشناختی"
    ],
    openGraph: {
        title: "درباره کلینیک روزنه - داستان ما و ارزش‌هایمان",
        description: "کلینیک روزنه در سال ۱۳۹۷ با هدف ایجاد فضایی امن و حرفه‌ای برای سلامت روان تأسیس شد",
        url: "https://rozanehclinic.com/about",
        images: [
            {
                url: "/rozaneh pics/2.webp",
                width: 1200,
                height: 630,
                alt: "فضای درمانی کلینیک روزنه"
            }
        ]
    },
    alternates: {
        canonical: "https://rozanehclinic.com/about"
    }
};

export default metadata;