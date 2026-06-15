import { baseApi } from "./baseApi";

const partsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllParts: builder.query({
      query: () => "/parts",
    }),
    getPartsDetails: builder.query({
      query: (id) => `/parts/${id}`,
    }),
    getPartsDetailsBySlug: builder.query({
      query: (slug) => `/parts/slug/${slug}`,
    }),
  }),
});

export const {
  useGetAllPartsQuery,
  useGetPartsDetailsQuery,
  useGetPartsDetailsBySlugQuery,
} = partsApi;
