import Image from "next/image";
import image from "@/assets/gallery/gallery-main.jpg";
const GalleryBanner = () => {
  return (
    <section className="relative w-full h-[35vh] md:h-[55vh] overflow-hidden">
      <Image
        src={image}
        alt="Bathroom & Kitchen Cabinet Designs"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-2xl max-w-xl md:text-3xl lg:text-4xl uppercase leading-relaxed">
          Bathroom & Kitchen Cabinet Designs
        </h1>
      </div>
    </section>
  );
};

export default GalleryBanner;
