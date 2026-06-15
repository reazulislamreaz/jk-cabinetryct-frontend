'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { isAuthenticated as hasAccessToken } from '@/utils/auth.utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredRole?: string; // Optional: if specific role is required
}

export const ProtectedRoute = ({ children, fallback = null, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, isError, refetch } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hasAccessToken() && isError && !user) {
      refetch();
    }
  }, [isError, user, refetch]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !hasAccessToken()) {
        const redirectPath =
          window.location.pathname + window.location.search;
        router.push(
          `/auth/login?redirect=${encodeURIComponent(redirectPath)}`
        );
      }
      // If authenticated but role is required and user doesn't have it
      else if (requiredRole && user?.role !== requiredRole) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router]);

  const hasToken = hasAccessToken();

  // Show fallback while checking authentication
  if ((hasToken && isLoading && !user) || (!hasToken && !user)) {
    return fallback || (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render children if authenticated (and role matches if required)
  if (isAuthenticated || (hasToken && user)) {
    if (requiredRole && user?.role !== requiredRole) {
      return fallback;
    }
    return <>{children}</>;
  }

  // Return fallback for unauthenticated users while redirect is happening
  return fallback;
};