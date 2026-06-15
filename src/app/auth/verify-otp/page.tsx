import { VerifyOtpForm } from "@/components/forms/VerifyOtpForm";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Verify OTP - J&K Cabinetry",
  description: "Verify your email address",
});

export default function VerifyOtpPage() {
  return (
    <VerifyOtpForm
      title="Verify Code"
      description="Enter the verification code sent to your email"
    />
  );
}
