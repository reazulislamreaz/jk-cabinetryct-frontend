import Image from "next/image";
import banner from "@/assets/common/banner.png";
import cabinet from "@/assets/our-cabinet/cabinet.jpg";
import cabinet2 from "@/assets/our-cabinet/cabinet2.jpg";
const BuiltToLast = () => (
  <section
    className="w-full px-3 md:px-5 py-5 md:py-8"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <Image
        src={cabinet.src}
        alt="Designed to Impress"
        width={700}
        height={400}
        className="w-full"
      />
      <div>
        <h3 className="text-3xl md:text-3xl font-semibold text-center uppercase mb-4">
          Designed to Impress. <br /> Built to Last.
        </h3>
        <p className="text-gray-700 leading-relaxed">
          All of J&K CABINETRY cabinets are built with solid birch wood and
          plywood only. We absolutely do not use any MDF, HDF, Particle boards
          or other cheap materials in any part of the construction...
        </p>
      </div>
      <div>
        <h3 className="text-3xl md:text-3xl font-semibold text-center uppercase mb-4">
          Quality Over Everything.
        </h3>
        <p className="text-gray-700 leading-relaxed">
          From every step of the manufacturing process starting from sourcing
          the wood to packaging of the cabinet pieces into the box – J&K
          Cabinetry makes sure that quality is the most important focus. Our
          cabinets are the best example of “more than meets the eye.” Not only
          can you physically tell our wood construction is superior to others in
          the market; our cabinets line up exactly how they should be out of the
          box which is rare in this industry.
        </p>
      </div>
      <Image
        src={cabinet2.src}
        alt="Quality Over Everything"
        width={700}
        height={400}
      />
    </div>
  </section>
);

export default BuiltToLast;
