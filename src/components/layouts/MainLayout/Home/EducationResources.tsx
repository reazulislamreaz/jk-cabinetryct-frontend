import aboutBg from "@/assets/home/about/jk-bg.png";
import image from "@/assets/home/eudcation/jk-edu1.png";
import image2 from "@/assets/home/eudcation/jk-edu2.png";
import image3 from "@/assets/home/eudcation/jk-edu3.png";
import image4 from "@/assets/home/eudcation/jk-edu4.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const EducationResources = () => {
  const resources = [
    {
      icon: image,
      title: "J&K CABINETRY CATALOG",
      description:
        "Download our comprehensive J&K Cabinetry catalog and spec book to explore the full range of options. Not only that, but inside, you’ll find all SKUs, precise measurements, as well as detailed product specifications. Most importantly, it includes all the additional information you need to make informed decisions with confidence. Whether you’re a contractor, designer, or homeowner, this resource will help you plan your project efficiently and effectively.",
      link: "View J&K Cabinetry Catalog",
    },
    {
      icon: image2,
      title: "ASSEMBLY VIDEOS",
      description:
        "Many of our clients say that J&K Cabinets are their favorite line to build, because everything fits perfectly into place the first time. In fact, the ease of assembly is one of the reasons they keep coming back. To make things even easier, we’ve created step-by-step tutorial videos that show exactly how to build each of our cabinets with confidence and efficiency.",
      link: "View J&K Cabinets Assembly Videos",
    },
    {
      icon: image3,
      title: "BLOG",
      description:
        "The cabinetry industry is constantly evolving. To help you stay informed about the latest trends, insights, and updates, we’ll be regularly sharing new articles and blog posts right here. Whether you’re a contractor, designer, or homeowner, our goal is to keep you up to date with valuable, relevant content",
      link: "Read J&K Cabinets Blogs",
    },
    {
      icon: image4,
      title: "FREQUENTLY ASKED QUESTIONS",
      description:
        "To make things easier, we’ve compiled a list of answers to all of our most frequently asked questions in one convenient place. Of course, if you don’t see what you’re looking for, we’re always happy to help—so feel free to ask away!",
      link: "J&K Cabinets FAQs",
    },
  ];

  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 "
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 ">
        <h2 className="text-center text-xl md:text-2xl font-semibold leading-tight text-gray-700 mb-16">
          EDUCATION & RESOURCES
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10">
          {resources.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-start gap-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={65}
                  height={65}
                  className=""
                />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">{item.description}</p>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-4 h-13 cursor-pointer border-primary text-primary hover:bg-primary hover:text-white duration-300 transition-all font-medium rounded"
              >
                {item.link} →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EducationResources;
