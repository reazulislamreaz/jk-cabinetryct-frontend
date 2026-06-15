import React from "react";

const HomeownerThreeStep = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl uppercase mb-16">
          Our 3 Step Process For Home Owners
        </h2>

        <div className="flex flex-col justify-start gap-5 md:gap-8">
          {[
            {
              step: "STEP #1",
              title: "FIND YOUR PERFECT CABINETS",
              desc: "Browse our collections and find the perfect cabinets that match your design vision, budget, and timeline. We offer the widest selection of premium RTA cabinets with fast delivery.",
            },
            {
              step: "STEP #2",
              title: "PLACE YOUR ORDER BY A PRO",
              desc: "Buy directly from our website or connect with one of our expert team members to place your order. We provide professional guidance and dedicated support from start to finish.",
            },
            {
              step: "STEP #3",
              title: "DELIVERED. INSTALLED. ENJOY!",
              desc: "We ship directly to your home. Our cabinets are easy to assemble and install. Enjoy your beautiful new kitchen or bathroom — on time and on budget.",
            },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="text-base md:text-lg">{item.step}</div>
              <h3 className="text-lg md:text-xl">{item.title}</h3>
              <p className="text-sm  text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeownerThreeStep;
