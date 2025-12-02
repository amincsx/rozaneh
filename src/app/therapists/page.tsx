
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Clock, Search, Filter, ArrowRight } from "lucide-react"

interface Therapist {
    id: string
    name: string
    specializations: string[]
    rating: number
    experience: number
    hourlyRate: number // Kept in interface for filtering logic, but won't be displayed
    bio: string
    image?: string
    languages: string[]
    availableSlots: number
}

const mockTherapists: Therapist[] = [
    {
        "id": "4",
        "name": "دکتر محسن محمدی",
        "specializations": ["عضو هیئت علمی دانشگاه", "مدیر مرکز مشاوره روزنه"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره -  مشاور و رواندرمانگر عضو هیئت علمی دانشگاه مدیر مرکز مشاوره روزنه",
        "image": "/psychologists/4/image (12).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "1",
        "name": "دکتر ابوالفضل امینیان",
        "specializations": ["مشاوره پيش از ازدواج", "مشاوره در زمینه تعارض زناشويی", "سکس تراپی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکتری تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پيش از ازدواج مشاوره در زمینه تعارض زناشويی سکس تراپی",
        "image": "/psychologists/1/image (15).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "2",
        "name": "زینب ایرانی",
        "specializations": ["مشاوره پیش از ازدواج", "خانواده درمانی", "زندگی مشترک و تعارضات زوجین"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی زندگی مشترک و تعارضات زوجین",
        "image": "/psychologists/2/image (1).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "3",
        "name": "زهره کیانی",
        "specializations": ["مشاوره پیش از ازدواج", "خانواده درمانی", "سکس تراپی", "زندگی مشترک و تعارضات زوجین", "گروه درمانی و مشاوره گروهی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "زهره کیانی - متخصص مشاوره پیش از ازدواج و خانواده درمانی",
        "image": "/psychologists/3/image (13).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "5",
        "name": "الهام عسگری",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی", "کارشناس روانشناسی بالینی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص  روانشناسی شخصیت- مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی کارشناس روانشناسی بالینی",
        "image": "/psychologists/5/image (2).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "6",
        "name": "مینا خضری",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره خانواده - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی",
        "image": "/psychologists/6/image (3).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "7",
        "name": "زهرا بیگی",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره نوجوان", "تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره - مشاور و درمانگر فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره نوجوان تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/7/image (4).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "8",
        "name": "رضا معیری",
        "specializations": ["مشاوره فردی وسواس، افسردگی، شكست عاطفی و ...", "مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی روانشناسی - درمانگر بالینی مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/8/image (5).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "9",
        "name": "مهسا باغبانی",
        "specializations": ["مشاوره فردی", "وسواس، افسردگی، شكست عاطفی، اختلالات خلقی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی وسواس، افسردگی، شكست عاطفی، اختلالات خلقی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/9/image (6).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "10",
        "name": "مژگان میرزاده",
        "specializations": ["درمان اختلالات یادگیری و كمبود توجه و تمركز", "اجرا و تحليل آزمون هاي هوش", "تشخيص و آموزش در حيطه اتيسم"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی- درمانگر کودک و نوجوان درمان اختلالات یادگیری و كمبود توجه و تمركز اجرا و تحليل آزمون هاي هوش تشخيص و آموزش در حيطه اتيسم",
        "image": "/psychologists/10/image (7).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "11",
        "name": "دکتر یاسمن صالح",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکتر یاسمن صالح - متخصص مشاوره فردی", "image": "/psychologists/11/image (8).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "12",
        "name": "سارا گلچوبیان",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "سارا گلچوبیان - متخصص مشاوره فردی", "image": "/psychologists/12/image (9).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "13",
        "name": "زهرا صادقی",
        "specializations": ["مشاوره فردی وسواس، افسردگی، اضطراب و..", "تعارضات بین فردی", "مانگر حوزه نوجوان", "خانواده درمانی", "مشاوره زوج"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره - مشاوره فردی (وسواس، افسردگی، اضطراب و..) تعارضات بین فردی مانگر حوزه نوجوان خانواده درمانی مشاوره زوج",
        "image": "/psychologists/13/image (10).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "14",
        "name": "دکتر بهار ایروانی",
        "specializations": ["مشاوره پیش از ازدواج", "مشاوره فردی", "مشاوره خانواده"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - زوج درمانی( مشاوره در زمینه تعارض های زوجی و پیمان شکنی عاطفی) مشاوره پیش از ازدواج مشاوره فردی مشاوره خانواده",
        "image": "/psychologists/14/image (11).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "15",
        "name": "دکتر نسرین واسعی",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "حل تعارضات زناشويی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی حل تعارضات زناشويی",
        "image": "/psychologists/15/image (12).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "16",
        "name": "زهرا سادات اطیابی",
        "specializations": ["مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...", "مشاوره زوج و خانواده درمانیتعارضات زناشویی و..", "درمانگر نوجوان", "مشاوره پیش از ازدواج"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی (پنیک، افسردگی، اضطراب، وسواس و ...) مشاوره زوج و خانواده درمانی(تعارضات زناشویی و..) درمانگر نوجوان مشاوره پیش از ازدواج",
        "image": "/psychologists/16/image (13).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "17",
        "name": "لیلا بیرانوند",
        "specializations": ["فرزند پروری"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - متخصص در حوزه کودک و نوجوان فرزند پروری", "image": "/psychologists/17/image (14).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "18",
        "name": "نگار غایبی",
        "specializations": ["مشاوره"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، سوگ، شکست عاطقی و...)  مشاوره زوح و خانواده درمانی",
        "image": "/psychologists/18/image (15).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "19",
        "name": "محمد جدیدکار همدانی",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "محمد جدیدکار همدانی - متخصص مشاوره فردی", "image": "/psychologists/19/image (16).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "20",
        "name": "بهاره نعمتی روشن",
        "specializations": ["- مشاوره پیش از ازدواج - زوج و خانواده درمانی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - - مشاوره فردی  در خصوص اختلالات شخصیت( وسواس ، اضطراب، افسردگی و .. ) - مشاوره پیش از ازدواج - زوج و خانواده درمانی",
        "image": "/psychologists/20/image (17).webp", "languages": ["فارسی"], "availableSlots": 10
    }
]

export default function TherapistsPage() {
    const router = useRouter()
    const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSpecialization, setSelectedSpecialization] = useState("")
    const [sortBy, setSortBy] = useState("rating")

    const specializations = [...new Set(mockTherapists.flatMap(t => t.specializations))];

    const filteredTherapists = therapists
        .filter(therapist => {
            const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                therapist.specializations.some(spec =>
                    spec.toLowerCase().includes(searchTerm.toLowerCase())
                )
            const matchesSpecialization = !selectedSpecialization ||
                therapist.specializations.includes(selectedSpecialization)

            return matchesSearch && matchesSpecialization
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.rating - a.rating
                case "experience":
                    return b.experience - a.experience
                default:
                    return 0
            }
        })

    return (
        <div className="min-h-screen w-full bg-no-repeat font-farsi" style={{ backgroundImage: 'url("/bg therapists.svg"), url("/bg therapists.svg")', backgroundSize: '150%, 150%', backgroundPosition: 'top, bottom' }}>
            {/* Back Button */}
            <div className="w-full pt-8 px-6">
                <div className="container mx-auto">
                    <Link href="/" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div dir="rtl" className="mb-8 text-center mt-12">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <img src="/logo.svg" alt="Rozaneh Logo" className="w-20 h-20" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 drop-shadow-lg font-arabic mb-2">
                        مشاوران و روانشناسان
                    </h1>
                    <p className="text-gray-700 font-arabic drop-shadow-md">
                        بهترین متخصصان سلامت روان را برای خود انتخاب کنید
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white/50 backdrop-blur-lg rounded-xl border border-white/40 shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <Input
                                placeholder="جستجو نام یا تخصص..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 font-arabic bg-white/60 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white/80 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>

                        {/* Specialization */}
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="px-3 py-2 border rounded-lg font-arabic bg-white/60 border-gray-300 text-gray-900 focus:bg-white/80 focus:ring-teal-500 focus:border-teal-500"
                        >
                            <option value="">همه تخصص‌ها</option>
                            {specializations.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 border rounded-lg font-arabic bg-white/60 border-gray-300 text-gray-900 focus:bg-white/80 focus:ring-teal-500 focus:border-teal-500"
                        >
                            <option value="rating">بر اساس امتیاز</option>
                            <option value="experience">بر اساس تجربه</option>
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {filteredTherapists.map((therapist) => (
                        <div key={therapist.id} className="bg-white/50 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                            {therapist.image && (
                                <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden bg-transparent flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="#24a590ff" opacity="0.4" />
                                    </svg>
                                    <img
                                        src={therapist.image}
                                        alt={therapist.name}
                                        className="relative z-10 w-48 h-48 sm:w-52 sm:h-52 md:w-140 md:h-140 object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-4 md:p-6 text-gray-800">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-arabic mb-2 drop-shadow-sm">
                                    {therapist.name}
                                </h3>
                                <div className="mb-4 h-16 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {therapist.specializations.map((spec, index) => (
                                            <span key={index} className="px-3 py-1 bg-black/10 text-xs rounded-full font-arabic backdrop-blur-sm text-gray-800">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link href={`/therapists/${therapist.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full font-arabic bg-transparent border-gray-400 text-gray-800 hover:bg-black/10 hover:text-gray-900">
                                            مشاهده پروفایل
                                        </Button>
                                    </Link>
                                    <Link href={`/book-appointment?therapist=${therapist.id}`} className="flex-1">
                                        <Button style={{ backgroundColor: '#24a590ff' }} className="w-full font-arabic text-white shadow-lg hover:opacity-80">
                                            رزرو نوبت
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTherapists.length === 0 && (
                    <div className="text-center py-12 bg-white/50 backdrop-blur-lg rounded-2xl">
                        <div className="text-gray-500 mb-4">
                            <Filter className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-arabic">
                            هیچ مشاوری یافت نشد
                        </h3>
                        <p className="text-gray-600 font-arabic">
                            لطفا فیلترهای خود را تغییر دهید
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="w-full py-4 px-3 md:px-6 mt-8 pb-20 overflow-x-hidden">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm flex flex-col items-center gap-3 px-4 py-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo.svg" alt="Rozaneh Logo" className="w-8 h-8" />
                        <span className="text-sm font-bold text-gray-800">کلینیک روانشناسی روزنه</span>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-3 text-xs">
                        <Link href="/" className="hover:text-teal-600 text-gray-700 transition">خانه</Link>
                        <Link href="/therapists" className="hover:text-teal-600 text-gray-700 transition">مشاوران</Link>
                        <Link href="/assessments" className="hover:text-teal-600 text-gray-700 transition">تست‌ها</Link>
                        <Link href="/about" className="hover:text-teal-600 text-gray-700 transition">درباره</Link>
                        <Link href="/contact-us" className="hover:text-teal-600 text-gray-700 transition">تماس</Link>
                    </nav>
                    <span className="text-xs text-teal-700">© 2019 Rozaneh Clinic</span>
                </div>
            </footer>
        </div>
    )
}
