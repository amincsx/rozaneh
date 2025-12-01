import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber } = await request.json()

        // Validate phone number
        if (!phoneNumber || phoneNumber.length < 10) {
            return NextResponse.json(
                { error: "Invalid phone number" },
                { status: 400 }
            )
        }

        // Here you would typically:
        // 1. Save to database
        // 2. Send notification to admin dashboard
        // 3. Send confirmation email/SMS

        // Mock: Log the request (in production, save to database)
        console.log("New quick consultation request:", {
            phoneNumber,
            timestamp: new Date().toISOString(),
        })

        // Mock: Send to admin dashboard
        // In production, this would be saved to a database and visible on the admin panel
        const adminNotification = {
            type: "quick_consultation",
            phoneNumber,
            timestamp: new Date().toISOString(),
            status: "pending",
        }

        console.log("Admin notification:", adminNotification)

        return NextResponse.json(
            {
                success: true,
                message: "درخواست شما ثبت شد",
                data: adminNotification,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error processing quick consultation:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
