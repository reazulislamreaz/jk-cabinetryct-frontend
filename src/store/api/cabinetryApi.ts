import { baseApi } from "./baseApi";

export const cabinetryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCabinetry: builder.query({
      query: () => {
        return {
          url: `/cabinetry`,
          method: "GET",
        };
      },
      providesTags: ["Cabinetry"],
    }),
    searchCabinetry: builder.query({
      query: (searchTerm: string) => ({
        url: `/cabinetry/get-all-cabinetrys`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["Cabinetry"],
    }),
    getCabinetDetails: builder.query({
      query: (cabinetryId) => {
        return {
          url: `/cabinetry/${cabinetryId}`,
          method: "GET",
        };
      },
      providesTags: (id) => [{ type: "Cabinet", id }],
    }),
    getCabinetDetailsBySlug: builder.query({
      query: (slug) => {
        return {
          url: `/cabinetry/slug/${slug}`,
          method: "GET",
        };
      },
      providesTags: (slug) => [{ type: "Cabinet", slug }],
    }),
  }),
});

export const {
  useGetAllCabinetryQuery,
  useGetCabinetDetailsQuery,
  useLazySearchCabinetryQuery,
  useGetCabinetDetailsBySlugQuery,
} = cabinetryApi;
