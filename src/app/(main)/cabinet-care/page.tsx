import CabinetCare from "@/components/layouts/MainLayout/CabinetCare/CabinetCare";
import CabinetCareHero from "@/components/layouts/MainLayout/CabinetCare/CabinetCareHero";
import { generateDynamicMetadata } from "@/utils/metadata";
import React from "react";

export const metadata = generateDynamicMetadata({
  title: "Cabinet Care - J&K Cabinetry",
  description: "Learn how to properly care for and maintain your J&K cabinets",
});

const page = () => {
  return (
    <main className="w-full">
      <CabinetCareHero />
      <CabinetCare />
    </main>
  );
};

export default page;
