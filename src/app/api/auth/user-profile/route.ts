import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const email = searchParams.get('email');

    console.log('[GetProfile] Request for:', { user_id, email });

    if (!user_id && !email) {
      return NextResponse.json(
        { success: false, message: 'user_id یا email الزامی است' },
        { status: 400 }
      );
    }

    try {
      let user;

      // Try to find user by ID first, then by email
      if (user_id && user_id !== 'undefined') {
        console.log('[GetProfile] Looking up by user_id:', user_id);
        user = await prisma.user.findUnique({
          where: { id: user_id }
        });
      }

      // If not found by ID, try email
      if (!user && email) {
        console.log('[GetProfile] Looking up by email:', email);
        user = await prisma.user.findUnique({
          where: { email }
        });
      }

      if (!user) {
        console.log('[GetProfile] User not found with:', { user_id, email });
        return NextResponse.json(
          { success: false, message: 'کاربر یافت نشد' },
          { status: 404 }
        );
      }

      console.log('[GetProfile] User found:', user.id);

      // Don't send password to client
      const { password, ...userWithoutPassword } = user;

      return NextResponse.json(
        {
          success: true,
          user: {
            user_id: user.id,
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            city: user.address,
            date_of_birth: user.birthDate ? user.birthDate.toISOString().split('T')[0] : null,
            gender: user.gender,
            registration_date: user.createdAt,
            createdAt: user.createdAt,
            role: user.role,
          }
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('[GetProfile] Database error:', error);
      return NextResponse.json(
        { success: false, message: 'خطا در اتصال به پایگاه داده' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[GetProfile] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'خطایی پیش آمد' },
      { status: 500 }
    );
  }
}
