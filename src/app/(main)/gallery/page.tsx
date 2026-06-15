import Collection from "@/components/layouts/Common/Collection";
import Gallery from "@/components/layouts/MainLayout/Gallery/Gallery";
import GalleryBanner from "@/components/layouts/MainLayout/Gallery/GalleryBanner";
import OurLocations from "@/components/layouts/MainLayout/Home/OurLocations";
import TestimonialsSection from "@/components/layouts/MainLayout/Home/TestimonialsSection";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Gallery - J&K Cabinetry",
  description:
    "View our gallery of premium cabinetry projects and installations",
});

const page = () => {
  return (
    <main className="w-full">
      <GalleryBanner />
      <Gallery />
      <Collection />
      <OurLocations />
      <TestimonialsSection />
    </main>
  );
};

export default page;
