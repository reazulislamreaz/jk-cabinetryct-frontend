import aboutBg from "@/assets/home/about/jk-bg.png";
import { Button } from "@/components/ui/button";
import { Clock, Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
const OurLocations = () => {
  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 "
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-center text-xl md:text-2xl font-semibold leading-tight text-gray-900 mb-6">
            OUR LOCATIONS
          </h2>
          <p className="text-center text-gray-600 mb-5">
            Looking for ‘J&K Cabinetry near me’? No matter where you are, we
            offer nationwide shipping and proudly serve clients in every state.
            In addition, we maintain a growing list of showrooms and warehouses
            that are open to the public—so you can visit in person and explore
            our cabinets up close.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:gap-16 items-center justify-center">
          {/* Location Card */}
          <div className="w-full max-w-3xl p-10 text-center ">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Connecticut
            </h3>
            <p className="text-gray-700 mb-6">
              325 Sub Way Milford, CT 06461 United States
            </p>
            <div className="space-y-3 text-sm text-gray-600 mb-8">
              <p className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Tel: 475 441-0119
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> sales@jkcabinetryct.com
              </p>
              <div>
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" /> Hours:
                </p>
                <p>Showroom: Mon-Fri 8:30am – 5:00pm</p>
                <p>Warehouse: Mon-Fri 8:30am – 4:30pm</p>
              </div>
            </div>
            <Button className="w-full h-12 cursor-pointer rounded bg-primary hover:bg-primary-hover font-medium">
              GET DIRECTIONS
            </Button>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61568625837855&sk"
                target="_blank"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/jkcabinetryct"
                target="_blank"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
          {/* Join Network Text */}
          <div className="max-w-3xl text-center">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-6">
              JOIN THE TRUSTED NETWORK OF J&K CABINETRY DEALERS TODAY!
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              J&K Cabinetry is committed to providing high-quality RTA kitchen
              and bathroom cabinets that combine style, durability, and
              affordability...
            </p>
            <p className="text-sm italic text-gray-500 mt-6">
              Please give your nearest location a call if you require an
              immediate response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
