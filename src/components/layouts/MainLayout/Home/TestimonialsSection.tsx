"use client";
import aboutBg from "@/assets/home/about/jk-bg.png";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Quality at affordable prices! We've used these cabinets on several jobs now, and we continue to be impressed with the craftsmanship and durability.",
    author: "Kerri Wade",
    location: "Dallas, Texas",
  },
  {
    quote:
      "I've been working with J&K for over a year on multiple projects, and they have consistently exceeded my expectations with their attention to detail.",
    author: "Cindy Holder",
    location: "Houston, Texas",
  },
  {
    quote:
      "As a kitchen and bath designer, I am always looking for the best quality and appearance at the best price. J&K delivers every time!",
    author: "Nicole Ruppel Jones",
    location: "Austin, Texas",
  },
  {
    quote:
      "The customer service is outstanding! They walked me through every step of the process and helped me choose the perfect cabinets for my home renovation.",
    author: "Michael Rodriguez",
    location: "San Antonio, Texas",
  },
  {
    quote:
      "We've recommended J&K Cabinetry to all our clients. The quality-to-price ratio is unbeatable, and installation is always seamless.",
    author: "Sarah Thompson",
    location: "Fort Worth, Texas",
  },
  {
    quote:
      "From design to delivery, everything was perfect. The cabinets transformed our kitchen into a space we absolutely love. Highly recommend!",
    author: "David Chen",
    location: "Plano, Texas",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (isMobile) {
          return prev === testimonials.length - 1 ? 0 : prev + 1;
        } else {
          return prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1;
        }
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[current]];
    } else {
      const startIndex = current * 3;
      return testimonials.slice(startIndex, startIndex + 3);
    }
  };

  const totalDots = isMobile
    ? testimonials.length
    : Math.ceil(testimonials.length / 3);

  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16"
      style={{
        backgroundImage: `url(${aboutBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold leading-tight text-gray-900">
            WHAT OUR CLIENTS SAY?
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Our clients are the lifeblood of our business. We do our absolute
            best to support their business and ensure their customers have the
            best possible results.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto mb-10">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid md:grid-cols-3 gap-6 md:gap-8 p-4 md:p-5"
              >
                {getVisibleTestimonials()?.map((t, i) => (
                  <div
                    key={`${current}-${i}`}
                    className={`bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                      !isMobile && i === 1 ? "lg:-mt-8" : ""
                    }`}
                  >
                    <div>
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 md:mb-6 opacity-70" />
                      <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 italic">
                        {'"'}
                        {t?.quote}
                        {'"'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg text-gray-900">
                        {t?.author}
                      </h4>
                      <p className="text-primary text-xs md:text-base mt-1 font-medium">
                        {t?.location}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-12 h-3 bg-primary"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
