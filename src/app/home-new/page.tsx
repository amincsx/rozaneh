import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MessageCircle,
    Brain,
    Heart,
    Shield,
    Clock,
    Users,
    Award,
    CheckCircle,
    Star,
    TrendingUp
} from "lucide-react";

export default function NewHome() {
    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <div
                className="font-sans w-full min-h-screen bg-cover bg-top bg-left bg-no-repeat relative overflow-hidden flex items-center"
                style={{
                    backgroundImage: 'url(/bg%201-01.svg)'
                }}
            >
                {/* Main Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-bold text-teal-700 mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl font-arabic">
                            سفر شما به سوی سلامت روان
                            <br />
                            از امروز شروع میشود
                        </h1>
                        <p className="text-gray-700 mb-8 leading-relaxed font-regular text-lg md:text-xl font-arabic">
                            در محیطی امن و حرفه‌ای همراه شما هستیم. دسترسی آسان به بهترین متخصصان سلامت روان ایران
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/book-appointment">
                                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-arabic px-8 py-4 text-lg">
                                    <Calendar className="w-5 h-5 ml-2" />
                                    رزرو نوبت
                                </Button>
                            </Link>
                            <Link href="/chat-support">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-teal-600 text-teal-600 hover:bg-teal-50 font-arabic px-8 py-4 text-lg"
                                >
                                    <MessageCircle className="w-5 h-5 ml-2" />
                                    مشاوره فوری
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/90 backdrop-blur-sm py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">+۲۰۰</div>
                            <div className="text-gray-600 font-arabic">مشاور متخصص</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">+۱۰,۰۰۰</div>
                            <div className="text-gray-600 font-arabic">جلسه موفق</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">۴.۹</div>
                            <div className="text-gray-600 font-arabic">امتیاز رضایت</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">۲۴/۷</div>
                            <div className="text-gray-600 font-arabic">پشتیبانی</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-16 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic">
                            خدمات ما
                        </h2>
                        <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
                            طیف کاملی از خدمات مشاوره و روانشناسی با استفاده از پیشرفته‌ترین فناوری‌ها
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md text-center">
                            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">مشاوره آنلاین</h3>
                            <p className="text-gray-600 mb-4 font-arabic">
                                ویدیو کال، تماس صوتی و چت متنی با کیفیت بالا
                            </p>
                            <Link href="/services">
                                <Button variant="outline" className="font-arabic">اطلاعات بیشتر</Button>
                            </Link>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">تست‌های روانشناسی</h3>
                            <p className="text-gray-600 mb-4 font-arabic">
                                ارزیابی کامل سلامت روان با معتبرترین تست‌ها
                            </p>
                            <Link href="/assessments">
                                <Button variant="outline" className="font-arabic">شروع تست</Button>
                            </Link>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-arabic">مشاوره گروهی</h3>
                            <p className="text-gray-600 mb-4 font-arabic">
                                جلسات گروهی برای تجربه‌ی متفاوت درمان
                            </p>
                            <Link href="/services">
                                <Button variant="outline" className="font-arabic">اطلاعات بیشتر</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-16 bg-white/90 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic">
                            چرا کلینیک روزنه؟
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-arabic">امنیت کامل</h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                حفاظت کامل از اطلاعات شخصی با بالاترین استانداردها
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-arabic">متخصصان مجرب</h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                تیمی از بهترین روانشناسان با سال‌ها تجربه
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-arabic">دسترسی ۲۴/۷</h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                خدمات مشاوره در تمام ساعات شبانه‌روز
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-arabic">مراقبت شخصی</h3>
                            <p className="text-gray-600 text-sm font-arabic">
                                برنامه‌های درمانی منطبق بر نیازهای فردی
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Therapists Preview */}
            <div
                className="py-16 bg-cover bg-center bg-no-repeat relative"
                style={{
                    backgroundImage: 'url(/bg%202-01.svg)'
                }}
            >
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4 font-arabic">
                        تیمی از روانشناسان و مشاوران متخصص
                    </h2>
                    <p className="text-gray-700 text-lg mb-8 font-arabic">
                        با بیش از ۲۰۰ متخصص مجرب در تمام زمینه‌های روانشناسی
                    </p>
                    <Link href="/therapists">
                        <Button size="lg" className="font-arabic">
                            <Users className="w-5 h-5 ml-2" />
                            مشاهده مشاوران
                        </Button>
                    </Link>
                </div>

                {/* Centered Image */}
                <div className="absolute top-1/2 left-1/2 mt-30 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                    <Image
                        src="/sitting conversation-01.svg"
                        alt="Sitting Conversation"
                        width={600}
                        height={600}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Assessment Preview */}
            <div
                className="py-16 bg-cover bg-center bg-no-repeat relative"
                style={{
                    backgroundImage: 'url(/bg%203-01.svg)'
                }}
            >
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4 font-arabic">
                        تست‌های رایگان آنلاین
                    </h2>
                    <p className="text-gray-700 text-lg mb-8 font-arabic max-w-2xl mx-auto">
                        به‌روزترین و معتبرترین تست‌های روانشناسی را به صورت کاملاً رایگان تجربه کنید
                    </p>
                    <Link href="/assessments">
                        <Button size="lg" className="font-arabic">
                            <Brain className="w-5 h-5 ml-2" />
                            مشاهده تست‌ها
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-white/90 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-arabic">
                            نظرات کاربران
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "سارا احمدی",
                                text: "تجربه‌ای فوق‌العاده داشتم. مشاورم بسیار حرفه‌ای بود و کمک زیادی به من کرد.",
                                rating: 5
                            },
                            {
                                name: "محمد رضایی",
                                text: "پلتفرم بسیار کاربرپسند و امن. خیلی راحت توانستم با مشاور ارتباط برقرار کنم.",
                                rating: 5
                            },
                            {
                                name: "فاطمه کریمی",
                                text: "تست‌های روانشناسی بسیار دقیق بودند و کمک زیادی به خودشناسی‌ام کردند.",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-md">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 font-arabic">&quot;{testimonial.text}&quot;</p>
                                <p className="font-semibold text-gray-900 font-arabic">{testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-arabic">
                        آماده شروع سفر به سوی سلامت روان هستید؟
                    </h2>
                    <p className="text-lg mb-8 font-arabic">
                        امروز همین الان اولین قدم را بردارید
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/signup">
                            <Button variant="secondary" size="lg" className="font-arabic">
                                ثبت نام رایگان
                            </Button>
                        </Link>
                        <Link href="/book-appointment">
                            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-teal-600 font-arabic">
                                <Calendar className="w-5 h-5 ml-2" />
                                رزرو نوبت
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}