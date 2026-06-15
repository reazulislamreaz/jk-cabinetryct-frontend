

import { z } from "zod";

/**
 * Checkout form schema
 */
export const checkoutSchema = z.object({
  shippingAddressId: z.string().min(1, "Please select a shipping address"),
  billingAddressId: z.string().min(1, "Please select a billing address"),
  paymentMethodId: z.string().min(1, "Please select a payment method"),
  notes: z.string().max(500, "Notes must be at most 500 characters").optional(),
  terms: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * Contact form schema (for Contact page)
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .optional(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
