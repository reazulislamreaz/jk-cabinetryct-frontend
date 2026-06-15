import ContactForm from "@/components/layouts/MainLayout/Home/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - J&K Cabinetry",
  description:
    "Get in touch with J&K Cabinetry for inquiries about our premium cabinets and services. Call, email, or visit us.",
  keywords: [
    "contact J&K Cabinetry",
    "cabinet inquiries",
    "customer support",
    "cabinet showroom",
  ],
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Contact Us
        </h1>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <Card className="w-full border border-gray-300 shadow-none">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#721011]" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href="tel:+475 441-0119"
                className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base"
              >
                475 441-0119
              </Link>
            </CardContent>
          </Card>

          <Card className="w-full border border-gray-300 shadow-none">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#721011]" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href="mailto:info@jkcabinetry.com"
                className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base break-all"
              >
                sales@jkcabinetryct.com
              </Link>
            </CardContent>
          </Card>

          <Card className="sm:col-span-2 md:col-span-1 border border-gray-300 shadow-none">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#721011]" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm sm:text-base">
               325 SUB WAY STE 160, 
                <br />
              Milford CT 06461
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
