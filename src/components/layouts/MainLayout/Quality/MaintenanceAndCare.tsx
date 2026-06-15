"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Wrench } from "lucide-react";

const MaintenanceAndCare = () => {
  const maintenanceTips = [
    {
      icon: Wrench,
      title: "Daily Cleaning",
      description:
        "Wipe down surfaces with a soft, damp cloth and mild soap. Avoid abrasive cleaners that can damage the finish.",
    },
    {
      icon: Shield,
      title: "Protective Care",
      description:
        "Use cutting boards and trivets to protect surfaces from scratches and heat damage. Clean spills immediately.",
    },
    {
      icon: Clock,
      title: "Regular Maintenance",
      description:
        "Check and tighten hardware quarterly. Inspect hinges and drawer slides for smooth operation.",
    },
    {
      icon: CheckCircle,
      title: "Professional Service",
      description:
        "Schedule annual professional inspections to maintain warranty coverage and ensure longevity.",
    },
  ];

  const doAndDont = {
    dos: [
      "Clean with soft, damp cloth",
      "Use mild soap or cabinet cleaner",
      "Dry immediately after cleaning",
      "Maintain consistent humidity levels",
      "Use proper mounting hardware",
    ],
    donts: [
      "Never use abrasive cleaners",
      "Avoid excessive water exposure",
      "Don't use ammonia-based products",
      "Avoid placing near heat sources",
      "Don't slam doors or drawers",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Maintenance & Care
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Proper care ensures your cabinets maintain their beauty and
            functionality for years to come. Follow our expert guidelines for
            optimal maintenance.
          </p>
        </div>

        {/* Maintenance Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {maintenanceTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Do's */}
          <Card className="border-gray-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Do's
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {doAndDont.dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Don'ts */}
          <Card className="border-gray-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Don'ts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {doAndDont.donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-red-600 flex items-center justify-center mt-0.5 shrink-0">
                      <span className="text-red-600 text-xs font-bold">✕</span>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Warranty Information */}
        <Card className="border-gray-200 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Warranty Coverage
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Following our maintenance guidelines helps maintain your warranty
                coverage. Contact our support team for warranty registration and
                service requests.
              </p>
              <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceAndCare;
