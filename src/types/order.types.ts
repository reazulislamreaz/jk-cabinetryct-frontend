/**
 * Order Type Definitions
 */

// Order Status
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

// Shipping Address
export interface IShippingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber: string;
  address: string;
  addressLine2?: string;
  email: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
}

// Order Item for Create Request
export interface ICreateOrderItem {
  partsId: string;
  quantity: number;
  totalPrice: number;
}

// Create Order Request Payload
export interface ICreateOrderRequest {
  items: ICreateOrderItem[];
  subtotal: number;
  totalPrice: number;
  shippingAddress: IShippingAddress;
  notes?: string;
}

// Parts in Order Response
export interface IOrderParts {
  price: {
    wholesale: number;
    wholesaleWithTenPercent: number;
    contractor: number;
  };
  _id: string;
  title: string;
  code: string;
  assemblyPrice: number;
  mainImage: string;
  images: string[];
}

// Order Item in Response
export interface IOrderItem {
  partsId: IOrderParts;
  assemblyPrice: number;
  isAssemblyPrice: boolean;
  quantity: number;
  totalPrice: number;
}

// Branch in Order
export interface IOrderBranch {
  _id: string;
  name: string;
  email: string;
}

// User in Order
export interface IOrderUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Order Response
export interface IOrder {
  _id: string;
  orderNumber: string;
  userId: string | IOrderUser;
  branchId: IOrderBranch;
  items: IOrderItem[];
  subtotal: number;
  paymentDetails: {
    payableAmount: number;
    paymentLink: string;
  };
  isPaymentLinkSent: boolean;
  totalPrice: number;
  shippingAddress: IShippingAddress;
  status: OrderStatus;
  notes?: string;
  createdBy: string | IOrderUser;
  createdAt: string;
  updatedAt: string;
}

// Order Statistics
export interface IOrderStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalSpend: number;
  completedOrders: number;
}

// Get Orders Query Params
export interface IGetOrdersParams {
  searchTerms?: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

// API Response Meta
export interface IOrderMeta {
  page: number;
  limit: number;
  totalResult: number;
  totalPages: number;
}

// Get Orders Response
export interface IGetOrdersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  data: IOrder[];
  meta: IOrderMeta;
}

// Get Single Order Response
export interface IGetOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  data: IOrder;
}

// Get Order Stats Response
export interface IGetOrderStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  data: IOrderStats;
}

// Create Order Response
export interface ICreateOrderResponse {
  success: boolean;
  statusCode: number;
  message: string;
  timestamp: string;
  data: IOrder;
}
