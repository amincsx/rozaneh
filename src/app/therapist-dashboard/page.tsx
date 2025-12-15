"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

interface Therapist {
    therapist_id: string;
    name: string;
    email: string;
    phone: string;
    specializations: string[];
    experience_years: number;
    bio: string;
    rating: number;
    hourly_rate: number;
}

interface Comment {
    id: string;
    userName: string;
    userEmail: string;
    therapistId: string;
    message: string;
    reply?: string;
    status: string;
    createdAt: string;
}

export default function TherapistDashboardPage() {
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState<Partial<Therapist>>({});
    const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

    // Mock login check - in real app would check authentication
    useEffect(() => {
        // For now, simulate therapist data - replace with actual auth check
        const mockTherapist: Therapist = {
            therapist_id: '4', // HARDCODED ID FOR DEMO
            name: 'دکتر محسن محمدی',
            email: 'mohsen@rozaneh.com',
            phone: '09123456789',
            specializations: ['عضو هیئت علمی دانشگاه', 'مدیر مرکز مشاوره روزنه'],
            experience_years: 15,
            bio: 'دکترای تخصصی مشاوره -  مشاور و رواندرمانگر عضو هیئت علمی دانشگاه مدیر مرکز مشاوره روزنه',
            rating: 4.5,
            hourly_rate: 300000
        };

        setTherapist(mockTherapist);
        setEditForm(mockTherapist);

        // Fetch comments from API
        fetchComments(mockTherapist.therapist_id);
    }, []);

    const fetchComments = async (therapistId: string) => {
        try {
            const response = await fetch(`/api/comments?therapistId=${therapistId}`);
            const data = await response.json();
            if (data.success) {
                setComments(data.comments || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSave = async () => {
        try {
            // TODO: Send update to API
            console.log('Saving profile:', editForm);
            setTherapist({ ...therapist!, ...editForm });
            setIsEditing(false);
            alert('پروفایل با موفقیت به‌روزرسانی شد');
        } catch (error) {
            alert('خطا در به‌روزرسانی پروفایل');
        }
    };

    const handleReplySubmit = async (commentId: string) => {
        try {
            const reply = replyText[commentId];
            if (!reply?.trim()) return;

            const response = await fetch('/api/comments', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId, reply })
            });
            const data = await response.json();

            if (data.success) {
                setComments(comments.map(comment =>
                    comment.id === commentId
                        ? { ...comment, reply, status: 'replied', isReplied: true }
                        : comment
                ));

                setReplyText({ ...replyText, [commentId]: '' });
                alert('پاسخ با موفقیت ارسال شد');
            } else {
                alert(data.message || 'خطا در ارسال پاسخ');
            }
        } catch (error) {
            alert('خطا در ارسال پاسخ');
        }
    };

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

    return (
        <div className="min-h-screen font-arabic bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-teal-700">پنل درمانگر</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">{therapist?.name}</span>
                        <Link href="/" className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/30 transition">
                            خروج
                        </Link>
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
                        پروفایل من
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`flex-1 py-3 px-6 rounded-lg transition ${activeTab === 'comments'
                            ? 'bg-white shadow-md text-teal-700'
                            : 'text-gray-600 hover:bg-white/50'
                            }`}
                    >
                        نظرات و پیام‌ها
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && therapist && (
                    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">اطلاعات پروفایل</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
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
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                                        value={editForm.experience_years || ''}
                                        onChange={(e) => setEditForm({ ...editForm, experience_years: parseInt(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
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
                                        onChange={(e) => setEditForm({ ...editForm, specializations: e.target.value.split(', ') })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                        placeholder="تخصص‌ها را با کاما جدا کنید"
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
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-32"
                                    />
                                ) : (
                                    <p className="p-3 bg-gray-50 rounded-lg">{therapist.bio}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="mt-6 flex justify-end">
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
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{comment.userName}</h3>
                                        <p className="text-gray-600 text-sm">{comment.userEmail}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${comment.status === 'replied' || comment.reply
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {comment.reply ? 'پاسخ داده شده' : 'منتظر پاسخ'}
                                    </span>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <p className="text-gray-700">{comment.message}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(comment.createdAt).toLocaleDateString('fa-IR')}
                                    </p>
                                </div>

                                {comment.reply && (
                                    <div className="bg-teal-50 rounded-lg p-4 mb-4 border-r-4 border-teal-500">
                                        <p className="text-gray-700 font-semibold text-sm mb-1">پاسخ شما:</p>
                                        <p className="text-gray-700">{comment.reply}</p>
                                    </div>
                                )}

                                {!comment.reply && (
                                    <div className="space-y-3">
                                        <textarea
                                            value={replyText[comment.id] || ''}
                                            onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                                            placeholder="پاسخ خود را بنویسید..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 h-24"
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(comment.id)}
                                            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                                        >
                                            ارسال پاسخ
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {comments.length === 0 && (
                            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg">
                                <p className="text-gray-500">هیچ نظر یا پیامی موجود نیست</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

