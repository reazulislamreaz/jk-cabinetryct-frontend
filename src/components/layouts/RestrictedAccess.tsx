import React from "react";
import Image from "next/image";
import logo from "@/assets/logo/logo2.png";
import Link from "next/link";
import { Button } from "../ui/button";

const RestrictedAccess = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center px-5 py-16 md:py-24">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <Image
          src={logo}
          width={200}
          height={200}
          alt="logo"
          className="mx-auto"
        />

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed">
          This page is restricted to approved members only. Please login or
          register to access this page.
        </p>

        {/* Login Button */}
        <Link href="/auth/login">
          <Button variant="default" className="w-full md:w-auto px-10 cursor-pointer h-12 rounded-md">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RestrictedAccess;
