"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Truck,
  XCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import {
  useGetOrderStatsQuery,
  useGetMyOrdersQuery,
} from "@/store/api/orderApi";
import { IOrder, OrderStatus } from "@/types/order.types";

const DashboardHome = () => {
  const { user } = useAuth();

  // Fetch order stats
  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetOrderStatsQuery();
  const orderStats = statsResponse?.data;

  // Fetch recent orders (limit to 5)
  const { data: ordersResponse, isLoading: isOrdersLoading } =
    useGetMyOrdersQuery({ limit: 5 });
  const recentOrders = ordersResponse?.data || [];

  // Stats from API
  const stats = [
    {
      title: "Total Orders",
      value: orderStats?.totalOrders?.toString() || "0",
      icon: ShoppingBag,
      change: `${orderStats?.pendingOrders || 0} pending`,
      color: "primary",
      loading: isStatsLoading,
    },
    {
      title: "Total Spent",
      value: `$${(orderStats?.totalSpend || 0).toFixed(2)}`,
      icon: DollarSign,
      change: `${orderStats?.completedOrders || 0} completed`,
      color: "green",
      loading: isStatsLoading,
    },
    {
      title: "Processing",
      value: (
        (orderStats?.processingOrders || 0) + (orderStats?.shippedOrders || 0)
      ).toString(),
      icon: Truck,
      change: `${orderStats?.shippedOrders || 0} shipped`,
      color: "blue",
      loading: isStatsLoading,
    },
    {
      title: "Pending Orders",
      value: orderStats?.pendingOrders?.toString() || "0",
      icon: Package,
      change: `${orderStats?.confirmedOrders || 0} confirmed`,
      color: "orange",
      loading: isStatsLoading,
    },
  ];

  const getStatColor = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "green":
        return "bg-green-100 text-green-600";
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "orange":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return Clock;
      case OrderStatus.CONFIRMED:
        return CheckCircle2;
      case OrderStatus.PROCESSING:
        return Package;
      case OrderStatus.SHIPPED:
        return Truck;
      case OrderStatus.DELIVERED:
        return CheckCircle2;
      case OrderStatus.CANCELLED:
        return XCircle;
      default:
        return Package;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "text-yellow-600 bg-yellow-50";
      case OrderStatus.CONFIRMED:
        return "text-blue-600 bg-blue-50";
      case OrderStatus.PROCESSING:
        return "text-orange-600 bg-orange-50";
      case OrderStatus.SHIPPED:
        return "text-purple-600 bg-purple-50";
      case OrderStatus.DELIVERED:
        return "text-green-600 bg-green-50";
      case OrderStatus.CANCELLED:
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div className="bg-linear-to-r from-primary via-primary-hover to-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
              Welcome Back, {`${user?.firstName} ${user?.lastName}`}!
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg">
              Here&apos;s what&apos;s happening with your orders today
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-gray-200 shadow-none">
              <CardContent className="p-3 sm:p-4 lg:pt-6">
                <div className="flex items-start justify-between mb-2 sm:mb-4">
                  <div
                    className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${getStatColor(
                      stat.color
                    )}`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                  {stat.color === "green" && orderStats?.totalSpend && (
                    <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm font-medium">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  {stat.loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-gray-400" />
                    </div>
                  ) : (
                    <>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {stat.change}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="w-full rounded-xl sm:rounded-t-2xl border-gray-200 shadow-none">
        <CardHeader className="bg-secondary/30 rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg lg:text-xl">
              Recent Orders
            </CardTitle>
            <Link href="/dashboard/orders">
              <Button
                size="sm"
                className="cursor-pointer text-xs sm:text-sm h-8 sm:h-9 rounded-md"
              >
                View All
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:pt-6">
          {isOrdersLoading ? (
            <div className="flex justify-center items-center py-6 sm:py-8">
              <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Package className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm sm:text-base">
                No orders yet
              </p>
              <Link href="/cabinet-lines">
                <Button variant="outline" className="mt-4 text-sm rounded-md">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {recentOrders.map((order: IOrder) => {
                const StatusIcon = getStatusIcon(order.status);
                const statusColor = getStatusColor(order.status);
                return (
                  <Link
                    href={`/dashboard/orders/${order.orderNumber}`}
                    key={order._id}
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer mb-2">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className={`p-2 sm:p-3 rounded-lg ${statusColor}`}>
                          <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">
                            {order.orderNumber}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""} •{" "}
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm sm:text-lg text-primary">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                        <span
                          className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full capitalize ${statusColor}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
