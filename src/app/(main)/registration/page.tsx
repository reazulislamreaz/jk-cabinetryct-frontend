import RegisterForm from "@/components/forms/RegisterForm";
import { Breadcrumb } from "@/components/layouts/DashboardLayout/Breadcrumb";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Register - J&K Cabinetry",
  description: "Create your J&K Cabinetry business account",
});

export default function RegisterPage() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto pb-5">
        <Breadcrumb items={[{ label: "Create Account" }]} />
      </div>
      <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
        <RegisterForm
          title="Register New Account"
          description="Register a new account to join and start using our services. It only takes a minute to sign up and get access."
        />
      </div>
    </section>
  );
}
