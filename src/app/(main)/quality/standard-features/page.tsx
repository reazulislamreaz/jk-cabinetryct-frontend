import StandardFeatures from "@/components/layouts/MainLayout/Quality/StandardFeatures";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Standard Features - J&K Cabinetry",
  description:
    "Discover the premium features that come standard with every J&K cabinet.",
});

export default function StandardFeaturesPage() {
  return <StandardFeatures />;
}
