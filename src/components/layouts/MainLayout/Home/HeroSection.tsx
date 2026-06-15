"use client";
import hero1 from "@/assets/home/hero/jk-cabinetryct-1.webp";
import hero2 from "@/assets/home/hero/jk-cabinetryct-2.webp";
import hero3 from "@/assets/home/hero/jk-cabinetryct-3.webp";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { id: 1, image: hero1 },
  { id: 2, image: hero2 },
  { id: 3, image: hero3 },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-full overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background Slides with Zoom Animation */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={`${slide.id}-${currentSlide}`}
            className="absolute inset-0"
            initial={{ opacity: currentSlide === index ? 1 : 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={
                currentSlide === index
                  ? {
                      scale: [1, 1.07],
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: 5,
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <Image
                src={slide.image}
                alt={`J&K Cabinetry Hero ${slide.id}`}
                fill
                priority
                quality={95}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-gray-50/80 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="max-w-5xl space-y-4 sm:space-y-6"
          >
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-4 sm:mb-6">
              J&K CABINETRY
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-6 sm:mb-8 max-w-4xl">
              Wholesale Kitchen & Bathroom Cabinet{" "}
              <br className="hidden sm:block" /> Supplier – J&K Cabinetry CT
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/homeowner" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-6 h-12 sm:h-14 text-sm sm:text-base cursor-pointer bg-white text-primary hover:bg-gray-100 border border-primary"
                  >
                    Home Owners
                  </Button>
                </Link>
                <Link href="/multi-unit" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-6 h-12 sm:h-14 text-sm sm:text-base cursor-pointer bg-white text-primary hover:bg-gray-100 border border-primary"
                  >
                    Multi-Unit Projects
                  </Button>
                </Link>
              </div>
              <Link href="/registration" className="block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-6 h-12 sm:h-14 bg-primary text-white cursor-pointer"
                >
                  Cabinet Resellers & Retailers
                </Button>
              </Link>

              <Link href="/catalog" className="block">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-10 h-12 sm:h-14 bg-primary text-sm sm:text-base text-white cursor-pointer"
                >
                  Catalog
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
