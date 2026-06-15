"use client";
import logo from "@/assets/logo/jk-cabinetryct-logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModal from "@/components/ui/LogoutModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import { getProfileImageUrl } from "@/utils/profile.utils";
import { useAppSelector } from "@/store/hooks";
import { totalCartQuantity } from "@/store/slices/cartSlice";
import {
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About J&K", href: "/about-jk" },
  { label: "Our Cabinets", href: "/our-cabinets" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Registration", href: "/registration" },
  // { label: "Shop Cabinetry Line", href: "/cabinet-lines" },
];

const resourcesItems = [
  { label: "Catalog", href: "/catalog" },
  { label: "Homeowner", href: "/homeowner" },
  {
    label: "J&K Cabinet Assembly Instructions",
    href: "/jk-cabinet-assembly-instructions",
  },
  { label: "Cabinet Care", href: "/cabinet-care" },
  { label: "FAQ", href: "/faq" },
  { label: "Multi-Unit", href: "/multi-unit" },
];

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const count = useAppSelector(totalCartQuantity);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex h-20 lg:h-[90px] items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="shrink-0">
              <Image
                src={logo}
                alt="J&K Cabinetry"
                width={180}
                height={60}
                className="h-10 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Exact Match */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-5 md:gap-7 text-gray-700">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[15px]  font-medium text-gray-950 hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources Dropdown with Arrow */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center cursor-pointer gap-1 text-gray-950 hover:text-primary transition-colors duration-200 outline-none">
                      Resources
                      <svg
                        className="w-4 h-4 mt-0.5 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-60 mt-3">
                    {resourcesItems.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <Link
                          href={item.href}
                          className="cursor-pointer text-gray-950 hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
          {/* Right Side */}
          <div className="hidden lg:block">
            {/* Profile Dropdown */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 md:gap-6">
                {/* Cart Icon */}
                <Link href="/cart">
                  <div className="relative bg-[#E7E7E7] p-1.5 sm:p-2 rounded-lg">
                    <ShoppingCart className="h-5 w-5  text-gray-600" />
                    {/* {cartItemCount > 0 && (
                  
                )} */}
                    <Badge
                      variant="default"
                      className="absolute -right-1.5 sm:-right-2 -top-1.5 sm:-top-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-[8px] sm:text-xs flex items-center justify-center bg-primary"
                    >
                      {count || 0}
                    </Badge>
                  </div>
                </Link>
                <div className="relative hidden sm:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative size-10 md:size-12 rounded-full border border-gray-200 hover:bg-gray-100 cursor-pointer"
                      >
                        <Avatar className="size-8 sm:size-10">
                          <AvatarImage
                            src={getProfileImageUrl(user.profileImage)}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <AvatarFallback className="text-xs sm:text-sm">
                            {user.firstName?.charAt(0)}
                            {user.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <LayoutDashboard className="text-gray-500" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile">
                          <User className="text-gray-500" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/orders">
                          <ListOrdered className="text-gray-500" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/inbox">
                          <MessageCircle className="text-gray-500" />
                          Messages
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">
                          <Settings className="text-gray-500" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setLogoutModalOpen(true)}
                        className="cursor-pointer"
                      >
                        <LogOut className="text-gray-500" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => router.push("/contact")}
                className="hidden lg:inline-flex bg-primary px-6 lg:px-10 cursor-pointer rounded h-10 lg:h-12 text-primary-foreground text-sm"
              >
                Contact Us
              </Button>
              // <Button
              //   onClick={() => router.push("/auth/login")}
              //   className="hidden lg:inline-flex bg-primary px-6 lg:px-10 cursor-pointer rounded h-10 lg:h-12 text-primary-foreground text-sm"
              // >
              //   Login
              // </Button>
            )}
          </div>
          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden cursor-pointer">
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 pt-10">
              <div className="flex flex-col gap-6 text-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources in Mobile */}
                <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                  <p className="text-sm hover:text-primary transition-colors">
                    Resources
                  </p>
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* <Button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/auth/login");
                  }}
                  className="w-full bg-primary hover:bg-[#701414] h-12 text-base font-medium"
                >
                  Login
                </Button> */}

                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/contact");
                  }}
                  className="w-full bg-primary hover:bg-[#701414] h-12 rounded-lg text-base font-medium"
                >
                  Contact Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <LogoutModal open={logoutModalOpen} onOpenChange={setLogoutModalOpen} />
    </header>
  );
};

export default Navbar;
