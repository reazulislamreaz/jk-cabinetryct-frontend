import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const fileSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "File size must be less than 5MB",
  })
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    message: "Only PDF, JPG, JPEG, and PNG files are allowed",
  });

// Register Schema
export const registerSchema = z
  .object({
    companyName: z.string().optional(),
    companyWebsite: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          return (
            /^(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(val) ||
            /^https?:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(
              val,
            )
          );
        },
        {
          message:
            "Please enter a valid website (e.g. www.example.com or https://example.com)",
        },
      ),
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),
    address: z.string().optional(),
    addressLine2: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    businessDocument: fileSchema.optional(),
    salesTaxExemption: fileSchema.optional(),
    businessType: z.string().optional(),
    perMonthSpend: z
      .preprocess(
        (val) => Number(val),
        z.number().min(0, "Monthly spend must be a positive number"),
      )
      .optional(),
    closestLocation: z.string().optional(),
    howHearAboutUs: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Forgot password form schema
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Verify OTP form schema
 */
export const verifyOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

/**
 * Reset password form schema
 */
export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
