import AboutJk from "@/components/layouts/MainLayout/AboutJk";
import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import FAQSection from "@/components/layouts/MainLayout/Home/FAQSection";
import TestimonialsSection from "@/components/layouts/MainLayout/Home/TestimonialsSection";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = defaultMetadata.about;

export default function AboutJkPage() {
  return (
    <main className="w-full">
      <AboutJk />
      <TestimonialsSection />
      <ContactForm />
      <FAQSection />
    </main>
  );
}
