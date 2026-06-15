import HomeownerExcitement from "@/components/layouts/MainLayout/Homeowner/HomeownerExcitement";
import HomeownerHero from "@/components/layouts/MainLayout/Homeowner/HomeownerHero";
import HomeownerResources from "@/components/layouts/MainLayout/Homeowner/HomeownerResources";
import HomeownerThreeStep from "@/components/layouts/MainLayout/Homeowner/HomeownerThreeStep";
import { generateDynamicMetadata } from "@/utils/metadata";
import React from "react";

export const metadata = generateDynamicMetadata({
  title: "For Homeowners - J&K Cabinetry",
  description: "Resources and information for homeowners considering J&K cabinets",
});

const page = () => {
  return (
    <main className="w-full">
      <HomeownerHero />
      <HomeownerExcitement />
      <HomeownerThreeStep />
      <HomeownerResources />
    </main>
  );
};

export default page;
