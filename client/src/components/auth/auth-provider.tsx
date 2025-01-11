'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/hooks/use-auth';

export function AuthProvider() {
  const { login } = useAuthStore();

  useEffect(() => {
    const getTokenFromCookie = () => {
      const match = document.cookie.match(/authToken=([^;]+)/);
      return match ? match[1] : null;
    };

    const token = getTokenFromCookie();

    if (token) {
      login(token);
    }
  }, []);

  return null;
}
