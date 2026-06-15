import AssemblyCategories from "@/components/layouts/MainLayout/AssemblyInstructions/AssemblyCategories";
import AssemblyHero from "@/components/layouts/MainLayout/AssemblyInstructions/AssemblyHero";
import { generateDynamicMetadata } from "@/utils/metadata";
import React from "react";

export const metadata = generateDynamicMetadata({
  title: "Assembly Instructions - J&K Cabinetry",
  description: "Step-by-step assembly instructions for J&K cabinets",
});

const page = () => {
  return (
    <main className="w-full">
      <AssemblyHero />
      <AssemblyCategories />
    </main>
  );
};

export default page;
