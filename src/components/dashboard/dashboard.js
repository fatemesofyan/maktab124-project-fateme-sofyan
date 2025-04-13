'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();

  // تابع بررسی اعتبار کاربر
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      localStorage.removeItem('token'); // اطمینان از پاک شدن توکن
      localStorage.removeItem('role'); // اطمینان از پاک شدن نقش
      router.push('/auth/login'); // هدایت به صفحه لاگین
    }
  };

  useEffect(() => {
    // بررسی اولیه
    checkAuth();

    // اضافه کردن Listener برای تغییرات localStorage
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup: حذف Listener پس از Unmount شدن کامپوننت
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
};

export default AdminPage;