import aboutImage from "@/assets/home/about/jk-about.jpg";
import aboutBg from "@/assets/home/about/jk-bg.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <Image
              src={aboutImage}
              alt="J&K Cabinetry Showroom - Premium Kitchen Display"
              width={900}
              height={900}
              className="w-full h-auto object-cover rounded "
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            {/* Section Tag */}
            <p className="text-xs md:text-sm tracking-wider text-primary uppercase font-bold">
              About Us
            </p>

            {/* Main Heading */}
            <h2 className="text-xl md:text-2xl text-[#4B4B4B] leading-relaxed">
              TRUSTED WHOLESALE PARTNER FOR ALL QUALITY KITCHEN & BATHROOM
              PROJECTS
            </h2>

            {/* Paragraphs */}
            <div className="space-y-6 text-gray-900 text-base md:text-base leading-relaxed">
              <p>
                <span className="font-semibold">
                  Our 100% solid wood cabinets offer an affordable solution for
                  builders and contractors. Moreover
                </span>
                , they help enhance the value of any project while keeping costs
                low.
              </p>

              <p>
                <span className="font-semibold"> In addition,</span> we offer
                one of the{" "}
                <strong>largest cabinetry catalogs in the nation</strong>—with
                over
                <strong> 18 colors</strong> and nearly <strong>500 SKUs</strong>{" "}
                available for each individual color!
              </p>

              <p>
                In addition to our cabinets, we offer an{" "}
                <strong>unmatched lead time</strong> on all orders and an
                operational process that will make all of your future jobs much
                more efficient.
              </p>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center pt-8">
          <Link href="/about-jk" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-10 h-14 cursor-pointer font-semibold border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
            >
              Learn More J&K Cabinetry
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
