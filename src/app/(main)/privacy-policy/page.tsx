import PrivacyPolicy from "@/components/layouts/MainLayout/PrivacyPolicy";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Privacy Policy - J&K Cabinetry",
  description:
    "Learn how J&K Cabinetry collects, uses, and protects your personal information.",
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
