import {
  ICreateOrderRequest,
  ICreateOrderResponse,
  IGetOrderResponse,
  IGetOrdersParams,
  IGetOrdersResponse,
  IGetOrderStatsResponse,
} from "@/types/order.types";
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation<ICreateOrderResponse, ICreateOrderRequest>({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // Get user's orders
    getMyOrders: builder.query<IGetOrdersResponse, IGetOrdersParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.status) searchParams.append("status", params.status);
        if (params?.page) searchParams.append("page", params.page.toString());
        if (params?.limit)
          searchParams.append("limit", params.limit.toString());

        const queryString = searchParams.toString();
        return `/order/my-orders${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Order"],
    }),

    // Get order statistics
    getOrderStats: builder.query<IGetOrderStatsResponse, void>({
      query: () => "/order/my-orders/stats",
      providesTags: ["Order"],
    }),

    // Get single order by order number
    getOrderByNumber: builder.query<IGetOrderResponse, string>({
      query: (orderNumber) => `/order/order-number/${orderNumber}`,
      providesTags: (result, error, orderNumber) => [
        { type: "Order", id: orderNumber },
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderStatsQuery,
  useGetOrderByNumberQuery,
} = orderApi;
