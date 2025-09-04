import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, logAuthAction } from '@/lib/db-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action, fullName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!action || !['signin', 'signup'].includes(action)) {
      return NextResponse.json(
        { error: 'Valid action (signin or signup) is required' },
        { status: 400 }
      );
    }

    // For now, we'll create a simple user (in production, you'd hash the password)
    let user = await findUserByEmail(email);
    
    if (action === 'signup') {
      if (user) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }
      
      // Create new user
      user = await createUser({
        email,
        password_hash: password, // In production, hash this!
        full_name: fullName || null,
      });
    } else if (action === 'signin') {
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      // In production, verify password hash here
      if (user.password_hash !== password) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or could not be created' },
        { status: 500 }
      );
    }

    // Log the authentication action
    await logAuthAction({
      user_id: user.id,
      action: action as 'signin' | 'signup',
      auth_method: 'email',
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
      },
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
