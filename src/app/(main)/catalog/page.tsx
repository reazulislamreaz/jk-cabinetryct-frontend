import Catalog from "@/components/layouts/MainLayout/Catalog/Catalog";
import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import { generateDynamicMetadata } from "@/utils/metadata";
import React from "react";

export const metadata = generateDynamicMetadata({
  title: "Catalog - J&K Cabinetry",
  description: "Browse our comprehensive catalog of premium cabinets and cabinetry solutions",
});

const page = () => {
  return (
    <main className="w-full">
      <Catalog />
      <ContactForm />
    </main>
  );
};

export default page;
