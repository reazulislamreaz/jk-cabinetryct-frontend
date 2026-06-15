"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations";
import { useResetPasswordMutation } from "@/store/api/authApi";
import { toast } from "@/hooks";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { IError } from "@/types";

interface ResetPasswordFormProps {
  title?: string;
  description?: string;
}

export function ResetPasswordForm({ title, description }: ResetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailParam,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const payload = {
      email: emailParam,
      newPassword: data.newPassword,
    };
    try {
      await resetPassword(payload).unwrap();
      toast.success(
        "Password reset successful! Please login with your new password."
      );
      router.push("/auth/login");
    } catch (error) {
      const err = error as IError;
      toast.error(
        err?.data?.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title and Description */}
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
            )}
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}

        <p className="text-sm text-gray-600 mb-4">
          Enter your new password below.
        </p>

        {/* New Password Field */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter new password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm new password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Requirements */}
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-medium text-gray-700 mb-1">
            Password must contain:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• At least 8 characters</li>
            <li>• One uppercase letter</li>
            <li>• One lowercase letter</li>
            <li>• One number</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 cursor-pointer bg-[#721011] hover:bg-[#5a0d0e] rounded-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
