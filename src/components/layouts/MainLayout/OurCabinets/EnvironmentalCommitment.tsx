"use client";
import React from "react";
const EnvironmentalCommitment: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 py-16">
      <div className="w-full max-w-7xl mx-auto ">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
          ENVIRONMENTAL COMMITMENT
        </h1>

        {/* Introductory Paragraph */}
        <p className="text-lg max-w-4xl mx-auto text-center mb-16 leading-relaxed">
          At J&amp;K Cabinetry, we recognize that a thriving environment is
          essential for the well-being of our customers and society at large.
          Alongside our ongoing endeavors to enhance product quality and value,
          we are dedicated to delivering eco-friendly and health-conscious
          products.
        </p>

        {/* Logos and Sections Container */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-16 max-w-6xl w-full">
          {/* Left Section: AkzoNobel */}
          <div className="flex flex-col items-center text-center md:w-1/2">
            {/* Logo Placeholder */}
            <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center mb-8 shadow-lg">
              <span className="text-3xl font-bold text-blue-600">
                AkzoNobel
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-xl md:text-xl font-semibold mb-6 uppercase">
              AkzoNobel Lead Free Paint
            </h2>

            {/* Description */}
            <p className="text-base leading-relaxed">
              J&amp;K Cabinets use AkzoNobel—a leading global company in
              sustainable lead-free paints, stains and coatings for cabinet
              finishes. The presence of lead paint in cabinetry is a significant
              concern due to the potential health hazards it poses, particularly
              to young children, as lead exposure can lead to developmental
              delays, learning disabilities, and various neurological issues.
            </p>
          </div>

          {/* Right Section: CARB2 */}
          <div className="flex flex-col items-center text-center md:w-1/2">
            {/* Logo Placeholder */}
            <div className="w-48 h-48 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center mb-8 shadow-lg overflow-hidden">
              <div className="text-center">
                <span className="text-4xl font-bold text-white">CARB</span>
                <sub className="text-2xl text-white">2</sub>
                <br />
                <span className="text-xl font-semibold text-white">
                  COMPLIANT
                </span>
              </div>
            </div>

            {/* Section Title */}
            <h2 className="text-xl md:text-xl font-semibold mb-6 uppercase">
              CARB2 Compliant
            </h2>

            {/* Description */}
            <p className="text-base leading-relaxed">
              The CARB2 certification process reduces formaldehyde emissions and
              protects against airborne toxins. It applies to almost all
              composite wood products, including cabinets, countertops, doors,
              furniture, and more. It&apos;s important for clients to only
              purchase CARB2 compliant cabinets to ensure safety and reduce
              exposure to harmful chemicals. All of our cabinets meet this
              standard!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalCommitment;
