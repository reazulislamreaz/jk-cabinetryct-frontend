"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Hammer, Heart, Lightbulb, Target, Users } from "lucide-react";

const Craftsmanship = () => {
  const craftsmanshipValues = [
    {
      icon: Hammer,
      title: "Masterful Techniques",
      description:
        "Our skilled artisans employ time-honored woodworking techniques combined with modern precision to create cabinets of exceptional quality.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Each team member brings decades of experience in fine woodworking, ensuring every cabinet meets our exacting standards.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "Multiple quality checkpoints throughout production guarantee that only the finest cabinets reach your home.",
    },
    {
      icon: Target,
      title: "Attention to Detail",
      description:
        "From grain matching to finish application, we obsess over every detail to deliver perfection.",
    },
    {
      icon: Heart,
      title: "Pride in Work",
      description:
        "We take personal pride in every cabinet we build, treating each project as if it were for our own home.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously refine our methods and incorporate new technologies while respecting traditional craftsmanship.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Material Selection",
      description:
        "We handpick premium hardwoods and materials, ensuring only the finest quality enters our workshop.",
    },
    {
      step: "02",
      title: "Precision Cutting",
      description:
        "Computer-aided machinery works alongside skilled craftsmen to achieve perfect dimensions every time.",
    },
    {
      step: "03",
      title: "Assembly & Joinery",
      description:
        "Traditional joinery methods create strong, lasting bonds that will endure for generations.",
    },
    {
      step: "04",
      title: "Finishing Process",
      description:
        "Multiple coats of premium finish are hand-applied and carefully sanded between each application.",
    },
    {
      step: "05",
      title: "Quality Inspection",
      description:
        "Every cabinet undergoes rigorous inspection to ensure it meets our uncompromising standards.",
    },
    {
      step: "06",
      title: "Final Packaging",
      description:
        "Careful packaging protects your investment during transit, ensuring pristine condition upon delivery.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Craftsmanship
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Where traditional artistry meets modern precision. Our commitment to
            excellence is evident in every cabinet we create.
          </p>
        </div>

        {/* Craftsmanship Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {craftsmanshipValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Crafting Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <Card
                key={index}
                className="border-gray-200 relative overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem]" />
                <CardHeader>
                  <div className="text-5xl font-bold text-primary/20 mb-2">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <Card className="border-gray-200 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <CardContent className="py-12">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Our Commitment to Excellence
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                For over 25 years, we've been perfecting the art of cabinet
                making. Our dedication to superior craftsmanship isn't just a
                promise—it's a tradition passed down through generations of
                skilled artisans who pour their expertise and passion into every
                piece.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-muted-foreground">Handcrafted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25+</div>
                  <div className="text-muted-foreground">Years Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-muted-foreground">Attention to Detail</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Craftsmanship;
