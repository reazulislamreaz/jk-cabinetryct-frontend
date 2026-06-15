import image from "@/assets/our-cabinet/our-cabinetry-main.jpg";
import Image from "next/image";

const OurCabinetsHeroBanner = () => (
  <section className="relative w-full h-[35vh] md:h-[55vh] overflow-hidden">
    <Image
      src={image.src}
      alt="High-Quality Wholesale RTA Cabinetry"
      fill
      priority
      className="object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent" />
    <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center p-8">
      <h1 className="text-2xl max-w-xl md:text-3xl lg:text-4xl uppercase leading-relaxed">
        buy wholesale cabinets with j&k cabinetry
      </h1>
      <p className="font-semibold text-lg">
        5-7 Average Business Days Lead Time
      </p>
    </div>
  </section>
);

export default OurCabinetsHeroBanner;
