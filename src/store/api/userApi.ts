import { baseApi } from "./baseApi";
import { User } from "@/types/auth.types";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    getUsersByIds: builder.query<User[], string[]>({
      query: (userIds) => ({
        url: "/user/by-ids",
        method: "POST",
        body: { userIds },
      }),
      providesTags: (result, error, userIds) => [
        ...userIds.map((id) => ({ type: "User" as const, id })),
        "User",
      ],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUsersByIdsQuery,
  useLazyGetUsersByIdsQuery,
} = userApi;
