"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Eye,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ShoppingBag,
  CreditCard,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import {
  useGetMyOrdersQuery,
  useGetOrderStatsQuery,
} from "@/store/api/orderApi";
import { OrderStatus, IOrder } from "@/types/order.types";

type FilterStatus = OrderStatus | "all";

const OrdersView = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Fetch order stats
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetOrderStatsQuery();
  const orderStats = statsResponse?.data;

  // Fetch orders with filters
  const { data: ordersResponse, isLoading: isOrdersLoading } =
    useGetMyOrdersQuery({
      status: filterStatus !== "all" ? filterStatus : undefined,
    });
  const orders = ordersResponse?.data || [];

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="w-4 h-4" />;
      case OrderStatus.CONFIRMED:
        return <CheckCircle className="w-4 h-4" />;
      case OrderStatus.PROCESSING:
        return <Package className="w-4 h-4" />;
      case OrderStatus.SHIPPED:
        return <Truck className="w-4 h-4" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="w-4 h-4" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case OrderStatus.CONFIRMED:
        return "bg-blue-100 text-blue-800 border-blue-200";
      case OrderStatus.PROCESSING:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case OrderStatus.SHIPPED:
        return "bg-purple-100 text-purple-800 border-purple-200";
      case OrderStatus.DELIVERED:
        return "bg-green-100 text-green-800 border-green-200";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Orders
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          View and manage your orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-3 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Orders
                </p>
                {isStatsLoading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary mt-1" />
                ) : (
                  <p className="text-lg sm:text-2xl font-bold text-primary">
                    {orderStats?.totalOrders || 0}
                  </p>
                )}
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-3 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Processing
                </p>
                {isStatsLoading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-orange-600 mt-1" />
                ) : (
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">
                    {orderStats?.processingOrders || 0}
                  </p>
                )}
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-3 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Shipped
                </p>
                {isStatsLoading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-purple-600 mt-1" />
                ) : (
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">
                    {orderStats?.shippedOrders || 0}
                  </p>
                )}
              </div>
              <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-3 sm:pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Delivered
                </p>
                {isStatsLoading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-green-600 mt-1" />
                ) : (
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {orderStats?.deliveredOrders || 0}
                  </p>
                )}
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-gray-200 shadow-none">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Order History</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
                className={`text-xs sm:text-sm h-8 cursor-pointer shadow-none rounded-md sm:h-9 px-2 sm:px-4 ${
                  filterStatus === "all"
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                All
              </Button>
              <Button
                variant={
                  filterStatus === OrderStatus.PENDING ? "default" : "outline"
                }
                onClick={() => setFilterStatus(OrderStatus.PENDING)}
                size="sm"
                className={`text-xs cursor-pointer sm:text-sm shadow-none rounded-md h-8 sm:h-9 px-2 sm:px-4 ${
                  filterStatus === OrderStatus.PENDING
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                Pending
              </Button>
              <Button
                variant={
                  filterStatus === OrderStatus.CONFIRMED ? "default" : "outline"
                }
                onClick={() => setFilterStatus(OrderStatus.CONFIRMED)}
                size="sm"
                className={`text-xs sm:text-sm cursor-pointer shadow-none h-8 sm:h-9 px-2 sm:px-4 ${
                  filterStatus === OrderStatus.CONFIRMED
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                Confirmed
              </Button>
              <Button
                variant={
                  filterStatus === OrderStatus.PROCESSING
                    ? "default"
                    : "outline"
                }
                onClick={() => setFilterStatus(OrderStatus.PROCESSING)}
                size="sm"
                className={`text-xs sm:text-sm  cursor-pointer shadow-none h-8 sm:h-9 px-2 sm:px-4 ${
                  filterStatus === OrderStatus.PROCESSING
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                Processing
              </Button>
              <Button
                variant={
                  filterStatus === OrderStatus.SHIPPED ? "default" : "outline"
                }
                onClick={() => setFilterStatus(OrderStatus.SHIPPED)}
                size="sm"
                className={`text-xs sm:text-sm cursor-pointer shadow-none h-8 sm:h-9 px-2 sm:px-4 ${
                  filterStatus === OrderStatus.SHIPPED
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                Shipped
              </Button>
              <Button
                variant={
                  filterStatus === OrderStatus.DELIVERED ? "default" : "outline"
                }
                onClick={() => setFilterStatus(OrderStatus.DELIVERED)}
                size="sm"
                className={`text-xs sm:text-sm cursor-pointer h-8 sm:h-9 px-2 sm:px-4 shadow-none ${
                  filterStatus === OrderStatus.DELIVERED
                    ? "bg-primary hover:bg-primary-hover"
                    : ""
                }`}
              >
                Delivered
              </Button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-3 sm:space-y-4">
            {isOrdersLoading ? (
              <div className="flex justify-center items-center py-8 sm:py-12">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-base sm:text-lg text-muted-foreground">
                  No orders found
                </p>
                <Link href="/cabinet-lines">
                  <Button
                    variant="outline"
                    className="mt-4 text-sm rounded shadow-none"
                  >
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              orders?.map((order: IOrder) => (
                <Card key={order._id} className="border-gray-200 shadow-none">
                  <CardContent className="p-3 sm:p-4 lg:pt-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h3 className="font-semibold text-sm sm:text-lg">
                              {order?.orderNumber}
                            </h3>
                            <span
                              className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                                order?.status
                              )}`}
                            >
                              {getStatusIcon(order?.status)}
                              <span className="hidden xs:inline">
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </span>
                            {order.isPaymentLinkSent && (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200 text-[10px] sm:text-xs"
                              >
                                <CreditCard className="w-3 h-3 mr-1" />
                                Payment Link Sent
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>
                              {order.items.length} item
                              {order.items.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 mt-2 sm:mt-0">
                          <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Total
                            </p>
                            <p className="text-base sm:text-xl font-bold text-primary">
                              ${order.totalPrice.toFixed(2)}
                            </p>
                            {order.isPaymentLinkSent &&
                              order.paymentDetails && (
                                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span className="font-medium">
                                    Pay: $
                                    {order.paymentDetails.payableAmount.toFixed(
                                      2
                                    )}
                                  </span>
                                </div>
                              )}
                          </div>
                          <Link href={`/dashboard/orders/${order.orderNumber}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary cursor-pointer text-primary hover:bg-primary hover:text-white text-xs sm:text-sm h-8 sm:h-9"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Payment Link Alert */}
                      {order.isPaymentLinkSent && order.paymentDetails && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <CreditCard className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-green-900">
                                Payment link has been sent for this order
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                Amount: $
                                {order.paymentDetails.payableAmount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersView;
