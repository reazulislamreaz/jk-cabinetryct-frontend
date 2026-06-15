import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo2.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="w-full bg-white min-h-screen grid lg:grid-cols-2 items-center">
      {/* Left Side - Branding - Only visible on lg (1024px+) */}
      <div className="relative hidden lg:flex items-center justify-center p-6 sm:p-12 border-r border-[#CDAAAB]">
        <Image
          src={logo}
          alt="J&K Cabinetry"
          width={400}
          height={400}
          className="mx-auto h-auto"
          priority
        />
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-xl">
          {/* Mobile Logo - Only visible below lg (< 1024px) */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex justify-center">
              <Image
                src={logo}
                alt="J&K Cabinetry"
                width={200}
                height={67}
                className="h-12 sm:h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Title and Description */}
          {(title || description) && (
            <div className="mb-6 sm:mb-8">
              {title && (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h2>
              )}
              {description && <p className="text-sm sm:text-base text-gray-600">{description}</p>}
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">{children}</div>

          {/* Footer Links */}
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-[#721011] transition-colors">
              Back to Home
            </Link>
            {" • "}
            <Link
              href="/contact"
              className="hover:text-[#721011] transition-colors"
            >
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
