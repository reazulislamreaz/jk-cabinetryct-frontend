"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { getProfileImageUrl } from "@/utils/profile.utils";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-40 flex h-14 sm:h-16 lg:h-20 items-center gap-2 sm:gap-4 border-b border-gray-100 bg-white px-3 sm:px-4 lg:px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Welcome Text */}
      <div className="min-w-0 flex-1 sm:flex-none">
        <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold truncate">
          Welcome to Your Dashboard
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground truncate">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      {/* Spacer */}
      <div className="flex-1 hidden sm:block" />

      {/* User Profile */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center border-none gap-1.5 sm:gap-2 cursor-pointer bg-white shrink-0">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                <AvatarImage
                  src={getProfileImageUrl(user.profileImage)}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm font-semibold">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <p className="text-xs sm:text-sm font-medium leading-none">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {user.companyName}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 sm:w-48 md:w-56">
            <DropdownMenuLabel className="text-sm">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-sm">
              <Link href="/dashboard/profile">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-sm">
              <Link href="/">Back to Store</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
