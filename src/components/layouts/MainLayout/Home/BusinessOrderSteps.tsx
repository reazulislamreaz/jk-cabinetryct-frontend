import { CheckCircle, ShoppingCart, Truck, UserPlus } from "lucide-react";
import Step from "./Step";

const BusinessOrderSteps: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Register to Order",
      description: "Click here to fill out account application.",
    },
    {
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Account Approval",
      description: "Allow 24 hours for our sales to verify your business.",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Place Your Order",
      description:
        "You may call, mail or use our online catalog after account approval.",
    },
    {
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Pickup or Delivery",
      description: "Only in-stock items apply.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 ">
      <div className="max-w-6xl mx-auto border border-[#B0B0B0] rounded-xl p-6 sm:p-8 md:p-12 bg-white shadow-sm overflow-hidden">
        {/* Timeline Container */}
        <div className="relative">
          {/* Steps */}
          <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 md:gap-6 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center md:items-start relative"
              >
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 sm:top-7 lg:top-8 left-6 sm:left-7 lg:left-8 h-0.5 bg-primary z-0"
                    style={{ width: "calc(100% + 1rem)" }}
                  />
                )}
                {/* Step Component */}
                <Step
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isLast={index === steps.length - 1}
                />
                {/* Mobile Connector Line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 sm:h-10 lg:h-12 bg-gray-300 my-2 sm:my-3 lg:my-4 self-center" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOrderSteps;
