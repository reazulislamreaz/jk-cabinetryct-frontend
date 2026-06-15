"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import logo from "@/assets/logo/logo.png";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full text-center px-4">
        {/* Logo */}
        <div className="mb-4 sm:mb-6">
          <Image
            src={logo}
            alt="J&K Cabinetry"
            width={180}
            height={60}
            className="mx-auto h-10 sm:h-12 lg:h-14 w-auto"
            priority
          />
        </div>

        {/* Error Icon */}
        <div className="mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#721011]/10 rounded-full">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#721011]" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Something Went Wrong
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 max-w-md mx-auto">
          We encountered an unexpected error while crafting your experience.
          Don&apos;t worry, our team is working on fixing it.
        </p>

        {/* Error Details */}
        {error.digest && (
          <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
            Error Reference: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#721011] text-white font-semibold rounded-lg hover:bg-[#5a0d0e] transition-colors shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#721011] font-semibold rounded-lg border-2 border-[#721011] hover:bg-[#721011] hover:text-white transition-colors text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
            Need Help?
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
            If this problem persists, please contact our support team for
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center text-xs sm:text-sm">
            <Link
              href="mailto:support@jkcabinetry.com"
              className="text-[#721011] hover:underline break-all"
            >
              support@jkcabinetry.com
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="tel:+1234567890" className="text-[#721011] hover:underline">
              (123) 456-7890
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
