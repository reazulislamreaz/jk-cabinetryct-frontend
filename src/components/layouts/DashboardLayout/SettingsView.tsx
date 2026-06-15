"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Eye, EyeOff, Save, AlertTriangle, Trash } from "lucide-react";
import {
  useChangePasswordMutation,
  useDeleteMyProfileMutation,
} from "@/store/api/profileApi";
import { toast } from "@/hooks";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IError } from "@/types";

// Define the password change schema
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

const SettingsView = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [deleteMyProfile, { isLoading: isDeleting }] =
    useDeleteMyProfileMutation();
  const router = useRouter();

  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordSubmit = async (data: PasswordChangeFormData) => {
    const payload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      await changePassword(payload).unwrap();
      toast.success("Password changed successfully!");
      form.reset();
    } catch (error) {
      const err = error as IError;
      toast.error(
        err?.data?.message || "Failed to change password. Please try again."
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteMyProfile(undefined).unwrap();
      toast.success("Account deleted successfully!");
      // Redirect to home page or login page after deletion
      router.push("/");
      router.refresh();
    } catch (error) {
      const err = error as IError;
      toast.error(
        err?.data?.message || "Failed to delete account. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Password Settings */}
      <Card className="border-border shadow-none">
        <CardHeader className="bg-secondary/20 rounded-t-xl p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <CardTitle className="text-base sm:text-lg">
              Change Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4 lg:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover shadow-none rounded  text-primary-foreground w-full sm:w-auto text-sm sm:text-base"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <Save className="size-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="size-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card className="border-border shadow-none">
        <CardHeader className="bg-secondary/20 rounded-t-xl p-3 sm:p-4 lg:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <CardTitle className="text-primary text-base sm:text-lg">
              Delete Account
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4 lg:p-6">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild className="flex">
                <Button
                  variant="default"
                  className="bg-primary shadow-none rounded text-destructive-foreground flex items-center gap-2 cursor-pointer w-full sm:w-auto text-sm"
                >
                  <Trash className="size-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] sm:max-w-md p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <AlertTriangle className="text-destructive" />
                    Delete Account
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    Are you sure you want to delete your account? This action
                    cannot be undone. All your data will be permanently removed.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col justify-end sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    className="cursor-pointer text-sm rounded shadow-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="cursor-pointer text-sm rounded shadow-none"
                  >
                    {isDeleting ? "Deleting..." : "Delete Account Permanently"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
