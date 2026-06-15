import image from "@/assets/home/whyChoose/jk-image1.png";
import image2 from "@/assets/home/whyChoose/jk-image2.png";
import image3 from "@/assets/home/whyChoose/jk-image3.png";
import image4 from "@/assets/home/whyChoose/jk-image4.png";
import image5 from "@/assets/home/whyChoose/jk-image5.png";
import image6 from "@/assets/home/whyChoose/jk-image6.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HomeFeatures = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 bg-[#FFFFFF] space-y-16 md:space-y-20">
      {/* Part 1: High-Quality Wholesale RTA Cabinetry */}
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-center text-xl font-semibold md:text-2xl leading-tight text-gray-700 mb-16">
            HIGH-QUALITY WHOLESALE RTA CABINETRY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-stretch">
            <div className="text-center flex flex-col items-center justify-between space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg mx-auto">
                J&K Kitchen Cabinets are{" "}
                <strong>affordable, durable, and easy to assemble</strong>. As a
                result, they’re perfect for contractors and DIY enthusiasts who
                want to create stylish kitchens while staying on budget.
              </p>
              <Button className="mt-auto px-10 h-14 rounded text-base border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto">
                View J&K Kitchen Cabinets
              </Button>
            </div>

            <div className="text-center flex flex-col items-center justify-between space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg mx-auto">
                J&K Bathroom Cabinets are <strong>stylish and durable</strong>.
                In addition, they’re made with high-quality materials, ensuring
                long-lasting performance for any bathroom space.
              </p>
              <Button className="mt-auto px-10 h-14 text-base rounded border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer w-full sm:w-auto">
                View J&K Bathroom Cabinets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Why Choose J&K Cabinetry (6 Features) */}
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-center text-xl md:text-2xl leading-tight text-gray-900 mb-16">
            WHY CHOOSE J&K CABINETRY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  HIGH QUALITY SOLID WOOD CABINETRY
                </h3>
              </div>
              <p className="text-gray-600">
                All of our cabinets are crafted from 100% Birchwood and Plywood.
                No MDF, HDF, Particle Boards used.
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image2} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  5-7 Day Average Lead Time on All Orders
                </h3>
              </div>
              <p className="text-gray-600">
                One of the most consistent and reliable lead times in the
                industry.
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image3} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  18 different colors & Finishes Available
                </h3>
              </div>
              <p className="text-gray-600">
                One of the largest RTA cabinet collections in the nation with
                nearly 500 individual SKUs PER Color.
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image4} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  Premium Features Come Standard on All j&k rta Cabinets
                </h3>
              </div>
              <p className="text-gray-600">
                All of our J and K cabinets come with soft-close, full-extension
                drawers with concealed undermount, dovetail construction, and
                more.
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image5} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  Semi-Customizable
                </h3>
              </div>
              <p className="text-gray-600">
                Due to our large collection, we are able to offer
                semi-customizable options to fit even the most unique types of
                projects.
              </p>
            </div>
            <div className="text-left space-y-4">
              <div className="w-full flex items-center  gap-4 ">
                <Image src={image6} alt="image" width={55} height={55} />
                <h3 className="text-lg md:text-xl font-bold">
                  Over 300,000+ Sq Ft of Combined Warehouse Space
                </h3>
              </div>
              <p className="text-gray-600">
                We have a large supply of in-stock inventory throughout each of
                our four locations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8  text-center">
          <h2 className="text-center text-xl md:text-2xl leading-tight text-primary mb-16">
            WE SHIP NATIONWIDE!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            Are you searching for wholesale cabinets in your area? If so, we
            offer
            <strong> nationwide shipping throughout the United States</strong>.
            Therefore, you’ll receive your orders no matter where you are.
          </p>
          <Link href="/services">
            <Button className="w-full md:w-auto px-4 h-14 text-base border-2 rounded border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer ">
              Learn More About J&K Cabinet
            </Button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default HomeFeatures;
