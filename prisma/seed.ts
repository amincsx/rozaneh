import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const therapistsData = [
    {
        id: "4",
        name: "دکتر محسن محمدی",
        specializations: ["عضو هیئت علمی دانشگاه", "مدیر مرکز مشاوره روزنه"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکترای تخصصی مشاوره -  مشاور و رواندرمانگر عضو هیئت علمی دانشگاه مدیر مرکز مشاوره روزنه",
        image: "/psychologists/4/image (12).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC004"
    },
    {
        id: "1",
        name: "دکتر ابوالفضل امینیان",
        specializations: ["مشاوره پيش از ازدواج", "مشاوره در زمینه تعارض زناشويی", "سکس تراپی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکتری تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پيش از ازدواج مشاوره در زمینه تعارض زناشويی سکس تراپی",
        image: "/psychologists/1/image (15).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC001"
    },
    {
        id: "2",
        name: "زینب ایرانی",
        specializations: ["مشاوره پیش از ازدواج", "خانواده درمانی", "زندگی مشترک و تعارضات زوجین"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی - مشاوره فردی (شخصی، افسردگی، وسواس و...) مشاوره پیش از ازدواج خانواده درمانی زندگی مشترک و تعارضات زوجین",
        image: "/psychologists/2/image (1).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC002"
    },
    {
        id: "3",
        name: "زهره کیانی",
        specializations: ["مشاوره پیش از ازدواج", "خانواده درمانی", "سکس تراپی", "زندگی مشترک و تعارضات زوجین", "گروه درمانی و مشاوره گروهی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "زهره کیانی - متخصص مشاوره پیش از ازدواج و خانواده درمانی",
        image: "/psychologists/3/image (13).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC003"
    },
    {
        id: "5",
        name: "الهام عسگری",
        specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی", "کارشناس روانشناسی بالینی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص  روانشناسی شخصیت- مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی کارشناس روانشناسی بالینی",
        image: "/psychologists/5/image (2).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC005"
    },
    {
        id: "6",
        name: "مینا خضری",
        specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض زناشويی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص مشاوره خانواده - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض زناشويی",
        image: "/psychologists/6/image (3).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC006"
    },
    {
        id: "7",
        name: "زهرا بیگی",
        specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره نوجوان", "تعارض ها و مشکلات بین فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص مشاوره - مشاور و درمانگر فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره نوجوان تعارض ها و مشکلات بین فردی",
        image: "/psychologists/7/image (4).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC007"
    },
    {
        id: "8",
        name: "رضا معیری",
        specializations: ["مشاوره فردی وسواس، افسردگی، شكست عاطفی و ...", "مشاوره پیش از ازدواج، زوج و خانواده درمانی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکترای تخصصی روانشناسی - درمانگر بالینی مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        image: "/psychologists/8/image (5).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC008"
    },
    {
        id: "9",
        name: "مهسا باغبانی",
        specializations: ["مشاوره فردی", "وسواس، افسردگی، شكست عاطفی، اختلالات خلقی", "مشاوره در زمینه تعارض ها و مشکلات بین فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی - مشاوره فردی وسواس، افسردگی، شكست عاطفی، اختلالات خلقی مشاوره در زمینه تعارض ها و مشکلات بین فردی",
        image: "/psychologists/9/image (6).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC009"
    },
    {
        id: "10",
        name: "مژگان میرزاده",
        specializations: ["درمان اختلالات یادگیری و كمبود توجه و تمركز", "اجرا و تحليل آزمون هاي هوش", "تشخيص و آموزش در حيطه اتيسم"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی- درمانگر کودک و نوجوان درمان اختلالات یادگیری و كمبود توجه و تمركز اجرا و تحليل آزمون هاي هوش تشخيص و آموزش در حيطه اتيسم",
        image: "/psychologists/10/image (7).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC010"
    },
    {
        id: "11",
        name: "دکتر یاسمن صالح",
        specializations: ["مشاوره فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکتر یاسمن صالح - متخصص مشاوره فردی",
        image: "/psychologists/11/image (8).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC011"
    },
    {
        id: "12",
        name: "سارا گلچوبیان",
        specializations: ["مشاوره فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "سارا گلچوبیان - متخصص مشاوره فردی",
        image: "/psychologists/12/image (9).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC012"
    },
    {
        id: "13",
        name: "زهرا صادقی",
        specializations: ["مشاوره فردی وسواس، افسردگی، اضطراب و..", "تعارضات بین فردی", "مانگر حوزه نوجوان", "خانواده درمانی", "مشاوره زوج"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص مشاوره - مشاوره فردی (وسواس، افسردگی، اضطراب و..) تعارضات بین فردی مانگر حوزه نوجوان خانواده درمانی مشاوره زوج",
        image: "/psychologists/13/image (10).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC013"
    },
    {
        id: "14",
        name: "دکتر بهار ایروانی",
        specializations: ["مشاوره پیش از ازدواج", "مشاوره فردی", "مشاوره خانواده"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکترای تخصصی مشاوره - زوج درمانی( مشاوره در زمینه تعارض های زوجی و پیمان شکنی عاطفی) مشاوره پیش از ازدواج مشاوره فردی مشاوره خانواده",
        image: "/psychologists/14/image (11).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC014"
    },
    {
        id: "15",
        name: "دکتر نسرین واسعی",
        specializations: ["مشاوره پیش از ازدواج، زوج و خانواده درمانی", "حل تعارضات زناشويی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، شكست عاطفی و ...) مشاوره پیش از ازدواج، زوج و خانواده درمانی حل تعارضات زناشويی",
        image: "/psychologists/15/image (12).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC015"
    },
    {
        id: "16",
        name: "زهرا سادات اطیابی",
        specializations: ["مشاوره فردی پنیک، افسردگی، اضطراب، وسواس و ...", "مشاوره زوج و خانواده درمانیتعارضات زناشویی و..", "درمانگر نوجوان", "مشاوره پیش از ازدواج"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی - مشاوره فردی (پنیک، افسردگی، اضطراب، وسواس و ...) مشاوره زوج و خانواده درمانی(تعارضات زناشویی و..) درمانگر نوجوان مشاوره پیش از ازدواج",
        image: "/psychologists/16/image (13).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC016"
    },
    {
        id: "17",
        name: "لیلا بیرانوند",
        specializations: ["فرزند پروری"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی - متخصص در حوزه کودک و نوجوان فرزند پروری",
        image: "/psychologists/17/image (14).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC017"
    },
    {
        id: "18",
        name: "نگار غایبی",
        specializations: ["مشاوره"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "دکترای تخصصی مشاوره - مشاوره فردی (وسواس، افسردگی، سوگ، شکست عاطقی و...)  مشاوره زوح و خانواده درمانی",
        image: "/psychologists/18/image (15).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC018"
    },
    {
        id: "19",
        name: "محمد جدیدکار همدانی",
        specializations: ["مشاوره فردی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "محمد جدیدکار همدانی - متخصص مشاوره فردی",
        image: "/psychologists/19/image (16).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC019"
    },
    {
        id: "20",
        name: "بهاره نعمتی روشن",
        specializations: ["- مشاوره پیش از ازدواج - زوج و خانواده درمانی"],
        rating: 4.5,
        experience: 10,
        hourlyRate: 300000,
        bio: "متخصص روانشناسی بالینی - - مشاوره فردی  در خصوص اختلالات شخصیت( وسواس ، اضطراب، افسردگی و .. ) - مشاوره پیش از ازدواج - زوج و خانواده درمانی",
        image: "/psychologists/20/image (17).webp",
        languages: ["فارسی"],
        licenseNumber: "LIC020"
    }
]

async function main() {
    console.log('Seeding therapists...')

    for (const therapist of therapistsData) {
        // Create user first
        const user = await prisma.user.create({
            data: {
                name: therapist.name,
                email: `therapist${therapist.id}@rozaneh.com`,
                password: '$2b$10$dummy.hash.for.all.therapists', // All use "admin" password
                role: 'THERAPIST',
                phone: `0912345678${therapist.id}`,
                nationalId: `123456789${therapist.id}`,
                birthDate: new Date('1980-01-01'),
            }
        })

        // Create therapist profile
        await prisma.therapistProfile.create({
            data: {
                userId: user.id,
                licenseNumber: therapist.licenseNumber,
                specializations: therapist.specializations,
                experience: therapist.experience,
                education: [], // Can be filled later
                bio: therapist.bio,
                hourlyRate: therapist.hourlyRate,
                availableHours: {}, // Can be filled later
                languages: therapist.languages,
                isVerified: true,
                rating: therapist.rating,
                totalSessions: 0,
            }
        })

        console.log(`Created therapist: ${therapist.name}`)
    }

    console.log('Seeding completed!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })