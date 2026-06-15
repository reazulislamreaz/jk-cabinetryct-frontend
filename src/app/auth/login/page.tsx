import LoginForm from "@/components/forms/LoginForm";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Login - J&K Cabinetry",
  description: "Login to your J&K Cabinetry account",
});

export default function LoginPage() {
  return (
    <LoginForm
      title="Welcome Back"
      description="Login to your J&K Cabinetry account"
    />
  );
}
