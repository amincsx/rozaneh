"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Therapist {
    therapist_id: number;
    name: string;
    email: string;
    phone: string;
    specializations: string[];
    experience_years: number;
    bio: string;
    rating: number;
    image?: string;
}

interface Comment {
    _id: string;
    user_name: string;
    user_email?: string;
    therapist_id: number;
    message: string;
    rating: number;
    reply?: string;
    status: 'pending' | 'replied';
    created_at: string;
}

const defaultTherapists: { [key: number]: Therapist } = {
    1: { therapist_id: 1, name: 'دکتر ابوالفضل امینیان', email: 'therapist1@rozaneh.com', phone: '09123450001', specializations: ['مشاوره پیش از ازدواج', 'مشاوره در زمینه تعارض زناشویی', 'سکس تراپی'], experience_years: 10, bio: 'دکتری تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج مشاوره در زمینه تعارض زناشویی سکس تراپی', rating: 4.5, image: '/psychologists/1/image (15).webp' },
    2: { therapist_id: 2, name: 'زینب ایرانی', email: 'therapist2@rozaneh.com', phone: '09123450002', specializations: ['مشاوره پیش از ازدواج', 'خانواده درمانی', 'زندگی مشترک و تعارضات زوجین'], experience_years: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی زندگی مشترک و تعارضات زوجین', rating: 4.5, image: '/psychologists/2/image (1).webp' },
    3: { therapist_id: 3, name: 'زهره کیانی', email: 'therapist3@rozaneh.com', phone: '09123450003', specializations: ['مشاوره پیش از ازدواج', 'خانواده درمانی', 'سکس تراپی', 'زندگی مشترک و تعارضات زوجین', 'گروه درمانی و مشاوره گروهی'], experience_years: 10, bio: 'زهره کیانی - متخصص مشاوره پیش از ازدواج و خانواده درمانی', rating: 4.5, image: '/psychologists/3/image (13).webp' },
    4: { therapist_id: 4, name: 'دکتر محسن محمدی', email: 'therapist4@rozaneh.com', phone: '09123450004', specializations: ['عضو هیئت علمی دانشگاه', 'مدیر مرکز مشاوره روزنه'], experience_years: 10, bio: 'دکترای تخصصی مشاوره - مشاور و رواندرمانگر عضو هیئت علمی دانشگاه مدیر مرکز مشاوره روزنه', rating: 4.5, image: '/psychologists/4/image (12).webp' },
    5: { therapist_id: 5, name: 'الهام عسگری', email: 'therapist5@rozaneh.com', phone: '09123450005', specializations: ['مشاوره پیش از ازدواج، زوج و خانواده درمانی', 'مشاوره در زمینه تعارض زناشویی', 'کارشناس روانشناسی بالینی'], experience_years: 10, bio: 'متخصص روانشناسی شخصیت- مشاوره فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشویی کارشناس روانشناسی بالینی', rating: 4.5, image: '/psychologists/5/image (2).webp' },
    6: { therapist_id: 6, name: 'مینا خضری', email: 'therapist6@rozaneh.com', phone: '09123450006', specializations: ['مشاوره پیش از ازدواج، زوج و خانواده درمانی', 'مشاوره در زمینه تعارض زناشویی'], experience_years: 10, bio: 'متخصص مشاوره خانواده - مشاوره فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشویی', rating: 4.5, image: '/psychologists/6/image (3).webp' },
    7: { therapist_id: 7, name: 'زهرا بیگی', email: 'therapist7@rozaneh.com', phone: '09123450007', specializations: ['مشاوره پیش از ازدواج، زوج و خانواده درمانی', 'مشاوره نوجوان', 'تعارض ها و مشکلات بین فردی'], experience_years: 10, bio: 'متخصص مشاوره - مشاور و درمانگر فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره نوجوان تعارض ها و مشکلات بین فردی', rating: 4.5, image: '/psychologists/7/image (4).webp' },
    8: { therapist_id: 8, name: 'رضا معیری', email: 'therapist8@rozaneh.com', phone: '09123450008', specializations: ['مشاوره فردی وسواس، افسردگی، شکست عاطفی و ...', 'مشاوره پیش از ازدواج، زوج و خانواده درمانی', 'مشاوره در زمینه تعارض ها و مشکلات بین فردی'], experience_years: 10, bio: 'دکترای تخصصی روانشناسی - درمانگر بالینی مشاوره فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض ها و مشکلات بین فردی', rating: 4.5, image: '/psychologists/8/image (5).webp' },
    9: { therapist_id: 9, name: 'مهسا باغبانی', email: 'therapist9@rozaneh.com', phone: '09123450009', specializations: ['مشاوره فردی', 'وسواس، افسردگی، شکست عاطفی، اختلالات خلقی', 'مشاوره در زمینه تعارض ها و مشکلات بین فردی'], experience_years: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی وسواس، افسردگی، شکست عاطفی، اختلالات خلقی مشاوره در زمینه تعارض ها و مشکلات بین فردی', rating: 4.5, image: '/psychologists/9/image (6).webp' },
    10: { therapist_id: 10, name: 'مژگان میرزاده', email: 'therapist10@rozaneh.com', phone: '09123450010', specializations: ['درمان اختلالات یادگیری و کمبود توجه و تمرکز', 'اجرا و تحلیل آزمون های هوش', 'تشخیص و آموزش در حیطه اتیسم'], experience_years: 10, bio: 'متخصص روانشناسی بالینی- درمانگر کودک و نوجوان درمان اختلالات یادگیری و کمبود توجه و تمرکز اجرا و تحلیل آزمون های هوش تشخیص و آموزش در حیطه اتیسم', rating: 4.5, image: '/psychologists/10/image (7).webp' },
    11: { therapist_id: 11, name: 'دکتر یاسمن صالح', email: 'therapist11@rozaneh.com', phone: '09123450011', specializations: ['مشاوره فردی'], experience_years: 10, bio: 'دکتر یاسمن صالح - متخصص مشاوره فردی', rating: 4.5, image: '/psychologists/11/image (8).webp' },
    12: { therapist_id: 12, name: 'سارا گلچوبیان', email: 'therapist12@rozaneh.com', phone: '09123450012', specializations: ['مشاوره فردی'], experience_years: 10, bio: 'سارا گلچوبیان - متخصص مشاوره فردی', rating: 4.5, image: '/psychologists/12/image (9).webp' },
    13: { therapist_id: 13, name: 'زهرا صادقی', email: 'therapist13@rozaneh.com', phone: '09123450013', specializations: ['مشاوره فردی وسواس، افسردگی، اضطراب و..', 'تعارضات بین فردی', 'مانگر حوزه نوجوان', 'خانواده درمانی', 'مشاوره زوج'], experience_years: 10, bio: 'متخصص مشاوره - مشاوره فردی (وسواس، افسردگی، اضطراب و..) تعارضات بین فردی مانگر حوزه نوجوان خانواده درمانی مشاوره زوج', rating: 4.5, image: '/psychologists/13/image (10).webp' },
    14: { therapist_id: 14, name: 'دکتر بهار ایروانی', email: 'therapist14@rozaneh.com', phone: '09123450014', specializations: ['مشاوره پیش از ازدواج', 'مشاوره فردی', 'مشاوره خانواده'], experience_years: 10, bio: 'دکترای تخصصی مشاوره - زوج درمانی( مشاوره در زمینه تعارض های زوجی و پیمان شکنی عاطفی) مشاوره پیش از ازدواج مشاوره فردی مشاوره خانواده', rating: 4.5, image: '/psychologists/14/image (11).webp' },
    15: { therapist_id: 15, name: 'دکتر نسرین واسعی', email: 'therapist15@rozaneh.com', phone: '09123450015', specializations: ['مشاوره پیش از ازدواج، زوج و خانواده درمانی', 'حل تعارضات زناشویی'], experience_years: 10, bio: 'دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شکست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی حل تعارضات زناشویی', rating: 4.5, image: '/psychologists/15/image (12).webp' },
    16: { therapist_id: 16, name: 'زهرا سادات اطیابی', email: 'therapist16@rozaneh.com', phone: '09123450016', specializations: ['مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...', 'مشاوره زوج و خانواده درمانی تعارضات زناشویی و..', 'درمانگر نوجوان', 'مشاوره پیش از ازدواج'], experience_years: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی (پنیک، افسردگی، اضطراب، وسواس و ...) مشاوره زوج و خانواده درمانی(تعارضات زناشویی و..) درمانگر نوجوان مشاوره پیش از ازدواج', rating: 4.5, image: '/psychologists/16/image (13).webp' },
    17: { therapist_id: 17, name: 'لیلا بیرانوند', email: 'therapist17@rozaneh.com', phone: '09123450017', specializations: ['فرزند پروری'], experience_years: 10, bio: 'متخصص روانشناسی بالینی - متخصص در حوزه کودک و نوجوان فرزند پروری', rating: 4.5, image: '/psychologists/17/image (14).webp' },
    18: { therapist_id: 18, name: 'نگار غایبی', email: 'therapist18@rozaneh.com', phone: '09123450018', specializations: ['مشاوره'], experience_years: 10, bio: 'دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، سوگ، شکست عاطفی و...)  مشاوره زوج و خانواده درمانی', rating: 4.5, image: '/psychologists/18/image (15).webp' },
    19: { therapist_id: 19, name: 'محمد جدیدکار همدانی', email: 'therapist19@rozaneh.com', phone: '09123450019', specializations: ['مشاوره فردی'], experience_years: 10, bio: 'محمد جدیدکار همدانی - متخصص مشاوره فردی', rating: 4.5, image: '/psychologists/19/image (16).webp' },
    20: { therapist_id: 20, name: 'بهاره نعمتی روشن', email: 'therapist20@rozaneh.com', phone: '09123450020', specializations: ['مشاوره پیش از ازدواج - زوج و خانواده درمانی'], experience_years: 10, bio: 'متخصص روانشناسی بالینی - - مشاوره فردی  در خصوص اختلالات شخصیت( وسواس ، اضطراب، افسردگی و .. ) - مشاوره پیش از ازدواج - زوج و خانواده درمانی', rating: 4.5, image: '/psychologists/20/image (17).webp' }
};

export default function TherapistDashboardDynamic({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeTab, setActiveTab] = useState<'profile' | 'comments'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [editForm, setEditForm] = useState<Partial<Therapist>>({});
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
    const [isClient, setIsClient] = useState(false);
    const [submittingReply, setSubmittingReply] = useState<{ [key: string]: boolean }>({});
    const [commentsLoading, setCommentsLoading] = useState(false);

    const therapistId = parseInt(resolvedParams.id);

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^09\d{9}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = (): string => {
        if (!editForm.name?.trim()) return 'نام الزامی است';
        if (!editForm.email?.trim()) return 'ایمیل الزامی است';
        if (!validateEmail(editForm.email)) return 'ایمیل نامعتبر است';
        if (!editForm.phone?.trim()) return 'تلفن الزامی است';
        if (!validatePhone(editForm.phone)) return 'شماره تلفن باید با 09 شروع شده و 11 رقم باشد';
        if (!editForm.experience_years || editForm.experience_years < 0) return 'سال تجربه باید مثبت باشد';
        if (!editForm.bio?.trim()) return 'بیوگرافی الزامی است';
        if (!editForm.specializations?.length || editForm.specializations.some(s => !s.trim())) {
            return 'حداقل یک تخصص باید وارد شود';
        }
        return '';
    };

    // Load comments function
    const fetchComments = async () => {
        if (!therapistId) return;

        try {
            setCommentsLoading(true);
            const response = await fetch(`/api/comments?therapistId=${therapistId}`);
            const data = await response.json();

            if (data.success) {
                setComments(data.comments || []);
            } else {
                console.error('Error loading comments:', data.message);
            }
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => {
        setIsClient(true);

        // Validate therapist ID
        if (isNaN(therapistId) || therapistId < 1 || therapistId > 20) {
            setError('شناسه درمانگر نامعتبر است');
            setTimeout(() => router.push('/therapist-login'), 2000);
            return;
        }

        // Check authentication
        const isLoggedIn = localStorage.getItem(`therapist_${therapistId}_logged_in`);
        if (!isLoggedIn) {
            setError('شما وارد نشده‌اید');
            setTimeout(() => router.push('/therapist-login'), 2000);
            return;
        }

        // Load therapist data
        try {
            const therapistDataStr = localStorage.getItem(`therapist_${therapistId}_data`);
            let therapistData: Therapist;

            if (therapistDataStr) {
                therapistData = JSON.parse(therapistDataStr);
            } else {
                therapistData = defaultTherapists[therapistId];
                if (!therapistData) {
                    setError('اطلاعات درمانگر یافت نشد');
                    return;
                }
                // Save to localStorage for future use
                localStorage.setItem(`therapist_${therapistId}_data`, JSON.stringify(therapistData));
            }

            setTherapist(therapistData);
            setEditForm(therapistData);

        } catch (error) {
            console.error('Error loading therapist data:', error);
            setError('خطا در بارگذاری اطلاعات درمانگر');
        }

        // Load comments
        fetchComments();
        setLoading(false);
    }, [therapistId, router]);

    const handleLogout = () => {
        try {
            localStorage.removeItem(`therapist_${therapistId}_logged_in`);
            localStorage.removeItem(`therapist_${therapistId}_data`);
            router.push('/therapist-login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleProfileSave = async () => {
        try {
            // Validate form
            const validationError = validateForm();
            if (validationError) {
                alert(validationError);
                return;
            }

            // Save to localStorage
            const updatedData = { ...therapist!, ...editForm };
            localStorage.setItem(`therapist_${therapistId}_data`, JSON.stringify(updatedData));
            setTherapist(updatedData);
            setIsEditing(false);
            alert('پروفایل با موفقیت به‌روزرسانی شد');
        } catch (error) {
            console.error('Profile save error:', error);
            alert('خطا در به‌روزرسانی پروفایل');
        }
    };

    const handleReplySubmit = async (commentId: string) => {
        const reply = replyText[commentId]?.trim();
        if (!reply) {
            alert('لطفا پاسخ خود را بنویسید');
            return;
        }

        try {
            setSubmittingReply(prev => ({ ...prev, [commentId]: true }));

            const response = await fetch('/api/comments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id: commentId,
                    reply: reply,
                    therapist_id: therapistId
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update local state
                setComments(comments.map(comment =>
                    comment._id === commentId
                        ? { ...comment, reply, status: 'replied' as const }
                        : comment
                ));
                setReplyText(prev => ({ ...prev, [commentId]: '' }));
                alert('پاسخ با موفقیت ارسال شد');
            } else {
                alert(data.message || 'خطا در ارسال پاسخ');
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
            alert('خطا در ارسال پاسخ');
        } finally {
            setSubmittingReply(prev => ({ ...prev, [commentId]: false }));
        }
    };

    const handleSpecializationsChange = (value: string) => {
        const specializations = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
        setEditForm({ ...editForm, specializations });
    };

    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('fa-IR');
        } catch {
            return dateString;
        }
    };

    // Don't render on server-side until we're on the client
    if (!isClient) {
        return null;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">خطا</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link href="/therapist-login" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                        برگشت به صفحه ورود
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    if (!therapist) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">خطا</h2>
                    <p className="text-gray-600 mb-4">اطلاعات درمانگر یافت نشد</p>
                    <Link href="/therapist-login" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                        برگشت به صفحه ورود
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {therapist.image && (
                            <img
                                src={therapist.image}
                                alt={therapist.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-teal-700">{therapist.name}</h1>
                            <p className="text-gray-600">{therapist.specializations[0]}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/30 transition"
                        >
                            خروج
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Tab Navigation */}
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2 mb-8 flex gap-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 py-3 px-6 rounded-lg transition ${activeTab === 'profile'
                            ? 'bg-white shadow-md text-teal-700'
                            : 'text-gray-600 hover:bg-white/50'
                            }`}
                    >
                        پروفایل
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`flex-1 py-3 px-6 rounded-lg transition relative ${activeTab === 'comments'
                            ? 'bg-white shadow-md text-teal-700'
                            : 'text-gray-600 hover:bg-white/50'
                            }`}
                    >
                        نظرات
                        {comments.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {comments.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">اطلاعات پروفایل</h2>
                            <button
                                onClick={() => {
                                    if (isEditing) {
                                        setEditForm({ ...therapist });
                                    }
                                    setIsEditing(!isEditing);
                                }}
                                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                            >
                                {isEditing ? 'لغو' : 'ویرایش'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">نام</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.name || ''}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">ایمیل</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editForm.email || ''}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">تلفن</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.phone || ''}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="09123456789"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">سال‌های تجربه</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={editForm.experience_years || ''}
                                        onChange={(e) => setEditForm({ ...editForm, experience_years: parseInt(e.target.value) || 0 })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.experience_years} سال</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-semibold mb-2">تخصص‌ها</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editForm.specializations?.join(', ') || ''}
                                        onChange={(e) => handleSpecializationsChange(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="تخصص‌ها را با کاما جدا کنید"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.specializations?.join(', ')}</p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-semibold mb-2">بیوگرافی</label>
                                {isEditing ? (
                                    <textarea
                                        value={editForm.bio || ''}
                                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent h-32"
                                        required
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">{therapist.bio}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setEditForm({ ...therapist });
                                        setIsEditing(false);
                                    }}
                                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition"
                                >
                                    لغو
                                </button>
                                <button
                                    onClick={handleProfileSave}
                                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
                                >
                                    ذخیره تغییرات
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && (
                    <div className="space-y-6">
                        {commentsLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
                                <p className="mt-2 text-gray-600">در حال بارگذاری نظرات...</p>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                                <p className="text-gray-600 text-lg">هنوز نظری ثبت نشده است</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{comment.user_name}</h3>
                                            {comment.user_email && (
                                                <p className="text-gray-600 text-sm">{comment.user_email}</p>
                                            )}
                                            <p className="text-gray-500 text-sm">
                                                {formatDate(comment.created_at)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {comment.rating && (
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="text-sm text-gray-600">{comment.rating}/5</span>
                                                </div>
                                            )}
                                            <span className={`px-3 py-1 rounded-full text-sm ${comment.status === 'replied'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {comment.status === 'replied' ? 'پاسخ داده شده' : 'منتظر پاسخ'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <p className="text-gray-700">{comment.message}</p>
                                    </div>

                                    {comment.reply && (
                                        <div className="bg-teal-50 rounded-lg p-4 mb-4 border-r-4 border-teal-500">
                                            <p className="text-gray-700 font-semibold text-sm mb-1">پاسخ شما:</p>
                                            <p className="text-gray-700">{comment.reply}</p>
                                        </div>
                                    )}

                                    {comment.status === 'pending' && (
                                        <div className="space-y-3">
                                            <textarea
                                                value={replyText[comment._id] || ''}
                                                onChange={(e) => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                                                placeholder="پاسخ خود را بنویسید..."
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent h-24"
                                            />
                                            <button
                                                onClick={() => handleReplySubmit(comment._id)}
                                                disabled={submittingReply[comment._id] || !replyText[comment._id]?.trim()}
                                                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            >
                                                {submittingReply[comment._id] ? 'در حال ارسال...' : 'ارسال پاسخ'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}