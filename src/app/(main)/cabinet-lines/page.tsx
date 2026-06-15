import CabinetryLine from "@/components/layouts/MainLayout/CabinetryLine/CabinetryLine";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Cabinet Lines - J&K Cabinetry",
  description:
    "Explore our extensive selection of premium cabinet lines and styles",
});

export default function CabinetLinesPage() {
  return <CabinetryLine />;
}
