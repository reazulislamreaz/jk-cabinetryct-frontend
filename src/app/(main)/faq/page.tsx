import FAQ from "@/components/layouts/MainLayout/FAQ/FAQ";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "FAQ - J&K Cabinetry",
  description: "Frequently asked questions about our cabinets and services",
});

const page = () => {
  return <FAQ />;
};

export default page;
