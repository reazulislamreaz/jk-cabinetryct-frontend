import Cookies from "js-cookie";
import { User } from "@/types";

const AUTH_USER_KEY = "authUser";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Authentication utility functions
export const setAuthTokens = (
  accessToken?: string,
  refreshToken?: string
) => {
  if (!accessToken || !refreshToken) {
    return false;
  }

  if (typeof window !== "undefined") {
    // sessionStorage is readable by JS (unlike HttpOnly cookies from the API)
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  // Non-HttpOnly cookies for persistence across browser restarts
  Cookies.set("accessToken", accessToken, { expires: 7, path: "/" });
  Cookies.set("refreshToken", refreshToken, { expires: 30, path: "/" });
  return true;
};

export const setAuthUser = (user: User) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const getAuthUser = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = sessionStorage.getItem(AUTH_USER_KEY);
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  } catch {
    return null;
  }
};

export const getAccessToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  return (
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    Cookies.get("accessToken") ||
    undefined
  );
};

export const getRefreshToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;

  return (
    sessionStorage.getItem(REFRESH_TOKEN_KEY) ||
    Cookies.get("refreshToken") ||
    undefined
  );
};

export const clearAuthTokens = () => {
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });

  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const getAuthHeaders = () => {
  const accessToken = getAccessToken();
  return {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
    "Content-Type": "application/json",
  };
};
