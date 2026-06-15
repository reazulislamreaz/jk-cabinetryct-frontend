import TermsAndConditions from "@/components/layouts/MainLayout/TermsAndConditions";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Terms & Conditions - J&K Cabinetry",
  description:
    "Read our terms and conditions for using J&K Cabinetry's website and services.",
});

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
