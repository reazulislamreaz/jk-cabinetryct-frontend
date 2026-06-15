import banner from "@/assets/common/banner.png";
const Gallery = () => (
  <section
    className="py-12 md:py-20 bg-gray-50"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-gray-600 text-sm md:text-base mb-2">
        Explore our collection of beautifully designed kitchens and bathrooms
        courtesy of our amazing clients.
      </p>
      <p className="text-primary font-semibold text-lg mb-12">
        Click on your favorite color below to view each collection!
      </p>
    </div>
  </section>
);

export default Gallery;
