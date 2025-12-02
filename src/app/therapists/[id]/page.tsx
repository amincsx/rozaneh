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
        "bio": "متخصص مشاوره خانواده - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی سکس تراپی زندگی مشترک و تعارضات زوجین گروه درمانی و مشاوره گروهی",
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
            <main className="min-h-screen w-full font-farsi bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">مشاور یافت نشد</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full font-farsi bg-slate-50">
            {/* Back Button */}
            <div className="px-4 sm:px-6 lg:px-8 pt-4 ml-4">
                <Link href="/therapists" className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 font-light px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30 hover:scale-105 shadow-sm text-sm">
                    بازگشت
                </Link>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-0 max-w-6xl">
                {/* Profile Header */}
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="md:flex">
                        {/* Image */}
                        <div className="relative w-full md:w-96 h-80 md:h-96 bg-gradient-to-br from-teal-50 to-blue-50 flex-shrink-0 flex items-center justify-center">
                            {therapist.image ? (
                                <img
                                    src={therapist.image}
                                    alt={therapist.name}
                                    className="w-full h-full object-contain p-0 scale-150"
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
                        <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 font-farsi">
                                    {therapist.name}
                                </h1>

                                <p className="text-slate-700 mb-6 leading-relaxed font-farsi text-base">
                                    {therapist.bio}
                                </p>

                                {/* Specializations */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-slate-600 mb-3 font-farsi">تخصص‌ها:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {therapist.specializations.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-teal-100/50 text-slate-700 text-xs rounded-full font-farsi font-medium border border-teal-200"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href={`/book-appointment?therapist=${therapist.id}`} className="flex-1">
                                    <Button className="w-full font-farsi bg-teal-600 hover:bg-teal-700 text-white h-11 text-sm font-medium shadow-md cursor-pointer">
                                        <Calendar className="w-4 h-4 ml-2" />
                                        رزرو نوبت
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 font-farsi flex items-center gap-2">
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
                        <form onSubmit={handleSubmitComment} className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl p-6 mb-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 font-farsi">
                                        نام شما
                                    </label>
                                    <Input
                                        value={newComment.author}
                                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                        placeholder="نام خود را وارد کنید"
                                        className="font-farsi bg-white/70 border-white/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 font-farsi">
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
                                    <label className="block text-sm font-medium text-slate-700 mb-2 font-farsi">
                                        نظر شما
                                    </label>
                                    <Textarea
                                        value={newComment.text}
                                        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                                        placeholder="نظر خود را بنویسید..."
                                        rows={4}
                                        className="font-farsi bg-white/70 border-white/50"
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
                            <div className="text-center py-12 text-slate-500 font-farsi">
                                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl p-5"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                                <User className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800 font-farsi">{comment.author}</h4>
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
                                        <div className="flex items-center gap-2 text-sm text-slate-500 font-farsi">
                                            <Clock className="w-4 h-4" />
                                            <span>{comment.date}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed font-farsi">{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
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
        </main>
    )
}

