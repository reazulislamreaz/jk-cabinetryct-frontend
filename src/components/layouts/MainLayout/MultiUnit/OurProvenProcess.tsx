

const OurProvenProcess = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl uppercase mb-16">
          Our Proven Process
        </h2>

        <div className="flex flex-col justify-start gap-5 md:gap-8">
          {[
            {
              step: "STEP #1",
              title: "Discuss your project with our team",
              desc: "After submitting your details in the form below -our team will contact you shortly afterwards to discuss the scope of your project, the timelines, and see if J&K Cabinetry will be the right fit for your job.",
            },
            {
              step: "STEP #2",
              title: "Designed By A Pro",
              desc: "After receiving the project details, blueprint designs, and other important information – our team will draft a layout design and build an estimate for your team to review.",
            },
            {
              step: "STEP #3",
              title: "Bidding & Ordering Process",
              desc: "J&K Cabinetry can be competitive against lower quality RTA cabinetry providers and higher end custom cabinetry builders. Not only in terms of cabinet quality in all facets of the process (lead time, pricing, and much more.)",
            },
            {
              step: "STEP #4",
              title: "Installation (Optional)",
              desc: "For special and larger projects – our team has the capabilities of providing the cabinetry installation if it is needed. Our team will professionally assemble all the cabinetry, fulfill the delivery, and complete the cabinet installation.",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="text-base md:text-lg">{item.step}</div>
              <h3 className="text-lg md:text-xl">{item.title}</h3>
              <p className="text-sm  text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProvenProcess;
