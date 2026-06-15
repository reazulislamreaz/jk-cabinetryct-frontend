"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { toast } from "@/hooks";
import { IError } from "@/types/error.types";
import * as React from "react";

interface ForgotPasswordFormProps {
  title?: string;
  description?: string;
}

export function ForgotPasswordForm({ title, description }: ForgotPasswordFormProps) {
  const router = useRouter();
  const [forgotPassword, { isLoading: isSubmitting }] = useForgotPasswordMutation();
  const [countdown, setCountdown] = useState(0);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("OTP sent to your email");
      setCountdown(60); // Start 60-second cooldown
      // Redirect to OTP verification page with email and timestamp
      // eslint-disable-next-line react-hooks/purity
      const sentTime = Date.now();
      router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}&sentAt=${sentTime}`);
    } catch (error) {
      const err = error as IError;
      toast.error(
        err.data?.message || "Failed to login. Please check your credentials."
      );
    }
  };

  // Countdown timer effect
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

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
          Enter your email address and we&apos;ll send you a code to reset your
          password.
        </p>

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  disabled={isSubmitting || countdown > 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#721011] hover:bg-[#5a0d0e] cursor-pointer rounded-md"
          disabled={isSubmitting || countdown > 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : countdown > 0 ? (
            `Resend OTP (${countdown}s)`
          ) : (
            "Send OTP"
          )}
        </Button>

        {/* Back to Login Link */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#721011] hover:underline"
          >
            Back to login
          </Link>
        </p>
      </form>
    </Form>
  );
}
