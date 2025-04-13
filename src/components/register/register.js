'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '', // اضافه کردن فیلد address
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // تابع ارسال فرم ثبت‌نام
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // ارسال درخواست به API
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred during registration.');
      }

      // دریافت پاسخ از API
      const data = await response.json();
      console.log('Registration Successful:', data);

      // هدایت کاربر به صفحه لاگین پس از ثبت‌نام موفق
      router.push('/auth/login');
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* کادر اصلی فرم */}
      <div className="bg-surface p-8 rounded-lg shadow-lg w-full max-w-md text-primaryDark">
        <h2 className="text-2xl font-bold text-center mb-6">ثبت‌نام</h2>

        {/* فرم */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* فیلد نام */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium mb-2">
              نام
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="نام خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.firstname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstname: e.target.value }))
              }
            />
          </div>

          {/* فیلد نام خانوادگی */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium mb-2">
              نام خانوادگی
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="نام خانوادگی خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.lastname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastname: e.target.value }))
              }
            />
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium mb-2">
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

          {/* فیلد شماره تماس */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
              شماره تماس
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="شماره تماس خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
            />
          </div>

          {/* فیلد آدرس */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-2">
              آدرس
            </label>
            <input
              type="text"
              id="address"
              placeholder="آدرس خود را وارد کنید"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          {/* نمایش پیام خطا */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* دکمه ثبت‌نام */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryDark transition duration-300"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* لینک لاگین */}
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-accent hover:text-secondary transition"
          >
            قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
          </a>
        </div>
      </div>
    </div>
  );
}