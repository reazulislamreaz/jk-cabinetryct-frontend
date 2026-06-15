import logo from "@/assets/logo/jk-cabinetryct-logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50 border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="flex flex-col items-center sm:items-start space-y-4 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <Image
              src={logo}
              alt="J&K Cabinetry"
              width={180}
              height={60}
              className="h-10 lg:h-14 w-auto"
            />
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm">
              Premium quality cabinetry for your home and business. Trusted by
              professionals across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cabinet-lines"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  Cabinet Lines
                </Link>
              </li>
              <li>
                <Link
                  href="/cabinet-specs"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  Cabinet Specs
                </Link>
              </li>
              <li>
                <Link
                  href="/about-jk"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  About J&K
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-sm font-semibold text-gray-900">
              Contact Us
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#721011] mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">
                  325 SUB WAY STE 160, Milford CT 06461
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#721011] shrink-0" />
                <a
                  href="tel:475 441-0119"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
                >
                  475 441-0119
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#721011] shrink-0" />
                <a
                  href="mailto:sales@jkcabinetryct.com"
                  className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011] break-all"
                >
                  sales@jkcabinetryct.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 border-gray-200">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              &copy; {currentYear} J&K Cabinetry. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-xs sm:text-sm text-gray-600 transition-colors hover:text-[#721011]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
