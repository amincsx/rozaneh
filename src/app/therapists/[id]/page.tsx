"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Star, MessageSquare, Calendar, Clock, User } from "lucide-react"
import { therapistsCVData } from "../therapistsCVData"

interface Therapist {
    id: string
    name: string
    rating: number
    experience: number
    hourlyRate: number
    image?: string
    languages: string[]
    availableSlots: number
}

interface Comment {
    id: string
    userName: string
    userEmail?: string
    therapistId: string
    message: string
    rating: number
    reply?: string
    isReplied: boolean
    status: string
    createdAt: string
}

const mockTherapists: Therapist[] = [
    {
        "id": "4",
        "name": "دکتر محسن محمدی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/4/image (12).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "1",
        "name": "دکتر ابوالفضل امینیان",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/1/image (15).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "2",
        "name": "زینب ایرانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/2/image (1).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "3",
        "name": "زهره کیانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/3/image (13).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "5",
        "name": "الهام عسگری",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/5/image (2).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "6",
        "name": "مینا خضری",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/6/image (3).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "7",
        "name": "زهرا بیکی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/7/image (4).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "8",
        "name": " دکتر رضا معیری ",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/8/image (5).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "9",
        "name": "مهسا باغبانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/9/image (6).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "10",
        "name": "مژگان میرزاده",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/10/image (7).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "11",
        "name": "دکتر یاسمن صالح",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/11/image (8).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "12",
        "name": "سارا گلچوبیان",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/12/image (9).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "13",
        "name": "زهرا صادقی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/13/image (10).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "14",
        "name": "دکتر بهار ایروانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/14/image (11).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "15",
        "name": "دکتر نسرین واسعی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/15/image (12).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "16",
        "name": "زهرا سادات اطیابی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/16/image (13).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "17",
        "name": "لیلا بیرانوند",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/17/image (14).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "18",
        "name": " دکتر نگار غایبی ",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/18/image (15).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "19",
        "name": "محمد جدیدکار همدانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/19/image (16).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "20",
        "name": "بهاره نعمتی روشن",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/20/image (17).webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "21",
        "name": "منصوره روحانی فر",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/21/21.webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "22",
        "name": "سیده زهرا نوریزاده",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/22/22.webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "23",
        "name": "فاطمه ماه روح ",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/23/23.webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "24",
        "name": "یاسمن طبائیان ",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/24/24.webp", "languages": ["فارسی"], "availableSlots": 10
    },
    {
        "id": "25",
        "name": "محمد بدرخانی",
        "rating": 4.5, "experience": 10, "hourlyRate": 300000,
        "image": "/psychologists/25/25.webp", "languages": ["فارسی"], "availableSlots": 10
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
    const [therapistCV, setTherapistCV] = useState<typeof therapistsCVData[0] | null>(null)

    const cvText = therapistCV?.rawCv?.trim() || ''

    useEffect(() => {
        const found = mockTherapists.find(t => t.id === therapistId)
        if (found) {
            setTherapist(found)
            // Find CV data
            const cvData = therapistsCVData.find(cv => cv.id === therapistId)
            setTherapistCV(cvData || null)
            // Load comments from database
            fetchComments()
        }
    }, [therapistId])

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?therapistId=${therapistId}`)
            const data = await response.json()
            if (data.success) {
                setComments(data.comments || [])
            }
        } catch (error) {
            console.error('Error loading comments:', error)
        }
    }

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()

        // Detailed validation
        if (!newComment.author || !newComment.author.trim()) {
            alert('لطفاً نام خود را وارد کنید')
            return
        }

        if (!newComment.text || !newComment.text.trim()) {
            alert('لطفاً پیام خود را وارد کنید')
            return
        }

        if (!therapistId) {
            alert('خطا: شناسه مشاور یافت نشد')
            return
        }

        try {
            const payload = {
                therapist_id: therapistId,
                user_name: newComment.author.trim(),
                message: newComment.text.trim(),
                rating: newComment.rating || 5
            }
            console.log('=== Comment Submission ===')
            console.log('Therapist ID:', therapistId)
            console.log('Author:', newComment.author.trim())
            console.log('Message:', newComment.text.trim())
            console.log('Rating:', newComment.rating)
            console.log('Full payload:', JSON.stringify(payload))

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            console.log('Comment response:', data, 'Status:', response.status)

            if (data.success) {
                // Refresh comments list
                fetchComments()
                setNewComment({ author: "", text: "", rating: 5 })
                setShowCommentForm(false)
                alert('نظر شما با موفقیت ثبت شد')
            } else {
                alert(data.message || 'خطا در ثبت نظر')
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
            alert('خطا در ارسال نظر')
        }
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

    // Generate structured data for the therapist
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": therapist.name,
        "image": therapist.image ? `https://rozaneh.com${therapist.image}` : undefined,
        "jobTitle": "روانشناس و مشاور",
        "worksFor": {
            "@type": "MedicalOrganization",
            "name": "کلینیک روانشناسی روزنه",
            "url": "https://rozaneh.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": therapist.rating,
            "reviewCount": comments.length
        },
        "offers": {
            "@type": "Offer",
            "description": "خدمات مشاوره روانشناختی",
            "price": therapist.hourlyRate,
            "priceCurrency": "IRR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />

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
                                <div className="mt-16">
                                    <h1 className="text-3xl sm:text-4xl text-slate-800 mb-3 font-farsi font-bold text-center">
                                        {therapist.name}
                                    </h1>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mb-8">
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

                    {/* CV Section */}
                    <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 font-farsi mb-6 flex items-center gap-2">
                            <User className="w-6 h-6" />
                            رزومه و اطلاعات حرفه‌ای
                        </h2>

                        <div className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-xl p-6">
                            <p className="text-slate-700 font-farsi leading-relaxed whitespace-pre-wrap">
                                {cvText || "اطلاعاتی برای نمایش وجود ندارد."}
                            </p>
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
                                                    <h4 className="font-semibold text-slate-800 font-farsi">{comment.userName}</h4>
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
                                                {/* Use a date formatter or simple toLocaleString */}
                                                <span>{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed font-farsi">{comment.message}</p>

                                        {comment.reply && (
                                            <div className="mt-4 mr-8 p-4 bg-teal-50 border-r-2 border-teal-500 rounded-l-lg">
                                                <div className="flex items-center gap-2 mb-2 text-teal-700 font-semibold text-sm">
                                                    <User className="w-4 h-4" />
                                                    <span>پاسخ مشاور</span>
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed">{comment.reply}</p>
                                            </div>
                                        )}
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
        </>
    )
}

