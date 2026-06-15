"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
import { verifyOtpSchema, type VerifyOtpFormData } from "@/lib/validations";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/store/api/authApi";
import { toast } from "@/hooks";
import { IError } from "@/types";
import * as React from "react";

interface VerifyOtpFormProps {
  title?: string;
  description?: string;
}

export function VerifyOtpForm({ title, description }: VerifyOtpFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";
  const otpSentTime = searchParams?.get("sentAt"); // Get the timestamp when OTP was sent

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [countdown, setCountdown] = useState(() => {
    // Calculate remaining time based on when OTP was sent
    if (otpSentTime) {
      const sentAt = parseInt(otpSentTime, 10);
      const now = Date.now();
      const timePassed = Math.floor((now - sentAt) / 1000);
      const remainingTime = Math.max(0, 60 - timePassed);
      return remainingTime;
    }
    return 0;
  });

  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailParam || "",
      otp: "",
    },
  });

  const handleResendOtp = async () => {
    if (countdown > 0) return; // Prevent multiple requests during cooldown

    try {
      await resendOtp({ email: emailParam || "" }).unwrap();
      toast.success("OTP sent successfully! Please check your email.");
      // Update the sentAt time in URL and reset countdown to 60 seconds
      const newSentTime = Date.now();
      router.replace(
        `/auth/verify-otp?email=${encodeURIComponent(
          emailParam || ""
        )}&sentAt=${newSentTime}`,
        { scroll: false }
      );
      setCountdown(60); // Start 60-second cooldown
    } catch (error) {
      const err = error as IError;
      toast.error(
        err?.data?.message || "Failed to resend OTP. Please try again."
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

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
     await verifyOtp(data).unwrap();
      // if (response.verified && response.resetToken) {
      toast.success("OTP verified successfully");
      // Redirect to reset password page with token
      router.push(
        `/auth/reset-password?email=${encodeURIComponent(emailParam || "")}`
      );
    } catch (error) {
      const err = error as IError;
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
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
          We&apos;ve sent a 6-digit code to your email. Please enter it below.
        </p>

        {/* Email Field (readonly) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  disabled
                  className="bg-gray-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* OTP Field */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  {...field}
                  className="text-center text-2xl tracking-widest"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 cursor-pointer bg-[#721011] hover:bg-[#5a0d0e] rounded-md"
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Resend OTP Button */}
        <p className="text-center text-sm text-gray-600">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending || countdown > 0}
            className={`font-medium cursor-pointer ${
              countdown > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#721011] hover:underline disabled:opacity-50"
            }`}
          >
            {isResending
              ? "Sending..."
              : countdown > 0
              ? `Resend (${countdown}s)`
              : "Resend OTP"}
          </button>
        </p>
      </form>
    </Form>
  );
}
