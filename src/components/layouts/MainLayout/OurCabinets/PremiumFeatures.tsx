import Image from "next/image";
import banner from "@/assets/common/banner.png";
import image from '@/assets/our-cabinet/premium/pre1.jpeg'
import image2 from '@/assets/our-cabinet/premium/pre2.jpeg'
import image3 from '@/assets/our-cabinet/premium/pre3.jpeg'
import image4 from '@/assets/our-cabinet/premium/pre4.jpeg'
import image5 from '@/assets/our-cabinet/premium/pre5.jpeg'
import image6 from '@/assets/our-cabinet/premium/pre6.jpeg'
import image7 from '@/assets/our-cabinet/premium/pre7.jpeg'
import image8 from '@/assets/our-cabinet/premium/pre8.jpeg'
const features = [
  {
    src: image,
    title: "Solid Wood Door Panel",
    desc: `"3/4"-thick solid birch wood full overlay door.`,
  },
  {
    src: image2,
    title: "Full Plywood Box",
    desc: `"1/2" to 5/8"-thick cabinet-grade plywood; clear coat finish on interior sides.`,
  },
  {
    src: image3,
    title: "Plywood Adjustable Shelf",
    desc: `"3/4"-thick cabinet-grade plywood; clear coat finish on all sides and edges.`,
  },
  {
    src: image4,
    title: "Dovetail Drawers",
    desc: `"5/8"-thick solid wood on all sides with dovetail construction."`,
  },
  {
    src: image5,
    title: "Soft Close Door Hinges",
    desc: "6-way adjustable soft-close metal; hidden euro-style.",
  },
  {
    src: image6,
    title: "Concealed Undermount",
    desc: "3/4 full extension pull-out; soft close metal; concealed under-mount rail tracks.",
  },
  {
    src: image7,
    title: "Quiet Door Bumpers",
    desc: "Promote quiet-closing and reduce slamming for maximum durability.",
  },
  {
    src: image8,
    title: "Premium Metal Bracket",
    desc: "Metal corner bracket reinforcements in base cabinets for maximum stability.",
  },
];

const PremiumFeatures = () => (
  <section
    className="w-full px-3 md:px-5 py-8 md:py-10"
    style={{
      backgroundImage: `url(${banner.src})`,
    }}
  >
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl  uppercase mb-4 max-w-3xl mx-auto px-5 leading-relaxed">
        premium features come standard on all of our j&k cabinetry lines
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 md:mt-12">
        {features.map((f, i) => (
          <div key={i} className="space-y-4">
            <Image
              src={f.src}
              alt={f.title}
              width={400}
              height={250}
              className="w-full h-[200px] object-cover "
            />
            <h4 className="font-bold text-lg">{f.title}</h4>
            <p className="text-sm text-gray-600 px-4 font-semibold">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PremiumFeatures;
