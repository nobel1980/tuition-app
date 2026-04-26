'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login } from '@/lib/db';

export async function authenticate(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await login(email, password);
    
    // Set a simple mock session cookie
    const cookieStore = await cookies();
    cookieStore.set('mock_session', JSON.stringify({
      id: user.id,
      role: user.role,
      name: user.name
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true, role: user.role };
  } catch (error) {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('mock_session');
  redirect('/');
}
