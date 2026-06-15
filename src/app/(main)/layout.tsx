import { Footer } from "@/components/layouts/MainLayout/Footer";
import Navbar from "@/components/layouts/MainLayout/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
