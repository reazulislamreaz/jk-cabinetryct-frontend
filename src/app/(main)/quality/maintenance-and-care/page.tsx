import MaintenanceAndCare from "@/components/layouts/MainLayout/Quality/MaintenanceAndCare";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Maintenance & Care - J&K Cabinetry",
  description:
    "Learn how to properly maintain and care for your J&K cabinets to ensure longevity and beauty.",
});

export default function MaintenanceAndCarePage() {
  return <MaintenanceAndCare />;
}
