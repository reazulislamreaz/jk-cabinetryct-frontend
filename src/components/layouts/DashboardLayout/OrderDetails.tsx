"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Loader2,
  MapPin,
  Mail,
  Phone,
  Building,
  Hash,
  Globe,
  MapPinned,
  Map,
  User,
  CreditCard,
  DollarSign,
  ExternalLink,
  Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetOrderByNumberQuery } from "@/store/api/orderApi";
import { OrderStatus } from "@/types/order.types";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const params = useParams();
  const orderNumber = params?.orderNumber as string;
  const {
    data: orderResponse,
    isLoading,
    isError,
  } = useGetOrderByNumberQuery(orderNumber as string, {
    skip: !orderNumber,
  });
  const order = orderResponse?.data;

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case OrderStatus.CONFIRMED:
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case OrderStatus.PROCESSING:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5" />;
      case OrderStatus.SHIPPED:
        return <Truck className="w-4 h-4 sm:w-5 sm:h-5" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5" />;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground mb-4">Order not found</p>
        <Link href="/dashboard/orders">
          <Button variant="outline" className="rounded-md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <Link
            href="/dashboard/orders"
            className="text-xs sm:text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Orders
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {order.orderNumber}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border flex items-center gap-1.5 sm:gap-2 w-fit ${getStatusColor(
            order.status
          )}`}
        >
          {getStatusIcon(order.status)}
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
      </div>

      {/* Payment Information Alert */}
      {order?.isPaymentLinkSent && order?.paymentDetails && (
        <Alert className="border-green-200 bg-green-50">
          <CreditCard className="h-4 w-4 text-green-600" />
          <AlertDescription className="ml-2">
            <div className="space-y-2">
              <p className="font-semibold text-green-900">Payment Link Sent</p>
              <div className="text-sm text-green-800 space-y-1">
                <p>
                  <span className="font-medium">Amount to Pay:</span>{" "}
                  <span className="font-bold">
                    ${order?.paymentDetails?.payableAmount?.toFixed(2)}
                  </span>
                </p>
                {order?.paymentDetails?.paymentLink && (
                  <Link
                    href={order?.paymentDetails.paymentLink}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Click here to make payment
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-base sm:text-lg">
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {order?.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      {item?.partsId?.mainImage ? (
                        <Image
                          src={`${item?.partsId?.mainImage}`}
                          alt={item?.partsId?.title || "Product image"}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                        {item?.partsId?.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Code: {item?.partsId?.code}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Qty: {item?.quantity}
                      </p>
                      {item?.isAssemblyPrice && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          With Assembly
                        </Badge>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {item?.isAssemblyPrice && (
                        <p className="text-xs text-muted-foreground mb-1">
                          Assembly: $
                          {(
                            item?.quantity * item?.partsId?.assemblyPrice
                          ).toFixed(2)}
                        </p>
                      )}
                      <p className="font-bold text-sm sm:text-base text-primary">
                        ${item?.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order?.notes && (
            <Card className="border-gray-200 shadow-none">
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg">
                  Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                <p className="text-sm sm:text-base text-gray-700">
                  {order?.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary & Shipping */}
        <div className="space-y-4 sm:space-y-6">
          {/* Payment Details Card */}
          {order.isPaymentLinkSent && order.paymentDetails && (
            <Card className="border-green-200 bg-green-50/50 shadow-none">
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Amount to Pay
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ${order.paymentDetails.payableAmount?.toFixed(2)}
                  </span>
                </div>
                {order.paymentDetails.paymentLink && (
                  <Link
                    href={order.paymentDetails.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 rounded cursor-pointer text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Payment
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-800">
                    Click the button above to complete your payment securely.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-base sm:text-lg">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${order?.subtotal?.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm sm:text-base text-gray-900">
                    Total Amount
                  </span>
                  <span className="font-bold text-lg sm:text-xl text-primary">
                    ${order?.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
              {order.isPaymentLinkSent &&
                order.paymentDetails &&
                order.paymentDetails.payableAmount !== order.totalPrice && (
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-green-700">
                        Payable Amount
                      </span>
                      <span className="font-bold text-lg text-green-600">
                        ${order.paymentDetails.payableAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-gray-200 shadow-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-base sm:text-lg">
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base">
                      {order?.shippingAddress?.firstName}{" "}
                      {order?.shippingAddress?.lastName}
                    </p>
                  </div>
                </div>

                {order?.shippingAddress?.companyName && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {order?.shippingAddress?.companyName}
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {order?.shippingAddress?.address}
                    </p>
                    {order?.shippingAddress?.addressLine2 && (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {order?.shippingAddress?.addressLine2}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order?.shippingAddress?.city}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Map className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order?.shippingAddress?.state}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order?.shippingAddress?.zipCode}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {order?.shippingAddress?.country}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm">
                    {order?.shippingAddress?.phoneNumber}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                  <p className="text-xs sm:text-sm break-all">
                    {order?.shippingAddress?.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
