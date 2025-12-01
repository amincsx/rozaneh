"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Star, MessageSquare, Calendar, Clock, User } from "lucide-react"

interface Therapist {
    id: string
    name: string
    specializations: string[]
    rating: number
    experience: number
    hourlyRate: number
    bio: string
    image?: string
    languages: string[]
    availableSlots: number
}

interface Comment {
    id: string
    author: string
    text: string
    rating: number
    date: string
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
        "specializations": ["مشاوره پیش از ازدواج", "مشاوره فردی", "مشاوره خانواده"],
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

export default function TherapistProfilePage() {
    const params = useParams()
    const router = useRouter()
    const therapistId = params.id as string

    const [therapist, setTherapist] = useState<Therapist | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState({ author: "", text: "", rating: 5 })
    const [showCommentForm, setShowCommentForm] = useState(false)

    useEffect(() => {
        const found = mockTherapists.find(t => t.id === therapistId)
        if (found) {
            setTherapist(found)
            // Load saved comments from localStorage
            const savedComments = localStorage.getItem(`therapist-${therapistId}-comments`)
            if (savedComments) {
                setComments(JSON.parse(savedComments))
            }
        }
    }, [therapistId])

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.author.trim() || !newComment.text.trim()) return

        const comment: Comment = {
            id: Date.now().toString(),
            author: newComment.author,
            text: newComment.text,
            rating: newComment.rating,
            date: new Date().toLocaleDateString('fa-IR')
        }

        const updatedComments = [comment, ...comments]
        setComments(updatedComments)
        localStorage.setItem(`therapist-${therapistId}-comments`, JSON.stringify(updatedComments))

        setNewComment({ author: "", text: "", rating: 5 })
        setShowCommentForm(false)
    }

    if (!therapist) {
        return (
            <div className="min-h-screen w-full font-farsi flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">مشاور یافت نشد</p>
                    <Link href="/therapists">
                        <Button className="font-farsi">بازگشت به لیست مشاوران</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const imagePosition = therapist.id === "4" || therapist.id === "14" || therapist.id === "15" || therapist.id === "16"
        ? "center 10%"
        : therapist.id === "11" || therapist.id === "18"
            ? "center 15%"
            : undefined

    return (
        <div className="min-h-screen w-full font-farsi">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
                {/* Back Button */}
                <Link href="/therapists" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 mb-6 font-farsi">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    <span>بازگشت به لیست مشاوران</span>
                </Link>

                {/* Profile Header */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="md:flex">
                        {/* Image */}
                        <div className="relative w-full md:w-80 h-80 md:h-auto bg-gray-100 flex-shrink-0">
                            {therapist.image ? (
                                <Image
                                    src={therapist.image}
                                    alt={therapist.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 320px"
                                    className="object-cover"
                                    style={imagePosition ? { objectPosition: imagePosition } : undefined}
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-teal-200 flex items-center justify-center">
                                            <span className="text-4xl text-teal-700 font-bold font-farsi">
                                                {therapist.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-6 sm:p-8 flex-grow">
                            <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-4 font-farsi">
                                {therapist.name}
                            </h1>

                            <p className="text-gray-700 mb-6 leading-relaxed font-farsi text-lg">
                                {therapist.bio}
                            </p>

                            {/* Specializations */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-600 mb-3 font-farsi">تخصص‌ها:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {therapist.specializations.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-teal-50 text-teal-700 text-sm rounded-full font-farsi font-medium border border-teal-100"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Languages removed as requested */}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href={`/book-appointment?therapist=${therapist.id}`} className="flex-1">
                                    <Button className="w-full font-farsi bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-medium shadow-sm cursor-pointer">
                                        <Calendar className="w-5 h-5 ml-2" />
                                        رزرو نوبت
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-teal-700 font-farsi flex items-center gap-2">
                            <MessageSquare className="w-6 h-6" />
                            نظرات ({comments.length})
                        </h2>
                        <Button
                            onClick={() => setShowCommentForm(!showCommentForm)}
                            className="font-farsi bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                        >
                            {showCommentForm ? "انصراف" : "افزودن نظر"}
                        </Button>
                    </div>

                    {/* Comment Form */}
                    {showCommentForm && (
                        <form onSubmit={handleSubmitComment} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg p-6 mb-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-farsi">
                                        نام شما
                                    </label>
                                    <Input
                                        value={newComment.author}
                                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                        placeholder="نام خود را وارد کنید"
                                        className="font-farsi bg-white/60 border-white/40"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-farsi">
                                        امتیاز
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() => setNewComment({ ...newComment, rating })}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`w-6 h-6 ${rating <= newComment.rating
                                                            ? "text-yellow-500 fill-yellow-500"
                                                            : "text-gray-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 font-farsi">
                                        نظر شما
                                    </label>
                                    <Textarea
                                        value={newComment.text}
                                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                                        placeholder="نظر خود را بنویسید..."
                                        rows={4}
                                        className="font-farsi bg-white/60 border-white/40"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="font-farsi bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                                >
                                    ارسال نظر
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 font-farsi">
                                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg p-5"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                                <User className="w-5 h-5 text-teal-700" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 font-farsi">{comment.author}</h4>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <Star
                                                            key={rating}
                                                            className={`w-4 h-4 ${rating <= comment.rating
                                                                    ? "text-yellow-500 fill-yellow-500"
                                                                    : "text-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-farsi">
                                            <Clock className="w-4 h-4" />
                                            <span>{comment.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-farsi">{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

