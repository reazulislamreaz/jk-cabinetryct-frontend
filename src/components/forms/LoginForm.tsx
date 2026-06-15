"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useLoginMutation } from "@/store/api/authApi";
import { profileApi } from "@/store/api/profileApi";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "@/hooks";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { isAuthenticated, setAuthTokens, setAuthUser } from "@/utils/auth.utils";
import { User } from "@/types";
import { useEffect } from "react";
interface LoginFormProps {
  title?: string;
  description?: string;
}
const LoginForm = ({ title, description }: LoginFormProps) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (!isAuthenticated()) return;

    const redirect = searchParams?.get("redirect");
    window.location.href =
      redirect && redirect.startsWith("/") ? redirect : "/dashboard";
  }, [searchParams]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        email: data.email.toLowerCase().trim(),
        password: data.password,
      }).unwrap();
      if (
        response?.data?.user?.role === "admin" ||
        response?.data?.user?.role === "super_admin"
      ) {
        toast.error(
          "Admin cannot login from here. Please use the admin portal."
        );
        return;
      }
      const tokensSaved = setAuthTokens(
        response.data?.tokens?.accessToken,
        response.data?.tokens?.refreshToken
      );

      if (!tokensSaved) {
        toast.error("Login succeeded but session could not be created. Please try again.");
        return;
      }

      if (response.data?.user) {
        setAuthUser(response.data.user as User);
        dispatch(
          profileApi.util.upsertQueryData("getMyProfile", undefined, {
            success: true,
            data: response.data.user,
          })
        );
      }

      toast.success("Logged in successfully");

      const redirect = searchParams?.get("redirect");
      const destination =
        redirect && redirect.startsWith("/") ? redirect : "/dashboard";

      // Full page navigation ensures cookies and auth state are available on dashboard
      window.location.href = destination;
    } catch (error: unknown) {
      const err = error as {
        status?: number | string;
        data?: { message?: string };
        error?: string;
      };

      if (err.status === "FETCH_ERROR") {
        toast.error(
          "Cannot connect to the server. Please ensure the API is running and try again."
        );
        return;
      }

      if (err.status === 429) {
        toast.error(
          err.data?.message ||
            "Too many login attempts. Please wait 15 minutes and try again."
        );
        return;
      }

      toast.error(
        err.data?.message || "Failed to login. Please check your credentials."
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

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:content-['*'] after:text-primary">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer text-sm font-normal">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />

          <Link
            href="/auth/forgot-password"
            className="text-sm text-[#721011] hover:underline"
          >
            Forgot password?
          </Link>
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/registration"
            className="font-medium text-[#721011] hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </Form>
  );
};
export default LoginForm;
