"use client";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <div className="w-full flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-60 xl:w-64 lg:flex-col shrink-0 border-r border-gray-200 h-screen sticky top-0">
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-[260px] sm:w-64 p-0">
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Topbar */}
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
