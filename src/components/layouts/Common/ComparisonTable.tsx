import { CheckCircle, X } from "lucide-react";
import React from "react";

const ComparisonTable = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden border border-gray-200 px-5 my-6 md:my-8 p-5">
      <div className="p-5 text-center">
        <h3 className="text-xl md:text-2xl uppercase">
          Why Choose J&K Cabinetry Over Other Cabinet Lines?
        </h3>
        <p className="text-sm md:text-base mt-4 max-w-4xl mx-auto px-6">
          We believe we are the perfect middle ground for homeowners that want
          to make a solid investment in quality cabinetry that will stand the
          test of time without breaking the bank like a full custom build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {/* Other RTA Brands */}
        <div className="w-full p-5 space-y-6">
          <h4 className="text-2xl font-bold text-red-600">Other RTA Brands</h4>
          <hr className="border-gray-300" />
          {[
            "Use cheap materials like MDF, HDF, or Particle Boards",
            "Long lead times — it's typical to wait up to 8-12 weeks to get your order",
            "Limited color options",
            "Premium features cost extra or are non-existent",
            "Limited options when it comes to cabinets and sizes",
            "No custom options on trim and trim or very expensive full custom line",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 text-gray-700">
              <X className="text-3xl text-red-600 mt-1" />
              <p className="text-left leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* J&K Cabinetry */}
        <div className="w-full p-5 space-y-6">
          <h4 className="text-2xl font-bold text-primary">J&K Cabinetry</h4>
          <hr className="border-gray-300" />
          {[
            "We only use Solid Birchwood or Plywood. It's the highest quality materials used in cabinetry",
            "On average we fulfill every order within 5–7 business days. Fastest lead time in the industry",
            "15+ color options in multiple design styles. Find your perfect match",
            "Premium features like soft close doors & full extension drawers come standard across all our cabinets. No additional cost",
            "One of the largest cabinetry lines in the country with sizes in nearly every 3”",
            "Semi-custom options without the expensive price tag of a full custom line",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 text-gray-700">
              <CheckCircle className="text-3xl mt-1 text-green-500 shrink-0" />
              <p className="text-left leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
