import Image from "next/image";

type GalleryCardProps = {
  id: number;
  name: string;
  img: string;
};

const GalleryCard = ({ item }: { item: GalleryCardProps }) => (
  <div className="relative overflow-hidden  bg-white">
    <div className="aspect-w-3 aspect-h-4">
      <Image
        src={item.img}
        alt={item.name}
        width={600}
        height={800}
        className="w-full h-96 md:h-[450px] object-cover"
      />
    </div>

    {/* Label */}
    <div className="absolute bottom-0 w-32 h-20 bg-[#EFEEEC] backdrop:blur-sm left-1/2 -translate-x-1/2 flex justify-center items-center">
      <h1 className="text-sm ">{item.name.toUpperCase()}</h1>
    </div>
  </div>
);

export default GalleryCard;
