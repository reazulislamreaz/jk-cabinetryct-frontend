import aboutBg from "@/assets/home/about/jk-bg.png";

const ThreeStepProcess = () => {
  const steps = [
    {
      num: "01",
      title: "INTRODUCTION",
      desc: "Explore our collection of different colors and finishes. In addition, talk with our team to understand what makes J&K Cabinets unique...",
    },
    {
      num: "02",
      title: "DESIGN, QUOTE, & ORDERING",
      desc: "Explore our collection of different colors and finishes. Moreover, talk with our team to discover what makes J&K Cabinets unique...",
    },
    {
      num: "03",
      title: "ASSEMBLY & DELIVERY",
      desc: "Explore our wide selection of colors and finishes. In addition, speak with our team to learn what makes J&K Cabinets truly unique...",
    },
  ];

  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 "
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-center text-xl md:text-2xl font-semibold leading-tight text-gray-900 mb-16">
          EXPLORE OUR J&K CABINET COLLECTIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-6xl md:text-7xl font-bold bg-white text-gray-100 hover:text-primary transition-colors duration-300 mb-4 md:mb-6 select-none">
                {step.num}
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs md:max-w-none">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
