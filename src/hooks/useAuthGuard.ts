'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);
};