import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        const { therapist_id, password } = await request.json();

        console.log('[TherapistLogin] Login attempt for therapist ID:', therapist_id);

        // Validation
        if (!therapist_id || !password) {
            return NextResponse.json(
                { success: false, message: 'شناسه درمانگر و رمز عبور الزامی است' },
                { status: 400 }
            );
        }

        // Check admin password for all therapists
        if (password !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'رمز عبور اشتباه است' },
                { status: 401 }
            );
        }

        // Validate therapist ID (1-20)
        const therapistNum = parseInt(therapist_id);
        if (isNaN(therapistNum) || therapistNum < 1 || therapistNum > 20) {
            return NextResponse.json(
                { success: false, message: 'شناسه درمانگر باید بین 1 تا 20 باشد' },
                { status: 400 }
            );
        }

        // Create therapist profile data with REAL therapist information
        const therapistProfiles = {
            1: { name: 'دکتر ابوالفضل امینیان', specialization: 'مشاوره پيش از ازدواج', experience: 10, bio: 'دکتری تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پيش از ازدواج مشاوره در زمینه تعارض زناشويی سکس تراپی' },
            2: { name: 'زینب ایرانی', specialization: 'مشاوره پیش از ازدواج', experience: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی زندگی مشترک و تعارضات زوجین' },
            3: { name: 'زهره کیانی', specialization: 'مشاوره پیش از ازدواج', experience: 10, bio: 'زهره کیانی - متخصص مشاوره پیش از ازدواج و خانواده درمانی' },
            4: { name: 'دکتر محسن محمدی', specialization: 'عضو هیئت علمی دانشگاه', experience: 10, bio: 'دکترای تخصصی مشاوره -  مشاور و رواندرمانگر عضو هیئت علمی دانشگاه مدیر مرکز مشاوره روزنه' },
            5: { name: 'الهام عسگری', specialization: 'مشاوره پیش از ازدواج، زوج و خانواده درمانی', experience: 10, bio: 'متخصص  روانشناسی شخصیت- مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی کارشناس روانشناسی بالینی' },
            6: { name: 'مینا خضری', specialization: 'مشاوره پیش از ازدواج، زوج و خانواده درمانی', experience: 10, bio: 'متخصص مشاوره خانواده - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی' },
            7: { name: 'زهرا بیگی', specialization: 'مشاوره پیش از ازدواج، زوج و خانواده درمانی', experience: 10, bio: 'متخصص مشاوره - مشاور و درمانگر فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره نوجوان تعارض ها و مشکلات بین فردی' },
            8: { name: 'رضا معیری', specialization: 'مشاوره فردی وسواس، افسردگی، شكست عاطفی و ...', experience: 10, bio: 'دکترای تخصصی روانشناسی - درمانگر بالینی مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض ها و مشکلات بین فردی' },
            9: { name: 'مهسا باغبانی', specialization: 'مشاوره فردی', experience: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی وسواس، افسردگی، شكست عاطفی، اختلالات خلقی مشاوره در زمینه تعارض ها و مشکلات بین فردی' },
            10: { name: 'مژگان میرزاده', specialization: 'درمان اختلالات یادگیری و كمبود توجه و تمركز', experience: 10, bio: 'متخصص روانشناسی بالینی- درمانگر کودک و نوجوان درمان اختلالات یادگیری و كمبود توجه و تمركز اجرا و تحليل آزمون هاي هوش تشخيص و آموزش در حيطه اتيسم' },
            11: { name: 'دکتر یاسمن صالح', specialization: 'مشاوره فردی', experience: 10, bio: 'دکتر یاسمن صالح - متخصص مشاوره فردی' },
            12: { name: 'سارا گلچوبیان', specialization: 'مشاوره فردی', experience: 10, bio: 'سارا گلچوبیان - متخصص مشاوره فردی' },
            13: { name: 'زهرا صادقی', specialization: 'مشاوره فردی وسواس، افسردگی، اضطراب و..', experience: 10, bio: 'متخصص مشاوره - مشاوره فردی (وسواس، افسردگی، اضطراب و..) تعارضات بین فردی مانگر حوزه نوجوان خانواده درمانی مشاوره زوج' },
            14: { name: 'دکتر بهار ایروانی', specialization: 'مشاوره پیش از ازدواج', experience: 10, bio: 'دکترای تخصصی مشاوره - زوج درمانی( مشاوره در زمینه تعارض های زوجی و پیمان شکنی عاطفی) مشاوره پیش از ازدواج مشاوره فردی مشاوره خانواده' },
            15: { name: 'دکتر نسرین واسعی', specialization: 'مشاوره پیش از ازدواج، زوج و خانواده درمانی', experience: 10, bio: 'دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی حل تعارضات زناشويی' },
            16: { name: 'زهرا سادات اطیابی', specialization: 'مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...', experience: 10, bio: 'متخصص روانشناسی بالینی - مشاوره فردی (پنیک، افسردگی، اضطراب، وسواس و ...) مشاوره زوج و خانواده درمانی(تعارضات زناشویی و..) درمانگر نوجوان مشاوره پیش از ازدواج' },
            17: { name: 'لیلا بیرانوند', specialization: 'فرزند پروری', experience: 10, bio: 'متخصص روانشناسی بالینی - متخصص در حوزه کودک و نوجوان فرزند پروری' },
            18: { name: 'نگار غایبی', specialization: 'مشاوره', experience: 10, bio: 'دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، سوگ، شکست عاطقی و...)  مشاوره زوح و خانواده درمانی' },
            19: { name: 'محمد جدیدکار همدانی', specialization: 'مشاوره فردی', experience: 10, bio: 'محمد جدیدکار همدانی - متخصص مشاوره فردی' },
            20: { name: 'بهاره نعمتی روشن', specialization: '- مشاوره پیش از ازدواج - زوج و خانواده درمانی', experience: 10, bio: 'متخصص روانشناسی بالینی - - مشاوره فردی  در خصوص اختلالات شخصیت( وسواس ، اضطراب، افسردگی و .. ) - مشاوره پیش از ازدواج - زوج و خانواده درمانی' }
        };

        const therapistData = therapistProfiles[therapistNum as keyof typeof therapistProfiles];

        console.log('[TherapistLogin] ✓ Therapist authenticated:', therapistData.name);

        // Get therapist image path
        const therapistImages: { [key: number]: string } = {
            1: '/psychologists/1/image (15).webp',
            2: '/psychologists/2/image (1).webp',
            3: '/psychologists/3/image (13).webp',
            4: '/psychologists/4/image (12).webp',
            5: '/psychologists/5/image (2).webp',
            6: '/psychologists/6/image (3).webp',
            7: '/psychologists/7/image (4).webp',
            8: '/psychologists/8/image (5).webp',
            9: '/psychologists/9/image (6).webp',
            10: '/psychologists/10/image (7).webp',
            11: '/psychologists/11/image (8).webp',
            12: '/psychologists/12/image (9).webp',
            13: '/psychologists/13/image (10).webp',
            14: '/psychologists/14/image (11).webp',
            15: '/psychologists/15/image (12).webp',
            16: '/psychologists/16/image (13).webp',
            17: '/psychologists/17/image (14).webp',
            18: '/psychologists/18/image (15).webp',
            19: '/psychologists/19/image (16).webp',
            20: '/psychologists/20/image (17).webp'
        };

        return NextResponse.json({
            success: true,
            message: 'ورود با موفقیت انجام شد',
            therapist: {
                therapist_id: therapistNum,
                name: therapistData.name,
                email: `therapist${therapistNum}@rozaneh.com`,
                phone: `0912345${String(therapistNum).padStart(4, '0')}`,
                specializations: [therapistData.specialization],
                experience_years: therapistData.experience,
                bio: therapistData.bio,
                rating: 4.5,
                image: therapistImages[therapistNum],
                userType: 'therapist'
            }
        });

    } catch (error) {
        console.error('[TherapistLogin] Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'خطا در ورود - لطفا دوباره تلاش کنید',
            },
            { status: 500 }
        );
    }
}