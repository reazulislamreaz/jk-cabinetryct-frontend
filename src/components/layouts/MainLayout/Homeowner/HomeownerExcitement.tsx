import { CheckIcon } from "lucide-react";
import ComparisonTable from "../../Common/ComparisonTable";
const HomeownerExcitement = () => (
  <section className="w-full px-3 md:px-5 py-5 md:py-8">
    <div className="max-w-7xl mx-auto px-6 ">
      {/* Main Heading */}
      <h2 className="text-2xl md:text-3xl uppercase leading-relaxed  mb-6 text-center">
        High Quality Cabinetry That
        <br />
        <span className="text-gray-800 leading-relaxed">
          Homeowners Can Be Excited About
        </span>
      </h2>
      {/* Intro Text */}
      <div className="max-w-4xl mx-auto mb-12 text-gray-700 leading-relaxed space-y-4">
        <p>
          At J&K Cabinetry we focus only on one thing — creating the best
          Ready-To-Assemble Cabinetry on the market. As a wholesaler our company
          focuses on the only sell directly to businesses like Home Builders,
          Contractors, and Remodelers.
        </p>
        <p>
          But even if you do not fall in that description we would love to still
          work with you!
        </p>
        <p className="font-semibold">
          For Homeowners Interested in J&K Cabinets — Let Our Team:
        </p>
        <ul className="text-left  space-y-2 mt-6">
          {[
            "Help You Narrow Down Your Choices When It Comes To Color And Style",
            "Give You A FREE Professional Designer Kitchen Or Bathroom Layout",
            "Refer You To One Of Our Trusted Local Retailers That Carry Our Cabinets In Order To Bring Your Vision To Life",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <ComparisonTable />
    </div>
  </section>
);

export default HomeownerExcitement;
