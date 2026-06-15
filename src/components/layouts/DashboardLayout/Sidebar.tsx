"use client";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/jk-cabinetryct-logo.png";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useLogout();

  const navItems = [
    {
      label: "Dashboard Home",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      label: "My Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      label: "Messages",
      href: "/dashboard/inbox",
      icon: MessageCircle,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <Link href="/" className="p-2 sm:p-3 border-b border-gray-200">
        <Image
          src={logo}
          alt="J&K Cabinetry"
          width={80}
          height={30}
          className="w-full sm:max-w-full"
        />
      </Link>

      <div className="flex-1 overflow-y-auto py-4 sm:py-6">
        <nav className="space-y-2 sm:space-y-3 px-2 sm:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2 sm:gap-3 rounded-lg px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base",
                  isActive
                    ? "bg-[#721011] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="border-t p-2 sm:p-3 border-gray-200 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer text-xs sm:text-sm md:text-base h-9 sm:h-10"
          onClick={() => {
            void logout();
          }}
        >
          <LogOut className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
