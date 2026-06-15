import Collection from "@/components/layouts/Common/Collection";
import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import FAQSection from "@/components/layouts/MainLayout/Home/FAQSection";

import TestimonialsSection from "@/components/layouts/MainLayout/Home/TestimonialsSection";
import ThreeStepProcess from "@/components/layouts/MainLayout/Home/ThreeStepProcess";
import BuiltToLast from "@/components/layouts/MainLayout/OurCabinets/BuiltToLast";
import EnvironmentalCommitment from "@/components/layouts/MainLayout/OurCabinets/EnvironmentalCommitment";
import OurCabinetsHeroBanner from "@/components/layouts/MainLayout/OurCabinets/OurCabinetsHeroBanner";
import PremiumFeatures from "@/components/layouts/MainLayout/OurCabinets/PremiumFeatures";
import ProductCategories from "@/components/layouts/MainLayout/OurCabinets/ProductCategories";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Our Cabinets - J&K Cabinetry",
  description: "Discover our premium quality cabinets for professionals",
});

const page = () => {
  return (
    <main className="w-full">
      <OurCabinetsHeroBanner />
      <ProductCategories />
      <BuiltToLast />
      <PremiumFeatures />
      <ThreeStepProcess />
      <Collection />
      <EnvironmentalCommitment />
      <TestimonialsSection />
      <ContactForm />
      <FAQSection />
    </main>
  );
};

export default page;
