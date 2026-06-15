
import { User } from "./auth.types";

export interface UserProfile extends User {
  avatar?: string;
  taxId?: string;
  businessLicense?: string;
  preferredPaymentMethod?: string;
  creditLimit?: number;
  accountBalance?: number;
}

/**
 * Update profile request payload
 */
export interface UpdateProfileRequest {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  avatar?: string;
  taxId?: string;
  businessLicense?: string;
}

/**
 * Change password request payload
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Address entity
 */
export interface Address {
  id: string;
  userId: string;
  type: AddressType;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Address type enum
 */
export enum AddressType {
  SHIPPING = "shipping",
  BILLING = "billing",
  BOTH = "both",
}

/**
 * Create/Update address request payload
 */
export interface AddressRequest {
  type: AddressType;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

/**
 * Payment method entity
 */
export interface PaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  cardholderName?: string;
  cardNumber?: string; // Last 4 digits only
  expiryMonth?: number;
  expiryYear?: number;
  cardBrand?: string;
  bankName?: string;
  accountNumber?: string; // Last 4 digits only
  routingNumber?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payment method type enum
 */
export enum PaymentMethodType {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  BANK_ACCOUNT = "bank_account",
  NET_30 = "net_30",
  NET_60 = "net_60",
}

/**
 * User notification preferences
 */
export interface NotificationPreferences {
  email: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
  sms: {
    orderUpdates: boolean;
    promotions: boolean;
  };
  push: {
    orderUpdates: boolean;
    promotions: boolean;
  };
}
