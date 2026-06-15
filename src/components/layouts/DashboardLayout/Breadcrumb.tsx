"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = true }: BreadcrumbProps) {
  const pathname = usePathname();

  // If items are provided manually, use them. Otherwise, auto-detect from pathname
  let segments: BreadcrumbItem[] = [];

  if (items) {
    // Use manually provided items
    segments = items;
  } else {
    // Auto-detect from pathname
    const pathArray = pathname?.split("/").filter((segment) => segment !== "") || [];
    segments = pathArray.map((segment, index) => ({
      label: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      href: `/${pathArray.slice(0, index + 1).join("/")}`,
    }));
  }

  return (
    <nav className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 text-gray-600">
      {showHome && (
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all hover:bg-primary/10 hover:text-primary group"
        >
          <Home className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 group-hover:text-primary transition-colors" />
          <span className="font-medium text-gray-600 group-hover:text-primary hidden sm:inline">
            Home
          </span>
        </Link>
      )}

      {segments.map((segment, index) => (
        <Fragment key={index}>
          {(showHome || index > 0) && (
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
          )}
          {index === segments.length - 1 || !segment.href ? (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-primary/10 text-primary font-semibold truncate max-w-[120px] sm:max-w-none">
              {segment.label}
            </span>
          ) : (
            <Link
              href={segment.href}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium text-gray-600 transition-all hover:bg-primary/10 hover:text-primary truncate max-w-[100px] sm:max-w-none"
            >
              {segment.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
