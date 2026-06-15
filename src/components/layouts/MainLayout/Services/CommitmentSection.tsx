import Image from "next/image";
import { Button } from "@/components/ui/button";
import icon1 from "@/assets/services/icon1.png";
import icon2 from "@/assets/services/icon2.png";
import service from "@/assets/services/service.jpg";
import banner from "@/assets/common/banner.png";
const CommitmentSection = () => (
  <section
    className="py-20 bg-white"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl uppercase text-gray-800">
          J and K Cabinetry Commitment to Consistency and Reliability
        </h2>
        <p className="mt-6 max-w-4xl mx-auto text-gray-700 leading-relaxed">
          At J&K Cabinetry, our commitment goes beyond delivering exceptional
          cabinetry – it&apos;s about a promise kept. Our goal is to be your
          most consistent and reliable cabinetry provider so that you can ensure
          every one of your jobs and projects are finished on time – everytime.
        </p>
      </div>
      <hr className="py-9 border-gray-200" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Stats */}
        <div className="space-y-12">
          {[
            {
              icon: icon1.src,
              title: "5 - 7 Day Average Lead Time",
              desc: "We pride ourselves in having one of the most consistent and reliable lead times in the cabinetry industry. Due to our large warehouses and operations team we can fulfill orders efficiently.",
            },
            {
              icon: icon2.src,
              title: "Over 300,000+ Sq Ft of Combined Warehousing Space",
              desc: "Our team is constantly expanding our network of warehousing space. The more space we have – the more we can service you and your business. We have several new warehouses and locations opening up within this year!",
            },
            {
              icon: icon1.src,
              title:
                "Over 6+ Months of In-Stock Inventory Ready to be Assembled",
              desc: "We make sure that we can supply any and every job that our client's can provide. We consistently invest heavily into keeping a large of ready-to-pull inventory at each of our locations.",
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Image + CTA */}
        <div className="space-y-8">
          <Image
            src={service}
            alt="Modern Kitchen with J&K Cabinets"
            width={800}
            height={600}
          />
          <div className="text-center">
            <Button className="bg-primary text-white px-10 py-6 text-lg rounded cursor-pointer">
              Learn More About J&K Cabinets
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommitmentSection;
