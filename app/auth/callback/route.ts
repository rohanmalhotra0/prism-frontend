import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  console.log('Auth callback received:', { code: !!code, error, error_description, next })

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}&description=${error_description}`)
  }

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    try {
      // Use the proper PKCE flow
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=exchange_failed&description=${encodeURIComponent(exchangeError.message)}`)
      }
      
      if (data.session) {
        console.log('Session created successfully for user:', data.session.user.email)
        // Always redirect to the dashboard after successful auth
        return NextResponse.redirect(`${origin}/dashboard/datasets`)
      } else {
        console.error('No session created after code exchange')
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_session&description=No session created after code exchange`)
      }
    } catch (err) {
      console.error('Unexpected error in callback:', err)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unexpected&description=${encodeURIComponent(String(err))}`)
    }
  }

  // No code provided
  console.error('No authorization code provided')
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code&description=No authorization code provided`)
}
