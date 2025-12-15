import { initializeModels } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { userModel } = await initializeModels();

        const userData = await request.json();

        // Create a new user record
        const newUser = await userModel.create({
            user_id: `user_${Date.now()}`,
            name: userData.name || 'Test User',
            email: userData.email || `user_${Date.now()}@example.com`,
            phone: userData.phone || '09123456789',
            password_hash: userData.password_hash || 'hashed_password_here',
            is_active: true,
        });

        return NextResponse.json({
            success: true,
            message: 'User added to MongoDB app2.users',
            data: newUser,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { userModel } = await initializeModels();

        const users = await userModel.findAll({ is_active: true });

        return NextResponse.json({
            success: true,
            message: 'Retrieved all users from MongoDB app2.users',
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
