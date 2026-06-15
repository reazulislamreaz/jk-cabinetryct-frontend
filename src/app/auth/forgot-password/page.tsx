import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Forgot Password - J&K Cabinetry",
  description: "Reset your password",
});

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordForm
      title="Forgot Password"
      description="Reset your password via email verification"
    />
  );
}
