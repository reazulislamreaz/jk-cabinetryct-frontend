"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, Search, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
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

        {/* 404 Text */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-[100px] sm:text-[150px] lg:text-[200px] font-bold text-[#721011] leading-none opacity-20">
            404
          </h1>
        </div>

        {/* Text Content */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 -mt-12 sm:-mt-16">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
          Looks like this cabinet door leads nowhere. The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#721011] text-white  rounded-lg hover:bg-[#5a0d0e] transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Home
          </Link>
          <Link
            href="/cabinet-lines"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#721011]  rounded-lg border border-[#721011] hover:bg-[#721011] hover:text-white transition-colors text-sm sm:text-base"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            Browse Cabinets
          </Link>
        </div>

        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-gray-500 hover:text-[#721011] transition-colors cursor-pointer text-sm sm:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
