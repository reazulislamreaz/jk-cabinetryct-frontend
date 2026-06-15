import banner from "@/assets/common/banner.png";
const AdditionalServices = () => (
  <section
    className="w-full pt-5 md:pt-8 pb-10 md:pb-16"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase text-gray-800 mb-12">
        J&K Cabinetry Additional Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {/* $15 Assembly */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">
            $15 Cabinet Assembly Fee
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Our warehouse team will assemble ANY J and K cabinet regardless of
            size or the order quantity for $15 each!
          </p>
        </div>

        {/* $75 Semi-Custom */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">
            $75 Semi-Custom Modification Fee
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Due to our large collection of SKUs and sizes – we are able to make
            semi-customizations to our cabinets at our warehouses.
          </p>
        </div>

        {/* Layout Design */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">
            Bathroom & Kitchen Cabinet Layout Design
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Need help with completing designs? Let our professional design team
            do your kitchen or bathroom layout designs for you. Talk to our team
            to learn more about our process!
          </p>
        </div>

        {/* Claims & Returns */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-primary">
            Flexible Claims and Return Process
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We understand that accidents may occur during the ordering or
            delivery process so we make our claim process as efficient and
            hassle-free for your team as much as possible.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AdditionalServices;
