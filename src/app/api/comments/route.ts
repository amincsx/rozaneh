import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// In-memory storage for demo purposes (replace with database in production)
let commentsStorage: any[] = [
    {
        id: "demo1",
        therapistId: "1",
        userName: "علی احمدی",
        userEmail: "ali@test.com",
        message: "جلسات بسیار مفید بود. از مشاوره‌های دکتر بسیار راضی هستم.",
        rating: 5,
        reply: null,
        isReplied: false,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "demo2",
        therapistId: "1",
        userName: "مریم حسینی",
        userEmail: "maryam@test.com",
        message: "روش درمانی عالی بود و کمک زیادی به حل مشکلاتم کرد.",
        rating: 4,
        reply: "متشکرم از اعتماد شما. خوشحالم که توانستم کمکتان کنم.",
        isReplied: true,
        status: 'replied',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString()
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const therapistId = searchParams.get('therapistId');

        if (!therapistId) {
            return NextResponse.json(
                { success: false, message: 'شناسه درمانگر الزامی است' },
                { status: 400 }
            );
        }

        // Try to get comments from database first
        try {
            const comments = await prisma.comment.findMany({
                where: {
                    therapistId: therapistId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            // Convert Prisma format to API format
            const formattedComments = comments.map(comment => ({
                id: comment.id,
                therapistId: comment.therapistId,
                userName: comment.userName,
                userEmail: comment.userEmail,
                message: comment.message,
                rating: comment.rating,
                reply: comment.reply,
                isReplied: comment.isReplied,
                status: comment.isReplied ? 'replied' : 'pending',
                createdAt: comment.createdAt.toISOString(),
                updatedAt: comment.updatedAt.toISOString()
            }));

            return NextResponse.json({
                success: true,
                comments: formattedComments
            });
        } catch (dbError) {
            console.log('Database not available, using in-memory storage:', dbError);
            // Fallback to in-memory storage if database is not available
            const comments = commentsStorage
                .filter(comment => comment.therapistId.toString() === therapistId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            return NextResponse.json({
                success: true,
                comments
            });
        }
    } catch (error) {
        console.error('[Comments] Error fetching comments:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در بارگذاری نظرات' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('[API] Raw body received:', JSON.stringify(body));

        const { therapist_id, user_name, user_email, message, rating } = body;
        console.log('[API] Parsed fields:', {
            therapist_id: therapist_id || '(missing)',
            user_name: user_name || '(missing)',
            message: message || '(missing)',
            rating: rating || '(missing)'
        });

        // Validation
        if (!therapist_id || !user_name || !message) {
            console.log('[API] Validation FAILED - Missing required fields');
            return NextResponse.json(
                { success: false, message: 'اطلاعات ناکامل است' },
                { status: 400 }
            );
        }

        console.log('[API] Validation passed, proceeding with comment creation');

        // Validate therapist ID (1-20 as string)
        if (!['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].includes(therapist_id.toString())) {
            return NextResponse.json(
                { success: false, message: 'شناسه درمانگر نامعتبر است' },
                { status: 400 }
            );
        }

        try {
            // Create comment in database
            const newComment = await prisma.comment.create({
                data: {
                    therapistId: therapist_id.toString(),
                    userName: user_name.trim(),
                    userEmail: user_email || null,
                    message: message.trim(),
                    rating: rating || 5,
                    isReplied: false,
                    status: 'PENDING'
                }
            });

            // Convert to API format
            const formattedComment = {
                id: newComment.id,
                therapistId: newComment.therapistId,
                userName: newComment.userName,
                userEmail: newComment.userEmail,
                message: newComment.message,
                rating: newComment.rating,
                reply: newComment.reply,
                isReplied: newComment.isReplied,
                status: 'pending',
                createdAt: newComment.createdAt.toISOString(),
                updatedAt: newComment.updatedAt.toISOString()
            };

            return NextResponse.json({
                success: true,
                message: 'نظر شما با موفقیت ثبت شد',
                comment: formattedComment
            });
        } catch (dbError) {
            console.log('Database not available, using in-memory storage:', dbError);
            // Fallback to in-memory storage
            const newComment = {
                id: `comment_${Date.now()}`,
                therapistId: therapist_id,
                userName: user_name.trim(),
                userEmail: user_email || null,
                message: message.trim(),
                rating: rating || 5,
                reply: null,
                isReplied: false,
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            commentsStorage.push(newComment);

            return NextResponse.json({
                success: true,
                message: 'نظر شما با موفقیت ثبت شد',
                comment: newComment
            });
        }
    } catch (error) {
        console.error('[Comments] Error creating comment:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در ثبت نظر' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { comment_id, reply, therapist_id } = await request.json();

        if (!comment_id || !reply || !therapist_id) {
            return NextResponse.json(
                { success: false, message: 'اطلاعات ناکامل است' },
                { status: 400 }
            );
        }

        try {
            // Update comment in database
            const updatedComment = await prisma.comment.update({
                where: {
                    id: comment_id,
                    therapistId: therapist_id.toString()
                },
                data: {
                    reply: reply.trim(),
                    isReplied: true,
                    status: 'APPROVED',
                    updatedAt: new Date()
                }
            });

            return NextResponse.json({
                success: true,
                message: 'پاسخ با موفقیت ثبت شد'
            });
        } catch (dbError) {
            console.log('Database not available, using in-memory storage:', dbError);
            // Fallback to in-memory storage
            const commentIndex = commentsStorage.findIndex(
                comment => comment._id === comment_id && comment.therapist_id.toString() === therapist_id.toString()
            );

            if (commentIndex === -1) {
                return NextResponse.json(
                    { success: false, message: 'نظر یافت نشد' },
                    { status: 404 }
                );
            }

            // Update comment with reply
            commentsStorage[commentIndex] = {
                ...commentsStorage[commentIndex],
                reply: reply.trim(),
                status: 'replied',
                updated_at: new Date().toISOString()
            };

            return NextResponse.json({
                success: true,
                message: 'پاسخ با موفقیت ثبت شد'
            });
        }
    } catch (error) {
        console.error('[Comments] Error updating comment:', error);
        return NextResponse.json(
            { success: false, message: 'خطا در ثبت پاسخ' },
            { status: 500 }
        );
    }
}