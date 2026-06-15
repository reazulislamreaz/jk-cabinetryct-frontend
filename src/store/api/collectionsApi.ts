import { baseApi } from "./baseApi";

export const collectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollections: builder.query({
      query: () => {
        return {
          url: `/collections`,
          method: "GET",
        };
      },
      providesTags: ["Collection"],
    }),
    getCollectionBySlug: builder.query({
      query: (slug) => {
        return {
          url: `/collections/slug/${slug}`,
          method: "GET",
        };
      },
      providesTags: (id) => [{ type: "Collection", id }],
    }),
  }),
});

export const { useGetAllCollectionsQuery, useGetCollectionBySlugQuery } =
  collectionApi;
