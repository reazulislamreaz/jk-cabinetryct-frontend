import { baseApi } from "./baseApi";

const shippingApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getShippingPrice: builder.query({
      query: () => "/pricing",
    }),
  }),
});

export const { useGetShippingPriceQuery } = shippingApi;
