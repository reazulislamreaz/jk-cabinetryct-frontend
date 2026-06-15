import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import banner from "@/assets/common/banner.png";
import catalog from "@/assets/catalog/catalog.png";
import catalog2 from "@/assets/catalog/catalog2.jpg";
const Catalog = () => (
  <section
    className="py-16 md:py-24 bg-gray-50"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-5xl mx-auto px-6">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-gray-800 tracking-wider">
          J and K Cabinetry Catalog
        </h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Discover affordable luxury with J&K Cabinetry. Experience the beauty
          and functionality of our high-quality solid wood cabinets.
        </p>
      </div>

      <div className="bg-white rounded-lg  overflow-hidden border border-gray-200 mb-5 flex flex-col md:flex-row gap-5 ">
        <div className="p-8 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            J&K Cabinetry Catalog
            <span className="text-sm font-normal text-gray-500">2024</span>
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Explore the latest trends and find your perfect kitchen or bathroom
            design.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Product Showcase:</strong> Highlight the variety of
              kitchen and bathroom cabinetry options available. Includes all
              available SKUs, sizes, and more.
            </div>
            <div>
              <strong>Design Inspiration:</strong> Showcase beautiful kitchen
              and bathroom designs featuring J&K Cabinetry products.
            </div>
          </div>

          <Link
            href="https://drive.google.com/file/d/1b0E44vqohxg60nlZM0P0sOnX_4RvVnu4/view?usp=sharing"
            target="_blank"
          >
            <Button className="bg-primary cursor-pointer text-white px-8 py-6 text-lg rounded-md">
              View Catalog
            </Button>
          </Link>
        </div>

        {/* Catalog Preview Image */}
        <Image
          src={catalog}
          alt="J&K Cabinetry 2024 Catalog"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="bg-white rounded-lg  overflow-hidden border border-gray-200 mb-5 flex flex-col md:flex-row gap-5 ">
        <div className="p-8 md:p-10 space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Overview Brochure
          </h3>

          <p className="text-gray-600 italic">
            Our 2-Page Overview PDF is Your Essential Company Resource.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Share with Colleagues:</strong> Introduce your team to our
              company’s mission, values, and offerings.
            </div>
            <div>
              <strong>Impress Potential Clients:</strong> Showcase our expertise
              and commitment to quality with sleek visuals.
            </div>
            <div>
              <strong>Highlight Key Features:</strong> Learn about our unique
              products, services, and solutions.
            </div>
            <div>
              <strong>Company Overview:</strong> Our history, mission, and
              vision.
            </div>
            <div>
              <strong>Product and Service Highlights:</strong> A snapshot of
              what we offer.
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Contact Information: Easily connect with our team.
          </p>

          <Link
            href="https://drive.google.com/file/d/1b0E44vqohxg60nlZM0P0sOnX_4RvVnu4/view?usp=sharing"
            target="_blank"
          >
            <Button className="bg-primary cursor-pointer text-white px-8 py-6 text-lg rounded-md">
              View Catalog
            </Button>
          </Link>
        </div>
        <div className="w-full ">
          <Image
            src={catalog2}
            alt="World Class Wholesale Cabinetry"
            width={500}
            height={200}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Catalog;
