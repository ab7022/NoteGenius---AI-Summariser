import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  console.log('Full request URL:', request.url);
  console.log('All search params:', Object.fromEntries(requestUrl.searchParams.entries()));
  const code = requestUrl.searchParams.get('code');
  console.log('Received code:', code);
  console.log('Received code:', code);
  if (code) {
    console.log('Code is present, proceeding with Supabase authentication');
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
    const supabase = createSupabaseClient();
    console.log('Supabase URL:', supabaseUrl);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    }
  }

  // Return the user to an error page if code exchange fails
  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-error`);
}