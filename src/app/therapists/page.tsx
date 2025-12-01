"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

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
        "image": "/psychologists/4/image (12).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "1",
        "name": "دکتر ابوالفضل امینیان",
        "specializations": ["مشاوره پيش از ازدواج", "مشاوره در زمینه تعارض زناشويی", "سکس تراپی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکتری تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پيش از ازدواج مشاوره در زمینه تعارض زناشويی سکس تراپی",
        "image": "/psychologists/1/image (15).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "2",
        "name": "زینب ایرانی",
        "specializations": ["مشاوره پیش از ازدواج", "خانواده درمانی", "زندگی مشترک و تعارضات زوجین"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی زندگی مشترک و تعارضات زوجین",
        "image": "/psychologists/2/image (14).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "3",
        "name": "زهره کیانی",
        "specializations": ["مشاوره پیش از ازدواج", "خانواده درمانی", "سکس تراپی", "زندگی مشترک و تعارضات زوجین", "گروه درمانی و مشاوره گروهی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره خانواده - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی سکس تراپی زندگی مشترک و تعارضات زوجین گروه درمانی و مشاوره گروهی",
        "image": "/psychologists/3/image (13).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "5",
        "name": "الهام عسگری",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی", "کارشناس روانشناسی بالینی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص  روانشناسی شخصیت- مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی کارشناس روانشناسی بالینی",
        "image": "/psychologists/5/image (11).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "6",
        "name": "مینا خضری",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره خانواده - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی",
        "image": "/psychologists/6/image (10).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "7",
        "name": "زهرا بیگی",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره نوجوان", "تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره - مشاور و درمانگر فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره نوجوان تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/7/image (9).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "8",
        "name": "رضا معیری",
        "specializations": ["مشاوره فردی وسواس، افسردگی، شكست عاطفی و ...", "مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی روانشناسی - درمانگر بالینی مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/8/image (8).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "9",
        "name": "مهسا باغبانی",
        "specializations": ["مشاوره فردی", "وسواس، افسردگی، شكست عاطفی، اختلالات خلقی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی وسواس، افسردگی، شكست عاطفی، اختلالات خلقی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        "image": "/psychologists/9/image (7).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "10",
        "name": "مژگان میرزاده",
        "specializations": ["درمان اختلالات یادگیری و كمبود توجه و تمركز", "اجرا و تحليل آزمون هاي هوش", "تشخيص و آموزش در حيطه اتيسم"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی- درمانگر کودک و نوجوان درمان اختلالات یادگیری و كمبود توجه و تمركز اجرا و تحليل آزمون هاي هوش تشخيص و آموزش در حيطه اتيسم",
        "image": "/psychologists/10/image (6).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "11",
        "name": "دکتر یاسمن صالح",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکتر یاسمن صالح - متخصص مشاوره فردی", "image": "/psychologists/11/-2147483648_-224219.jpg", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "12",
        "name": "سارا گلچوبیان",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "سارا گلچوبیان - متخصص مشاوره فردی", "image": "/psychologists/12/image (5).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "13",
        "name": "زهرا صادقی",
        "specializations": ["مشاوره فردی وسواس، افسردگی، اضطراب و..", "تعارضات بین فردی", "مانگر حوزه نوجوان", "خانواده درمانی", "مشاوره زوج"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص مشاوره - مشاوره فردی (وسواس، افسردگی، اضطراب و..) تعارضات بین فردی مانگر حوزه نوجوان خانواده درمانی مشاوره زوج",
        "image": "/psychologists/13/image (4).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "14",
        "name": "دکتر بهار ایروانی",
        "specializations": ["مشاوره پیش از ازدواج", "مشاوره فردی", "مشaوره خانواده"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - زوج درمانی( مشاوره در زمینه تعارض های زوجی و پیمان شکنی عاطفی) مشاوره پیش از ازدواج مشاوره فردی مشاوره خانواده",
        "image": "/psychologists/14/-2147483648_-224224.jpg", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "15",
        "name": "دکتر نسرین واسعی",
        "specializations": ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "حل تعارضات زناشويی"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی حل تعارضات زناشويی",
        "image": "/psychologists/15/-2147483648_-224217.jpg", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "16",
        "name": "زهرا سادات اطیابی",
        "specializations": ["مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...", "مشاوره زوج و خانواده درمانیتعارضات زناشویی و..", "درمانگر نوجوان", "مشاوره پیش از ازدواج"],
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - مشاوره فردی (پنیک، افسردگی، اضطراب، وسواس و ...) مشاوره زوج و خانواده درمانی(تعارضات زناشویی و..) درمانگر نوجوان مشاوره پیش از ازدواج",
        "image": "/psychologists/16/-2147483648_-224229.jpg", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "17",
        "name": "لیلا بیرانوند",
        "specializations": ["فرزند پروری"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - متخصص در حوزه کودک و نوجوان فرزند پروری", "image": "/psychologists/17/image.png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "18",
        "name": "نگار غایبی",
        "specializations": ["مشاوره"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، سوگ، شکست عاطقی و...)  مشاوره زوح و خانواده درمانی",
        "image": "/psychologists/18/-2147483648_-224231.jpg", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "19",
        "name": "محمد جدیدکار همدانی",
        "specializations": ["مشاوره فردی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "محمد جدیدکار همدانی - متخصص مشاوره فردی", "image": "/psychologists/19/image (2).png", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "20",
        "name": "بهاره نعمتی روشن",
        "specializations": ["- مشاوره پیش از ازدواج - زوج و خانواده درمانی"], "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "bio": "متخصص روانشناسی بالینی - - مشاوره فردی  در خصوص اختلالات شخصیت( وسواس ، اضطراب، افسردگی و .. ) - مشاوره پیش از ازدواج - زوج و خانواده درمانی",
        "image": "/psychologists/20/image (3).png", "languages": ["فارسی"], "availableSlots": 10
    }
]

export default function TherapistsPage() {
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
        <div className="min-h-screen w-full font-farsi">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-7xl">
                {/* Header Section */}
                <div dir="rtl" className="mb-12 sm:mb-16 text-center flex flex-col items-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-700 mb-4 sm:mb-5 font-farsi text-center">
                        مشاوران و روانشناسان
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 font-farsi max-w-2xl mx-auto text-center">
                        بهترین متخصصان سلامت روان را برای خود انتخاب کنید
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 sm:p-6 mb-8 sm:mb-12 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                            <Input
                                placeholder="جستجو نام یا تخصص..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-11 font-farsi bg-white/60 border-white/40 text-gray-700 placeholder-gray-500 focus:bg-white/80 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-11"
                            />
                        </div>

                        {/* Specialization */}
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="px-4 py-2.5 border border-white/40 rounded-lg font-farsi bg-white/60 text-gray-700 focus:bg-white/80 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-11"
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
                            className="px-4 py-2.5 border border-white/40 rounded-lg font-farsi bg-white/60 text-gray-700 focus:bg-white/80 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 h-11"
                        >
                            <option value="rating">بر اساس امتیاز</option>
                            <option value="experience">بر اساس تجربه</option>
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                {filteredTherapists.length > 0 && (
                    <div dir="rtl" className="mb-6 font-farsi text-sm text-gray-600">
                        <span className="font-medium">{filteredTherapists.length}</span> مشاور یافت شد
                    </div>
                )}

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {filteredTherapists.map((therapist) => (
                        <div 
                            key={therapist.id} 
                            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-64 w-full bg-gray-100 flex-shrink-0">
                                {therapist.image ? (
                                    <Image
                                        src={therapist.image}
                                        alt={therapist.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                        style={
                                            therapist.id === "11" || therapist.id === "18"
                                                ? { objectPosition: "center 15%" }
                                                : therapist.id === "4" || therapist.id === "14" || therapist.id === "15" || therapist.id === "16"
                                                ? { objectPosition: "center 10%" }
                                                : undefined
                                        }
                                        priority={false}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-teal-200 flex items-center justify-center">
                                                <span className="text-2xl text-teal-700 font-bold font-farsi">
                                                    {therapist.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content Section */}
                            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                                {/* Name */}
                                <h3 className="text-lg sm:text-xl font-bold font-farsi mb-4 text-gray-800 leading-tight">
                                    {therapist.name}
                                </h3>

                                {/* Specializations */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {therapist.specializations.map((spec, index) => (
                                            <span 
                                                key={index} 
                                                className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs rounded-full font-farsi font-medium border border-teal-100"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>



                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                    <Link href={`/therapists/${therapist.id}`} className="flex-1 cursor-pointer">
                                        <Button 
                                            variant="outline" 
                                            className="w-full font-farsi bg-white/20 border-white/40 text-gray-700 hover:bg-white/30 h-11 text-sm font-medium cursor-pointer"
                                        >
                                            مشاهده پروفایل
                                        </Button>
                                    </Link>
                                    <Link href={`/book-appointment?therapist=${therapist.id}`} className="flex-1 cursor-pointer">
                                        <Button 
                                            className="w-full font-farsi bg-teal-600 hover:bg-teal-700 text-white h-11 text-sm font-medium shadow-sm cursor-pointer"
                                        >
                                            رزرو نوبت
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTherapists.length === 0 && (
                    <div className="text-center py-16 sm:py-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm">
                        <div className="text-gray-400 mb-4">
                            <Filter className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-farsi">
                            هیچ مشاوری یافت نشد
                        </h3>
                        <p className="text-gray-600 font-farsi text-sm">
                            لطفا فیلترهای خود را تغییر دهید
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
