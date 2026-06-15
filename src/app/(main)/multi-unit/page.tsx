import ComparisonTable from "@/components/layouts/Common/ComparisonTable";
import MultiUnitHero from "@/components/layouts/MainLayout/MultiUnit/MultiUnitHero";
import OurProvenProcess from "@/components/layouts/MainLayout/MultiUnit/OurProvenProcess";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Multi-Unit Projects - J&K Cabinetry",
  description: "Solutions for multi-unit residential and commercial projects",
});

const page = () => {
  return (
    <main className="w-full">
      <MultiUnitHero />
      <ComparisonTable />
      <OurProvenProcess />
    </main>
  );
};

export default page;
