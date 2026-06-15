
import Image from "next/image";
import Link from "next/link";
import cabinetSpace from "@/assets/cabinet-space/cabinet-space.jpg";

const CabinetSpecs = () => {
  return (
    <div className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-primary mb-10 tracking-tight">
          J&K Cabinetry Specs
        </h1>

        {/* Beautiful Unsplash Kitchen Image */}
        <div className="w-full max-w-5xl mx-auto relative rounded-2xl overflow-hidden mb-12">
          <Image
            src={cabinetSpace?.src}
            alt="Luxury J&K Cabinetry Kitchen"
            width={500}
            height={500}
            priority
            className="w-full h-[500px]"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-500"></div>
        </div>

        {/* Note */}
        <p className="text-gray-600 italic text-sm md:text-base mb-10 max-w-3xl mx-auto">
          (Note: Not all items are listed, only in-stock items at our current
          warehouse)
        </p>

        {/* Georgia Spec Sheet Text */}
        <p className="text-sm md:text-lg mb-10">Georgia Spec Sheet Below</p>

        {/* Action Buttons */}
        <Link
          href="https://drive.google.com/file/d/1NIEcne4Zh0Q4qtBQre5sprtw397cClxG/view?usp=share_link"
          target="_blank"
          className="px-8 md:py-3  border-2 border-primary mb-5"
        >
          View/Download
        </Link>

        {/* Bottom Note */}
        <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed mt-8">
          Items not listed can still be ordered but are not available
          immediately. Please check with your location and sales representative.
        </p>
      </div>
    </div>
  );
};

export default CabinetSpecs;
