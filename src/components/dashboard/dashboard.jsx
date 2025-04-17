'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './chart/piechart';
import DashboardPie from './chart/piechart';
import DashboardBar from './chart/Barchart';

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
    <div className='flex flex-row gap-20'>

      <DashboardPie/>
      <DashboardBar/>
    </div>
  );
};

export default AdminPage;