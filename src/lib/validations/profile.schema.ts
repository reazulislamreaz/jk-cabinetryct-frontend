/**
 * Profile Form Validation Schemas
 * Zod schemas for profile-related forms
 */

import { z } from "zod";

/**
 * Edit profile form schema
 */
export const editProfileSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .optional(),
  address: z
    .string()
    .min(5, "Street address must be at least 5 characters")
    .optional(),
  city: z.string().min(2, "City must be at least 2 characters").optional(),
  state: z.string().length(2, "Please select a valid state").optional(),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code")
    .optional(),
  taxId: z.string().optional(),
  businessLicense: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

/**
 * Change password form schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
