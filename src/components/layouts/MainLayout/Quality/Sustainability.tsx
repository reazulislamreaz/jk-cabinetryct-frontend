"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Droplets,
    Leaf,
    Package,
    Recycle,
    Sun,
    TreePine,
} from "lucide-react";

const Sustainability = () => {
  const initiatives = [
    {
      icon: TreePine,
      title: "Sustainable Forestry",
      description:
        "We source 100% of our wood from FSC-certified sustainable forests, ensuring responsible forest management and preservation.",
      stat: "100%",
      statLabel: "Sustainable Wood",
    },
    {
      icon: Recycle,
      title: "Waste Reduction",
      description:
        "Our zero-waste manufacturing process recycles or repurposes 95% of production waste into useful materials.",
      stat: "95%",
      statLabel: "Waste Recycled",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description:
        "Advanced water recycling systems reduce our water consumption by 80% compared to traditional manufacturing.",
      stat: "80%",
      statLabel: "Water Saved",
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      description:
        "Our facilities are powered by 60% renewable energy sources, with a goal of 100% by 2026.",
      stat: "60%",
      statLabel: "Renewable Power",
    },
    {
      icon: Package,
      title: "Eco-Friendly Packaging",
      description:
        "All packaging materials are recyclable, biodegradable, or made from recycled content.",
      stat: "100%",
      statLabel: "Green Packaging",
    },
    {
      icon: Leaf,
      title: "Low-VOC Finishes",
      description:
        "We exclusively use low-VOC, water-based finishes that are safer for your family and the environment.",
      stat: "0%",
      statLabel: "Harmful Emissions",
    },
  ];

  const certifications = [
    {
      name: "FSC Certified",
      description: "Forest Stewardship Council certification for sustainable wood sourcing",
    },
    {
      name: "GREENGUARD Gold",
      description: "Certified for low chemical emissions for indoor air quality",
    },
    {
      name: "CARB Compliant",
      description: "California Air Resources Board Phase 2 compliant",
    },
    {
      name: "ISO 14001",
      description: "Environmental management system certification",
    },
  ];

  const commitments = [
    "Carbon-neutral manufacturing by 2028",
    "Zero landfill waste by 2026",
    "100% renewable energy by 2026",
    "Sustainable packaging innovations",
    "Local sourcing to reduce transportation emissions",
    "Continuous environmental impact reduction",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sustainability
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Building beautiful cabinets shouldn't cost the earth. We're
            committed to sustainable practices that protect our planet for
            future generations.
          </p>
        </div>

        {/* Sustainability Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {initiative.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {initiative.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {initiative.statLabel}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Environmental Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="border-gray-200 text-center hover:border-green-500 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Commitments */}
        <Card className="border-gray-200 mb-16">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-2xl text-foreground">
              Our Future Commitments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commitments.map((commitment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-foreground">{commitment}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Join Us in Making a Difference
          </h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Every cabinet you purchase supports sustainable forestry practices
            and helps reduce environmental impact. Together, we can create
            beautiful spaces while protecting our planet.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
            Learn More About Our Practices
          </button>
        </div>
      </div>
    </div>
  );
};

const Award = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export default Sustainability;
