"use client";

import { useAuth } from '@/lib/auth';

export function useUser() {
  const { user, loading } = useAuth();
  
  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
