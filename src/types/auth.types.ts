export enum UserRole {
  Super_Admin = "super_admin",
  Supporting_Admin = "supporting_admin",
  User = "user",
  Admin = "admin",
}
export enum UserStatus {
  Verified = "verified",
  Unverified = "unverified",
  Blocked = "blocked",
  Delete = "delete",
  Banned = "banned",
}

export enum BusinessType {
  CONSTRACTOR = "constructor",
  DEALER = "dealer",
  SALESREPRESENTATIVE = "salesRepresentative",
  SHOWROOM = "showroom",
  BUILDERDEVELOPER = "builderDeveloper",
  DISTRIBUTOR = "distributor",
  RETAILER = "retailer",
  ONLINERETAILER = "onlineRetailer",
  OTHER = "other",
}

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  email: string;
  password: string;
  companyName?: string;
  companyWebsite?: string;
  phoneNumber?: string;
  address?: string;
  addressLine2?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  businessDocument?: string;
  salesTaxExemption?: string;
  businessType?: BusinessType;
  perMonthSpend?: number;
  closestLocation?: string;
  howHearAboutUs?: string;
  role: UserRole;
  status: UserStatus;
  isResetPassword: boolean;
  lastPasswordChange?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}
