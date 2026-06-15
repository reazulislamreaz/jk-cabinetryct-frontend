import { ResetPasswordForm } from "@/components/forms/ResetPasswordForm";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Reset Password - J&K Cabinetry",
  description: "Create a new password",
});

export default function ResetPasswordPage() {
  return (
    <ResetPasswordForm
      title="Reset Password"
      description="Create a new password for your account"
    />
  );
}
