
import { Button } from "@/components/ui/button";
import image from "@/assets/homeowner/homeowner-about.png";
import image2 from "@/assets/homeowner/homeowner-gallery.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HomeownerResources = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-center text-2xl md:text-3xl uppercase mb-16">
        Additional Resources
      </h2>

      <div className="w-full space-y-3 md:space-y-5">
        <div className="w-full border border-gray-200 p-3 flex flex-col md:flex-row gap-5">
          <Image
            src={image.src}
            alt="High-Quality Wholesale RTA Cabinetry"
            width={400}
            height={300}
            className="object-cover"
          />
          <div className="w-full flex flex-col gap-4 justify-between">
            <h1 className="text-lg md:text-xl">
              Learn More About J&K Cabinetry
            </h1>
            <p>
              Explore the rest of our website to learn more about how J&K
              Cabinetry can potentially fulfill your cabinetry needs! Start with
              our “About Us” page.
            </p>
            <Button className="w-fit px-5 h-10 cursor-pointer">
              Learn More Today <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="w-full border border-gray-200 p-3 flex flex-col md:flex-row gap-5">
          <Image
            src={image2.src}
            alt="High-Quality Wholesale RTA Cabinetry"
            width={400}
            height={300}
            className="object-cover"
          />
          <div className="w-full flex flex-col gap-4 justify-between">
            <h1 className="text-lg md:text-xl">View Our Gallery</h1>
            <p>
              Visit our Gallery page full of completed projects in every color
              option that we have! Your future kitchen design may be a few steps
              away from becoming a reality.
            </p>
            <Button className="w-fit px-5 h-10 cursor-pointer">
              Find Inspiration <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HomeownerResources;
