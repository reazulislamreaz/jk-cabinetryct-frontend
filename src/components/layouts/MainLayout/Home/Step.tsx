import React from "react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      {/* Icon Circle */}
      <div className="relative z-10 size-12 sm:size-14 lg:size-16 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-md transition-all hover:scale-110">
        <div className="text-primary">{icon}</div>
      </div>

      {/* Content */}
      <div className="mt-3 sm:mt-4 lg:mt-6 max-w-xs text-center md:text-left">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default Step;
