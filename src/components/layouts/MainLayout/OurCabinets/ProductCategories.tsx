import { Button } from "@/components/ui/button";
import banner from "@/assets/common/banner.png";
const ProductCategories = () => (
  <section
    className="w-full px-3 md:px-5 py-16 md:py-20"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 border-t border-b border-gray-300 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-10 md:mb-14 text-gray-900">
        High-Quality WHOLESALE RTA Cabinetry
      </h1>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-center mb-16 md:mb-20">
          <div className="flex flex-col items-center justify-between gap-4 md:gap-6">
            <h3 className="text-2xl font-bold text-primary underline decoration-primary/50">
              RTA KITCHEN CABINETS
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-lg mx-auto">
              Our ready-to-assemble kitchen cabinets have strong doors and
              drawers. They are made for contractors and DIY fans working on
              multiple projects. Our RTA cabinets are affordable and simple to
              install. They are ideal for designing attractive kitchens without
              spending a lot of money.
            </p>
            <Button className="w-full md:w-auto bg-primary rounded text-white px-5 py-6 text-sm  md:text-base">
              I&apos;M INTERESTED IN J&K KITCHEN CABINETS!
            </Button>
          </div>

          {/* Bathroom */}
          <div className=" flex flex-col items-center justify-between gap-4 md:gap-6">
            <h3 className="text-2xl font-bold text-primary underline decoration-primary/50">
              RTA BATHROOM CABINETS
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-lg mx-auto">
              Our bathroom cabinets offer a stylish and functional solution for
              your bathroom space. Crafted with the same high-quality materials
              and construction as our kitchen cabinets, these top-quality
              cabinets provide durability and long-lasting performance.
            </p>
            <Button className="w-full md:w-auto rounded bg-primary text-white px-5 py-6 text-sm  md:text-base">
              I&apos;M INTERESTED IN J&K BATHROOM CABINETS!
            </Button>
          </div>
        </div>
        <div className=" w-full space-y-8">
          <h2 className="text-3xl md:text-4xl f uppercase leading-tight">
            What Makes Our Cabinets Different
            <br />
            Than The Others?
          </h2>
          <p className="text-sm md:text-base text-gray-900 italic font-semibold">
            Enjoy the benefits of low-cost, quality cabinets that are easy to
            install and backed by top-notch customer service.
          </p>
          <p className="text-gray-900 max-w-4xl mx-auto leading-relaxed">
            At J&K Cabinetry, we offer one of the most extensive solid wood RTA
            cabinetry collection in the nation! With over 15+ different colors,
            500+ unique SKUs per color, and semi-customizable options we have
            the ability to fulfill nearly every type of project that we come
            across.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ProductCategories;
