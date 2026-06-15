import Craftsmanship from "@/components/layouts/MainLayout/Quality/Craftsmanship";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Craftsmanship - J&K Cabinetry",
  description:
    "Experience the superior craftsmanship and attention to detail in every J&K cabinet.",
});

export default function CraftsmanshipPage() {
  return <Craftsmanship />;
}
