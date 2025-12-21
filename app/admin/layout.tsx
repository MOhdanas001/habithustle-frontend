import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const apiUrl = process.env.NEXT_API_URL || 'http://localhost:8081/api';

  try {
    const backendRes = await fetch(`${apiUrl}/auth/me`, {
      method: 'GET',
      headers: token ? { cookie: `auth_token=${token}` } : undefined,
      cache: 'no-store',
    });

    if (!backendRes.ok) {
      redirect('/');
    }

    const data = await backendRes.json();
    const user = data?.user ?? data ?? null;
    const role = (user?.role || '').toString().toLowerCase();

    if (role !== 'admin') {
      redirect('/403');
    }
  } catch (err) {
    // on error, redirect to home
    redirect('/');
  }

  return <>{children}</>;
}
