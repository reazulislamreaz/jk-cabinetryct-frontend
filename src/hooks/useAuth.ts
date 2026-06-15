'use client';
import { useGetMyProfileQuery } from "@/store/api/profileApi";
import { User } from "@/types";
import { getAuthUser, isAuthenticated, setAuthUser } from "@/utils/auth.utils";
import { useEffect, useMemo } from "react";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
  refetch: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const isUserAuthenticated = isAuthenticated();
  // Fetch user profile only if authenticated
  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useGetMyProfileQuery(undefined, {
    skip: !isUserAuthenticated,
  });

  const cachedUser = getAuthUser();

  // Memoize user data (profile API first, session cache as fallback after login)
  const user = useMemo(() => {
    return profileData?.data || cachedUser || null;
  }, [profileData, cachedUser]);

  useEffect(() => {
    if (profileData?.data) {
      setAuthUser(profileData.data);
    }
  }, [profileData?.data]);

  return {
    user,
    isLoading: isUserAuthenticated && isLoading,
    isAuthenticated: isUserAuthenticated && !!user,
    isError,
    refetch,
  };
};

export default useAuth;
