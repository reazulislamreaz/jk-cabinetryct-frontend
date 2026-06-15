import Sustainability from "@/components/layouts/MainLayout/Quality/Sustainability";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Sustainability - J&K Cabinetry",
  description:
    "Learn about our commitment to sustainable practices and environmental responsibility.",
});

export default function SustainabilityPage() {
  return <Sustainability />;
}
