"use client";
import Image from "next/image";
import hero1 from "@/assets/aboutJk/main.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import image from "@/assets/aboutJk/jk-about1.png";
import image2 from "@/assets/aboutJk/jk-about2.png";
import image3 from "@/assets/aboutJk/jk-about3.png";
import value1 from "@/assets/aboutJk/jk-about-v1.png";
import value2 from "@/assets/aboutJk/jk-about-v2.png";
import value3 from "@/assets/aboutJk/jk-about-v3.png";
import value4 from "@/assets/aboutJk/jk-about-v4.png";
import value5 from "@/assets/aboutJk/jk-about-v5.png";
import value6 from "@/assets/aboutJk/jk-about-v6.png";
import value7 from "@/assets/aboutJk/jk-about-v7.png";
import value8 from "@/assets/aboutJk/jk-about-v8.png";
import value9 from "@/assets/aboutJk/jk-about-v9.png";
import value10 from "@/assets/aboutJk/jk-about-v10.png";
import value11 from "@/assets/aboutJk/jk-about-v11.png";
import value12 from "@/assets/aboutJk/jk-about-v12.png";
const AboutJk = () => {
  return (
    <section>
      <section className="relative w-full h-[30vh] md:h-[45vh] lg:h-[50vh] xl:h-[65vh] overflow-hidden">
        <Image
          src={hero1}
          alt="High-Quality Wholesale RTA Cabinetry"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 space-y-6">
          <h1 className="text-xl max-w-xl md:text-3xl lg:text-4xl uppercase leading-relaxed">
            #1 bathroom & kitchen rta <br /> cabinet wholesalers
          </h1>
          <p className="text-base md:text-2xl uppercase">
            j and k cabinetry Connecticut
          </p>
          <p className="text-base font-semibold uppercase ">
            Your Trusted Partner For Quality RTA Cabinets
          </p>
        </div>
      </section>
      <section className="w-full px-5 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* About J&K Cabinetry */}
        <div className="w-full max-w-5xl mx-auto py-8 md:py-12 space-y-3">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold uppercase text-center">
            About J & K Cabinetry
          </h2>
          <p className="text-sm md:text-base">
            J&K Cabinetry was founded in 2003 with a vision to provide
            businesses with affordable, high-quality cabinetry that would
            elevate the value of their projects.
          </p>
          <p className="text-sm md:text-base">
            Since then, we’ve become one of the leading distributors of
            wholesale kitchen and bathroom cabinetry in the United States, with
            distribution centers and showrooms nationwide.
          </p>
          <p className="text-sm md:text-base">
            Our commitment to quality craftsmanship, innovative design, and
            exceptional lead times and operations has made us the go-to source
            for builders and contractors of any size.
          </p>
          <div className="w-full border-2 border-gray-950 p-5 md:p-10 mt-10">
            <h3 className="text-xl md:text-2xl font-semibold text-center pb-2">
              OUR VALUES
            </h3>
            <p className="text-center max-w-xl mx-auto mt-2 text-sm md:text-base">
              J&K Cabinetry is focused on the following 3 values. We maintain
              extremely simple business practices with the singular goal of
              continuously perfecting each of these pillars.
            </p>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5 mt-10">
              <div className="space-y-3">
                <Image
                  src={image}
                  alt="High-Quality Wholesale RTA Cabinetry"
                  width={180}
                  height={180}
                  className="mx-auto rounded"
                />
                <h4 className="text-lg md:text-xl text-wrap text-center">
                  World Class Cabinetry
                </h4>
              </div>
              <div className="space-y-3">
                <Image
                  src={image2}
                  alt="High-Quality Wholesale RTA Cabinetry"
                  width={180}
                  height={180}
                  className="mx-auto"
                />
                <h4 className="text-lg md:text-xl text-wrap text-center">
                  Amazing Service
                </h4>
              </div>
              <div className="space-y-3">
                <Image
                  src={image3}
                  alt="High-Quality Wholesale RTA Cabinetry"
                  width={180}
                  height={180}
                  className="mx-auto"
                />
                <h1 className="text-lg md:text-xl text-wrap text-center">
                  World Class Cabinetry
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* Our value */}
        <div className="w-full max-w-7xl mx-auto py-8 md:py-12 ">
          {/* Value 1 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            <div className="w-full col-span-1 space-y-3 md:space-y-5">
              <h3 className="font-semibold text-primary">Value #1</h3>
              <h4 className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
                World Class Cabinetry
              </h4>
              <p>
                From the sourcing and filtering out of each wooden piece to the
                dozens of steps in between before creating the finished product,
                we strive to create the best cabinetry line possible. Our
                commitment to quality control is unwavering.
              </p>
              <p>
                We employ stringent quality checks throughout the manufacturing
                process, ensuring that every piece of cabinetry meets our high
                standards of excellence. From incoming material inspection to
                final product testing, we leave no stone unturned in our pursuit
                of perfection.
              </p>
              <Link href="/">
                <Button variant="default" className="mt-5 rounded">
                  Learn More About J&K Cabinets
                </Button>
              </Link>
            </div>
            <div className="w-full col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value1} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">Solid Wood Cabinetry</h5>
                <p className="mt-2">
                  All of our cabinets are crafted with premium materials,
                  including solid birch wood and plywood. We never use MDF, HDF,
                  or particle boards in any of our collections. This commitment
                  to quality ensures that our cabinets are not only beautiful
                  but also durable and long-lasting.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value2} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  Premium Features Included
                </h5>
                <p className="mt-2">
                  Every cabinet we offer features premium features, including
                  soft-close hinges, 3/4″ to full-extension drawers, dovetail
                  construction, and concealed undermounts. These features ensure
                  durability, functionality, and a sleek aesthetic.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value3} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  18 Different Colors & Finishes
                </h5>
                <p className="mt-2">
                  Our comprehensive color palette offers a wide range of options
                  to suit various design styles. Whether you prefer the clean
                  lines and neutral tones of contemporary design, the warm and
                  inviting elements of traditional style, or the blend of modern
                  and classic elements in transitional style, we have the
                  perfect color to complement your aesthetic.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value4} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  Nearly 500 Individual SKUs
                </h5>
                <p className="mt-2">
                  With one of the largest cabinetry collections in the country,
                  we offer an unparalleled variety of unique sizes and options
                  that set us apart from other brands. Our extensive SKU
                  offerings allow you to find the perfect cabinet solutions for
                  any project.
                </p>
              </div>
            </div>
          </div>
          {/* Value 2 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            <div className="w-full col-span-1 space-y-3 md:space-y-5">
              <h3 className="font-semibold text-primary">Value #2</h3>
              <h4 className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
                Amazing Service
              </h4>
              <p>
                At JK Cabinetry, we believe that exceptional service is just as
                important as exceptional products. That’s why we offer
                white-glove support from our dedicated account managers. Our
                team is here to assist you every step of the way, from initial
                consultation to delivery.
              </p>

              <Link href="/">
                <Button variant="default" className="w-full  rounded">
                  Learn More About J&K Cabinetry Services
                </Button>
              </Link>
            </div>
            <div className="w-full col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value5} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">Concierge Like Service</h5>
                <p className="mt-2">
                  Our concierge-like service ensures a personalized experience
                  from start to finish. With JK Cabinetry, you’ll benefit from
                  expert guidance, tailored solutions, and seamless project
                  management. Our dedicated team is committed to providing
                  exceptional customer service, making you feel like a VIP
                  throughout the entire process.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value6} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">Free Layout Designs</h5>
                <p className="mt-2">
                  We believe in helping you visualize your dream kitchen or
                  bathroom. That’s why we offer a free layout design service
                  that can help you translate your client’s vision into a
                  reality.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value7} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  $15 Assembly Fee Per Cabinet
                </h5>
                <p className="mt-2">
                  Predictable costs, stress-free installs, maximize margins with
                  J&K’s $15 flat-fee assembly per cabinet.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value8} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  $75 Semi-Customization Fee
                </h5>
                <p className="mt-2">
                  Bespoke beauty at a budget, elevate client satisfaction with
                  J&K’s $75 semi-customization.
                </p>
              </div>
            </div>
          </div>
          {/* Value 3 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="w-full col-span-1 space-y-3 md:space-y-5">
              <h3 className="font-semibold text-primary">Value # 3</h3>
              <h4 className="text-xl md:text-2xl lg:text-3xl leading-relaxed">
                Reliable Fulfillment
              </h4>
              <p>
                Rest assured. From sourcing to finishing touches, we take
                meticulous care of every cabinet, delivering consistent quality
                you can trust in a reliable time frame.
              </p>
            </div>
            <div className="w-full col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value9} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  5-7 Day Average Lead Time
                </h5>
                <p className="mt-2">
                  Get projects moving faster. Experience one of the leading
                  logistics teams with our average lead time of just 5-7 days.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value10} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  Over 300,000+ sq ft of Warehouse Space
                </h5>
                <p className="mt-2">
                  Never be caught off guard. Our expansive warehouse ensures
                  ample stock and seamless fulfillment, even for large orders.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value11} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  Fulfill Large Multi-Unit Complexes
                </h5>
                <p className="mt-2">
                  Conquer any challenge. We have the capacity and expertise to
                  tackle massive projects, delivering beautiful cabinets for
                  entire multi-unit developments.
                </p>
              </div>
              <div className="w-full p-5 md:p-8 space-y-3 md:space-y-4 border border-gray-650">
                <Image src={value12} alt="value" width={60} height={60} />
                <h5 className="text-xl md:text-2xl">
                  Local Shipping Incentives
                </h5>
                <p className="mt-2">
                  Save more, smile wider! Enjoy cost-effective delivery options
                  depending on your order size and location. Talk with your
                  local J&K dealer to learn more. Keep your projects profitable
                  and competitive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutJk;
