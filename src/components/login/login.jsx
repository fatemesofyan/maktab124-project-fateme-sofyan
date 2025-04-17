'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      console.log('API Response:', data); // بررسی پاسخ API
  
      // استخراج توکن و نقش کاربر
      const accessToken = data.token?.accessToken; // استخراج accessToken
      const role = data.data?.user?.role; // استخراج نقش کاربر
  
      if (!accessToken || !role) {
        throw new Error('Token or role is missing in the response.');
      }
  
      // ذخیره توکن و نقش کاربر در localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', role);
  
      // هدایت کاربر به صفحه مناسب بر اساس نقش
      if (role === 'ADMIN') {
        router.push('/admin');
      } else if (role === 'USER') {
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* کادر اصلی فرم */}
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md text-primaryDark">
        <h2 className="text-2xl font-bold text-center mb-6">
          ورود به حساب کاربری
        </h2>

        {/* فرم */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* فیلد نام کاربری */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              placeholder="نام کاربری خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          {/* فیلد پسورد */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              placeholder="رمز عبور خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {/* نمایش پیام خطا */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* دکمه ورود */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryDark transition duration-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* لینک فراموشی رمز عبور */}
        <div className="mt-4 text-center">
          <a
            href="/auth/login"
            className="text-accent hover:text-secondary transition"
          >
            ثبت نام نکرده اید؟
          </a>
        </div>
      </div>
    </div>
  );
}