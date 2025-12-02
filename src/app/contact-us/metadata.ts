import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تماس با کلینیک روزنه - آدرس، تلفن و راه‌های ارتباطی",
    description: "تماس با کلینیک روانشناسی روزنه تهران. آدرس: شریعتی، پلاک ۱۵۱۱، طبقه سوم. تلفن: ۰۲۱-۲۲۶۱۶۴۰۸. رزرو نوبت و مشاوره فوری",
    keywords: [
        "تماس کلینیک روزنه",
        "آدرس کلینیک روانشناسی تهران",
        "شماره تلفن کلینیک روزنه",
        "نشانی کلینیک روزنه",
        "راه ارتباطی مشاوره",
        "موقعیت مکانی کلینیک",
        "مترو قلهک",
        "شریعتی تهران"
    ],
    openGraph: {
        title: "تماس با کلینیک روزنه - آدرس و شماره تلفن",
        description: "برای رزرو نوبت و دریافت اطلاعات بیشتر با کلینیک روانشناسی روزنه تماس بگیرید",
        url: "https://rozanehclinic.com/contact-us",
        images: [
            {
                url: "/contact us.svg",
                width: 1200,
                height: 630,
                alt: "تماس با کلینیک روزنه"
            }
        ]
    },
    alternates: {
        canonical: "https://rozanehclinic.com/contact-us"
    }
};

export default metadata;