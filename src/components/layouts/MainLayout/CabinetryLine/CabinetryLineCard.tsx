import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ICabinetry } from "@/types/cabinetry.types";

interface CabinetryLineCardProps {
  item: ICabinetry;
}

const CabinetryLineCard = ({ item }: CabinetryLineCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden rounded border-none shadow-none  transition-all duration-300 ">
      <Link href={`/cabinet-lines/${item?.slug}`}>
        <div className="relative overflow-hidden ">
          {item?.mainImage && (
            <div className="aspect-w-3 aspect-h-4">
              <Image
                src={item?.mainImage}
                alt={item?.slug || "Image"}
                loading="eager"
                priority
                width={600}
                height={800}
                className="w-full h-96 md:h-[450px] object-cover hover:scale-90 transition-all duration-300"
              />
            </div>
          )}
        </div>
      </Link>

      <div className="px-5 pt-8 pb-5 bg-white flex  flex-wrap justify-center gap-1 md:gap-2 items-center">
        <p className="text-lg md:text-xl font-medium text-primary tracking-wider">
          {item?.code}
        </p>
        <span>-</span>
        <h3 className="text-sm md:text-lg">{item.color}</h3>
      </div>
    </Card>
  );
};

export default CabinetryLineCard;
