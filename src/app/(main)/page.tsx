import Collection from "@/components/layouts/Common/Collection";
import AboutSection from "@/components/layouts/MainLayout/Home/AboutSection";
import BusinessOrderSteps from "@/components/layouts/MainLayout/Home/BusinessOrderSteps";
import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import EducationResources from "@/components/layouts/MainLayout/Home/EducationResources";
import FAQSection from "@/components/layouts/MainLayout/Home/FAQSection";
import HeroSection from "@/components/layouts/MainLayout/Home/HeroSection";
import HomeFeatures from "@/components/layouts/MainLayout/Home/HomeFeatures";
import OurLocations from "@/components/layouts/MainLayout/Home/OurLocations";
import TestimonialsSection from "@/components/layouts/MainLayout/Home/TestimonialsSection";
import ThreeStepProcess from "@/components/layouts/MainLayout/Home/ThreeStepProcess";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = defaultMetadata.home;

export default function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      {/* <BusinessOrderSteps /> */}
      <AboutSection />
      <HomeFeatures />
      {/* <VideoHeroSection /> */}
      <Collection />
      <TestimonialsSection />
      <ThreeStepProcess />
      <EducationResources />
      <OurLocations />
      <ContactForm />
      <FAQSection />
    </main>
  );
}
