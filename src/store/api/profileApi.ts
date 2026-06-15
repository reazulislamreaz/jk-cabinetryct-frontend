import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => "/user/get-my-profile",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-user-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    deleteMyProfile: builder.mutation({
      query: () => ({
        url: "/user/delete-my-profile",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteMyProfileMutation,
} = profileApi;
