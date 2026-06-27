import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizePhone } from '@/lib/otp';
import { getDisplayEmail, getProfileMissingFields } from '@/lib/user-display';

function mapGenderToClient(gender: string | null) {
    if (!gender) return null;
    return gender.toLowerCase();
}

function formatUserResponse(user: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    address: string | null;
    birthDate: Date | null;
    gender: string | null;
    createdAt: Date;
    role: string;
}) {
    const displayEmail = getDisplayEmail(user.email);

    return {
        user_id: user.id,
        id: user.id,
        name: user.name,
        email: displayEmail,
        phone: user.phone,
        address: user.address,
        city: user.address,
        date_of_birth: user.birthDate ? user.birthDate.toISOString().split('T')[0] : null,
        gender: mapGenderToClient(user.gender),
        registration_date: user.createdAt,
        createdAt: user.createdAt,
        role: user.role,
        profile_complete: getProfileMissingFields({
            email: user.email,
            phone: user.phone,
            address: user.address,
            birthDate: user.birthDate,
            gender: user.gender,
        }).length === 0,
        missing_fields: getProfileMissingFields({
            email: user.email,
            phone: user.phone,
            address: user.address,
            birthDate: user.birthDate,
            gender: user.gender,
        }),
    };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    if (!user_id && !email && !phone) {
      return NextResponse.json(
        { success: false, message: 'user_id، email یا phone الزامی است' },
        { status: 400 }
      );
    }

    try {
      let user;

      if (user_id && user_id !== 'undefined') {
        user = await prisma.user.findUnique({
          where: { id: user_id }
        });
      }

      if (!user && phone) {
        const normalizedPhone = normalizePhone(phone);
        user = await prisma.user.findFirst({
          where: { phone: normalizedPhone }
        });
      }

      if (!user && email) {
        user = await prisma.user.findUnique({
          where: { email }
        });
      }

      if (!user) {
        return NextResponse.json(
          { success: false, message: 'کاربر یافت نشد' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          user: formatUserResponse(user),
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
