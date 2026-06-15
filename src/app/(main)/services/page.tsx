import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import FAQSection from "@/components/layouts/MainLayout/Home/FAQSection";
import TestimonialsSection from "@/components/layouts/MainLayout/Home/TestimonialsSection";
import AdditionalServices from "@/components/layouts/MainLayout/Services/AdditionalServices";
import CommitmentSection from "@/components/layouts/MainLayout/Services/CommitmentSection";
import { generateDynamicMetadata } from "@/utils/metadata";
import React from "react";

export const metadata = generateDynamicMetadata({
  title: "Services - J&K Cabinetry",
  description: "Explore our comprehensive services for professional cabinet solutions",
});

const page = () => {
  return (
    <main className="w-full">
      <CommitmentSection />
      <AdditionalServices />
      <TestimonialsSection />
      <ContactForm />
      <FAQSection />
    </main>
  );
};

export default page;
