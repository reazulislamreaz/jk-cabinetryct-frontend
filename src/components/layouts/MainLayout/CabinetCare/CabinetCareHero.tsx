import Image from "next/image";
import React from "react";
import hero from "@/assets/cabinet-care/cabinet-care.jpg";
const CabinetCareHero = () => {
  return (
    <section className="relative w-full h-[50vh] overflow-hidden">
      <Image
        src={hero.src}
        alt="High-Quality Wholesale RTA Cabinetry"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-2xl max-w-xl md:text-3xl lg:text-4xl uppercase leading-relaxed">
          J&K Cabinetry Cabinet Care & Maintenance
        </h1>
      </div>
    </section>
  );
};

export default CabinetCareHero;
