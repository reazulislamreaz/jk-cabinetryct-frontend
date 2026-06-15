"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Droplet,
    Layers,
    Lock,
    Maximize,
    Settings,
    Sparkles,
} from "lucide-react";

const StandardFeatures = () => {
  const features = [
    {
      icon: Settings,
      title: "Soft-Close Hinges",
      description:
        "All cabinets come equipped with premium soft-close hinges that ensure smooth, quiet operation and extended hardware life.",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Layers,
      title: "Adjustable Shelving",
      description:
        "Fully adjustable interior shelves allow you to customize storage space to fit your specific needs.",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Lock,
      title: "Dovetail Drawers",
      description:
        "Solid wood dovetail drawer construction provides superior strength and durability for years of reliable use.",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Maximize,
      title: "Full Extension Slides",
      description:
        "Premium full-extension drawer slides offer complete access to drawer contents with smooth, effortless gliding.",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: Droplet,
      title: "Water-Resistant Finish",
      description:
        "Multi-layer protective finish resists moisture, stains, and daily wear while maintaining beauty.",
      color: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: Sparkles,
      title: "Easy-Clean Surface",
      description:
        "Specially treated surfaces resist fingerprints and make cleaning simple with just a damp cloth.",
      color: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  const additionalFeatures = [
    "Concealed European hinges for clean appearance",
    "Reinforced cabinet boxes for added strength",
    "Pre-drilled shelf pin holes for easy adjustment",
    "Cam lock assembly system for secure installation",
    "Integrated drawer dampers for quiet closing",
    "Adjustable legs for precise leveling",
    "Wire management cutouts in back panels",
    "Premium hardware mounting plates",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Standard Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every cabinet is built with premium features as standard, not as
            upgrades. Quality craftsmanship and attention to detail come
            standard with every order.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <Card className="border-gray-200 mb-16">
          <CardHeader className="bg-secondary/20">
            <CardTitle className="text-2xl text-foreground">
              Additional Standard Features
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Promise */}
        <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Our Quality Promise</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6">
            We believe premium features should be standard, not optional. Every
            cabinet leaving our facility meets the highest standards of quality
            and craftsmanship.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Quality Inspected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">25+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">50K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardFeatures;
