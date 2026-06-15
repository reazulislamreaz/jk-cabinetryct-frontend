"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SubNavigation = () => {
  const [isQualityOpen, setIsQualityOpen] = useState(false);

  const qualityDropdownItems = [
    { label: "Maintenance And Care", href: "/quality/maintenance-and-care" },
    { label: "Standard Features", href: "/quality/standard-features" },
    { label: "Craftsmanship", href: "/quality/craftsmanship" },
    { label: "Sustainability", href: "/quality/sustainability" },
  ];

  return (
    <div className="hidden lg:block border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-8 h-12">
          <Link
            href="/"
            className="text-base text-[#4F4F4F] font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/cabinet-lines"
            className="text-base text-[#4F4F4F] font-medium hover:text-primary transition-colors"
          >
            Shop Cabinetry Line
          </Link>
          <Link
            href="/cabinet-specs"
            className="text-base text-[#4F4F4F] font-medium hover:text-primary transition-colors"
          >
            Cabinetry Specs
          </Link>

          {/* Our Quality Dropdown */}
          <DropdownMenu onOpenChange={setIsQualityOpen}>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 text-base text-[#4F4F4F] font-medium hover:text-primary outline-none transition-colors">
              Our Quality
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isQualityOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {qualityDropdownItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="cursor-pointer w-full">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/about-jk"
            className="text-base text-[#4F4F4F] font-medium hover:text-primary transition-colors"
          >
            About J&K
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SubNavigation;
