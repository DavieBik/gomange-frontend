'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  return password.length >= 6;
}

async function register(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Registration failed');
  }
  return res.json();
}

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  // Validations
  const emailError =
    form.email && !validateEmail(form.email)
      ? 'Please enter a valid email address.'
      : '';
  const passwordError =
    form.password && !validatePassword(form.password)
      ? 'Password must be at least 6 characters.'
      : '';

  const isValid =
    validateEmail(form.email) && validatePassword(form.password);

  const handleRegister = async (email: string, password: string) => {
    setError('');
    try {
      await register(email, password);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[500px]">
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
        <div className="flex flex-col items-center justify-center p-10 md:w-1/2 w-full order-1 md:order-2">
          <Image
            src="/images/logo-1.png"
            alt="Logo"
            width={140}
            height={140}
            className="mb-6"
            priority
          />
          <form
            className="w-full max-w-sm"
            onSubmit={e => {
              e.preventDefault();
              handleRegister(form.email, form.password);
            }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <input
              type="email"
              className="w-full p-3 border rounded mb-1"
              placeholder="Email"
              value={form.email}
              onChange={e =>
                setForm(f => ({ ...f, email: e.target.value }))
              }
              required
            />
            {emailError && (
              <div className="text-xs text-red-500 mb-2">{emailError}</div>
            )}
            <input
              type="password"
              className="w-full p-3 border rounded mb-1"
              placeholder="Password (min 6 chars)"
              value={form.password}
              onChange={e =>
                setForm(f => ({ ...f, password: e.target.value }))
              }
              required
            />
            {passwordError && (
              <div className="text-xs text-red-500 mb-2">{passwordError}</div>
            )}
            <button
              type="submit"
              className={`w-full bg-primary-600 text-white py-3 rounded font-semibold ${
                !isValid ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isValid}
            >
              Create Account
            </button>
            {error && <div className="text-red-600 mt-4">{error}</div>}
          </form>
          <div className="mt-8 flex flex-col items-center gap-2 w-full">
            <span className="text-sm text-gray-600">
              Already registered?{' '}
              <Link href="/auth/login" className="text-primary-600 font-semibold hover:underline">
                Go to login
              </Link>
            </span>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Registration successful!</h3>
            <p className="mb-2">Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
}