import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from "@/utils/auth.utils";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9879/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      // Try to refresh the token
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const refreshPayload = refreshResult.data as {
          data?: { tokens?: { accessToken: string; refreshToken: string } };
          tokens?: { accessToken: string; refreshToken: string };
          accessToken?: string;
          refreshToken?: string;
        };
        const tokens =
          refreshPayload.data?.tokens ??
          refreshPayload.tokens ??
          refreshPayload;
        const accessToken = tokens.accessToken;
        const newRefreshToken = tokens.refreshToken;

        if (!accessToken || !newRefreshToken) {
          clearAuthTokens();
          return result;
        }

        setAuthTokens(accessToken, newRefreshToken);

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        clearAuthTokens();
      }
    } else {
      clearAuthTokens();
    }
  }

  return result;
};

/**
 * Base API configuration
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "User",
    "Profile",
    "Cabinetry",
    "Cabinet",
    "StockItem",
    "Collection",
    "Order",
    "Cart",
    "Wishlist",
    "Address",
    "PaymentMethod",
    "Contact",
  ],
  endpoints: () => ({}),
});
export const {} = baseApi;
