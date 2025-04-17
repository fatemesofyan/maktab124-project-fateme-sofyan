'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Token:', token);
    console.log('Role:', role);

    if (!token || role !== 'USER') {
      router.push('/auth/login');
    }
  }, []);

  return (
    <div>
    
    </div>
  );
};

export default HomePage;