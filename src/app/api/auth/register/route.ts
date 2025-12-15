import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, password, role } = await request.json()

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "نام، ایمیل و رمز عبور الزامی است" },
                { status: 400 }
            )
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "رمز عبور باید حداقل 8 کاراکتر باشد" },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        }).catch((error: any) => {
            console.error('[Register] Database connection error:', error.message)
            return null
        })

        if (existingUser === undefined) {
            return NextResponse.json(
                { message: "خطا در اتصال به پایگاه داده - لطفا دوباره تلاش کنید" },
                { status: 500 }
            )
        }

        if (existingUser) {
            return NextResponse.json(
                { message: "کاربری با این ایمیل قبلا ثبت نام کرده است" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone: phone || null,
                password: hashedPassword,
                role: role || "PATIENT",
            }
        }).catch((error: any) => {
            console.error('[Register] Error creating user:', error.message)
            throw error
        })

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(
            {
                message: "حساب کاربری با موفقیت ایجاد شد",
                user: userWithoutPassword
            },
            { status: 201 }
        )
    } catch (error: any) {
        console.error("Registration error:", error.message || error)

        // Check if it's a database connection error
        if (error.message?.includes('getaddrinfo') || error.message?.includes('ECONNREFUSED') || error.message?.includes('timeout')) {
            return NextResponse.json(
                { message: "خطا در اتصال به پایگاه داده - لطفا دوباره تلاش کنید" },
                { status: 503 }
            )
        }

        return NextResponse.json(
            { message: "خطا در ایجاد حساب کاربری" },
            { status: 500 }
        )
    }
}