import CabinetSpecs from "@/components/layouts/MainLayout/CabinetSpecs/CabinetSpecs";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Cabinet Specifications - J&K Cabinetry",
  description:
    "Explore detailed cabinet specifications including dimensions, materials, finishes, and construction details. Professional grade cabinetry specs.",
});

export default function CabinetSpecsPage() {
  return <CabinetSpecs />;
}
