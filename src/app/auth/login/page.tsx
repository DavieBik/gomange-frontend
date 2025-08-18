'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthForm from '@/components/ui/AuthForm';

async function login(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }
  return res.json(); // { token, role }
}

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError('');
    try {
      console.log('Intentando login con:', email, password);
      const { token, role } = await login(email, password);
      console.log('Respuesta login:', token, role);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      // Redirige según el rol
      if (role === 'admin') {
        router.push('/');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[500px]">
        {/* Right: Side image */}
        <div className="hidden md:block md:w-1/2 relative min-h-[500px] order-2 md:order-1">
          <Image
            src="/placeholder/restaurants-1.png"
            alt="Restaurant"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-l-xl"
            priority={false}
          />
        </div>
        {/* Left: Logo and form */}
        <div className="flex flex-col items-center justify-center p-10 md:w-1/2 w-full order-1 md:order-2">
          <Image
            src="/images/logo-1.png"
            alt="Logo"
            width={140}
            height={140}
            className="mb-6"
            priority
          />
          <AuthForm
            title="Sign In"
            buttonText="Sign In"
            onSubmit={handleLogin}
            error={error}
          />
          <div className="mt-8 flex flex-col items-center gap-2 w-full">
            <span className="text-sm text-gray-600">
              Not registered?{' '}
              <Link href="/auth/register" className="text-primary-600 font-semibold hover:underline">
                Create an account
              </Link>
            </span>
            <Link href="/auth/forgot" className="text-sm text-primary-600 hover:underline">
              Forgot your password or username?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}