import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByGoogleId, logAuthAction } from '@/lib/db-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { googleUser, action } = body;

    if (!googleUser || !googleUser.sub) {
      return NextResponse.json(
        { error: 'Google user data is required' },
        { status: 400 }
      );
    }

    if (!action || !['signin', 'signup'].includes(action)) {
      return NextResponse.json(
        { error: 'Valid action (signin or signup) is required' },
        { status: 400 }
      );
    }

    // Check if user already exists with this Google ID
    let user = await findUserByGoogleId(googleUser.sub);
    
    if (!user) {
      // Create new user with Google data
      user = await createUser({
        email: googleUser.email,
        full_name: googleUser.name,
        google_id: googleUser.sub,
        google_picture: googleUser.picture,
      });
    }

    // Log the authentication action
    await logAuthAction({
      user_id: user.id,
      action: action as 'signin' | 'signup',
      auth_method: 'google',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        google_picture: user.google_picture,
        created_at: user.created_at,
      },
    });

  } catch (error) {
    console.error('Google authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
